import React, { useState, useRef, useEffect } from 'react'

type Props = {
    before: string
    after: string
    beforeLabel?: string
    afterLabel?: string
    height?: number | string
}

export default function CompareSlider({
    before,
    after,
    beforeLabel = "Before",
    afterLabel = "After",
    height = 500
}: Props) {
    const [percent, setPercent] = useState(50)
    const isDragging = useRef(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
        setPercent((x / rect.width) * 100)
    }

    const onMouseMove = (e: React.MouseEvent) => {
        if (isDragging.current) handleMove(e.clientX)
    }

    const onTouchMove = (e: React.TouchEvent) => {
        if (isDragging.current) handleMove(e.touches[0].clientX)
    }

    useEffect(() => {
        const stop = () => isDragging.current = false
        window.addEventListener('mouseup', stop)
        window.addEventListener('touchend', stop)
        return () => {
            window.removeEventListener('mouseup', stop)
            window.removeEventListener('touchend', stop)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            role="slider"
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            style={{
                position: 'relative',
                width: '100%',
                height: height,
                overflow: 'hidden',
                borderRadius: 16,
                userSelect: 'none',
                cursor: 'col-resize',
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#000'
            }}
            onMouseDown={(e) => { isDragging.current = true; handleMove(e.clientX) }}
            onMouseMove={onMouseMove}
            onTouchStart={(e) => { isDragging.current = true; handleMove(e.touches[0].clientX) }}
            onTouchMove={onTouchMove}
        >
            {/* Background (After Image) */}
            <img
                src={after}
                alt={afterLabel}
                style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    objectFit: 'cover', pointerEvents: 'none'
                }}
            />
            <span style={{
                position: 'absolute', top: 20, right: 20,
                padding: '4px 12px', background: 'rgba(0,0,0,0.6)',
                color: '#fff', borderRadius: 20, fontSize: 12, fontWeight: 'bold'
            }}>
                {afterLabel}
            </span>

            {/* Foreground (Before Image) - Clipped */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: `${percent}%`, height: '100%',
                overflow: 'hidden', borderRight: '2px solid #fff',
                boxShadow: '10px 0 20px rgba(0,0,0,0.5)'
            }}>
                <img
                    src={before}
                    alt={beforeLabel}
                    style={{
                        position: 'absolute', top: 0, left: 0,
                        width: containerRef.current ? containerRef.current.offsetWidth : '100vw',
                        height: '100%',
                        objectFit: 'cover', pointerEvents: 'none'
                    }}
                />
                <span style={{
                    position: 'absolute', top: 20, left: 20,
                    padding: '4px 12px', background: 'rgba(0,0,0,0.6)',
                    color: '#fff', borderRadius: 20, fontSize: 12, fontWeight: 'bold'
                }}>
                    {beforeLabel}
                </span>
            </div>

            {/* Handle */}
            <div style={{
                position: 'absolute', top: '50%', left: `${percent}%`,
                transform: 'translate(-50%, -50%)',
                width: 40, height: 40, borderRadius: '50%',
                background: '#fff', display: 'grid', placeItems: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)', pointerEvents: 'none'
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 16V8M7 8L3 12M7 8L11 12" />
                    <path d="M17 8v8M17 16l4-4M17 16l-4-4" />
                </svg>
            </div>
        </div>
    )
}
