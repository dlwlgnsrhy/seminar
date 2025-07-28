import SnapSection from '@/components/SnapSection'
import { useInViewSnap } from '@/shared/hooks/useInViewSnap'
import CompareCard from '@/components/CompareCard'
import ADR from '@/components/ADR'
import Kpi from '@/components/Kpi'
import Callout from '@/components/Callout'

export default function SemScreen() {
  useInViewSnap()
  return (
    <div className="snap-container">
      <SnapSection id="router" title="라우터 관리">
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
          <Kpi label="초기 셋업" value="2h → 30m"/>
          <Kpi label="중복 호출" value="−30%"/>
          <Kpi label="탐지 시간" value="24h → 2h"/>
        </div>
        <Callout>담당자별로 보여줘야 할 화면만 정확히 열어줍니다.</Callout>
        <div style={{marginTop:16}}>
          <CompareCard selected="A" options={[
            { id:'A', title:'React Router + Guard', pros:['현행 SPA 호환','추가 탑재'], cons:['SSR 별도'] },
            { id:'B', title:'Next.js(App Router)', pros:['SSR/SEO'], cons:['전환 비용↑'] },
            { id:'C', title:'TanStack Router', pros:['타입/데이터 결합'], cons:['레퍼런스 적음'] },
          ]}/>
          <div style={{marginTop:16}}>
            <ADR
              title="접근제어 규약 v1"
              background="권한별 오입장/직링크 이슈"
              decision="Route 메타 + Guard"
              impact="반영속도↑, QA 케이스 단순화"
              metrics={['연결 리드타임 2h→30m','권한 오류 CS↓']}
              risk="SSR은 차기 트랙" />
          </div>
        </div>
      </SnapSection>

      <SnapSection id="auth" title="권한 관리">
        <p>오입장 방지 및 안내 UX 표준화.</p>
      </SnapSection>

      <SnapSection id="loading" title="서비스 로딩 UX">
        <p>스피너/스켈레톤 표준 + 경합/취소 처리.</p>
      </SnapSection>
      <SnapSection id="errors" title="예외/에러 로깅">
        <p>window.onerror / unhandledrejection + axios 인터셉터로 에러를 /logs/js에 수집.</p>
      </SnapSection>

      <SnapSection id="state" title="상태 관리">
        <p>서버상태(React Query) / 앱상태(Zustand) 분리, 중복 호출/경합 억제.</p>
      </SnapSection>

      <SnapSection id="session" title="세션/Props 개선">
        <p>토큰 만료 사전 갱신, 실패 시 예측 가능한 재로그인 UX.</p>
      </SnapSection>

      <SnapSection id="webview" title="웹뷰 브릿지">
        <p>emit/onMessage 래퍼로 RN/Flutter와 메시지 스펙 통일.</p>
      </SnapSection>

      <SnapSection id="docs" title="문서화">
        <p>ADR/에러코드표/브릿지 명세를 저장소에 버저닝.</p>
      </SnapSection>
    </div>
  )
}