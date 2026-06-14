import { ToothCharacter } from '../mascot/ToothCharacter'
import { TOOTH_ROLES } from '../mascot/toothRoles'
import { useAssistant } from '../../context/AssistantContext'

export function FloatingAssistant() {
  const { openSheet, sheetOpen } = useAssistant()

  return (
    <button
      type="button"
      onClick={openSheet}
      aria-haspopup="dialog"
      aria-expanded={sheetOpen}
      aria-label="Open JustSmile assistant"
      className={[
        'fixed right-8 z-[50] flex h-12 w-12 items-center justify-center',
        'rounded-full bg-white shadow-[0_2px_12px_-2px_rgba(25,25,25,0.12),0_4px_20px_-4px_rgba(191,155,222,0.35)]',
        'transition hover:shadow-[0_4px_16px_-2px_rgba(25,25,25,0.14),0_6px_24px_-4px_rgba(191,155,222,0.45)]',
        'active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF9BDE]/40 focus-visible:ring-offset-2',
      ].join(' ')}
      style={{ bottom: 'calc(5.25rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <ToothCharacter color={TOOTH_ROLES.support} size={34} />
    </button>
  )
}
