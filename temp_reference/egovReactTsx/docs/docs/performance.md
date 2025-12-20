# 성능 기준 (Performance)

> Google **Web Vitals** 기반으로 최소 기준 확보
> React Suspence + Code Splitting 기반 번들 최소화

## 1. Web Vitals 최소 기준

| Metric                          | Target  | 측정 도구                    |
| ------------------------------- | ------- | ---------------------------- |
| LCP (Largest Contentful Paint)  | ≤ 2.5s  | Chrome DevTools / Lighthouse |
| CLS (Cumulative Layout Shift)   | ≤ 0.1   | Web Vitals SDK               |
| INP (Interaction to Next Paint) | ≤ 200ms | Web Vitals SDK               |

## 2. 번들 가드레일

- 초기 번들 크기 < **250KB(gzip 기준)**
- Route 기반 Lazy Loading 필수
- React.lazy + Suspense 활용

## 3. 이미지/폰트 최적화

- 모든 이미지 `width`, `height` 명시
- webp/avif 우선
- 폰트 : `font-display: swqp`

## 4. 측정 툴

- Chrome Lighthouse
- Web Vitals npm 패키지 (`import { onCLS, onLCP, onINP } from "web-vitals"`)

## 5. 코드 수준 최적화

- **React.lazy + Suspense**로 페이지 단위 코드 스플리팅

```tsx
const DashboardPage = React.lazy(() => import('../../pagesUsersPage'));
```

- **useMemo /useCallback** 적극 활용
- 불필요한 렌더링은 React DevTools로 확인

## 6. 번들 예산(Budget)

- `vite.config.ts` 기준

```ts
build: {
    chunkSizeWarningLimit: 500, //KB 기준
    rollupOptions: { /* vender 분리 등 */}
}
```

- `src/pages` 내 페이지 단위는 **300KB 이하** 유지 목표

## 7. CI 성능 가드라인 (GitLab 기준)

`.gitlab-ci.yml`

```yaml
stages:
  - build
  - test
  - audit

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

performance_audit:
  stage: audit
  image: cypress/browsers:node18.12.0-chrome107
  script:
    - npm run test:perf # Lighthouse CI 또는 custom script
```

> Tip : CI/CD 내에서 Lighthouse CLI를 사용해 평균 Web Vitals 점수를 기록하면, 성능 회귀를 자동 감지할 수 있음.
