# ErrorBoundary 검증 및 Changelog 커스터마이징 가이드

## 1. ErrorBoundary 검증 방법

`ErrorBoundary`가 제대로 작동하는지 확인하기 위해 테스트 페이지를 추가했습니다.

### 설정 확인
1.  **컴포넌트**: `src/app/shared/components/BuggyTest.tsx` (에러 발생 버튼 포함)
2.  **라우트**: `src/app/AppRouter.tsx`에 `/test-error` 경로 추가됨.

### 검증 단계
1.  개발 서버 실행: `npm run dev`
2.  브라우저 접속: `http://localhost:3000/test-error` (포트가 5173이면 5173으로 접속)
3.  **"에러 발생시키기 💣"** 버튼 클릭.
4.  **결과 확인**: 빨간색 에러 화면이나 "문제가 발생했습니다"라는 문구가 뜨면 성공입니다. (개발 모드에서는 React의 에러 오버레이가 먼저 뜰 수 있는데, 닫기(X)를 누르면 ErrorBoundary 화면이 보입니다.)

---

## 2. Changelog 커스터마이징 (Human-Readable)

`npm run release` 실행 시 `standard-version`이 `CHANGELOG.md`를 생성합니다. 더 읽기 좋게 만들기 위해 `package.json`에 설정을 추가했습니다.

### 적용된 설정 (`conventionalcommits` 프리셋)
기존 Angular 프리셋보다 더 이모지를 활용하고 섹션을 명확히 나누는 설정을 적용했습니다.

```json
// package.json 예시
"standard-version": {
  "preset": "conventionalcommits",
  "types": [
    { "type": "feat", "section": "✨ Features (새로운 기능)" },
    { "type": "fix", "section": "🐛 Bug Fixes (버그 수정)" },
    { "type": "docs", "section": "📝 Documentation (문서)" },
    { "type": "style", "section": "💄 Styles (스타일 수정)" },
    { "type": "refactor", "section": "♻️ Refactoring (리팩토링)" },
    { "type": "perf", "section": "⚡️ Performance (성능 개선)" },
    { "type": "test", "section": "✅ Tests (테스트)" }
  ]
}
```

### 추가 커스터마이징 방법

#### 방법 1: `changelog.config.js` (고급)
`package.json` 설정만으로 부족하다면, `conventional-changelog-config-spec`을 따르는 별도 설정 파일을 만들 수 있습니다. 하지만 현재 적용된 `package.json` 방식이 가장 관리가 쉽고 효과적입니다.

#### 방법 2: 커밋 메시지 본문(Body) 활용
커밋 메시지의 제목(Subject)만 Changelog에 나오지만, **Breaking Changes**는 본문에 작성하면 별도 섹션으로 강조됩니다.

```bash
feat(auth): add login page

로그인 페이지를 추가했습니다.
기존 /login-old 경로는 더 이상 지원하지 않습니다.

BREAKING CHANGE: /login-old 경로 삭제됨.
```

이렇게 작성하면 Changelog에 **BREAKING CHANGES** 섹션이 크게 생겨서 중요한 변경사항을 놓치지 않게 됩니다.

#### 방법 3: 수동 수정
`npm run release`는 자동으로 버전을 올리고 태그를 답니다. 만약 Changelog를 배포 전에 수정하고 싶다면:

1.  `npm run release -- --skip.commit --skip.tag` (커밋과 태그 생성을 건너뜀)
2.  생성된 `CHANGELOG.md`를 직접 수정.
3.  `git add .`, `git commit ...`, `git tag ...` 수동 실행.
