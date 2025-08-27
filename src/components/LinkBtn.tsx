export default function LinkBtn({href,label}:{href:string;label:string}){
  return (
    <a href={href} target="_blank" rel="noreferrer" className="link-btn">
      🔗 {label}
    </a>
  )
}
