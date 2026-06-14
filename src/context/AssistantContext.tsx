import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export type CoachLaunch = {
  prefill?: string
  intro?: string
  suggestedPrompts?: string[]
  source?: 'snapshot' | 'care' | 'concern' | 'general'
}

type AssistantContextValue = {
  sheetOpen: boolean
  sheetMode: 'menu' | 'care'
  openSheet: () => void
  openCareSheet: (prefill?: string) => void
  closeSheet: () => void
  launchCoach: (launch?: CoachLaunch) => void
  pendingLaunch: CoachLaunch | null
  clearPendingLaunch: () => void
}

const AssistantContext = createContext<AssistantContextValue | null>(null)

export function AssistantProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetMode, setSheetMode] = useState<'menu' | 'care'>('menu')
  const [pendingLaunch, setPendingLaunch] = useState<CoachLaunch | null>(null)

  const openSheet = useCallback(() => {
    setSheetMode('menu')
    setSheetOpen(true)
  }, [])

  const openCareSheet = useCallback((_prefill?: string) => {
    setSheetMode('care')
    setSheetOpen(true)
  }, [])

  const closeSheet = useCallback(() => {
    setSheetOpen(false)
    setSheetMode('menu')
  }, [])

  const launchCoach = useCallback(
    (launch?: CoachLaunch) => {
      setSheetOpen(false)
      if (launch) setPendingLaunch(launch)
      navigate('/coach', { state: launch ? { coachLaunch: launch } : undefined })
    },
    [navigate],
  )

  const clearPendingLaunch = useCallback(() => setPendingLaunch(null), [])

  const value = useMemo(
    () => ({
      sheetOpen,
      sheetMode,
      openSheet,
      openCareSheet,
      closeSheet,
      launchCoach,
      pendingLaunch,
      clearPendingLaunch,
    }),
    [sheetOpen, sheetMode, openSheet, openCareSheet, closeSheet, launchCoach, pendingLaunch, clearPendingLaunch],
  )

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>
}

export function useAssistant() {
  const ctx = useContext(AssistantContext)
  if (!ctx) throw new Error('useAssistant must be used within AssistantProvider')
  return ctx
}

export const DEFAULT_COACH_PROMPTS = [
  'My gums bleed when I floss.',
  "I'm nervous about going to the dentist.",
  'What does plaque mean?',
  'How often should I scan?',
  'Help me build a brushing routine.',
]

export const CARE_COACH_PROMPTS = [
  "I don't have insurance. Where should I start?",
  'What should I ask about cost?',
  'When should I seek urgent care?',
  "I'm nervous about calling a clinic.",
]

export const SNAPSHOT_COACH_PROMPTS = [
  'What does area to monitor mean?',
  'What can I do at home?',
  'When should I recheck?',
]
