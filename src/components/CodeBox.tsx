type Props = {
    color: string
    label: string
    code: string
}

export default function CodeBox({ color, label, code }: Props) {
    return (
        <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: `1px solid ${color}`,
            borderRadius: 8,
            padding: 16,
            fontFamily: 'monospace',
            fontSize: 13
        }}>
            <div style={{
                color,
                fontSize: 11,
                fontWeight: 900,
                marginBottom: 8,
                opacity: 0.7
            }}>
                {label}
            </div>
            <pre style={{
                margin: 0,
                color: 'rgba(255,255,255,0.9)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
            }}>
                {code}
            </pre>
        </div>
    )
}
