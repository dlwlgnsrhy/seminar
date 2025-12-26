import React from 'react'
import SnapSection from '@/components/SnapSection'
import HeroIntro from '@/components/HeroIntro'
import PlanRoadmapS2 from '@/components/PlanRoadmapS2'
import ChapterHeader from '@/components/ChapterHeader'
import TerminalLog from '@/components/TerminalLog'
import Callout from '@/components/Callout'
import CodeBox from '@/components/CodeBox'
import DiffBox from '@/components/DiffBox'
import BentoGrid from '@/components/BentoGrid'
import CompareSlider from '@/components/CompareSlider'
import MetricCard from '@/components/MetricCard'
import Overview from '@/components/Overview'
import LinkBtn from '@/components/LinkBtn'

import { useInViewSnap } from '@/shared/hooks/useInViewSnap'

const METERICS: { title: string; value: string; detail: string; trend: 'up' | 'down' }[] = [
  { title: '빌드 속도', value: '85%', detail: 'CRA 120s → Vite 18s', trend: 'up' },
  { title: '번들 크기', value: '42%', detail: '2.1MB → 1.2MB (Gzip)', trend: 'down' },
  { title: '타입 커버리지', value: '100%', detail: 'Strict Mode 완전 적용', trend: 'up' },
  { title: '온보딩 속도', value: '90%', detail: '10일 → 1일 이내', trend: 'up' },
]

