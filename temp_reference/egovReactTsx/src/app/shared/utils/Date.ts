/**
 * @파일설명
 * 날짜 관련 공통 유틸리티 함수 모음입니다.
 *
 * @역할
 * - formatDate / parse / addDays 등 ISO 기반 날짜 처리
 *
 * @아키텍처원칙
 * - 로직만 존재해야 하며 UI/React Hook 금지
 *
 * @커스터마이징가이드
 * - timezone, locale 기반 확장 가능
 */

export const toKST = (date: string | Date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const tzOffset = 9 * 60; //KST UTC+9
  return new Date(d.getTime() + tzOffset * 60 * 1000);
};
