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

      {/* 나머지 섹션들도 같은 방식으로 */}
    </div>
  )
}