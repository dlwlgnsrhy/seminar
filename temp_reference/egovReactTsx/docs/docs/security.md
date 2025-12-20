# HttpOnly, CSRF, CSP 기본 정책

> 목적 : 토큰·쿠키·CORS·CSP 정책을 명확히 해서 보안 취약점(특히 XSS·CSRF)을 줄인다.

---

## 1. 인증 토큰 저장 정책

| 구분           | 권장 위치                      | 이유                  |
| -------------- | ------------------------------ | --------------------- |
| Access Token   | **HttpOnly 쿠키**              | XSS로부터 보호        |
| Refresh Token  | **Secure + HttpOnly 쿠키**     | 만료 시 자동 리프레시 |
| 임시 세션/상태 | localStorage (비민감 데이터만) | 예: UI theme, layout  |

> 절대 `access_token`을 localStorage/sessionStorage에 저장하지 말 것.

---

## 2. CSRF(Cross-Site Request Forgery) 대응

- **서버에서** `SameSite=Lax` 또는 `Strick` 옵션으로 쿠키 설정
- **프론트에서** axios 요청 시 `withCredentials: true` 명시
- 필요 시 서버에서 `X-CSRF-TOKEN` 헤더를 발급받아 axios 인스턴스에서 자동 첨부

---

## 3. CSP(Content Security Policy)

- 기본정책 :

```http
Content-Security-Policy: default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'
```

- inline script 사용 시 `'unsafe-inline'` 최소화 권장
- 외부 CDN은 `script-src https://cdn.jsdelivr.net`등 화이트리스트 명시

---

## 4. HTTPS / 쿠키 보안 옵션

| 옵션       | 값         | 설명              |
| ---------- | ---------- | ----------------- |
| `Secure`   | true       | HTTPS 전송만 허용 |
| `HttpOnly` | true       | JS 접근 차단      |
| `SameSite` | Lax/Strict | CSRF 방지         |

---

## 5. 예외 및 점검 포인트

- `localhost` 개발 시 `Secure` 옵션으로 인해 쿠키 저장 안될 수 있음.
  -> 개발 환경에서는 `Secure` 옵션을 off하고, staging 이상부터 on
- `CSR` SPA 환경에서 `withCredentials` 누락 시 401 반복 발생
- 서버-프론트 도메인이 다를 경우 CORS `credentials: true` 세트 필요

---
