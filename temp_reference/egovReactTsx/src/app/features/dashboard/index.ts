/**
 * @파일설명
 * Dashboard Feature의 public export 파일입니다.
 *
 * @역할
 * - 외부에서 필요한 모듈만 명시적으로 노출
 *
 * @아키텍처원칙
 * - Feature 내부 구현을 은닉 (pages/components/services 직접 노출 금지)
 * - routes만 외부 라우터 계층에서 사용하도록 제한
 */

export { default as DashboardRoutes } from './DashboardRoutes';
