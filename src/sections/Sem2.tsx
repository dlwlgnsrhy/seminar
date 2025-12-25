import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInViewSnap } from '@/shared/hooks/useInViewSnap'
import SnapSection from '@/components/SnapSection'
import HeroIntro from '@/components/HeroIntro'
import Overview from '@/components/Overview'
import PlanRoadmap from '@/components/PlanRoadmap'
import Callout from '@/components/Callout'
import { usePresentationKeys } from '@/shared/hooks/usePresentationKeys'
import TopProgress from '@/components/TopProgress'
import CompareSlider from '@/components/CompareSlider'
import BentoGrid from '@/components/BentoGrid'
import TerminalLog from '@/components/TerminalLog'
import EliteRail from '@/components/EliteRail'

// --- Helper Components ---

function MetricCard({ title, before, after, desc, color }: { title: string; before: string; after: string; desc: string; color: string }) {
  return (
    <div className="ov-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: `4px solid ${color}` }}>
      <h3 className="ov-card-head" style={{ marginBottom: 4 }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, opacity: 0.5, letterSpacing: 1 }}>AS-IS (기존)</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#ff6b6b', fontFamily: 'monospace' }}>{before}</div>
        </div>
        <div style={{ fontSize: 28, opacity: 0.2, fontWeight: 100 }}>→</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, opacity: 0.5, letterSpacing: 1 }}>TO-BE (Baseline)</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#51cf66', fontFamily: 'monospace' }}>{after}</div>
        </div>
      </div>
      <div className="ov-progress" style={{ background: 'rgba(255,255,255,0.05)', height: 4 }}>
        <span style={{ width: '100%', background: `linear-gradient(90deg, transparent, ${color})` }} />
      </div>
      <p style={{ fontSize: 13, opacity: 0.7, margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </div>
  )
}

function PainPointCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="ov-card" style={{ background: 'rgba(255,50,50,0.05)', border: '1px solid rgba(255,50,50,0.1)' }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <h3 style={{ fontSize: 18, margin: '0 0 8px 0', color: '#ff8a80' }}>{title}</h3>
      <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>{desc}</p>
    </div>
  )
}

function CodeBox({ code, label, color = '#5aa9ff' }: { code: string, label: string, color?: string }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 11, color, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{label}</div>
      <code style={{
        display: 'block', padding: 16, background: '#0d1117', border: '1px solid #30363d',
        borderRadius: 8, fontSize: 12, lineHeight: 1.6, color: '#e6edf3', overflowX: 'auto'
      }}>
        <pre style={{ margin: 0 }}>{code}</pre>
      </code>
    </div>
  )
}

function DiffBox({ before, after, label }: { before: string, after: string, label: string }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 11, color: '#fcc419', fontWeight: 700, marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#30363d', borderRadius: 8, overflow: 'hidden', border: '1px solid #30363d' }}>
        <div style={{ background: '#161b22', padding: 12 }}>
          <div style={{ fontSize: 10, color: '#ff6b6b', marginBottom: 4 }}>- REMOVE</div>
          <pre style={{ margin: 0, fontSize: 11, color: '#ffabac' }}>{before}</pre>
        </div>
        <div style={{ background: '#0d1117', padding: 12 }}>
          <div style={{ fontSize: 10, color: '#51cf66', marginBottom: 4 }}>+ ADD</div>
          <pre style={{ margin: 0, fontSize: 11, color: '#aff5b4' }}>{after}</pre>
        </div>
      </div>
    </div>
  )
}

function ChapterHeader({ title, subtitle, index }: { title: string, subtitle: string, index: number }) {
  return (
    <div style={{ marginBottom: 40, borderLeft: '4px solid var(--primary)', paddingLeft: 24 }}>
      <div style={{ fontSize: 12, opacity: 0.5, letterSpacing: 2 }}>CHAPTER {index.toString().padStart(2, '0')}</div>
      <h2 style={{ fontSize: 32, margin: '8px 0', fontWeight: 900 }}>{title}</h2>
      <p style={{ opacity: 0.7, maxWidth: 600 }}>{subtitle}</p>
    </div>
  )
}

// --- Content Data ---

const METERICS = [
  { title: "빌드 지표", before: "325s", after: "28s", desc: "Vite 도입으로 CI/CD 대기 시간 91% 절감", color: "#5aa9ff" },
  { title: "번들 지표", before: "12.7 MB", after: "2.5 MB", desc: "트리쉐이킹 및 코드 스플리팅 적용", color: "#7c4dff" },
  { title: "에셋 지표", before: "2.8 MB", after: "120 KB", desc: "WebP 일괄 변환 및 리사이징 프로세스", color: "#fcc419" },
  { title: "접근성 점수", before: "82", after: "98", desc: "시맨틱 마크업 전수조사 및 수정", color: "#51cf66" }
]

// --- Main Component ---

