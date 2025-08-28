import React, { useMemo, useState } from "react"
import Callout from "@/components/Callout"
import Kpi from "@/components/Kpi"
import LinkBtn from "@/components/LinkBtn"
import s from "./IssueDetail.module.scss"

type Severity = "critical" | "high" | "medium" | "low"
type Evidence = { label: string; href?: string; note?: string }
type AuditRow = {
  project: string; step: string; finding: string; metric?: string;
  severity: Severity; evidence?: Evidence[]; commands?: string[]; notes?: string;
}
type IssueGroup = {
  key: string; title: string; severity: Severity;
  items: AuditRow[]; affectedProjects: string[];
}

/** 증거 분류 도우미 */
type EvKind = "lcp" | "build" | "other"
const evKind = (e: Evidence): EvKind => {
  const hay = `${e.label ?? ""} ${e.href ?? ""}`.toLowerCase()
  if (/(lighthouse|lcp|no[_\s-]?fcp|web[- ]?vitals|crux)/i.test(hay)) return "lcp"
  if (/(buildlog|build\s*파일|bundle|gzip|size|kb|csv)/i.test(hay)) return "build"
  return "other"
}

/** 2열 레이아웃 우선순위 정렬: 1행을 [LCP | build]로 맞추고 이후 쌍으로 채움 */
const orderForTwoCols = (list: Evidence[]): Evidence[] => {
  const lcp: Evidence[] = [], build: Evidence[] = [], other: Evidence[] = []
  list.forEach(ev => {
    const k = evKind(ev)
    if (k === "lcp") lcp.push(ev)
    else if (k === "build") build.push(ev)
    else other.push(ev)
  })

  const out: Evidence[] = []
  // 1행 고정: LCP | build (가능한 경우)
  if (lcp.length && build.length) {
    out.push(lcp.shift()!, build.shift()!)
  }

  // 이후 행들: 왼쪽은 lcp→other→build, 오른쪽은 build→lcp→other
  const popLeft  = () => lcp.shift()  ?? other.shift() ?? build.shift() ?? null
  const popRight = () => build.shift() ?? lcp.shift()  ?? other.shift() ?? null

  while (lcp.length || build.length || other.length) {
    const L = popLeft();  if (L) out.push(L)
    const R = popRight(); if (R) out.push(R)
  }
  return out
}

