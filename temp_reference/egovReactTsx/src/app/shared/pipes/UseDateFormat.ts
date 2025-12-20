/**
 * @파일설명
 * Angular의 Pipe 개념을 React Hook 형태로 제공하는 날짜 포매터입니다.
 *
 * @역할
 * - 날짜 문자열을 특정 포맷('YYYY-MM-DD')으로 변환
 *
 * @아키텍처원칙
 * - React Hook으로 UI에서 바로 변환 가능하도록 제공
 * - 내부 로직은 shared/utils/date.ts 를 호출해야 함
 *
 * @커스터마이징가이드
 * - 다양한 포맷 preset 추가 가능
 */

import { toKST } from '../utils';

export default function useDateFormat() {
  const format = (date: string | Date) => {
    const d = toKST(date);
    return d.toISOString().replace('T', ' ').substring(0, 19);
  };

  return { format };
}
