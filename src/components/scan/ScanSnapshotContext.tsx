import { ToothCharacter } from '../mascot/ToothCharacter'
import { snapshotToothColor } from '../mascot/toothRoles'
import { SmileSnapshotMap } from '../snapshot/SmileSnapshotMap'
import { isSameLocalDay } from '../../lib/dashboardHealth'
import { latestSnapshotSummary, type SnapshotAccent } from '../../lib/homeDashboard'
import { getSnapshotInsights } from '../../lib/snapshotInsights'
import { snapshotAgeLabel, snapshotPreviewLabel } from '../../lib/trends'
import type { ScanRecord } from '../../lib/types'
import { snapshotCardSurfaceClass, statusTextClass } from '../home/SnapshotCardVisual'

function statusDotClass(accent: SnapshotAccent): string {
  switch (accent) {
    case 'mint':
      return 'bg-[#52C470]'
    case 'amber':
      return 'bg-[#FF7A1A]'
    case 'coral':
      return 'bg-[#FF7A1A]'
    default:
      return 'bg-[#5E89ED]'
  }
}

export function ScanSnapshotPreview({
  lastScan,
  onOpen,
}: {
  lastScan: ScanRecord
  onOpen: () => void
}) {
  const summary = latestSnapshotSummary(lastScan)
  const insights = getSnapshotInsights(lastScan)
  const statusLabel = snapshotPreviewLabel(lastScan.risk)
  const checkedMeta = isSameLocalDay(lastScan.createdAt, Date.now())
    ? 'Checked today'
    : `Checked ${snapshotAgeLabel(lastScan.createdAt).toLowerCase()}`

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`w-full rounded-[1.125rem] px-3.5 py-3 text-left shadow-[0_4px_20px_-8px_rgba(27,35,48,0.06)] transition active:scale-[0.99] ${snapshotCardSurfaceClass(summary.accent)}`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
            Last snapshot
          </p>

          <p className="mt-1.5 flex items-center gap-2 font-heading text-[15px] font-semibold leading-snug">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${statusDotClass(summary.accent)}`}
              aria-hidden
            />
            <span className={statusTextClass(summary.accent)}>{statusLabel}</span>
          </p>

          <p className="mt-0.5 text-[13px] text-[#667085]">{checkedMeta}</p>

          <span className="mt-2 inline-flex text-[13px] font-semibold text-[#5E89ED]">
            View details →
          </span>
        </div>

        <div className="shrink-0 self-center">
          {insights.highlights.length > 0 ? (
            <div className="w-[52px] rounded-lg bg-[#FAFAFA] p-1 ring-1 ring-[#E8EEF2]/80">
              <SmileSnapshotMap highlights={insights.highlights} callouts={[]} mini />
            </div>
          ) : (
            <ToothCharacter color={snapshotToothColor(summary.accent)} size={44} />
          )}
        </div>
      </div>
    </button>
  )
}
