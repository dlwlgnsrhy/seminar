/// <reference types="vite/client" />

// (선택) 우리가 쓰는 커스텀 환경변수 타입만 보강
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_LOG_ENDPOINT?: string
}
