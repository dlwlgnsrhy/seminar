export async function logFrontendError(payload: Record<string, any>) {
  const endpoint = (import.meta.env.VITE_LOG_ENDPOINT || '/logs/js').toString()
  const body = { ts: new Date().toISOString(), ua: navigator.userAgent, ...payload }
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).catch(() => {})
}

export function installGlobalErrorHandlers() {
  window.addEventListener('error', (e) => {
    logFrontendError({ at: 'window.error', message: e.message, filename: (e as any).filename, lineno: (e as any).lineno })
  })
  window.addEventListener('unhandledrejection', (e) => {
    logFrontendError({ at: 'window.unhandledrejection', reason: String(e.reason) })
  })
}
