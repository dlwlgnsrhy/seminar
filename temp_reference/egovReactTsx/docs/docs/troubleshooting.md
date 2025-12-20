# 트러블슈팅 가이드

## 1. 설치 문제 (Installation Issues)

### Windows에서 `EPERM: operation not permitted` 오류

**증상:**

- `npm install` 실행 시 `EPERM: operation not permitted, rmdir ...` 에러 발생
- `npm warn cleanup Failed to remove some directories` 경고 메시지

**원인:**

- 다른 프로세스(VS Code, 터미널, 안티바이러스 등)가 해당 파일을 사용 중이어서 삭제가 불가능한 경우.
- Windows 파일 시스템 권한 문제.

**해결 방법:**

1. **VS Code와 모든 터미널 창을 종료**합니다.
2. 새 터미널을 **관리자 권한(Administrator)**으로 실행합니다.
3. 프로젝트 폴더로 이동하여 아래 명령어를 순서대로 실행합니다:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```
4. 문제가 지속되면 컴퓨터를 재부팅 후 다시 시도합니다.

---

## 2. Vite / 빌드 문제

### `ReferenceError: process is not defined`

**원인:**

- Vite 환경에서 CRA 방식의 `process.env`를 사용하려 할 때 발생 (Vite는 `import.meta.env` 사용).

**해결 방법:**

- `process.env.REACT_APP_...` 코드를 `import.meta.env.VITE_...`로 변경합니다.

### 순환 참조 경고 (Circular Dependency Warnings)

**증상:**

- Vite 콘솔에 순환 참조(Circular dependency) 경고가 다수 발생.
- "Maximum call stack size exceeded" 에러로 브라우저가 멈춤.

**원인:**

- Barrel 파일(`index.ts`)을 동일 모듈 내에서 잘못 참조하여 발생.

**해결 방법:**

- **내부 참조(Internal imports)**: 같은 폴더/모듈 내에서는 Barrel 파일을 거치지 않고 직접 경로를 사용합니다.
  - 예: `import { Button } from './Button'` (O)
  - 예: `import { Button } from '.'` (X)
- **외부 참조(External imports)**: 다른 모듈에서 가져올 때만 Barrel 파일을 사용합니다.
  - 예: `import { Button } from '@/shared/components'` (O)

---

## 3. 테스트 문제

### `Jest is not defined`

**원인:**

- Vitest로 마이그레이션했으나, 일부 테스트 파일이 여전히 Jest 전역 변수(`describe`, `it`, `expect` 등)를 import 없이 사용 중.

**해결 방법:**

- `vitest.config.ts` 파일에 `globals: true` 설정이 있는지 확인합니다.
- `tsconfig.json`의 `types` 배열에 `"vitest/globals"`가 포함되어 있는지 확인합니다.

---

## 4. Zustand 상태 관리

### UI에 상태 변경이 반영되지 않음

**원인:**

- `set` 함수 사용 시 불변성(immutability)을 지키지 않았거나, 상태를 직접 수정(mutation)한 경우.

**해결 방법:**

- 항상 새로운 객체를 반환하도록 `set`을 사용해야 합니다:
  ```ts
  set((state) => ({ count: state.count + 1 })); // 올바른 예: 새 객체 반환
  state.count++; // 틀린 예: 직접 수정
  ```
