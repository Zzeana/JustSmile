import { Link } from 'react-router-dom'
import { Card } from '../ui/GradientScreen'
import type { StreakDay } from '../../lib/homeDashboard'

function TodayMarker() {
  return (
    <svg className="h-2.5 w-2.5 text-[#191919]" viewBox="0 0 12 8" fill="currentColor" aria-hidden>
      <path d="M6 8 0 0h12L6 8Z" />
    </svg>
  )
}

function DayPill({ day }: { day: StreakDay }) {
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

  if (day.state === 'upcoming') {
    return (
      <div className={`${pillClass} bg-[#F0F3FA]`}>
        <span className="flex h-7 w-7 items-center justify-center text-[13px] font-medium tabular-nums text-[#B4C4EF]">
          {day.dayOfMonth}
        </span>
      </div>
    )
  }

  const palette = {
    inactive: { shell: 'bg-[#F0F3FA]', text: 'text-[#B4C4EF]' },
    healthy: { shell: 'bg-[#E4EAFA]', text: 'text-[#8FA3E8]' },
    monitor: { shell: 'bg-[#D8E2F8]', text: 'text-[#5E89ED]' },
  }[day.state]

  return (
    <div className={`${pillClass} ${palette.shell}`}>
      <span className={`flex h-7 w-7 items-center justify-center text-[13px] font-medium tabular-nums ${palette.text}`}>
        {day.dayOfMonth}
      </span>
    </div>
  )
}

export function SmileStreakCard({
  days,
  activeThisWeek,
}: {
  days: StreakDay[]
  activeThisWeek: number
}) {
  const todayKey = days.find((d) => d.isToday)?.key ?? days[0]?.key
  const monthYear = todayKey
    ? new Date(`${todayKey}T12:00:00`).toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      })
    : ''

  const subtitle =
    activeThisWeek === 1
      ? '1 snapshot this week'
      : `${activeThisWeek} snapshots this week`

  return (
    <Card tone="white">
      <h2 className="type-section text-[#191919]">Smile Calendar</h2>
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
            <DayPill day={day} />
          </div>
        ))}
      </div>

      <Link
        to="/scan"
        state={{ showHistory: true }}
        className="mt-4 inline-flex text-[14px] font-semibold text-[#5E89ED] transition hover:text-[#4A75D9]"
      >
        View history →
      </Link>
    </Card>
  )
}
