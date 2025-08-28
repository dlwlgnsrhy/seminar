import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import RailNav from '@/components/RailNav'

const seminars = [
  { id:'s1', label:'Sem 1 — React+TS Core' },
  { id:'s2', label:'Sem 2 — Design System' },
  { id:'s3', label:'Sem 3 — sample ui' },
  // 필요 시 추가
]

export default function AppShell() {
  const nav = useNavigate()

  return (
    <div className="app-shell">
      {/*  
      
      */}

      <main className="content" style={{gridColumn:'1 / -1'}}>
        <Outlet/>
        <RailNav/>
      </main>
    </div>
  )
}