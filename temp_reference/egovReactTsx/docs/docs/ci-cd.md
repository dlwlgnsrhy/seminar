# CI/CD 파이프라인 가이드

이 프로젝트는 **GitLab CI**를 사용하여 지속적 통합 및 배포(CI/CD)를 수행합니다.

## 1. 파이프라인 구조

파이프라인은 다음 4단계(Stage)로 구성됩니다:

1.  **Lint (`lint`)**: 코드 스타일 및 잠재적 오류 검사
    - 명령어: `npm run lint:check`
    - 실패 시 파이프라인 중단
2.  **Test (`test`)**: 단위 테스트 및 통합 테스트 수행
    - 명령어: `npm run test`
    - Vitest를 사용하여 테스트 실행 및 커버리지 측정
3.  **Build (`build`)**: 프로덕션용 빌드 생성
    - 명령어: `npm run build`
    - 결과물: `dist/` 폴더 (Artifact로 저장됨)
4.  **Deploy (`deploy`)**: (추후 적용) 빌드 결과물 배포

## 2. 설정 파일 (`.gitlab-ci.yml`)

프로젝트 루트의 `.gitlab-ci.yml` 파일에서 전체 파이프라인을 정의합니다. 현재 환경은 **Shell Runner**를 기준으로 설정되어 있어, Node.js를 수동으로 설정하는 스크립트가 포함되어 있습니다.

```yaml
# Docker 이미지 대신 Shell Runner 환경을 위한 수동 Node.js 설정
# image: node:20-alpine (사용 불가)

stages:
  - lint
  - test
  - build

# 모든 Job 전에 실행될 스크립트 (Node.js 수동 설치/설정)
default:
  before_script:
    - curl -fsSL https://nodejs.org/dist/v20.10.0/node-v20.10.0-linux-x64.tar.xz -o node.tar.xz
    - mkdir -p $HOME/node
    - tar -xf node.tar.xz -C $HOME/node --strip-components=1
    - export PATH=$HOME/node/bin:$PATH
    - node -v
    - npm -v

cache:
  paths:
    - node_modules/
```

## 3. 로컬에서 CI 스크립트 테스트

CI 환경과 동일한 스크립트를 로컬에서 실행하여 미리 검증할 수 있습니다.

- **Lint 검사**: `npm run lint:check`
- **테스트 실행**: `npm run test`
- **빌드 확인**: `npm run build`

## 4. 트러블슈팅

- **`npm ci` 에러**: `package-lock.json`과 `package.json`이 동기화되지 않았을 때 발생합니다. 로컬에서 `npm install`을 다시 실행하여 lock 파일을 갱신하고 커밋하세요.
- **Lint 에러**: 로컬에서 `npm run lint:check`를 실행하여 에러를 수정하세요.