export default function Sem2() {
  useInViewSnap()
  usePresentationKeys()

  return (
    <div className="snap-container">
      <TopProgress />

      {/* CHAPTER 1: Intro & Plan */}
      <SnapSection band="ch1" id="ch1-hero" title="">
        <HeroIntro
          title="React Baseline Part 2: 30+ 마스터피스 대장정"
          bullets={[
            "안정성: 최소한의 투자로 이룬 가동률 99.9%의 엔지니어링",
            "생산성: 온보딩 일주일에서 90분으로 단축된 혁명",
            "문화: 개인의 기교를 넘어 팀의 자산이 된 표준화"
          ]}
          links={[
            { href: "#", label: "Baseline Repo" },
            { href: "#", label: "Design Variable Docs" }
          ]}
        />
      </SnapSection>

      <SnapSection band="ch1" id="ch1-roadmap" title="">
        <ChapterHeader index={1} title="Why & Plan" subtitle="레거시의 늪에서 표준화의 숲으로 나아가는 로드맵" />
        <PlanRoadmap />
      </SnapSection>

      <SnapSection band="ch1" id="ch1-pain" title="The Pain Points">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          <PainPointCard icon="🤯" title="온보딩 지옥" desc="히스토리 파악에만 일주일, 환경 셋업에 또 3일 소요." />
          <PainPointCard icon="🕸️" title="공포의 리팩토링" desc="A를 고치니 Z가 깨지는 예측 불가능한 사이드 이펙트." />
          <PainPointCard icon="🐌" title="CRA의 한계" desc="한 번의 빌드에 커피 한 잔. 개발 리듬의 지속적 단절." />
        </div>
      </SnapSection>

      {/* CHAPTER 2: Foundation (Performance & Assets) */}
      <SnapSection band="ch2" id="ch2-audit" title="">
        <ChapterHeader index={2} title="The Foundation" subtitle="성능과 보안은 '우연'이 아닌 '설계'의 결과입니다." />
        <TerminalLog animated title="npm run build --analysis" type="audit" lines={[
          "dist/assets/index.js  2.1MB <-- WARNING: Chunk too large",
          "dist/assets/vendor.js 1.8MB",
          "info: 45 static imports detected in App.tsx",
          "action: Implementing Dynamic Import Strategy..."
        ]} />
      </SnapSection>

      <SnapSection band="ch2" id="ch2-asset" title="Asset & Deployment">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
          <TerminalLog animated title="Asset Optimization (WebP/Font)" type="success" lines={[
            "hero_bg.png     (2.4MB) -> hero_bg.webp     (145KB)",
            "office_view.jpg (1.8MB) -> office_view.webp (98KB)",
            "Pretendard.otf  (font-display: swap) applied.",
            "Total Savings: 94.2% size reduction."
          ]} />
          <div className="ov-card">
            <h4>Part 24: Security Strategy</h4>
            <CodeBox color="#ff6b6b" label="vite.config.ts" code={`build: {\n  sourcemap: mode === 'staging',\n  chunkSizeWarningLimit: 500\n}`} />
            <p style={{ fontSize: 12, opacity: 0.6, marginTop: 12 }}>운영 환경에서의 소스 유출 방지 및 디버깅 효율성 확보.</p>
          </div>
        </div>
      </SnapSection>

      {/* CHAPTER 3: Quality (QA & A11y) */}
      <SnapSection band="ch3" id="ch3-qa" title="">
        <ChapterHeader index={3} title="The Quality" subtitle="테스트는 감옥이 아니라, 가장 자유로운 개발을 위한 보험입니다." />
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
          <TerminalLog animated title="vitest run Write_Program.test.tsx" type="error" lines={[
            "FAIL src/features/EduProgram/Write.test.tsx",
            "expected EduProgramAPI.insert to have been called",
            "received: 0 calls",
            "// Discovery: hook-form conflict detected!"
          ]} />
          <div className="ov-card" style={{ background: 'rgba(81,207,102,0.05)' }}>
            <h4>Part 31: Zod Validation</h4>
            <CodeBox color="#51cf66" label="Network Boundary Safety" code={`const schema = zod.object({\n  title: zod.string().min(1),\n  date: zod.date()\n});`} />
            <p style={{ fontSize: 12, opacity: 0.7 }}>서버 데이터와 클라이언트 타입의 완전 일치 보장 (Part 31).</p>
          </div>
        </div>
      </SnapSection>

      <SnapSection band="ch3" id="ch3-a11y" title="Part 9-10: Semantic Audit">
        <TerminalLog animated title="grep audit" type="audit" lines={[
          "$ grep -r \"href='#'\" src/",
          "src/header.tsx:12: <a href='#'>닫기</a>",
          "Matches: 124 instances detected.",
          "decision: Converting to Semantic <button>"
        ]} />
        <DiffBox label="Accessibility Refactoring"
          before={`<a href="#" onClick={close}>\n  닫기\n</a>`}
          after={`<button \n  onClick={close} \n  aria-label="창 닫기">\n  X\n</button>`} />
      </SnapSection>

      {/* CHAPTER 4: Developer Experience (DX) */}
      <SnapSection band="ch4" id="ch4-dx" title="">
        <ChapterHeader index={4} title="Developer Experience" subtitle="커밋 메시지 한 줄부터 배포 자동화까지의 DX 혁명." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="ov-card">
            <h4>Part 22: Git Workflow (Husky)</h4>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <span className="pill sev-low">feat:</span> <span className="pill sev-medium">fix:</span> <span className="pill sev-high">docs:</span>
            </div>
            <p style={{ fontSize: 13, marginTop: 16 }}>불량 커밋 저장소 유입 0건. 표준화된 시맨틱 버전 관리 시작.</p>
          </div>
          <TerminalLog animated title="release-it automation" type="success" lines={[
            "Bumping version 1.0.2 -> 1.1.0",
            "Generating changelog...",
            "Creating git tag v1.1.0 and pushing...",
            "Deployment Pipeline Triggered."
          ]} />
        </div>
      </SnapSection>

      {/* CHAPTER 5: Architecture (Core System) */}
      <SnapSection band="ch5" id="ch5-arch" title="">
        <ChapterHeader index={5} title="The Core Architecture" subtitle="UI는 거들 뿐, 핵심은 탄탄하게 격리된 '비즈니스 언어'입니다." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <h4>Part 25: Design Tokens</h4>
            <CodeBox color="#7c4dff" label="Design SSOT (styles.css)" code={`:root {\n  --primary: #5aa9ff;\n  --surface-0: rgba(255,255,255,0.04);\n}`} />
            <p style={{ fontSize: 13, opacity: 0.6, marginTop: 12 }}>디자인 변경 시 한 곳에서 전체 앱의 '감각' 제어.</p>
          </div>
          <div>
            <h4>Part 27: Service Layer</h4>
            <CodeBox color="#51cf66" label="Domain Logic Separation" code={`// notice.api.ts\nexport const fetchNotices = () => \n  api.get('/notices').then(res => res.data);`} />
            <p style={{ fontSize: 13, opacity: 0.6, marginTop: 12 }}>UI 컴포넌트는 오직 '그리는 것'에만 집중하도록 격리.</p>
          </div>
        </div>
      </SnapSection>

      <SnapSection band="ch5" id="ch5-deep" title="Advanced State & Monitoring">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
          <div className="ov-card">
            <h4>Part 26: Session Hydration</h4>
            <p style={{ fontSize: 13, opacity: 0.7 }}>새로고침을 해도 '마을 ID' 등 유저 맥락이 끊기지 않는 Hydration 로직 구축.</p>
            <Callout type="info" style={{ marginTop: 16 }}>이탈률 15% 감소 효과 증명.</Callout>
          </div>
          <div className="ov-card" style={{ borderTop: '4px solid #ff6b6b' }}>
            <h4>Part 32: Sentry Error Analysis</h4>
            <TerminalLog animated title="Sentry Error Loop" type="error" lines={[
              "Issue detected in production (v1.1.0)",
              "Stacktrace: register() at WritePage:124",
              "Status: Assigned to team within 5 mins.",
              "Fix: Confirmed in PR #142."
            ]} />
          </div>
        </div>
      </SnapSection>

      {/* CHAPTER 6: Result & Culture */}
      <SnapSection band="ch6" id="ch6-result" title="">
        <ChapterHeader index={6} title="Result & Culture" subtitle="기술적 완성이 아닌, 함께 성장하는 문화의 시작점." />
        <BentoGrid items={[
          {
            id: 'adr', title: 'ADR (설계 결정 기록)', desc: '왜 리액트 쿼리를 썼는가? (히스토리 보존)', colSpan: 2, rowSpan: 2,
            img: 'https://placehold.co/600x600/2c2000/F9A825?text=Technical+SSOT'
          },
          {
            id: 'pr', title: 'PR Template', desc: '리뷰 효율 200% 향상 도구', colSpan: 1, dark: true
          },
          {
            id: 'workshop', title: 'Part 30: Workshop', desc: '온보딩 시간을 90분으로 단축', colSpan: 1,
            img: 'https://placehold.co/400x300/152015/66bb6a?text=Culture+Shift'
          },
          {
            id: 'template', title: 'Scaffold Template', desc: '누구나 5분 만에 표준 환경 구축', colSpan: 2,
            img: 'https://placehold.co/600x200/101525/448aff?text=Baseline+Template'
          },
        ]} />
      </SnapSection>

      <SnapSection band="ch6" id="ch6-evolution" title="Final Architecture Evolution">
        <div style={{ width: '100%', maxWidth: 840, margin: '0 auto' }}>
          <CompareSlider
            before="https://placehold.co/800x500/2a1b1b/ff6b6b?text=Legacy+CRA"
            after="https://placehold.co/800x500/1b2a2a/51cf66?text=Clean+Masterpiece"
            beforeLabel="Legacy (CRA)"
            afterLabel="Masterpiece (Baseline)"
            height={480}
          />
        </div>
      </SnapSection>

      <SnapSection band="ch6" id="ch6-impact" title="Result Summary">
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
            "Part 33: 커스텀 Vite 플러그인을 통한 레거시 제거 자동화",
            "동료와 함께 채워가는 살아있는 문서화(Living Docs)",
            "지속 가능한 엔지니어링을 향한 첫 걸음"
          ]}
          memo="React Baseline은 코드가 아닌, 우리 팀의 미래를 위한 자산입니다."
        />
      </SnapSection>
    </div>
  )
}
