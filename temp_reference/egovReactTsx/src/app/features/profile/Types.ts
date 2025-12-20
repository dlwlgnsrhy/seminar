/**
 * @파일설명
 * Profile Feature에서 사용하는 데이터 타입 정의 파일입니다.
 *
 * @역할
 * - API / Hook / Component 간 공유 타입 제공
 *
 * @아키텍처원칙
 * - Feature 내부에서만 사용되는 타입은 Feature 폴더에 위치
 * - 공용 타입은 shared/types 에 배치
 */
export interface ProfileDataItem {
  id: string;
  title: string;
  value: number | string;
}

export interface ProfileData {
  cards: ProfileDataItem[];
}
