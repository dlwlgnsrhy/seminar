export default function SnapSection({
  id, title, children, band = 'body',
}: {
  id: string
  title: string
  band?: 'intro' | 'body' | 'outro'
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`snap-section band-${band}`} data-band={band}>
      <div className="section-panel">
        {title && <h2 style={{marginTop:0}}>{title}</h2>}
        {children}
      </div>
    </section>
  )
}
