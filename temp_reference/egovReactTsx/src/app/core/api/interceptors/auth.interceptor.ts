/**
 * @파일설명
 * 인증(Authorization) 관련 요청/응답을 처리하는 인터셉터입니다.
 *
 * @역할
 * - 401 발생 시 토큰 만료 여부 감지
 * - Refresh Token API 호출
 * - 리프레시 중 발생한 요청 큐 처리
 *
 * @아키텍처원칙
 * - Core API 계층의 인증 담당 모듈
 * - UI나 feature 기능에 의존 금지
 *
 * @커스터마이징가이드
 * - refresh endpoint 변경
 * - refresh queue 방식 개선 (Lock, Mutex 사용)
 * - refresh 실패 시 전역 로그아웃 처리 추가
 */

import type { AxiosInstance } from 'axios';

export function attachAuthInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401) {
        //refresh logic
        console.warn('401 detected -> refresh token flow placeholder');

        // 재시도 예시
        // const refreshed = await refreshToken();
        // return instance(error.config);
      }
      return Promise.reject(error);
    },
  );
}
