import React, { useState, useEffect } from 'react'

type Props = {
    title: string
    lines: string[]
    type?: 'bash' | 'success' | 'error' | 'audit'
    animated?: boolean
}

export default function TerminalLog({ title, lines, type = 'bash', animated = false }: Props) {
    const [visibleLines, setVisibleLines] = useState<string[]>([])

    useEffect(() => {
        if (!animated) {
            setVisibleLines(lines)
            return
        }

        setVisibleLines([])
        let currentLine = 0
        const interval = setInterval(() => {
            if (currentLine < lines.length) {
                setVisibleLines(prev => [...prev, lines[currentLine]])
                currentLine++
            } else {
                clearInterval(interval)
            }
        }, 300)

        return () => clearInterval(interval)
    }, [lines, animated])

    const getTheme = () => {
        switch (type) {
            case 'success': return { border: '#51cf66', bg: 'rgba(81, 207, 102, 0.05)', color: '#51cf66' }
            case 'error': return { border: '#ff6b6b', bg: 'rgba(255, 107, 107, 0.05)', color: '#ff6b6b' }
            case 'audit': return { border: '#fcc419', bg: 'rgba(252, 196, 25, 0.05)', color: '#fcc419' }
            default: return { border: '#30363d', bg: '#0d1117', color: '#e6edf3' }
        }
    }

    const theme = getTheme()

    return (
        <div style={{
            background: theme.bg,
            border: `1px solid ${theme.border}`,
            borderRadius: 12,
            overflow: 'hidden',
            fontFamily: 'monospace',
            fontSize: 13,
            width: '100%',
            maxWidth: 800,
            margin: '20px auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            transition: 'all 0.3s ease'
        }}>
            {/* Header */}
            <div style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.05)',
                borderBottom: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 12
            }}>
                <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <div style={{ color: theme.color, fontSize: 11, fontWeight: 700, opacity: 0.8, letterSpacing: 0.5 }}>
                    {title}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '20px', overflowX: 'auto', lineHeight: 1.6, minHeight: lines.length * 21 + 40 }}>
                {visibleLines.map((line, i) => (
                    <div key={i} style={{ display: 'flex', gap: 16 }}>
                        <span style={{ opacity: 0.3, userSelect: 'none', width: 24, textAlign: 'right' }}>{i + 1}</span>
                        <span style={{
                            color: line?.startsWith('FAIL') ? '#ff6b6b' :
                                line?.startsWith('PASS') ? '#51cf66' :
                                    line?.includes('warning') ? '#fcc419' : theme.color,
                            whiteSpace: 'pre-wrap'
                        }}>
                            {line || ''}
                        </span>
                    </div>
                ))}
                {animated && visibleLines.length < lines.length && (
                    <div style={{ display: 'flex', gap: 16 }}>
                        <span style={{ opacity: 0.3, userSelect: 'none', width: 24, textAlign: 'right' }}>{visibleLines.length + 1}</span>
                        <span style={{ color: theme.color, borderRight: `2px solid ${theme.color}`, animation: 'blink 1s step-end infinite' }}>&nbsp;</span>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes blink {
                    from, to { border-color: transparent }
                    50% { border-color: currentColor }
                }
            `}</style>
        </div>
    )
}
