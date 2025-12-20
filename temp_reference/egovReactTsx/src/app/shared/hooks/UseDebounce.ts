/**
 * @파일설명
 * 입력값이 특정 시간 동안 변경되지 않을 때만 최종 값을 반환하는 debounce 훅입니다.
 *
 * @역할
 * - 검색 입력 디바운싱
 * - API 요청 과도 방지
 *
 * @아키텍처원칙
 * - 순수 기능 훅, 외부 서비스 의존 금지
 *
 * @커스터마이징가이드
 * - delay, maxWait 옵션 추가 가능
 */

import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
