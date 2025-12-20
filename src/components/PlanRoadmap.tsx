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
  /** 현재 위치 (phase 인덱스, 0부터 시작). 미지정 시 0 */
  currentPhase?: number
  /** 현재 phase의 진행 주차(1~n). 미지정 시 0 */
  currentWeekInPhase?: number
  /** 기본 가정: 하루 작업 가능 시간(시간/일) */
  hoursPerDay?: number
  /** 기본 가정: 전체 예상 기간(개월 범위) */
  monthsEstimate?: [number, number]
  /** 병렬(유지보수·운영) 작업 예시 칩 */
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

// "(2주)"에서 숫자만 추출
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

  // 진행바에서 “현재 위치” 퍼센트
  const pastWeeks = weeks.slice(0, currentPhase).reduce((a, b) => a + b, 0)
  const nowPct =
    ((pastWeeks + Math.max(0, Math.min(currentWeekInPhase, weeks[currentPhase]))) /
      totalWeeks) * 100

  return (
    <section className={s.planRoadmap} aria-labelledby="plan-title">
      <div className={s.stageDecor} aria-hidden />

      <header className={s.head}>
        <h3 id="plan-title" className={s.title}>
          파일럿 ➜ 확장: 3단계 실행 로드맵
        </h3>

        {/* 가정/운영 메시지(텍스트만 보강) */}
        <p className={s.sub}>
          <b>가정:</b> <b>하루 {hoursPerDay}시간</b> 작업 기준, <b>{monthsEstimate[0]}–{monthsEstimate[1]}개월</b> 소요 예측.
          가용 시간이 늘면 <b>기간 단축</b> 가능. <b>유지보수·운영 이슈 병행(병렬 작업)</b> 전제.
        </p>

        {/* 상단 진행바(세그먼트) – UI 유지 */}
        <div className={s.progress} role="img" aria-label={`총 ${totalWeeks}주 계획 진행바`}>
          {phases.map((p, i) => (
            <span
              key={i}
              className={s.seg}
              style={
                { ["--w" as any]: `${(weeks[i] / totalWeeks) * 100}%`, ["--seg" as any]: p.color } as React.CSSProperties
              }
              title={`${p.phase}`}
            />
          ))}

          {/* 현재 위치 마커 (세그먼트 위 얇은 인디케이터) */}
          <i className={s.nowMarker} style={{ left: `calc(${nowPct}% - 6px)` }} aria-hidden />
          <span className={s.progressLabel}>{totalWeeks}주</span>
        </div>

        {/* 범례 */}
        <div className={s.legend} aria-hidden>
          <span className={s.badge}>🎯 산출물</span>
          <span className={`${s.badge} ${s.warn}`}>⚠ 리스크</span>
        </div>
      </header>

      {/* 타임라인 – UI 유지 / 현재 단계 하이라이트 */}
      <div className={s.timeline}>
        <div className={s.spine} aria-hidden />
        {phases.map((p, i) => {
          const isNow = i === currentPhase
          return (
            <div key={i} className={`${s.row} ${s[`delay${i + 1}`]} ${isNow ? s.nowRow : ""}`}>
              <div
                className={`${s.dot} ${isNow ? s.dotNow : ""}`}
                style={{ background: p.color }}
                aria-hidden
              />
              <article className={`${s.card} ${isNow ? s.cardNow : ""}`}>
                <header className={s.cardHead}>
                  <h4 className={s.cardTitle}>
                    {p.phase} — {p.title}
                    {isNow && <span className={s.nowBadge}>NOW</span>}
                  </h4>
                  <span className={s.duration}>{weeks[i]}주</span>
                </header>

                <p className={s.desc}>{p.desc}</p>

                <div className={s.meta}>
                  <span className={s.pill}>🎯 {p.deliverables}</span>
                  <span className={`${s.pill} ${s.warn}`}>⚠ {p.risk}</span>
                </div>

                <i className={s.cardGlow} aria-hidden />
              </article>
            </div>
          )
        })}
      </div>

      {/* 병렬 작업(유지보수 병행) – 텍스트 칩만 추가, UI는 유지 */}
      <footer className={s.footer}>
        <div className={s.noteRow}>
          <span className={s.noteBadge}>병렬</span>
          <div className={s.parallel}>
            {parallelNotes.map((t, i) => (
              <span key={i} className={s.parallelChip}>↺ {t}</span>
            ))}
          </div>
        </div>
        <div className={s.noteRow}>
          <span className={s.noteBadge}>Next</span>
          <div>완료 후 <b>KPI 대시보드</b> & <b>월간 리포팅 템플릿</b>으로 연결</div>
        </div>
      </footer>
    </section>
  )
}