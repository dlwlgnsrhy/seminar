export default function SpinnerOverlay({visible}:{visible:boolean}){
  if(!visible) return null
  return (
    <div style={{
      position:'fixed', inset:0, display:'grid', placeItems:'center',
      background:'rgba(0,0,0,0.45)', backdropFilter:'blur(2px)', zIndex: 20
    }}>
      <div style={{padding:16,borderRadius:12, background:'#121826', border:'1px solid rgba(255,255,255,0.12)'}}>
        <div style={{width:28,height:28,border:'3px solid #fff', borderRightColor:'transparent', borderRadius:'9999px', animation:'spin 1s linear infinite'}} />
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
