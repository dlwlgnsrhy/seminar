// src/components/LinkBtn.tsx
export default function LinkBtn({href,label}:{href:string;label:string}){
    return (
      <a href={href} target="_blank" rel="noreferrer"
         style={{padding:'6px 12px',borderRadius:8,fontSize:12,
                 background:'rgba(90,169,255,.15)',
                 border:'1px solid rgba(90,169,255,.35)'}}>
        🔗 {label}
      </a>
    )
  }