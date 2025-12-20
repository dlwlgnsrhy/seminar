/**
 * @파일설명
 * Dashboard 카드 UI 컴포넌트입니다.
 *
 * @역할
 * - 단일 카드 UI 렌더링
 *
 * @아키텍처원칙
 * - UI 전용 컴포넌트로 비즈니스 로직 포함 금지
 */

import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
}

export function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: '16px',
        marginBottom: '12px',
        background: '#fafafa',
      }}
    >
      <h3 style={{ marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
}
