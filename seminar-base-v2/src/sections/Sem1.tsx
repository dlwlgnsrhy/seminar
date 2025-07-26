import { useEffect, useState } from 'react'
import SpinnerOverlay from '@/shared/ui/SpinnerOverlay'
import { installGlobalErrorHandlers } from '@/shared/logging/errorLogger'
import CompareCard from '@/components/CompareCard'
import ADR from '@/components/ADR'

export default function SemScreen() {
  useEffect(() => { installGlobalErrorHandlers() }, [])
  const [sel, setSel] = useState<string>('A')
  return (
    <div>
      <TopicSection id="router" title="라우터 관리">
        <p>비개발자 요약: “담당자별로 보여줘야 할 화면만 정확히 열어줍니다.”</p>
        <CompareCard selected={sel} onSelect={setSel} options={[
          { id:'A', title:'React Router + Guard',
            pros:['현행 SPA와 호환','교체 아닌 추가 탑재','학습/리스크 낮음'],
            cons:['SSR/SEO는 별도 고려 필요'] },
          { id:'B', title:'Next.js(App Router)',
            pros:['SSR/SEO 강함'], cons:['전환 비용/리스크 큼'] },
          { id:'C', title:'TanStack Router',
            pros:['타입/데이터 결합 우수'], cons:['사내용 레퍼런스 적음'] }
        ]}/>
      </TopicSection>

      <TopicSection id="auth" title="권한 관리">
        <p>비개발자 요약: “오입장을 막아 CS/오류를 줄입니다.”</p>
        <ADR title="접근제어 규약 v1"
          background="권한별 화면 접근 오류가 잦음"
          decision="역할 기반(RBAC) 가드 + 라우트 메타데이터"
          impact="기획/디자인 산출물 반영 속도 향상, QA 케이스 단순화"
          metrics={['신규 화면 연결 리드타임 2h→30m','권한 오류 CS 건수↓']}
          risk="SEO/SSR 요구는 별도 Next.js 트랙에서 검토"/>
      </TopicSection>

      <TopicSection id="loading" title="서비스 로딩 UX">
        <p>비개발자 요약: “기다림을 보이되 짧게 만듭니다.”</p>
        <p>스피너/스켈레톤 표준 + 요청 경합/취소 처리</p>
      </TopicSection>

      <TopicSection id="errors" title="예외/에러 로깅">
        <p>비개발자 요약: “문제가 생기면 바로 위치와 이유를 알아냅니다.”</p>
        <p>window.onerror/unhandledrejection + axios 인터셉터 → /logs/js</p>
      </TopicSection>

      <TopicSection id="state" title="상태 관리">
        <p>비개발자 요약: “덜 건드리고 더 안전하게 화면을 바꿉니다.”</p>
        <p>서버상태(React Query) vs 앱상태(Zustand) 분리</p>
      </TopicSection>

      <TopicSection id="session" title="세션/Props 개선">
        <p>비개발자 요약: “로그인 만료/재로그인을 예측 가능하게.”</p>
        <p>메모리 토큰 + Silent Refresh, 드릴링 감소</p>
      </TopicSection>

      <TopicSection id="webview" title="웹뷰 브릿지">
        <p>비개발자 요약: “앱과 웹이 같은 언어로 대화합니다.”</p>
        <p>emit/onMessage 래퍼 + 명세서 v1</p>
      </TopicSection>

      <TopicSection id="docs" title="문서화">
        <p>ADR(의사결정 기록), 에러코드표, 브릿지 명세</p>
      </TopicSection>

      <SpinnerOverlay visible={false} />
    </div>
  )
}

function TopicSection({ id, title, children }: any) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      <p style={{ fontSize: 14, opacity: 0.85, marginTop: -6 }}>#{id}</p>
      <div style={{ marginTop: 12 }}>{children}</div>
    </section>
  )
}
