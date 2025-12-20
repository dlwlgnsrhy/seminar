/**
 * @파일설명
 * 전역 AuthContext 사용을 간소화하는 인증 관련 커스텀 훅입니다.
 *
 * @역할
 * - 로그인/로그아웃 처리
 * - 사용자 정보/인증 상태 제공
 *
 * @커스터마이징가이드
 * - 자동 로그인/세션 복구 기능 추가
 * - 권한(Role) 기반 UI 제어 기능 확장
 * - 로그인 시 토큰 외 추가 데이터 처리 (조직, 권한그룹 등)
 */

import { useAuthContext } from '@app/core/contexts/AuthContext';

export function useAuth() {
  const { auth, setAuth } = useAuthContext();

  const login = (user: any) => {
    setAuth({ user: null, isAuthenticated: false });
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
  };

  return { auth, login, logout };
}
