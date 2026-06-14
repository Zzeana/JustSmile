import { CoachToothBadge } from '../mascot/ToothAccent'
import { CARD_PAD } from '../layout/pageLayout'
import { PrimaryButton } from '../ui/GradientScreen'
import {
  CARE_CATEGORIES,
  CARE_CONCERN_CHIPS,
  type CareCategoryId,
  type LowCostClinic,
} from '../../data/findCareClinics'

function CategoryIcon({ type }: { type: string }) {
  const cls = 'h-5 w-5'
  switch (type) {
    case 'school':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M6 10v5c0 2 2.5 4 6 4s6-2 6-4v-5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'clinic':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'community':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 20V10l8-6 8 6v10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )
    case 'urgent':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 8v5m0 3h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

export function CareCoachHero({
  onOpenCoach,
  onChipSelect,
}: {
  onOpenCoach: () => void
  onChipSelect: (prefill: string) => void
}) {
  return (
    <div className={`overflow-hidden rounded-[1.375rem] bg-[linear-gradient(135deg,#EDE4F8_0%,#FFFFFF_100%)] ${CARD_PAD} shadow-[0_1px_2px_rgba(25,25,25,0.04),0_4px_20px_-6px_rgba(25,25,25,0.06)]`}>
      <div className="flex gap-4">
        <CoachToothBadge size={44} />
        <h2 className="type-section text-[#191919]">
          Need help figuring out where to start?
        </h2>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CARE_CONCERN_CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChipSelect(chip.prefill)}
            className={[
              'rounded-full bg-[#FAFAFA] px-3 py-1.5 text-[12px] font-medium text-[#191919] transition',
              chip.id === 'urgent'
                ? 'hover:bg-[#F7D1C3]'
                : 'hover:bg-[#EDE4F8]',
            ].join(' ')}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <PrimaryButton onClick={onOpenCoach} className="mt-4">
        Ask JustSmile Coach
      </PrimaryButton>
    </div>
  )
}

export function CareCategoryRow({
  selected,
  onSelect,
}: {
  selected: CareCategoryId | null
  onSelect: (id: CareCategoryId | null) => void
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-heading text-[1.0625rem] font-bold text-[#191919]">Browse care options</h2>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {CARE_CATEGORIES.map((cat) => {
          const active = selected === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(active ? null : cat.id)}
              className={[
                'flex shrink-0 flex-col items-center gap-2 rounded-[1.125rem] border px-4 py-3 transition',
                'min-w-[7.5rem]',
                active
                  ? 'border-[#5E89ED]/40 bg-white shadow-[0_4px_20px_-6px_rgba(94,137,237,0.15)]'
                  : 'border-[#E8EEF2] bg-white hover:border-[#5E89ED]/20',
              ].join(' ')}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${cat.tint}`}>
                <CategoryIcon type={cat.icon} />
              </span>
              <span className="text-center text-[12px] font-semibold leading-tight text-[#191919]">
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export function ClinicResourceCard({ clinic }: { clinic: LowCostClinic }) {
  const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(clinic.directionsQuery)}`

  return (
    <article className={`rounded-[1.125rem] bg-white ${CARD_PAD} shadow-[0_1px_2px_rgba(25,25,25,0.04),0_4px_20px_-6px_rgba(25,25,25,0.06)]`}>
      <h3 className="font-heading text-[15px] font-bold text-[#191919]">{clinic.name}</h3>
      <p className="mt-1 text-[13px] text-[#667085]">{clinic.location}</p>

      <div className="mt-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#8B95A5]">
          Includes
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Clinic features">
          {clinic.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[#D8E2F8] bg-[#F0F3FA] px-2.5 py-1 text-[11px] font-semibold leading-none text-[#4A75D9]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex gap-2">
        <a
          href={`tel:${clinic.phone.replace(/\D/g, '')}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#5E89ED] py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#4A75D9]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          Call
        </a>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E8EEF2] bg-white py-2.5 text-[13px] font-semibold text-[#191919] transition hover:bg-[#FAFAFA]"
        >
          <svg className="h-4 w-4 text-[#5E89ED]" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Directions
        </a>
      </div>
    </article>
  )
}
