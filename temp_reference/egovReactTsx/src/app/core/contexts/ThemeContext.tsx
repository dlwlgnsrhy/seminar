/**
 * @파일설명
 * 앱의 전역 테마(light/dark)를 관리하는 Context입니다.
 *
 * @역할
 * - 테마 값 제공 및 toggle 기능
 *
 * @커스터마이징가이드
 * - OS 테마 자동 동기화
 * - 유저 설정 저장(localStorage)
 */

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('ThemeProvider missing');
  return ctx;
};
