import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/shared/auth/store'
import type { Role } from '@/shared/auth/store'

type GuardProps = PropsWithChildren<{ allow: Array<Role> }>

export default function Guard({ allow, children }: GuardProps){
  const role = useAuthStore(s => s.role)
  if (!allow.includes(role)) return <Navigate to="/s1" replace />
  return <>{children}</>
}
