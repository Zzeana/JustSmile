export type RiskLevel = 'low' | 'medium' | 'high'

export type TrendDirection = 'improving' | 'stable' | 'worsening' | 'unknown'

export interface ScanRecord {
  id: string
  createdAt: number
  risk: RiskLevel
  summary: string
  explanation: string
  steps: string[]
  /** Optional thumbnail (compressed) for history UI; omitted if user declined storage */
  thumbDataUrl?: string
}

export interface HabitDay {
  date: string // YYYY-MM-DD local
  brushedAm: boolean
  brushedPm: boolean
  flossed: boolean
  /** Optional tap when you showed up today but haven’t logged habits yet */
  checkedIn?: boolean
}

/** User goals selected during onboarding (multi-select). */
export type OnboardingGoalId =
  | 'concern'
  | 'hygiene'
  | 'anxiety'
  | 'cost'
  | 'habits'
