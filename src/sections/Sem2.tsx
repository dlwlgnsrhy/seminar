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
      <SnapSection band="ch2" id="ch2-docs" title="" panelClass="panel-xl">
        <ChapterHeader index={1} title="Baseline Specs: 기술 명세" subtitle="말뿐인 가이드가 아닌, 데이터와 근거로 증명하는 표준화의 기록입니다." />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 48 }}>
          <div className="ov-card" style={{ padding: 32 }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>📜</div>
            <h3 style={{ fontSize: 20, marginBottom: 16, color: 'var(--primary)' }}>Documentation</h3>
            <ul style={{ paddingLeft: 20, fontSize: 15, opacity: 0.8, lineHeight: 1.8 }}>
              <li>Docusaurus 정적 위키 구축</li>
              <li>23개 핵심 기술 명세 완료</li>
              <li>ADR(의사결정 기록) 누적</li>
            </ul>
          </div>

          <div className="ov-card" style={{ padding: 32, background: 'rgba(90,169,255,0.05)', borderColor: 'rgba(90,169,255,0.2)' }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>⚙️</div>
            <h3 style={{ fontSize: 20, marginBottom: 16, color: '#fff' }}>Automation</h3>
            <ul style={{ paddingLeft: 20, fontSize: 15, opacity: 0.8, lineHeight: 1.8 }}>
              <li>Vite 빌드 파이프라인 최적화</li>
              <li>Git Hooks (Husky) 자동화</li>
              <li>CI/CD 프리셋 표준화</li>
            </ul>
          </div>

          <div className="ov-card" style={{ padding: 32 }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🚀</div>
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
      <SnapSection band="ch3" id="ch2-process-perf" title="" panelClass="panel-xl">
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
      <SnapSection band="ch3" id="ch2-process-qa" title="" panelClass="panel-xl">
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
              <li>✅ Vitest + JSDOM 환경 구축</li>
              <li>✅ Kakao Map API 모킹(Mocking)</li>
              <li>✅ 회귀 버그 발생률 0% 달성</li>
              <li>✅ 비즈니스 로직 테스트 80% 커버</li>
            </ul>
          </div>
        </div>
      </SnapSection>

      {/* Slide 3: 접근성 & 협업 */}
      <SnapSection band="ch3" id="ch2-process-a11y" title="" panelClass="panel-xl">
        <ChapterHeader index={2} title="상당 과정 [접근성/협업]: 사용자 중심의 리팩토링" subtitle="디자인은 그대로지만, 코드는 훨씬 친절해졌습니다." />
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 32, marginTop: 40 }}>
          <div className="ov-card" style={{ padding: 40 }}>
            <h4 style={{ fontSize: 24, marginBottom: 24 }}>Semantic & Clean Audit</h4>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>SEARCH QUERY: href='#'</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--primary)' }}>124 Matches</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>무의미한 A 태그 -> Button 교체</div>
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

      {/* Slide 4: 표준화 & 문화 */}
      <SnapSection band="ch3" id="ch2-process-culture" title="" panelClass="panel-xl">
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

      {/* NEW Slide: 성과 분석 / 케이스 스터디 (복구) */}
      <SnapSection band="ch3" id="ch2-case-study" title="" panelClass="panel-xl">
        <ChapterHeader index={2} title="성과 분석: 파일럿 프로젝트" subtitle="계획을 넘어 실제 실무에서 마주한 변곡점과 혁신적 효율화의 기록입니다." />
        <div style={{ marginTop: 32 }}>
          <PlanRoadmapS2 />
        </div>
      </SnapSection>

      <SnapSection band="ch3" id="ch2-process-summary" title="">
        <ChapterHeader index={2} title="과정의 요약" subtitle="우리는 단순히 코드를 바꾼 것이 아니라, 개발을 하는 ‘방식(System)’을 바꿨습니다" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 48 }}>
          <div className="ov-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--primary)' }}>Auditor</div>
            <p style={{ fontSize: 12, marginTop: 8 }}>철저한 현상 파악</p>
          </div>
          <div className="ov-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--accent)' }}>Experiment</div>
            <p style={{ fontSize: 12, marginTop: 8 }}>가설 중심의 실험</p>
          </div>
          <div className="ov-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#51cf66' }}>Discovery</div>
            <p style={{ fontSize: 12, marginTop: 8 }}>숨은 버그의 적출</p>
          </div>
          <div className="ov-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#ff922b' }}>Codification</div>
            <p style={{ fontSize: 12, marginTop: 8 }}>지식의 자산화</p>
          </div>
        </div>
      </SnapSection>

      {/* CHAPTER 03: 최종 성과 (Results & Metrics) */}
      <SnapSection band="ch3" id="ch3-results-1" title="">
        <ChapterHeader index={3} title="파일럿 성과: 압도적 무결성" subtitle="우리가 표준화를 포기하지 않은 이유입니다. 정량적 지표로 증명합니다." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 40 }}>
          {METERICS.map(m => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>
      </SnapSection>

      <SnapSection band="ch3" id="ch3-results-2" title="파일럿 성과 4분면 상세">
        <ChapterHeader index={3} title="데이터로 보는 혁신" subtitle="성능, 안정성, 생산성, 표준화 전 영역에서 유의미한 수치를 도출했습니다." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 32 }}>
          <div className="ov-card" style={{ borderLeft: '4px solid #5aa9ff' }}>
            <h4 style={{ color: '#5aa9ff' }}>1. 성능 극대화</h4>
            <p style={{ fontSize: 13 }}>WebP 자동 변환 및 오프셋 청킹 도입으로 Lighthouse 성능 점수 92점 상회.</p>
          </div>
          <div className="ov-card" style={{ borderLeft: '4px solid #ff6b6b' }}>
            <h4 style={{ color: '#ff6b6b' }}>2. 서비스 안정성</h4>
            <p style={{ fontSize: 13 }}>Zod 기반 API 런타임 검증 및 무결한 타입 정의로 회귀 버그 발생률 0% 달성.</p>
          </div>
          <div className="ov-card" style={{ borderLeft: '4px solid #51cf66' }}>
            <h4 style={{ color: '#51cf66' }}>3. 생산성 혁명</h4>
            <p style={{ fontSize: 13 }}>AI Agent 기반 자동화 도구로 마이그레이션 및 단순 작업 공수 75% 이상 절감.</p>
          </div>
          <div className="ov-card" style={{ borderLeft: '4px solid #7c4dff' }}>
            <h4 style={{ color: '#7c4dff' }}>4. 표준화 안착</h4>
            <p style={{ fontSize: 13 }}>Scaffold CLI 및 템플릿 배포로 신규 프로젝트 세팅 시간 90% 이상 단축.</p>
          </div>
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
            <div className="ov-card" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, left: -10, background: 'var(--primary)', padding: '4px 8px', fontSize: 10, borderRadius: 4 }}>DESIGN</div>
              <h5 style={{ color: 'var(--primary)' }}>Figma for GitLab</h5>
              <p style={{ fontSize: 12, opacity: 0.7 }}>이슈 관리 디자인 툴 일원화 및 디자인 토큰 자동 동기화로 소통 비용 제로화.</p>
            </div>
            <div className="ov-card" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, left: -10, background: '#7c4dff', padding: '4px 8px', fontSize: 10, borderRadius: 4 }}>APP</div>
              <h5 style={{ color: '#7c4dff' }}>Bridge & Lifecycle</h5>
              <p style={{ fontSize: 12, opacity: 0.7 }}>하이브리드 브릿지 API 표준화 및 Safari 호환성 레이어 구축으로 네이티브급 UX 보장.</p>
            </div>
          </div>

          {/* Center: React FE Hub */}
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: 'radial-gradient(circle, rgba(90,169,255,0.15) 0%, transparent 70%)',
            border: '2px dashed rgba(90,169,255,0.3)',
            borderRadius: '50%',
            aspectRatio: '1/1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: 'var(--primary)' }}>React FE</h3>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>Engineering<br />Central Hub</div>
          </div>

          {/* Right: BE/Quality Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="ov-card" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, right: -10, background: '#51cf66', padding: '4px 8px', fontSize: 10, borderRadius: 4 }}>BACKEND</div>
              <h5 style={{ color: '#51cf66' }}>Swagger/MSW Insight</h5>
              <p style={{ fontSize: 12, opacity: 0.7 }}>명세 고도화 및 Mock Service Worker 도입으로 서버 의존성 없는 독립 개발 환경 확립.</p>
            </div>
            <div className="ov-card" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, right: -10, background: '#ff922b', padding: '4px 8px', fontSize: 10, borderRadius: 4 }}>BEYOND</div>
              <h5 style={{ color: '#ff922b' }}>Global Expansion</h5>
              <p style={{ fontSize: 12, opacity: 0.7 }}>전환 성공 사례를 기반으로 타 프로젝트 및 도메인으로의 전방위적 기술 표준 확산.</p>
            </div>
          </div>
        </div>
      </SnapSection>

      {/* CHAPTER 05: 비전 (AX Preview) */}
      <SnapSection band="ch5" id="ch5-ax" title="">
        <ChapterHeader index={5} title="Next Step: AX 기업으로" subtitle="2024년의 표준화를 발판 삼아, 2025년 AI 중심의 기업 변화를 준비합니다." />
        <div className="ov-card" style={{ textAlign: 'center', padding: '60px' }}>
          <h2 style={{ fontSize: 42, fontWeight: 900, marginBottom: 24 }} className="hero-gradient">AX 기업 세미나 프리뷰</h2>
          <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, margin: '0 auto' }}>
            이제는 단순히 도구를 쓰는 수준을 넘어,<br />
            Baseline 자체가 AI와 호흡하며 스스로 진화하는<br />
            <b>지능형 엔지니어링 생태계</b>를 제시하겠습니다.
          </p>
          <div style={{ marginTop: 40, opacity: 0.5, fontSize: 14 }}>
            2025년 1월 공개 예정: AI 가속 기업으로의 전격 전환 전략
          </div>
        </div>
      </SnapSection>

      {/* Result Summary */}
      <SnapSection band="result" id="result-summary" title="Result Summary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {METERICS.map(m => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>
      </SnapSection>

      <SnapSection band="outro" id="ch6-outro" title="Closing">
        <Overview
          title="우리는 '방식'을 바꿨습니다"
          bullets={[
            "개인의 기량에 의존하던 수동 개발 환경의 혁파",
            "동료와 함께 채워가는 살아있는 문서화(Living Docs)",
            "AI Agent와의 공조를 통한 압도적 생산성 증명",
            "이 모든 과정은 누군가의 정답이 아닌, 우리 모두의 합의입니다."
          ]}
        />
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
