// src/router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppShell  from '@/shell/AppShell'

import Sem1 from '@/sections/Sem1'
import Sem2 from '@/sections/Sem2'
// → 차후 Sem3, Sem4 … 추가

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,          // ~~ 공통 레이아웃
    children: [
      { index: true, element: <Navigate to="/s1" replace /> },

      { path: 's1', element: <Sem1 /> },
      { path: 's2', element: <Sem2 /> },

    ],
  },
])