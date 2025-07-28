import { useEffect, useRef } from 'react'

export default function TopProgress(){
  const bar = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const scroller = document.querySelector('.snap-container') as HTMLElement
    if (!scroller) return
    const onScroll = () => {
      const p = scroller.scrollTop / (scroller.scrollHeight - scroller.clientHeight || 1)
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [])
  return <div ref={bar} className="top-progress" />
}