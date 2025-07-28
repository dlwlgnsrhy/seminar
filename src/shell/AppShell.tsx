import { Outlet, NavLink } from 'react-router-dom'
import SideNav from './SideNav'
import DotNav from '@/components/DotNav'
import TopProgress from '@/components/TopProgress'

export default function AppShell() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <strong>Company Seminar</strong>
          <span className="badge">5개월 Roadmap</span>
        </div>
        <nav className="tabbar" aria-label="Top navigation">
          {['s1', 's2', 's3', 's4', 's5', 'overview'].map((key) => (
            <NavLink
              key={key}
              to={`/${key}`}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {key.toUpperCase()}
            </NavLink>
          ))}
        </nav>
      </header>

      <aside className="sidenav">
        <SideNav />
      </aside>

      <main className="content">
        {/* 상단 진행바 & 우측 도트 네비 */}
        <TopProgress />
        <Outlet />
        <DotNav />
      </main>
    </div>
  )
}