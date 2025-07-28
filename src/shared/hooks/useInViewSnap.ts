import { useEffect } from 'react'

export function useInViewSnap() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll('.snap-section'),
    ) as HTMLElement[]

    // ★ 동일하게 스냅 컨테이너를 root로 지정
    const root = document.querySelector('.snap-container') as HTMLElement | null

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement
          if (e.isIntersecting) el.classList.add('inview')
          else el.classList.remove('inview')
        })
      },
      {
        root,                                 // ← 중요
        rootMargin: '-20% 0px -20% 0px',      // ← 모든 값에 단위
        threshold: 0.25,
      },
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])
}