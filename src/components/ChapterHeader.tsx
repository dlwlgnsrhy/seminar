type Props = {
    index: number
    title: string
    subtitle: string
}

export default function ChapterHeader({ index, title, subtitle }: Props) {
    return (
        <header style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
                fontSize: 12,
                fontWeight: 900,
                color: 'var(--primary)',
                letterSpacing: 2,
                marginBottom: 12,
                opacity: 0.6
            }}>
                CHAPTER {String(index).padStart(2, '0')}
            </div>
            <h2 style={{
                fontSize: 36,
                fontWeight: 900,
                margin: '0 0 16px',
                color: '#fff',
                letterSpacing: -0.5
            }}>
                {title}
            </h2>
            <p style={{
                fontSize: 16,
                color: 'var(--muted)',
                maxWidth: 700,
                margin: '0 auto',
                lineHeight: 1.6
            }}>
                {subtitle}
            </p>
        </header>
    )
}
