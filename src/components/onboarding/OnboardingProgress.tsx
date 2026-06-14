export function OnboardingProgress({
  step,
  total,
  className = '',
}: {
  step: number
  total: number
  className?: string
}) {
  return (
    <div className={`mx-auto flex w-[78%] max-w-[17rem] items-center gap-3 ${className}`}>
      <div
        className="flex flex-1 items-center justify-center gap-1.5"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={[
              'rounded-full transition-all duration-500 ease-out',
              i + 1 === step
                ? 'h-2 w-6 bg-[#5E89ED]'
                : i + 1 < step
                  ? 'h-2 w-2 bg-[#52C470]'
                  : 'h-2 w-2 bg-[#5E89ED]/18',
            ].join(' ')}
            aria-hidden
          />
        ))}
      </div>
      <span className="shrink-0 text-xs font-medium tabular-nums text-[#667085]">
        {step}/{total}
      </span>
    </div>
  )
}
