# References & Resources

이 문서는 프로젝트 가이드라인과 문서들의 근거가 되는 자료들을 모아둔 곳입니다. 추가적인 학습이 필요할 때 참고하세요.

## 1. React & TypeScript

- **React 공식 문서 (신버전)**: [react.dev](https://react.dev/)
  - Hooks, Components, State 관리에 대한 최신 베스트 프랙티스를 확인할 수 있습니다.
  - _추천 섹션_: "Thinking in React", "Managing State"
- **TypeScript Handbook**: [typescriptlang.org](https://www.typescriptlang.org/docs/)
  - 타입 정의, 인터페이스, 제네릭 등 TypeScript의 핵심 개념을 학습할 수 있습니다.
  - _필수 학습_: "Everyday Types", "Narrowing"

## 2. Coding Style & Conventions

- **Airbnb JavaScript Style Guide**: [github.com/airbnb/javascript](https://github.com/airbnb/javascript)
  - 전 세계적으로 가장 많이 쓰이는 JS 스타일 가이드입니다. 우리의 ESLint 설정도 이를 기반으로 일부 커스터마이징되었습니다.
  - _주요 포인트_: 변수 선언(`const` vs `let`), 화살표 함수 사용, 구조 분해 할당
- **Google TypeScript Style Guide**: [google.github.io/styleguide/tsguide.html](https://google.github.io/styleguide/tsguide.html)
  - PascalCase 파일 명명 규칙 등은 Google 스타일 가이드와 유사한 방식을 채택하고 있습니다.
  - _참고_: 파일명 규칙, 인터페이스 명명 규칙

## 3. Styling (SCSS & CSS Modules)

- **Sass(SCSS) Basics**: [sass-lang.com/guide](https://sass-lang.com/guide)
  - Nesting, Variables, Mixins 등 SCSS의 기본 문법을 익힐 수 있습니다.
  - _활용_: `&` (Parent Selector) 활용법, `mixin`을 통한 재사용
- **CSS Modules**: [github.com/css-modules/css-modules](https://github.com/css-modules/css-modules)
  - 클래스 이름 충돌을 방지하는 CSS Modules의 개념과 작동 원리입니다.
  - _핵심_: 로컬 스코프 스타일링, `composes` 키워드
- **BEM Methodology**: [getbem.com](http://getbem.com/)
  - Block, Element, Modifier로 클래스 이름을 짓는 방법론입니다.
  - _규칙_: `block__element--modifier` 형태의 네이밍 규칙 이해

## 4. Testing

- **Vitest**: [vitest.dev](https://vitest.dev/)
  - Vite 기반의 빠른 유닛 테스트 프레임워크입니다. Jest와 API가 거의 호환됩니다.
  - _특징_: 빠른 실행 속도, ESM 네이티브 지원
- **React Testing Library**: [testing-library.com/react](https://testing-library.com/docs/react-testing-library/intro/)
  - 사용자 관점에서 컴포넌트를 테스트하는 도구입니다. 구현 세부사항보다 "화면에 무엇이 보이는지"를 테스트합니다.
  - _철학_: "The more your tests resemble the way your software is used, the more confidence they can give you."
- **Cypress**: [cypress.io](https://www.cypress.io/)
  - E2E(End-to-End) 테스트 도구입니다. 실제 브라우저에서 사용자가 클릭하고 입력하는 것처럼 테스트합니다.
  - _용도_: 통합 테스트, 사용자 시나리오 검증

## 5. Deployment & Build

- **Vite Build Options**: [vitejs.dev/config/build-options](https://vitejs.dev/config/build-options.html)
  - `outDir`, `sourcemap` 등 빌드 설정에 대한 상세 설명입니다.
  - _설정_: `rollupOptions`를 통한 번들링 제어
- **Docker for Node.js**: [github.com/nodejs/docker-node/blob/main/docs/BestPractices.md](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
  - Node.js 애플리케이션을 Docker로 배포할 때의 베스트 프랙티스입니다.
  - _보안_: `USER node` 설정, 멀티 스테이지 빌드 최적화
