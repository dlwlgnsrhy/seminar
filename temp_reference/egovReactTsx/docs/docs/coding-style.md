# Coding Style Guide

이 문서는 프로젝트의 코드 일관성을 유지하고, 주니어 개발자가 쉽게 코드를 이해하고 작성할 수 있도록 돕기 위한 가이드입니다.

## 1. Linting & Formatting

우리는 코드의 품질과 일관성을 위해 **ESLint**와 **Prettier**를 사용합니다.

### ESLint

- **역할**: 코드의 잠재적인 오류를 찾고, 안티 패턴을 방지합니다.
- **실행**: `npm run lint:check` 명령어로 전체 프로젝트를 검사할 수 있습니다.
- **규칙**:
  - `no-unused-vars`: 사용하지 않는 변수는 제거해야 합니다.
  - `react-hooks/rules-of-hooks`: Hook은 최상위 레벨에서만 호출해야 합니다.
  - `eqeqeq`: 일치 연산자는 `===`를 사용합니다.

### Prettier

- **역할**: 코드의 포맷(들여쓰기, 줄바꿈 등)을 자동으로 정리합니다.
- **설정**: `.prettierrc` 파일에 정의되어 있습니다.
  - `printWidth`: 80 (한 줄 최대 길이)
  - `tabWidth`: 2 (들여쓰기 간격)
  - `singleQuote`: true (작은 따옴표 사용)
  - `trailingComma`: "es5" (객체/배열 마지막 요소 뒤 콤마)

## 2. Naming Conventions (명명 규칙)

### 파일 및 폴더

- **모든 TS/JS/TSX/JSX 파일**: PascalCase (예: `MyComponent.tsx`, `Utils.ts`, `ApiService.ts`, `UseAuth.ts`)
- **폴더**: 소문자 및 케밥 케이스 권장 (예: `features/dashboard`, `components/button`)
  - _참고_: 컴포넌트 폴더의 경우 `components/Button/Button.tsx`와 같이 폴더명도 PascalCase를 허용하기도 하지만, 본 프로젝트에서는 폴더는 케밥 케이스(`kebab-case`), 파일은 파스칼 케이스(`PascalCase`)를 원칙으로 합니다.
- **특수 파일**: `index.ts`, `vite.config.ts` 등 설정 파일이나 진입점 파일은 관례에 따라 소문자를 유지할 수 있습니다.

### 변수 및 함수

- **변수**: camelCase (예: `userName`, `isLoggedIn`)
- **상수**: UPPER_SNAKE_CASE (예: `MAX_COUNT`, `API_BASE_URL`)
- **함수**: camelCase (예: `fetchUserData`, `handleClick`)
- **컴포넌트**: PascalCase (예: `UserProfile`, `SubmitButton`)
- **Boolean 변수**: `is`, `has`, `should` 접두사 사용 (예: `isVisible`, `hasError`)

### 타입 및 인터페이스

- **Interface**: PascalCase, `I` 접두사 지양 (예: `UserProps`, `ApiResponse`)
- **Type Alias**: PascalCase (예: `UserRole`)

## 3. Component Structure (컴포넌트 구조)

컴포넌트 파일은 아래 순서로 작성하는 것을 권장합니다.

1. **Imports**: React, 외부 라이브러리, 내부 컴포넌트, 스타일 순
2. **Types/Interfaces**: Props 및 내부 타입 정의
3. **Component Definition**: 컴포넌트 함수 선언
4. **Hooks**: `useState`, `useEffect` 등
5. **Event Handlers**: `handleClick`, `handleChange` 등
6. **Render**: JSX 반환
7. **Exports**: `export default`

```tsx
// 예시
import React, { useState } from 'react';
import styles from './MyComponent.module.scss';

interface MyComponentProps {
  title: string;
}

const MyComponent = ({ title }: MyComponentProps) => {
  // 1. State & Hooks
  const [count, setCount] = useState(0);

  // 2. Handlers
  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  // 3. Render
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
};

export default MyComponent;
```

## 4. 주석 (Comments)

- **JSDoc**: 함수나 컴포넌트의 역할, 파라미터, 반환값을 설명할 때 사용합니다.
- **인라인 주석**: 복잡한 로직이나 비즈니스 규칙을 설명할 때 사용합니다. "무엇을" 하는지보다 "**왜**" 하는지를 적는 것이 좋습니다.

```ts
/**
 * 사용자의 나이를 계산합니다.
 * @param birthDate 생년월일 문자열 (YYYY-MM-DD)
 * @returns 만 나이
 */
const calculateAge = (birthDate: string): number => {
  // ...
};
```
