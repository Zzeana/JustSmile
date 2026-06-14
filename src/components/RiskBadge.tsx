import type { RiskLevel } from '../lib/types'
import { friendlyRiskBadgeText } from '../lib/trends'

const styles: Record<
  RiskLevel,
  { bar: string; text: string; ring: string }
> = {
  low: {
    bar: 'bg-emerald-600',
    text: 'text-emerald-900',
    ring: 'ring-emerald-200',
  },
  medium: {
    bar: 'bg-amber-600',
    text: 'text-amber-950',
    ring: 'ring-amber-200',
  },
  high: {
    bar: 'bg-rose-600',
    text: 'text-rose-950',
    ring: 'ring-rose-200',
  },
}

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  const s = styles[risk]
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ring-2 ring-inset ${s.ring} bg-white`}
      role="status"
      aria-live="polite"
    >
      <span className={`h-2.5 w-2.5 rounded-full ${s.bar}`} aria-hidden />
      <span className={`font-heading text-sm font-semibold tracking-wide ${s.text}`}>
        {friendlyRiskBadgeText(risk)}
      </span>
    </div>
  )
}
