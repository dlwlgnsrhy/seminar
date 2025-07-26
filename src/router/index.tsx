import { createHashRouter, Navigate } from 'react-router-dom'
import AppShell from '@/shell/AppShell'
import SemOverview from '@/sections/SemOverview'
import Sem1 from '@/sections/Sem1'
import Sem2 from '@/sections/Sem2'
import Sem3 from '@/sections/Sem3'
import Sem4 from '@/sections/Sem4'
import Sem5 from '@/sections/Sem5'

export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/s1" replace /> },
      { path: 's1', element: <Sem1 /> },
      { path: 's2', element: <Sem2 /> },
      { path: 's3', element: <Sem3 /> },
      { path: 's4', element: <Sem4 /> },
      { path: 's5', element: <Sem5 /> },
      { path: 'overview', element: <SemOverview /> }
    ]
  }
])