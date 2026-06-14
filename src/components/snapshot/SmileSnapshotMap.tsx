import type { MapCallout, MapHighlight } from '../../lib/snapshotInsights'

export const SNAPSHOT_TEETH: { id: string; cx: number; cy: number; rx: number; ry: number }[] = [
  { id: 't-u-1', cx: 52, cy: 72, rx: 10, ry: 14 },
  { id: 't-u-2', cx: 68, cy: 64, rx: 10, ry: 14 },
  { id: 't-u-3', cx: 86, cy: 60, rx: 10, ry: 14 },
  { id: 't-u-4', cx: 104, cy: 58, rx: 10, ry: 14 },
  { id: 't-u-5', cx: 122, cy: 60, rx: 10, ry: 14 },
  { id: 't-u-6', cx: 140, cy: 64, rx: 10, ry: 14 },
  { id: 't-u-7', cx: 154, cy: 72, rx: 9, ry: 13 },
  { id: 't-l-1', cx: 52, cy: 128, rx: 10, ry: 14 },
  { id: 't-l-2', cx: 68, cy: 136, rx: 10, ry: 14 },
  { id: 't-l-3', cx: 86, cy: 140, rx: 10, ry: 14 },
  { id: 't-l-4', cx: 104, cy: 142, rx: 10, ry: 14 },
  { id: 't-l-5', cx: 122, cy: 140, rx: 10, ry: 14 },
  { id: 't-l-6', cx: 140, cy: 136, rx: 10, ry: 14 },
  { id: 't-l-7', cx: 154, cy: 128, rx: 9, ry: 13 },
]

const toneFill: Record<MapHighlight['tone'], string> = {
  healthy: '#52C470',
      monitor: '#FF7A1A',
}

const toneStroke: Record<MapHighlight['tone'], string> = {
  healthy: '#52C470',
  monitor: '#FF7A1A',
}

export function SmileSnapshotMap({
  highlights,
  callouts,
  compact = false,
  mini = false,
}: {
  highlights: MapHighlight[]
  callouts: MapCallout[]
  compact?: boolean
  mini?: boolean
}) {
  const highlightMap = new Map(highlights.map((h) => [h.toothId, h.tone]))

  return (
    <div
      className={[
        'relative mx-auto w-full',
        mini ? 'max-w-[68px]' : 'max-w-[280px]',
      ].join(' ')}
    >
      <svg viewBox="0 0 200 200" className="h-auto w-full" aria-hidden>
        <defs>
          <radialGradient id="mouth-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FAFAFA" />
            <stop offset="100%" stopColor="#E8EEF2" />
          </radialGradient>
        </defs>

        <ellipse cx="100" cy="100" rx="84" ry="68" fill="url(#mouth-bg)" />
        <ellipse cx="100" cy="100" rx="84" ry="68" fill="none" stroke="#52C470" strokeWidth="1" opacity="0.5" />

        {SNAPSHOT_TEETH.map((t) => {
          const tone = highlightMap.get(t.id)
          return (
            <g key={t.id}>
              <ellipse
                cx={t.cx}
                cy={t.cy}
                rx={t.rx}
                ry={t.ry}
                fill={tone ? toneFill[tone] : 'white'}
                stroke={tone ? toneStroke[tone] : '#E5E7EB'}
                strokeWidth={tone ? 1.5 : 1}
              />
            </g>
          )
        })}
      </svg>

      {!compact && callouts.length > 0 && (
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
          {callouts.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-[#667085]">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor:
                    c.tone === 'healthy' ? '#52C470' : c.tone === 'monitor' ? '#FF7A1A' : '#5E89ED',
                }}
              />
              {c.label}
            </span>
          ))}
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#667085]">
            <span className="h-2 w-2 rounded-full bg-[#5E89ED]" />
            Photo quality
          </span>
        </div>
      )}
    </div>
  )
}
