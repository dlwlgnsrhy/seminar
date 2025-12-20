/**
 * @파일설명
 * Dashboard 데이터 로딩을 담당하는 커스텀 훅입니다.
 *
 * @역할
 * - API 호출 추상화
 * - 로딩/에러 상태 관리
 * - DashboardPage에서 비즈니스 로직 분리
 *
 * @아키텍처원칙
 * - React Query 등 외부 상태관리 도입 시 교체 가능하도록 분리
 */

import { useEffect, useState } from 'react';
import type { DashboardData } from '../Types';

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // 실제 API로 교체 가능
        const mock: DashboardData = {
          cards: [
            { id: '1', title: 'Users', value: 120 },
            { id: '2', title: 'Sessions', value: 534 },
            { id: '3', title: 'Revenue', value: '$1,230' },
          ],
        };

        await new Promise((r) => setTimeout(r, 300)); // mock delay
        setData(mock);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}
