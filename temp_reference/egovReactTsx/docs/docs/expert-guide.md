# Expert Guide: Project Standardization & CI/CD

이 문서는 프로젝트의 CI/CD, 코드 품질 관리, 에러 처리 및 변경 이력 관리를 위한 전문가 가이드입니다.

## 1. CI/CD 파이프라인 (`/docs/docs/ci-cd.md`)

현재 작성된 `docs/docs/ci-cd.md`의 구조(Lint -> Test -> Build)는 표준적이고 훌륭합니다. 추가적으로 다음 사항들을 고려해 보세요.

### 제안 사항

- **Artifacts 설정**: `build` 단계에서 생성된 `dist/` 폴더를 다음 단계(Deploy)나 다운로드를 위해 보존하려면 `artifacts` 설정이 필수입니다.
- **Caching**: `node_modules` 캐싱은 빌드 속도에 매우 중요합니다. `package-lock.json`을 키로 사용하는 것이 좋습니다.
- **Fail Fast**: `lint` 단계에서 실패하면 이후 단계(Test, Build)는 실행되지 않도록 하여 리소스를 절약하세요.

```yaml
# .gitlab-ci.yml 예시 보강
build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
```

## 2. ESLint & Prettier (코드 품질 및 스타일)

현재 프로젝트에는 ESLint는 설정되어 있으나, **Prettier**가 누락되어 있습니다. ESLint는 '코드 품질'(잠재적 오류)을, Prettier는 '코드 스타일'(줄바꿈, 띄어쓰기 등)을 담당하므로 두 도구를 함께 사용하는 것이 표준입니다.

### 제안 사항

1.  **Prettier 설치**: `npm install --save-dev prettier eslint-config-prettier`
2.  **설정 파일 생성**: `.prettierrc` 파일에 팀의 코딩 스타일 정의 (예: singleQuote, tabWidth 등).
3.  **ESLint 통합**: `.eslintrc.cjs`에서 `extends`에 `"prettier"`를 추가하여 스타일 규칙 충돌 방지.
4.  **자동화**: VS Code 설정(`.vscode/settings.json`)에 `"editor.formatOnSave": true`를 추가하여 저장 시 자동 포맷팅 적용.

## 3. ErrorBoundary + 에러 UX

현재 `ErrorBoundary.tsx`는 기본적인 기능을 잘 수행하고 있습니다. UX를 한 단계 더 높이기 위해 다음을 제안합니다.

### 제안 사항

- **홈으로 이동 버튼**: 사용자가 에러 상황에서 벗어날 수 있는 가장 확실한 방법은 '메인으로 이동'입니다. '새로고침' 외에 '홈으로 가기' 버튼을 추가하세요.
- **React Error Boundary 라이브러리 검토**: `react-error-boundary` 라이브러리는 `useErrorBoundary` 훅을 제공하여, 함수형 컴포넌트에서 에러를 리셋하거나 핸들링하기 더 쉽습니다. (현재 클래스형 컴포넌트도 충분히 좋습니다.)
- **API 에러와 구분**: 전역 ErrorBoundary는 렌더링 에러를 잡습니다. API 에러(401, 500 등)는 `axios` interceptor나 `React Query`의 `onError`에서 처리하여 Toast 메시지나 별도의 에러 모달로 보여주는 것이 UX에 더 좋습니다.

## 4. Changelog 보강

`CHANGELOG.md`를 의미 있게 관리하려면 **Commit Message Convention**의 강제화가 필수입니다.

### 제안 사항

- **Husky + Commitlint 도입**: 개발자가 커밋할 때 메시지 형식을 지키지 않으면 커밋을 막는 `commit-msg` 훅을 설정하세요.
  - `npm install --save-dev husky @commitlint/cli @commitlint/config-conventional`
- **범위(Scope) 활용**: `feat(auth): login`과 같이 모듈명을 명시하면 Changelog가 더 읽기 쉬워집니다.
- **자동화**: CI 파이프라인의 마지막 단계(Deploy 후)나 별도의 Release 파이프라인에서 `standard-version`을 실행하여 태그 생성 및 Changelog 업데이트를 자동화할 수 있습니다.
