// src/components/BaselineTrendy.tsx
import React from 'react'

type Pillar = { h: string; d: string; icon?: React.ReactNode }
type Props = {
  title?: string
  pillars: Pillar[]
  beforeAfter: [string, string][]
}

const DefaultIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
    <path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
)

export default function BaselineTrendy({
  title='표준으로 일관성과 속도를 만든다',
  pillars,
  beforeAfter
}: Props){
  return (
    <div className="baseline-trendy">
      <div className="baseline-head">
        <h3 className="baseline-title">
          {title}
          <span className="baseline-spark" aria-hidden />
        </h3>
      </div>

      {/* Pillars – 2줄 캐러셀 (1234 / 5678) */}
      <div className="pillar-carousel two-rows" role="list">
        {pillars.map((p, i)=>(
          <article key={i} className="pillar-card-trendy" role="listitem" aria-label={p.h}>
            <div className="pillar-topline" />
            <div className="pillar-icon" aria-hidden>
              {p.icon ?? <DefaultIcon/>}
            </div>
            <div className="pillar-meta">
              <div className="pillar-index">{String(i+1).padStart(2,'0')}</div>
              <h4 className="pillar-title">{p.h}</h4>
            </div>
            <p className="pillar-desc">{p.d}</p>
          </article>
        ))}
      </div>

      {/* Timeline – Before ➜ After */}
      <div className="baseline-timeline">
        <div className="timeline-head">Before → After</div>
        <div className="timeline-rows">
          {beforeAfter.map(([b,a], i)=>(
            <div key={i} className="timeline-row">
              <div className="timeline-card before"><span className="dot" />{b}</div>
              <div className="arrow" aria-hidden />
              <div className="timeline-card after"><span className="shine" aria-hidden />{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}