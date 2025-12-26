import React from "react"
import s from "./PlanRoadmap.module.scss"

type Phase = {
  phase: string
  title: string
  desc: string
  deliverables: string
  risk: string
  color: string
}

type Props = {
  currentPhase?: number
  currentWeekInPhase?: number
  hoursPerDay?: number
  monthsEstimate?: [number, number]
  parallelNotes?: string[]
}

const phases: Phase[] = [
  {
    phase: "Phase 0 (2주)",
    title: "Bootstrap & Docs",
    desc: "환경 구축 · Docusaurus · 용어 정의. 코딩 없는 설계 우선 단계.",
    deliverables: "Docs Site, ADR, 폴더 구조 정의서",
    risk: "설계 합의 지연",
    color: "#9e9e9e",
  },
  {
    phase: "Phase 1 (4주)",
    title: "Baseline v1 & Web Defaults",
    desc: "Vite/TS Strict 설정 · 코어 아키텍처(Zustand/Query) 구현.",
    deliverables: "Baseline 리포지토리, 공통 API 모듈",
    risk: "기존 CRA 관성과의 충돌",
    color: "var(--primary)",
  },
  {
    phase: "Phase 2 (12주)",
    title: "Pilot-First & 점진 적용",
    desc: "파일럿 프로젝트(에너지전환 등) 선적용 및 메트릭 수집.",
    deliverables: "성능/생산성 지표 (Before/After)",
    risk: "운영 이슈로 인한 일정 지연",
    color: "var(--accent)",
  },
  {
    phase: "Phase 3 (4주)",
    title: "확장 & 구조 재정립",
    desc: "Angular Hybrid 구조 확립 · 피드백 반영 리팩토링.",
    deliverables: "Baseline v2, 개선된 폴더 구조",
    risk: "복잡도 증가로 인한 러닝커브",
    color: "#ff9100",
  },
  {
    phase: "Phase 4 (4주)",
    title: "Package & CI/CD",
    desc: "Scaffold 도구 배포 · GitLab CI 파이프라인 고도화.",
    deliverables: "create-app 스크립트, 자동화된 CI",
    risk: "파이프라인 유지보수 비용 발생",
    color: "#22c55e",
  },
]

const weeksOf = (txt: string) => {
  const m = txt.match(/(\d+)\s*주/)
  return m ? Number(m[1]) : 1
}

export default function PlanRoadmap({
  currentPhase = 0,
  currentWeekInPhase = 0,
  hoursPerDay = 1,
  monthsEstimate = [4, 6],
  parallelNotes = ["운영·유지보수 이슈 처리", "리포팅 대응", "경미한 버그 픽스"]
}: Props) {
  const weeks = phases.map((p) => weeksOf(p.phase))
  const totalWeeks = weeks.reduce((a, b) => a + b, 0)
  const pastWeeks = weeks.slice(0, currentPhase).reduce((a, b) => a + b, 0)
  const nowPct = ((pastWeeks + Math.max(0, Math.min(currentWeekInPhase, weeks[currentPhase]))) / totalWeeks) * 100

  return (
    <section className={s.planRoadmap} aria-labelledby="plan-title">
      <div className={s.stageDecor} aria-hidden />
      <header className={s.head}>
        <h3 id="plan-title" className={s.title}>파일럿 ➜ 확장: 3단계 실행 로드맵</h3>
        <p className={s.sub}>
          <b>가정:</b> <b>하루 {hoursPerDay}시간</b> 작업 기준, <b>{monthsEstimate[0]}–{monthsEstimate[1]}개월</b> 소요 예측.
        </p>
        <div className={s.progress}>
          {phases.map((p, i) => (
            <span key={i} className={s.seg} style={{ ["--w" as any]: `${(weeks[i] / totalWeeks) * 100}%`, ["--seg" as any]: p.color } as React.CSSProperties} />
          ))}
          <i className={s.nowMarker} style={{ left: `calc(${nowPct}% - 6px)` }} />
          <span className={s.progressLabel}>{totalWeeks}주</span>
        </div>
      </header>
      <div className={s.timeline}>
        <div className={s.spine} />
        {phases.map((p, i) => (
          <div key={i} className={`${s.row} ${s[`delay${i + 1}`]} ${i === currentPhase ? s.nowRow : ""}`}>
            <div className={`${s.dot} ${i === currentPhase ? s.dotNow : ""}`} style={{ background: p.color }} />
            <article className={`${s.card} ${i === currentPhase ? s.cardNow : ""}`}>
              <header className={s.cardHead}>
                <h4 className={s.cardTitle}>{p.phase} — {p.title}</h4>
                <span className={s.duration}>{weeks[i]}주</span>
              </header>
              <p className={s.desc}>{p.desc}</p>
              <div className={s.meta}>
                <span className={s.pill}>🎯 {p.deliverables}</span>
                <span className={`${s.pill} ${s.warn}`}>⚠ {p.risk}</span>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}