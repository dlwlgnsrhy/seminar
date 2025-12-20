# Getting Started

이 프로젝트를 로컬 환경에서 실행하고 개발하기 위한 가이드입니다.

## 1. 사전 요구사항 (Prerequisites)

- **Node.js**: v18.0.0 이상 (LTS 버전 권장)
- **npm**: v9.0.0 이상
- **IDE**: VS Code (권장)

## 2. 설치 (Installation)

프로젝트 저장소를 클론하고 의존성을 설치합니다.

```bash
# 저장소 클론
git clone <repository-url>
cd egovReactTsx

# 의존성 설치
npm ci
# 또는
npm install
```

> **Tip**: `npm ci`는 `package-lock.json`을 기준으로 정확한 버전을 설치하므로 협업 시 권장됩니다.

## 3. 실행 (Run)

### 개발 서버 실행

```bash
npm run dev
```

- 브라우저에서 `http://localhost:5173` (또는 터미널에 표시된 주소)으로 접속합니다.
- 소스 코드를 수정하면 자동으로 새로고침(HMR) 됩니다.

### 테스트 실행

```bash
npm run test
```

- 단위 테스트(Vitest)를 실행합니다.

### 린트 검사

```bash
npm run lint:check
```

- 코드 스타일 및 오류를 검사합니다.

## 4. 프로젝트 구조 (Project Structure)

```
src/
  app/
    core/       # 앱 전반의 설정, 상수, 유틸리티
    features/   # 기능 단위 모듈 (Dashboard, Profile 등)
    shared/     # 재사용 가능한 컴포넌트, 훅
    App.tsx     # 메인 앱 컴포넌트
    AppRouter.tsx # 라우팅 설정
```

## 5. VS Code 추천 확장 프로그램

- **ESLint**: 실시간 린트 에러 확인
- **Prettier**: 코드 자동 포맷팅
- **Tailwind CSS IntelliSense**: (Tailwind 사용 시) 클래스 자동 완성
- **GitLens**: 코드 작성자 및 히스토리 확인
