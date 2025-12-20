/**
 * @파일설명 :클라이언트에서 간단한 쿠키 읽기/삭제/설정 유틸
 *
 * @역할 : CSRF(XSRF-TOKEN) 읽기 등 클라이언트측 쿠키 접근을 편리하게 해줌
 *
 * @아키텍처원칙 : 쿠키 조작이 필요한 코드만 해당 모듈을 사용. HttpOnly 쿠키는 JS에서 읽을 수 없음
 *
 * @커스터마이징가이드 : 복잡한 도메인/경로/secure 설정이 필요하면 함수 인자/옵션을 확장.
 *
 */

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+'));
  return match ? decodeURIComponent(match.pop() as string) : null;
}

export function setCookie(name: string, value: string, days = 1, path = '/') {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
}

export function deleteCookie(name: string, path = '/') {
  if (typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}
