/**
 * @파일설명
 * 전역 내비게이션 바(UI 헤더)를 렌더링하는 공용 컴포넌트입니다.
 *
 * @역할
 * - 로고, 메뉴 버튼 등 공통 UI 제공
 * - 인증 여부에 따라 표시 아이템을 조정할 수 있도록 확장 가능
 *
 * @아키텍처원칙
 * - Shared Layer에 속하므로 비즈니스 로직, Feature 의존 금지
 * - input props 기반의 UI 렌더링만 수행
 *
 * @커스터마이징가이드
 * - 메뉴 구성은 props 또는 slot(children)으로 주입 가능
 * - 디자인 시스템 적용 시 UI className 변경
 */

import '@components/Navbar/Navbar.scss';
export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">React Baseline</h1>
    </nav>
  );
}
