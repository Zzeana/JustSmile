import { addDaysKey } from './habitStreaks'
import type { HabitDay } from './types'

export type HabitField = 'brushedAm' | 'brushedPm' | 'flossed'
export type HabitKey = 'am' | 'pm' | 'floss'

export const HABIT_PREVIEW = [
  {
    key: 'am' as const,
    label: 'Morning Brush',
    subtitle: '2 minutes · after breakfast',
    field: 'brushedAm' as const,
    duration: '2 min',
  },
  {
    key: 'pm' as const,
    label: 'Night Brush',
    subtitle: '2 minutes · before bed',
    field: 'brushedPm' as const,
    duration: '2 min',
  },
  {
    key: 'floss' as const,
    label: 'Floss',
    subtitle: 'Once daily · floss or picks',
    field: 'flossed' as const,
    duration: 'Daily',
  },
] as const

export function getHabitStatusLine(
  field: HabitField,
  todayRow: HabitDay,
  args: { today: string; byDate: Map<string, HabitDay>; hour?: number },
): string {
  if (todayRow[field]) return 'Done today'

  const hour = args.hour ?? new Date().getHours()
  const habit = HABIT_PREVIEW.find((h) => h.field === field)
  const subtitle = habit?.subtitle ?? ''

  if (field === 'brushedPm' && hour < 17) {
    return 'Ready for tonight'
  }

  if (field === 'brushedAm' && hour < 12) {
    return subtitle
  }

  const yesterday = addDaysKey(args.today, -1)
  if (args.byDate.get(yesterday)?.[field]) {
    return 'Last done yesterday'
  }

  if (field === 'brushedPm') {
    return hour >= 17 ? 'Due today' : subtitle
  }

  if (field === 'flossed') {
    return 'Due today'
  }

  return 'Due today'
}

export function getTodayHabitsProgressMessage(done: number, total: number = HABIT_PREVIEW.length): string {
  if (done >= total) return 'All habits logged for today'
  if (done === 0) return 'Start with Morning Brush'
  if (done === total - 1) return 'One more habit to complete'
  return `${total - done} habits left today`
}
