import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MouthQuadrants } from './MouthQuadrants'
import { PrimaryButton } from '../ui/GradientScreen'
import { CARD_PAD } from '../layout/pageLayout'
import {
  BRUSHING_QUADRANTS,
  getBrushingSessionInsight,
  getQuadrantCoachingLine,
} from '../../lib/brushingInsights'
import { loadHabits, loadScans } from '../../lib/storage'
import { computeTrend } from '../../lib/trends'

const TOTAL_SECONDS = 120
const SEGMENT = 30

function formatTime(totalSec: number): string {
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

type Phase = 'idle' | 'running' | 'paused' | 'done'

export function BrushingCoachSession({ embedded = false }: { embedded?: boolean }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS)

  const scans = loadScans()
  const habits = loadHabits()
  const insight = getBrushingSessionInsight({
    lastRisk: scans[0]?.risk ?? null,
    habits,
    trendWorsening: computeTrend(scans.map((s) => s.risk)) === 'worsening',
  })

  const elapsed = TOTAL_SECONDS - secondsLeft
  const activeQuadrant =
    phase === 'done' || phase === 'idle' ? null : Math.min(3, Math.floor(elapsed / SEGMENT))

  const segmentElapsed = elapsed % SEGMENT
  const segmentProgress = phase === 'running' || phase === 'paused' ? segmentElapsed / SEGMENT : 0

  useEffect(() => {
    if (phase !== 'running') return
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setPhase('done')
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [phase])

  function start() {
    setSecondsLeft(TOTAL_SECONDS)
    setPhase('running')
  }

  function pause() {
    setPhase('paused')
  }

  function resume() {
    setPhase('running')
  }

  function reset() {
    setPhase('idle')
    setSecondsLeft(TOTAL_SECONDS)
  }

  const coachingLine =
    activeQuadrant !== null ? getQuadrantCoachingLine(activeQuadrant, insight) : ''
  const currentTitle = activeQuadrant !== null ? BRUSHING_QUADRANTS[activeQuadrant]?.title : ''

  return (
    <div className="space-y-4">
      <div className="rounded-[1.25rem] border border-[#52C470]/40 bg-white px-4 py-3">
        <p className="font-heading text-[15px] font-semibold text-[#191919]">{insight.headline}</p>
        {insight.subline && (
          <p className="mt-1 text-sm leading-relaxed text-[#667085]">{insight.subline}</p>
        )}
      </div>

      <div className={`rounded-[1.25rem] border border-[#E8EEF2] bg-white ${CARD_PAD} shadow-[0_4px_24px_-6px_rgba(94,137,237,0.12)]`}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">Timer</p>
            <p className="font-heading mt-1 text-4xl font-bold tabular-nums text-[#191919]" aria-live="polite">
              {formatTime(secondsLeft)}
            </p>
          </div>
          <p className="text-sm font-semibold text-[#5E89ED]">2:00 session</p>
        </div>

        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-[#E8EEF2]"
          role="progressbar"
          aria-valuenow={elapsed}
          aria-valuemin={0}
          aria-valuemax={TOTAL_SECONDS}
          aria-label="Brushing session progress"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#52C470] to-[#5E89ED] transition-[width] duration-1000 ease-linear"
            style={{ width: `${(elapsed / TOTAL_SECONDS) * 100}%` }}
          />
        </div>

        {phase !== 'idle' && phase !== 'done' && (
          <div className="mt-4">
            <p className="text-center font-heading text-lg font-semibold text-[#191919]">{currentTitle}</p>
            <p className="mt-2 text-center text-sm leading-relaxed text-[#667085]">{coachingLine}</p>
          </div>
        )}

        {phase === 'done' && (
          <div className="mt-4 rounded-2xl bg-[#52C470]/40 px-4 py-4 text-center">
            <p className="font-heading text-lg font-semibold text-[#2A7A42]">Nice work</p>
            <p className="mt-1 text-sm text-[#667085]">Two minutes of care - your future self will thank you.</p>
          </div>
        )}
      </div>

      <section className="rounded-[1.25rem] border border-[#E8EEF2] bg-white px-4 py-6">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-[#667085]">
          {phase === 'done' ? 'All areas covered' : 'Follow the highlight'}
        </p>
        <MouthQuadrants activeIndex={phase === 'done' ? null : activeQuadrant} segmentProgress={segmentProgress} />
      </section>

      <div className="flex flex-col gap-3">
        {phase === 'idle' && <PrimaryButton onClick={start}>Start 2-minute session</PrimaryButton>}
        {phase === 'running' && (
          <button
            type="button"
            onClick={pause}
            className="w-full rounded-2xl border border-[#E8EEF2] bg-white py-3.5 text-[15px] font-semibold text-[#191919]"
          >
            Pause
          </button>
        )}
        {phase === 'paused' && (
          <div className="flex gap-3">
            <PrimaryButton onClick={resume} className="flex-1">
              Resume
            </PrimaryButton>
            <button
              type="button"
              onClick={reset}
              className="flex-1 rounded-2xl border border-[#E8EEF2] bg-white py-3.5 text-sm font-semibold text-[#667085]"
            >
              Stop
            </button>
          </div>
        )}
        {phase === 'done' && <PrimaryButton onClick={reset}>Brush again</PrimaryButton>}
      </div>

      {!embedded && (
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/habits" className="font-semibold text-[#5E89ED]">
            Log today&apos;s habits
          </Link>
          <Link to="/" className="font-semibold text-[#667085]">
            Home
          </Link>
        </div>
      )}
    </div>
  )
}
