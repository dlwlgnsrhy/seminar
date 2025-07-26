type Payload = any

export function emit(event: string, payload?: Payload){
  const rn = (window as any).ReactNativeWebView
  if (rn?.postMessage) { rn.postMessage(JSON.stringify({ event, payload })); return }
  const fi = (window as any).flutter_inappwebview
  if (fi?.callHandler) { fi.callHandler('AppBridge', event, payload ?? null); return }
  const ab = (window as any).AppBridge
  if (ab?.postMessage) { ab.postMessage(JSON.stringify({ event, payload })); return }
  window.postMessage({ event, payload }, window.origin)
}

export function onMessage(handler: (msg: {event:string, payload:any}) => void){
  function listener(e: MessageEvent){
    const data = e.data
    if (typeof data === 'string') {
      try { const parsed = JSON.parse(data); if (parsed?.event) handler(parsed) } catch {}
    } else if (data?.event) { handler(data) }
  }
  window.addEventListener('message', listener)
  return () => window.removeEventListener('message', listener)
}
