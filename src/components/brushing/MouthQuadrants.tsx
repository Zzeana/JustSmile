import { BRUSHING_QUADRANTS } from '../../lib/brushingInsights'

const CELL = [
  { x: 12, y: 12 },
  { x: 104, y: 12 },
  { x: 104, y: 104 },
  { x: 12, y: 104 },
]

type Props = {
  activeIndex: number | null
  segmentProgress: number
}

export function MouthQuadrants({ activeIndex, segmentProgress }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-[260px]">
      <svg viewBox="0 0 200 200" className="h-auto w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="mq-inactive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3F4F6" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>
          <linearGradient id="mq-active" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#52C470" />
            <stop offset="100%" stopColor="#52C470" />
          </linearGradient>
        </defs>

        <ellipse
          cx="100"
          cy="100"
          rx="92"
          ry="92"
          fill="none"
          stroke="#E8EEF2"
          strokeWidth="2"
        />

        {CELL.map((c, i) => {
          const isActive = activeIndex === i
          const label = BRUSHING_QUADRANTS[i]?.shortLabel ?? ''
          return (
            <g key={BRUSHING_QUADRANTS[i]?.id ?? i} transform={`translate(${c.x},${c.y})`}>
              <rect
                x={0}
                y={0}
                width={84}
                height={84}
                rx={28}
                fill={isActive ? 'url(#mq-active)' : 'url(#mq-inactive)'}
                stroke={isActive ? '#5E89ED' : '#D1D5DB'}
                strokeWidth={isActive ? 3 : 1.5}
                style={{
                  transition: 'all 0.5s ease-out',
                  filter: isActive ? 'drop-shadow(0 4px 12px rgba(94,137,237,0.25))' : 'none',
                }}
              />
              <text
                x={42}
                y={48}
                textAnchor="middle"
                className={`font-heading text-[11px] font-bold ${isActive ? 'fill-[#191919]' : 'fill-[#667085]'}`}
              >
                {label}
              </text>
            </g>
          )
        })}

        {activeIndex !== null && (
          <circle
            cx="100"
            cy="100"
            r={8 + segmentProgress * 6}
            fill="#5E89ED"
            fillOpacity={0.12 + segmentProgress * 0.15}
            style={{ transition: 'r 0.4s ease-out' }}
          />
        )}
      </svg>
    </div>
  )
}
