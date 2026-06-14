import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/GradientScreen'
import { HABIT_PREVIEW } from '../../lib/habitCopy'
import { loadHabits, todayKey, upsertHabit } from '../../lib/storage'
import type { HabitDay } from '../../lib/types'

const HABIT_STYLE: Record<
  (typeof HABIT_PREVIEW)[number]['key'],
  {
    icon: 'am' | 'pm' | 'floss'
    fill: string
    completeFill: string
    iconClass: string
  }
> = {
  am: {
    icon: 'am',
    fill: 'bg-[#FFF4E8]',
    completeFill: 'bg-[#E9FFDB]',
    iconClass: 'h-8 w-8',
  },
  pm: {
    icon: 'pm',
    fill: 'bg-[#EBF3FF]',
    completeFill: 'bg-[#E9FFDB]',
    iconClass: 'h-8 w-8',
  },
  floss: {
    icon: 'floss',
    fill: 'bg-[#FFF2F7]',
    completeFill: 'bg-[#E9FFDB]',
    iconClass: 'h-11 w-11',
  },
}

function HabitsHeaderIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-[#191919]" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M6 5.5h8M6 10h8M6 14.5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.5 5.5 4.75 6.75 7 4.5M3.5 10l1.25 1.25L7 8M3.5 14.5 4.75 15.75 7 13.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HabitIcon({ type, className }: { type: 'am' | 'pm' | 'floss'; className?: string }) {
  if (type === 'am') {
    return <img src="/habit-sun.png" alt="" className={className} aria-hidden />
  }
  if (type === 'pm') {
    return <img src="/habit-moon.png" alt="" className={className} aria-hidden />
  }
  return <img src="/habit-floss.png" alt="" className={className} aria-hidden />
}

function progressLabel(done: number, total: number): string {
  return `${done}/${total}`
}

export function HabitsProgressCard({
  todayRow: initialRow,
  title = 'Habits',
  showNavLink = false,
}: {
  todayRow: HabitDay
  title?: string
  showNavLink?: boolean
}) {
  const [, setTick] = useState(0)
  const today = todayKey()
  const habits = loadHabits()
  const todayRow =
    habits.find((h) => h.date === today) ?? {
      ...initialRow,
      date: today,
    }

  const done = HABIT_PREVIEW.filter(({ field }) => todayRow[field]).length
  const total = HABIT_PREVIEW.length

  function toggle(field: (typeof HABIT_PREVIEW)[number]['field']) {
    upsertHabit({ ...todayRow, [field]: !todayRow[field], date: today })
    setTick((x) => x + 1)
  }

  return (
    <Card tone="white">
      <div className="flex items-center gap-2">
        <HabitsHeaderIcon />
        <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-[#191919]">{title}</h2>
        <span className="rounded-full bg-[#E9FFDB] px-2 py-0.5 text-[11px] font-semibold tabular-nums text-[#3A8F5D]">
          {progressLabel(done, total)}
        </span>
        {showNavLink && (
          <>
            <div className="min-w-0 flex-1" aria-hidden />
            <Link
              to="/habits"
              className="flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-full bg-[#F3F4F6] text-[#667085] transition hover:bg-[#E8EEF2] hover:text-[#191919]"
              aria-label="View all habits"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </>
        )}
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-2">
        {HABIT_PREVIEW.map(({ key, label, field }) => {
          const complete = todayRow[field]
          const style = HABIT_STYLE[key]

          return (
            <li key={key} className="min-w-0">
              <button
                type="button"
                onClick={() => toggle(field)}
                aria-pressed={complete}
                className="group flex w-full flex-col items-center gap-2.5"
              >
                <span
                  className={[
                    'relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full transition-colors',
                    complete ? style.completeFill : style.fill,
                  ].join(' ')}
                >
                  <HabitIcon
                    type={style.icon}
                    className={[
                      style.iconClass,
                      'object-contain transition-opacity',
                      complete ? 'opacity-90' : 'opacity-100',
                    ].join(' ')}
                  />
                  {complete && (
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#52C470] text-[10px] font-bold text-white ring-2 ring-white">
                      ✓
                    </span>
                  )}
                </span>
                <span
                  className={[
                    'max-w-full px-0.5 text-center text-[12px] leading-tight',
                    complete ? 'font-medium text-[#3A8F5D]' : 'text-[#667085]',
                  ].join(' ')}
                >
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
