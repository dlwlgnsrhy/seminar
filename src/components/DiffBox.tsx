type Props = {
    label: string
    before: string
    after: string
}

export default function DiffBox({ label, before, after }: Props) {
    return (
        <div style={{ marginTop: 24 }}>
            <div style={{
                fontSize: 13,
                fontWeight: 800,
                marginBottom: 12,
                color: 'var(--primary)'
            }}>
                {label}
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16
            }}>
                <div style={{
                    background: 'rgba(255,107,107,0.1)',
                    border: '1px solid rgba(255,107,107,0.3)',
                    borderRadius: 8,
                    padding: 16
                }}>
                    <div style={{
                        fontSize: 11,
                        fontWeight: 900,
                        color: '#ff6b6b',
                        marginBottom: 8
                    }}>
                        BEFORE
                    </div>
                    <pre style={{
                        margin: 0,
                        fontFamily: 'monospace',
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.8)',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {before}
                    </pre>
                </div>
                <div style={{
                    background: 'rgba(81,207,102,0.1)',
                    border: '1px solid rgba(81,207,102,0.3)',
                    borderRadius: 8,
                    padding: 16
                }}>
                    <div style={{
                        fontSize: 11,
                        fontWeight: 900,
                        color: '#51cf66',
                        marginBottom: 8
                    }}>
                        AFTER
                    </div>
                    <pre style={{
                        margin: 0,
                        fontFamily: 'monospace',
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.8)',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {after}
                    </pre>
                </div>
            </div>
        </div>
    )
}
