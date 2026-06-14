import { isSameLocalDay } from './dashboardHealth'
import { HABIT_PREVIEW } from './habitCopy'
import {
  addDaysKey,
  currentBrushingStreak,
  dateKeyFromMs,
} from './habitStreaks'

export { HABIT_PREVIEW } from './habitCopy'
import { getSnapshotInsights } from './snapshotInsights'
import { snapshotAgeLabel, snapshotPreviewLabel } from './trends'
import type { HabitDay, ScanRecord } from './types'

export type SnapshotAccent = 'mint' | 'amber' | 'coral' | 'scan'

export function latestSnapshotSummary(record: ScanRecord): {
  statusLine: string
  metaLine: string
  accent: SnapshotAccent
} {
  const age = snapshotAgeLabel(record.createdAt)
  const metaLine = age === 'Today' ? 'Last checked today' : `Last checked ${age.toLowerCase()}`

  if (record.risk === 'high') {
    return {
      statusLine: 'Needs attention',
      metaLine,
      accent: 'coral',
    }
  }

  const monitorCount = getSnapshotInsights(record).highlights.filter((h) => h.tone === 'monitor').length

  if (monitorCount > 0 || record.risk === 'medium') {
    return {
      statusLine: 'Area worth monitoring',
      metaLine,
      accent: 'amber',
    }
  }

  return {
    statusLine: 'Looks healthy',
    metaLine,
    accent: 'mint',
  }
}

export type TimelineDotTone = 'mint' | 'orange' | 'blue'

export type TimelineItem = {
  id: string
  dateLabel: string
  statusLabel: string
  dotTone: TimelineDotTone
  record: ScanRecord
}

export function buildTimeline(scans: ScanRecord[], now = Date.now()): TimelineItem[] {
  if (scans.length === 0) return []

  const oldestId = scans[scans.length - 1]?.id
  const recent = scans.slice(0, 3)

  return recent.map((scan) => {
    const isFirst = scan.id === oldestId
    const dateLabel = isSameLocalDay(scan.createdAt, now)
      ? 'Today'
      : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(scan.createdAt))

    if (isFirst) {
      return {
        id: scan.id,
        dateLabel,
        statusLabel: 'First snapshot',
        dotTone: 'blue',
        record: scan,
      }
    }

    const statusLabel = snapshotPreviewLabel(scan.risk)
    const dotTone: TimelineDotTone =
      scan.risk === 'low' ? 'mint' : scan.risk === 'medium' || scan.risk === 'high' ? 'orange' : 'blue'

    return { id: scan.id, dateLabel, statusLabel, dotTone, record: scan }
  })
}

export type NextStepAction =
  | { type: 'mark'; field: 'brushedAm' | 'brushedPm' | 'flossed' }
  | { type: 'navigate'; path: string }

export type RecommendedNextStep = {
  copy: string
  cta: string
  action: NextStepAction
}

export function snapshotHasMonitorArea(record: ScanRecord): boolean {
  const accent = latestSnapshotSummary(record).accent
  return accent === 'amber' || accent === 'coral'
}

function habitsComplete(row: HabitDay): boolean {
  return row.brushedAm && row.brushedPm && row.flossed
}

function daysSinceScan(createdAt: number, now: number): number {
  return Math.floor((now - createdAt) / 86_400_000)
}

export function getHomeNextStep(todayRow: HabitDay, done: number): RecommendedNextStep {
  if (done >= HABIT_PREVIEW.length) {
    return {
      copy: 'All habits are logged for today.',
      cta: 'Review habits',
      action: { type: 'navigate', path: '/habits' },
    }
  }

  for (const { field } of HABIT_PREVIEW) {
    if (todayRow[field]) continue
    const copy =
      field === 'brushedAm'
        ? 'Start with Morning Brush.'
        : field === 'brushedPm'
          ? 'Night Brush is next.'
          : 'Finish today with Floss.'
    return {
      copy,
      cta: 'Mark complete',
      action: { type: 'mark', field },
    }
  }

  return {
    copy: 'All habits are logged for today.',
    cta: 'Review habits',
    action: { type: 'navigate', path: '/habits' },
  }
}

export type StreakDayState = 'upcoming' | 'inactive' | 'healthy' | 'monitor'

export type StreakDay = {
  key: string
  label: string
  dayOfMonth: number
  state: StreakDayState
  isToday: boolean
}

const WEEK_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const

