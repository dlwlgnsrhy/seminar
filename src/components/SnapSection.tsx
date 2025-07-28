import { PropsWithChildren } from 'react'

export default function SnapSection({ id, title, children }:
  PropsWithChildren<{ id: string; title?: string }>) {
  return (
    <section id={id} className="snap-section">
      <div className="section-panel">
        {title && <h2 style={{marginTop:0}}>{title}</h2>}
        {children}
      </div>
    </section>
  )
}