import { Outlet } from 'react-router-dom'
import TopProgress from '@/components/TopProgress'
import RailNav from '@/components/RailNav'

export default function AppShell() {
  return (
    <div className="app-shell">
      <header className="topbar" style={{ justifyContent: 'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <strong>Company Seminar</strong>
          <span className="badge">5개월 Roadmap</span>
        </div>
        {/* 탑 탭바 제거로 더 미니멀하게 */}
      </header>

      {/* 좌측 사이드네비 제거: 발표 몰입도 ↑ */}
      {/* <aside className="sidenav"><SideNav /></aside> */}

      <main className="content" style={{ gridColumn: '1 / -1' }}>
        <TopProgress />
        <Outlet />
        <RailNav />
      </main>
    </div>
  )
}