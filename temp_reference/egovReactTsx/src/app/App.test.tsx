import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

/**
 * App Smoke Test
 * 애플리케이션이 정상적으로 렌더링되고, 초기 라우팅이 작동하는지 확인합니다.
 */
describe('App Smoke Test', () => {
  it('renders dashboard by default', async () => {
    render(<App />);

    // 1. 초기 로딩 상태 확인 (Suspense fallback)
    // Spinner가 있거나, DashboardPage의 "Loading Dashboard..."가 보일 수 있음
    // 여기서는 Spinner가 Suspense fallback으로 지정되어 있음

    // 2. 대시보드 페이지 진입 확인
    // 비동기 로딩(lazy)을 기다림 (최대 5초)
    expect(await screen.findByText(/Dashboard/i, {}, { timeout: 5000 })).toBeInTheDocument();
  });
});