export function buildSmileStreakWeek(args: {
  today: string
  scans: ScanRecord[]
}): { days: StreakDay[]; activeThisWeek: number } {
  const { today, scans } = args
  const todayDate = new Date(`${today}T12:00:00`)
  const sunday = addDaysKey(today, -todayDate.getDay())

  const scanByDay = new Map<string, ScanRecord>()
  for (const scan of scans) {
    const key = dateKeyFromMs(scan.createdAt)
    const prev = scanByDay.get(key)
    if (!prev || scan.createdAt > prev.createdAt) scanByDay.set(key, scan)
  }

  const days: StreakDay[] = []
  let activeThisWeek = 0

  for (let i = 0; i < 7; i++) {
    const key = addDaysKey(sunday, i)
    const isToday = key === today
    const isFuture = key > today
    const dayOfMonth = Number(key.split('-')[2])

    if (isFuture) {
      days.push({ key, label: WEEK_LABELS[i], dayOfMonth, state: 'upcoming', isToday })
      continue
    }

    const scan = scanByDay.get(key)
    if (scan) {
      activeThisWeek += 1
      if (snapshotHasMonitorArea(scan)) {
        days.push({ key, label: WEEK_LABELS[i], dayOfMonth, state: 'monitor', isToday })
      } else {
        days.push({ key, label: WEEK_LABELS[i], dayOfMonth, state: 'healthy', isToday })
      }
      continue
    }

    days.push({ key, label: WEEK_LABELS[i], dayOfMonth, state: 'inactive', isToday })
  }

  return { days, activeThisWeek }
}

export function getRecommendedNextStep(args: {
  scans: ScanRecord[]
  todayRow: HabitDay
  today: string
  habitByDate: Map<string, HabitDay>
  now?: number
}): RecommendedNextStep {
  const { scans, todayRow, today, habitByDate, now = Date.now() } = args
  const lastScan = scans[0]
  const brushingStreak = currentBrushingStreak(habitByDate, today)
  const hour = new Date(now).getHours()

  if (!todayRow.flossed) {
    return {
      copy: 'Finish today with Floss.',
      cta: 'Mark complete',
      action: { type: 'mark', field: 'flossed' },
    }
  }

  if (!todayRow.brushedPm && hour >= 12) {
    return {
      copy: 'Night Brush is next.',
      cta: 'Mark complete',
      action: { type: 'mark', field: 'brushedPm' },
    }
  }

  if (!todayRow.brushedAm && hour < 12) {
    return {
      copy: 'Start with Morning Brush.',
      cta: 'Mark complete',
      action: { type: 'mark', field: 'brushedAm' },
    }
  }

  if (lastScan && snapshotHasMonitorArea(lastScan) && habitsComplete(todayRow)) {
    return {
      copy: 'Review the area highlighted in your latest snapshot.',
      cta: 'View snapshot',
      action: { type: 'navigate', path: '/results' },
    }
  }

  if (!lastScan || daysSinceScan(lastScan.createdAt, now) >= 14) {
    return {
      copy: 'Time for a new Smile Snapshot.',
      cta: 'Start scan',
      action: { type: 'navigate', path: '/scan' },
    }
  }

  if (brushingStreak >= 2 && !todayRow.brushedAm && !todayRow.brushedPm) {
    return {
      copy: 'Keep your brushing streak going.',
      cta: 'Update habits',
      action: { type: 'navigate', path: '/habits' },
    }
  }

  if (lastScan && snapshotHasMonitorArea(lastScan)) {
    return {
      copy: 'Review the area highlighted in your latest snapshot.',
      cta: 'View snapshot',
      action: { type: 'navigate', path: '/results' },
    }
  }

  if (!todayRow.brushedPm) {
    return {
      copy: 'Night Brush is next.',
      cta: 'Mark complete',
      action: { type: 'mark', field: 'brushedPm' },
    }
  }

  return {
    copy: 'You’re on track today.',
    cta: 'View habits',
    action: { type: 'navigate', path: '/habits' },
  }
}

export function accentBorderClass(_accent: SnapshotAccent): string {
  return ''
}

export function timelineDotClass(tone: TimelineDotTone): string {
  switch (tone) {
    case 'mint':
      return 'bg-[#3A8F5D]'
    case 'orange':
      return 'bg-[#C45A00]'
    default:
      return 'bg-[#5E89ED]'
  }
}
