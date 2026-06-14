import type { RiskLevel } from './types'

export interface AnalysisOutput {
  risk: RiskLevel
  summary: string
  explanation: string
  steps: string[]
  /** Rough signal strength for transparency (0–1); not a clinical score */
  signalConfidence: number
}

/**
 * Client-side visual analysis proxy: uses image statistics only.
 * Not medical advice; same image → same result for repeatability in demos.
 */
export async function analyzeOralImage(file: Blob): Promise<AnalysisOutput> {
  const bitmap = await createImageBitmap(file)
  const w = 96
  const h = Math.max(32, Math.round((bitmap.height / bitmap.width) * w))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return fallbackResult('medium')
  }
  ctx.drawImage(bitmap, 0, 0, w, h)
  const { data } = ctx.getImageData(0, 0, w, h)

  let sumL = 0
  let sumR = 0
  let sumG = 0
  const n = data.length / 4
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255
    const g = data[i + 1] / 255
    const bl = data[i + 2] / 255
    sumR += r
    sumG += g
    sumL += 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const meanL = sumL / n
  const meanR = sumR / n
  const meanG = sumG / n

  let varL = 0
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255
    const g = data[i + 1] / 255
    const b = data[i + 2] / 255
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
    const d = l - meanL
    varL += d * d
  }
  varL /= n

  let edge = 0
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w - 1; x++) {
      const i = (y * w + x) * 4
      const j = i + 4
      edge +=
        Math.abs(data[i] - data[j]) +
        Math.abs(data[i + 1] - data[j + 1]) +
        Math.abs(data[i + 2] - data[j + 2])
    }
  }
  edge /= w * h * 255 * 3

  const rg = meanR / (meanG + 0.05)

  const seed =
    Math.round(meanL * 1000) * 13 +
    Math.round(varL * 10000) * 7 +
    Math.round(rg * 1000) * 17 +
    Math.round(edge * 10000) * 11

  const darkness = 1 - meanL
  const texture = Math.min(1, varL * 4 + edge * 2)
  const warmth = Math.min(1.2, Math.max(0, rg - 0.95) * 2)

  let score = 0.28 * darkness + 0.35 * texture + 0.28 * warmth
  score += ((seed % 17) / 17 - 0.5) * 0.08
  score = Math.min(1, Math.max(0, score))

  const signalConfidence = Math.min(1, 0.45 + texture * 0.35 + (1 - Math.abs(0.5 - meanL)) * 0.2)

  const risk: RiskLevel = score < 0.38 ? 'low' : score < 0.62 ? 'medium' : 'high'

  return buildCopy(risk, signalConfidence)
}

function fallbackResult(risk: RiskLevel): AnalysisOutput {
  return buildCopy(risk, 0.35)
}

function buildCopy(risk: RiskLevel, signalConfidence: number): AnalysisOutput {
  const common =
    'This snapshot is for your wellbeing-it isn’t a medical diagnosis. If you’re ever worried-pain, swelling, fever, bleeding, or trouble breathing or swallowing-please reach out to a dentist, doctor, or urgent care.'

  if (risk === 'low') {
    return {
      risk,
      summary: 'From this photo, things look fairly settled.',
      explanation:
        'Lighting and angles change what a picture can show, so take this as a gentle heads-up-not a verdict. Nothing here jumps out as urgent, and you may want to monitor this area as part of your usual routine.',
      steps: [
        'Keep up brushing and cleaning between teeth in a way that feels comfortable for you.',
        'You may want to notice any new sensitivity or sore spots-especially if they stick around.',
        'When life allows, a routine dental visit is a nice way to stay ahead of surprises.',
        'If something changes, you can always snap another photo to compare over time.',
        common,
      ],
      signalConfidence,
    }
  }
  if (risk === 'medium') {
    return {
      risk,
      summary: 'Possible signs of concern-worth a little extra care.',
      explanation:
        'This photo might be picking up on something worth watching. You may want to monitor this area at home and notice how things feel when you eat, drink, or brush. We’re not naming a condition-just inviting a bit more attention.',
      steps: [
        'Try gentle brushing twice a day and cleaning between teeth on most days.',
        'Rinsing with water after snacks is a small habit that can help.',
        'You may want to watch for sensitivity, gum tenderness, or spots that change over time.',
        'If something bothers you for more than a few days, consider booking a visit when you can.',
        common,
      ],
      signalConfidence,
    }
  }
  return {
    risk,
    summary: 'We’d encourage a friendly check-in with a professional when you’re able.',
    explanation:
      'This image may be showing patterns that are easier to understand in person. That doesn’t mean anything is “wrong”-it means a clinician can help you explore what you’re seeing and feeling, without jumping to conclusions from a photo alone.',
    steps: [
      'Consider reaching out to a dentist or clinic-especially if you have pain, swelling, fever, or trouble swallowing.',
      'Until then, very hot or cold foods might feel nicer to skip if they bother you; keep cleaning gentle.',
      'If pain is strong or getting worse, don’t wait-use urgent care or telehealth if that’s what you have nearby.',
      'Avoid harsh scraping or unproven “fixes”; small, kind habits usually beat big experiments.',
      common,
    ],
    signalConfidence,
  }
}
