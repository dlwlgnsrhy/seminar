export default function Kpi({
  label, value, caption,
}: { label: string; value: string; caption?: string }) {
  return (
    <div className="kpi">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {caption && <div className="kpi-cap">{caption}</div>}
    </div>
  )
}
