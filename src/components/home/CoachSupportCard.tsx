import { CARD_PAD } from '../layout/pageLayout'

const SNAPSHOT_COACH_GRADIENT = 'bg-[linear-gradient(135deg,#D7C3F8_0%,#FFFFFF_100%)]'
const GENERAL_COACH_GRADIENT = 'bg-[linear-gradient(135deg,#D8E2F8_0%,#FFFFFF_100%)]'

const COACH_CARD_SHELL =
  `rounded-[1.625rem] border ${CARD_PAD} shadow-[0_1px_2px_rgba(25,25,25,0.03),0_4px_16px_-6px_rgba(25,25,25,0.05)]`

export function CoachSupportCard({
  hasMonitorConcern,
  onAsk,
}: {
  hasMonitorConcern: boolean
  onAsk: () => void
}) {
  const gradient = hasMonitorConcern ? SNAPSHOT_COACH_GRADIENT : GENERAL_COACH_GRADIENT
  const border = hasMonitorConcern ? 'border-[#D7C3F8]/35' : 'border-[#E8EEF2]/50'

  return (
    <div className={[COACH_CARD_SHELL, border, gradient].join(' ')}>
      <p className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-[#191919]">
        {hasMonitorConcern ? 'Questions about your snapshot?' : 'Need oral health advice?'}
      </p>
      <button
        type="button"
        onClick={onAsk}
        className="mt-2.5 text-[14px] font-semibold text-[#5E89ED] transition hover:text-[#4A75D9]"
      >
        Ask Smile Coach →
      </button>
    </div>
  )
}
