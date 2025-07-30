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
/*  (A) Overlay – KPI 근거 / 캡처용 모달                              */
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
/*  (B) 세미나 #1 전체 화면                                           */
/* ------------------------------------------------------------------ */
export default function SemScreen(){
  useInViewSnap()

  const [ov,setOv] = useState<React.ReactNode|null>(null)
  const open  = (node:React.ReactNode)=>setOv(node)
  const close = ()=>setOv(null)

  return (
    <>
      {ov && <Overlay onClose={close}>{ov}</Overlay>}

      <div className="snap-container">

        {/* ───────────────  Splash  ─────────────── */}
        <IntroSplash/>

  {/* ================================================================ */}
  {/*                     ───  S  E  O  R  O  N  ───                  */}
  {/* ================================================================ */}

  {/* 0-A 현실 진단 */}  
  // 표준화를 하기위한 근거가필요 
  // 1.왜react인가 ?  : 프레임워크의 존속기간 및 회사
  // 2.프론트 개발자의 잦은 변경 
  <SnapSection band="intro" id="pain1" title="현실 진단 – 왜 표준화가 안됐나?">
    <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20}}>
      <Kpi label="온보딩"        value="3 주"  caption="신규 FE"/>
      <Kpi label="Hotfix 탐색"   value="月 30 h"/>
      <Kpi label="프로젝트 불일치" value="5 / 5"/>
    </div>
    <Callout type="danger">
      작은 조직일수록 <b>“사람이 곧 프로세스”</b>.  
      선임 교체·납기 압박 → 표준화가 항상 뒤로 밀렸습니다.
    </Callout>
    <ul>
      <li>⏱️ <b>납기 우선</b> → 리팩터 일정 확보 실패</li>
      <li>👥 <b>외주·교체</b> → 구두 지식 소실</li>
      <li>🛠️ <b>DevOps 공백</b> → CI 효과 체감 부족</li>
    </ul>
    <div style={{marginTop:12}}>
      <LinkBtn href="/capture/jira-onboarding.png" label="📑 Jira 리포트 캡처"/>
    </div>
  </SnapSection>

  {/* 0-B 문서 = 프로세스 */}  
  <SnapSection band="intro" id="docproc" title="사람이 아닌 ‘문서가 프로세스’">
    <Callout type="success">
      지식·결정을 <b>Git Markdown + Storybook</b>으로 버전 관리하면  
      언제든 <em>git blame → 역사 파악 → 빠른 문제 해결</em>이 가능합니다.
    </Callout>

    <ADR
      title="ADR-PRE · README / ADR / Storybook"
      background="구두 전파 → 지식 증발"
      decision="모든 규칙을 docs/ Markdown + Storybook 으로 관리"
      impact="온보딩 3 주→1 주 · Hotfix 30 h→10 h"
      metrics={['ADR 5 건','PR Checklist 100 %']}
    />

    <button className="ov-btn" onClick={()=>open(
      <img src="/capture/doc-structure.png" style={{maxWidth:'100%'}}/>
    )}>📂 디렉터리 구조 캡처</button>
  </SnapSection>

  {/* 1 Why React + TS */}  
  <SnapSection band="intro" id="intro-react" title="Why React + TypeScript?">
    <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20}}>
      <Kpi label="NPM 주간 DL"  value="22 M+"/>
      <Kpi label="TS 채용 비중" value="36 %" caption="국내 FE"/>
    </div>
    <Callout type="info">
      • 생태계 최대 → 인력 교체 리스크↓<br/>
      • JSX + Hooks → 디자인↔코드 전환 용이<br/>
      • Type Safety → 런타임 오류 65 %↓
    </Callout>
    <CompareCard selected="react-ts" options={[
      {id:'react-ts',title:'React 18 + TS',pros:['생태계','IDE 지원'],cons:['—']},
      {id:'vue',     title:'Vue 3',         pros:['단순 API'],        cons:['인력 풀↓']},
      {id:'angular', title:'Angular',       pros:['All-in-One'],     cons:['러닝커브↑']},
    ]}/>
    <div style={{marginTop:20,display:'flex',gap:12}}>
      <LinkBtn href="https://tinyurl.com/npm-react-stats"   label="📑 npm Stats"/>
      <LinkBtn href="https://tinyurl.com/kr-ts-jobs-2025"   label="📑 채용 트렌드"/>
    </div>
  </SnapSection>

  {/* 2 Why SCSS Token */}  
  <SnapSection band="intro" id="intro-scss" title="Why SCSS Design-Token?">
    <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20}}>
      <Kpi label="테마 전환"  value="5 s → 1 s"/>
      <Kpi label="스타일 중복" value="↓ 80 %" caption="Mixin"/>
    </div>
    <Callout type="info">
      변수·믹스인 기반 <b>토큰</b> 시스템 → 다크모드·브랜드 테마 비용 <span style={{whiteSpace:'nowrap'}}>¼</span>.
    </Callout>
    <LinkBtn href="https://tinyurl.com/scss-design-token" label="📑 토큰 사례"/>
  </SnapSection>

  {/* 3 로드맵 */}  
  <SnapSection band="intro" id="intro-roadmap" title="4-Month Road-map">
    <div style={{display:'flex',justifyContent:'space-between',gap:12,marginTop:16}}>
      {['M1 CodeStyle','M2 DesignSys','M3 State/Data','M4 Routing/Auth'].map((l,i)=>(
        <div key={i} style={{flex:'1 1 0',textAlign:'center'}}>
          <div style={{width:12,height:12,borderRadius:'50%',background:'var(--primary)',margin:'0 auto'}}/>
          <p style={{fontSize:12,marginTop:6}}>{l}</p>
        </div>
      ))}
    </div>
    <Callout type="success">
      “실전 적용 → 지표 수집 → 세미나 공유” 플라이휠로  
      6 개월 내 **전 프로젝트 정착**이 목표입니다.
    </Callout>
  </SnapSection>

  {/* ================================================================ */}
  {/*                     ───  B  O  D  Y  ───                         */}
  {/* ================================================================ */}

  {/* #0 React Feature Before / After */}
  <SnapSection band="body" id="whyreact" title="Core React Feature – Before / After">
    <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20}}>
      <Kpi label="Re-render" value="↓ 30 %" caption="useMemo"/>
      <Kpi label="Modal 코드" value="↓ 45 %" caption="Portal"/>
      <Kpi label="런타임 Error" value="↓ 60 %" caption="ErrorBoundary"/>
    </div>
    <ADR
      title="ADR-000 · React 18 유지"
      background="프레임워크 교체 제안 산발"
      decision="2026 까지 UI 표준 = React18 + TS"
      impact="채용 Pool 극대화 · RN / WebView 공유"
    />
  </SnapSection>

  {/* #1 CodeStyle & Repo */}
  <SnapSection band="body" id="codestyle" title="코드 스타일 · 레포 레이아웃">
    <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20}}>
      <Kpi label="온보딩"     value="3 주 → 1 주"/>
      <Kpi label="CI 캐시 HIT" value="65 %"/>
    </div>
    <CompareCard selected="nx" options={[
      {id:'nx',title:'Nx + Turbo',pros:['Remote Cache','Graph 시각화'],cons:['초기 학습↑']},
      {id:'lerna',title:'Lerna',   pros:['단순 설정'],                cons:['캐시 수작업']},
    ]}/>
    <ADR title="ADR-001 · Nx Monorepo"
         background="설정 복붙 난립"
         decision="Nx 모노레포 통합"
         impact="CI 50 %↓ · 코드 공유 ↑"/>
  </SnapSection>

  {/* #2 Router + Guard */}
  <SnapSection band="body" id="router" title="라우팅 · Role Guard">
    <Kpi label="권한 오류 CS" value="↓ 80 %"/>
    <Callout>Route meta + Guard 패턴으로 오입장·404 CS를 근절합니다.</Callout>
    <CompareCard selected="react" options={[
      {id:'react',title:'React Router v6',pros:['SPA 호환','가드 간단'],cons:['SSR 별도']},
      {id:'next', title:'Next.js',        pros:['SSR/SEO'],         cons:['전환 비용↑']},
    ]}/>
    <ADR title="ADR-002 · Role Meta Guard"
         background="오입장·직링크 이슈"
         decision="`roles:['ADMIN']` 메타 + Guard"
         impact="QA Case 30 %↓ · CS↓"/>
  </SnapSection>

  {/* #3 Auth / Session */}
  <SnapSection band="body" id="auth" title="권한 관리 · 세션">
    <Kpi label="재로그인" value="↓ 60 %" caption="Silent Refresh"/>
    <CompareCard selected="refresh" options={[
      {id:'refresh',title:'Silent Refresh',pros:['UX 무중단'],cons:['RT 저장']},
      {id:'popup',  title:'Popup 재인증',  pros:['보안↑'],   cons:['UX 방해']},
    ]}/>
    <ADR title="ADR-003 · 세션 갱신"
         background="만료 후 401 대량 발생"
         decision="만료 T-60 s 재요청, 실패→재로그인 Modal"
         impact="세션 유지 95 % · CS↓"/>
  </SnapSection>

  {/* #4 Loading UX */}
  <SnapSection band="body" id="loading" title="로딩 UX · 중복 호출">
    <Kpi label="중복 API" value="↓ 30 %"/>
    <CompareCard selected="rq" options={[
      {id:'rq',title:'React Query',pros:['동일키 취소','에러 경계'],cons:['—']},
    ]}/>
    <ADR title="ADR-004 · React Query"
         background="동일 API N회 호출"
         decision="키 기반 캐시 & 취소 정책"
         impact="중복 호출 30 %↓ · 스피너 40 %↓"/>
  </SnapSection>

  {/* #5 Error Logging */}
  <SnapSection band="body" id="errors" title="프론트 Error Logging">
    <Kpi label="TTD" value="24 h → 2 h"/>
    <ADR title="ADR-005 · FE Error Pipe"
         background="릴리즈 후 버그 탐지 지연"
         decision="window.onerror + axios → `/logs/js`"
         impact="MTTR↓ · 탐지 2 h"/>
  </SnapSection>

  {/* #6 State Management */}
  <SnapSection band="body" id="state" title="앱 상태 관리">
    <Kpi label="코드량" value="↓ 18 %" caption="Zustand"/>
    <CompareCard selected="zustand" options={[
      {id:'zustand',title:'Zustand',      pros:['보일러↓'], cons:['—']},
      {id:'redux',  title:'Redux Toolkit',pros:['DevTools'],cons:['보일러↑']},
    ]}/>
  </SnapSection>

  {/* #7 WebView Bridge */}
  <SnapSection band="body" id="webview" title="WebView Bridge">
    <Kpi label="Hotfix 리드타임" value="↓ 50 %"/>
    <Callout>RN·Flutter 혼재 → JSON-RPC 2.0 래퍼로 통일</Callout>
  </SnapSection>

  {/* #8 Docs · ADR */}
  <SnapSection band="body" id="docs" title="문서화 · ADR">
    <Kpi label="신규 문서" value="↑ 40 %" caption="Docusaurus"/>
    <Callout type="success">“<em>문서도 코드다</em>” – PR 머지 조건에 ADR 체크</Callout>
  </SnapSection>

  {/* ================================================================ */}
  {/*                     ───  G  Y  E  O  L  L  O  N  ───             */}
  {/* ================================================================ */}
  <SnapSection band="outro" id="summary" title="결론 · 수익 & 다음 단계">
    <Kpi label="유지보수 비용" value="↓ 40 %" caption="6 개월 예상"/>
    <Callout type="success">
      • B2G 공공 지표 개선 → 재계약 가중치 ↑<br/>
      • 표준 베이스 → 신규 견적 단가 15 % 마진 ↑
    </Callout>
    <p style={{marginTop:32,fontStyle:'italic',opacity:.8}}>
      세미나 #2 (<b>Design System · Storybook</b>)에서  
      디자이너-개발자 콜라보 데모를 만나보세요!
    </p>
  </SnapSection>

      </div>
    </>
  )
}