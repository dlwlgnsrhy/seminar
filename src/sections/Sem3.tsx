import React, { useMemo, useState } from "react";

/**
 * One-screen audit matrix prototype (no external UI libs)
 * - Tailwind-only styling
 * - Click any cell to open a slide-over with Problem / Impact / Evidence / Commands
 * - Filter by severity, project, step
 * - Export JSON/CSV, Print mode
 */

// ----- Types -----

type Severity = "green" | "yellow" | "orange" | "red" | "gray";

type Evidence = {
  label: string;
  href?: string; // URL or relative path; if omitted, acts as placeholder
  note?: string; // short context (e.g., "buildlog.txt L1749")
};

type Cell = {
  severity: Severity;
  headline?: string; // quick metric e.g., "JS 734KB / LCP 17.7s"
  bullets?: string[]; // 2~3 bullets visible in drawer
  evidence?: Evidence[]; // attach links to files/screens
  commands?: string[]; // PS commands used to collect evidence
};

type ProjectId = "do-banjang" | "ec-village" | "suwon";

const STEP_ORDER = [
  "Step1",
  "Step2",
  "Step3",
  "Step4",
  "Step5",
  "Step6",
  "Step7",
] as const;

type StepKey = typeof STEP_ORDER[number];

type Matrix = Record<ProjectId, Record<StepKey, Cell>>;

// ----- Sample data (prefilled with jihoon’s numbers) -----

const initialMatrix: Matrix = {
  "do-banjang": {
    Step1: {
      severity: "red",
      headline: "전역404 부재/탭분기 중복",
      bullets: [
        "알 수 없는 URL 진입 시 UX/분석 저하",
        "서버 리라이트 의존(새로고침 404)",
      ],
      evidence: [
        { label: "App.tsx / index.tsx", note: "라우팅 스니펫" },
      ],
    },
    Step2: {
      severity: "orange",
      headline: "레이지 로딩 미흡, Kakao SDK 이중 로드 위험",
      bullets: ["정적 import 중심", "SDK 초기 로드 경합 가능"],
      evidence: [
        { label: "public/index.html", note: "Kakao script" },
        { label: "App.tsx", note: "동적 script 삽입" },
      ],
    },
    Step3: {
      severity: "red",
      headline: "환경예시/PR 템플릿 부재",
      bullets: ["온보딩·배포 변동 취약"],
    },
    Step4: {
      severity: "red",
      headline: "JS 734.75KB / CSS 138.05KB / LCP 17.7·8.6·9.2s",
      bullets: ["초기 번들 과대", "모바일 LCP 기준 2.5s 이상적"],
      evidence: [
        { label: "buildlog.txt", note: "gzip 합계" },
        { label: "Lighthouse 캡처 1/2/3" },
      ],
      commands: [
        "npm run build && npx serve -s build",
        "Select-String buildlog.txt -Pattern 'static/js/.+KB'",
      ],
    },
    Step5: {
      severity: "orange",
      headline: "강제 새로고침 131",
      bullets: ["SPA 상태 갱신 원칙 위배 신호"],
      commands: [
        "Select-String -Pattern 'window.location.reload|navigate(0)'",
      ],
    },
    Step6: {
      severity: "red",
      headline: "인터셉터/상태코드 분기 부재, alert 572",
      bullets: ["에러 처리 공통성 결여", "차단형 알림 다수"],
    },
    Step7: {
      severity: "red",
      headline: "README / .env.example / PR 템플릿 부재",
      bullets: ["리뷰 편차/설정 실수 재발 가능"],
    },
  },
  "ec-village": {
    Step1: {
      severity: "orange",
      headline: "BrowserRouter + homepage/basename 부재",
      bullets: ["서브패스 배포 시 불일치 위험"],
    },
    Step2: {
      severity: "orange",
      headline: "메타/SDK 삽입 혼재·중복",
    },
    Step3: {
      severity: "orange",
      headline: ".env* 부재 가능, 키/도메인 하드코딩 흔적",
    },
    Step4: {
      severity: "red",
      headline: "JS 589.31KB / CSS 271.99KB / LCP ~13s",
      bullets: ["초기 자산 과다", "리소스 로딩 지연"],
      evidence: [
        { label: "buildlog.txt", note: "gzip 합계" },
        { label: "Lighthouse 캡처" },
      ],
    },
    Step5: {
      severity: "orange",
      headline: "강제 새로고침 87 / 동기 0",
    },
    Step6: {
      severity: "red",
      headline: "axios 인스턴스/인터셉터/상태코드 분기 부재, alert 97",
    },
    Step7: { severity: "red", headline: "문서 3종 부재" },
  },
  suwon: {
    Step1: {
      severity: "orange",
      headline: "homepage=/care_portal, basename 미사용",
      bullets: ["절대경로 743 / /care_portal 523 / navigate 506"],
      evidence: [{ label: "App.tsx / index.tsx", note: "라우팅" }],
    },
    Step2: {
      severity: "orange",
      headline: "<base> 없음, Kakao SDK 중복 로드 위험",
      evidence: [{ label: "index.html" }, { label: "App.tsx" }],
    },
    Step3: {
      severity: "orange",
      headline: ".env.test 존재, /care_portal/api/ 69, 공개 SDK 키",
    },
    Step4: {
      severity: "orange",
      headline: "JS 443.44KB / CSS 47.12KB / LCP 8.1s",
      evidence: [
        { label: "step4_top_assets_gzip_fromfiles.csv" },
        { label: "Lighthouse 캡처" },
      ],
    },
    Step5: {
      severity: "orange",
      headline: "강제 새로고침 260, useEffect 인라인 401, 중복 호출 스샷",
    },
    Step6: {
      severity: "orange",
      headline: "전역 인터셉터 다중 등록(21+), alert 34, 토큰/timeout 미검출",
    },
    Step7: { severity: "gray", headline: "TBD" },
  },
};

