import { useEffect, useState } from 'react'

export default function DotNav() {
  const [ids, setIds] = useState<string[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const secs = Array.from(
      document.querySelectorAll('.snap-section[id]'),
    ) as HTMLElement[]
    setIds(secs.map((s) => s.id))

    // ★ 스냅 스크롤 컨테이너를 IntersectionObserver의 root로 지정
    const root = document.querySelector('.snap-container') as HTMLElement | null

    const cb: IntersectionObserverCallback = (entries) => {
      const vis = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0]
      if (vis?.target) setActive((vis.target as HTMLElement).id)
    }

    // ★ rootMargin 값에 반드시 단위(px 또는 %) 포함
    //   상/하단 35%를 감안해서 in-view 판정
    const obs = new IntersectionObserver(cb, {
      root,                                // ← 중요
      rootMargin: '0px 0px -35% 0px',      // ← 모든 값에 단위
      threshold: [0.25, 0.5, 0.75],
    })

    secs.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="dotnav" aria-label="Jump to section">
      {ids.map((id) => (
        <button
          key={id}
          aria-label={id}
          className={active === id ? 'active' : ''}
          onClick={() => go(id)}
        />
      ))}
    </div>
  )
}