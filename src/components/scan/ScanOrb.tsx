import { ToothCharacter } from '../mascot/ToothCharacter'
import { TOOTH_ROLES } from '../mascot/toothRoles'

const SIZE = 248
const VIEW = 252
const CENTER = VIEW / 2

type ScanOrbState = 'idle' | 'preview' | 'processing'

function ScanDentalCue() {
  return (
    <div className="relative flex items-center justify-center" aria-hidden>
      <ToothCharacter
        color={TOOTH_ROLES.scan}
        size={68}
        className="drop-shadow-[0_2px_8px_rgba(94,137,237,0.22)]"
      />
      <span className="absolute -bottom-1 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/92 shadow-[0_2px_8px_-2px_rgba(94,137,237,0.35)] ring-1 ring-white/80 backdrop-blur-sm">
        <svg className="h-4 w-4 text-[#4A75D9]" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.2-1.6A1.5 1.5 0 0 1 10.1 5h3.8a1.5 1.5 0 0 1 1.2.6L16.3 7H18.5A1.5 1.5 0 0 1 20 8.5V17a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17V8.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    </div>
  )
}

function ScanSparkle() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center" aria-hidden>
      <svg className="scan-orb-sparkle h-10 w-10 text-[#4A75D9]" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 4v8M20 28v8M4 20h8M28 20h8M8.5 8.5l5.5 5.5M26 26l5.5 5.5M31.5 8.5 26 14M14 26l-5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.9" />
      </svg>
    </div>
  )
}

export function ScanOrb({
  state,
  preview,
  onTap,
  interactive = true,
}: {
  state: ScanOrbState
  preview?: string | null
  onTap: () => void
  interactive?: boolean
}) {
  const processing = state === 'processing'
  const showPreview = state === 'preview' && preview
  const canTap = interactive && !processing && !showPreview

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!canTap) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onTap()
    }
  }

  return (
    <div
      role={canTap ? 'button' : undefined}
      tabIndex={canTap ? 0 : -1}
      onClick={canTap ? onTap : undefined}
      onKeyDown={handleKeyDown}
      aria-label={
        processing ? 'Analyzing your photo' : showPreview ? 'Photo ready' : 'Tap to scan your teeth'
      }
      aria-busy={processing}
      className={[
        'scan-orb group relative mx-auto select-none',
        'rounded-full outline-none transition-transform duration-500 ease-out',
        canTap ? 'cursor-pointer active:scale-[0.98] scan-orb--idle' : 'cursor-default',
        'focus-visible:ring-2 focus-visible:ring-[#D8E2F8]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-white',
        processing ? 'scan-orb--processing' : '',
      ].join(' ')}
      style={{ width: SIZE, height: SIZE }}
    >
      {canTap && (
        <>
          <span className="scan-orb-ring-pulse pointer-events-none absolute -inset-3 rounded-full" aria-hidden />
          <span className="scan-orb-ring pointer-events-none absolute -inset-0.5 rounded-full" aria-hidden />
        </>
      )}

      <span className="scan-orb-edge-glow pointer-events-none absolute -inset-2 rounded-full" aria-hidden />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        aria-hidden
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r="112"
          fill="none"
          stroke="#5E89ED"
          strokeWidth="0.65"
          strokeDasharray="3 7"
          opacity="0.2"
          className={canTap ? 'scan-orb-orbit-1' : undefined}
        />
      </svg>

      <div className="scan-orb-glass pointer-events-none absolute inset-[6%] overflow-hidden rounded-full" aria-hidden>
        <div className="scan-orb-core absolute inset-0 rounded-full" />
        <div className="scan-orb-mist absolute inset-0 rounded-full" />
        <div className="scan-orb-highlight absolute inset-0 rounded-full" />
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {processing ? (
          <ScanSparkle />
        ) : showPreview ? (
          <div className="h-[58%] w-[58%] overflow-hidden rounded-full ring-2 ring-white/70 shadow-[0_4px_16px_-4px_rgba(27,35,48,0.2)]">
            <img src={preview} alt="Your photo preview" className="h-full w-full object-cover" />
          </div>
        ) : (
          <ScanDentalCue />
        )}
      </div>
    </div>
  )
}

export type { ScanOrbState }
