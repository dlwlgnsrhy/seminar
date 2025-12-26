type Props = {
    title: string
    value: string
    detail: string
    trend: 'up' | 'down'
}

export default function MetricCard({ title, value, detail, trend }: Props) {
    const trendColor = trend === 'up' ? '#51cf66' : '#ff6b6b'
    const trendIcon = trend === 'up' ? '↑' : '↓'

    return (
        <div className="ov-card" style={{
            padding: 24,
            textAlign: 'center',
            borderTop: `3px solid ${trendColor}`
        }}>
            <div style={{
                fontSize: 14,
                fontWeight: 800,
                color: 'var(--muted)',
                marginBottom: 12
            }}>
                {title}
            </div>
            <div style={{
                fontSize: 48,
                fontWeight: 900,
                color: trendColor,
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
            }}>
                {value}
                <span style={{ fontSize: 24 }}>{trendIcon}</span>
            </div>
            <div style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)'
            }}>
                {detail}
            </div>
        </div>
    )
}
