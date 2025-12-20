/**
 * @파일설명
 * Axios Error 객체를 표준화하여 AppError 형식으로 변환하는 서비스입니다.
 *
 * @역할
 * - raw error → AppError 변환
 * - errorMap 기반 메시지 적용
 *
 * @커스터마이징가이드
 * - 에러 심각도 레벨 추가
 * - 서버로그/클라이언트로그 통합
 */

import { errorMap } from '../api/ErrorMap';

export interface AppError {
  message: string;
  code?: string;
  raw: any;
}

export function normalizeError(err: any): AppError {
  const code = err?.response?.data?.code;
  const msg = errorMap[code] ?? errorMap['NETWORK_ERROR'];

  return {
    message: msg,
    code,
    raw: err,
  };
}
