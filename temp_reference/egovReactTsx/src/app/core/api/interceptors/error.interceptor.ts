/**
 * @파일설명
 * 서버 오류 응답을 UX 친화적인 메시지로 변환하는 에러 인터셉터입니다.
 *
 * @역할
 * - Axios error 객체를 표준화(AppError)
 * - errorMap 기반 메시지 매핑
 *
 * @커스터마이징가이드
 * - Sentry/Datadog 연동
 * - 에러 레벨에 따른 관리 (notice, warning, error, critical)
 * - 백엔드 도메인별 세분화된 에러코드 추가
 */

import { AxiosInstance } from 'axios';
import { errorMap } from '@core/api/ErrorMap';

export function attachErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      const code = error.response?.data?.code;
      const mapped = errorMap[code] || '알 수 없는 오류가 발생했습니다.';
      return Promise.reject({ ...error, uxMessage: mapped });
    },
  );
}
