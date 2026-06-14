import type { RiskLevel, TrendDirection } from './types'

const rank: Record<RiskLevel, number> = {
  low: 1,
  medium: 2,
  high: 3,
}

export function computeTrend(levels: RiskLevel[]): TrendDirection {
  if (levels.length < 2) return 'unknown'
  const recent = levels.slice(0, 3)
  if (recent.length < 2) return 'unknown'
  const a = rank[recent[recent.length - 1]]
  const b = rank[recent[0]]
  if (b < a) return 'improving'
  if (b > a) return 'worsening'
  return 'stable'
}

export function riskLabel(r: RiskLevel): string {
  switch (r) {
    case 'low':
      return 'Low'
    case 'medium':
      return 'Medium'
    case 'high':
      return 'High'
    default:
      return r
  }
}

/** Non-diagnostic wording for badges and results (avoid clinical labels). */
export function friendlyRiskBadgeText(r: RiskLevel): string {
  switch (r) {
    case 'low':
      return 'Fewer signs of concern'
    case 'medium':
      return 'Possible signs of concern'
    case 'high':
      return 'Worth a closer look'
    default:
      return riskLabel(r)
  }
}

/** Short status line for snapshot history and summary headers. */
export function snapshotStatusLabel(r: RiskLevel): string {
  switch (r) {
    case 'low':
      return 'Looks mostly healthy'
    case 'medium':
      return 'Area to monitor'
    case 'high':
      return 'Worth extra attention'
    default:
      return friendlyRiskBadgeText(r)
  }
}

/** Compact label for scan page previews. */
export function snapshotPreviewLabel(r: RiskLevel): string {
  switch (r) {
    case 'low':
      return 'Looks healthy'
    case 'medium':
      return 'Area to monitor'
    case 'high':
      return 'Worth extra attention'
    default:
      return snapshotStatusLabel(r)
  }
}

function daysBetween(from: number, to: number): number {
  return Math.floor((to - from) / 86_400_000)
}

/** Relative time since a snapshot for scan page context. */
export function snapshotAgeLabel(createdAt: number, now = Date.now()): string {
  const days = daysBetween(createdAt, now)
  if (days <= 0) return 'Today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}