export default function IssueDetail({
  group,
  wide = true,
}: { group: IssueGroup; wide?: boolean }) {

  // 프로젝트별 항목 그룹 (요약/재현)
  const projMap = useMemo(() => {
    const m = new Map<string, AuditRow[]>()
    group.items.forEach(it => {
      const arr = m.get(it.project) ?? []
      arr.push(it)
      m.set(it.project, arr)
    })
    return m
  }, [group])

  // 프로젝트별 증거 그룹 (증거 탭용)
  const evidenceByProj = useMemo(() => {
    const out = new Map<string, Evidence[]>()
    group.items.forEach(it => {
      const list = out.get(it.project) ?? []
      ;(it.evidence ?? []).forEach(ev => list.push(ev))
      out.set(it.project, list)
    })
    return out
  }, [group])

  const [tab, setTab] = useState<"summary"|"evidence"|"repro">("summary")
  const [evExpand, setEvExpand] = useState<Record<string, boolean>>({})

  const isImg = (href?: string) => !!href && /\.(png|jpe?g|gif|webp|svg)$/i.test(href)
  const isTxt = (href?: string) => !!href && /\.(txt|log|md|csv)$/i.test(href)

  return (
    <div className={s.wrap}>
      <div className={s.panel}>
        {/* Header */}
        <div className={s.header}>
          <div className={s.titleRow}>
            <span className={[s.sevPill, s[group.severity]].join(" ")}>
              {group.severity.toUpperCase()}
            </span>
            <h3>{group.title}</h3>
          </div>
          <div className={s.sub}>
            총 <b>{group.affectedProjects.length}</b>개 프로젝트에서 동일 패턴 발견
          </div>
          <div className={s.tabs} role="tablist" aria-label="상세 탭">
            {(["summary","evidence","repro"] as const).map(t => (
              <button
                key={t}
                role="tab"
                aria-selected={tab===t}
                className={[s.tab, tab===t ? s.on : ""].join(" ")}
                onClick={()=>setTab(t)}
              >
                {t==="summary" ? "요약" : t==="evidence" ? "증거" : "재현"}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        {tab === "summary" && (
          <div className={s.grid}>
            <section className={s.col}>
              {[...projMap.entries()].map(([proj, rows]) => (
                <details key={proj} className={s.acc} open>
                  <summary>
                    <b>{proj}</b>
                    <span className={s.badgeLite}>{rows.length}</span>
                  </summary>
                  <div className={s.accBody}>
                    {rows.map((it, i) => (
                      <div key={i} className={s.card}>
                        <div className={s.cardHead}>
                          <span style={{opacity:.7}}>{it.step}</span>
                          {it.metric && <Kpi label="Metric" value={it.metric} />}
                        </div>
                        <div className={s.cardTitle}>{it.finding}</div>
                        {it.notes && <Callout type="info" style={{marginTop:8}}>{it.notes}</Callout>}
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </section>

            <aside className={s.aside}>
              <div className={s.asideCard}>
                <div className={s.asideTitle}>영향 범위</div>
                <ul className={s.miniList}>
                  {group.affectedProjects.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
              <div className={s.asideCard}>
                <div className={s.asideTitle}>빠른 링크</div>
                <div className={s.chipRow}>
                  {group.items.slice(0,6).map((it, i) =>
                    it.evidence?.[0]?.href
                      ? <LinkBtn key={i} href={it.evidence[0].href!} label={it.evidence[0].label}/>
                      : null
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}

        {tab === "evidence" && (
          <>
            <div className={s.evList}>
              {[...evidenceByProj.entries()].map(([proj, list]) => {
                // ⬇️ 프로젝트별로 [LCP | buildlog]가 1행에 오도록 정렬
                const ordered = orderForTwoCols(list)
                const expanded = !!evExpand[proj]
                const shown = expanded ? ordered : ordered.slice(0, 2)

                return (
                  <section key={proj} className={s.evGroup} aria-labelledby={`ev-${proj}`}>
                    <div className={s.evHead}>
                      <b id={`ev-${proj}`}>{proj}</b>
                      <span className={s.badgeLite}>{list.length}</span>
                      {list.length > 2 && (
                        <button
                          className="linklike ghost"
                          onClick={()=>setEvExpand(p => ({...p, [proj]: !p[proj]}))}
                        >
                          {expanded ? "접기" : `더보기 · ${list.length - 2}`}
                        </button>
                      )}
                    </div>

                    <div className={s.evRow}>
                      {shown.map((e, i) => (
                        <div key={i} className={s.gItem}>
                          <div className={s.gCaption}>{e.label}</div>
                          {isImg(e.href) && <img src={e.href} alt={e.label} />}
                          {isTxt(e.href) && <iframe src={e.href} title={`txt-${proj}-${i}`} className={s.gFrame} />}
                          {!isImg(e.href) && !isTxt(e.href) && e.href && (
                            <a className={s.gLink} href={e.href} target="_blank" rel="noreferrer">{e.href}</a>
                          )}
                        </div>
                      ))}
                      {shown.length === 1 && <div aria-hidden className={s.gItem} style={{visibility:'hidden'}} />}
                    </div>
                  </section>
                )
              })}
            </div>

            {([...evidenceByProj.values()].every(v => v.length === 0)) && (
              <Callout type="info">등록된 증거 링크가 없습니다.</Callout>
            )}
          </>
        )}

        {tab === "repro" && (
          <div className={s.repro}>
            {group.items.every(it => !it.commands?.length) && (
              <Callout type="info">재현 명령이 정리되지 않았습니다.</Callout>
            )}
            {group.items.map((it, i) =>
              it.commands?.length ? (
                <details key={i} className={s.acc} open={i===0}>
                  <summary><b>{it.project}</b> — {it.step}</summary>
                  <pre className="code" style={{marginTop:10}}>{it.commands.join("\n")}</pre>
                </details>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  )
}