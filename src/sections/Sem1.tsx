import IntroSplash   from '@/components/IntroSplash'
import SnapSection   from '@/components/SnapSection'
import { useInViewSnap } from '@/shared/hooks/useInViewSnap'

import Kpi           from '@/components/Kpi'
import Callout       from '@/components/Callout'
import CompareCard   from '@/components/CompareCard'
import ADR           from '@/components/ADR'
import LinkBtn from '@/components/LinkBtn'

export default function SemScreen () {
  useInViewSnap()

  return (
    <div className="snap-container">
      <IntroSplash />
      <SnapSection band='intro' id="intro-react" title="Why React + TypeScript?">
      <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20}}>
        <Kpi label="NPM 주간 DL" value="22 M+" />
        <Kpi label="TS 채용 비중" value="36 %" caption="국내 FE 공고" />
      </div>

      <Callout type="info">
        • **생태계 최대** (라이브러리·인력 풀) → 인력 교체 리스크 최소화<br/>
        • **JSX + 단방향 데이터 플로** → 디자인→코드 전환 용이<br/>
        • **Type Safety** → 런타임 오류 65 %↓, IDE 리팩터링 속도↑
      </Callout>

  <CompareCard selected="react-ts" options={[
    {id:'react-ts',title:'React 18 + TS',pros:['생태계','IDE 지원'],cons:[]},
    {id:'vue',     title:'Vue 3',        pros:['단순 API'],cons:['인력 풀↓']},
    {id:'angular', title:'Angular',      pros:['All-in-One'],cons:['러닝커브↑']},
  ]}/>
</SnapSection>
<SnapSection band='intro' id="intro-roadmap" title="6-Month Road-map">
  {/* 가로 타임라인 */}
  <div style={{display:'flex',justifyContent:'space-between',gap:12,marginTop:16}}>
    {['M1 CodeStyle','M2 DesignSys','M3 State/Data','M4 Routing/Auth','M5 Quality','M6 Perf/Deploy']
      .map((label,i)=>(
        <div key={i} style={{flex:'1 1 0',textAlign:'center'}}>
          <div style={{width:12,height:12,borderRadius:'50%',
                       background:'var(--primary)',margin:'0 auto'}}/>
          <p style={{fontSize:12,marginTop:6}}>{label}</p>
        </div>
    ))}
  </div>

  <Callout type="success">
    매달 “실전 적용 → 지표 수집 → 세미나 발표” 플라이휠로 진행합니다.
  </Callout>
</SnapSection>

