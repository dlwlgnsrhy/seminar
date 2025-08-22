import React, { useMemo, useState } from "react";

/**
 * IntroVariants.tsx — Nubiz Seminar 전역 CSS 토큰/레이아웃에 맞춘 단일 파일
 * - Tailwind 미사용. 전역 CSS 변수(--text, --muted, --primary, --accent)를 100% 활용
 * - .section-panel(글래스 카드) 안에 자연스럽게 들어가도록 "서브 카드" 스타일(sx.box)을 통일
 * - 기존 컴포넌트 API(ExecutiveOneLiner, WhyNowTimeline, …) 유지
 * - default export: IntroVariantsGallery (기존 파일과 동일 이름)
 */

/* --------------------------- 공통 스타일 토큰 --------------------------- */

const tone = {
  text: "var(--text)",
  muted: "var(--muted)",
  primary: "var(--primary)",
  accent: "var(--accent)",
  panelBg: "rgba(255,255,255,.04)",
  panelBorder: "1px solid rgba(255,255,255,.12)",
  subBg: "rgba(255,255,255,.03)",
  subBorder: "1px solid rgba(255,255,255,.10)",
  shadow: "0 18px 50px rgba(0,0,0,.35)",
} as const;

const sx = {
  // .section-panel 안에서 쓰는 서브 카드
  box: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    background: tone.subBg,
    border: tone.subBorder,
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
  } as React.CSSProperties,
  title: {
    margin: 0,
    marginBottom: 6,
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: ".2px",
    color: tone.text,
  } as React.CSSProperties,
  subtitle: {
    margin: 0,
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 1.6,
    color: tone.muted,
  } as React.CSSProperties,
  h1: {
    margin: 0,
    marginBottom: 10,
    fontSize: 34,
    fontWeight: 900,
    letterSpacing: "-.2px",
    backgroundImage: `linear-gradient(90deg, ${tone.primary}, ${tone.accent})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  } as React.CSSProperties,
  p: {
    margin: 0,
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 1.7,
    color: tone.muted,
  } as React.CSSProperties,
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  } as React.CSSProperties,
  row3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12,
  } as React.CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
    color: tone.text,
  } as React.CSSProperties,
  th: {
    textAlign: "left",
    padding: 12,
    borderBottom: "1px solid rgba(255,255,255,.12)",
    opacity: .9,
  } as React.CSSProperties,
  td: {
    padding: 12,
    borderBottom: "1px solid rgba(255,255,255,.08)",
  } as React.CSSProperties,
  // 컨트롤(셀렉터)용 얇은 글래스
  ctrlBar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 12,
    padding: "10px 12px",
  } as React.CSSProperties,
  select: {
    appearance: "none",
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.16)",
    color: tone.text,
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 13,
    outline: "none",
  } as React.CSSProperties,
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 12px",
    borderRadius: 9999,
    border: "1px solid rgba(255,255,255,.18)",
    background: "rgba(255,255,255,.06)",
    fontSize: 13,
    color: tone.text,
  } as React.CSSProperties,
  dot: (color: string) =>
    ({
      width: 8,
      height: 8,
      borderRadius: 999,
      background: color,
      boxShadow: `0 0 10px ${color}55`,
    }) as React.CSSProperties,
  chip: (bg: string, bd: string, fg: string) =>
    ({
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 10px",
      borderRadius: 10,
      background: bg,
      border: `1px solid ${bd}`,
      color: fg,
      fontSize: 13,
      whiteSpace: "nowrap",
    }) as React.CSSProperties,
  callout: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.16)",
    background: "rgba(255,255,255,.07)",
    fontSize: 14,
    color: tone.text,
  } as React.CSSProperties,
};

/* --------------------------- 공통 UI --------------------------- */

type BadgeProps = { label: string };
const Badge: React.FC<BadgeProps> = ({ label }) => (
  <span style={sx.badge}>
    <span style={sx.dot(tone.primary)} />
    {label}
  </span>
);

const SectionCard: React.FC<
  React.PropsWithChildren<{ title?: string; subtitle?: string; style?: React.CSSProperties }>
> = ({ title, subtitle, style, children }) => (
  <section style={{ ...sx.box, ...style }}>
    {title && <h2 style={sx.title}>{title}</h2>}
    {subtitle && <p style={sx.subtitle}>{subtitle}</p>}
    {children}
  </section>
);

// 아이콘(이모지)
const Icon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ marginRight: 8, display: "inline-block" }}>{children}</span>
);

/* --------------------------- 1) Executive One-liner --------------------------- */

export const ExecutiveOneLiner: React.FC<{
  title?: string;
  subtitle?: string;
  keywords?: string[];
}> = ({
  title = "React 프로젝트 표준화로 운영 리스크를 흡수합니다.",
  subtitle = "잦은 교체·경력 부재·제각각 구조 → Baseline으로 일원화",
  keywords = ["문제 파악", "체계 구축", "안정 운영"],
}) => (
  <SectionCard>
    <h1 style={sx.h1}>{title}</h1>
    <p style={sx.p}>{subtitle}</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {keywords.map((k) => (
        <Badge key={k} label={k} />
      ))}
    </div>
  </SectionCard>
);

/* --------------------------- 2) Why Now? Timeline --------------------------- */

type TimelineEvent = { date: string; label: string };
export const WhyNowTimeline: React.FC<{ events?: TimelineEvent[]; conclusion?: string }> = ({
  events = [
    { date: "M-9", label: "프론트 교체 빈도 증가" },
    { date: "M-6", label: "서브패스/배포 경로 상이" },
    { date: "M-3", label: "지도/차트 SDK 혼재" },
    { date: "M-1", label: "운영 중 잠재 문제 다수 노출" },
  ],
  conclusion = "지금 표준화하지 않으면, 교체/증원 시마다 비용이 재발생합니다.",
}) => (
  <SectionCard title="왜 지금인가 (Why Now?)">
    <ol
      style={{
        position: "relative",
        marginLeft: 16,
        paddingLeft: 20,
        borderLeft: "1px solid rgba(255,255,255,.18)",
      }}
    >
      {events.map((e, idx) => (
        <li key={idx} style={{ marginBottom: 16, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: -9,
              top: 4,
              width: 12,
              height: 12,
              borderRadius: 999,
              background: `linear-gradient(135deg, ${tone.primary}, ${tone.accent})`,
              boxShadow: "0 0 12px rgba(124,77,255,.45)",
              border: "2px solid rgba(255,255,255,.85)",
            }}
          />
          <div style={{ fontSize: 11, letterSpacing: 1, opacity: .7 }}>{e.date}</div>
          <div style={{ marginTop: 2, fontSize: 16, fontWeight: 700 }}>{e.label}</div>
        </li>
      ))}
    </ol>
    <div style={sx.callout}>
      <strong style={{ marginRight: 6 }}>결론</strong>
      {conclusion}
    </div>
  </SectionCard>
);

/* --------------------------- 3) 문제 히트맵 --------------------------- */

type HeatCell = "good" | "warn" | "bad";
type HeatmapRow = { project: string; cells: Record<string, HeatCell> };

const chipStyleByCell = (cell: HeatCell) => {
  if (cell === "good") return sx.chip("rgba(88,214,141,.12)", "#58d68d66", "#9cf2c6");
  if (cell === "warn") return sx.chip("rgba(245,194,66,.12)", "#f5c24266", "#ffe09a");
  return sx.chip("rgba(255,107,107,.12)", "#ff6b6b66", "#ffb0b0");
};

export const ProblemHeatmap: React.FC<{
  categories?: string[];
  rows?: HeatmapRow[];
}> = ({
  categories = ["구조", "라우팅", "성능", "운영", "문서"],
  rows = [
    { project: "do반장", cells: { 구조: "warn", 라우팅: "bad", 성능: "warn", 운영: "warn", 문서: "bad" } },
    { project: "에너지전환마을", cells: { 구조: "bad", 라우팅: "warn", 성능: "warn", 운영: "bad", 문서: "bad" } },
    { project: "새빛돌봄", cells: { 구조: "warn", 라우팅: "warn", 성능: "warn", 운영: "warn", 문서: "warn" } },
    { project: "동구라미온", cells: { 구조: "warn", 라우팅: "warn", 성능: "bad", 운영: "warn", 문서: "bad" } },
  ],
}) => (
  <SectionCard title="프로젝트별 문제 분포 (9개월 관찰)">
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table style={sx.table}>
        <thead>
          <tr>
            <th style={{ ...sx.th, width: 140 }}>프로젝트</th>
            {categories.map((c) => (
              <th key={c} style={sx.th}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.project} style={{ transition: "background .2s" }}>
              <td style={{ ...sx.td, width: 140, fontWeight: 700 }}>{r.project}</td>
              {categories.map((c) => (
                <td key={c} style={sx.td}>
                  <span style={chipStyleByCell(r.cells[c])}>
                    <span style={sx.dot("#ffffff")} />
                    {r.cells[c]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p style={{ marginTop: 12, fontSize: 13, opacity: .8 }}>
      공통 분모가 뚜렷 → 조직 차원의 해법 필요
    </p>
  </SectionCard>
);

/* --------------------------- 4) 아이스버그 --------------------------- */

export const IcebergSlide: React.FC<{
  surface?: string[];
  hidden?: string[];
}> = ({
  surface = ["버그/요청 티켓", "즉시 보이는 UI 이슈", "단발성 핫픽스"],
  hidden = ["전역 상태 남용", "SDK 혼재(지도/차트)", "라우터/서브패스 정책 불일치", ".env 키 관리/롤오버 부재", "온보딩 미문서화"],
}) => (
  <SectionCard title="표면 이슈 뒤에 숨은 구조적 비용">
    <div style={sx.row}>
      <div style={{ ...sx.box, background: "rgba(90,169,255,.10)" }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 800 }}>
          <Icon>🌊</Icon>수면 위
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {surface.map((s) => (
            <li key={s} style={{ margin: "6px 0" }}>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ ...sx.box, background: "rgba(124,77,255,.10)" }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 800 }}>
          <Icon>🧊</Icon>수면 아래
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {hidden.map((h) => (
            <li key={h} style={{ margin: "6px 0" }}>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SectionCard>
);

/* --------------------------- 5) 포트폴리오 맵 --------------------------- */

type ProjectCard = { name: string; stack: string; issues: string[] };

export const PortfolioMap: React.FC<{ items?: ProjectCard[] }> = ({
  items = [
    { name: "do반장", stack: "React 18 / TS 4.9 / FullCalendar / Firebase", issues: ["서브패스 배포", "소셜 로그인 혼재"] },
    { name: "에너지전환마을", stack: "React 18 / TS 4.9 / Naver Maps / Nivo/Recharts", issues: ["라우팅 상이", "차트 컴포넌트 중복"] },
    { name: "새빛돌봄", stack: "React 18 / TS 4.9 / Chart.js / Kakao Maps", issues: ["PDF 뷰어/라우팅 경로", "쿠키/인증 보일러플레이트"] },
    { name: "동구라미온", stack: "React 18 / TS 4.9 / Kakao Maps / Firebase", issues: ["지도 SDK 로딩 전략", "빌드/버전 태깅"] },
  ],
}) => (
  <SectionCard title="프로젝트 스냅샷">
    <div style={sx.row}>
      {items.map((p) => (
        <div key={p.name} style={sx.box}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{p.name}</div>
          <div style={{ fontSize: 13, opacity: .75, marginBottom: 10 }}>{p.stack}</div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
            {p.issues.map((i) => (
              <li key={i} style={{ margin: "4px 0" }}>
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </SectionCard>
);

/* --------------------------- 6) 문제 → 해결 Funnel --------------------------- */

export const ProblemSolutionFunnel: React.FC<{
  problems?: string[];
  baseline?: string[];
  effects?: string[];
}> = ({
  problems = ["제각각 구조", "라우팅 규칙 상이", "SDK 혼재", "문서/PR 부족"],
  baseline = ["폴더/레이어드 구조", "라우팅/코드 스플리팅 규칙", "HTTP/폼/에러 핸들러", "ESLint/Prettier/PR 템플릿"],
  effects = ["온보딩 TTV↓", "협업시간↓", "장애 재발↓"],
}) => (
  <SectionCard title="문제 → Baseline → 기대효과">
    <div style={sx.row3}>
      <div style={{ ...sx.box, background: "rgba(255,107,107,.10)", border: "1px solid #ff6b6b55" }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontWeight: 800 }}>
          <Icon>⚠️</Icon>문제
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {problems.map((p) => (
            <li key={p} style={{ margin: "6px 0" }}>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ ...sx.box, background: "rgba(90,169,255,.10)", border: "1px solid #5aa9ff55" }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontWeight: 800 }}>
          <Icon>📐</Icon>Baseline
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {baseline.map((b) => (
            <li key={b} style={{ margin: "6px 0" }}>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ ...sx.box, background: "rgba(88,214,141,.10)", border: "1px solid #58d68d55" }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontWeight: 800 }}>
          <Icon>🚀</Icon>기대효과
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {effects.map((e) => (
            <li key={e} style={{ margin: "6px 0" }}>
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SectionCard>
);

/* --------------------------- 7) Before / After --------------------------- */

export const BeforeAfterSplit: React.FC<{
  before?: string[];
  after?: string[];
}> = ({
  before = ["제각각 구조", "라우팅 규칙 상이", "지도 SDK 혼재", "중복 코드"],
  after = ["단일 구조 가이드", "지연 로딩 기준", "SDK 추상화", "공통 유틸/훅"],
}) => (
  <SectionCard title="Before / After">
    <div style={sx.row}>
      <div style={sx.box}>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Before</div>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {before.map((b) => (
            <li key={b} style={{ margin: "6px 0" }}>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div style={sx.box}>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>After</div>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {after.map((a) => (
            <li key={a} style={{ margin: "6px 0" }}>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SectionCard>
);

/* --------------------------- 8) 인용 + KPI 포인트 --------------------------- */

export const QuoteWithKPIs: React.FC<{
  quote?: string;
  kpis?: { label: string; value?: string; note?: string }[];
}> = ({
  quote = "프로젝트마다 규칙이 달라서, 신규 투입 시 첫 주는 방향 잡기에 씁니다.",
  kpis = [
    { label: "온보딩 TTV", note: "도입 후 감소(측정 예정)" },
    { label: "PR 리드타임", note: "규칙/템플릿 도입 후 단축(측정 예정)" },
    { label: "장애 재발률", note: "공통 핸들러 도입 후 감소(측정 예정)" },
  ],
}) => (
  <SectionCard>
    <blockquote
      style={{
        ...sx.box,
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.16)",
        fontSize: 18,
        fontStyle: "italic",
        marginBottom: 12,
      }}
    >
      “{quote}”
    </blockquote>
    <div style={sx.row3}>
      {kpis.map((k) => (
        <div key={k.label} style={sx.box}>
          <div style={{ fontSize: 12, opacity: .65 }}>지표</div>
          <div style={{ fontSize: 16, fontWeight: 800, margin: "4px 0" }}>{k.label}</div>
          <div style={{ fontSize: 13, opacity: .85 }}>{k.value ?? "~"}</div>
          {k.note && <div style={{ marginTop: 6, fontSize: 12, opacity: .65 }}>{k.note}</div>}
        </div>
      ))}
    </div>
  </SectionCard>
);

/* --------------------------- 9) KPI 카드 --------------------------- */

export const KPICards: React.FC<{
  items?: { name: string; current?: string; target?: string; measure?: string }[];
}> = ({
  items = [
    { name: "온보딩 TTV", current: "TBD", target: "감소", measure: "신규 투입 체크리스트 완료 시간" },
    { name: "협업 시간", current: "TBD", target: "감소", measure: "디자이너/백엔드 연동 소요" },
    { name: "운영 장애 재발", current: "TBD", target: "감소", measure: "동일 원인 재발 건수" },
  ],
}) => (
  <SectionCard title="KPI (목표 / 측정 계획)">
    <div style={sx.row3}>
      {items.map((x) => (
        <div key={x.name} style={sx.box}>
          <div style={{ fontSize: 12, opacity: .65 }}>지표</div>
          <div style={{ fontSize: 16, fontWeight: 800, margin: "4px 0" }}>{x.name}</div>
          <div style={{ fontSize: 13 }}>현재: {x.current ?? "TBD"}</div>
          <div style={{ fontSize: 13 }}>목표: {x.target ?? "-"}</div>
          <div style={{ marginTop: 6, fontSize: 12, opacity: .7 }}>측정: {x.measure}</div>
        </div>
      ))}
    </div>
  </SectionCard>
);

/* --------------------------- 10) 북커버 스타일 --------------------------- */

export const BookCoverIntro: React.FC<{ lines?: string[] }> = ({
  lines = [
    "각기 다른 규칙은, 같은 실수를 반복하게 만듭니다.",
    "우리는 개인 역량에 의존하지 않고, 시스템으로 품질을 만듭니다.",
    "React Baseline: 채용·운영 리스크를 구조적으로 흡수합니다.",
  ],
}) => (
  <SectionCard
    style={{
      background: "#151829",
      border: "1px solid rgba(255,255,255,.12)",
      boxShadow: tone.shadow,
    }}
  >
    <div
      style={{
        minHeight: 220,
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        gap: 10,
      }}
    >
      {lines.map((t, i) => (
        <div
          key={i}
          style={{
            fontSize: 22,
            fontWeight: 800,
            textShadow: "0 1px 0 rgba(0,0,0,.6)",
          }}
        >
          {t}
        </div>
      ))}
    </div>
  </SectionCard>
);

/* --------------------------- 데모/갤러리 (컨트롤만 얇게) --------------------------- */

const VARIANTS = [
  { key: "exec", name: "Executive One-liner", Comp: ExecutiveOneLiner },
  { key: "why", name: "Why Now Timeline", Comp: WhyNowTimeline },
  { key: "heat", name: "문제 히트맵", Comp: ProblemHeatmap },
  { key: "ice", name: "아이스버그", Comp: IcebergSlide },
  { key: "port", name: "포트폴리오 맵", Comp: PortfolioMap },
  { key: "funnel", name: "문제→Baseline→효과", Comp: ProblemSolutionFunnel },
  { key: "ba", name: "Before / After", Comp: BeforeAfterSplit },
  { key: "quote", name: "인용+KPI 포인트", Comp: QuoteWithKPIs },
  { key: "kpi", name: "KPI 카드", Comp: KPICards },
  { key: "book", name: "북커버 스타일", Comp: BookCoverIntro },
];

const Selector: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <div style={sx.ctrlBar}>
    <label style={{ fontSize: 12, opacity: .8 }}>Variant</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} style={sx.select}>
      {VARIANTS.map((v) => (
        <option key={v.key} value={v.key}>
          {v.name}
        </option>
      ))}
    </select>
  </div>
);

const FooterTip: React.FC = () => (
  <div style={{ ...sx.box, marginTop: 12, fontSize: 13, background: "rgba(255,255,255,.05)" }}>
    <div style={{ fontWeight: 700 }}>커스터마이즈 팁</div>
    <ul style={{ margin: 8, paddingLeft: 18, opacity: .9 }}>
      <li>색상: 문제=주황/빨강, 해결=파랑/청록, 중립=회색 톤 (전역 토큰 활용)</li>
      <li>타이포: 헤드 32–36 / 본문 14–16 / 캡션 12 (웹 발표 기준)</li>
      <li>여백: 섹션 내부 20–28px, 서브 카드 라운드 16px</li>
      <li>실전 발표에선 도입 1~2 슬라이드만 조합해 “왜 지금/어떻게”를 10–20초 내 전달</li>
    </ul>
  </div>
);

export default function IntroVariantsGallery() {
  const [key, setKey] = useState(VARIANTS[0].key);
  const Comp = useMemo(() => VARIANTS.find((v) => v.key === key)?.Comp ?? ExecutiveOneLiner, [key]);

  // 이 컴포넌트는 .section-panel 내부에 render된다는 가정.
  // 바깥 배경/밴드/워터마크는 전역 CSS가 이미 처리.

  return (
    <div>
      <header style={{ marginBottom: 14 }}>
        <h1
          style={{
            ...sx.h1,
            fontSize: 28,
            marginBottom: 6,
          }}
        >
          도입부 슬라이드 UI 샘플
        </h1>
        <p style={{ ...sx.p, marginBottom: 0 }}>10가지 패턴 중 선택해서 바로 카피만 바꿔 쓰세요.</p>
      </header>

      <Selector value={key} onChange={setKey} />

      <div style={{ display: "grid", gap: 14 }}>
        <Comp />
      </div>

      <FooterTip />
    </div>
  );
}
