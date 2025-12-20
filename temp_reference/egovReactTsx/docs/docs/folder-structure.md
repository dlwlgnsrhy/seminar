# React Baseline v1.1 — 프로젝트 구조 (Barrel Pattern + Angular Hybrid 통합 버전)

> **v1.1 Angular Hybrid + Nx 전략 통합 업데이트**
> “Barrel-First Architecture & Module-Like Feature Isolation”

이 문서는 React 프로젝트가 **일관된 구조**, **확장성**, **전역 API 안정성**,
그리고 **팀 협업 기준의 유지보수성**을 확보하도록 돕기 위한 Baseline 아키텍처를 정의한다.

Angular의 모듈 구조와 Nx의 프로젝트 독립성 개념을 React에 적용하여
**도메인 단위 기능(feature)을 완전히 캡슐화된 작은 모듈처럼 운영할 수 있도록 설계되었다.**

---

# **1. 기본 원칙**

| 항목              | 원칙                                              | 비고                        |
| ----------------- | ------------------------------------------------- | --------------------------- |
| 단방향 레이어     | **core → shared → features → app**                | 상위가 하위를 알지 못한다   |
| Public API 중심   | 폴더별 `index.ts` **Barrel Pattern 필수 적용**    | Angular Module·Nx 유사 구조 |
| Feature Isolation | feature 간 의존 금지                              | Angular Lazy Module 개념    |
| Reusability       | shared는 전역(공용), feature는 도메인 단위 캡슐화 | 모듈 독립성 유지            |
| DX 최적화         | import 규칙 표준화, 구조변경 영향 최소화          | 대규모 팀 기준              |
| Routing 모듈화    | 각 feature는 자체 라우트 파일 보유                | Angular Routing Module 방식 |

---

# **2. 폴더 구조 (Barrel 적용 + Angular Hybrid 버전)**

Angular의 **Module-like 구조**와 Nx의 **Project Public API 모델**을 React에서 구현한 최종 구조이다.

```bash
src/
└── app/
    ├── core/           # 전역 서비스/상태/훅/API (앱 전 구간 1회 로드)
    │   ├── api/
    │   ├── hooks/
    │   ├── contexts/
    │   ├── services/
    │   ├── store/              # [NEW] Zustand Store
    │   │   └── useAppStore.ts
    │   └── index.ts            # ★ core export hub
    │
    ├── shared/                 # 공용 UI/함수/훅 (stateless)
    │   ├── components/
    │   ├── hooks/
    │   ├── utils/
    │   ├── pipes/
    │   └── index.ts
    │
    ├── features/               # 도메인 모듈(독립 캡슐화)
    │   ├── dashboard/
    │   │   ├── pages/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── dashboard.routes.tsx
    │   │   └── index.ts
    │   └── profile/
    │
    ├── AppProvider.tsx
    ├── AppRouter.tsx
    └── App.tsx

# Root Config Files
├── vite.config.ts      # [NEW] Vite Configuration
├── tsconfig.json
├── package.json
└── index.html          # [MOVED] Root Entry Point
```

## 2-2. core -- 앱의 "엔진" 레이어

> `core/api` 전역 API 통신 엔진
> | 파일 | 설명 | 커스터마이징 |
> | --------------------------------- | ------------- | ------------------------- |
> | httpClient.ts | Axios 인스턴스 | baseURL/timeout, 헤더 전략 수정 |
> | interceptors/auth.interceptor.ts | 401 + refresh | refresh retry, queue 정책 |
> | interceptors/error.interceptor.ts | 에러 표준화 | 로깅(Sentry), 레벨 세분화 |
> | errorMap.ts | 코드 → UX 메시지 | 다국어 매핑, 도메인별 확장 |

---

> `core/hooks` 앱 전역 상태/서비스의 UI 진입 지점
> | 파일 | 역할 | 커스터마이징 |
> | ------------------ | ----------- | --------------------- |
> | useAuth.ts | 로그인/세션 UI 훅 | role 기반 UI, 자동로그인 |
> | useErrorHandler.ts | 에러 UI 처리 | toast 교체, logging |
> | useAppInfo.ts | 앱 버전/환경 | Commit Hash/Region 표시 |

---

> `core/services` 데이터 처리 로직 (비즈니스 + API)
> | 파일 | 역할 | 커스터마이징 |
> | ------------------------ | ---------------------- | ------------ |
> | auth.service.ts | 로그인/세션 API | 회원가입/OTP/MFA |
> | error-handler.service.ts | Axios Error → AppError | 에러 레벨 추가 |

