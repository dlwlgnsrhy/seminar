# React Baseline Project

이 프로젝트는 **React + TypeScript + Vite** 기반의 현대적인 웹 애플리케이션 베이스라인입니다.
확장 가능한 아키텍처(Feature-Sliced Design 영감), 강력한 개발 도구, 그리고 자동화된 배포 파이프라인을 포함하고 있습니다.

## � Quick Start

### 1. 설치 (Installation)

```bash
# 저장소 클론
git clone <repository-url>
cd egovReactTsx

# 의존성 설치
npm ci
```

### 2. 실행 (Run)

```bash
# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 테스트 실행
npm run test
```

### 3. 빌드 (Build)

```bash
# 개발 환경 빌드
npm run build:dev

# 운영 환경 빌드
npm run build:prod
```

---

## 📚 Documentation

프로젝트에 대한 자세한 가이드는 `docs/` 폴더에 있습니다.

- [**Getting Started**](docs/docs/getting-started.md): 설치 및 실행 가이드
- [**Coding Style**](docs/docs/coding-style.md): 코드 컨벤션 (ESLint, Prettier, Naming)
- [**Project Structure**](docs/docs/folder-structure.md): 폴더 구조 및 아키텍처 설명
- [**Component Guide**](docs/docs/components.md): 컴포넌트 설계 원칙
- [**Styling Guide**](docs/docs/scss-guide.md): SCSS 및 CSS Modules 사용법
- [**Deployment**](docs/docs/deployment.md): 빌드 및 배포 가이드

---

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite
- **State Management**: Zustand, React Query (TanStack Query)
- **Styling**: SCSS, CSS Modules
- **Testing**: Vitest, React Testing Library, Cypress
- **Linting**: ESLint, Prettier

---

## 📐 Commit 규칙 (Conventional Commits)

본 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다.

### 💡 Husky와 자동 수정(Auto-fix) 정책
이 프로젝트는 개발 편의성을 위해 **자동 수정(`--fix`)** 기능이 켜져 있습니다.

*   **자동으로 고쳐지는 것**: 줄 바꿈, 들여쓰기, 세미콜론, 사용하지 않는 import 제거 등.
    *   👉 *개발자가 신경 쓰지 않아도 커밋 시 알아서 정리됩니다.*
*   **커밋이 막히는 것**: 문법 에러, 정의되지 않은 변수 사용, 타입 에러 등.
    *   👉 *터미널의 에러 로그를 보고 직접 수정한 뒤 다시 커밋하세요.*

### 커밋 메시지 작성법

```bash
(git 줄바꿈 에러 해결 시)git config --global core.autocrlf true
git add .
```

`npm run commit` 명령어를 사용하면 대화형 인터페이스로 쉽게 커밋 메시지를 작성할 수 있습니다.

```bash
npm run commit
```

### 주요 Type

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 포맷팅 (로직 변경 없음)
- **refactor**: 코드 리팩토링
- **test**: 테스트 코드 추가/수정
- **chore**: 빌드/환경설정/패키지 관련 작업
- **perf**: 성능 개선
- **BREAKING CHANGE**: 호환성을 깨뜨리는 변경 (major 버전 증가)

### 예시

```

feat(auth): 로그인 로직 리팩토링
fix(api): 사용자 조회 시 null 에러 수정
docs(readme): 설치 가이드 추가

```

---

## 🔄 Release & Changelog

`standard-version`을 사용하여 버전을 관리하고 변경 이력을 자동 생성합니다.

```bash
npm run commit
```

### 2️⃣ Commitizen 입력 단계

| 단계                 | 설명                    | 예시 입력                     |
| -------------------- | ----------------------- | ----------------------------- |
| type                 | 변경 유형               | feat                          |
| scope                | 영향 받는 영역 (옵션)   | login                         |
| description          | 한 줄 요약              | 로그인 버튼 스타일 개선       |
| longer description   | 상세 설명 (선택)        | 로그인 버튼 색상과 크기 조정  |
| breaking change      | 호환성 깨지는 변경 여부 | Yes                           |
| breaking description | 구체적 설명             | `/v1/login API 파라미터 변경` |
| affect issues        | 관련 이슈               | #123                          |

---

### 3️⃣ 실제 입력 예시

Commitizen 질문에 따라 입력:

```
? Select the type of change that you're committing: feat
? What is the scope of this change (e.g. component or file name): login
? Write a short, imperative tense description of the change: 로그인 버튼 스타일 개선
? Provide a longer description of the change: 로그인 버튼 색상과 크기 조정
? Are there any breaking changes? Yes
? Describe the breaking changes: /v1/login API 파라미터 변경
? Does this change affect any open issues? No
```

결과 커밋 메시지:

```
feat(login): 로그인 버튼 스타일 개선

로그인 버튼 색상과 크기 조정

BREAKING CHANGE: /v1/login API 파라미터 변경
```

---

### 4️⃣ CHANGELOG 반영

`npm run release` 실행 후, CHANGELOG.md:

```
### Features
- login: 로그인 버튼 스타일 개선

### ⚠ BREAKING CHANGES
- /v1/login API 파라미터 변경
```

- 기본은 **patch (버그 수정) → 0.0.x 증가**
- minor 버전 업:

  ```bash
  npm run release:minor
  ```

# Major 버전 릴리스 (v1.0.0 -> v2.0.0)

npm run release:major

````

  → x.0.0 증가

### 2) 변경사항 확인

`CHANGELOG.md` 파일이 자동으로 업데이트됩니다.

### 3) 원격 반영

```bash
git push --follow-tags origin <branch-name>
````

---

## 📝 CHANGELOG 관리

- 모든 변경사항은 `CHANGELOG.md`에 기록됩니다.
- `npm run release` 실행 시 자동으로 갱신됩니다.
- 수동 수정은 피하고, commit 메시지를 통해 기록이 남도록 합니다.

---

## ⚠️ 주의사항

1. **버전 시작**
   - 프로젝트는 **1.0.0**부터 시작합니다.
   - 실수로 여러 번 release를 실행하면 버전이 불필요하게 올라가니 주의하세요.

2. **BREAKING CHANGE 키워드**
   - commit 메시지에 `BREAKING CHANGE`가 포함되면 major 버전이 자동 증가합니다.

3. **태그 관리**
   - 버전 릴리스 시 자동으로 Git 태그(`v1.0.0`)가 생성됩니다.
   - 불필요한 태그는 수동으로 삭제해야 합니다:

     ```bash
     git tag -d v2.0.0
     git push origin --delete v2.0.0
     ```

4. **테스트용 실행 금지**
   - 실제 변경이 없는데 `npm run release`를 실행하면 버전만 불필요하게 증가합니다.
   - 반드시 **변경사항이 존재할 때만 실행**하세요.

---

## 🚀 프로젝트 버전 정책

- **형식**: [SemVer](https://semver.org/) (Semantic Versioning)
- **문서/패키지 분리 버저닝**
  - 코드 패키지 버전과 문서 버전은 각각 별도로 관리합니다.

- `CHANGELOG.md`는 모든 변경 내역을 기록합니다.

---

```

```
