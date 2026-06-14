export const NAV_ICON_CLASS = 'h-[22px] w-[22px]'

type ScanIconProps = {
  active?: boolean
  className?: string
}

/** Nav scan glyph — camera; matches other tab icon stroke style. */
export function ScanIcon({ active = false, className = NAV_ICON_CLASS }: ScanIconProps) {
  const strokeWidth = active ? 2 : 1.6
  const stroke = {
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  return (
    <svg className={['shrink-0', className].join(' ')} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 7.5H4.5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H17l-1.75-2.5h-6L7 7.5Z"
        {...stroke}
      />
      <circle cx="12" cy="13" r="3.25" {...stroke} />
    </svg>
  )
}
