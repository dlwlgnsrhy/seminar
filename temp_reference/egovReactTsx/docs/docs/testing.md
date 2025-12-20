# 테스트 (Testing)

> 기본동작 보장을 위한 **스모크 테스트(필수)**를 유지하면서, CI에서 자동 검증이 가능해야 함.

---

## 1. 단위 테스트 (RTL)

- React Testing Library 사용
- 최소 한 개 컴포넌트 렌더링 검증
- Jest DOM Matchers (`toBeInTheDocument`, `toHaveTextContent` 등) 활용
- 테스트 구조

```bash
src/
 ├── __tests__/
 │    └── smoke.test.tsx  # RTL
 ├── pages/
 │    ├── HomePage.tsx
 │    └── UsersPage.tsx
 └── setupTests.ts         # jest-dom 설정
```

---

## 2. React Testing Library 예시

`src/__tests__/smoke.test/tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { HomePage } from '../pages/HomePage';

describe('Smoke Test', () => {
  it('renders the HomePage without crashing', () => {
    render(<HomePage />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
```

> - "모든 테스트 파일에는 **1개 이상의 DOM 렌더 확인** 포함"
> - ""단순렌더 + 스냅샷"은 허용하되, **로직 검증은 별도 파일로 분리**"

---

## 3. E2E 테스트 (Cypress)

- visit -> 리스트 -> 상세 플로우 1개 스모크 테스트
- 네트워크 호출은 intercept/mock 처리
  `cypress/e2e/smoke.cy.ts`

```js
describe('Smoke E2E Test', () => {
  it('Visits Home and Users page', () => {
    cy.visit('/');
    cy.contains('Home');
    cy.visit('/users');
    cy.contains('Users');
  });
});
```

---

## 4. CI 통합

- `npm run test` (jest)
- `npm run cypress:run` (Cypress)
  `.gitlab-ci.yml`

```yaml
e2e:
  stage: test
  image: cypress/browsers:node18.12.0-chrome107
  script:
    - npm ci
    - npm run build
    - npx cypress run --headless
  artifacts:
    paths:
      - cypress/videos/
      - cypress/screenshots/
```
