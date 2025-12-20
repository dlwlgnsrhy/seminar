#!/usr/bin/env bash
# @파일설명: 배포/스테이징/로컬 환경에서 보안 헤더 존재 여부를 확인하는 간단 스크립트
# @역할: 주요 보안 헤더(CSP, HSTS, X-Content-Type-Options 등) 누락시 non-zero exit으로 CI 실패 유발
# @아키텍처원칙: CI에서 자동화로 헤더 누락을 검사하여 배포 전 보안 기준 확보
# @커스터마이징가이드: 필요시 검사 항목 추가 및 URL/PORT 파라미터화

set -e

URL=${1:-http://localhost:3000}
STATUS=0

echo "Checking security headers for $URL"

check_header() {
  local name=$1
  echo "Checking $name..."
  if curl -sI "$URL" | grep -i -q "$name"; then
    echo "  OK: $name found"
  else
    echo "  MISSING: $name"
    STATUS=1
  fi
}

check_header "Content-Security-Policy"
check_header "Strict-Transport-Security"
check_header "X-Content-Type-Options"
check_header "Referrer-Policy"

if [ $STATUS -ne 0 ]; then
  echo "One or more security headers are missing."
  exit 1
fi

echo "All basic security headers found."
exit 0
