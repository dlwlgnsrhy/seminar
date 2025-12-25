import React from 'react'

const CHAPTERS = [
    { id: 'ch1', title: 'Why & Plan', color: '#5aa9ff' },
    { id: 'ch2', title: 'Foundation', color: '#7c4dff' },
    { id: 'ch3', title: 'Quality', color: '#ff6b6b' },
    { id: 'ch4', title: 'DX', color: '#51cf66' },
    { id: 'ch5', title: 'Architecture', color: '#fcc419' },
    { id: 'ch6', title: 'Vision', color: '#cbd5e1' },
]

export default function EliteRail() {
    const [activeChapter, setActiveChapter] = React.useState('ch1')

    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const band = entry.target.getAttribute('data-band')
                    if (band?.startsWith('ch')) {
                        setActiveChapter(band)
                    }
                }
            })
        }, { threshold: 0.5 })

        document.querySelectorAll('.snap-section').forEach(section => {
            observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])

    const activeIndex = CHAPTERS.findIndex(c => c.id === activeChapter)

    return (
        <div className="railnav" style={{ right: 32, gap: 12, zIndex: 100 }}>
            <div className="rail-chapter-marker" style={{
                height: 40,
                background: CHAPTERS[activeIndex].color,
                boxShadow: `0 0 20px ${CHAPTERS[activeIndex].color}`,
                transform: `translateY(${activeIndex * (28 + 12)}px)`
            }} />

            {CHAPTERS.map((ch, i) => (
                <button
                    key={ch.id}
                    className={`rail-btn ${activeChapter === ch.id ? 'active' : ''}`}
                    onClick={() => {
                        const el = document.querySelector(`[data-band="${ch.id}"]`)
                        el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                >
                    <div className="rail-dot" style={{
                        background: activeChapter === ch.id ? ch.color : '#30363d',
                        transform: activeChapter === ch.id ? 'scale(1.4)' : 'scale(1)'
                    }} />
                    <div className="rail-label" style={{
                        border: `1px solid ${ch.color}`,
                        background: 'rgba(0,0,0,0.8)',
                        color: ch.color,
                        fontWeight: 700
                    }}>
                        {i + 1}. {ch.title}
                    </div>
                </button>
            ))}
        </div>
    )
}
