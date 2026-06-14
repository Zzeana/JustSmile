import type { SnapshotAccent } from '../../lib/homeDashboard'
import { CARD_PAD, CARD_SHELL } from '../layout/pageLayout'

export function snapshotCardTone(accent: SnapshotAccent): 'healthy' | 'attention' | 'neutral' {
  switch (accent) {
    case 'mint':
      return 'healthy'
    case 'amber':
    case 'coral':
      return 'attention'
    default:
      return 'neutral'
  }
}

export function snapshotCardGradientClass(accent: SnapshotAccent): string {
  switch (snapshotCardTone(accent)) {
    case 'healthy':
      return 'bg-[linear-gradient(135deg,#D8E2F8_0%,#E9FFDB_100%)]'
    case 'attention':
      return 'bg-[linear-gradient(135deg,#FFDBA7_0%,#FFFFFF_100%)]'
    default:
      return 'bg-[linear-gradient(135deg,#D8E2F8_0%,#FFFFFF_100%)]'
  }
}

/** Flat semantic fills — used outside Home snapshot card */
export function snapshotCardSurfaceClass(accent: SnapshotAccent): string {
  switch (accent) {
    case 'mint':
      return 'bg-[#E9FFDB]'
    case 'amber':
    case 'coral':
      return 'bg-[#FFDBA7]'
    default:
      return 'bg-white'
  }
}

export const SNAPSHOT_CARD_EMPTY_GRADIENT =
  'bg-[linear-gradient(135deg,#D8E2F8_0%,#FFFFFF_100%)]'

export const SNAPSHOT_CARD_SHELL =
  `${CARD_SHELL} border-[#E8EEF2]/50 ${CARD_PAD}`

export function statusTextClass(accent: SnapshotAccent): string {
  switch (accent) {
    case 'mint':
      return 'text-[#3A8F5D]'
    case 'amber':
    case 'coral':
      return 'text-[#C45A00]'
    default:
      return 'text-[#191919]'
  }
}

export function snapshotEyebrowClass(accent: SnapshotAccent): string {
  switch (accent) {
    case 'mint':
      return 'text-[#3A8F5D]/70'
    case 'amber':
    case 'coral':
      return 'text-[#C45A00]/70'
    default:
      return 'text-[#667085]'
  }
}
