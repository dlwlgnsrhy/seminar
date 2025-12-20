# Deployment Guide

이 문서는 애플리케이션을 빌드하고 배포하는 방법에 대해 설명합니다.

## 1. Build (빌드)

프로덕션 환경에 배포하기 위해 소스 코드를 최적화된 정적 파일로 변환합니다.

### 환경별 빌드 스크립트

`package.json`에 정의된 스크립트를 사용하여 환경별로 빌드할 수 있습니다.

- **Local/Development**: 개발 서버용 빌드 (소스맵 포함, 최적화 덜 됨)
  ```bash
  npm run build:dev
  ```
- **Staging/Production**: 운영 배포용 빌드 (압축, 최적화)

  ```bash
  npm run build:prod
  ```

- **결과물**: `build/` 폴더에 생성됩니다. (`vite.config.ts`의 `outDir` 설정 참조)
- **과정**:
  1. `tsc`: TypeScript 타입 검사를 수행합니다.
  2. `vite build`: Vite를 사용하여 코드를 번들링하고 최적화(Minification, Tree Shaking)합니다.

## 2. Preview (미리보기)

빌드된 결과물이 실제 환경에서 어떻게 작동하는지 로컬에서 확인합니다.

```bash
npm run preview
```

## 3. Docker 배포 (Future Guide)

현재는 GitLab CI를 통해 직접 빌드 및 배포하고 있으나, 추후 컨테이너 기반(Docker)으로 전환할 계획이 있다면 아래 가이드를 참고하세요.

### 전환 절차

1. **Dockerfile 작성**: 프로젝트 루트에 `Dockerfile` 생성 (아래 예시 참조).
2. **CI 파이프라인 수정**: `.gitlab-ci.yml`에서 `npm run build` 대신 `docker build` 및 `docker push` 단계 추가.
3. **배포 환경 수정**: 서버에서 Docker 이미지를 pull 받아 실행하도록 변경 (Kubernetes, ECS, 또는 Docker Compose 사용).

### Dockerfile 예시 (Nginx 기반)

```dockerfile
# 1. Build Stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:prod

# 2. Production Stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Nginx 설정 파일이 있다면 복사
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 4. CI/CD 파이프라인

GitLab CI, GitHub Actions 등을 사용하여 자동화된 배포를 구성할 수 있습니다.

### 주요 단계

1. **Install**: 의존성 설치 (`npm ci`)
2. **Lint & Test**: 코드 품질 검사 및 테스트 (`npm run lint:check`, `npm run test`)
3. **Build**: 프로덕션 빌드 (`npm run build`)
4. **Deploy**: 빌드된 아티팩트를 서버나 스토리지(S3 등)로 전송

## 5. 환경 변수 (.env)

배포 환경에 따라 다른 환경 변수를 설정해야 합니다.

- `.env.development`: 개발 환경
- `.env.production`: 프로덕션 환경

**주의**: API Key 등 민감한 정보는 저장소에 커밋하지 말고, CI/CD 파이프라인의 Secret 변수로 관리하세요.
