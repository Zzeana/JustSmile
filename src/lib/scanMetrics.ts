import type { RiskLevel } from './types'

export type MetricLevel = 'great' | 'attention' | 'tune' | 'empty'

export type ScanMetricId = 'plaque' | 'recession' | 'caries' | 'toothwear'

export type ScanMetric = {
  id: ScanMetricId
  label: string
  level: MetricLevel
}

export const METRIC_STATUS_LABEL: Record<MetricLevel, string> = {
  great: 'Doing great',
  attention: 'Pay attention',
  tune: 'Tune it up',
  empty: 'Scan to view',
}

export const METRIC_STATUS_CLASS: Record<MetricLevel, string> = {
  great: 'text-[#52C470]',
  attention: 'text-[#FF7A1A]',
  tune: 'text-[#EF6EA5]',
  empty: 'text-[#8B95A5]',
}

const METRIC_LABELS: Record<ScanMetricId, string> = {
  plaque: 'Plaque',
  recession: 'Recession',
  caries: 'Caries',
  toothwear: 'Toothwear',
}

/** Tooth character color per metric — fixed identity, status shown in label */
export const METRIC_TOOTH_COLOR: Record<
  ScanMetricId,
  'orange' | 'teal' | 'green' | 'blue'
> = {
  plaque: 'orange',
  recession: 'teal',
  caries: 'green',
  toothwear: 'blue',
}

const BY_RISK: Record<RiskLevel, Record<ScanMetricId, MetricLevel>> = {
  low: {
    plaque: 'attention',
    recession: 'great',
    caries: 'great',
    toothwear: 'great',
  },
  medium: {
    plaque: 'tune',
    recession: 'attention',
    caries: 'great',
    toothwear: 'great',
  },
  high: {
    plaque: 'tune',
    recession: 'attention',
    caries: 'attention',
    toothwear: 'attention',
  },
}

const EMPTY_LEVELS: Record<ScanMetricId, MetricLevel> = {
  plaque: 'empty',
  recession: 'empty',
  caries: 'empty',
  toothwear: 'empty',
}

export function buildScanMetrics(risk: RiskLevel | null | undefined): ScanMetric[] {
  const levels = risk ? BY_RISK[risk] : EMPTY_LEVELS
  return (Object.keys(METRIC_LABELS) as ScanMetricId[]).map((id) => ({
    id,
    label: METRIC_LABELS[id],
    level: levels[id],
  }))
}
