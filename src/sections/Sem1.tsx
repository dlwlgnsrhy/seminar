import IntroSplash from '@/components/IntroSplash'
import SnapSection from '@/components/SnapSection'
import { useInViewSnap } from '@/shared/hooks/useInViewSnap'
import Kpi from '@/components/Kpi'
import CompareCard from '@/components/CompareCard'
import ADR from '@/components/ADR'
import Callout from '@/components/Callout'

export default function SemScreen(){
  useInViewSnap()
  return (
    <div className="snap-container">
      <IntroSplash/>

      <SnapSection id="router" title="라우터 관리"> … </SnapSection>
      <SnapSection id="auth" title="권한 관리"> … </SnapSection>
      <SnapSection id="loading" title="서비스 로딩 UX"> … </SnapSection>
      <SnapSection id="errors" title="에러 로깅"> … </SnapSection>
      <SnapSection id="state" title="상태 관리"> … </SnapSection>
      <SnapSection id="session" title="세션 개선"> … </SnapSection>
      <SnapSection id="webview" title="웹뷰 브릿지"> … </SnapSection>
      <SnapSection id="docs" title="문서화"> … </SnapSection>
    </div>
  )
}