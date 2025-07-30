import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import RailNav from '@/components/RailNav'

const seminars = [
  { id:'s1', label:'Sem 1 — React+TS Core' },
  { id:'s2', label:'Sem 2 — Design System' },
  // 필요 시 추가
]

export default function AppShell() {
  const nav = useNavigate()

  return (
    <div className="app-shell">
      <header className="topbar hover-expand">
        <button className="brand-btn"
                onClick={() => nav('/s1')}>
          Nubiz Frontline
        </button>

        {/* hover 시에만 보이는 메뉴 */}
        <nav className="hover-menu">
          {seminars.map(s=>(
            <NavLink key={s.id}
                     to={`/${s.id}`}
                     className={({isActive})=> isActive?'sem-active':''}>
              {s.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content" style={{gridColumn:'1 / -1'}}>
        <Outlet/>
        <RailNav/>
      </main>
    </div>
  )
}