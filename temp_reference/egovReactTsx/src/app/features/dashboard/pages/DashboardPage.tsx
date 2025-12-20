/**
 * @파일설명
 * Dashboard Feature의 루트 페이지 컴포넌트입니다.
 *
 * @역할
 * - Feature 내 서비스 호출
 * - 상태/로딩/에러 핸들링
 * - 하위 UI 컴포넌트 조합
 *
 * @아키텍처원칙
 * - Feature 내부 비즈니스 로직을 통합하는 Shell Component
 * - Shared/Core 계층만 참조 가능 (다른 Feature 의존 금지)
 *
 * @커스터마이징가이드
 * - Suspense + ErrorBoundary로 안정성 강화 가능
 */

import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { DashboardCard } from '../components/DashboardCard';
import { useAppStore } from '@core/store/UseAppStore';

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardData();
  // Zustand Demo
  const { theme, toggleTheme } = useAppStore();

  if (isLoading) return <p>Loading Dashboard...</p>;
  if (error) return <p>Failed to load: {error.message}</p>;

  return (
    <main
      style={{
        padding: '20px',
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <button onClick={toggleTheme}>Current Theme: {theme.toUpperCase()}</button>
      </div>

      <section style={{ marginTop: '20px' }}>
        {data?.cards?.map((item) => (
          <DashboardCard key={item.id} title={item.title} value={item.value} />
        ))}
      </section>
    </main>
  );
}
