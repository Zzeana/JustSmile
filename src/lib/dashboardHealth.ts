import type { HabitDay, RiskLevel } from './types'

export function habitCompletion(day: HabitDay | undefined): { done: number; total: number } {
  if (!day) return { done: 0, total: 3 }
  let done = 0
  if (day.brushedAm) done += 1
  if (day.brushedPm) done += 1
  if (day.flossed) done += 1
  return { done, total: 3 }
}

export function isSameLocalDay(a: number, b: number): boolean {
  const da = new Date(a)
  const db = new Date(b)
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  )
}

export type DailyTone = 'positive' | 'steady' | 'gentle'

export function dailyOralStatus(args: {
  habitDone: number
  habitTotal: number
  lastRisk: RiskLevel | null
  scannedToday: boolean
}): { headline: string; sub: string; tone: DailyTone } {
  const { habitDone, habitTotal, lastRisk, scannedToday } = args
  const habitPct = habitTotal === 0 ? 0 : habitDone / habitTotal

  if (!lastRisk && habitDone === 0) {
    return {
      headline: 'Start your snapshot',
      sub: 'Log today’s habits or run a quick check to see how you’re doing.',
      tone: 'gentle',
    }
  }

  if (lastRisk === 'high') {
    return {
      headline: 'Extra care today',
      sub: scannedToday
        ? 'Thanks for checking in. Keep habits gentle and reach out for care if symptoms worsen.'
        : 'Your last check-in suggested following up. A Quick Check can help you track changes.',
      tone: 'gentle',
    }
  }

  if (habitPct >= 1 && (lastRisk === 'low' || !lastRisk)) {
    return {
      headline: 'Great rhythm today',
      sub:
        lastRisk === 'low'
          ? 'Habits are logged and your last scan looked calm-nice work.'
          : 'Habits are on track. Add a scan anytime to update your snapshot.',
      tone: 'positive',
    }
  }

  if (habitPct >= 1 && lastRisk === 'medium') {
    return {
      headline: 'Solid habits',
      sub: 'You’re staying consistent. A scan can help you notice changes early.',
      tone: 'steady',
    }
  }

  if (habitPct >= 2 / 3) {
    return {
      headline: 'Almost there',
      sub: 'One more habit ticks the box for today-small steps add up.',
      tone: 'steady',
    }
  }

  if (habitPct > 0) {
    return {
      headline: 'Building momentum',
      sub: 'Every brush and floss counts. Finish today’s list when you can.',
      tone: 'steady',
    }
  }

  return {
    headline: 'Fresh day',
    sub:
      lastRisk === 'low'
        ? 'Your last scan looked steady-logging habits keeps the full picture clear.'
        : 'Log habits or run a Quick Check to stay ahead of surprises.',
    tone: 'gentle',
  }
}
