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
    document.getElementById('problem')?.scrollIntoView({ behavior:'smooth' })
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
        <div className="intro-title">React → Re-act</div>
        <div className="intro-sub">Baseline으로 운영 리스크를 구조적으로 흡수</div>
        <div className="intro-cta">Press <b>Enter</b> or click to start ↓</div>
      </div>
    </div>
  )
}
