import { useEffect } from 'react'
import { useInViewSnap } from '@/shared/hooks/useInViewSnap'
import SnapSection from '@/components/SnapSection'
import HeroIntro from '@/components/HeroIntro'
import Overview from '@/components/Overview'
import PlanRoadmap from '@/components/PlanRoadmap'
import Callout from '@/components/Callout'
import { usePresentationKeys } from '@/shared/hooks/usePresentationKeys'

const CONTENT = {
  hero: {
    title: "React Baseline — Part 2: 안정적 코드와 높은 가치 창출",
    bullets: [
      "목표: 안정적 코드 지향 & 최소한의 투자로 높은 가치 창출",
      "핵심: 사내 표준화(Docs-First)를 통한 온보딩 시간 단축",
      "전략: 파일럿 프로젝트 선적용(Pilot-First) 및 지표 증명"
    ],
    links: [
      { href: "https://www.simform.com/blog/react-architecture-best-practices/", label: "React Architecture" },
      { href: "https://increment.com/frontend/frontend-at-scale/", label: "Frontend at Scale" }
    ]
  },
  baseline: {
    structure: [
      { name: 'api/', desc: '서버 통신 로직 (axios 인스턴스, 인터셉터, 에러 맵핑)' },
      { name: 'app/', desc: '전역 설정 및 Provider (Router, QueryClient)' },
      { name: 'features/', desc: '도메인 기반 독립 모듈 (Angular-Style Hybrid)' },
      { name: 'shared/', desc: '공통 UI 컴포넌트, 유틸리티, 커스텀 훅' }
    ],
    tech: [
      { label: 'Build', val: 'Vite (Extreme Speed)' },
      { label: 'State', val: 'Zustand + TanStack Query' },
      { label: 'Tooling', val: 'ESLint + Prettier + Husky' },
      { label: 'Testing', val: 'Vitest + RTL + Cypress' }
    ]
  },
  metrics: [
    { title: "빌드 시간 (Build Speed)", before: "325s", after: "28s", desc: "Vite 도입으로 CI/CD 대기 시간 91% 절감", color: "#5aa9ff" },
    { title: "번들 크기 (Bundle Size)", before: "12.7 MB", after: "2.5 MB", desc: "미사용 라이브러리 제거 및 트리쉐이킹 최적화", color: "#7c4dff" },
    { title: "코드 품질 (Lint Errors)", before: "1,045건", after: "0건", desc: "ESLint/Prettier 자동화로 잠재적 버그 원천 차단", color: "#51cf66" }
  ]
}

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

export default function Sem2() {
  useInViewSnap()
  usePresentationKeys()

  return (
    <div className="snap-container">
      {/* 1. Hero Intro */}
      <SnapSection band="intro" id="s2-hero" title="">
        <HeroIntro
          title={CONTENT.hero.title}
          bullets={CONTENT.hero.bullets}
          links={CONTENT.hero.links}
        />
      </SnapSection>

      {/* 2. Roadmap (Phases 0-4) */}
      <SnapSection band="body" id="s2-roadmap" title="Phase Roadmap: 구축부터 패키지화까지">
        <PlanRoadmap />
      </SnapSection>

      {/* 3. Baseline Specs (Folder & Tech) */}
      <SnapSection band="body" id="s2-specs" title="Baseline v1: 기술 표준 및 구조">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20 }}>
          <div className="ov-card">
            <h3 className="ov-card-head">📁 폴더 구조 (Domain-Driven)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {CONTENT.baseline.structure.map(s => (
                <div key={s.name} style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontWeight: 800, color: '#5aa9ff', fontSize: 14 }}>{s.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="ov-card">
            <h3 className="ov-card-head">🛡️ Core 기술 스택</h3>
            <div className="ov-stat-row">
              {CONTENT.baseline.tech.map(t => (
                <div key={t.label} className="ov-stat" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="ov-stat-k">{t.label}</div>
                  <div className="ov-stat-v" style={{ fontSize: 14 }}>{t.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SnapSection>

      {/* 4. Visual Commit History (Gource) */}
      <SnapSection band="body" id="s2-gource" title="Visual Evidence: 레포지토리의 진화 (Gource)">
        <div className="section-panel" style={{ background: '#000', padding: 0, overflow: 'hidden', height: 420, position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Gource Placeholder with Animation logic */}
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', zIndex: 2 }}>
            <div style={{ fontSize: 80, opacity: 0.05, fontWeight: 900, letterSpacing: 20, transform: 'rotate(-5deg)' }}>GOURCE</div>
            <div style={{ maxWidth: 540, padding: 32, background: 'rgba(10,15,30,0.7)', borderRadius: 16, backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <h3 style={{ marginTop: 0, color: '#5aa9ff' }}>Project Evolution Visualization</h3>
              <p style={{ lineHeight: 1.6 }}>이 섹션은 <strong>Gource</strong>를 통해 생성된 소스코드 진화 과정을 보여줍니다.</p>
              <p style={{ opacity: 0.8, fontSize: 14, fontStyle: 'italic' }}>"수천 개의 커밋이 유기적으로 연결되며 시스템이 구축되는 모습을 시각화하여 개발의 역동성과 전문성을 증명합니다."</p>
              <div style={{ marginTop: 24, fontSize: 12, opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
                TIP: Gource로 생성한 .mp4 또는 .webm 파일을 배경으로 재생하세요.
              </div>
            </div>
          </div>
          {/* Decorative elements to simulate code/particles */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }}>
            {[...Array(20)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: 4, height: 4, borderRadius: '50%',
                background: i % 2 === 0 ? '#5aa9ff' : '#7c4dff',
                filter: 'blur(2px)',
                animation: `fadeUp ${2 + Math.random() * 4}s infinite alternate`
              }} />
            ))}
          </div>
          <div className="water-shimmer" style={{ top: 'auto', bottom: 0, height: 120, opacity: 0.4 }} />
        </div>
        <Callout type="info" style={{ marginTop: 16 }}>
          <strong>전문가 코멘트:</strong> 커밋 로그를 시각화하는 것은 단순한 기록을 넘어 팀의 협업 밀도와 아키텍처의 견고함을 시각적으로 설득하는 가장 강력한 장치입니다.
        </Callout>
      </SnapSection>

      {/* 5. Performance Improvements (Compare) */}
      <SnapSection band="body" id="s2-impact" title="Impact: 결과로 증명하는 표준의 힘">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {CONTENT.metrics.map(m => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>
      </SnapSection>

      {/* 6. Outro: QA & Discussion */}
      <SnapSection band="outro" id="s2-outro" title="Next Step & Discussion">
        <Overview
          title="질의응답 및 전사 확산 계획"
          bullets={[
            "Phase 4: Scaffold 공개 및 사내 템플릿 정착",
            "지속 가능한 운영을 위한 기술 파이프라인(CD) 강화",
            "피드백 반영을 통한 Baseline v2 고도화"
          ]}
          memo="완벽함이 아닌, 더 나은 시작을 지향합니다."
        />
      </SnapSection>
    </div>
  )
}
