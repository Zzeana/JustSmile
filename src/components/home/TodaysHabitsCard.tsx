import { HabitsProgressCard } from '../habits/HabitsProgressCard'
import type { HabitDay } from '../../lib/types'

export function TodaysHabitsCard({ todayRow }: { todayRow: HabitDay }) {
  return <HabitsProgressCard todayRow={todayRow} title="Habits" showNavLink />
}
