---
slug: /
---
# React Baseline v1

**목적**
회사 React 프로젝트를 일관된 구조·규칙·템플릿으로 표준화해,
신입·경력 개발자 모두 **문서만 보고 90분 내 착수**할 수 있게 한다.

---

## 왜 Baseline인가

- 프로젝트마다 폴더 구조·코딩 스타일·API 호출 방식이 제각각
  → 유지보수 비용↑, 온보딩 속도↓
- 공통 규칙이 중앙에서 관리되지 않아 중복·재작성 빈번
  → **Baseline v1은 문서 + 템플릿 + 자동화로 일관성 확보.**

---

## 적용 범위(스코프)

- **타깃:** CSR SPA (React + TypeScript)
  - 서버 상태: **TanStack Query**
  - 전역 클라이언트 상태: **Phase 2 이후 Redux Toolkit 도입 가능**
  - 라우팅: **React Router**
  - API 계층: **axios 기반 공용 클라이언트 (`src/api/http.ts`)**

- **문서**: Docusaurus
- **코드와 문서**는 동일 리포지토리에서 버전 관리
- **비스코프(추후)**: SSR/SSG(Next.js), 디자인 시스템(Storybook), 모바일(WebView) 패키징 → v1.1~v2 로드맵

---

## 대상 독자

| 대상        | 필요 이유                             |
| ----------- | ------------------------------------- |
| 개발자      | 새 프로젝트 착수, 공통 패턴/코드 예시 |
| 리드/리뷰어 | 코드리뷰 기준, 품질 게이트            |
| 품질/감리   | eGov 4.3 대응 근거 및 구현 위치 추적  |

---

## 저장소 운영 모델

- Baseline 중앙 리포 = **문서 + 템플릿 + 공용 패키지**
- 운영 프로젝트는 기존 **Polyrepo 유지**
- 신규 절차:
  1. Baseline 템플릿 복제
  2. 공용 패키지 설치 (예: `@company/http-client`)
  3. CI 템플릿 적용

---

## 표준 폴더 구조 (v1.1 수정 Angular Mediaum-Sized Projects 참조)

```bash
src/
└── app/
    ├── core/
    │   ├── api/
    │   │   ├── httpClient.ts
    │   │   └── interceptors/
    │   ├── hooks/
    │   │   ├── useAuth.ts
    │   │   ├── useErrorHandler.ts
    │   │   └── useAppInfo.ts
    │   ├── contexts/
    │   │   ├── AuthContext.tsx
    │   │   └── ThemeContext.tsx
    │   └── services/
    │       ├── auth.service.ts
    │       └── error-handler.service.ts
    │
    ├── shared/
    │   ├── components/
    │   │   ├── Navbar/
    │   │   │   ├── Navbar.tsx
    │   │   │   └── Navbar.scss
    │   │   ├── Spinner/
    │   │   │   ├── Spinner.tsx
    │   │   │   └── Spinner.scss
    │   │   └── ...
    │   ├── hooks/
    │   │   └── useToggle.ts
    │   ├── utils/
    │   │   ├── date.ts
    │   │   └── format.ts
    │   └── pipes/
    │       └── useDateFormat.ts
    │
    ├── features/
    │   ├── dashboard/
    │   │   ├── pages/
    │   │   │   └── DashboardPage.tsx
    │   │   ├── components/
    │   │   │   └── DashboardCard.tsx
    │   │   ├── hooks/
    │   │   │   └── useDashboardData.ts
    │   │   ├── dashboard.routes.tsx
    │   │   └── index.ts
    │   └── profile/
    │       ├── pages/
    │       │   └── ProfilePage.tsx
    │       ├── components/
    │       │   └── ProfileForm.tsx
    │       ├── hooks/
    │       │   └── useProfile.ts
    │       ├── profile.routes.tsx
    │       └── index.ts
    │
    ├── App.tsx
    ├── AppRouter.tsx   # 연결만 신경쓴다 페이지로딩, import, lazy 전략은 각feature별로 분배하여 복잡도 낮춤.
    └── AppProvider.tsx
```

- 기존 `/src` 기반 프로젝트는 **점진 이전 가능(겹치기 전략)**
- `tsconfig.json`: `baseUrl: "src"`, 필요 시 `@/...` 별칭 사용

---

## 상태·데이터 전략

| 구분           | 도구                    | 역할                       |
| -------------- | ----------------------- | -------------------------- |
| 서버 상태      | TanStack Query          | 비동기 API 캐싱, 에러 핸들 |
| 전역 클라 상태 | (Phase 2) Redux Toolkit | UI, 세션 등 글로벌 상태    |

---

## API 계층 규칙

- axios 인스턴스: `baseURL`, `timeout`, `withCredentials`, 401 리프레시 재시도
- 표준 응답 모델:

  ```ts
  {
    success: boolean;
    code: string;
    message: string;
    data: any;
  }
  ```

- 페이지네이션 키: `page, size, sort / content, totalElements`
- 날짜: **ISO-8601 (UTC), 표기 시 KST 변환**
- 에러 매핑: HTTP 4xx/5xx ↔ 사용자 메시지 표준화 (RFC 7807 기반)

---

## 성능·코드스플리팅

- **라우트 단위 코드 분할**: `React.lazy + Suspense`
- **LCP** 영향 요소(헤더/히어로)는 즉시 로드, 나머지는 지연 로드
- **초기 번들 크기 예산**: 각 프로젝트별 문서화

---

## 접근성(A11y)·국제화(i18n)

- **KWCAG 2.1 AA** 지향 (포커스, aria, 대비 등)
- 공통 컴포넌트에 접근성 속성 내장
- i18n: 키 네이밍/폴백 규칙(필요 시 도입)

---

## 테스트·품질

- 최소 기준:
  - **RTL 단위 1개** + **Cypress 스모크 1개**
  - **품질 게이트**: lint/test/build 통과 필수

---

## 버전·릴리스 정책

- 문서: `docs-vMAJOR.MINOR.PATCH`
- 템플릿/패키지: 각자 SemVer
- 태그 예시:
  - `docs-v1.0.0`
  - `web-template@1.0.0`
  - `http-client@1.0.0`

- 변경 이력: `changelog.md` 관리

---

## 90분 온보딩 체크리스트

1. 템플릿 복제 → 의존성 설치
2. 라우트 등록 + `React.lazy` 적용
3. Query 샘플 호출 성공
4. 스모크 테스트 통과 → PR 생성

---

## ADR (Architecture Decision Record)

- `/docs/adr/ADR-XXXX.md` 형식
  예:
  - `ADR-0001` TanStack Query 채택
  - `ADR-0002` HttpOnly 쿠키 전략

---

## WebView/PWA 참고

- 반응형 + 오프라인 캐시 고려
- WebView 특이점(파일 업로드, 권한, 딥링크) 별도 문서화
- `webview-pwa.md` (추가 예정)

---

## 로드맵

| 버전 | 주요 내용                        |
| ---- | -------------------------------- |
| v1.0 | CSR SPA + API + Query + CI       |
| v1.1 | Storybook, Zustand, 테스트 확장  |
| v2.0 | Next.js(SSR), Design System 통합 |

---