export default function Sem2() {
  useInViewSnap()
  return (

    <main className="snap-container">
      {/* CHAPTER 1: 도입부 (Intro) & 목차 */}
      <SnapSection band="ch1" id="ch1-hero" title="" panelClass="panel-xl">
        <HeroIntro
          title="표준화로 만드는 지속 가능한 기술 생태계"
          bullets={[
            "안정성: 거창한 기술보다, 팀 전체가 믿고 쓸 수 있는 최소한의 안전장치",
            "생산성: 개인의 기교에 의존하지 않고 누구나 표준에 안착하기 위한 여정",
            "문화: '정답'을 강요하기보다, 함께 고민한 결과를 유산으로 정립하는 과정"
          ]}
          agenda={[
            { num: "01", text: "명세: Baseline Spec" },
            { num: "02", text: "과정: Pilot Process" },
            { num: "03", text: "성과: Pilot Results" },
            { num: "04", text: "확산: Team Synergy" },
            { num: "05", text: "비전: AX Enterprise" }
          ]}
          links={[
            { href: "#", label: "Baseline Repo" },
            { href: "#", label: "Design Variable Docs" }
          ]}
        />
      </SnapSection>


      {/* CHAPTER 01: Baseline Specs: 기술 명세 */}
      <SnapSection band="ch1" id="ch2-docs" title="" panelClass="panel-xl">
        <ChapterHeader index={1} title="Baseline Specs: 기술 명세" subtitle="말뿐인 가이드가 아닌, 데이터와 근거로 증명하는 표준화의 기록입니다." />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 48 }}>
          <div className="ov-card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, marginBottom: 16, color: 'var(--primary)' }}>Documentation</h3>
            <ul style={{ paddingLeft: 20, fontSize: 15, opacity: 0.8, lineHeight: 1.8 }}>
              <li>Docusaurus 정적 위키 구축</li>
              <li>23개 핵심 기술 명세 완료</li>
              <li>ADR(의사결정 기록) 누적</li>
            </ul>
          </div>

          <div className="ov-card" style={{ padding: 32, background: 'rgba(90,169,255,0.05)', borderColor: 'rgba(90,169,255,0.2)' }}>
            <h3 style={{ fontSize: 20, marginBottom: 16, color: '#fff' }}>Automation</h3>
            <ul style={{ paddingLeft: 20, fontSize: 15, opacity: 0.8, lineHeight: 1.8 }}>
              <li>Vite 빌드 파이프라인 최적화</li>
              <li>Git Hooks (Husky) 자동화</li>
              <li>CI/CD 프리셋 표준화</li>
            </ul>
          </div>

          <div className="ov-card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, marginBottom: 16, color: 'var(--accent)' }}>Productivity</h3>
            <ul style={{ paddingLeft: 20, fontSize: 15, opacity: 0.8, lineHeight: 1.8 }}>
              <li>온보딩 타겟 90분 설정</li>
              <li>Scaffold 템플릿 제공</li>
              <li>UI 컴포넌트 라이브러리 연동</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <LinkBtn href="/seminar/docs/" label="실제 문서 시스템 탐색 (GitHub Pages)" />
        </div>
      </SnapSection>

      {/* CHAPTER 02: 상당 과정 (The Process) - 4 Slides */}

      {/* Slide 1: 성능 최적화 */}
      <SnapSection band="ch2" id="ch2-process-perf" title="" panelClass="panel-xl">
        <ChapterHeader index={2} title="상당 과정 [성능]: 15MB에서 3.7MB로" subtitle="단순히 용량만 큰 게 아니라, 브라우저가 첫 페이지를 그리는데 너무 지쳐있었습니다." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32, marginTop: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <TerminalLog title="Build Log Analysis (The Evidence)" lines={[
              "dist/assets/index.js    2,145.12 kB │ gzip: 580.44 kB !!",
              "dist/assets/vendor.js   1,890.10 kB │ gzip: 490.12 kB !!",
              "경고: 특정 에셋이 권장 용량(500kb)을 초과함"
            ]} />
            <div className="ov-card">
              <h4 style={{ fontSize: 18, color: 'var(--primary)' }}>이미지 포맷 전수 조사</h4>
              <p style={{ fontSize: 15, opacity: 0.8 }}>PNG/JPG 환경에서 cwebp 라이브러리를 통한 일괄 WebP 변환 프로세스를 가동했습니다.</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <DiffBox
              label="코드 스플리팅 전략 (Static vs Lazy)"
              before={`import WritePage from './pages/WritePage';\n// 초기 로딩 시 모든 페이지 다운로드`}
              after={`const WritePage = React.lazy(() => \n  import('./pages/WritePage')\n);\n// 필요한 시점에만 로드 (Chunk 분리)`}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <MetricCard title="전체 용량" value="75%↓" detail="15MB → 3.7MB" trend="down" />
              <MetricCard title="LCP 지표" value="1.2s" detail="대기 시간 대폭 감소" trend="up" />
            </div>
          </div>
        </div>
      </SnapSection>

      {/* Slide 2: 품질 보증(QA) */}
      <SnapSection band="ch2" id="ch2-process-qa" title="" panelClass="panel-xl">
        <ChapterHeader index={2} title="상당 과정 [품질]: 진짜 버그를 잡는 과정" subtitle="테스트 코드는 시간 낭비가 아니라, 가장 빨리 버그를 찾는 지길임을 증명했습니다." />
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 32, marginTop: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <TerminalLog type="audit" title="Vitest / Test Failure Case" lines={[
              "FAIL src/features/Edu/Write_ProgramPage.test.tsx",
              "expected: insertProgram to have been called",
              "received: number of calls: 0",
              "이유: 유효성 검사 충돌로 API 호출 도달 실패 확인"
            ]} />
            <div className="ov-card" style={{ background: 'rgba(255,107,107,0.05)' }}>
              <h4 style={{ fontSize: 18, color: '#ff6b6b' }}>버그 발견 및 해결 사례</h4>
              <p style={{ fontSize: 15, opacity: 0.8, lineHeight: 1.6 }}>`react-hook-form`의 register와 커스텀 onChange 핸들러 충돌로 입력값이 증발하던 로직을 테스트 코드로 적출해냈습니다.</p>
            </div>
          </div>
          <div className="ov-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
            <h4 style={{ fontSize: 22, textAlign: 'center' }}>Test Infrastructure</h4>
            <ul style={{ fontSize: 16, lineHeight: 2.2, opacity: 0.9 }}>
              <li> Vitest + JSDOM 환경 구축</li>
              <li> Kakao Map API 모킹(Mocking)</li>
              <li> 회귀 버그 발생률 0% 달성</li>
              <li> 비즈니스 로직 테스트 80% 커버</li>
            </ul>
          </div>
        </div>
      </SnapSection>

      {/* Slide 3: 접근성 & 협업 */}
      <SnapSection band="ch2" id="ch2-process-a11y" title="" panelClass="panel-xl">
        <ChapterHeader index={2} title="상당 과정 [접근성/협업]: 사용자 중심의 리팩토링" subtitle="디자인은 그대로지만, 코드는 훨씬 친절해졌습니다." />
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 32, marginTop: 40 }}>
          <div className="ov-card" style={{ padding: 40 }}>
            <h4 style={{ fontSize: 24, marginBottom: 24 }}>Semantic & Clean Audit</h4>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>SEARCH QUERY: href='#'</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--primary)' }}>124 Matches</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>무의미한 A 태그 → Button 교체</div>
            </div>
            <div style={{ borderTop: '1px solid var(--surface-2)', paddingTop: 24, marginTop: 24 }}>
              <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>DEAD CODE ELIMINATION</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#ff6b6b' }}>22 Files / 20,000+ Lines</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>미사용 파일 및 좀비 코드 전수 제거</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="ov-card" style={{ background: 'rgba(124,77,255,0.05)' }}>
              <h4 style={{ fontSize: 20, color: 'var(--accent)', marginBottom: 12 }}>디자인 시스템: CSS 변수화</h4>
              <p style={{ fontSize: 15, opacity: 0.8 }}>산재한 #f3f3f3 컬러들을 전수 조사하여 `--primary` 등 전역 변수로 관리. UI 수정 생산성을 50% 향상시켰습니다.</p>
            </div>
            <div className="ov-card">
              <h4 style={{ fontSize: 20, color: 'var(--primary)', marginBottom: 12 }}>스팀 리더 대응 (Aria-label)</h4>
              <p style={{ fontSize: 15, opacity: 0.8 }}>아이콘만 존재하던 햄버거 메뉴, 닫기 버튼에 aria-label을 부여하여 시각 장애인 유저의 인지도를 개선했습니다.</p>
            </div>
          </div>
        </div>
      </SnapSection>

      {/* Slide 4: 보안 (Security) */}
      <SnapSection band="ch2" id="ch2-process-security" title="" panelClass="panel-xl">
        <ChapterHeader index={2} title="상당 과정 [보안]: 보이지 않는 위협으로부터 보호" subtitle="공공기관 시스템에서 가장 중요한 신뢰의 기반, 보안을 코드 레벨에서 강화했습니다." />
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: 32, marginTop: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <TerminalLog type="audit" title="Security Vulnerability Audit" lines={[
              "Scanning dependencies... 1,240 packages checked.",
              "found 12 vulnerabilities (3 high, 9 moderate)",
              "FIXED: engine.io, axios (CVE-2023-45853) updated to safe version",
              "RESULT: 0 vulnerabilities found after remediation"
            ]} />
            <div className="ov-card" style={{ background: 'rgba(75,181,67,0.05)' }}>
              <h4 style={{ fontSize: 18, color: '#4bb543', marginBottom: 12 }}>의존성 건전성 확보</h4>
              <p style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.6 }}>`npm audit` 및 `Snyk`을 연동하여 서드파티 라이브러리의 보안 취약점을 상시 모니터링하고, 위협 발견 시 즉시 패치하는 프로세스를 수립했습니다.</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="ov-card">
              <h4 style={{ fontSize: 18, color: 'var(--primary)', marginBottom: 16 }}>Secure Coding Practice</h4>
              <ul style={{ fontSize: 13, lineHeight: 2, opacity: 0.8 }}>
                <li>🔒 .env.example을 통한 환경변수 관리 표준화</li>
                <li>🔒 dangerouslySetInnerHTML 사용 전수 검사 및 금지</li>
                <li>🔒 API 응답 데이터 화이트리스트 필터링</li>
                <li>🔒 XSS 방지를 위한 자동 이스케이프 설정</li>
              </ul>
            </div>
            <Callout type="info">
              시스템 안정성만큼이나 중요한 <b>데이터 무결성</b>을 지키는 엔지니어링 표준을 세웠습니다.
            </Callout>
          </div>
        </div>
      </SnapSection>

      {/* Slide 5: 표준화 & 문화 */}
      <SnapSection band="ch2" id="ch2-process-culture" title="" panelClass="panel-xl">
        <ChapterHeader index={2} title="상당 과정 [표준화]: 90분 온보딩의 근거" subtitle="새로운 개발자가 왔을 때 '이 코드는 왜 이래요?'라고 묻지 않게 만드는 법" />
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32, marginTop: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="ov-card">
              <h4 style={{ fontSize: 18, color: 'var(--primary)', marginBottom: 12 }}>데이터 흐름의 표준화</h4>
              <p style={{ fontSize: 15, opacity: 0.8, marginBottom: 16 }}>중구난방이던 fetch 호출을 `React Query`로 통일하고, 에러 처리를 인터셉터로 이관했습니다.</p>
              <CodeBox color="var(--primary)" label="Unified API Pattern" code={`export const useNotice = (id) => {\n  return useQuery(['notice', id], () => \n    fetchNotice(id), { onError: globalToast }\n  );\n}`} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="ov-card" style={{ padding: 32 }}>
              <h4 style={{ fontSize: 18, marginBottom: 16 }}>Codification (성문화)</h4>
              <ul style={{ fontSize: 14, lineHeight: 2, opacity: 0.8 }}>
                <li>📍 PHASE_PROGRESS.md: 단계별 결정 사유 기록</li>
                <li>📍 docs/decision-records: 아키텍처 ADR 축적</li>
                <li>📍 README & PR 템플릿 표준화</li>
                <li>📍 90분 온보딩 체크리스트 완성</li>
              </ul>
            </div>
            <Callout type="info">
              <b>Workshop Outcome:</b> 단순 작업자가 아닌, 시스템을 이해하는 엔지니어들의 문화를 만들었습니다.
            </Callout>
          </div>
        </div>
      </SnapSection>


      {/* CHAPTER 03: 최종 성과 (Results & Metrics) */}
      <SnapSection band="ch3" id="ch3-results-integrated" title="" panelClass="panel-xl">
        <ChapterHeader index={3} title="파일럿 성과: 데이터로 보는 혁신" subtitle="단순한 수치를 넘어, 시스템이 가져온 정성적/정량적 변화를 증명합니다." />
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 32, marginTop: 40 }}>
          {/* Left: 4 Core Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {METERICS.map(m => (
              <MetricCard key={m.title} {...m} />
            ))}
          </div>

          {/* Right: 4-Quadrant Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="ov-card" style={{ borderLeft: '4px solid #5aa9ff', padding: '20px' }}>
              <h4 style={{ color: '#5aa9ff', fontSize: 16, marginBottom: 8 }}>1. 성능 극대화</h4>
              <p style={{ fontSize: 12, opacity: 0.8 }}>WebP 자동 변환 및 오프셋 청킹 도입으로 Lighthouse 점수 92+ 달성.</p>
            </div>
            <div className="ov-card" style={{ borderLeft: '4px solid #ff6b6b', padding: '20px' }}>
              <h4 style={{ color: '#ff6b6b', fontSize: 16, marginBottom: 8 }}>2. 서비스 안정성</h4>
              <p style={{ fontSize: 12, opacity: 0.8 }}>Zod 기반 런타임 검증 및 Strict 타입 정의로 회귀 버그 0% 달성.</p>
            </div>
            <div className="ov-card" style={{ borderLeft: '4px solid #51cf66', padding: '20px' }}>
              <h4 style={{ color: '#51cf66', fontSize: 16, marginBottom: 8 }}>3. 생산성 혁명</h4>
              <p style={{ fontSize: 12, opacity: 0.8 }}>AI Agent 자동화 도구로 마이그레이션 및 반복 작업 공수 75%↑ 절감.</p>
            </div>
            <div className="ov-card" style={{ borderLeft: '4px solid #7c4dff', padding: '20px' }}>
              <h4 style={{ color: '#7c4dff', fontSize: 16, marginBottom: 8 }}>4. 표준화 안착</h4>
              <p style={{ fontSize: 12, opacity: 0.8 }}>Scaffold CLI 배포로 신규 프로젝트 초기 세팅 시간 90%↑ 단축.</p>
            </div>
          </div>
        </div>
      </SnapSection>

      <SnapSection band="ch3" id="ch3-case-study" title="" panelClass="panel-xl">
        <ChapterHeader index={3} title="성과 분석: 파일럿 프로젝트" subtitle="계획을 넘어 실제 실무에서 마주한 변곡점과 혁신적 효율화의 기록입니다." />
        <div style={{ marginTop: 32 }}>
          <PlanRoadmapS2 />
        </div>
      </SnapSection>

      {/* CHAPTER 04: 확산 (Team Synergy Hub) */}
      <SnapSection band="ch4" id="ch4-hub" title="">
        <ChapterHeader index={4} title="현장 중심의 협업 허브" subtitle="React(FE)가 중심이 되어 전사적 기술 시너지를 연결하고 이끕니다." />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr 1fr',
          gap: 20,
          marginTop: 40,
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Left: Design/App Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="ov-card" style={{ position: 'relative', overflow: 'hidden', padding: '24px 16px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, background: 'var(--primary)', padding: '2px 8px', fontSize: 10, borderRadius: '0 0 4px 0' }}>DESIGN</div>
              <h5 style={{ color: 'var(--primary)', marginTop: 12 }}>Figma for GitLab</h5>
              <p style={{ fontSize: 12, opacity: 0.7, wordBreak: 'keep-all' }}>이슈 관리 디자인 툴 일원화 및 디자인 토큰 자동 동기화로 소통 비용 제로화.</p>
            </div>
            <div className="ov-card" style={{ position: 'relative', overflow: 'hidden', padding: '24px 16px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, background: '#7c4dff', padding: '2px 8px', fontSize: 10, borderRadius: '0 0 4px 0' }}>APP</div>
              <h5 style={{ color: '#7c4dff', marginTop: 12 }}>Bridge & Lifecycle</h5>
              <p style={{ fontSize: 12, opacity: 0.7, wordBreak: 'keep-all' }}>하이브리드 브릿지 API 표준화 및 Safari 호환성 레이어 구축으로 네이티브급 UX 보장.</p>
            </div>
          </div>

          {/* Center: React FE Hub */}
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: `url('/seminar/visual_engineering_hub_1766732944001.png') no-repeat center/cover`,
            border: '2px solid rgba(90,169,255,0.3)',
            borderRadius: '50%',
            aspectRatio: '1/1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 0 50px rgba(90,169,255,0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(7, 10, 18, 0.4)', zIndex: 1 }}></div>
            <div style={{ zIndex: 2 }}>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>React FE</h3>
              <div style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 700, marginTop: 4 }}>Engineering Central Hub</div>
            </div>
          </div>

          {/* Right: BE/Quality Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="ov-card" style={{ position: 'relative', overflow: 'hidden', padding: '24px 16px' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, background: '#51cf66', padding: '2px 8px', fontSize: 10, borderRadius: '0 0 0 4px' }}>BACKEND</div>
              <h5 style={{ color: '#51cf66', marginTop: 12 }}>Swagger/MSW Insight</h5>
              <p style={{ fontSize: 12, opacity: 0.7, wordBreak: 'keep-all' }}>명세 고도화 및 Mock Service Worker 도입으로 서버 의존성 없는 독립 개발 환경 확립.</p>
            </div>
            <div className="ov-card" style={{ position: 'relative', overflow: 'hidden', padding: '24px 16px' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, background: '#ff922b', padding: '2px 8px', fontSize: 10, borderRadius: '0 0 0 4px' }}>BEYOND</div>
              <h5 style={{ color: '#ff922b', marginTop: 12 }}>Global Expansion</h5>
              <p style={{ fontSize: 12, opacity: 0.7, wordBreak: 'keep-all' }}>전환 성공 사례를 기반으로 타 프로젝트 및 도메인으로의 전방위적 기술 표준 확산.</p>
            </div>
          </div>
        </div>
      </SnapSection>

      {/* CHAPTER 05: 비전 (AX Curiosity Teaser) */}
      <SnapSection band="ch5" id="ch5-ax" title="" panelClass="panel-xl">
        <ChapterHeader index={5} title="Next Step: AX란 무엇인가?" subtitle="해답을 드리기 전에, 우리에게 던져진 거대한 질문들을 먼저 마주하려 합니다." />

        <div style={{ textAlign: 'center', marginTop: 60, position: 'relative' }}>
          {/* Main Title with Glow */}
          <h1 style={{
            fontSize: '120px',
            fontWeight: 900,
            margin: 0,
            letterSpacing: '-2px',
            background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(90,169,255,0.3))'
          }}>AX</h1>
          <div style={{ fontSize: 24, letterSpacing: 10, marginTop: -20, opacity: 0.5, color: 'var(--primary)' }}>AI TRANSFORMATION</div>

          {/* Curiosity Questions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 80 }}>
            <div className="ov-card" style={{ padding: '32px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>❓</div>
              <h4 style={{ color: '#fff', fontSize: 18, marginBottom: 12, wordBreak: 'keep-all' }}>개발자의 시대는 끝났는가,<br />아니면 이제야 시작인가?</h4>
              <p style={{ fontSize: 13, opacity: 0.5 }}>코드를 짜는 행위 너머의 가치</p>
            </div>
            <div className="ov-card" style={{ padding: '32px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🔭</div>
              <h4 style={{ color: '#fff', fontSize: 18, marginBottom: 12, wordBreak: 'keep-all' }}>단순 작업의 종말,<br />빈자리는 무엇으로 채울까?</h4>
              <p style={{ fontSize: 13, opacity: 0.5 }}>엔지니어링 사유의 확장</p>
            </div>
            <div className="ov-card" style={{ padding: '32px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎭</div>
              <h4 style={{ color: '#fff', fontSize: 18, marginBottom: 12, wordBreak: 'keep-all' }}>AX는 도구의 변화인가,<br />인류의 확장인가?</h4>
              <p style={{ fontSize: 13, opacity: 0.5 }}>시스템을 지휘하는 새로운 문법</p>
            </div>
          </div>

          <div style={{ marginTop: 80 }}>
            <div style={{
              display: 'inline-block',
              padding: '12px 24px',
              border: '1px solid var(--primary)',
              borderRadius: 40,
              fontSize: 14,
              color: 'var(--primary)',
              fontWeight: 700,
              backgroundColor: 'rgba(90,169,255,0.1)'
            }}>
              2026. 01. COMING NEXT
            </div>
            <p style={{ marginTop: 24, opacity: 0.4, fontSize: 15 }}>그 짜릿한 해답을 다음 세미나에서 함께 찾아나섭니다.</p>
          </div>
        </div>
      </SnapSection>

    </main>
  )
}

function PainPointCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="ov-card" style={{ textAlign: 'center', padding: '32px 24px' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <h4 style={{ marginBottom: 12, color: '#fff' }}>{title}</h4>
      <p style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.6 }}>{desc}</p>
    </div>
  )
}
