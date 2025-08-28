import React from "react"
import s from "./OutroSection.module.scss"

export default function OutroSection() {
  return (
    <section className={s.outro}>
      {/* 헤드라인 */}
      <h2 className={s.headline}>
    Baseline으로 <span>반복 문제를 줄이고</span>  
    <span>안정된 개발 기반</span>을 세웁니다
    </h2>

      {/* 성과 요약 */}
      <div className={s.summary}>
        <div className={s.item}>
          <p><b>문제:</b> 라우팅/HTTP/문서/성능 등 중복·비일관성</p>
        </div>
        <div className={s.item}>
          <p><b>해법:</b> Baseline Skeleton + 전자정부프레임워크 참조 구조</p>
        </div>
        <div className={s.item}>
          <p><b>효과:</b> 온보딩 속도 ↑, 유지보수 비용 ↓, 재발 방지</p>
        </div>
      </div>


      {/* Closing Note */}
      <blockquote className={s.closing}>
      {/* 시스템으로 반복 문제는 줄고, 팀은 더 중요한 일에 집중할 수 있게 될 것입니다. */}
      </blockquote>
    </section>
  )
}