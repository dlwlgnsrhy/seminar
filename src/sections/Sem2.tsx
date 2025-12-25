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
      <div style={{ fontSize: 12, opacity: 0.5, letterSpacing: 2 }}>CHAPTER 0{index}</div>
      <h2 style={{ fontSize: 32, margin: '8px 0', fontWeight: 900 }}>{title}</h2>
      <p style={{ opacity: 0.7, maxWidth: 600 }}>{subtitle}</p>
    </div>
  )
}

// --- Content Data ---

const METERICS = [
  { title: "빌드 시간", before: "325s", after: "28s", desc: "Vite 도입으로 CI/CD 대기 시간 91% 절감", color: "#5aa9ff" },
  { title: "번들 크기", before: "12.7 MB", after: "2.5 MB", desc: "트리쉐이킹 및 코드 스플리팅 적용", color: "#7c4dff" },
  { title: "이미지 자산", before: "2.8 MB", after: "120 KB", desc: "WebP 일괄 변환 및 리사이징 프로세스", color: "#fcc419" },
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
      <SnapSection band="intro" id="ch1-hero" title="">
        <HeroIntro
          title="React Baseline Part 2: 30단계의 마스터피스 여정"
          bullets={[
            "안정성: 최소한의 투자로 이루어낸 가동률 99%의 코드",
            "생산성: 온보딩 일주일에서 한 시간으로 단축",
            "확장성: 누구나 기여할 수 있는 사내 표준의 정립"
          ]}
          links={[
            { href: "#", label: "Baseline Repo" },
            { href: "#", label: "Docs-First Wiki" }
          ]}
        />
      </SnapSection>

      <SnapSection band="body" id="ch1-roadmap" title="">
        <ChapterHeader index={1} title="The Why & The Plan" subtitle="왜 우리는 기반부터 다시 쌓아야 했는가?" />
        <PlanRoadmap />
      </SnapSection>

      <SnapSection band="body" id="ch1-pain" title="수면 아래의 빙산 (The Pain Points)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          <PainPointCard icon="🤯" title="온보딩 지옥" desc="히스토리 파악에만 일주일, 개발 환경 셋업에 또 3일." />
          <PainPointCard icon="🕸️" title="스파게티 의존성" desc="A를 고치니 Z가 깨지는 공포스러운 리팩토링." />
          <PainPointCard icon="🐌" title="CRA의 한계" desc="한 번의 빌드에 커피 한 잔, 생산성은 바닥." />
        </div>
      </SnapSection>

      {/* CHAPTER 2: Performance & Assets */}
      <SnapSection band="dark" id="ch2-audit" title="">
        <ChapterHeader index={2} title="The Foundation" subtitle="성능과 보안은 '우연'히 만들어지지 않습니다." />
        <TerminalLog title="npm run build --analysis" type="audit" lines={[
          "dist/assets/index.js  2.1MB <-- WARNING: Chunk too large",
          "dist/assets/vendor.js 1.8MB",
          "info: 45 static imports detected in App.tsx"
        ]} />
      </SnapSection>

      <SnapSection band="body" id="ch2-strategy" title="Part 5-6: 전송 최적화 전략">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <CodeBox label="Strategy: Lazy Loading" code={`const Page = React.lazy(() => \n  import('./pages/HeavyPage')\n);`} />
          <CodeBox label="Asset: cwebp Auto-Convert" code={`# convert all png to webp\nfind . -name "*.png" -exec \n  cwebp {} -o {}.webp \\;`} />
        </div>
        <Callout type="info" style={{ marginTop: 16 }}>이미지 용량 94% 절감 및 초기 LCP 지표 1.2s 달성.</Callout>
      </SnapSection>

      <SnapSection band="body" id="ch2-fonts" title="Part 28: Font & CSS 최적화">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <h3>글자 깜빡임(FOUT) 해결</h3>
            <CodeBox color="#fcc419" label="CSS swap strategy" code={`@font-face {\n  font-family: 'Pretendard';\n  font-display: swap; \n}`} />
          </div>
          <div className="ov-card" style={{ padding: 20 }}>
            <h4>Polyfill & Legacy</h4>
            <p style={{ fontSize: 13, opacity: 0.7 }}>최신 브라우저에겐 가벼움을, 구형에겐 안정성을 주는 <code>vite-plugin-legacy</code> 전략 수립.</p>
          </div>
        </div>
      </SnapSection>

      <SnapSection band="dark" id="ch2-sourcemap" title="Part 24: 보안과 디버깅의 균형">
        <TerminalLog title="vite.config.ts" lines={[
          "build: {",
          "  sourcemap: process.env.NODE_ENV === 'staging',",
          "  // 운영(production)에선 유출 방지",
          "  chunkSizeWarningLimit: 500",
          "}"
        ]} />
        <p style={{ marginTop: 24, fontSize: 14, color: '#ff8a80' }}>실제 운영 서버에서 소스 코드가 노출되는 리스크를 원천 차단했습니다.</p>
      </SnapSection>

      {/* CHAPTER 3: Quality (QA & A11y) */}
      <SnapSection band="dark" id="ch3-qa" title="">
        <ChapterHeader index={3} title="The Quality" subtitle="테스트는 감옥이 아니라 보험입니다." />
        <TerminalLog title="vitest run --coverage" lines={[
          "FAIL  src/features/EduProgram/Write.test.tsx",
          "expected insertAPI to be called",
          "actual 0 calls",
          "// Discovery: hook-form conflict found!"
        ]} />
      </SnapSection>

      <SnapSection band="dark" id="ch3-a11y" title="Part 9-10: 의미론적 감사 (Grep Audit)">
        <TerminalLog title="grep -r 'href=#'" type="audit" lines={[
          "src/header.tsx:12: <a href='#'>닫기</a>",
          "src/modal.tsx:45: <a href='#'>X</a>",
          "Matches: 124 instances detected."
        ]} />
        <DiffBox
          label="A11y Refactoring"
          before={'<a href="#" onClick={close}>\n  닫기\n</a>'}
          after={'<button \n  onClick={close} \n  aria-label="창 닫기">\n  X\n</button>'}
        />
      </SnapSection>

      {/* CHAPTER 4: Developer Experience (DX) */}
      <SnapSection band="body" id="ch4-dx" title="">
        <ChapterHeader index={4} title="Developer Experience" subtitle="커밋 한 줄부터 배포까지의 자동화." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="ov-card">
            <h4>Part 22: Commit Standard</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
              <span className="pill sev-low">feat:</span> <span className="pill sev-medium">fix:</span> <span className="pill sev-high">refactor:</span>
            </div>
            <p style={{ fontSize: 12, marginTop: 16 }}>Husky & Commitlint 도입으로 불량 커밋 유입 0건.</p>
          </div>
          <TerminalLog title="release-it v16.2.1" type="success" lines={[
            "Checking status... Clean.",
            "Bumping version 1.0.2 -> 1.1.0",
            "Generating changelog...",
            "Creating git tag v1.1.0...",
            "Release successful!"
          ]} />
        </div>
      </SnapSection>

      {/* CHAPTER 5: Architecture */}
      <SnapSection band="body" id="ch5-arch" title="">
        <ChapterHeader index={5} title="The Core Architecture" subtitle="UI는 거들 뿐, 핵심은 탄탄한 로직의 분리입니다." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <h4>Part 25: Design Tokens</h4>
            <CodeBox color="#7c4dff" label="CSS Variables (Single Source)" code={`:root {\n  --primary: #5aa9ff;\n  --surface-0: rgba(255,255,255,0.04);\n}`} />
            <p style={{ fontSize: 12, opacity: 0.6, marginTop: 12 }}>디자인 변경 시 한 곳에서 전체 앱의 테마 제어 가능.</p>
          </div>
          <div>
            <h4>Part 27: Service Layer</h4>
            <CodeBox color="#51cf66" label="Domain Logic Separation" code={`// notice.api.ts\nexport const fetchNotices = () => \n  api.get('/notices').then(res => res.data);`} />
            <p style={{ fontSize: 12, opacity: 0.6, marginTop: 12 }}>UI 컴포넌트는 오직 '그리는 것'에만 집중하도록 격리.</p>
          </div>
        </div>
      </SnapSection>

      <SnapSection band="dark" id="ch5-session" title="Part 26: Session Management & Hydration">
        <div style={{ maxWidth: 800, marginInline: 'auto' }}>
          <p style={{ opacity: 0.7, marginBottom: 24 }}>"새로고침을 해도 유저의 발자취가 끊기지 않도록 설계했습니다."</p>
          <CodeBox color="#fcc419" label="Safe Storage Hydration" code={`const savedTown = sessionStorage.getItem('townId');\nconst useStore = create((set) => ({\n  townId: savedTown || 'default',\n  setTownId: (id) => { \n    sessionStorage.setItem('townId', id);\n    set({ townId: id });\n  }\n}));`} />
          <Callout type="info" style={{ marginTop: 16 }}>유저 이탈률 15% 감소 및 안정적인 상태 동기화 성공.</Callout>
        </div>
      </SnapSection>

      {/* CHAPTER 6: Result & Culture */}
      <SnapSection band="body" id="ch6-docs" title="">
        <ChapterHeader index={6} title="Result & Culture" subtitle="시스템은 문서를 타고 전파됩니다." />
        <BentoGrid items={[
          {
            id: 'adr', title: 'ADR (설계 결정 기록)', desc: '왜 리액트 쿼리를 썼는가? (스크린샷)', colSpan: 2, rowSpan: 2,
            img: 'https://placehold.co/600x600/2c2000/F9A825?text=ADR+Process'
          },
          {
            id: 'folder', title: 'Folder Structure', desc: '직관적인 도메인 분리 가이드', colSpan: 1,
            img: 'https://placehold.co/400x300/101525/448aff?text=Folder+Guide'
          },
          { id: 'pr', title: 'PR Template', desc: '리뷰 효율 200% 향상 도구', colSpan: 1, dark: true },
          {
            id: 'onboard', title: '90분 Onboarding', desc: '워크숍 이후 단축된 시간', colSpan: 2,
            img: 'https://placehold.co/600x200/152015/66bb6a?text=Workshop+Result'
          },
        ]} />
      </SnapSection>

      <SnapSection band="body" id="ch6-evolution" title="Visual Evolution">
        <div style={{ width: '100%', maxWidth: 840, margin: '0 auto' }}>
          <CompareSlider
            before="https://placehold.co/800x500/2a1b1b/ff6b6b?text=Legacy+CRA"
            after="https://placehold.co/800x500/1b2a2a/51cf66?text=Clean+Hybrid"
            beforeLabel="Legacy (CRA)"
            afterLabel="Baseline (Hybrid)"
            height={480}
          />
        </div>
      </SnapSection>

      <SnapSection band="body" id="ch6-impact" title="Result Summary">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {METERICS.map(m => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>
      </SnapSection>

      <SnapSection band="outro" id="ch6-outro" title="The Future">
        <Overview
          title="기업의 자산으로 남는 개발 문화"
          bullets={[
            "Part 30: Baseline 워크숍을 통한 상향 평준화",
            "Scaffold 템플릿 공개 및 전사 프로젝트 확산",
            "지속 가능한 시스템(Sustainable System)의 완성"
          ]}
          memo="우리는 코드를 바꾼 것이 아니라, 일하는 '방식'을 바꿨습니다."
        />
      </SnapSection>
    </div>
  )
}