---

> `core/contexts` 전역 상태 저장소
> | Context | 설명 |
> | ------------ | -------------- |
> | AuthContext | 인증 전역 상태 |
> | ThemeContext | 테마(light/dark) |

---

# **3. Barrel Pattern (index.ts) 설계 가이드**

## ✔ Angular와 동일한 개념

Angular의 `public-api.ts` 또는 모듈 export 전략을
React에 그대로 적용한 것이 “Barrel-first Architecture” 이다.

## 예시

```ts
// before
import Navbar from '@/app/shared/components/Navbar/Navbar';

// after
import { Navbar } from '@/app/shared/components';
```

---

## Barrel Pattern의 핵심 효과

### 1) **Public API 안정성 (Angular 동일)**

폴더 내부 구조가 바뀌어도 외부 import는 변하지 않는다.
Angular 라이브러리의 `public-api.ts` 역할을 React에서 index.ts가 수행한다.

### 2) **Feature 독립성 강화**

각 feature의 index.ts는 "모듈의 공식 API"가 된다.

### 3) **Nx의 프로젝트 독립성 개념 완전 호환**

기능별 캡슐화가 가능해지며, 구조 리팩토링 비용이 급감한다.

---

# **4. Angular Hybrid 원칙 (React 적용 상세)**

아래는 Angular의 핵심 아키텍처 개념을 React 프로젝트에 그대로 이식한 내용이다.

---

## 🟦 **(1) Feature Module Isolation (Angular FeatureModule 대응)**

React에서는 feature 폴더가 **하나의 모듈**이다:

- pages
- components
- hooks
- routes
- index.ts (Public API)

Angular와 마찬가지로 **feature 간 직접 참조 금지**
→ `shared` 또는 `core` 이용

---

## 🟪 **(2) AppRouter = Angular AppRoutingModule**

- AppRouter는 feature 라우트들을 연결만 한다.
- Lazy import, loader 설정은 feature 내부에서만 수행한다.

Angular에서:

```ts
@NgModule({ imports: [RouterModule.forRoot(routes)] })
export class AppRoutingModule {}
```

React에서 동일:

```tsx
import { dashboardRoutes } from '@/app/features/dashboard';

<Route path="/dashboard/*" element={<dashboardRoutes />} />;
```

---

## 🟩 **(3) AppProvider = Angular Root Module Providers**

AppProvider는 전역 Context 및 전역 서비스 등록 영역이며
Angular의 `AppModule` 혹은 `providers` 개념과 동일하게 작동한다.

---

## 🟨 **(4) Shared Module = React shared layer**

- UI 컴포넌트
- Stateless hooks
- Utility
- Pipes (React용 formatting hooks)

→ Angular shared module의 역할과 동일하게 “전역에서 재사용”

---

## 🟥 **(5) Core Module = React core layer**

- 전역 providers (Auth, Theme 등)
- 전역 api client
- 전역 error handler
- 전역 hooks
- 전역 contexts

Angular의 CoreModule처럼:

- 앱 전체에서 단 1회만 초기화
- 다른 곳에서 Core를 import하면 안 됨 (순환 의존 방지)

---

# **5. 의존성 규칙**

| From → To               | 허용 | 설명                                   |
| ----------------------- | ---- | -------------------------------------- |
| features → shared       | ✔    | 공용 UI, util 사용                     |
| features → core         | ✔    | 전역 서비스, context 사용              |
| shared → core           | ❌   | Core는 상위 계층                       |
| shared → features       | ❌   | Domain 침범                            |
| core → shared           | ❌   | Core는 독립 계층                       |
| features → 다른 feature | ❌   | Angular FeatureModule 독립성 규칙 동일 |

➡ **Angular 구조와 Nx 규칙을 React에 그대로 이식한 모델임**
➡ Barrel Pattern이 이 구조를 더 강하게 보장한다.

---

# **6. 라우팅 전략 (Angular 하이브리드 방식)**

## React에서 Angular Routing Module 동일하게 운영:

### feature 내부에서 lazy & loader 설정:

```tsx
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
```

### AppRouter는 단순 연결만 수행:

```tsx
<Route path="/dashboard/*" element={<DashboardModule />} />
```

---

# **7. Barrel Pattern import 예시**

```ts
import { Navbar } from '@/app/shared';
import { useAuth } from '@/app/core';
import { DashboardPage } from '@/app/features/dashboard';
```

➡ **Angular의 "모듈 단위 진입점"과 동일한 DX 제공**
