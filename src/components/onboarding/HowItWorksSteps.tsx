import { useEffect, useState } from 'react'

const STEPS = [
  {
    id: 'photo',
    title: 'Photo Check',
    description: 'Take a clear photo of your teeth.',
    icon: '/onboarding/how-it-works/photo-check.png',
  },
  {
    id: 'snapshot',
    title: 'Smile Snapshot',
    description: 'See areas worth monitoring on your smile.',
    icon: '/onboarding/how-it-works/wellness-snapshot.png',
  },
  {
    id: 'next',
    title: 'Next Steps',
    description: 'Get a snapshot read and simple guidance.',
    icon: '/onboarding/how-it-works/next-steps.png',
  },
] as const

const AUTO_MS = 3000
const SLOT_OFFSET = 108

export function HowItWorksSteps({
  activeStep,
  onStepChange,
}: {
  activeStep: number
  onStepChange: (step: number) => void
}) {
  const [paused, setPaused] = useState(false)
  const current = STEPS[activeStep] ?? STEPS[0]

  useEffect(() => {
    if (paused || activeStep >= STEPS.length - 1) return
    const timer = window.setInterval(() => {
      onStepChange(Math.min(activeStep + 1, STEPS.length - 1))
    }, AUTO_MS)
    return () => window.clearInterval(timer)
  }, [activeStep, paused, onStepChange])

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <h1 className="type-onboarding-headline text-center text-[#191919]">
        A quick check in three steps
      </h1>

      <div
        className="relative mt-8 h-[9.5rem] w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        {STEPS.map((step, i) => {
          const rel = i - activeStep
          if (Math.abs(rel) > 1) return null

          const isActive = rel === 0
          const size = isActive ? 120 : 72

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepChange(i)}
              aria-pressed={isActive}
              aria-label={`${step.title}: ${step.description}`}
              className={[
                'absolute top-1/2 left-1/2 flex items-center justify-center',
                'overflow-hidden rounded-[1.125rem] border bg-white',
                'transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
                isActive
                  ? 'z-10 border-[#5E89ED]/35 shadow-[0_12px_36px_-8px_rgba(94,137,237,0.35)]'
                  : 'z-0 border-[#E8EEF2] shadow-[0_2px_12px_-4px_rgba(94,137,237,0.08)]',
              ].join(' ')}
              style={{
                width: size,
                height: size,
                opacity: isActive ? 1 : 0.32,
                transform: `translate(calc(-50% + ${rel * SLOT_OFFSET}px), -50%) scale(${isActive ? 1 : 0.82})`,
              }}
            >
              <img
                src={step.icon}
                alt=""
                draggable={false}
                className={[
                  'h-full w-full object-contain transition-transform duration-700 ease-out',
                  isActive ? 'scale-100 p-2' : 'scale-90 p-1.5',
                ].join(' ')}
              />
              {isActive && (
                <span
                  className="pointer-events-none absolute inset-0 rounded-[1.125rem] ring-2 ring-[#52C470]/35 ring-offset-2 ring-offset-white"
                  aria-hidden
                />
              )}
            </button>
          )
        })}

      </div>

      <div className="mt-6 flex justify-center gap-2" aria-hidden>
        {STEPS.map((step, i) => (
          <button
            key={step.id}
            type="button"
            tabIndex={-1}
            onClick={() => onStepChange(i)}
            className={[
              'rounded-full transition-all duration-700 ease-out',
              i === activeStep ? 'h-2 w-7 bg-[#5E89ED]' : 'h-2 w-2 bg-[#5E89ED]/20',
            ].join(' ')}
          />
        ))}
      </div>

      <div key={current.id} className="mt-6 w-full px-1 text-center animate-[fadeIn_0.55s_ease-out]">
        <h2 className="type-section text-[#191919]">{current.title}</h2>
        <p className="type-body-lg mt-3 text-[#667085]">{current.description}</p>
      </div>
    </div>
  )
}

export { STEPS as HOW_IT_WORKS_STEPS }
