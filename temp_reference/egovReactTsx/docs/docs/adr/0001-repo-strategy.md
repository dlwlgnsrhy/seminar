# ADR 0001 — Repository Strategy (Polyrepo 유지)

**날짜:** 2025-10-13  
**상태:** Accepted  
**작성자:** @jihoon

---

## 배경

현재 각 프로젝트들은 분리된 레포지토리로 운영되고 있다.  
초기에는 프로젝트별 독립성이 높고, 팀별 실험과 배포 속도가 다르기 때문에 **polyrepo 구조**가 유지되어왔다.

---

## 결정

우선은 **polyrepo** 방식을 유지한다.  
단, 다음 조건이 충족되면 **monorepo** 전환을 고려한다:

- 각 레포 간 공용 패키지(`@company/baseline` 등)의 변경이 잦고, 버전 호환 관리가 어려워질 때
- CI/CD가 통합되어야 하는 시점
- 공용 스크립트(`egov-bridge-verify.sh`, eslint, prettier 등)가 중복 관리되는 부담이 커질 때

---

## 근거

- 초기에 레포를 합치면 빌드 체계 및 퍼블리시 루틴이 복잡해짐
- 현재 인력 규모에서는 독립 배포가 유리함
- CI 파이프라인이 안정화되면, Nx 혹은 Turborepo 기반 전환을 검토

---

## 영향

- 각 레포는 독립적으로 릴리스 태그를 관리한다 (`v1.0.0`, `v1.0.1`, …).
- 공통 정책은 `/docs/egov-bridge`를 기준으로 유지한다.
- 모노레포 전환 시, 기존 레포는 서브 디렉토리로 병합된다.

---

## 참고

- [ADR Template Guide (Michael Nygard)](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Nx Monorepo Docs](https://nx.dev)
