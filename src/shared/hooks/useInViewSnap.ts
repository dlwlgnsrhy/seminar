import { useEffect } from 'react'

export function useInViewSnap() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.snap-section')) as HTMLElement[]
    const root = document.querySelector('.snap-container') as HTMLElement | null

    const obs = new IntersectionObserver((entries) => {
      // 가장 많이 보이는 섹션의 band를 body dataset에 반영
      let top: { ratio: number; band: string | null } = { ratio: 0, band: null }

      entries.forEach((e) => {
        const el = e.target as HTMLElement
        if (e.isIntersecting) el.classList.add('inview')
        else el.classList.remove('inview')

        if (e.intersectionRatio > top.ratio) {
          top = { ratio: e.intersectionRatio, band: el.dataset.band ?? null }
        }
      })

      if (top.band) {
        document.body.setAttribute('data-band', top.band)
      }
    }, {
      root,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0.25, 0.5, 0.75],
    })

    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])
}
