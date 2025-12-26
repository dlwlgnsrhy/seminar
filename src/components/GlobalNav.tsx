import React from 'react'

export default function GlobalNav() {
    return (
        <nav className="nubiz-nav">
            <div className="nubiz-trigger">Nubiz</div>
            <div className="nubiz-menu">
                <a href="#/s1">Seminar 01: The Standard</a>
                <a href="#/s2">Seminar 02: Reliability</a>
                <a href="#/overview">Seminar Overview</a>
                <hr style={{ opacity: 0.1, margin: '4px 0' }} />
                <a href="/seminar/docs/" target="_blank">Technical Docs</a>
            </div>
        </nav>
    )
}
