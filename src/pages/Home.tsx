import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoachSupportCard } from '../components/home/CoachSupportCard'
import { HomeAtmosphere } from '../components/home/HomeAtmosphere'
import { EmptySnapshotCard, LatestSnapshotCard } from '../components/home/LatestSnapshotCard'
import { SmileStreakCard } from '../components/home/SmileStreakCard'
import { TodaysHabitsCard } from '../components/home/TodaysHabitsCard'
import { HOME_BODY, HOME_SHELL } from '../components/layout/pageLayout'
import { PageHeader } from '../components/layout/PageHeader'
import { GradientScreen } from '../components/ui/GradientScreen'
import { useAssistant, SNAPSHOT_COACH_PROMPTS } from '../context/AssistantContext'
import {
  buildSmileStreakWeek,
  latestSnapshotSummary,
  snapshotHasMonitorArea,
} from '../lib/homeDashboard'
import { loadHabits, loadScans, todayKey } from '../lib/storage'
import type { HabitDay } from '../lib/types'
import { timeGreeting } from '../lib/userProfile'

export function Home() {
  const navigate = useNavigate()
  const { launchCoach } = useAssistant()

  const scans = loadScans()
  const habits = loadHabits()
  const today = todayKey()
  const lastScan = scans[0]

  const todayRow: HabitDay =
    habits.find((h) => h.date === today) ?? {
      date: today,
      brushedAm: false,
      brushedPm: false,
      flossed: false,
    }

  const snapshotSummary = lastScan ? latestSnapshotSummary(lastScan) : null
  const hasMonitorConcern = lastScan ? snapshotHasMonitorArea(lastScan) : false

  const streak = useMemo(
    () => buildSmileStreakWeek({ today, scans }),
    [today, scans],
  )

  function askCoach() {
    if (hasMonitorConcern && lastScan) {
      launchCoach({
        source: 'snapshot',
        intro: 'I noticed an area worth monitoring. What would you like to know?',
        prefill: 'I noticed an area worth monitoring on my snapshot. What should I know?',
        suggestedPrompts: SNAPSHOT_COACH_PROMPTS,
      })
      return
    }
    navigate('/coach')
  }

  return (
    <GradientScreen className="relative min-h-full overflow-x-clip">
      <HomeAtmosphere />

      <div className={HOME_SHELL}>
        <PageHeader title={timeGreeting()} showProfile />

        <div className={HOME_BODY}>
          {lastScan && snapshotSummary ? (
            <LatestSnapshotCard
              record={lastScan}
              statusLine={snapshotSummary.statusLine}
              metaLine={snapshotSummary.metaLine}
              accent={snapshotSummary.accent}
            />
          ) : (
            <EmptySnapshotCard />
          )}

          <TodaysHabitsCard todayRow={todayRow} />

          <SmileStreakCard days={streak.days} activeThisWeek={streak.activeThisWeek} />

          <CoachSupportCard hasMonitorConcern={hasMonitorConcern} onAsk={askCoach} />
        </div>
      </div>
    </GradientScreen>
  )
}
