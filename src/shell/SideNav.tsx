import { useEffect, useState } from 'react'

const ids = ['router','auth','loading','errors','state','session','webview','docs']

export default function SideNav(){
  const [active, setActive] = useState<string>('router')

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('id')
          if (id) setActive(id)
        }
      }
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 })

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  return (
    <nav className="navgroup">
      {ids.map(id => (
        <a key={id} className={active===id ? 'active' : ''}
           href={`#${id}`}>{label(id)}</a>
      ))}
    </nav>
  )
}

function label(id:string){
  switch(id){
    case 'router': return '라우터 관리'
    case 'auth': return '권한 관리'
    case 'loading': return '서비스 로딩 UX'
    case 'errors': return '예외/에러 로깅'
    case 'state': return '상태 관리'
    case 'session': return '세션/Props 개선'
    case 'webview': return '웹뷰 브릿지'
    case 'docs': return '문서화'
    default: return id
  }
}