// ----- Helpers -----

const sevChip = (s: Severity) => {
  const map: Record<Severity, string> = {
    green: "bg-emerald-500",
    yellow: "bg-yellow-400",
    orange: "bg-orange-500",
    red: "bg-rose-600",
    gray: "bg-gray-400",
  };
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${map[s]}`} />;
};

function sevScore(sev: Severity) {
  return { gray: 0, green: 0, yellow: 1, orange: 2, red: 3 }[sev];
}

function toCsv(matrix: Matrix) {
  const headers = ["Step", "Project", "Severity", "Headline"]; // keep compact
  const rows: string[] = [headers.join(",")];
  STEP_ORDER.forEach((step) => {
    (Object.keys(matrix) as ProjectId[]).forEach((pid) => {
      const c = matrix[pid][step];
      rows.push([
        step,
        pid,
        c.severity,
        '"' + (c.headline || "") + '"',
      ].join(","));
    });
  });
  return rows.join("\n");
}

// ----- UI -----

export default function AuditMatrix() {
  const [matrix, setMatrix] = useState<Matrix>(initialMatrix);
  const [projectFilter, setProjectFilter] = useState<ProjectId[] | null>(null);
  const [severityFilter, setSeverityFilter] = useState<Severity[] | null>(null);
  const [selected, setSelected] = useState<{ project: ProjectId; step: StepKey } | null>(null);
  const [dense, setDense] = useState(false);

  const projects = useMemo(() => (Object.keys(matrix) as ProjectId[]), [matrix]);

  const visibleProjects = useMemo(() => {
    return projectFilter?.length ? projects.filter((p) => projectFilter.includes(p)) : projects;
  }, [projects, projectFilter]);

  const filtered = useMemo(() => {
    if (!severityFilter?.length) return matrix;
    const m: Matrix = JSON.parse(JSON.stringify(matrix));
    (Object.keys(m) as ProjectId[]).forEach((pid) => {
      STEP_ORDER.forEach((step) => {
        const c = m[pid][step];
        if (!severityFilter.includes(c.severity)) {
          m[pid][step] = { ...c, severity: "gray", headline: "필터로 숨김" };
        }
      });
    });
    return m;
  }, [matrix, severityFilter]);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-matrix.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-matrix.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printView = () => window.print();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur px-4 py-3 flex items-center gap-3">
        <h1 className="text-xl font-semibold">One-Screen Audit Matrix</h1>
        <span className="text-sm text-gray-500">(click cells for details)</span>
        <div className="flex-1" />
        {/* Filters */}
        <div className="flex items-center gap-2">
          <SeverityFilter value={severityFilter} onChange={setSeverityFilter} />
          <ProjectFilter all={projects} value={projectFilter} onChange={setProjectFilter} />
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none ml-2">
            <input type="checkbox" checked={dense} onChange={(e) => setDense(e.target.checked)} />
            Dense
          </label>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50" onClick={exportCSV}>
            Export CSV
          </button>
          <button className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50" onClick={exportJSON}>
            Export JSON
          </button>
          <button className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50" onClick={printView}>
            Print
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 text-sm flex items-center gap-4">
        <div className="flex items-center gap-2">{sevChip("red")} <span>심각</span></div>
        <div className="flex items-center gap-2">{sevChip("orange")} <span>위험</span></div>
        <div className="flex items-center gap-2">{sevChip("yellow")} <span>주의</span></div>
        <div className="flex items-center gap-2">{sevChip("green")} <span>양호</span></div>
        <div className="flex items-center gap-2">{sevChip("gray")} <span>미수집/숨김</span></div>
      </div>

      {/* Risk score per project */}
      <div className="px-4 pb-2 grid grid-cols-1 md:grid-cols-3 gap-3">
        {visibleProjects.map((pid) => {
          const score = STEP_ORDER.reduce((acc, step) => acc + sevScore(filtered[pid][step].severity), 0);
          const title = pid === "do-banjang" ? "do반장" : pid === "ec-village" ? "에너지전환마을" : "새빛돌봄";
          return (
            <div key={pid} className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">{title}</div>
                <div className="text-sm text-gray-500">Risk score: <b>{score}</b></div>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1 text-xs">
                {STEP_ORDER.map((step) => (
                  <div key={step} className="flex items-center gap-1">
                    {sevChip(filtered[pid][step].severity)}
                    <span className="text-gray-600">{step.replace("Step", "S")}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Matrix table */}
      <div className="px-4 pb-8">
        <div className="overflow-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-[68px] z-30">
              <tr>
                <th className="text-left px-3 py-2 w-40">스텝</th>
                {visibleProjects.map((pid) => (
                  <th key={pid} className="text-left px-3 py-2 min-w-[260px]">{
                    pid === "do-banjang" ? "do반장" : pid === "ec-village" ? "에너지전환마을 " : "새빛돌봄"
                  }</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STEP_ORDER.map((step) => (
                <tr key={step} className="border-t">
                  <td className="px-3 py-2 text-gray-600 font-medium w-40 whitespace-nowrap">{step}</td>
                  {visibleProjects.map((pid) => {
                    const cell = filtered[pid][step];
                    return (
                      <td key={pid + step} className="px-3 py-2">
                        <button
                          onClick={() => setSelected({ project: pid, step })}
                          className={`group w-full text-left border rounded-md ${dense ? "p-2" : "p-3"} hover:bg-gray-50 transition`}
                        >
                          <div className="flex items-start gap-2">
                            {sevChip(cell.severity)}
                            <div className="flex-1">
                              <div className="font-medium leading-5 line-clamp-2">
                                {cell.headline || "—"}
                              </div>
                              {!dense && cell.bullets?.length ? (
                                <ul className="mt-1 list-disc pl-5 text-gray-600 space-y-0.5">
                                  {cell.bullets.slice(0, 2).map((b, i) => (
                                    <li key={i} className="line-clamp-1">{b}</li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                          </div>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over detail */}
      {selected && (
        <DetailDrawer
          onClose={() => setSelected(null)}
          project={selected.project}
          step={selected.step}
          cell={filtered[selected.project][selected.step]}
        />
      )}
    </div>
  );
}

// ----- Filters -----

function ProjectFilter({ all, value, onChange }: { all: ProjectId[]; value: ProjectId[] | null; onChange: (v: ProjectId[] | null) => void }) {
  const [open, setOpen] = useState(false);
  const labels: Record<ProjectId, string> = {
    "do-banjang": "do반장",
    "ec-village": "에너지전환마을",
    suwon: "새빛돌봄",
  };
  const active = value?.length ? value.map((v) => labels[v]).join(", ") : "All projects";
  return (
    <div className="relative">
      <button className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50 min-w-[120px] text-left" onClick={() => setOpen((s) => !s)}>
        {active}
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-56 bg-white border rounded-md shadow-lg z-50 p-2">
          {all.map((p) => (
            <label key={p} className="flex items-center gap-2 px-2 py-1 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={value?.includes(p) || false}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (!value || value.length === 0) {
                    onChange(checked ? [p] : null);
                  } else {
                    const next = new Set(value);
                    checked ? next.add(p) : next.delete(p);
                    onChange(next.size ? Array.from(next) as ProjectId[] : null);
                  }
                }}
              />
              <span>{labels[p]}</span>
            </label>
          ))}
          <div className="mt-2 flex justify-end gap-2">
            <button className="text-xs text-gray-600 hover:underline" onClick={() => onChange(null)}>Clear</button>
            <button className="text-xs text-gray-600 hover:underline" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SeverityFilter({ value, onChange }: { value: Severity[] | null; onChange: (v: Severity[] | null) => void }) {
  const [open, setOpen] = useState(false);
  const opts: Severity[] = ["red", "orange", "yellow", "green", "gray"];
  const label = value?.length ? value.join(", ") : "Severity";
  return (
    <div className="relative">
      <button className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50 min-w-[100px] text-left" onClick={() => setOpen((s) => !s)}>
        {label}
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-50 p-2">
          {opts.map((s) => (
            <label key={s} className="flex items-center gap-2 px-2 py-1 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={value?.includes(s) || false}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (!value || value.length === 0) {
                    onChange(checked ? [s] : null);
                  } else {
                    const next = new Set(value);
                    checked ? next.add(s) : next.delete(s);
                    onChange(next.size ? (Array.from(next) as Severity[]) : null);
                  }
                }}
              />
              <span className="flex items-center gap-2">{sevChip(s)}<span className="capitalize">{s}</span></span>
            </label>
          ))}
          <div className="mt-2 flex justify-end gap-2">
            <button className="text-xs text-gray-600 hover:underline" onClick={() => onChange(null)}>Clear</button>
            <button className="text-xs text-gray-600 hover:underline" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----- Drawer -----

function DetailDrawer({
  project,
  step,
  cell,
  onClose,
}: {
  project: ProjectId;
  step: StepKey;
  cell: Cell;
  onClose: () => void;
}) {
  const title = project === "do-banjang" ? "do반장" : project === "ec-village" ? "에너지전환마을 " : "새빛돌봄";
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-xl flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">{title} · {step}</div>
            <div className="text-lg font-semibold flex items-center gap-2">{sevChip(cell.severity)}<span>{cell.headline || "세부 정보"}</span></div>
          </div>
          <button className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50" onClick={onClose}>Close</button>
        </div>
        <div className="p-4 space-y-6 overflow-auto">
          {cell.bullets?.length ? (
            <section>
              <h3 className="text-sm font-semibold mb-2">문제 / 영향 (요약)</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {cell.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </section>
          ) : null}

          {cell.evidence?.length ? (
            <section>
              <h3 className="text-sm font-semibold mb-2">증거(클릭해 열기)</h3>
              <ul className="space-y-2">
                {cell.evidence.map((e, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1">🔗</span>
                    {e.href ? (
                      <a className="text-sm text-blue-700 hover:underline" href={e.href} target="_blank" rel="noreferrer">{e.label}</a>
                    ) : (
                      <span className="text-sm">{e.label}</span>
                    )}
                    {e.note && <span className="text-xs text-gray-500 ml-2">{e.note}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {cell.commands?.length ? (
            <section>
              <h3 className="text-sm font-semibold mb-2">수집에 사용한 명령</h3>
              <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-800 whitespace-pre-wrap">
                {cell.commands.join("\n")}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
