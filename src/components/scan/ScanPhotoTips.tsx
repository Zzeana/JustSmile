import { useState } from 'react'
import { ToothAccent } from '../mascot/ToothAccent'
import { TOOTH_CARD_SIZE, TOOTH_ROLES } from '../mascot/toothRoles'

const tips = [
  'Use bright indirect light',
  'Hold steady at eye level',
  'Retake if blurry',
]

export function ScanPhotoTips() {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-[1.125rem] border border-[#E8EEF2] bg-white shadow-[0_4px_20px_-6px_rgba(94,137,237,0.06)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2.5">
          <ToothAccent color={TOOTH_ROLES.learning} size={TOOTH_CARD_SIZE} />
          <span className="font-heading text-[14px] font-semibold text-[#191919]">Photo tips</span>
        </span>
        <svg
          className={['h-4 w-4 shrink-0 text-[#8B95A5] transition-transform', open ? 'rotate-180' : ''].join(' ')}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <ul className="space-y-2 border-t border-[#E8EEF2] px-4 pb-3.5 pt-2.5">
          {tips.map((tip) => (
            <li key={tip} className="flex gap-2 text-[13px] leading-relaxed text-[#667085]">
              <span className="text-[#F2D147]" aria-hidden>
                •
              </span>
              {tip}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
