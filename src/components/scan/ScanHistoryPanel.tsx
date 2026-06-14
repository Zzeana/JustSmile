import type { ScanRecord } from '../../lib/types'
import { snapshotStatusLabel } from '../../lib/trends'
import { PrimaryButton } from '../ui/GradientScreen'

function formatSnapshotDate(ts: number): string {
  return new Intl.DateTimeFormat(undefined, {
    month: 'long',
    day: 'numeric',
  }).format(new Date(ts))
}

export function ScanHistoryPanel({
  scans,
  onSelect,
  onNewScan,
  onClose,
}: {
  scans: ScanRecord[]
  onSelect: (record: ScanRecord) => void
  onNewScan: () => void
  onClose: () => void
}) {
  const latest = scans[0]
  const first = scans[scans.length - 1]

  return (
    <div className="flex flex-1 flex-col gap-4 animate-[fadeIn_0.35s_ease-out]">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1 text-[14px] font-medium text-[#5E89ED]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Scan
        </button>
      </div>

      <div className="space-y-1">
        <h2 className="font-heading text-[1.25rem] font-bold text-[#191919]">
          Smile snapshots over time
        </h2>
        <p className="text-[14px] text-[#667085]">Regular check-ins help you notice changes early.</p>
      </div>

      {scans.length >= 2 && first && latest && (
        <div className="flex items-center gap-3 rounded-[1.125rem] border border-[#E8EEF2] bg-white/95 px-4 py-3.5 shadow-[0_4px_20px_-6px_rgba(94,137,237,0.08)]">
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#8B95A5]">First check</p>
            <p className="mt-0.5 font-heading text-[13px] font-semibold text-[#191919]">
              {snapshotStatusLabel(first.risk)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-[#5E89ED]" aria-hidden>
            <span className="h-px w-6 bg-[#52C470]/60" />
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14m0 0-4-4m4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="h-px w-6 bg-[#52C470]/60" />
          </div>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#8B95A5]">Latest check</p>
            <p className="mt-0.5 font-heading text-[13px] font-semibold text-[#191919]">
              {snapshotStatusLabel(latest.risk)}
            </p>
          </div>
        </div>
      )}

      {scans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="type-section leading-snug text-[#191919]">No snapshots yet</p>
          <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-[#667085]">
            Your check-ins will appear here so you can track changes over time.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {scans.map((s, i) => {
            const isFirst = i === scans.length - 1
            const label = isFirst ? 'First snapshot' : snapshotStatusLabel(s.risk)
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSelect(s)}
                  className="flex w-full items-center justify-between gap-3 rounded-[1.125rem] border border-[#E8EEF2] bg-white/95 px-4 py-3.5 text-left shadow-[0_4px_20px_-6px_rgba(94,137,237,0.08)] transition active:scale-[0.99]"
                >
                  <span className="font-heading text-[14px] font-semibold text-[#191919]">
                    {formatSnapshotDate(s.createdAt)}
                  </span>
                  <span className="flex items-center gap-2 text-[13px] text-[#667085]">
                    {label}
                    <svg className="h-4 w-4 text-[#5E89ED]" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <PrimaryButton onClick={onNewScan}>Start new scan</PrimaryButton>
    </div>
  )
}
