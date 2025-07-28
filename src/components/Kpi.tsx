export default function Kpi({
    label,
    value,
    caption,
  }: {
    label: string
    value: string
    caption?: string
  }) {
    return (
      <div
        style={{
          padding: 16,
          borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.12)',
          minWidth: 160,
        }}
      >
        <div style={{ opacity: 0.75, fontSize: 12 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>{value}</div>
        {caption && (
          <div style={{ opacity: 0.6, fontSize: 12, marginTop: 4 }}>{caption}</div>
        )}
      </div>
    )
  }