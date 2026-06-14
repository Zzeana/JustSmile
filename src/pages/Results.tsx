import { useLocation, useNavigate } from 'react-router-dom'
import { ToothAccent } from '../components/mascot/ToothAccent'
import { resultsToothColor, TOOTH_CARD_SIZE, TOOTH_ROLES } from '../components/mascot/toothRoles'
import { ScanOverviewMetrics } from '../components/scan/ScanOverviewMetrics'
import { SmileSnapshotMap } from '../components/snapshot/SmileSnapshotMap'
import { PAGE_BODY, PAGE_SHELL } from '../components/layout/pageLayout'
import { PrimaryButton, SecondaryButton, Card, GradientScreen } from '../components/ui/GradientScreen'
import { useAssistant, SNAPSHOT_COACH_PROMPTS } from '../context/AssistantContext'
import { getSnapshotInsights } from '../lib/snapshotInsights'
import type { ScanRecord } from '../lib/types'

type LocationState = {
  record: ScanRecord
  signalConfidence?: number
}

export function Results() {
  const navigate = useNavigate()
  const location = useLocation()
  const { launchCoach } = useAssistant()
  const state = location.state as LocationState | null
  const record = state?.record

  if (!record) {
    return (
      <GradientScreen variant="clinical" className="flex min-h-[60dvh] flex-col items-center justify-center">
        <p className="text-center text-[#667085]">
          No snapshot yet. Tap below to scan.
        </p>
        <PrimaryButton onClick={() => navigate('/scan')} className="mt-6 max-w-xs">
          Take a photo
        </PrimaryButton>
      </GradientScreen>
    )
  }

  const insights = getSnapshotInsights(record, state?.signalConfidence)

  return (
    <GradientScreen variant="clinical" className="min-h-full">
      <div className={PAGE_SHELL}>
        <header className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <ToothAccent color={resultsToothColor(record.risk)} size={TOOTH_CARD_SIZE} />
            <p className="text-sm font-semibold text-[#5E89ED]">Smile Snapshot</p>
          </div>
          <h1 className="type-h1 text-[#191919]">{insights.status}</h1>
          <p className="type-body-lg text-[#667085]">{insights.supporting}</p>
        </header>

        <div className={PAGE_BODY}>
          <Card className="px-4 py-5">
            <SmileSnapshotMap highlights={insights.highlights} callouts={insights.callouts} />
          </Card>

          <ScanOverviewMetrics risk={record.risk} />

          <Card tone="white">
            <button
              type="button"
              onClick={() =>
                launchCoach({
                  source: 'snapshot',
                  intro:
                    insights.supporting.toLowerCase().includes('monitor') ||
                    insights.status.toLowerCase().includes('monitor')
                      ? 'I noticed an area worth monitoring. What would you like to know?'
                      : 'What would you like to know about your snapshot?',
                  prefill:
                    insights.supporting.toLowerCase().includes('monitor') ||
                    insights.status.toLowerCase().includes('monitor')
                      ? 'I noticed an area worth monitoring on my snapshot. What should I know?'
                      : 'Help me understand my Smile Snapshot.',
                  suggestedPrompts: SNAPSHOT_COACH_PROMPTS,
                })
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F0F3FA] py-2.5 text-[13px] font-semibold text-[#5E89ED] transition hover:bg-[#E4EAFA]"
            >
              <ToothAccent color={TOOTH_ROLES.support} size={28} />
              Ask about this snapshot
            </button>
          </Card>

          <Card>
            <h2 className="font-heading text-sm font-bold text-[#191919]">Next steps</h2>
            <ol className="mt-3 space-y-2.5">
              {insights.nextSteps.map((s, i) => (
                <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-[#191919]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#52C470]/60 text-xs font-bold text-[#2A7A42]">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </Card>

          <div className="flex flex-col gap-3">
            <PrimaryButton onClick={() => navigate('/coach')}>Start brushing coach</PrimaryButton>
            <SecondaryButton onClick={() => navigate('/find-care')}>Find low-cost care</SecondaryButton>
            <button
              type="button"
              onClick={() => navigate('/scan', { state: { showHistory: true } })}
              className="py-2 text-center text-sm font-medium text-[#5E89ED]"
            >
              View scan history
            </button>
          </div>

          <p className="text-center text-[11px] leading-relaxed text-[#8B95A5]">
            Wellness guidance only - not a medical diagnosis.
          </p>
        </div>
      </div>
    </GradientScreen>
  )
}
