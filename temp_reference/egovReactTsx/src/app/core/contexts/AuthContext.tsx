/**
 * @파일설명
 * 애플리케이션 전역의 인증 상태를 관리하는 Context입니다.
 *
 * @역할
 * - 로그인 상태, 사용자 정보 관리
 * - 인증 관련 글로벌 상태 제공
 *
 * @커스터마이징가이드
 * - 권한(Role) 기반 라우팅 기능 추가
 * - localStorage/sessionStorage 기반 세션 유지
 */

import { createContext, useContext, useState } from 'react';

interface AuthState {
  user: null | { id: number; name: string };
  isAuthenticated: boolean;
}

const AuthContext = createContext<{
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
} | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthProvider missing');
  return ctx;
};
