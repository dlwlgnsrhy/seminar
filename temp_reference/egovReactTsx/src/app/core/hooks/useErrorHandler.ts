/**
 * @파일설명
 * 표준화된 에러(AppError)를 UI 이벤트(toast/modal 등)로 변환하는 훅입니다.
 *
 * @역할
 * - UX 에러 메시지 표시
 * - 공통 UI 경고/에러 처리 규칙 적용
 *
 * @커스터마이징가이드
 * - toast 라이브러리 교체
 * - 에러 레벨에 따라 다른 UI 적용
 * - 에러별 자동 로그 이벤트 추가
 */

import { AppError } from '../services/error-handler.service';

export function useErrorHandler() {
  return (err: AppError) => {
    alert(err.message); // 추후 Toast로 교체
  };
}
