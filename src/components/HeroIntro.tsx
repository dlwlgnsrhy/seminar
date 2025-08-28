// src/components/HeroIntro.tsx
import LinkBtn from '@/components/LinkBtn'
import Callout from '@/components/Callout'

type Props = {
  title: string
  bullets: string[]
  links: { href: string; label: string }[]
}

export default function HeroIntro({ title, bullets, links }: Props) {
  return (
    <div className="hero">
      {/* 배경 데코 (React 로고 라이트) */}
      <div className="hero-bg" aria-hidden>
        <svg width="820" height="820" viewBox="0 0 840 840" className="hero-orb">
          <g opacity=".12" transform="translate(420 420)">
            <ellipse rx="220" ry="80" fill="none" stroke="currentColor" strokeWidth="22"/>
            <ellipse rx="220" ry="80" fill="none" stroke="currentColor" strokeWidth="22" transform="rotate(60)"/>
            <ellipse rx="220" ry="80" fill="none" stroke="currentColor" strokeWidth="22" transform="rotate(120)"/>
            <circle r="20" fill="currentColor"/>
          </g>
        </svg>
      </div>

      {/* 타이틀 */}
      <h1 className="hero-title">
        React <span className="hero-gradient">Re-act</span>
      </h1>
      <p className="hero-sub">{title}</p>

      {/* 3 메시지 (카드형) */}
      <div className="hero-cards">
        {bullets.map((b, i) => (
          <div key={i} className="hero-card">
            <div className="hero-card-dot" />
            <div>{b}</div>
          </div>
        ))}
      </div>

      {/* 근거/레퍼런스 뱃지 */}
      <div className="hero-badges">
        {links.map((l, i) => (
          <LinkBtn key={i} href={l.href} label={l.label} />
        ))}
      </div>
    </div>
  )
}