/**
 * @파일설명
 * 로딩 상태를 표시하는 기본 스피너 컴포넌트입니다.
 *
 * @역할
 * - 네트워크 요청, 전역 로딩 등에 재사용되는 최소 단위의 UI
 *
 * @아키텍처원칙
 * - 순수 UI 컴포넌트
 * - 로직/상태 처리 없이 props 기반 렌더링만 허용
 *
 * @커스터마이징가이드
 * - 크기, 색상 등 theme props 확장 가능
 * - skeleton UI나 shimmer 형태로 대체 가능
 */

import '@components/Spinner/Spinner.scss';
export default function Spinner() {
  return <div className="spinner" data-testid="spinner" />;
}
