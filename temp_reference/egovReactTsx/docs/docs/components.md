# Components Guide

이 문서는 React 컴포넌트를 설계하고 사용하는 방법에 대한 가이드입니다.

## 1. 컴포넌트 분류

우리는 **Atomic Design** 패턴을 변형하여 사용하거나, **기능(Feature) 기반**으로 컴포넌트를 분류합니다.

### Shared Components (`src/app/shared/components`)

- 애플리케이션 전반에서 재사용되는 범용 컴포넌트입니다.
- 비즈니스 로직을 최소화하고, UI 렌더링에 집중합니다.
- 예: `Button`, `Input`, `Modal`, `Spinner`

### Feature Components (`src/app/features/*/components`)

- 특정 기능(Feature)에 종속된 컴포넌트입니다.
- 해당 기능 내에서만 사용되며, 다른 기능에서는 재사용되지 않을 수 있습니다.
- 예: `DashboardChart`, `ProfileCard`

### Layout Components

- 페이지의 전체적인 구조를 잡는 컴포넌트입니다.
- 예: `Header`, `Sidebar`, `Footer`, `MainLayout`

## 2. 컴포넌트 설계 원칙

### 단일 책임 원칙 (Single Responsibility Principle)

- 하나의 컴포넌트는 한 가지 일만 잘해야 합니다.
- 컴포넌트가 너무 커지면, 하위 컴포넌트로 분리하세요.

### Props 설계

- **명시적**: 필요한 데이터만 Props로 전달합니다.
- **타입 정의**: 모든 Props는 Interface로 타입을 정의해야 합니다.
- **기본값**: 선택적 Props(`?`)는 기본값을 설정하는 것이 좋습니다.

### Presentational vs Container

- **Presentational**: UI를 어떻게 보여줄지 담당 (Stateless, Props 위주)
- **Container**: 데이터와 로직을 어떻게 처리할지 담당 (State, Hooks, API 호출)
- _최근에는 Hooks의 도입으로 이 경계가 유연해졌지만, 로직과 UI를 분리하는 사고방식은 여전히 유효합니다._

## 3. Storybook (Optional)

UI 컴포넌트의 문서화와 테스트를 위해 Storybook을 도입할 수 있습니다.
(현재 프로젝트에는 설정되어 있지 않으나, 추후 도입 권장)

## 4. 디렉토리 구조 예시

```
components/
  Button/
    Button.tsx        # 컴포넌트 로직
    Button.module.scss # 스타일
    Button.test.tsx   # 테스트
    index.ts          # export 관리
```
