import axios from 'axios'
import { useAuthStore } from '@/shared/auth/store'
import { logFrontendError } from '@/shared/logging/errorLogger'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
})

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status
    const data = error?.response?.data
    try {
      await logFrontendError({
        at: 'axios.response',
        status,
        data,
        message: String(error),
        url: error?.config?.url,
        method: error?.config?.method
      })
    } catch {}
    return Promise.reject(error)
  }
)
