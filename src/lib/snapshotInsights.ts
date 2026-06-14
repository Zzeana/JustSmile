import type { RiskLevel, ScanRecord } from './types'
import { snapshotStatusLabel } from './trends'

export type MapHighlight = {
  toothId: string
  tone: 'healthy' | 'monitor'
}

export type MapCallout = {
  label: string
  tone: 'healthy' | 'monitor' | 'quality'
  x: number
  y: number
}

export type SnapshotInsights = {
  status: string
  supporting: string
  highlights: MapHighlight[]
  callouts: MapCallout[]
  noticed: string[]
  nextSteps: string[]
  photoQualityLabel: string
}

function photoQualityLabel(confidence: number | undefined): string {
  if (confidence === undefined) return 'Clear enough for guidance'
  if (confidence >= 0.75) return 'Clear enough for guidance'
  if (confidence >= 0.5) return 'Fair for general guidance'
  return 'Consider a retake in better light'
}

function photoQualityNotice(confidence: number | undefined): string {
  const label = photoQualityLabel(confidence)
  if (label === 'Clear enough for guidance') {
    return 'Photo quality was clear enough for general guidance.'
  }
  if (label === 'Fair for general guidance') {
    return 'Photo quality was fair enough for general guidance.'
  }
  return 'Photo quality was limited - a retake in better light may help.'
}

function supportingLine(risk: RiskLevel): string {
  switch (risk) {
    case 'low':
      return 'One area may be worth monitoring.'
    case 'medium':
      return 'A couple areas may be worth a little extra care.'
    case 'high':
      return 'A few areas may benefit from closer attention soon.'
    default:
      return 'Use this as a gentle check-in, not a diagnosis.'
  }
}

function defaultNextSteps(risk: RiskLevel): string[] {
  switch (risk) {
    case 'low':
      return [
        'Brush tonight with extra attention to back teeth.',
        'Clean between teeth before bed.',
        'Recheck in 2 weeks, or sooner if pain increases.',
      ]
    case 'medium':
      return [
        'Brush gently twice today, focusing on areas that feel sensitive.',
        'Clean between teeth if comfortable.',
        'Recheck in 1-2 weeks, or sooner if discomfort grows.',
      ]
    case 'high':
      return [
        'Keep brushing gentle until you can talk with a clinician.',
        'Note any pain, swelling, or sensitivity that changes.',
        'Consider booking care soon, especially if symptoms worsen.',
      ]
    default:
      return []
  }
}

/** Wellness-oriented map data derived from scan record - not clinical labels. */
export function getSnapshotInsights(
  record: ScanRecord,
  confidence?: number,
): SnapshotInsights {
  const quality = photoQualityLabel(confidence)
  const qualityNotice = photoQualityNotice(confidence)

  const byRisk: Record<
    RiskLevel,
    { highlights: MapHighlight[]; callouts: MapCallout[]; noticed: string[] }
  > = {
    low: {
      highlights: [
        { toothId: 't-u-2', tone: 'healthy' },
        { toothId: 't-u-3', tone: 'healthy' },
        { toothId: 't-l-2', tone: 'healthy' },
        { toothId: 't-u-5', tone: 'monitor' },
      ],
      callouts: [
        { label: 'Healthy', tone: 'healthy', x: 28, y: 42 },
        { label: 'Monitor', tone: 'monitor', x: 72, y: 38 },
      ],
      noticed: [
        'Most visible areas appear healthy.',
        'One area may be worth a little extra care.',
        qualityNotice,
      ],
    },
    medium: {
      highlights: [
        { toothId: 't-u-4', tone: 'monitor' },
        { toothId: 't-u-5', tone: 'monitor' },
        { toothId: 't-l-3', tone: 'healthy' },
      ],
      callouts: [
        { label: 'Healthy', tone: 'healthy', x: 24, y: 44 },
        { label: 'Monitor', tone: 'monitor', x: 74, y: 40 },
      ],
      noticed: [
        'Several visible areas appear steady.',
        'One or two areas may be worth a little extra care.',
        qualityNotice,
      ],
    },
    high: {
      highlights: [
        { toothId: 't-u-5', tone: 'monitor' },
        { toothId: 't-u-6', tone: 'monitor' },
        { toothId: 't-l-4', tone: 'monitor' },
      ],
      callouts: [
        { label: 'Monitor', tone: 'monitor', x: 70, y: 38 },
        { label: 'Monitor', tone: 'monitor', x: 30, y: 58 },
      ],
      noticed: [
        'Some visible areas may need closer attention.',
        'Extra care at home can help while you plan next steps.',
        qualityNotice,
      ],
    },
  }

  const base = byRisk[record.risk]

  return {
    status: snapshotStatusLabel(record.risk),
    supporting: supportingLine(record.risk),
    highlights: base.highlights,
    callouts: base.callouts,
    photoQualityLabel: quality,
    noticed: base.noticed,
    nextSteps: defaultNextSteps(record.risk),
  }
}
