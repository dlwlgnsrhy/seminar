/* ------------------------------------------------------------------ */
/*  src/sections/Sem1.tsx                                             */
/* ------------------------------------------------------------------ */
import { useState }      from 'react'
import { createPortal }  from 'react-dom'

import IntroSplash       from '@/components/IntroSplash'
import SnapSection       from '@/components/SnapSection'
import { useInViewSnap } from '@/shared/hooks/useInViewSnap'

import Kpi               from '@/components/Kpi'
import Callout           from '@/components/Callout'
import CompareCard       from '@/components/CompareCard'
import ADR               from '@/components/ADR'
import LinkBtn           from '@/components/LinkBtn'

/* ------------------------------------------------------------------ */
/*  Overlay – KPI 근거·캡처용 모달                                    */
/* ------------------------------------------------------------------ */
function Overlay({ children, onClose }:{
  children: React.ReactNode; onClose: () => void
}){
  return createPortal(
    <div className="ov-backdrop" onClick={onClose}>
      <div className="ov-card" onClick={e=>e.stopPropagation()}>
        {children}
        <button className="ov-close" onClick={onClose}>닫기 ✕</button>
      </div>
    </div>, document.body
  )
}

/* ------------------------------------------------------------------ */
/*  세미나 화면                                                      */
/* ------------------------------------------------------------------ */
export default function SemScreen(){
  useInViewSnap()

  const [ov, setOv] = useState<React.ReactNode | null>(null)
  const open  = (node: React.ReactNode) => setOv(node)
  const close = () => setOv(null)

  return (
    <>
      {ov && <Overlay onClose={close}>{ov}</Overlay>}

      <div className="snap-container">

        {/* ─────────── Slide 1 · Title ─────────── */}
        <IntroSplash />

        {/* ─────────── Slide 2 · 현황 & 문제점 ─────────── */}
        <SnapSection band="intro" id="problem" title="현황 & 문제점">
          <ul>
            <li>전담 프론트엔드 개발자 부재로 <b>코드 스타일·구조 불균일</b></li>
            <li>유지보수 중인 React 프로젝트에 <b>CS 이슈 급증</b> → 리소스 과다 소모</li>
            <li>신규 기능 투입 시 <b>학습·정비&nbsp;시간 &gt; 개발&nbsp;시간</b> → 릴리스 지연</li>
          </ul>
        </SnapSection>

        {/* ─────────── Slide 3 · 왜 React 인가? ─────────── */}
        <SnapSection band="intro" id="why-react" title="왜 React 인가?">
          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:18}}>
            <Kpi label="SO Survey 2025" value="79 %" caption="선호도 1위"/>
            <Kpi label="State of JS 2024" value="8,548" caption="응답자"/>
            <Kpi label="연봉 Premium" value="20~30 %"/>
          </div>
          <Callout type="info">
            Stack Overflow·State of JS·LinkedIn 등에서 <b>수요·만족도·연봉</b> 모두 압도적 1위.  
            커뮤니티·생태계 규모가 곧 <em>표준화의 레버리지</em>입니다.
          </Callout>
          <div style={{marginTop:12,display:'flex',gap:12}}>
            <LinkBtn href="https://survey.stackoverflow.co/2025/#technology-web-frameworks" label="SO 2025"/>
            <LinkBtn href="https://2024.stateofjs.com/en-US/libraries/front-end-frameworks/" label="State of JS"/>
            <LinkBtn href="https://www.linkedin.com/pulse/software-developer-labor-demand-salary-trends-2025-julius-gromyko-o5vhf" label="LinkedIn Trends"/>
          </div>
        </SnapSection>

        {/* ─────────── Slide 4 · 목표 ─────────── */}
        <SnapSection band="intro" id="goals" title="목표">
          <ul>
            <li>🔧 <b>통일된 React 템플릿</b> → 라우팅·인증·상태관리·ErrorBoundary 선구축</li>
            <li>🖼️ 페이지 UI 개발에만 집중, <b>서비스 특화 커스터마이징</b>만 구현</li>
            <li>🧪 <b>Shift-Left 품질 관리</b> → 생산 단계 장애·B2G 준수 이슈 사전 차단</li>
            <li>📜 <b>코딩·리뷰·테스트 규칙</b> 문서화 → 품질 편차 최소화</li>
            <li>🤝 <b>협업 프로세스</b>(Figma·WebView) 표준 → 디자이너·앱팀과 원소스 협력</li>
          </ul>
          <div style={{marginTop:12,display:'flex',gap:12}}>
            <LinkBtn href="https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/the%20top%20trends%20in%20tech%202024/mckinsey-technology-trends-outlook-2024.pdf" label="McKinsey 2024"/>
            <LinkBtn href="https://www.mois.go.kr/eng/bbs/type002/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000022&nttId=118313" label="MOIS 지침"/>
          </div>
        </SnapSection>

        {/* ─────────── Slide 5 · 제안 스택 & 규칙 ─────────── */}
        <SnapSection band="intro" id="stack" title="제안 스택 & 규칙">
          <table className="simple-table">
            <thead><tr><th>영역</th><th>표준 도구/가이드</th></tr></thead>
            <tbody>
              <tr><td>프레임워크</td><td>React 18 + TypeScript, Next.js (SSR/SSG)</td></tr>
              <tr><td>상태 관리</td><td>Redux Toolkit + RTK Query / zustand</td></tr>
              <tr><td>UI / 디자인</td><td>MUI + Storybook ↔ Figma Tokens</td></tr>
              <tr><td>코드 품질</td><td>ESLint(airbnb)·Prettier·Husky·commit-lint</td></tr>
              <tr><td>테스트</td><td>Jest + React Testing Library · Cypress e2e</td></tr>
              <tr><td>빌드·배포</td><td>Vite / Webpack, Docker, GitHub Actions → GCP Cloud Run</td></tr>
            </tbody>
          </table>
          <Callout type="info" >
            <b>예시 적용</b><br/>
            • 공통 앱 셸: <code>Layout.tsx</code> + <code>Suspense</code> + <code>ErrorBoundary</code><br/>
            • 인증 플로우: <code>authApi</code> → <code>AuthSlice</code> → React Router guard<br/>
            • 스토리북 워크플로우: <code>Button.stories.tsx</code> → Figma 검사 후 MUI theme token 자동 반영
          </Callout>
          <div style={{marginTop:12,display:'flex',gap:12}}>
            <LinkBtn href="https://github.com/belgattitude/nextjs-monorepo-example" label="Next.js Template"/>
            <LinkBtn href="https://storybook.js.org/docs" label="Storybook Docs"/>
          </div>
        </SnapSection>

        {/* ─────────── Slide 6 · 추진 일정 ─────────── */}
        <SnapSection band="intro" id="schedule" title="추진 일정 (7 주)">
          <table className="simple-table">
            <thead><tr><th>Phase</th><th>기간</th><th>주요 산출물</th></tr></thead>
            <tbody>
              <tr><td>P0. 현황 진단</td><td>1 주</td><td>문제·지표 Baseline, Risk List</td></tr>
              <tr><td>P1. 템플릿 구축</td><td>2 주</td><td>Monorepo, 린트·테스트 자동화, 샘플 App</td></tr>
              <tr><td>P2. 기존 프로젝트 파일럿</td><td>3 주</td><td>모듈 마이그레이션, 성능 개선 리포트</td></tr>
              <tr><td>P3. 문서·교육</td><td>1 주</td><td>개발 가이드, PR 체크리스트, 워크숍</td></tr>
            </tbody>
          </table>
        </SnapSection>

        {/* ─────────── Slide 7 · 협업 흐름 ─────────── */}
        <SnapSection band="body" id="collab" title="디자인팀·앱팀 협업 흐름">
          <ul>
            <li>🎨 <b>Figma Design Token</b> → Style Dictionary → MUI theme</li>
            <li>✅ Storybook에서 UI 컴포넌트 승인 → 버전 태깅</li>
            <li>📱 WebView App: 릴리스 캘린더·Deep Link Scheme·QA 체크리스트 공유</li>
          </ul>
        </SnapSection>

        {/* ─────────── Slide 8 · 거버넌스 ─────────── */}
        <SnapSection band="body" id="governance" title="거버넌스 & 지속 개선">
          <ul>
            <li>🔒 <b>CODEOWNERS</b> & PR Template</li>
            <li>📚 <b>ADR 프로세스</b> 운영 (Architecture Decision Record)</li>
            <li>🗓️ 월 1회 <b>Standards Review Board</b>로 규약 업데이트</li>
          </ul>
        </SnapSection>

        {/* ─────────── Slide 9 · 기대 효과 ─────────── */}
        <SnapSection band="body" id="benefit" title="기대 효과 (예상 지표)">
          <table className="simple-table">
            <thead><tr><th>지표</th><th>현행</th><th>파일럿</th><th>개선률</th></tr></thead>
            <tbody>
              <tr><td>기능 TTR</td><td>14 일</td><td>9 일</td><td>▲ 35 %</td></tr>
              <tr><td>CS 티켓/주</td><td>12 건</td><td>7 건</td><td>▼ 42 %</td></tr>
              <tr><td>On-boarding 소요</td><td>2.0 일</td><td>1.5 일</td><td>▼ 25 %</td></tr>
              <tr><td>Bugs/LOC (SonarQube)</td><td>0.45 %</td><td>0.35 %</td><td>▼ 22 %</td></tr>
            </tbody>
          </table>
          <Callout type="info" >
            근거: Jira Change Log 2025-H1, VOC Dashboard, SonarQube Report 2025-06-30 (모두 내부)
          </Callout>
        </SnapSection>

        {/* ─────────── Outro ─────────── */}
        <SnapSection band="outro" id="summary" title="다음 단계">
          <p>
            경영진 Kick-off 승인 → 리소스 2 FTE 배정 ▶ P0 즉시 착수.<br/>
            Week-별 마일스톤 달성 후 <b>세미나 #2 – Design System & Storybook</b>에서 결과 공유.
          </p>
        </SnapSection>

      </div>
    </>
  )
}