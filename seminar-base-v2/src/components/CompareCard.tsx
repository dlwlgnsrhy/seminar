type Opt = { id: string; title: string; pros: string[]; cons: string[]; risk?: string }
export default function CompareCard({ options, selected, onSelect }:{ options: Opt[]; selected?: string; onSelect?: (id:string)=>void }){
  return (
    <div style={{ display:'grid', gap:12 }}>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {options.map(o => (
          <button key={o.id} onClick={()=>onSelect?.(o.id)}
            style={{ padding:'6px 10px', borderRadius:8, border:'1px solid rgba(255,255,255,0.2)', background: selected===o.id ? 'rgba(124,77,255,0.25)' : 'transparent', cursor:'pointer' }}>
            {o.title}
          </button>
        ))}
      </div>
      {options.filter(o=>!selected || o.id===selected).map(o => (
        <div key={o.id} style={{ padding:12, borderRadius:12, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.03)' }}>
          <strong>{o.title}</strong>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:8 }}>
            <div><div style={{opacity:.7}}>장점</div><ul>{o.pros.map((p,i)=><li key={i}>{p}</li>)}</ul></div>
            <div><div style={{opacity:.7}}>단점</div><ul>{o.cons.map((c,i)=><li key={i}>{c}</li>)}</ul></div>
          </div>
          {o.risk && <p style={{opacity:.7, marginTop:6}}>리스크: {o.risk}</p>}
        </div>
      ))}
    </div>
  )
}
