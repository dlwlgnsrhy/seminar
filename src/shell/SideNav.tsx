import { useEffect, useState } from 'react'

export default function SideNav() {
  const [ids, setIds] = useState<string[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const content = document.querySelector('.content')
    const root = document.querySelector('.snap-container') as HTMLElement | null

    const refresh = () => {
      const secs = Array.from(document.querySelectorAll('.snap-section[id]')) as HTMLElement[]
      setIds(secs.map((s) => s.id))
    }
    refresh()

    // 라우트 변경/DOM 변경에도 목록 재수집
    const mo = new MutationObserver(refresh)
    if (content) mo.observe(content, { childList: true, subtree: true })

    const io = new IntersectionObserver(
      (ents) => {
        const vis = ents
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0]
        if (vis?.target) setActive((vis.target as HTMLElement).id)
      },
      { root, rootMargin: '0px 0px -35% 0px', threshold: [0.25, 0.5, 0.75] }
    )

    const secs = Array.from(document.querySelectorAll('.snap-section[id]')) as HTMLElement[]
    secs.forEach((el) => io.observe(el))

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // 해시를 바꾸고 싶다면 다음 줄 활성화:
    // history.replaceState(null, '', `#${id}`)
  }

  return (
    <nav className="navgroup" aria-label="Section navigation">
      {ids.map((id) => (
        <button
          key={id}
          onClick={() => go(id)}
          className={active === id ? 'active' : ''}
          style={{ textAlign: 'left' }}
        >
          {label(id)}
        </button>
      ))}
    </nav>
  )
}

function label(id: string) {
  const map: Record<string, string> = {
    router: '라우터 관리',
    auth: '권한 관리',
    loading: '서비스 로딩 UX',
    errors: '예외/에러 로깅',
    state: '상태 관리',
    session: '세션/Props 개선',
    webview: '웹뷰 브릿지',
    docs: '문서화',
  }
  return map[id] ?? id
}