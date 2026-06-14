import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CoachChatPanel } from '../components/assistant/CoachChatPanel'
import { BrushingCoachSession } from '../components/brushing/BrushingCoachSession'
import { PageHeader } from '../components/layout/PageHeader'
import { CARD_PAD, PAGE_BODY, PAGE_SHELL } from '../components/layout/pageLayout'
import { CardToothHeader } from '../components/mascot/ToothAccent'
import { TOOTH_ROLES } from '../components/mascot/toothRoles'
import { GradientScreen } from '../components/ui/GradientScreen'
import {
  CARE_COACH_PROMPTS,
  DEFAULT_COACH_PROMPTS,
  SNAPSHOT_COACH_PROMPTS,
  type CoachLaunch,
} from '../context/AssistantContext'

type LocationState = { coachLaunch?: CoachLaunch }

export function Coach() {
  const location = useLocation()
  const [launch] = useState<CoachLaunch | null>(() => {
    const state = location.state as LocationState | null
    return state?.coachLaunch ?? null
  })

  const suggestedPrompts = useMemo(() => {
    if (launch?.suggestedPrompts?.length) return launch.suggestedPrompts
    if (launch?.source === 'snapshot') return SNAPSHOT_COACH_PROMPTS
    if (launch?.source === 'care') return CARE_COACH_PROMPTS
    return DEFAULT_COACH_PROMPTS
  }, [launch])

  useEffect(() => {
    if (launch) {
      window.history.replaceState({}, document.title)
    }
  }, [launch])

  return (
    <GradientScreen className="min-h-full">
      <div className={PAGE_SHELL}>
        <PageHeader title="Smile Coach" />

        <div className={PAGE_BODY}>
          <section className={`rounded-[1.375rem] bg-white ${CARD_PAD} shadow-[0_1px_2px_rgba(25,25,25,0.04),0_4px_20px_-6px_rgba(25,25,25,0.06)]`}>
            <CoachChatPanel launch={launch} suggestedPrompts={suggestedPrompts} />
          </section>

          <section className={`space-y-3 rounded-[1.375rem] bg-white ${CARD_PAD} shadow-[0_1px_2px_rgba(25,25,25,0.04),0_4px_20px_-6px_rgba(25,25,25,0.06)]`}>
            <CardToothHeader color={TOOTH_ROLES.habits} title="Brushing coach" />
            <BrushingCoachSession embedded />
          </section>
        </div>
      </div>
    </GradientScreen>
  )
}
