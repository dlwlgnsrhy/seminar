export default function SemOverview(){
  return (
    <div>
      <h1>세미나 로드맵 (5개월)</h1>
      <ol>
        <li>1편: 베이스 코드 표준 (라우터/권한/로딩/에러로깅)</li>
        <li>2편: 데이터 레이어 (React Query, 캐시, 실패 복구)</li>
        <li>3편: 상태/세션 전략 (Zustand, 세션 만료 UX)</li>
        <li>4편: WebView 브릿지 (Flutter/Native 명세)</li>
        <li>5편: 배포/운영 (환경변수, 로깅 집계, 성능 지표)</li>
      </ol>
      <p>각 편은 스크롤 섹션 + 사이드 네비(스크롤스파이) 구성</p>
    </div>
  )
}
