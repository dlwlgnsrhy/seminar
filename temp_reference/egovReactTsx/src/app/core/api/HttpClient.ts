/**
 * @파일설명
 * 전역 HTTP 클라이언트(Axios) 설정 파일입니다.
 * 애플리케이션 전체에서 공통으로 사용하는 baseURL, timeout, 인터셉터를 정의합니다.
 *
 * @역할
 * - Axios 전역 인스턴스 생성
 * - 인증/에러 인터셉터 연결
 * - 공통 헤더/옵션 설정
 *
 * @아키텍처원칙
 * - Core 계층: shared 또는 feature에 의존하면 안 됨
 * - 애플리케이션에서 단일 인스턴스로만 동작해야 함
 *
 * @커스터마이징가이드
 * - 다국어 헤더 추가 (Accept-Language)
 * - 플랫폼/디바이스 정보 헤더 추가
 * - 인증 방식 변경 (Bearer → Cookie)
 * - Refresh 로직 추가/개선
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getErrorMessage } from './ErrorMap';
import { getCookie } from './utils/Cookie';

/**
 * 공통 HTTP 클라이언트 (Axios 기반)
 * - 표준 응답 구조 대응
 * - 자동 토큰 갱신 (Refresh Token 흐름)
 * - 에러 메시지 일원화
 * - 네트워크/인증 예외에 대처
 */
const createHttp = (): AxiosInstance => {
  const inst = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
    withCredentials: true, // 쿠키 인증용 (CSRF 방지 시 유용)
    timeout: 10_000, // 10초 기본 타임아웃
  });

  /**요청 인터셉터
   * - JWT 토큰 자동 삽입
   * - 향후 Device Id, Locale 등 추가 헤더 주입 가능
   */
  inst.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
    try {
      // XSRF-TOKEN (HttpOnly:false)을 읽어 헤더에 붙임
      const xsrf = getCookie('XSRF-TOKEN');
      if (xsrf && cfg.headers) {
        cfg.headers['X-XSRF-TOKEN'] = xsrf;
      }
    } catch (e) {
      // SSR 환경 등에서 document가 없을 경우 안전하게 무시
    }
    return cfg;
  });

  /**
   * 응답 인터셉터
   * - 인증 만료(401) 시 Refresh 흐름 처리 (쿠키 기반)
   * - 요청 재시도 로직 큐 관리
   */
  let isRefreshing = false;
  let failedQueue: Array<{
    config: InternalAxiosRequestConfig;
    resolve: (v: any) => void;
    reject: (e: any) => void;
  }> = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((p) => {
      if (error) p.reject(error);
      else {
        // 만약 서버가 access token을 바디로 내려주면 header에 주입 가능
        if (token && p.config.headers) p.config.headers['Authorization'] = `Bearer ${token}`;
        p.resolve(inst.request(p.config));
      }
    });
    failedQueue = [];
  };

  inst.interceptors.response.use(
    (res) => res,
    async (err) => {
      const { response, config } = err;
      if (!response) {
        console.error('Network error:', err.message);
        return Promise.reject({
          message: getErrorMessage('NETWORK_ERROR'),
          original: err,
        });
      }

      // 인증 만료(401) 처리
      if (response.status == 401 && !config._retry) {
        config._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ config, resolve, reject });
          });
        }

        isRefreshing = true;
        try {
          // NOTE : /auth/refresh 는 서버가 REFRESH-TOKEN(HttpOnly cookie)을 보고 동작한다고 가정
          const { data } = await inst.post('/auth/refresh');
          // 서버가 새 액세스토큰을 바디로 줄 수동 있고, 또는 새 쿠키(XSRF-TOKEN)를 내려줄 수도 있음.
          const newAccessToken = data?.accessToken ?? null;
          //  저장 방식은 보안 정책에 따라 결정
          //  - httpOnly cookie 기본
          //  - LocalStorage (SPA 환경용)
          // localStorage.setItem("accessToken", newAccessToken);

          processQueue(null, newAccessToken);
          isRefreshing = false;

          if (newAccessToken && config.headers)
            config.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return inst.request(config);
        } catch (refreshErr) {
          processQueue(refreshErr, null);
          isRefreshing = false;

          // refresh 실패 시 : 로그아웃, 세션 초기화 등
          console.warn('Refresh token expired:', refreshErr);
          return Promise.reject(refreshErr);
        }
      }

      return Promise.reject(err);
    },
  );
  return inst;
};

const http = createHttp();
export default http;
