import type { TrendDirection } from './types'

export type HomeMomentum = 'improving' | 'consistent' | 'steady'

/**
 * Warm, non-clinical encouragement for the home dashboard.
 */
export function getHomeProgressFeedback(args: {
  brushingStreak: number
  scanTrend: TrendDirection
  habitDoneToday: number
}): {
  statusLine: string
  momentum: HomeMomentum
  momentumLabel: string
  momentumDetail: string
} {
  const { brushingStreak, scanTrend, habitDoneToday } = args

  let statusLine: string
  if (brushingStreak >= 7) {
    statusLine = "You're on track-love the dedication."
  } else if (brushingStreak >= 3) {
    statusLine = "You're on track-nice rhythm."
  } else if (brushingStreak >= 1) {
    statusLine = 'Keep it up-every day you brush is a win.'
  } else if (habitDoneToday > 0) {
    statusLine = 'Nice-already something logged for today.'
  } else {
    statusLine = 'Whenever you’re ready, a quick brush counts.'
  }

  let momentum: HomeMomentum
  let momentumLabel: string
  let momentumDetail: string

  if (scanTrend === 'improving') {
    momentum = 'improving'
    momentumLabel = 'Heading in a good direction'
    momentumDetail = 'Your recent snapshots look a little calmer-celebrate the small stuff.'
  } else if (scanTrend === 'worsening' && brushingStreak >= 2) {
    momentum = 'consistent'
    momentumLabel = 'Habits holding steady'
    momentumDetail = 'You’re still showing up-that matters while things shift.'
  } else if (brushingStreak >= 4 || (scanTrend === 'stable' && brushingStreak >= 2)) {
    momentum = 'consistent'
    momentumLabel = 'Nice consistency'
    momentumDetail = 'Regular brushing adds up, even when life gets busy.'
  } else {
    momentum = 'steady'
    momentumLabel = 'Room to grow-no rush'
    momentumDetail = 'Tiny habits stack up. One brush at a time is enough.'
  }

  return { statusLine, momentum, momentumLabel, momentumDetail }
}
