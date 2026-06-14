import type { HabitDay, RiskLevel } from './types'
import { loadOnboardingGoals } from './storage'

export type BrushingSessionInsight = {
  /** Friendly line shown at the top of the coach */
  headline: string
  /** Extra encouragement */
  subline?: string
  /** Emphasize gum-line technique in quadrant hints */
  emphasizeGums: boolean
  /** Emphasize back teeth / thoroughness */
  emphasizeBackTeeth: boolean
}

function oftenSkipsEveningBrush(habits: HabitDay[]): boolean {
  const recent = habits.slice(0, 10)
  if (recent.length < 3) return false
  let skips = 0
  for (const d of recent) {
    if (hasAnyBrush(d) && !d.brushedPm) skips += 1
  }
  return skips >= 2
}

function hasAnyBrush(d: HabitDay): boolean {
  return d.brushedAm || d.brushedPm
}

/**
 * Combines last scan signals, habits, and goals into supportive copy.
 * Not clinical advice-wellness coaching tone only.
 */
export function getBrushingSessionInsight(args: {
  lastRisk: RiskLevel | null
  habits: HabitDay[]
  trendWorsening: boolean
}): BrushingSessionInsight {
  const goals = loadOnboardingGoals()
  const { lastRisk, habits, trendWorsening } = args
  const eveningPattern = oftenSkipsEveningBrush(habits)
  const wantsHygiene = goals.includes('hygiene')
  const wantsAnxiety = goals.includes('anxiety')

  const backTeethSignal = eveningPattern || lastRisk === 'high'

  if (lastRisk === 'medium' || lastRisk === 'high' || trendWorsening) {
    return {
      headline: 'Focus on your gums today-think soft circles where tooth meets gum.',
      subline: 'No need to scrub hard; you’re doing great just by showing up.',
      emphasizeGums: true,
      emphasizeBackTeeth: backTeethSignal,
    }
  }

  if (backTeethSignal) {
    return {
      headline: 'Be sure to brush your back teeth-molars love a little extra time.',
      subline: 'Reach the chewing surfaces and those tucked-away corners.',
      emphasizeGums: wantsHygiene,
      emphasizeBackTeeth: true,
    }
  }

  if (wantsAnxiety) {
    return {
      headline: 'You’ve got two minutes-there’s no rush, only steady, kind strokes.',
      subline: 'Breathe, move the brush slowly, and we’ll guide each section.',
      emphasizeGums: false,
      emphasizeBackTeeth: false,
    }
  }

  if (wantsHygiene) {
    return {
      headline: 'Let’s make these two minutes count-fresh and gentle wins.',
      subline: 'We’ll move through each zone together.',
      emphasizeGums: true,
      emphasizeBackTeeth: false,
    }
  }

  return {
    headline: 'Nice work carving out time for your smile.',
    subline: 'Follow the highlights-thirty gentle seconds per area.',
    emphasizeGums: false,
    emphasizeBackTeeth: false,
  }
}

export type QuadrantMeta = {
  id: string
  /** Short label for UI */
  shortLabel: string
  /** Patient-oriented name */
  title: string
}

/** FDI-style order: upper right → upper left → lower left → lower right (clockwise from UR). */
export const BRUSHING_QUADRANTS: QuadrantMeta[] = [
  { id: 'q1', shortLabel: 'UR', title: 'Top right' },
  { id: 'q2', shortLabel: 'UL', title: 'Top left' },
  { id: 'q3', shortLabel: 'LL', title: 'Bottom left' },
  { id: 'q4', shortLabel: 'LR', title: 'Bottom right' },
]

export function getQuadrantCoachingLine(
  quadrantIndex: number,
  insight: BrushingSessionInsight,
): string {
  const base = [
    'Outer surfaces first-small circles, light pressure.',
    'Same gentle circles-cover the whole side.',
    'Lower arch: sweep along the gum line, easy does it.',
    'Finish strong-inside and chewing surfaces too.',
  ]

  const gum = [
    'Angle the bristles slightly toward your gums-soft, not scratchy.',
    'Keep that soft angle toward the gum line-you’ve got this.',
    'Along the bottom gum line, nice and slow.',
    'Last corner: gums and back teeth get a little extra love.',
  ]

  const back = [
    'Don’t forget the back molars on this side-count to ten twice if it helps.',
    'Reach those upper back teeth-they’re sneaky.',
    'Lower molars too-short strokes on the chewing grooves.',
    'Sweep the far-back teeth; they’re worth the pause.',
  ]

  const hybrid = [
    'Gum line first on this side-then linger on the back molars for a few extra seconds.',
    'Soft angle toward the gums; reach behind those upper back teeth.',
    'Bottom gum line, slow circles-don’t skip the far-back lower molars.',
    'Finish with gums and chewing surfaces-you’re almost there.',
  ]

  let lines: string[]
  if (insight.emphasizeGums && insight.emphasizeBackTeeth) lines = hybrid
  else if (insight.emphasizeGums) lines = gum
  else if (insight.emphasizeBackTeeth) lines = back
  else lines = base

  return lines[quadrantIndex] ?? base[quadrantIndex] ?? ''
}
