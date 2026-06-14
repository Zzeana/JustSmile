import { Card } from '../ui/GradientScreen'
import type { WeekDot } from '../../lib/habitStreaks'

function TodayMarker() {
  return (
    <svg className="h-2.5 w-2.5 text-[#191919]" viewBox="0 0 12 8" fill="currentColor" aria-hidden>
      <path d="M6 8 0 0h12L6 8Z" />
    </svg>
  )
}

function HabitDayPill({ day }: { day: WeekDot }) {
  const pillClass =
    'flex h-[3.75rem] w-full min-w-[2.125rem] max-w-[2.625rem] flex-col items-center justify-start rounded-[1.375rem] pt-1.5'

  if (day.isToday) {
    return (
      <div className={`${pillClass} bg-[#C8D6F6]`} aria-current="date">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5E89ED] text-[13px] font-semibold tabular-nums text-white">
          {day.dayOfMonth}
        </span>
      </div>
    )
  }

  const palette = {
    empty: { shell: 'bg-[#F0F3FA]', text: 'text-[#B4C4EF]' },
    partial: { shell: 'bg-[#E4EAFA]', text: 'text-[#8FA3E8]' },
    full: { shell: 'bg-[#D8E2F8]', text: 'text-[#5E89ED]' },
  }[day.state]

  return (
    <div className={`${pillClass} ${palette.shell}`}>
      <span className={`flex h-7 w-7 items-center justify-center text-[13px] font-medium tabular-nums ${palette.text}`}>
        {day.dayOfMonth}
      </span>
    </div>
  )
}

export function HabitWeekCard({ days }: { days: WeekDot[] }) {
  const todayKey = days.find((d) => d.isToday)?.key ?? days[days.length - 1]?.key
  const monthYear = todayKey
    ? new Date(`${todayKey}T12:00:00`).toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      })
    : ''

  const loggedDays = days.filter((d) => d.state !== 'empty').length
  const subtitle =
    loggedDays === 1 ? '1 day logged this week' : `${loggedDays} days logged this week`

  return (
    <Card tone="white">
      <h2 className="type-section text-[#191919]">This Week</h2>
      <p className="mt-1 text-[13px] text-[#667085]">{subtitle}</p>

      {monthYear && (
        <div className="mt-4 flex justify-center">
          <span className="text-[12px] font-medium text-[#8B95A5]">{monthYear}</span>
        </div>
      )}

      <div className="mt-4 grid grid-cols-7 gap-1 px-0.5">
        {days.map((day) => (
          <div key={day.key} className="flex flex-col items-center gap-1.5">
            <div className="flex h-3.5 items-center justify-center">
              {day.isToday ? (
                <TodayMarker />
              ) : (
                <span className="text-[11px] font-medium text-[#8B95A5]">{day.label}</span>
              )}
            </div>
            <HabitDayPill day={day} />
          </div>
        ))}
      </div>
    </Card>
  )
}
