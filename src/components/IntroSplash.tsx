import { useEffect, useState } from 'react'

export default function IntroSplash(){
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onceKey = 'introShown'
    if (!sessionStorage.getItem(onceKey)) {
      setShow(true)
      sessionStorage.setItem(onceKey, '1')
    }
  }, [])

  const close = () => {
    setShow(false)
    // 첫 섹션으로 부드럽게 이동
    document.getElementById('intro')?.scrollIntoView({ behavior:'smooth' })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['Enter',' ','Spacebar','ArrowDown'].includes(e.key)) close()
    }
    if (show) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show])

  if (!show) return null
  return (
    <div className="intro-backdrop" onClick={close} role="dialog" aria-modal="true">
      <div className="intro-card">
        <div className="intro-title">Nubiz Seminar</div>
        <div className="intro-sub">React 표준화 구축으로 업무 효율·품질·가치를 동시에 향상</div>
        <div className="intro-cta">Press <b>Enter</b> or click to start ↓</div>
      </div>
    </div>
  )
}