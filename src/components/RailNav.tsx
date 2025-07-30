import { useEffect, useState } from 'react'

type Sec = { id: string; label: string; band: string; }

export default function RailNav() {
  const [sections, setSections] = useState<Sec[]>([])
  const [active, setActive] = useState<string>('')

  /** 👇  섹션 DOM 을 다시 스캔해서 state 업데이트 */
  const refresh = () => {
    const els = Array.from(document.querySelectorAll('.snap-section[id]')) as HTMLElement[]
    setSections(els.map(el => ({ 
        id: el.id, 
        label: getLabel(el.id),
        band: el.dataset.band ?? 'body',
     })))
  }

  useEffect(() => {
    refresh()                                         // 첫 스캔
    /** 💡  Outlet 안이 바뀔 때마다 다시 스캔하도록 MutationObserver */
    const content = document.querySelector('.content')
    const mo = new MutationObserver(refresh)
    if (content) mo.observe(content, { childList: true, subtree: true })

    const root = document.querySelector('.snap-container') as HTMLElement | null
    const io = new IntersectionObserver(
      ents => {
        const vis = ents.filter(e => e.isIntersecting)
                        .sort((a,b)=>(b.intersectionRatio||0)-(a.intersectionRatio||0))[0]
                        if (vis?.target){
                            const el = vis.target as HTMLElement
                            setActive(el.id)
                          }
      },
      { root, rootMargin: '0px 0px -35% 0px', threshold: [.25,.5,.75] }
    )

    /** 새로 스캔될 때마다 observe 연결 */
    return () => { io.disconnect(); mo.disconnect() }
  }, [])

  /* observe 연결을 sections 가 바뀔 때마다 갱신 */
  useEffect(() => {
    const root = document.querySelector('.snap-container') as HTMLElement | null
    const io = new IntersectionObserver(
      ents => {
        const vis = ents.filter(e=>e.isIntersecting)
                        .sort((a,b)=>(b.intersectionRatio||0)-(a.intersectionRatio||0))[0]
                        if (vis?.target) {
                            const el = vis.target as HTMLElement
                            setActive(el.id)
                            document.body.dataset.band = el.dataset.band ?? 'body'   // ★ TopBar 색 동기화
                          }
                        },
      { root, rootMargin:'0px 0px -35% 0px', threshold:[.25,.5,.75] }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [sections])

  const go = (id:string) =>
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })

  return(
    <aside className="railnav" aria-label="section navigation">
      {sections.map(s=>(
        <button key={s.id} onClick={()=>go(s.id)}
                className={`rail-btn band-${s.band} ${active===s.id?'active':''}`}>
          <span className="rail-dot"></span>
          <span className="rail-label">{s.label}</span>
        </button>
      ))}
    </aside>
  )
}

function getLabel(id:string){
  const map:Record<string,string>={
    pain1:      '현실 진단 – 왜 표준화가 안됐나?',
    docproc: '사람이 아닌 문서가 프로세스',
    pain2: '왜 표준화가 시급한가?',
    'intro-react':'Why React',
    'intro-scss' :'Why SCSS',
    'intro-roadmap':'로드맵',
    whyreact:  'React Feature',
    codestyle: '코드 스타일',
    router:    '라우터',
    auth:      '권한',
    loading:   '로딩 UX',
    errors:    '에러 로깅',
    state:     '상태',
    webview:   '웹뷰',
    docs:      '문서화',
    summary:   '결론'
  }
  return map[id] ?? id
}