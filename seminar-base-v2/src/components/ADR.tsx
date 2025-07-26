export default function ADR({ title, background, decision, impact, metrics, risk }:
  { title: string; background: string; decision: string; impact: string; metrics: string[]; risk: string; }){
  return (
    <div style={{ padding:16, borderRadius:12, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.03)' }}>
      <h3 style={{marginTop:0}}>{title}</h3>
      <p><strong>배경</strong>: {background}</p>
      <p><strong>결정</strong>: {decision}</p>
      <p><strong>영향</strong>: {impact}</p>
      <p><strong>지표</strong>:</p>
      <ul>{metrics.map((m,i)=><li key={i}>{m}</li>)}</ul>
      <p><strong>리스크/완화</strong>: {risk}</p>
    </div>
  )
}
