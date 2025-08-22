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


    // ────────────────────────────────────────────────────────────────
  // Audit Matrix 데이터 & 헬퍼
  // ────────────────────────────────────────────────────────────────
  type Severity = 'critical' | 'high' | 'medium' | 'low'
  type Evidence = { label: string; href?: string; note?: string }
  type AuditRow = {
    project: string
    step: string
    finding: string
    metric?: string
    severity: Severity
    evidence?: Evidence[]
    commands?: string[]
    notes?: string
  }

  const sevBadge = (sev: Severity) => {
    const bg =
      sev === 'critical' ? '#b91c1c' :
      sev === 'high'     ? '#d97706' :
      sev === 'medium'   ? '#059669' : '#2563eb'
    return (
      <span
        style={{
          display:'inline-block', padding:'2px 8px', borderRadius:999,
          color:'#fff', background:bg, fontSize:12, fontWeight:700
        }}
        title={sev}
      >
        {sev.toUpperCase()}
      </span>
    )
  }

  const AUDIT: AuditRow[] = [
    // ── do반장 (my-app)
    {
      project: 'do반장 (my-app)',
      step: 'Step4 · 성능',
      finding: '초기 번들 과대 + 초기 SDK 로드 → LCP 악화',
      metric: 'LCP 17.7 / 8.6 / 9.2 s · JS 734.75KB · CSS 138.05KB (gzip)',
      severity: 'critical',
      evidence: [
        { label: 'buildlog.txt (gzip 합계)', href: 'YOUR_LINK_buildlog' },
        { label: 'Lighthouse 3회 캡처', href: 'YOUR_LINK_lighthouse' }
      ],
      commands: [
        'npm ci --legacy-peer-deps',
        '$env:PUBLIC_URL="/"',
        'npm run build *> buildlog.txt',
        'npx serve -s build -l 5000'
      ],
      notes: '레이지 로딩 비율 낮고, Kakao SDK 초기 로드 중복 가능성'
    },
    {
      project: 'do반장 (my-app)',
      step: 'Step5 · HTTP/코어',
      finding: '강제 새로고침 의존 다수',
      metric: 'reload 계열 131건',
      severity: 'high',
      evidence: [{ label: '검색 결과 캡처', href: 'YOUR_LINK_reload_screenshot' }],
      commands: [
        "Select-String -Pattern 'window\\.location\\.reload|navigate\\(0\\)' -AllMatches ..."
      ]
    },
    {
      project: 'do반장 (my-app)',
      step: 'Step6 · 에러/인터셉터',
      finding: '전역 인터셉터/상태코드 분기 부재, alert 다수',
      metric: 'alert 572건',
      severity: 'high',
      evidence: [{ label: 'alert 카운트 캡처', href: 'YOUR_LINK_alert_count' }]
    },

    // ── 에너지전환마을 (ec_village-react)
    {
      project: '에너지전환마을 (ec_village-react)',
      step: 'Step1 · 라우팅',
      finding: 'BrowserRouter + homepage/basename 미정합, 절대경로 위주',
      severity: 'medium',
      evidence: [{ label: 'App/index/route 스니펫', href: 'YOUR_LINK_routing_snips' }]
    },
    {
      project: '에너지전환마을 (ec_village-react)',
      step: 'Step4 · 성능',
      finding: '초기 리소스 과다 → LCP 장기화',
      metric: 'LCP ~13s · JS 589.31KB · CSS 271.99KB (gzip)',
      severity: 'high',
      evidence: [
        { label: 'buildlog.txt (합계)', href: 'YOUR_LINK_buildlog_ec' },
        { label: 'Lighthouse 캡처', href: 'YOUR_LINK_lh_ec' }
      ]
    },
    {
      project: '에너지전환마을 (ec_village-react)',
      step: 'Step6 · 에러/인터셉터',
      finding: '공용 axios 인스턴스/인터셉터 없음, 상태코드 분기 없음, alert 다수',
      metric: 'alert 97건',
      severity: 'high'
    },

    // ── 새빛돌봄 (suwon-react)
    {
      project: '새빛돌봄 (suwon-react)',
      step: 'Step1 · 라우팅',
      finding: '절대경로 하드코딩 대량 + homepage=/care_portal, basename 미사용',
      metric: '절대경로 743건 (그중 /care_portal 523건) · navigate() 506건',
      severity: 'high',
      evidence: [
        { label: '절대경로 카운트 CSV', href: 'YOUR_LINK_abs_csv' },
        { label: 'navigate 카운트', href: 'YOUR_LINK_nav_count' }
      ]
    },
    {
      project: '새빛돌봄 (suwon-react)',
      step: 'Step4 · 성능',
      finding: '리소스 중간 수준, LCP 개선 여지',
      metric: 'LCP 8.1s · JS 443.44KB · CSS 47.12KB (gzip)',
      severity: 'medium',
      evidence: [
        { label: 'build 파일 기반 gzip 측정 CSV', href: 'YOUR_LINK_gzip_fromfiles' },
        { label: 'Lighthouse 캡처', href: 'YOUR_LINK_lh_suwon' }
      ]
    },
    {
      project: '새빛돌봄 (suwon-react)',
      step: 'Step5 · HTTP/코어',
      finding: '강제 새로고침 다수 + 초기 중복 호출 징후',
      metric: 'reload 계열 260건 · useEffect 인라인 401건',
      severity: 'high',
      evidence: [{ label: '네트워크 탭 스샷', href: 'YOUR_LINK_network_dup' }]
    },
    {
      project: '새빛돌봄 (suwon-react)',
      step: 'Step6 · 에러/인터셉터',
      finding: 'axios.create 없음 + response 인터셉터가 여러 파일에 중복 등록',
      metric: 'interceptors.response.use ≥ 21곳 · alert 34건',
      severity: 'medium',
      evidence: [{ label: '인터셉터 매칭 목록', href: 'YOUR_LINK_interceptors_list' }]
    },
  ]

    const [q, setQ] = useState('');
