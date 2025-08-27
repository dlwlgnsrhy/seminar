import React, { useMemo } from 'react'

type Sev = 'low'|'medium'|'high'|'critical'
type BelowItem = { label: string; severity?: Sev; note?: string }

export default function Iceberg({
  above,
  below,
  title = 'Icebug – 수면 위/아래',
  onSelect,
}: {
  above: string[]
  below: BelowItem[]
  title?: string
  onSelect?: (label: string) => void
}) {

  // ────────────────────────────────────────────────────────────────
  // 배치 앵커(%) – 수면 위/아래 각각 좌표 세트
  // ────────────────────────────────────────────────────────────────
  const WATERLINE = 36 // % (위치 기준선)
  const aboveAnchors = useMemo(() => ([
    {x:50,y:WATERLINE-16}, {x:38,y:WATERLINE-22}, {x:62,y:WATERLINE-24},
    {x:28,y:WATERLINE-10}, {x:72,y:WATERLINE-12}
  ]), [])
  const belowAnchors = useMemo(() => ([
    {x:50,y:WATERLINE+8}, {x:36,y:WATERLINE+12}, {x:64,y:WATERLINE+16},
    {x:26,y:WATERLINE+24}, {x:74,y:WATERLINE+26}, {x:18,y:WATERLINE+36},
    {x:82,y:WATERLINE+38}, {x:50,y:WATERLINE+46}, {x:32,y:WATERLINE+52},
    {x:68,y:WATERLINE+56},
  ]), [])

  // 안정적 지터(라벨 기반 hash)로 자연스러움
  const hash = (s: string) => {
    let h = 0
    for (let i=0;i<s.length;i++) h = (h<<5) - h + s.charCodeAt(i)
    return h
  }
  const jitter = (s: string, mag = 2) => {
    const h = Math.abs(hash(s))
    const dx = ((h % 100) / 100 - 0.5) * 2 * mag
    const dy = ((((h/100)|0) % 100) / 100 - 0.5) * 2 * mag
    return { dx, dy }
  }

  // ⬆️ 위/⬇️ 아래 아이템을 좌표에 매핑
  const topPills = above.map((label, i) => {
    const a = aboveAnchors[i % aboveAnchors.length]
    const j = jitter(label, 2.4)
    return { label, x: a.x + j.dx, y: a.y + j.dy }
  })

  const bottomPills = below.map((item, i) => {
    const a = belowAnchors[i % belowAnchors.length]
    const j = jitter(item.label, 2.8)
    return { ...item, x: a.x + j.dx, y: a.y + j.dy }
  })

  return (
    <figure className="iceberg" aria-label={title}>
      {/* 백그라운드(하늘/물) */}
      <svg className="iceberg-bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {/* Sky gradient */}
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor="rgba(90,169,255,.20)"/>
            <stop offset="100%" stopColor="rgba(16,32,58,1)"/>
          </linearGradient>
          <linearGradient id="water" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor="rgba(12,24,44,.0)"/>
            <stop offset="100%" stopColor="rgba(12,24,44,.55)"/>
          </linearGradient>

          {/* 얼음 그라데이션 */}
          <linearGradient id="iceTop" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor="#e6f2ff"/>
            <stop offset="100%" stopColor="#b7d6ff"/>
          </linearGradient>
          <linearGradient id="iceBottom" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor="#9bc7ff"/>
            <stop offset="100%" stopColor="#5aa9ff"/>
          </linearGradient>

          {/* 물결 마스크 */}
          <pattern id="waves" width="120" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q 15 0 30 10 T 60 10 T 90 10 T 120 10"
              fill="none" stroke="rgba(255,255,255,.20)" strokeWidth="1.2"/>
          </pattern>
          <mask id="waveMask">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#waves)">
              <animate attributeName="x" from="0" to="120" dur="6s" repeatCount="indefinite"/>
            </rect>
          </mask>
        </defs>

        {/* Sky */}
        <rect x="0" y="0" width="100" height="100" fill="url(#sky)" />

        {/* Water (아래 영역) */}
        <rect x="0" y={WATERLINE} width="100" height={100-WATERLINE} fill="url(#water)" />

        {/* 수면선 */}
        <line x1="0" y1={WATERLINE} x2="100" y2={WATERLINE}
              stroke="rgba(255,255,255,.35)" strokeWidth="0.6" />

        {/* 물결 강조(마스크) */}
        <rect x="0" y={WATERLINE-1} width="100" height="6" fill="rgba(255,255,255,.18)" mask="url(#waveMask)"/>

        {/* Iceberg – top */}
        <g filter="url(#blur)">
          <path
            d="M50 12 L60 28 L54 28 L50 24 L46 28 L40 28 Z"
            fill="url(#iceTop)" opacity="0.95"
          />
        </g>

        {/* Iceberg – bottom (크게) */}
        <path
          d={`M50 ${WATERLINE}
              L72 ${WATERLINE+18}
              L82 ${WATERLINE+36}
              L68 ${WATERLINE+60}
              L50 ${WATERLINE+70}
              L32 ${WATERLINE+60}
              L18 ${WATERLINE+36}
              L28 ${WATERLINE+18} Z`}
          fill="url(#iceBottom)" opacity="0.85"
        />

        {/* 약한 글로우 */}
        <ellipse cx="50" cy={WATERLINE+40} rx="28" ry="16" fill="rgba(122,177,255,.10)" />
      </svg>

      {/* 라벨(알약)들 – 절대 배치 */}
      <div className="iceberg-pills">
        {/* Above water */}
        {topPills.map(({label,x,y})=>(
          <button
            key={`top-${label}`}
            className="pill pill-top"
            style={{ left:`${x}%`, top:`${y}%` }}
            onClick={()=>onSelect?.(label)}
            title={label}
          >
            {label}
          </button>
        ))}
        {/* Below water */}
        {bottomPills.map(({label,severity='medium',x,y,note})=>(
          <button
            key={`bot-${label}`}
            className={`pill pill-bot sev-${severity}`}
            style={{ left:`${x}%`, top:`${y}%` }}
            onClick={()=>onSelect?.(label)}
            title={note ? `${label} — ${note}` : label}
          >
            {label}
          </button>
        ))}
      </div>

      <figcaption className="iceberg-cap">{title}</figcaption>
    </figure>
  )
}
