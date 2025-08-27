// src/sections/Sem1.tsx
import { useDeferredValue, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import IntroSplash from '@/components/IntroSplash'
import SnapSection from '@/components/SnapSection'
import { useInViewSnap } from '@/shared/hooks/useInViewSnap'
import Overlay from '@/components/Overlay'

import Kpi from '@/components/Kpi'
import Callout from '@/components/Callout'
import LinkBtn from '@/components/LinkBtn'

import Iceberg from '@/components/Iceberg'
import IcebugSlide from '@/components/IcebugSlide'

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
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

type ProjectRow = {
  name: string
  structure: string
  routing: string
  perf: string
  ops: string
  docs: string
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
const severityWeight: Record<Severity, number> = {
  critical: 3, high: 2, medium: 1, low: 0
}

function highlight(text: string, q: string){
  if(!q) return text
  const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(${safe})`, 'ig')
  return text.split(re).map((part, i) =>
    re.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
  )
}

function exportCSV(rows: AuditRow[]){
  const header = ['project','step','finding','metric','severity']
  const esc = (s='') => `"${String(s).replace(/"/g,'""')}"`
  const lines = [header.join(','), ...rows.map(r =>
    [r.project, r.step, r.finding, r.metric ?? '', r.severity].map(esc).join(',')
  )]
  const blob = new Blob([lines.join('\n')], { type:'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href=url; a.download='audit.csv'; a.click()
  URL.revokeObjectURL(url)
}

/* ------------------------------------------------------------------ */
/* Static Content (slides text)                                       */
/* ------------------------------------------------------------------ */
const CONTENT = {
  icebreaking: {
    title: 'React → Re-act',
    bullets: [
      'React를 “다시” 활용(Re-act)해, 우리 조직 Baseline을 만든다',
      '생태계 표준을 업고 내부 표준화 속도를 높인다',
      '템플릿/가이드/체크리스트를 통해 반복 리스크를 흡수한다',
    ],
    links: [
      { href: 'https://survey.stackoverflow.co/2025/#technology-web-frameworks', label: 'SO 2025' },
      { href: 'https://2024.stateofjs.com/en-US/libraries/front-end-frameworks/', label: 'State of JS' },
      { href: 'https://www.linkedin.com/pulse/software-developer-labor-demand-salary-trends-2025-julius-gromyko-o5vhf', label: 'LinkedIn Trends' },
    ],
  },
  overview: {
    title: 'React Baseline으로 운영 리스크를 구조적으로 흡수',
    bullets: [
      '배경: 잦은 교체·경력 부재·제각각 구조 → 재발 비용 누적',
      '해결: 공통 Baseline(8개 축)으로 표준화',
      '기대효과: 온보딩 TTV ↓, 협업 시간 ↓, 장애 재발률 ↓',
      '오늘의 범위: 문제 → 해법 → 실행 → 측정',
    ],
    memo: '“조직 시스템”으로 품질 확보',
  },
  background: {
    title: '발표 이유 (“Icebug”)',
    bullets: [
      '수면 위: 버그/요청 티켓, UI 핫픽스, 일회성 대응',
      '수면 아래: 전역상태 남용, 라우팅 규칙 불일치, 키 관리/롤오버 부재',
    ],
  },
  baseline: {
    title: '표준으로 일관성과 속도를 만든다',
    pillars: [
      {
        h: '1) 구조/레이어드',
        d: 'page / domain / shared 레이어 분리, UI Kit 모듈화',
      },
      {
        h: '2) 라우팅',
        d: 'React Router v6 + 코드 스플리팅 + 404/서브패스 정책 고정',
      },
      {
        h: '3) HTTP',
        d: 'axios 인스턴스·인터셉터·타임아웃/재시도·에러코드북·토큰 리프레시',
      },
      {
        h: '4) 폼/밸리데이션',
        d: 'react-hook-form + zod/yup, 에러 메시지 표준 + Toast/Dialog 패턴',
      },
      {
        h: '5) 에러/로깅',
        d: 'ErrorBoundary + 사용자 알림 + 서버 로깅 연동(레벨 구분)',
      },
      {
        h: '6) 성능',
        d: '초기 번들 예산(TBD), SDK 지연 로딩, 이미지/차트 최적화, memo 지침',
      },
      {
        h: '7) 품질/협업',
        d: 'ESLint/Prettier/Husky/commitlint + PR 템플릿 + 리뷰 체크리스트',
      },
      {
        h: '8) 문서/온보딩',
        d: '환경셋업·키/릴리즈 절차·체크리스트, Figma/API 핸드오프 규칙',
      },
    ],
    beforeAfter: [
      ['제각각 라우팅', '단일 정책 & 404/리다이렉트 규약'],
      ['SDK 혼재', '추상화/지연 로딩 기준'],
      ['중복 유틸', '공통 패키지/모듈화'],
      ['문서 부재', '온보딩 체크리스트 & PR 템플릿'],
    ],
  },
  plan: {
    title: '파일럿 → 확장: 3단계 실행 로드맵',
    phases: [
      ['Phase 1 (2주)', '규칙·샘플 리포·PR 템플릿·온보딩 체크리스트 / 산출물: Baseline v1, 용어집 / 리스크: 반발 → 워크숍'],
      ['Phase 2 (3주)', '기회비용 높은 프로젝트 파일럿 적용·피드백 / 산출물: 적용 리포트, 성능·온보딩 지표 초기값'],
      ['Phase 3 (1주)', '전사 확장·문서 보강·월간 KPI 리포팅 / 산출물: Baseline v2, 대시보드'],
    ],
  },
  kpis: {
    title: '3대 지표로 개선을 추적',
    rows: [
      ['온보딩 TTV', '신규 투입→첫 PR 머지까지', '목표: 30%↓', '온보딩 체크리스트·PR 로그'],
      ['협업 시간', '디자인 핸드오프→API 연동 완료 왕복', '목표: 20%↓', '이슈 트래킹·PR 코멘트'],
      ['장애 재발률', '동일 원인 이슈 재발 비율', '목표: 50%↓', '에러리포트 태깅'],
    ],
    note: '수치 미정(TBD)은 수집 설계·소스를 명확히 제시',
  },
  cases: {
    title: '파일럿 적용 – 프로젝트 스냅샷',
    note: '전/후: 번들 크기, LCP, 경로 오류, alert→toast 전환, 인터셉터 도입',
  },
}

/* ------------------------------------------------------------------ */
/* Projects Summary (표)                                              */
/* ------------------------------------------------------------------ */
const PROJECT_SUMMARY: ProjectRow[] = [
  {
    name: 'do반장 (my-app)',
    structure: '탭 분기 중복 → 유지보수 리스크',
    routing: '전역 404 없음, 서버 리라이트 의존',
    perf: '초기 번들 과대 + SDK 초기 로드 → LCP 17.7/8.6/9.2s',
    ops: '강제 새로고침 131건, 인터셉터/상태코드 분기 부재',
    docs: 'README/.env.example/PR 템플릿 부재',
  },
  {
    name: '에너지전환마을 (ec_village-react)',
    structure: '환경설정 파일 없음',
    routing: 'basename/homepage 미정합, 절대경로 위주',
    perf: 'JS 589kB / CSS 272kB, LCP ~13s',
    ops: '인터셉터/상태코드 분기 부재, alert 97건',
    docs: '문서화 기본 3종 부재',
  },
  {
    name: '새빛돌봄 (suwon-react)',
    structure: 'API/라우트 절대경로 결합 심함',
    routing: '절대경로 743건(/care_portal 523), basename 미사용',
    perf: 'JS 443kB, LCP 8.1s (개선 여지)',
    ops: 'reload 260, useEffect 인라인 401, 인터셉터 중복 ≥21',
    docs: '.env 존재, README/PR 없음',
  },
  {
    name: '동구라미온 (smartcollection-react)',
    structure: 'CDN 스크립트 혼재(버전 3중 로드)',
    routing: '루트 전제, 서브패스/딥링크 404 위험',
    perf: 'NO_FCP 케이스, 대용량 이미지/폰트',
    ops: 'axios 인스턴스/인터셉터 부재, alert 9',
    docs: '문서화 부족',
  },
]

/* ------------------------------------------------------------------ */
/* Appendix: Evidence Matrix (AUDIT)                                  */
/* ------------------------------------------------------------------ */
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

  // ── 에너지전환마을
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

  // ── 새빛돌봄
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

  // ── 동구라미온
  {
    project: '동구라미온 (smartcollection-react)',
    step: 'Step1 · 라우팅',
    finding: 'BrowserRouter 루트 전제, 서브패스/리라이트 없으면 404',
    severity: 'high',
  },
  {
    project: '동구라미온 (smartcollection-react)',
    step: 'Step2 · index.html/SDK',
    finding: 'Swiper CDN 3중 로드(버전 혼재), %REACT_APP_VERSION% 미치환',
    severity: 'medium',
  },
  {
    project: '동구라미온 (smartcollection-react)',
    step: 'Step4 · 성능',
    finding: 'NO_FCP 케이스, 대용량 이미지·폰트로 초기 페이로드 큼',
    severity: 'high',
  },
  {
    project: '동구라미온 (smartcollection-react)',
    step: 'Step6 · HTTP',
    finding: 'axios 인스턴스/인터셉터 부재, alert 9',
    severity: 'medium',
  },
]

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function SemScreen() {
  useInViewSnap()

  const [ov, setOv] = useState<React.ReactNode | null>(null)
  const open  = (node: React.ReactNode) => setOv(node)
  const close = () => setOv(null)

  // URL sync
  const [params, setParams] = useSearchParams()
  const [sev, setSev] = useState<Severity | 'all'>((params.get('sev') as any) ?? 'all')
  const [q, setQ]     = useState(params.get('q') ?? '')
  const dq = useDeferredValue(q)

  const [sortKey, setSortKey] = useState<'project'|'step'|'severity'>('severity')
  const [asc, setAsc] = useState(false)

  const filtered = useMemo(() => {
    const list = AUDIT.filter(r =>
      (sev==='all' || r.severity===sev) &&
      (dq.trim()==='' ||
        r.project.toLowerCase().includes(dq.toLowerCase()) ||
        r.finding.toLowerCase().includes(dq.toLowerCase()) ||
        (r.metric ?? '').toLowerCase().includes(dq.toLowerCase()))
    )
    return list.sort((a,b)=>{
      if (sortKey==='severity') {
        const d = severityWeight[b.severity] - severityWeight[a.severity]
        return asc ? -d : d
      }
      const va = (a as any)[sortKey] as string
      const vb = (b as any)[sortKey] as string
      const d  = va.localeCompare(vb, 'ko')
      return asc ? d : -d
    })
  }, [sev, dq, sortKey, asc])

  function applySev(s: Severity|'all'){
    setSev(s)
    const next = new URLSearchParams(params)
    s==='all' ? next.delete('sev') : next.set('sev', s)
    q ? next.set('q', q) : next.delete('q')
    setParams(next, { replace:true })
  }
  function applyQuery(val: string){
    setQ(val)
    const next = new URLSearchParams(params)
    sev!=='all' && next.set('sev', sev)
    val ? next.set('q', val) : next.delete('q')
    setParams(next, { replace:true })
  }

  function openProjectDetail(name: string){
    const items = AUDIT.filter(a => a.project === name)
    open(
      <div style={{maxWidth:820}}>
        <h3 style={{marginTop:0}}>{name} · 세부 요약</h3>
        <table className="simple-table">
          <tbody>
            {Object.entries(PROJECT_SUMMARY.find(p=>p.name===name) ?? {}).filter(([k])=>k!=='name').map(([k,v])=>(
              <tr key={k}><th style={{width:120,textTransform:'capitalize'}}>{k}</th><td>{v as string}</td></tr>
            ))}
          </tbody>
        </table>

        {items.length>0 ? (
          <>
            <h4 style={{marginTop:18}}>증거 & 재현</h4>
            <ul style={{paddingLeft:18}}>
              {items.map((it, idx)=>(
                <li key={idx} style={{marginBottom:8}}>
                  <b>{it.step}</b> — {it.finding}
                  {it.metric && <div><code className="metric">{it.metric}</code></div>}
                  {it.evidence?.length ? (
                    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:6}}>
                      {it.evidence.map((e,i)=> e.href ? <LinkBtn key={i} href={e.href} label={e.label}/> : <span key={i}>{e.label}</span>)}
                    </div>
                  ) : null}
                  {it.commands?.length ? (
                    <details style={{marginTop:6}}>
                      <summary>재현 명령</summary>
                      <pre className="code" style={{marginTop:6}}>{it.commands.join('\n')}</pre>
                    </details>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Callout type="info" style={{marginTop:12}}>이 프로젝트의 Matrix 항목이 아직 적습니다. (발표엔 요약만 사용)</Callout>
        )}
      </div>
    )
  }

  return (
    <>
      {ov && <Overlay onClose={close} titleId="ov-title">{ov}</Overlay>}
      <div className="snap-container">

        {/* 1) Icebreaking */}
        <IntroSplash />
        <SnapSection band="intro" id="icebreaking" title={CONTENT.icebreaking.title}>
          <ul>
            {CONTENT.icebreaking.bullets.map((b,i)=><li key={i}>{b}</li>)}
          </ul>
          <div style={{marginTop:12,display:'flex',gap:12,flexWrap:'wrap'}}>
            {CONTENT.icebreaking.links.map((l,i)=> <LinkBtn key={i} href={l.href} label={l.label}/>)}
          </div>
        </SnapSection>

        {/* 2) Overview */}
        <SnapSection band="intro" id="overview" title={CONTENT.overview.title}>
          <ul>
            {CONTENT.overview.bullets.map((b,i)=><li key={i}>{b}</li>)}
          </ul>
          <Callout type="info" style={{marginTop:12}}>{CONTENT.overview.memo}</Callout>
        </SnapSection>

        {/* 3) Background */}
        <SnapSection band="intro" id="icebug" title="발표 이유 (Icebug)">
          <IcebugSlide />
        </SnapSection>

        {/* 4) Projects – 공통 결함 패턴 표 */}
        <SnapSection band="body" id="projects" title="프로젝트 간 공통 결함 패턴 (요약)">
          <table className="simple-table">
            <thead>
              <tr>
                <th>프로젝트</th>
                <th>구조</th>
                <th>라우팅</th>
                <th>성능</th>
                <th>운영</th>
                <th>문서</th>
                <th style={{width:90}}>세부</th>
              </tr>
            </thead>
            <tbody>
              {PROJECT_SUMMARY.map((p,i)=>(
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.structure}</td>
                  <td>{p.routing}</td>
                  <td><code className="metric">{p.perf}</code></td>
                  <td>{p.ops}</td>
                  <td>{p.docs}</td>
                  <td>
                    <button className="linklike ghost" onClick={()=>openProjectDetail(p.name)}>세부 보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Callout type="info" style={{marginTop:12}}>
            위 표는 <b>문제→영향</b> 중심 요약입니다. 각 행의 <b>세부 보기</b>에서 증거·재현 명령을 함께 확인하세요.
          </Callout>
        </SnapSection>

        {/* 5) Baseline */}
        <SnapSection band="body" id="baseline" title={CONTENT.baseline.title}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12}}>
            {CONTENT.baseline.pillars.map((p,i)=>(
              <Callout key={i} type="info">
                <b>{p.h}</b><br/>{p.d}
              </Callout>
            ))}
          </div>
          <h4 style={{marginTop:18}}>Before → After</h4>
          <table className="simple-table">
            <thead><tr><th>Before</th><th>After</th></tr></thead>
            <tbody>
              {CONTENT.baseline.beforeAfter.map(([b,a],i)=>(
                <tr key={i}><td>{b}</td><td>{a}</td></tr>
              ))}
            </tbody>
          </table>
        </SnapSection>

        {/* 6) Plan */}
        <SnapSection band="body" id="plan" title={CONTENT.plan.title}>
          <table className="simple-table">
            <thead><tr><th>Phase</th><th>내용</th></tr></thead>
            <tbody>
              {CONTENT.plan.phases.map(([p,d],i)=>(
                <tr key={i}><td>{p}</td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>
        </SnapSection>

        {/* 7) KPIs */}
        <SnapSection band="body" id="kpis" title={CONTENT.kpis.title}>
          <table className="simple-table">
            <thead><tr><th>지표</th><th>정의</th><th>목표</th><th>측정 소스</th></tr></thead>
            <tbody>
              {CONTENT.kpis.rows.map((r,i)=>(
                <tr key={i}>
                  <td>{r[0]}</td>
                  <td>{r[1]}</td>
                  <td>{r[2]}</td>
                  <td>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Callout type="info" style={{marginTop:12}}>{CONTENT.kpis.note}</Callout>
        </SnapSection>

        {/* 8) 적용 사례 */}
        <SnapSection band="body" id="cases" title={CONTENT.cases.title}>
          <ul>
            <li>번들 크기 / LCP 전후 비교</li>
            <li>경로 오류(서브패스/딥링크) 해소</li>
            <li>alert → toast 전환 / 인터셉터 도입</li>
          </ul>
          <Callout type="info" style={{marginTop:12}}>{CONTENT.cases.note}</Callout>
        </SnapSection>

        {/* Appendix · Matrix (Evidence) */}
        <SnapSection band="intro" id="audit" title="Appendix · Evidence Matrix">
          <div className="audit-toolbar" role="toolbar" aria-label="감사 매트릭스 툴바">
            <div className="sev-group" role="group" aria-label="심각도 필터">
              {(['all','critical','high','medium','low'] as const).map(s => (
                <button
                  key={s}
                  type="button"
                  className={`pill ${sev===s?'on':''} sev-${s}`}
                  aria-pressed={sev===s}
                  onClick={()=>applySev(s)}
                  title={s==='all'?'전체':s.toUpperCase()}
                >
                  {s==='all'?'ALL':s.toUpperCase()}
                </button>
              ))}
            </div>
            <input
              className="search"
              placeholder="프로젝트/이슈/메트릭 검색…"
              aria-label="감사 항목 검색"
              value={q}
              onChange={(e)=>applyQuery(e.target.value)}
            />
            <div className="spacer" />
            <button type="button" className="ghost" onClick={()=>exportCSV(filtered)}>Export CSV</button>
            <span className="rows">{filtered.length} rows</span>
          </div>

          <table className="simple-table audit">
            <caption className="sr-only">감사 항목 테이블</caption>
            <thead>
              <tr>
                {(['project','step','finding','metric','severity'] as const).map(key=>(
                  <th
                    key={key}
                    onClick={()=>{
                      setAsc(k=> key===sortKey ? !k : false)
                      setSortKey(key==='finding'||key==='metric' ? 'project' : key)
                    }}
                    role="button"
                    tabIndex={0}
                    aria-sort={sortKey===key ? (asc?'ascending':'descending') : 'none'}
                  >
                    {key.toUpperCase()}
                  </th>
                ))}
                <th>증거</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r,i)=>(
                <tr key={i}>
                  <td>{highlight(r.project, dq)}</td>
                  <td>{r.step}</td>
                  <td>{highlight(r.finding, dq)}</td>
                  <td><code className="metric">{r.metric ?? '—'}</code></td>
                  <td>
                    <span className={`sev sev-${r.severity}`} aria-label={r.severity}>
                      {r.severity.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button
                      className="linklike ghost"
                      onClick={()=>setOv(
                        <div style={{maxWidth:720}}>
                          <h3 id="ov-title" style={{marginTop:0}}>{r.project} · {r.step}</h3>
                          <p style={{margin:'6px 0 12px 0'}}>{r.finding}</p>
                          {r.metric && <Kpi label="Metric" value={r.metric} />}
                          {r.notes && <Callout type="info">{r.notes}</Callout>}
                          {r.evidence?.length ? <>
                            <h4>증거 링크</h4>
                            <ul style={{paddingLeft:18}}>
                              {r.evidence.map((e,idx)=>(
                                <li key={idx}>
                                  {e.href
                                    ? <a href={e.href} target="_blank" rel="noreferrer">{e.label}</a>
                                    : <span>{e.label}</span>}
                                  {e.note && <span style={{opacity:.7}}> — {e.note}</span>}
                                </li>
                              ))}
                            </ul>
                          </> : null}
                          {r.commands?.length ? <>
                            <h4>재현·수집 명령</h4>
                            <pre className="code">{r.commands.join('\n')}</pre>
                          </> : null}
                          <div style={{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'}}>
                            {(r.evidence ?? []).map((e, idx) =>
                              e.href ? <LinkBtn key={idx} href={e.href} label={e.label}/> : null
                            )}
                          </div>
                        </div>
                      )}
                    >
                      상세
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Callout type="info" style={{marginTop:12}}>
            표는 <b>최상위 리스크 중심 요약</b>입니다. 각 셀의 <b>상세</b> 버튼에서 증거 링크와 <b>재현·수집 명령</b>을 확인하세요.
          </Callout>
        </SnapSection>

        {/* Outro */}
        <SnapSection band="outro" id="summary" title="다음 단계">
          <p>
            경영진 Kick-off 승인 → 리소스 2 FTE 배정 ▶ P0 즉시 착수.<br/>
            마일스톤 달성 후 <b>세미나 #2 – Design System & Storybook</b>에서 결과 공유.
          </p>
        </SnapSection>
      </div>
    </>
  )
}