const [sev, setSev] = useState<Severity | 'all'>('all');

const filtered = AUDIT.filter(r =>
  (sev === 'all' || r.severity === sev) &&
  (q.trim() === '' ||
   r.project.toLowerCase().includes(q.toLowerCase()) ||
   r.finding.toLowerCase().includes(q.toLowerCase()) ||
   (r.metric ?? '').toLowerCase().includes(q.toLowerCase()))
);

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
                {/* ─────────── Slide X · 프로젝트 디버깅 현황 Matrix ─────────── */}
        <SnapSection band="intro" id="audit" title="프로젝트 디버깅 현황 Matrix">
          {/* ✅ 툴바 추가 */}
  <div className="audit-toolbar">
    <div className="sev-group" role="group" aria-label="severity filter">
      {(['all','critical','high','medium','low'] as const).map(s => (
        <button
          key={s}
          className={`pill ${sev===s?'on':''} sev-${s}`}
          onClick={()=>setSev(s)}
          title={s==='all'?'전체':s.toUpperCase()}
        >
          {s==='all'?'ALL':s.toUpperCase()}
        </button>
      ))}
    </div>
    <input
      className="search"
      placeholder="프로젝트/이슈/메트릭 검색…"
      value={q}
      onChange={(e)=>setQ(e.target.value)}
    />
  </div>
          <table className="simple-table audit" >
            <thead>
              <tr>
                <th style={{width:180}}>프로젝트</th>
                <th style={{width:140}}>Step</th>
                <th>핵심 이슈</th>
                <th style={{width:280}}>지표/메트릭</th>
                <th style={{width:120}}>심각도</th>
                <th style={{width:120}}>증거</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i}>
                  <td>{r.project}</td>
                  <td>{r.step}</td>
                  <td>{r.finding}</td>
                  <td><code className="metric">{r.metric ?? '—'}</code></td>
                  <td>{sevBadge(r.severity)}</td>
                  <td>
                    <button
                      className="linklike ghost"
                      onClick={() =>
                        open(
                          <div style={{maxWidth:720}}>
                            <h3 style={{marginTop:0}}>
                              {r.project} · {r.step}
                            </h3>
                            <p style={{margin:'6px 0 12px 0'}}>{r.finding}</p>

                            {r.metric && (
                              <Kpi label="Metric" value={r.metric} />
                            )}

                            {r.notes && (
                              <Callout type="info">{r.notes}</Callout>
                            )}

                            {r.evidence && r.evidence.length > 0 && (
                              <>
                                <h4>증거 링크</h4>
                                <ul style={{paddingLeft:18}}>
                                  {r.evidence.map((e, idx) => (
                                    <li key={idx}>
                                      {e.href ? (
                                        <a href={e.href} target="_blank" rel="noreferrer">
                                          {e.label}
                                        </a>
                                      ) : (
                                        <span>{e.label}</span>
                                      )}
                                      {e.note && <span style={{opacity:.7}}> — {e.note}</span>}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}

                            {r.commands && r.commands.length > 0 && (
                              <>
                                <h4>재현·수집 명령</h4>
                                <pre style={{
                                  background:'#0f172a', color:'#e5e7eb',
                                  padding:12, borderRadius:8, overflow:'auto'
                                }}>
                                {r.commands.join('\n')}
                                </pre>
                              </>
                            )}
                            <div style={{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'}}>
                              {(r.evidence ?? []).map((e, idx) =>
                                e.href ? <LinkBtn key={idx} href={e.href} label={e.label}/> : null
                              )}
                            </div>
                          </div>
                        )
                      }
                    >
                      상세
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Callout type="info" style={{marginTop:12}}>
            표는 <b>최상위 리스크 중심 요약</b>입니다. 각 셀의 <b>상세</b> 버튼을 클릭하면
            증거 링크(빌드 로그, Lighthouse, 스크립트 캡처)와 <b>재현·수집 명령</b>을 바로 볼 수 있어요.
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