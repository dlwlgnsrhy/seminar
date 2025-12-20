import { useRef } from 'react'
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

const CONTENT = {
  hero: {
    title: "React Baseline — Part 2: 안정적 코드와 높은 가치 창출",
    bullets: [
      "목표: 안정적 코드 지향 & 최소한의 투자로 높은 가치 창출",
      "핵심: 사내 표준화(Docs-First)를 통한 온보딩 시간 단축",
      "전략: 파일럿 프로젝트 선적용(Pilot-First) 및 지표 증명"
    ],
    links: [
      { href: "https://www.simform.com/blog/react-architecture-best-practices/", label: "Clean Architecture" },
      { href: "https://increment.com/frontend/frontend-at-scale/", label: "Docs-First Culture" }
    ]
  },
  metrics: [
    { title: "빌드 시간 (Build Speed)", before: "325s", after: "28s", desc: "Vite 도입으로 CI/CD 대기 시간 91% 절감", color: "#5aa9ff" },
    { title: "번들 크기 (Bundle Size)", before: "12.7 MB", after: "2.5 MB", desc: "미사용 라이브러리 제거 및 트리쉐이킹 최적화", color: "#7c4dff" },
    { title: "코드 품질 (Lint Errors)", before: "1,045건", after: "0건", desc: "ESLint/Prettier 자동화로 잠재적 버그 원천 차단", color: "#51cf66" }
  ]
}

export default function Sem2() {
  useInViewSnap()
  usePresentationKeys()

  return (
    <div className="snap-container">
      <TopProgress />

      {/* 1. Hero */}
      <SnapSection band="intro" id="s2-hero" title="">
        <HeroIntro
          title={CONTENT.hero.title}
          bullets={CONTENT.hero.bullets}
          links={CONTENT.hero.links}
        />
      </SnapSection>

      {/* 2. Roadmap */}
      <SnapSection band="body" id="s2-roadmap" title="Roadmap: 구축부터 패키지화까지">
        <PlanRoadmap />
      </SnapSection>

      {/* 3. Pain Points (NEW) */}
      <SnapSection band="body" id="s2-pain" title="Why: 우리는 왜 변해야 했나?">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, padding: '0 20px' }}>
          <PainPointCard
            icon="🤯"
            title="높은 온보딩 비용"
            desc="새로운 팀원이 올 때마다 프로젝트 구조와 컨벤션을 설명하는 데 1주일 이상 소요됨."
          />
          <PainPointCard
            icon="🕸️"
            title="스파게티 의존성"
            desc="간단한 버튼 하나 수정했는데, 전혀 상관없는 페이지가 깨지는 사이드 이펙트 발생."
          />
          <PainPointCard
            icon="🐌"
            title="느린 개발 사이클"
            desc="무거운 레거시 도구(CRA)로 인해 빌드와 배포가 느려져 전체적인 생산성 저하."
          />
        </div>
        <Callout type="warn" style={{ marginTop: 32, maxWidth: 600, marginInline: 'auto' }}>
          "우리는 코드를 짜는 시간보다, 코드를 <strong>이해하고 고치는 시간</strong>이 더 길었습니다."
        </Callout>
      </SnapSection>

      {/* 4. Docs-First (Main Highlight) */}
      <SnapSection band="body" id="s2-docs" title="Solution 1: Docs-First (문서가 곧 설계)">
        <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: 24, maxWidth: 700 }}>
          코딩 전에 <strong>ADR(설계 결정)</strong>과 <strong>가이드</strong>를 먼저 작성하여 팀의 싱크를 맞췄습니다.
        </p>
        <BentoGrid items={[
          {
            id: 'adr', title: 'ADR 0001: Strategy', desc: '의사결정 배경/팀 합의 기록 (스크린샷)', colSpan: 2, rowSpan: 2,
            img: 'https://placehold.co/600x600/2c2000/F9A825?text=ADR+Screenshot'
          },
          {
            id: 'folder', title: 'Folder Guide', desc: '명확한 도메인 분리 규칙', colSpan: 1,
            img: 'https://placehold.co/400x300/101525/448aff?text=Folder+Structure'
          },
          { id: 'conv', title: 'Conventions', desc: '네이밍/코딩 표준 (Lint)', colSpan: 1, dark: true },
          {
            id: 'onboard', title: 'Onboarding Check', desc: '신규 입사자 가이드', colSpan: 2,
            img: 'https://placehold.co/600x200/152015/66bb6a?text=Onboarding+Checklist'
          },
        ]} />
      </SnapSection>

      {/* 5. Evolution (Slider) */}
      <SnapSection band="body" id="s2-evolution" title="Solution 2: Architecture Evolution">
        <div style={{ width: '100%', maxWidth: 840, margin: '0 auto' }}>
          <CompareSlider
            before="https://placehold.co/800x500/2a1b1b/ff6b6b?text=Legacy+CRA"
            after="https://placehold.co/800x500/1b2a2a/51cf66?text=Clean+Hybrid"
            beforeLabel="Legacy (CRA)"
            afterLabel="Baseline (Hybrid)"
            height={480}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
            <div className="ov-card" style={{ padding: 16 }}>
              <div style={{ color: '#ff6b6b', fontWeight: 'bold' }}>⛔ Difficulties (AS-IS)</div>
              <ul style={{ fontSize: 13, paddingLeft: 18, marginTop: 8, opacity: 0.8 }}>
                <li>숨겨진 설정(eject)과의 충돌</li>
                <li>전역 스타일 오염</li>
              </ul>
            </div>
            <div className="ov-card" style={{ padding: 16 }}>
              <div style={{ color: '#51cf66', fontWeight: 'bold' }}>✅ Improvement (TO-BE)</div>
              <ul style={{ fontSize: 13, paddingLeft: 18, marginTop: 8, opacity: 0.8 }}>
                <li>명확한 모듈 경계 (Barrel Pattern)</li>
                <li>스타일 충돌 원천 방지 (Modules)</li>
              </ul>
            </div>
          </div>
        </div>
      </SnapSection>

      {/* 6. Impact */}
      <SnapSection band="body" id="s2-impact" title="Impact: 결과로 증명하는 표준의 힘">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {CONTENT.metrics.map(m => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>
      </SnapSection>

      {/* 7. Outro */}
      <SnapSection band="outro" id="s2-outro" title="Next Step">
        <Overview
          title="지속 가능한 생태계 구축"
          bullets={[
            "Phase 4: Scaffold 공개 및 사내 템플릿 정착",
            "지속 가능한 운영을 위한 기술 파이프라인(CD) 강화",
            "피드백 반영을 통한 Baseline v2 고도화"
          ]}
          memo="우리는 이제 막 '제대로 된 시작'을 했습니다."
        />
      </SnapSection>
    </div>
  )
}
