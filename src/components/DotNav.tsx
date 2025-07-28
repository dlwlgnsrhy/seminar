import { useEffect, useState } from 'react'

export default function DotNav() {
  const [ids, setIds] = useState<string[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const secs = Array.from(document.querySelectorAll('.snap-section[id]')) as HTMLElement[]
    setIds(secs.map(s => s.id))
    const obs = new IntersectionObserver((ents)=>{
      const vis = ents.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0]
      if (vis?.target) setActive((vis.target as HTMLElement).id)
    }, { 
        rootMargin: '-40% 0 -40% 0px',
        threshold: [0.25, 0.5, 0.75] 
    })
    secs.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const go = (id:string) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })

  return (
    <div className="dotnav" aria-label="Jump to section">
      {ids.map(id => (
        <button key={id} aria-label={id} className={active===id ? 'active' : ''} onClick={()=>go(id)} />
      ))}
    </div>
  )
}