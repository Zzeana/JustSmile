import { Link } from 'react-router-dom'
import type { SnapshotAccent } from '../../lib/homeDashboard'
import type { ScanRecord } from '../../lib/types'
import {
  SNAPSHOT_CARD_EMPTY_GRADIENT,
  SNAPSHOT_CARD_SHELL,
  snapshotCardGradientClass,
  snapshotCardTone,
  snapshotEyebrowClass,
  statusTextClass,
} from './SnapshotCardVisual'

function SnapshotCardIcon({ src, large = false }: { src: string; large?: boolean }) {
  return (
    <div className="flex shrink-0 items-center justify-center self-center">
      <img
        src={src}
        alt=""
        width={large ? 120 : 88}
        height={large ? 120 : 88}
        draggable={false}
        aria-hidden
        className={[ 'object-contain', large ? 'h-[7.5rem] w-[7.5rem]' : 'h-[5.5rem] w-[5.5rem]' ].join(' ')}
      />
    </div>
  )
}

function MonitorIcon() {
  return <SnapshotCardIcon src="/snapshot-monitor-icon.png" />
}

function CameraIcon() {
  return <SnapshotCardIcon src="/snapshot-camera-icon.png" large />
}

function SnapshotEyebrow({ accent }: { accent?: SnapshotAccent }) {
  return (
    <p
      className={[
        'text-[11px] font-semibold uppercase tracking-[0.08em]',
        accent ? snapshotEyebrowClass(accent) : 'text-[#667085]',
      ].join(' ')}
    >
      Latest Snapshot
    </p>
  )
}

function SnapshotLink({ to, children, state }: { to: string; children: React.ReactNode; state?: object }) {
  return (
    <Link
      to={to}
      state={state}
      className="mt-3 inline-flex text-[14px] font-semibold text-[#5E89ED] transition hover:text-[#4A75D9]"
    >
      {children}
    </Link>
  )
}

export function LatestSnapshotCard({
  record,
  statusLine,
  metaLine,
  accent,
}: {
  record: ScanRecord
  statusLine: string
  metaLine: string
  accent: SnapshotAccent
}) {
  const showMonitorIcon = snapshotCardTone(accent) === 'attention'

  return (
    <div className={[SNAPSHOT_CARD_SHELL, snapshotCardGradientClass(accent)].join(' ')}>
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <SnapshotEyebrow accent={accent} />
          <p
            className={`mt-2 text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] ${statusTextClass(accent)}`}
          >
            {statusLine}
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-[#667085]">{metaLine}</p>
          <SnapshotLink to="/results" state={{ record }}>
            View details →
          </SnapshotLink>
        </div>

        {showMonitorIcon && <MonitorIcon />}
      </div>
    </div>
  )
}

export function EmptySnapshotCard() {
  return (
    <div className={[SNAPSHOT_CARD_SHELL, SNAPSHOT_CARD_EMPTY_GRADIENT].join(' ')}>
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <SnapshotEyebrow />
          <p className="mt-2 text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-[#191919]">
            Start your first snapshot
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-[#667085]">Takes about a minute</p>
          <SnapshotLink to="/scan">Start scan →</SnapshotLink>
        </div>

        <CameraIcon />
      </div>
    </div>
  )
}
