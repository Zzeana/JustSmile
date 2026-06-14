import type { SnapshotAccent } from '../../lib/homeDashboard'
import type { RecommendedNextStep } from '../../lib/homeDashboard'
import type { RiskLevel } from '../../lib/types'
import type { ToothColor } from './ToothCharacter'

/** Standard sizes for card accents — keep consistent across screens. */
export const TOOTH_CARD_SIZE = 40
export const TOOTH_HEADER_SIZE = 44
export const TOOTH_COACH_SIZE = 48

/** Scan=blue · Habits=mint · Coach=lavender · Care=teal · Monitor=orange · Tips=yellow · Reassurance=pink */
export const TOOTH_ROLES = {
  scan: 'blue',
  habits: 'green',
  support: 'coach',
  care: 'teal',
  monitor: 'orange',
  learning: 'yellow',
  reassurance: 'pink',
} as const satisfies Record<string, ToothColor>

export function snapshotToothColor(accent: SnapshotAccent): ToothColor {
  if (accent === 'amber' || accent === 'coral') return TOOTH_ROLES.monitor
  if (accent === 'mint') return TOOTH_ROLES.habits
  return TOOTH_ROLES.scan
}

export function resultsToothColor(risk: RiskLevel): ToothColor {
  if (risk === 'low') return TOOTH_ROLES.habits
  if (risk === 'medium' || risk === 'high') return TOOTH_ROLES.monitor
  return TOOTH_ROLES.scan
}

export function nextStepToothColor(step: RecommendedNextStep): ToothColor {
  if (step.action.type === 'mark') return TOOTH_ROLES.habits
  if (step.action.path === '/results') return TOOTH_ROLES.monitor
  if (step.action.path === '/habits') return TOOTH_ROLES.habits
  if (step.action.path === '/scan') return TOOTH_ROLES.monitor
  return TOOTH_ROLES.monitor
}

export function encouragementToothColor(done: number, total: number): ToothColor {
  if (done === 0) return TOOTH_ROLES.reassurance
  if (done >= total) return TOOTH_ROLES.habits
  return TOOTH_ROLES.habits
}
