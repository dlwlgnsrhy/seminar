/**
 * @파일설명
 * 인증 관련 API 호출을 담당하는 서비스 계층 모듈입니다.
 *
 * @역할
 * - login/logout API 호출
 * - 토큰 및 사용자 정보 관리
 * - 세션 갱신 / 세션 검증
 *
 * @커스터마이징가이드
 * - MFA(OTP, Email 인증) 추가
 * - 회원가입 / 비밀번호 재설정 API 연동
 * - social login provider 통합
 */

import http from '@core/api/HttpClient';

export async function loginService(payload: { id: string; pw: string }) {
  const res = await http.post('auth/login', payload);
  return res.data;
}

export async function logoutService() {
  return http.post('/auth/logout');
}

export async function fetchMyInfo() {
  const res = await http.get('/auth/me');
  return res.data;
}
