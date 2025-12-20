import React from 'react'

type BentoItem = {
    id: string
    title: string
    desc: string
    img?: string
    colSpan?: 1 | 2 | 3
    rowSpan?: 1 | 2
    dark?: boolean
    link?: string
}

type Props = {
    items: BentoItem[]
}

export default function BentoGrid({ items }: Props) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            width: '100%',
            maxWidth: 1000
        }}>
            {items.map(item => (
                <div
                    key={item.id}
                    style={{
                        gridColumn: `span ${item.colSpan || 1}`,
                        gridRow: `span ${item.rowSpan || 1}`,
                        background: item.dark ? '#000' : 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 24,
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}
                    className="bento-card"
                >
                    {/* Content */}
                    <div style={{ padding: 24, zIndex: 2, pointerEvents: 'none' }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 700 }}>{item.title}</h3>
                        <p style={{ margin: 0, fontSize: 13, opacity: 0.7, lineHeight: 1.5 }}>{item.desc}</p>
                    </div>

                    {/* Image Area */}
                    {item.img && (
                        <div style={{
                            flex: 1,
                            minHeight: 120,
                            background: `url(${item.img}) no-repeat center/cover`,
                            opacity: 0.8,
                            maskImage: 'linear-gradient(to top, black 60%, transparent 100%)', // Fade top
                            WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)'
                        }} />
                    )}

                    {/* Hover Overlay Link */}
                    {item.link && (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            style={{ position: 'absolute', inset: 0, zIndex: 3 }}
                            aria-label={item.title}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}
