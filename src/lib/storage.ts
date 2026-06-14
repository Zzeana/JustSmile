import type { HabitDay, OnboardingGoalId, ScanRecord } from './types'

const SCANS_KEY = 'justsmile_scans_v1'
const HABITS_KEY = 'justsmile_habits_v1'
const ONBOARDING_KEY = 'justsmile_onboarding_done'
const ONBOARDING_GOALS_KEY = 'justsmile_onboarding_goals_v1'

export function getOnboardingDone(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === '1'
  } catch {
    return false
  }
}

export function setOnboardingDone(): void {
  try {
    localStorage.setItem(ONBOARDING_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function saveOnboardingGoals(goals: OnboardingGoalId[]): void {
  try {
    localStorage.setItem(ONBOARDING_GOALS_KEY, JSON.stringify(goals))
  } catch {
    /* ignore */
  }
}

export function loadOnboardingGoals(): OnboardingGoalId[] {
  try {
    const raw = localStorage.getItem(ONBOARDING_GOALS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as OnboardingGoalId[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function loadScans(): ScanRecord[] {
  try {
    const raw = localStorage.getItem(SCANS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ScanRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveScan(record: ScanRecord): void {
  const prev = loadScans()
  const next = [record, ...prev].slice(0, 60)
  try {
    localStorage.setItem(SCANS_KEY, JSON.stringify(next))
  } catch {
    /* quota or private mode */
  }
}

export function loadHabits(): HabitDay[] {
  try {
    const raw = localStorage.getItem(HABITS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as HabitDay[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function upsertHabit(day: HabitDay): void {
  const prev = loadHabits().filter((d) => d.date !== day.date)
  prev.push(day)
  prev.sort((a, b) => (a.date < b.date ? 1 : -1))
  try {
    localStorage.setItem(HABITS_KEY, JSON.stringify(prev.slice(0, 120)))
  } catch {
    /* ignore */
  }
}

export function todayKey(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
