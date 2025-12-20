/**
 * @파일설명
 * 앱 버전 / 빌드 정보 / 환경 정보 등을 반환하는 훅입니다.
 *
 * @역할
 * - Vite 환경변수 기반 메타 정보 제공
 *
 * @커스터마이징가이드
 * - Git Commit Hash, Build Time 추가
 * - Region/Cluster 정보 표시
 */

export function useAppInfo() {
  return {
    version: process.env.REACT_APP_API_BASE_URL,
    env: process.env.MDOE,
  };
}
