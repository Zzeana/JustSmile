import { ToothCharacter } from '../mascot/ToothCharacter'
import { CARD_PAD, CARD_SHELL } from '../layout/pageLayout'
import {
  buildScanMetrics,
  METRIC_STATUS_CLASS,
  METRIC_STATUS_LABEL,
  METRIC_TOOTH_COLOR,
  type ScanMetricId,
} from '../../lib/scanMetrics'
import type { RiskLevel } from '../../lib/types'

function MetricToothIcon({ id }: { id: ScanMetricId }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center">
      <ToothCharacter color={METRIC_TOOTH_COLOR[id]} size={36} />
    </span>
  )
}

function Chevron() {
  return (
    <svg className="h-4 w-4 shrink-0 text-[#C5CDD6]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ScanOverviewMetrics({
  risk,
  onMetricPress,
  className = '',
}: {
  risk: RiskLevel
  onMetricPress?: () => void
  className?: string
}) {
  const metrics = buildScanMetrics(risk)
  const interactive = !!onMetricPress

  return (
    <section
      className={[
        CARD_SHELL,
        CARD_PAD,
        'bg-white',
        className,
      ].join(' ')}
    >
      <h2 className="text-center text-[15px] font-semibold tracking-[-0.01em] text-[#191919]">
        Your overview
      </h2>

      <ul className="mt-3 divide-y divide-[#F0F4F7]">
        {metrics.map((metric) => {
          const Row = interactive ? 'button' : 'div'
          return (
            <li key={metric.id}>
              <Row
                type={interactive ? 'button' : undefined}
                onClick={onMetricPress}
                className={[
                  'flex w-full items-center gap-3 py-3.5 text-left',
                  interactive ? 'transition hover:opacity-80' : '',
                ].join(' ')}
              >
                <MetricToothIcon id={metric.id} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-[#191919]">{metric.label}</span>
                  <span className={`mt-0.5 block text-[13px] font-medium ${METRIC_STATUS_CLASS[metric.level]}`}>
                    {METRIC_STATUS_LABEL[metric.level]}
                  </span>
                </span>
                {interactive && <Chevron />}
              </Row>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
