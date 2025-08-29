import React from "react"
import s from "./OutroSection.module.scss"

const LIGHT_REFS = [
  { label: "Core Web Vitals 한눈에", href: "https://web.dev/vitals/" },
  { label: "Largest Contentful Paint (LCP)", href: "https://web.dev/lcp/" },
  { label: "왜 성능이 비즈니스에 중요한가", href: "https://web.dev/why-speed-matters/" },
  { label: "Chrome UX Report (CrUX) 소개", href: "https://developer.chrome.com/docs/crux/" },
]

const TECH_REFS = [
  { label: "Lighthouse 개요", href: "https://developer.chrome.com/docs/lighthouse/overview/" },
  { label: "React Router v6 문서", href: "https://reactrouter.com/en/main" },
  { label: "React.lazy · 코드 스플리팅", href: "https://react.dev/reference/react/lazy" },
  { label: "Axios Interceptors", href: "https://axios-http.com/docs/interceptors" },
  { label: "react-hook-form", href: "https://react-hook-form.com/" },
  { label: "Zod 스키마 밸리데이션", href: "https://zod.dev/" },
]

export default function OutroSection() {
  return (
    <section className={s.outro} aria-labelledby="outro-headline">
      {/* 헤드라인 */}
      <h2 id="outro-headline" className={s.headline}>
        Baseline으로 <span>반복 문제를 줄이고</span>
        <span>안정된 개발 기반</span>을 세웁니다
      </h2>

      {/* 참조 구분: 가벼운 / 기술적 */}
      <div className={s.refsWrap}>
        <article className={s.refGroup} aria-labelledby="light-refs-title">
          <h3 id="light-refs-title" className={s.refGroupTitle}>
            <span className={`${s.badge} ${s.badgeSoft}`} aria-hidden>🌱</span>
            가벼운 참조
          </h3>
          <ul className={s.refList}>
            {LIGHT_REFS.map((it, i) => (
              <li key={i} className={s.refItem}>
                <a className={s.refLink} href={it.href} target="_blank" rel="noreferrer">
                  <span className={s.bullet} aria-hidden>↗</span>
                  <span className={s.refLabel}>{it.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className={s.refGroup} aria-labelledby="tech-refs-title">
          <h3 id="tech-refs-title" className={s.refGroupTitle}>
            <span className={s.badge} aria-hidden>🔧</span>
            기술적 참조
          </h3>
          <ul className={s.refList}>
            {TECH_REFS.map((it, i) => (
              <li key={i} className={s.refItem}>
                <a className={s.refLink} href={it.href} target="_blank" rel="noreferrer">
                  <span className={s.bullet} aria-hidden>↗</span>
                  <span className={s.refLabel}>{it.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* 클로징 한 줄 */}
      <div className={s.closing}>
        다음 세미나에서는 <b>성능 개선 적용 화면</b>을 전/후 지표와 함께 공유드리겠습니다.
      </div>
    </section>
  )
}
