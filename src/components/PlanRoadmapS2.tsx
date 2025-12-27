import React from "react"
import s from "./PlanRoadmapS2.module.scss"
import ChapterHeader from "./ChapterHeader"

export default function PlanRoadmapS2() {
    return (
        <section className={s.roadmapContainer} aria-labelledby="roadmap-title">
            <header className={s.header}>
                <h3 id="roadmap-title" className={s.title}>실무 기반 로드맵: 분석과 증명</h3>
                <p className={s.subtitle}>
                    표준화 조율 과정(계획 30h → <b>실제 50h</b>)과<br />
                    AI Agent를 통한 마이그레이션(계획 20h → <b>실제 5h</b>)의 기록
                </p>
            </header>

            <div className={s.grid}>
                {/* 왼쪽: 주요 분석 내용 (그래프 제거, 핵심 메시지 강조) */}
                <div className={s.mainMetric}>
                    <div className={s.analysisContent}>
                        <div className={s.analysisItem}>
                            <h4 className={s.analysisTitle}>표준화의 조율 과정 (Phase 0-1)</h4>
                            <p className={s.analysisDesc}>
                                예상보다 20시간이 더 소요되었습니다. 이는 단순 코딩이 아닌, 팀원 간의 컨벤션을 조율하고 공공기관 특유의 복잡한 요구사항을 설계에 반영하는 '정교한 합의'의 시간이었습니다.
                            </p>
                            <div className={s.miniImpact}>
                                <span className={s.impactBadge + ' ' + s.warn}>조율 비용 발생</span>
                                <span className={s.impactText}>하지만 이 과정이 탄탄한 토대가 되었습니다.</span>
                            </div>
                        </div>

                        <div className={s.analysisItem} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                            <h4 className={s.analysisTitle}>AI Agent 기반의 비약적 생산성 (Phase 2)</h4>
                            <p className={s.analysisDesc}>
                                척박한 수동 작업 환경을 AI Agent 도구를 통해 혁신했습니다. 20시간이 소요될 작업을 단 5시간 만에 마이그레이션하며, <b>75% 이상의 시간 절감</b> 효과를 증명했습니다.
                            </p>
                            <div className={s.miniImpact}>
                                <span className={s.impactBadge + ' ' + s.success}>AI 혁신 달성</span>
                                <span className={s.impactText}>개발 속도 향상: 1,200% ↑ 효과 정량화</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 현재 상태 및 팩트 보드 */}
                <div className={s.sideBoard}>
                    <div className={s.statusCard}>
                        <div className={s.statusValue}>D+12</div>
                        <div className={s.statusLabel}>운영 가동 시간</div>
                        <div className={s.pulseContainer}>
                            <div className={s.pulse}></div>
                            <span>성공적으로 통합됨</span>
                        </div>
                    </div>

                    <div className={s.quickFacts}>
                        <div className={s.factItem}>
                            <span className={s.factIcon}>✓</span>
                            <span>회귀 버그 제로 (무결성 유지)</span>
                        </div>
                        <div className={s.factItem}>
                            <span className={s.factIcon}>✓</span>
                            <span>100% 타입 안정성 확보</span>
                        </div>
                        <div className={s.factItem}>
                            <span className={s.factIcon}>✓</span>
                            <span>신규 온보딩 시간 90% 단축</span>
                        </div>
                    </div>
                </div>

                {/* 하단: 향후 진화 전략 */}
                <div className={s.visionSection}>
                    <h4 className={s.visionTitle}>향후 진화 전략</h4>
                    <div className={s.visionGrid}>
                        {[
                            { id: '01', t: '파일럿 확장', d: '실제 프로젝트 전방위 적용 및 지표 고도화' },
                            { id: '02', t: 'Baseline 재흡수', d: '현장의 문제를 Baseline 정석으로 재흡수' },
                            { id: '03', t: '팀 간 동기화', d: '디자인, 앱, BE, 운영 간의 프로세스 연결' },
                            { id: '04', t: '워크플로우 마스터', d: '공공기관 과업의 완벽한 정형화 가이드' }
                        ].map(v => (
                            <div key={v.id} className={s.visionCard}>
                                <span className={s.vNum}>{v.id}</span>
                                <div className={s.vContent}>
                                    <b>{v.t}</b>
                                    <p>{v.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
