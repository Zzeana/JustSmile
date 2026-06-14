/** Subtle JustSmile brand motif — smile curve + sparkle. Use sparingly. */
export function SmileMotif({
  className = '',
  variant = 'curve',
}: {
  className?: string
  variant?: 'curve' | 'sparkle' | 'both'
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 32"
      fill="none"
      aria-hidden
    >
      {(variant === 'curve' || variant === 'both') && (
        <path
          d="M8 18C28 28 52 28 72 18C92 8 104 8 112 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.35"
        />
      )}
      {(variant === 'sparkle' || variant === 'both') && (
        <path
          d="M98 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z"
          fill="currentColor"
          opacity="0.45"
        />
      )}
    </svg>
  )
}
