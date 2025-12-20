/**
 * @파일설명
 * boolean 상태를 토글하는 유틸리티 훅입니다.
 *
 * @역할
 * - UI ON/OFF, Modal, Drawer, Switch 등에서 재사용
 *
 * @아키텍처원칙
 * - Shared hooks → 상태 로직만 제공 (도메인 로직 금지)
 *
 * @커스터마이징가이드
 * - 초기값(defaultValue) 추가 가능
 */

import { useState, useCallback } from 'react';

export default function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle] as const;
}
