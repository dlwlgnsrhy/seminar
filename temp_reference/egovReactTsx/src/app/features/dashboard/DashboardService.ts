/**
 * @파일설명
 * Dashboard Feature의 데이터 요청(Service Layer) 모듈입니다.
 *
 * @역할
 * - 서버 API 호출
 * - Response 데이터 형 변환/전처리
 * - hooks에서 쉽게 사용하도록 추상화된 함수 제공
 *
 * @아키텍처원칙
 * - Core API client를 사용하여 통신 (axios instance 등)
 * - UI/컴포넌트 계층에 절대 의존 금지
 * - Feature 의 로직 분리 (비즈니스 규칙을 서비스 계층에 배치)
 *
 * @커스터마이징가이드
 * - 실제 API 연동 시 endpoint만 교체
 * - Mock 데이터 → 실서비스로 쉽게 교체 가능
 */

export async function getDashboardSummary() {
  // TODO: 실제 API 연결 시 Core axios client 교체
  await new Promise((r) => setTimeout(r, 300)); // mock latency

  return {
    cards: [
      { id: 1, title: 'Users', value: 120 },
      { id: 2, title: 'Views', value: 3510 },
      { id: 3, title: 'Revenue', value: '$12,340' },
    ],
  };
}
