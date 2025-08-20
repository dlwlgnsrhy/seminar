import { useEffect, useState } from 'react'
import SpinnerOverlay from '@/shared/ui/SpinnerOverlay'
import { installGlobalErrorHandlers } from '@/shared/logging/errorLogger'
import CompareCard from '@/components/CompareCard'
import ADR from '@/components/ADR'

export default function SemScreen() {
  useEffect(() => { installGlobalErrorHandlers() }, [])
  const [sel, setSel] = useState<string>('A')
  return (
    <div>
    </div>
  )
}

function TopicSection({ id, title, children }: any) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      <p style={{ fontSize: 14, opacity: 0.85, marginTop: -6 }}>#{id}</p>
      <div style={{ marginTop: 12 }}>{children}</div>
    </section>
  )
}
