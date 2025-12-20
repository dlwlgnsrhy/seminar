/**
 * @파일설명
 * Profile 카드 UI 컴포넌트입니다.
 *
 * @역할
 * - 단일 카드 UI 렌더링
 *
 * @아키텍처원칙
 * - UI 전용 컴포넌트로 비즈니스 로직 포함 금지
 */

interface ProfileCardProps {
  title: string;
  value: string | number;
}

export function ProfileCard({ title, value }: ProfileCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