{/* ───  본론 (6 트랙)  ─── */}
      {/* ───────────────────────────  #0 WHY REACT?  ─────────────────────────── */}
      <SnapSection band='body' id="whyreact" title="왜 React인가?">
        {/* 수요·생태계 KPI 예시 → 실제 수치로 교체 */}
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20}}>
          <Kpi label="NPM 주간 다운로드" value="> 22M" caption="2025.07" />
          <Kpi label="GitHub Stars" value="210k ★" caption="facebook/react" />
          <Kpi label="채용 공고 비중" value="36 %" caption="크몽·사람인 FE 공고" />
        </div>

        <Callout type="info">
          우리 회사 **5개 유지보수 프로젝트 전부 React/TS**.  
          <b>인력 확보·재사용·생태계 측면에서 React 유지가 최적</b>임을 먼저 재확인합니다.
        </Callout>

        {/* 프레임워크 비교군 */}
        <CompareCard selected="react" options={[
          {id:'react', title:'React 18+', pros:['Component 모델','TS 호환','생태계 최대'], cons:[]},
          {id:'vue',   title:'Vue 3',      pros:['옵션 API 단순'], cons:['기업 인력 풀 작음']},
          {id:'ng',    title:'Angular 17', pros:['All-in-One'], cons:['학습 곡선↑','JSX 없음']},
        ]}/>

        <ADR
          title="ADR-000 · React 유지 재확인"
          background="인력 교체 발생 → 다른 프레임워크 도입 제안이 산발적으로 나옴"
          decision="2025~26년 회사 Web UI 표준 = React 18 + TypeScript 로 고정"
          impact="채용 pool 최대 활용, RN·Electron·웹뷰 코드 공유 라인 확보"
        />

        <div style={{marginTop:24,display:'flex',gap:12}}>
          <LinkBtn href="https://survey.stackoverflow.co/2024/#technology-web-frameworks" label="SO 설문 2024" />
          <LinkBtn href="https://trends.google.com/trends/explore?q=React,Vue,Angular" label="Google Trends" />
        </div>
      </SnapSection>

      {/* ────────────────────────────────────────  #1 Code Style & Repo  */}
      <SnapSection band='body' id="codestyle" title="코드 스타일 · 레포 레이아웃">
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20}}>
          <Kpi label="온보딩 소요" value="3주 → 1주" caption="신규 FE 개발자" />
          <Kpi label="CI 캐시 적중" value="65 %" caption="Nx Remote Cache" />
          <Kpi label="규칙 위반"   value="↓ 72 %" caption="pre-commit 훅 이후" />
        </div>

        <Callout type="danger">
          프론트 교체 때마다 **“폴더/네이밍/라이브러리 다 달라요”** → <b>리뷰·버그픽·온보딩 지연</b>
        </Callout>

        <CompareCard selected="nx" options={[
          { id:'nx',    title:'Nx + Turborepo', pros:['Remote 캐시','그래프 의존성','VS Code 플러그인'], cons:['초기 학습 필요']},
          { id:'lerna', title:'Lerna',          pros:['단순 설정'], cons:['캐시/버전 관리 수작업']},
          { id:'multi', title:'멀티 Repo',       pros:['팀별 완전 독립'], cons:['중복 설정·버전 지옥']},
        ]}/>

        <ADR
          title="ADR-001 · 모노레포 도입"
          background="프로젝트별 ESLint/테스트 설정 복붙 → 버전 불일치"
          decision="Nx 모노레포 + `@company/*` 패키지 구조"
          impact="공통 설정 단일화, CI 속도 50 %↓, 온보딩 3 주→1 주"
          metrics={['Nx 캐시 HIT > 60 %','PR 리드타임 △ 20 %','규칙 위반 70 %↓']}
          risk="초기 학습 2-3 일 → 오늘 세미나로 해결"
        />
      </SnapSection>

      {/* ────────────────────────────────────────  #2 라우터 관리 */}
      <SnapSection band='body' id="router" title="라우팅 · Role Guard">
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20}}>
          <Kpi label="접근 오류 CS"  value="↓ 80 %" caption="오입장/404" />
          <Kpi label="신규 화면 등록" value="2h → 30m" caption="메타 기반" />
        </div>

        <Callout>권한별 라우팅 실수로 **CS 폭주** → Role meta + Guard 패턴 필요</Callout>

        <CompareCard selected="react" options={[
          {id:'react', title:'React Router v6', pros:['SPA 호환','가드 패턴 간단'], cons:['SSR는 별도']},
          {id:'next',  title:'Next.js AppRouter', pros:['SSR/SEO'], cons:['전환 비용↑']},
          {id:'tan',   title:'TanStack Router', pros:['타입 안전'], cons:['사내 레퍼런스 적음']},
        ]}/>

        <ADR
          title="ADR-002 · Role Meta Guard"
          background="화면별 권한 누락 · 직링크 이슈"
          decision="Route 객체에 `roles:['ADMIN']` 선언, Guard에서 체크"
          impact="QA Case 30 %↓, 권한 오류 CS ↓"
          metrics={['오입장 CS 5→1 건/월']}
          risk="SSR 프로젝트는 차기 트랙"
        />
      </SnapSection>

      {/* ────────────────────────────────────────  #3 권한 관리 */}
      <SnapSection band='body' id="auth" title="권한 관리 · 세션">
        <Kpi label="재로그인 빈도" value="↓ 60 %" caption="Silent Refresh" />
        <Callout type="info">토큰 만료 전 **사전 갱신** → 사용자는 “끊김”을 못 느낀다</Callout>
        <CompareCard selected="refresh" options={[
          {id:'refresh',title:'Silent Refresh',pros:['UX 무중단'],cons:['Refresh-Token 보관']},
          {id:'popup',  title:'Popup 재인증',pros:['보안 ↑'],cons:['UX 방해']},
        ]}/>
        <ADR title="ADR-003 · 세션 갱신" background="만료 후 401 → 대량 로그아웃"
             decision="만료 T-60s 재요청, 실패 시 재로그인 모달"
             impact="재로그인 CS ↓, 세션 유지율 95 %" metrics={['401 재시도 성공 90 %']}/>
      </SnapSection>

      {/* ────────────────────────────────────────  #4 로딩 UX */}
      <SnapSection band='body' id="loading" title="로딩 UX · 중복 호출">
        <Kpi label="중복 API" value="↓ 30 %" caption="Query Dedup" />
        <CompareCard selected="rq" options={[
          {id:'rq', title:'React Query', pros:['동일키 취소','에러경계'], cons:[]},
          {id:'redux',title:'RTK Query',pros:['Redux 통합'],cons:['BE 다중 baseURL 어려움']},
        ]}/>
        <ADR title="ADR-004 · React Query" background="동일 API N 회 호출"
             decision="키 기반 캐시·취소 정책 채택"
             impact="중복 30 %↓, 스피너 누적 40 %↓"/>
      </SnapSection>

      {/* ────────────────────────────────────────  #5 에러 로깅 */}
      <SnapSection band='body' id="errors" title="프론트 에러 로깅">
        <Kpi label="TTD" value="24h → 2h" caption="Error Pipe" />
        <Callout type="warn">런타임 JS Error + UnhandledRejection 수집이 목표</Callout>
        <ADR title="ADR-005 · FE Error Pipe" background="릴리즈 후 버그 탐지 지연"
             decision="window.onerror + axios 인터셉터 → `/logs/js`"
             impact="탐지 24h→2h, MTTR↓"/>
      </SnapSection>

      {/* ────────────────────────────────────────  #6 상태 관리 */}
      <SnapSection band='body' id="state" title="앱 상태 관리">
        <Kpi label="코드량" value="↓ 18 %" caption="Zustand 모듈" />
        <CompareCard selected="zustand" options={[
          {id:'zustand',title:'Zustand',pros:['보일러플레이트↓'],cons:[]},
          {id:'redux',title:'Redux Toolkit',pros:['DevTools'],cons:['보일러↑']},
        ]}/>
      </SnapSection>

      {/* ────────────────────────────────────────  #7 WebView 브리지 */}
      <SnapSection band='body' id="webview" title="웹뷰 브릿지">
        <Kpi label="Hotfix 리드타임" value="↓ 50 %" caption="Web-to-App CI" />
        <Callout>RN·Flutter 혼재 환경 → JSON-RPC 2.0 래퍼 제안</Callout>
      </SnapSection>

      {/* ────────────────────────────────────────  #8 문서화 */}
      <SnapSection band='body' id="docs" title="문서화 · ADR">
        <Kpi label="신규 페이지 작성" value="↑ 40 %" caption="Docusaurus + ADR CLI" />
        <Callout type="success">“_문서도 코드다_” — PR 머지 조건에 ADR 체크</Callout>
      </SnapSection>
      {/*  ───  결론  ───  */}
    <SnapSection band="outro" id="summary" title="결론 · 수익 & 다음 단계">
      <Kpi label="유지보수 비용" value="↓ 40 %" caption="6개월 예상" />
      <Callout type="success">
        • **B2G(공공기관) 유지보수 계약** : 품질지표 개선 시 재계약 가중치 ↑<br/>
        • **신규 프로젝트** : 표준 베이스 덕분에 견적 ↓ → **마진률 15 % 향상** 예상
      </Callout>

      <ul>
        <li>⚙️ 다음 달 <em>Design System</em> 착수 → Storybook 배포</li>
        <li>📊 모든 KPI는 <em>Grafana 대시보드</em> 공개</li>
        <li>🎤 <strong>세미나 #2</strong> (Design System) 예고: 2025-09-15</li>
      </ul>

      <div style={{marginTop:24,display:'flex',gap:12}}>
        <LinkBtn href="https://grafana.company.com/fe-kpi" label="실시간 KPI" />
        <LinkBtn href="https://github.com/our-org/adr" label="ADR 목록" />
      </div>
        <p style={{marginTop:32,fontStyle:'italic',opacity:.8}}>
          다음 세미나 #2 (<b>Design System · Storybook</b>)에서  
          <u>디자이너-개발자 공동 작업</u> 데모를 보여드립니다. 기대해 주세요!
        </p>
    </SnapSection>
    </div>
  )
}