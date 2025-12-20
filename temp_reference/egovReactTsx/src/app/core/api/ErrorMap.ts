/**
 * @description
 * 백엔드에서 내려주는 오류 코드를 UI 메시지로 매핑하는 레이어.
 * - Axios Interceptor → errorMap → 최종 error-handler.service.ts → UI Hook
 * - i18n 번역 레이어로 확장 가능
 * - code 기준으로 message를 일원화하여 UX 통일
 */

export const errorMap: Record<string, string> = {
  USER_NOT_FOUNT: '사용자를 찾을 수 없습니다.',
  INVALID_TOKEN: '세션이 만료되었습니다. 다시 로그인하세요.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 연결을 확인하세요.',
};

export const getErrorMessage = (code?: string, defaultMsg = '알 수 없는 오류가 발생했습니다.') =>
  (code && errorMap[code]) || defaultMsg;
