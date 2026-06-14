import { Link } from 'react-router-dom'
import { HabitWeekCard } from '../components/habits/HabitWeekCard'
import { HabitsProgressCard } from '../components/habits/HabitsProgressCard'
import { PageHeader } from '../components/layout/PageHeader'
import { PAGE_BODY, PAGE_SHELL } from '../components/layout/pageLayout'
import { GradientScreen } from '../components/ui/GradientScreen'
import { loadHabits, todayKey } from '../lib/storage'
import { habitMap, last7DayDots } from '../lib/habitStreaks'

export function Habits() {
  const today = todayKey()
  const habits = loadHabits()
  const byDate = habitMap(habits)

  const todayRow =
    habits.find((h) => h.date === today) ?? {
      date: today,
      brushedAm: false,
      brushedPm: false,
      flossed: false,
    }

  const weekDots = last7DayDots(byDate, today)

  return (
    <GradientScreen className="min-h-full">
      <div className={PAGE_SHELL}>
        <PageHeader title="Build habits" />

        <div className={PAGE_BODY}>
          <HabitsProgressCard todayRow={todayRow} title="Today's Progress" />

          <HabitWeekCard days={weekDots} />

          <Link
            to="/coach"
            className="flex items-center justify-center gap-1 py-1 text-sm font-semibold text-[#5E89ED]"
          >
            Open Brushing Coach
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </GradientScreen>
  )
}
