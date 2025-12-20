/**
 * @파일설명
 * 금액/문자열 포매팅을 담당하는 순수 유틸 함수입니다.
 *
 * @역할
 * - number → currency 변환
 * - 문자열 prefix/suffix 처리
 *
 * @아키텍처원칙
 * - 도메인 독립적
 *
 * @커스터마이징가이드
 * - locale 기반 currency formatter 확장 가능
 */

export const comma = (value: number | string) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const shortenText = (txt: string, limit = 20) =>
  txt.length > limit ? `${txt.slice(0, limit)}...` : txt;
