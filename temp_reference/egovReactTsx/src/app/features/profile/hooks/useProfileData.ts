/**
 * @파일설명
 * Profile 데이터 로딩을 담당하는 커스텀 훅입니다.
 *
 * @역할
 * - API 호출 추상화
 * - 로딩/에러 상태 관리
 * - Profile에서 비즈니스 로직 분리
 *
 * @아키텍처 원칙
 * - React Query 등 외부 상태관리 도입 시 교체 가능하도록 분리
 */

import { useEffect, useState } from 'react';
import { ProfileData } from '../Types';

export function useProfileData() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        //실제 API 교체
        const mock: ProfileData = {
          cards: [
            { id: '1', title: 'Lee', value: 3 },
            { id: '2', title: 'Hong', value: 100000 },
            { id: '3', title: 'Jung', value: 'text' },
          ],
        };
        await new Promise((r) => setTimeout(r, 300)); //mock delay
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
