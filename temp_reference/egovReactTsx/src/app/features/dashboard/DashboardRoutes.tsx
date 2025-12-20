/**
 * @파일설명
 * Dashboard Feature의 라우트 정의 파일입니다.
 *
 * @역할
 * - Feature 진입 라우트 설정
 * - 코드 스플리팅 적용 가능
 *
 * @아키텍처원칙
 * - 라우팅은 Feature 단위에서 독립 관리
 * - 상위 router index.ts 에서 import 하여 통합
 *
 * @커스터마이징가이드
 * - Suspense / lazy 로 lazy-loading 가능
 */

import React from 'react';
import { Route } from 'react-router-dom';

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));

const DashboardRoutes = <Route path="/dashboard" element={<DashboardPage />} />;

export default DashboardRoutes;
