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

const phases: Phase[] = [
  {
    phase: "Phase 1 (2주)",
    title: "Baseline v1 시범",
    desc: "규칙·샘플 리포·PR 템플릿·온보딩 체크리스트",
    deliverables: "Baseline v1, 용어집",
    risk: "반발 → 워크숍으로 대응",
    color: "var(--primary)",
  },
  {
    phase: "Phase 2 (3주)",
    title: "파일럿 적용",
    desc: "기회비용 높은 프로젝트 적용, 피드백 반영",
    deliverables: "적용 리포트, 성능·온보딩 지표",
    risk: "적용 속도 지연",
    color: "var(--accent)",
  },
  {
    phase: "Phase 3 (1주)",
    title: "전사 확장",
    desc: "문서 보강, 월간 KPI 리포팅",
    deliverables: "Baseline v2, 대시보드",
    risk: "확장시 조율 문제",
    color: "#22c55e",
  },
]

// "(2주)"에서 숫자만 뽑아 누적 진행률/세그먼트 표시
const weeksOf = (txt: string) => {
  const m = txt.match(/(\d+)\s*주/)
  return m ? Number(m[1]) : 1
}

export default function PlanRoadmap() {
  const weeks = phases.map((p) => weeksOf(p.phase))
  const totalWeeks = weeks.reduce((a, b) => a + b, 0)

  return (
    <section className={s.planRoadmap} aria-labelledby="plan-title">
      {/* 무대 데코 */}
      <div className={s.stageDecor} aria-hidden />

      <header className={s.head}>
        <h3 id="plan-title" className={s.title}>
          파일럿 ➜ 확장: 3단계 실행 로드맵
        </h3>
        <p className={s.sub}>8주차 계획 요약 · 단계별 산출물/리스크 명시</p>

        {/* 상단 진행바 (주차 비율 세그먼트) */}
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
          <span className={s.progressLabel}>{totalWeeks}주</span>
        </div>

        {/* 작게: 범례 */}
        <div className={s.legend} aria-hidden>
          <span className={s.badge}>🎯 산출물</span>
          <span className={`${s.badge} ${s.warn}`}>⚠ 리스크</span>
        </div>
      </header>

      {/* 타임라인 */}
      <div className={s.timeline}>
        <div className={s.spine} aria-hidden />
        {phases.map((p, i) => (
          <div key={i} className={`${s.row} ${s[`delay${i + 1}`]}`}>
            <div className={s.dot} style={{ background: p.color }} aria-hidden />
            <article className={s.card}>
              <header className={s.cardHead}>
                <h4 className={s.cardTitle}>
                  {p.phase} — {p.title}
                </h4>
                <span className={s.duration}>{weeks[i]}주</span>
              </header>

              <p className={s.desc}>{p.desc}</p>

              <div className={s.meta}>
                <span className={s.pill}>🎯 {p.deliverables}</span>
                <span className={`${s.pill} ${s.warn}`}>⚠ {p.risk}</span>
              </div>

              {/* 카드 하단 라인 그래디언트 */}
              <i className={s.cardGlow} aria-hidden />
            </article>
          </div>
        ))}
      </div>

      {/* 푸터 메시지 */}
      <footer className={s.footer}>
        Next: <b>KPI 대시보드</b>와 <b>월간 리포팅 템플릿</b>으로 연결
      </footer>
    </section>
  )
}