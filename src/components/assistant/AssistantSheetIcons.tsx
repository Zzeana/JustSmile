const STROKE = {
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

type IconProps = { className?: string }

export function IconQuestionCircle({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" {...STROKE} />
      <path d="M9.75 9.5a2.25 2.25 0 1 1 3.56 1.83c-.98.85-1.31 1.42-1.31 2.42" {...STROKE} />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </svg>
  )
}

export function IconCamera({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 7.5H4.5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H17l-1.75-2.5h-6L7 7.5Z"
        {...STROKE}
      />
      <circle cx="12" cy="13" r="3.25" {...STROKE} />
    </svg>
  )
}

export function IconHeart({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        {...STROKE}
      />
    </svg>
  )
}

export function IconMapPin({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10Z" {...STROKE} />
      <circle cx="12" cy="11" r="2.5" {...STROKE} />
    </svg>
  )
}

export function IconPersonCircle({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" {...STROKE} />
      <circle cx="12" cy="9.5" r="2.75" {...STROKE} />
      <path d="M7.25 17.5c1.15-2.5 2.85-3.75 4.75-3.75s3.6 1.25 4.75 3.75" {...STROKE} />
    </svg>
  )
}

export function IconCrossCase({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 8V6.5a4 4 0 0 1 8 0V8" {...STROKE} />
      <rect x="5" y="8" width="14" height="12" rx="2.5" {...STROKE} />
      <path d="M12 11.5v5M9.75 14.25h4.5" {...STROKE} />
    </svg>
  )
}

export function IconDollarCircle({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" {...STROKE} />
      <path
        d="M12 7v10M9.75 9.75c0-1.1 1.01-2 2.25-2s2.25.9 2.25 2-1.01 2-2.25 2-2.25.9-2.25 2 1.01 2 2.25 2 2.25-.9 2.25-2"
        {...STROKE}
      />
    </svg>
  )
}

export function IconExclamationTriangle({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4.5 3.75 19.5h16.5L12 4.5Z" {...STROKE} />
      <path d="M12 10v4" {...STROKE} />
      <circle cx="12" cy="16.75" r="1" fill="currentColor" />
    </svg>
  )
}

export function IconPhone({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="7.5" y="3" width="9" height="18" rx="2.5" {...STROKE} />
      <path d="M11.5 18.5h1" {...STROKE} />
    </svg>
  )
}

export const CARE_PROMPT_ICONS = [
  IconCrossCase,
  IconDollarCircle,
  IconExclamationTriangle,
  IconPhone,
] as const
