export default function Callout({
    type = 'info',
    children,
  }: {
    type?: 'info' | 'warn' | 'success' | 'danger'
    children: any
  }) {
    const color: Record<string, string> = {
      info: '#5aa9ff',
      warn: '#f5c242',
      success: '#58d68d',
      danger: '#ff6b6b',
    }
    const c = color[type] ?? color.info
    return (
      <div
        role="note"
        style={{
          padding: 12,
          borderRadius: 10,
          border: `1px solid ${c}55`,
          background: `${c}18`,
        }}
      >
        {children}
      </div>
    )
  }