import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type OverlayProps = {
  children: React.ReactNode
  onClose: () => void
  titleId?: string
}

export default function Overlay({ children, onClose, titleId }: OverlayProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prevFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // 이전 포커스 보관 + 카드 내부 첫 포커스로 이동
    prevFocus.current = document.activeElement as HTMLElement
    const focusable = cardRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    focusable?.focus()

    // ESC 닫기 + Tab 포커스 트랩
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const nodes = cardRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!nodes || nodes.length === 0) return
        const list = Array.from(nodes).filter(n => !n.hasAttribute('disabled'))
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          last.focus(); e.preventDefault()
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus(); e.preventDefault()
        }
      }
    }
    document.addEventListener('keydown', onKey)

    // 바디 스크롤 잠금
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus.current?.focus()
    }
  }, [onClose])

  return createPortal(
    <div className="ov-backdrop" role="presentation" onClick={onClose}>
      <div
        className="ov-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={cardRef}
        onClick={e => e.stopPropagation()}
      >
        {children}
        <div className="ov-actions">
          <button className="ov-close" onClick={onClose} autoFocus>닫기 ✕</button>
        </div>
      </div>
    </div>,
    document.body
  )
}
