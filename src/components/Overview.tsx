// src/components/Overview.tsx
import Callout from '@/components/Callout'

type Props = {
  title: string
  bullets: string[]
  memo?: string
}

export default function Overview({ title, bullets, memo }: Props) {
  return (
    <div className="overview">
      {/* 헤더 */}
      <div className="ov-header">
        <div className="ov-eyebrow">Overview</div>
        <h2 className="ov-title">{title}</h2>
        {memo && <div className="ov-memo"><Callout type="info">{memo}</Callout></div>}
      </div>

      {/* 본문 2열 그리드 */}
      <div className="ov-grid">
        {/* 왼쪽: 핵심 포인트 체크리스트 */}
        <div className="ov-card ov-list">
          <div className="ov-card-head">핵심 포인트</div>
          <ul className="ov-checklist">
            {bullets.map((b, i) => (
              <li key={i} className="ov-check">
                <span className="ov-dot" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽: 투입 → 산출 → 기대효과 (요약 KPI) */}
        <div className="ov-card ov-stats">
          <div className="ov-card-head">목표 KPI</div>

          <div className="ov-stat-row">
            <div className="ov-stat">
              <div className="ov-stat-k">온보딩 TTV</div>
              <div className="ov-stat-v">30% ↓</div>
              <div className="ov-progress" aria-hidden><span style={{width:'65%'}} /></div>
            </div>
            <div className="ov-stat">
              <div className="ov-stat-k">협업 시간</div>
              <div className="ov-stat-v">20% ↓</div>
              <div className="ov-progress" aria-hidden><span style={{width:'45%'}} /></div>
            </div>
            <div className="ov-stat">
              <div className="ov-stat-k">장애 재발률</div>
              <div className="ov-stat-v">50% ↓</div>
              <div className="ov-progress" aria-hidden><span style={{width:'80%'}} /></div>
            </div>
          </div>

          <div className="ov-meta">
            <span className="ov-chip">Baseline 8축</span>
            <span className="ov-chip">파일럿 → 확장</span>
            <span className="ov-chip">월간 리포팅</span>
          </div>
        </div>
      </div>

      {/* 하단: 진행 로드맵 요약 바 */}
      <div className="ov-timeline" role="img" aria-label="파일럿에서 전사 확장까지 3단계 로드맵">
        <div className="ov-step">
          <div className="ov-step-dot" />
          <div className="ov-step-label">Phase 1 · 규칙/샘플/온보딩</div>
        </div>
        <div className="ov-step">
          <div className="ov-step-dot" />
          <div className="ov-step-label">Phase 2 · 파일럿 적용/피드백</div>
        </div>
        <div className="ov-step">
          <div className="ov-step-dot" />
          <div className="ov-step-label">Phase 3 · 전사 확장/KPI</div>
        </div>
        <div className="ov-bar" />
      </div>
    </div>
  )
}