/**
 * @파일설명
 * Dashboard Feature의 모듈 진입점(Public API)입니다.
 *
 * @역할
 * - Dashboard 페이지/컴포넌트/훅의 공식 export 집합
 * - 외부에서는 index.ts만 import하도록 강제
 *
 * @아키텍처원칙
 * - 다른 Feature가 내부 구조에 접근하는 것을 방지
 * - Angular Feature Module과 동일한 컨셉
 */
export { default as ProfileRoutes } from './ProfileRoutes';
