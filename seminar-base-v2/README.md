# Company Seminar Base (Vite + React + TS)

유지보수/신규 React 프로젝트의 **베이스 코드 표준**과 **세미나 슬라이드형 웹**을 동시에 제공

## 시작
```bash
npm install
npm run dev
```

## 기능
- 라우팅/권한: 중앙 라우터 구성 + Guard
- 데이터/상태: Axios + React Query(서버상태), Zustand(앱상태)
- 예외/로깅: 전역 핸들러 + Axios 인터셉터 → `/logs/js`
- 로딩 UX: SpinnerOverlay + 요청 경합/취소 패턴
- WebView 브릿지: RN/Flutter/webview_flutter 호환 래퍼
- 세미나 레이아웃: 상단 탭(1~5편), 좌측 스크롤스파이 네비
- 비교군/ADR: `CompareCard`, `ADR` 컴포넌트 포함

## 환경 변수(.env)
```
VITE_API_BASE_URL=/api
VITE_LOG_ENDPOINT=/logs/js
```

## 배포 (GitHub Pages)
- `vite.config.ts`의 `base`를 `/<REPO_NAME>/`로 설정
- `public/404.html` 포함 (SPA 라우팅 대비)

## 백엔드 로그 수집 예시(Spring Boot)
```java
@RestController
@RequestMapping("/logs")
public class FrontLogController {
  @PostMapping("/js")
  public ResponseEntity<Void> log(@RequestBody Map<String, Object> body) {
    // TODO: 인증/허용 IP 등 보안 정책
    // body: { ts, ua, at, status, data, message, url, method, ... }
    return ResponseEntity.ok().build();
  }
}
```

## 라이선스
MIT (사내 표준 템플릿으로 자유 확장)
