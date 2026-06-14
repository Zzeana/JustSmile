import { Link, useNavigate } from 'react-router-dom'
import { ToothCharacter } from '../components/mascot/ToothCharacter'
import { Card, GradientScreen, MascotGlow, PrimaryButton } from '../components/ui/GradientScreen'
import { SmileMotif } from '../components/ui/SmileMotif'
import { habitMap, currentBrushingStreak } from '../lib/habitStreaks'
import { loadHabits, todayKey } from '../lib/storage'

function milestoneMessage(streak: number): { headline: string; body: string; next: string } {
  if (streak >= 14) {
    return {
      headline: 'Two weeks strong!',
      body: 'That kind of consistency really adds up. Your future self will thank you.',
      next: 'Keep your evening brush on the calendar tonight.',
    }
  }
  if (streak >= 7) {
    return {
      headline: 'One week milestone!',
      body: 'Seven days of showing up-that\'s real momentum. Small habits, big impact.',
      next: 'Log today\'s habits to keep the streak alive.',
    }
  }
  if (streak >= 3) {
    return {
      headline: 'Three-day streak!',
      body: 'You\'re building a rhythm. That\'s how lasting change starts.',
      next: 'Try the brushing coach for your next session.',
    }
  }
  return {
    headline: 'Great start!',
    body: 'Every brush counts. You\'re on your way to a healthier routine.',
    next: 'Log your next brush to build your streak.',
  }
}

export function Celebration() {
  const navigate = useNavigate()
  const today = todayKey()
  const habits = loadHabits()
  const byDate = habitMap(habits)
  const streak = Math.max(currentBrushingStreak(byDate, today), 3)
  const msg = milestoneMessage(streak)

  return (
    <GradientScreen variant="celebrate" className="min-h-full">
      <div className="flex min-h-[70dvh] flex-col items-center justify-center space-y-8 text-center">
        <MascotGlow tone="mint">
          <ToothCharacter color="green" size={132} />
        </MascotGlow>

        <SmileMotif className="h-4 w-28 text-[#52C470]" variant="both" />

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#52C470]">
            {streak}-day streak
          </p>
          <h1 className="type-h1 text-[#191919]">
            {msg.headline}
          </h1>
          <p className="type-body-lg text-[#667085]">{msg.body}</p>
        </div>

        <Card className="w-full max-w-sm text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">Next small step</p>
          <p className="mt-2 text-[15px] font-medium text-[#191919]">{msg.next}</p>
        </Card>

        <div className="flex w-full max-w-sm flex-col gap-3">
          <PrimaryButton onClick={() => navigate('/coach')}>Open brushing coach</PrimaryButton>
          <Link
            to="/habits"
            className="py-3 text-center text-sm font-semibold text-[#5E89ED]"
          >
            View all habits
          </Link>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="py-2 text-sm font-medium text-[#667085]"
          >
            Back to home
          </button>
        </div>
      </div>
    </GradientScreen>
  )
}
