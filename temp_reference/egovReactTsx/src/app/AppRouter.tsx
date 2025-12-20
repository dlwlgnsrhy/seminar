import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Spinner from './shared/components/Spinner/Spinner';
import { BuggyTest } from './shared/components/BuggyTest';

import DashboardRoutes from '@features/dashboard/DashboardRoutes';
import ProfileRoutes from '@features/profile/ProfileRoutes';

export default function AppRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* redirect root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* feature modules */}
        {DashboardRoutes}
        {ProfileRoutes}

        {/* Test Error Boundary */}
        <Route path="/test-error" element={<BuggyTest />} />

        {/* 404 */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  );
}
