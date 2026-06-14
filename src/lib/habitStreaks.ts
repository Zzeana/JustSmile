import type { HabitDay } from './types'

/** Local calendar date as YYYY-MM-DD */
export function addDaysKey(key: string, deltaDays: number): string {
  const [y, m, d] = key.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() + deltaDays)
  return formatDateKey(dt)
}

function formatDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function dateKeyFromMs(ms: number): string {
  return formatDateKey(new Date(ms))
}

export function habitMap(habits: HabitDay[]): Map<string, HabitDay> {
  return new Map(habits.map((h) => [h.date, h]))
}

export function isFullHabitDay(h: HabitDay | undefined): boolean {
  return !!h && h.brushedAm && h.brushedPm && h.flossed
}

/** Logged habits or explicit daily check-in */
export function hasDailyActivity(h: HabitDay | undefined): boolean {
  return !!h && (h.checkedIn || h.brushedAm || h.brushedPm || h.flossed)
}

/**
 * Consecutive days with all three habits, counting backward from today.
 * If today isn’t complete yet, counts from yesterday so an in-progress day doesn’t zero the streak.
 */
export function currentFullStreak(byDate: Map<string, HabitDay>, today: string): number {
  let startOffset = 0
  if (!isFullHabitDay(byDate.get(today))) startOffset = 1

  let streak = 0
  for (let i = startOffset; i < 730; i++) {
    const key = addDaysKey(today, -i)
    if (isFullHabitDay(byDate.get(key))) streak++
    else break
  }
  return streak
}

/** Consecutive days with at least one habit logged (or explicit check-in). */
/** At least one brush (morning or evening) logged that day */
function dayHasBrushing(h: HabitDay | undefined): boolean {
  return !!h && (h.brushedAm || h.brushedPm)
}

/**
 * Consecutive days with brushing logged (AM or PM). If today has none yet, counts from yesterday.
 */
export function currentBrushingStreak(byDate: Map<string, HabitDay>, today: string): number {
  let startOffset = 0
  if (!dayHasBrushing(byDate.get(today))) startOffset = 1

  let streak = 0
  for (let i = startOffset; i < 730; i++) {
    const key = addDaysKey(today, -i)
    if (dayHasBrushing(byDate.get(key))) streak++
    else break
  }
  return streak
}

export function currentCheckInStreak(byDate: Map<string, HabitDay>, today: string): number {
  let startOffset = 0
  if (!hasDailyActivity(byDate.get(today))) startOffset = 1

  let streak = 0
  for (let i = startOffset; i < 730; i++) {
    const key = addDaysKey(today, -i)
    if (hasDailyActivity(byDate.get(key))) streak++
    else break
  }
  return streak
}

export function currentFieldStreak(
  byDate: Map<string, HabitDay>,
  today: string,
  field: 'brushedAm' | 'brushedPm' | 'flossed',
): number {
  let startOffset = 0
  if (!byDate.get(today)?.[field]) startOffset = 1

  let streak = 0
  for (let i = startOffset; i < 730; i++) {
    const key = addDaysKey(today, -i)
    if (byDate.get(key)?.[field]) streak++
    else break
  }
  return streak
}

/** Longest run of consecutive full days in stored history. */
export function bestFullStreak(habits: HabitDay[]): number {
  const dates = [...new Set(habits.filter(isFullHabitDay).map((h) => h.date))].sort()
  if (dates.length === 0) return 0

  let best = 1
  let run = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = dates[i - 1]
    const cur = dates[i]
    if (!prev || !cur) continue
    if (addDaysKey(prev, 1) === cur) {
      run += 1
      best = Math.max(best, run)
    } else {
      run = 1
    }
  }
  return best
}

/** Days in the rolling window [today - (n-1), today] with any activity. */
export function checkInsInLastNDays(
  byDate: Map<string, HabitDay>,
  today: string,
  n: number,
): number {
  let count = 0
  for (let i = 0; i < n; i++) {
    const key = addDaysKey(today, -i)
    if (hasDailyActivity(byDate.get(key))) count++
  }
  return count
}

export type WeekDot = {
  key: string
  label: string
  dayOfMonth: number
  isToday: boolean
  state: 'empty' | 'partial' | 'full'
}

/** Last 7 local days including today (oldest → newest for display). */
export function last7DayDots(byDate: Map<string, HabitDay>, today: string): WeekDot[] {
  const out: WeekDot[] = []
  for (let i = 6; i >= 0; i--) {
    const key = addDaysKey(today, -i)
    const row = byDate.get(key)
    const full = isFullHabitDay(row)
    const partial = hasDailyActivity(row) && !full
    const dt = new Date(key + 'T12:00:00')
    const label = dt.toLocaleDateString(undefined, { weekday: 'narrow' })
    out.push({
      key,
      label,
      dayOfMonth: dt.getDate(),
      isToday: key === today,
      state: full ? 'full' : partial ? 'partial' : 'empty',
    })
  }
  return out
}
