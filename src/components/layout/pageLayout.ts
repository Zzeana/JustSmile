/** iPhone 15/16 Pro — horizontal inset (32px, respects safe area). */
export const PAGE_GUTTER = 'safe-px'

/** App shell width cap (matches Layout main + nav). */
export const APP_MAX_WIDTH = 'max-w-lg'

/** Breathing room below the safe area — shared across all tab screens. */
export const PAGE_TOP_PAD = 'pt-8'

/** Space between screen title and first content block. */
export const PAGE_HEADER_GAP = 'mt-6'

/** Standard card interior padding (24px). */
export const CARD_PAD = 'p-6'

/** Shared card chrome — radius, border, shadow. */
export const CARD_SHELL =
  'rounded-[1.625rem] border border-[#E8EEF2]/60 shadow-[0_1px_2px_rgba(25,25,25,0.03),0_4px_16px_-6px_rgba(25,25,25,0.05)]'

/** Full card surface — shell + padding. */
export const CARD_SURFACE = `${CARD_SHELL} ${CARD_PAD}`

/** Vertical stack gap — secondary pages (24px). */
export const PAGE_SECTION_GAP = 'gap-6'

/** Vertical stack gap — Home summary (28px). */
export const HOME_SECTION_GAP = 'gap-7'

/** Page shell — screen header plus scrollable body. */
export const PAGE_SHELL = `flex min-h-full flex-col ${PAGE_TOP_PAD}`

/** Content area below the header. */
export const PAGE_BODY = `${PAGE_HEADER_GAP} flex flex-col ${PAGE_SECTION_GAP}`

/** Home — summary layout (same top pad as other pages). */
export const HOME_SHELL = `relative z-[1] flex min-h-full flex-col ${PAGE_TOP_PAD}`

/** Space below greeting before first card. */
export const HOME_BODY = `${PAGE_HEADER_GAP} flex flex-col ${HOME_SECTION_GAP} pb-1`

/** Main scroll region — tab screens. */
export const MAIN_SHELL = `safe-pt relative mx-auto w-full ${APP_MAX_WIDTH} flex-1 ${PAGE_GUTTER} pb-36`

/** Fixed bottom tab bar inset. */
export const NAV_SHELL = `safe-pb fixed inset-x-0 bottom-0 z-40 ${PAGE_GUTTER} pb-2`
