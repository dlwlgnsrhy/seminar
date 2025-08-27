export default function Callout({
  type = 'info', children, ...rest
}: {
  type?: 'info' | 'warn' | 'success' | 'danger'
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={`callout callout-${type}`} role="note">
      {children}
    </div>
  )
}
