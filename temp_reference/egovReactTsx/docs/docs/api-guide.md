# 표준 응답 모델 + 예외 규격 (RFC 7807, ISO-8601)

## 1. 기본 철학

> API 응답은 **"사람이 아닌 시스템이 읽는 문서"** 여야 합니다.
> 즉, 프론트는 **일관된 계약(Contract)**만 믿고 동작하도록 만드는 것이 목표입니다.

---

## 2. 공통 응답 모델 (성공 시)

```json
{
  "success": true,
  "code": "OK",
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": {
    "id": 1,
    "name": "홍길동"
  },
  "timestamp": "2025-11-04T09:00:00Z"
}
```

| 필드        | 타입    | 설명                                         |
| ----------- | ------- | -------------------------------------------- |
| `success`   | boolean | 요청 성공 여부                               |
| `code`      | string  | 응답 코드(`OK`, `CREATED`, `NO_CONTENT`,...) |
| `message`   | string  | 사용자 친화적 메시지                         |
| `data`      | object  | 실제 응답 데이터                             |
| `timestamp` | string  | ISO-8601 형식 (UTC 기준)                     |

---

## 3. 에러 응답 (RFC 7897 - Problem Details for HTTP APIs 기반)

```json
{
  "success": false,
  "code": "UNAUTHORIZED",
  "message": "인증이 필요합니다.",
  "detail": "JWT 토큰이 누락되었습니다.",
  "instance": "/api/v1/users/me",
  "timestamp": "2025-11-04T09:00:00Z"
}
```

| 필드       | 설명                                                                               |
| ---------- | ---------------------------------------------------------------------------------- |
| `code`     | HTTP 의미 기반 비즈니스 코드 (`BAD_REQUEST`, `UNAUTHORIZED`, `INTERNAL_ERROR`,...) |
| `message`  | 사용자 메시지 (UX 노출용)                                                          |
| `detail`   | 개발자용 상세 디버깅 메시지                                                        |
| `instance` | 요청 URL(RFC 7807 표준 필드 )                                                      |

> **참고** :
>
> - "시간은 모두 `UTC ISO-8601`로 유지해야 타임존 이슈를 방지합니다."
> - "응답 헤더에 `Content-Type: application/json; charset=utf-8`을 반드시 지정."

---

## 4. 응답 예외 분류 가이드

| 분류       | 예시                     | 코드             | 비고 |
| ---------- | ------------------------ | ---------------- | ---- |
| Validation | 누락된 필드, 잘못된 입력 | `BAD_REQUEST`    | 400  |
| Auth       | JWT 만료, 미로그인       | `UNAUTHORIZED`   | 401  |
| Forbidden  | 권한 부족                | `FORBIDDEN`      | 403  |
| NotFound   | 리소스 없음              | `NOT_FOUND`      | 404  |
| Server     | 내부 오류                | `INTERNAL_ERROR` | 500  |

---

## 5. API 버전 관리 원칙

- URL 버전 명시 : `/api/v1/users`
- breaking change 발생 시 `/api/v2` 분리
- 하위 호환 필요 시 `Accept: application/vnd.app.v1+json` 헤더 병행

---

## 6. 예외 및 운영 팁

- **절대 "message"에 내부 오류 스택 노출 금지**
- `errorMap.ts`에서 UX 메시지로 변환하여 사용자에게 표시
- **서버 변경 시 문서 자동 동기화** -> Swagger / Docusaurus 동시 연결 가능
