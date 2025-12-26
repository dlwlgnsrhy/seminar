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
          title="더 나은 협업을 향한 작은 시도: 리액트 베이스라인 Part 2"
          bullets={[
            "안정성: 거창한 기술보다, 팀 전체가 믿고 쓸 수 있는 최소한의 안전장치",
            "생산성: 개인의 기교에 의존하지 않고 누구나 표준에 안착하기 위한 여정",
            "문화: '정답'을 강요하기보다, 함께 고민한 결과를 유산으로 정립하는 과정"
          ]}
          agenda={[
            { num: "01", text: "도입: 협업의 기록" },
            { num: "02", text: "실체: Baseline Docs" },
            { num: "03", text: "성과: Pilot Deep-dive" },
            { num: "04", text: "확산: Team Integration" },
            { num: "05", text: "비전: AX(AIX) Preview" }
          ]}
          links={[
            { href: "#", label: "Baseline Repo" },
            { href: "#", label: "Design Variable Docs" }
          ]}
        />
      </SnapSection>


      {/* CHAPTER 2: Baseline 실체 (Documentation) */}
      <SnapSection band="ch2" id="ch2-docs" title="">
        <ChapterHeader index={2} title="Baseline의 실체" subtitle="말뿐인 가이드가 아닌, 데이터와 근거로 증명하는 표준화의 기록입니다." />
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
          <TerminalLog animated title="Docs 구조 분석: ls -R docs/" type="audit" lines={[
            "docs/standard/coding-convention.md",
            "docs/architecture/state-management.md",
            "docs/ci-cd/deployment-flow.md",
            "정보: 23개의 핵심 명세 문서화 완료",
            "결과: 온보딩 리소스 70% 절감"
          ]} />
          <div className="ov-card">
            <h4>Docusaurus 기반 정적 문서 시스템</h4>
            <p style={{ fontSize: 13, opacity: 0.8 }}>검색 가능한 검색창, 버전 관리, 코드 스니펫 복사 기능을 통해 개발자가 실무에 즉시 적용할 수 있는 환경을 구축했습니다.</p>
            <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
              <LinkBtn href="/seminar/docs" label="실제 문서 시스템 탐색 (GitHub Pages)" />
              <Callout type="success" style={{ margin: 0 }}>egovReactTsx/docs</Callout>
            </div>
          </div>
        </div>
      </SnapSection>

      {/* CHAPTER 3: 성과 분석 (Roadmap & Pilot) */}
      <SnapSection band="ch3" id="ch3-roadmap" title="">
        <ChapterHeader index={3} title="성과 분석: 파일럿 프로젝트" subtitle="계획을 넘어 실제 실무에서 마주한 변곡점과 혁신적 효율화의 기록입니다." />
        <PlanRoadmapS2 />
      </SnapSection>

      <SnapSection band="ch3" id="ch3-pilot-deep" title="파일럿 성과 4분면 상세">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 16 }}>
          <div className="ov-card" style={{ borderLeft: '4px solid #5aa9ff' }}>
            <h4 style={{ color: '#5aa9ff' }}>1. 성능 (Part 1-5)</h4>
            <p style={{ fontSize: 13 }}>WebP 최적화 및 청크 분리로 Lighthouse 성능 90점대 달성.</p>
          </div>
          <div className="ov-card" style={{ borderLeft: '4px solid #ff6b6b' }}>
            <h4 style={{ color: '#ff6b6b' }}>2. 안정성 (Part 6-11)</h4>
            <p style={{ fontSize: 13 }}>Zod 타입 검증 및 Sentry 모니터링으로 서비스 무중단 운영.</p>
          </div>
          <div className="ov-card" style={{ borderLeft: '4px solid #51cf66' }}>
            <h4 style={{ color: '#51cf66' }}>3. 생산성 (Part 12-16)</h4>
            <p style={{ fontSize: 13 }}>AI Agent 도구 도입으로 마이그레이션 공수 75% 이상 절감.</p>
          </div>
          <div className="ov-card" style={{ borderLeft: '4px solid #7c4dff' }}>
            <h4 style={{ color: '#7c4dff' }}>4. 표준화 (Part 17-21)</h4>
            <p style={{ fontSize: 13 }}>Scaffold 템플릿 제공으로 누구나 5분 만에 표준 환경 구축.</p>
          </div>
        </div>
      </SnapSection>

      {/* CHAPTER 4: 확산 (Team Integration) */}
      <SnapSection band="ch4" id="ch4-sync" title="">
        <ChapterHeader index={4} title="현장 중심의 협업 시스템" subtitle="개발자만의 Baseline이 아닌, 디자인/앱/백엔드 팀원들을 위한 생태계를 구축합니다." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="ov-card">
            <h4>🔗 Backend: Swagger-UI 연동</h4>
            <p style={{ fontSize: 13, opacity: 0.8 }}>API 명세 자동 동기화로 소통 비용을 낮추고, 병목 없는 개발 사이클을 구축했습니다.</p>
            <div style={{ marginTop: 16, border: '1px solid var(--surface-2)', padding: 12, borderRadius: 8, background: '#1a1a1a' }}>
              <span style={{ color: '#51cf66', fontWeight: 900 }}>GET</span> /api/pilot/results <span style={{ float: 'right', fontSize: 11, opacity: 0.4 }}>Swagger V3</span>
            </div>
          </div>
          <div className="ov-card">
            <h4>🎨 App/Design: 시스템 공조</h4>
            <p style={{ fontSize: 13, opacity: 0.8 }}>디자인 토큰과 앱 스키마 통합으로, 전 조직이 동일한 비즈니스 언어를 공유합니다.</p>
            <Callout type="info" style={{ marginTop: 12 }}>현재 유관 조직 전체 확산 중</Callout>
          </div>
        </div>
      </SnapSection>

      {/* CHAPTER 5: 비전 (AX Preview) */}
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
