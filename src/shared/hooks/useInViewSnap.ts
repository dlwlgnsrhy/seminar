import { useEffect } from 'react'

export function useInViewSnap() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.snap-section')) as HTMLElement[]
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const el = e.target as HTMLElement
        if (e.isIntersecting) el.classList.add('inview')
        else el.classList.remove('inview')
      })
    }, { 
        rootMargin: '-20% 0px -20% 0px', 
        threshold: 0.25 })
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])
}