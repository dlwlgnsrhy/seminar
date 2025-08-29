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
    phase: "Phase 1 (4주)", // 2주 스프린트 × 2회
    title: "준비·시범 (Baseline v1)",
    desc: "규칙 정립 · 샘플 리포 · PR 템플릿 · 온보딩 체크리스트. 2주 스프린트 × 2",
    deliverables: "Baseline v1, 용어집, 🧱 Baseline Skeleton(eGovFrame ref)",
    risk: "업무 병행으로 킥오프 지연 → 병렬 슬롯·WIP 한도 관리",
    color: "var(--primary)",
  },
  {
    phase: "Phase 2 (12주)", // 2주 스프린트 × 6회
    title: "파일럿·점진 적용",
    desc: "고가치 프로젝트부터 점진 적용 · 피드백 반영. 2주 스프린트 × 6 (유지보수 병행)",
    deliverables: "적용 리포트, 성능·온보딩 지표, 🧱 Skeleton 패키지(라우팅/HTTP/폼/에러)",
    risk: "운영 이슈 병행으로 적용 속도 저하 → 병렬 슬롯·WIP 한도 관리",
    color: "var(--accent)",
  },
  {
    phase: "Phase 3 (4주)", // 2주 스프린트 × 2회
    title: "확장·정착 (Baseline v2)",
    desc: "문서 보강 · 공통 패키지 배포 · 월간 KPI 리포팅 정착. 2주 스프린트 × 2",
    deliverables: "Baseline v2, 대시보드, 🧱 프로젝트 템플릿(Scaffold) 공개",
    risk: "팀별 변형 요구로 표준 이탈 → 확장 포인트/가드레일 분리",
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