import type { MapHighlight } from '../../lib/snapshotInsights'
import { SNAPSHOT_TEETH } from './SmileSnapshotMap'

/** Compact mouth diagram with a single highlighted monitor tooth — for card icons. */
export function SnapshotMonitorIcon({ highlight }: { highlight: MapHighlight }) {
  return (
    <div
      className="flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-xl bg-white/85 p-1.5 ring-1 ring-[#E8EEF2]/70"
      aria-hidden
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <ellipse cx="100" cy="100" rx="84" ry="68" fill="#FAFAFA" stroke="#E8EEF2" strokeWidth="1.5" />
        {SNAPSHOT_TEETH.map((t) => {
          const isHighlight = t.id === highlight.toothId
          return (
            <ellipse
              key={t.id}
              cx={t.cx}
              cy={t.cy}
              rx={t.rx}
              ry={t.ry}
              fill={isHighlight ? '#FF7A1A' : '#FFFFFF'}
              stroke={isHighlight ? '#FF7A1A' : '#E5E7EB'}
              strokeWidth={isHighlight ? 2 : 1}
            />
          )
        })}
      </svg>
    </div>
  )
}

export function primaryMonitorHighlight(highlights: MapHighlight[]): MapHighlight | null {
  return highlights.find((h) => h.tone === 'monitor') ?? highlights[0] ?? null
}
