import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToothCharacter, type ToothColor } from '../components/mascot/ToothCharacter'
import { HowItWorksSteps, HOW_IT_WORKS_STEPS } from '../components/onboarding/HowItWorksSteps'
import { OnboardingProgress } from '../components/onboarding/OnboardingProgress'
import { GradientScreen, MascotGlow, PrimaryButton, SecondaryButton } from '../components/ui/GradientScreen'
import type { OnboardingGoalId } from '../lib/types'
import { saveOnboardingGoals, setOnboardingDone } from '../lib/storage'

const TOTAL_STEPS = 4

const goalOptions: {
  id: OnboardingGoalId
  label: string
  desc: string
  accent: string
  character: ToothColor
}[] = [
  {
    id: 'habits',
    label: 'Build healthier habits',
    desc: 'Daily brushing and routines',
    accent: 'ring-[#52C470]/50 bg-[#B7EDB8]/50',
    character: 'green',
  },
  {
    id: 'concern',
    label: 'Check a concern',
    desc: 'Quick photo screening',
    accent: 'ring-[#5E89ED]/45 bg-[#E8EEF2]/50',
    character: 'blue',
  },
  {
    id: 'hygiene',
    label: 'Track my oral health',
    desc: 'Trends and reminders',
    accent: 'ring-[#4A75D9]/40 bg-[#E8EEF2]/40',
    character: 'darkblue',
  },
  {
    id: 'anxiety',
    label: 'Reduce dental anxiety',
    desc: 'Step-by-step support',
    accent: 'ring-[#BF9BDE]/35 bg-[#D7C3F8]/40',
    character: 'pink',
  },
]

const knowItems = [
  {
    title: 'Wellness guidance',
    copy: 'JustSmile supports prevention and education, not diagnosis.',
  },
  {
    title: 'Know when to seek care',
    copy: 'Severe pain, swelling, fever, or trouble breathing should be checked urgently.',
  },
  {
    title: 'Early check-ins help',
    copy: 'About 1 in 4 U.S. adults has untreated tooth decay. Small habits and early check-ins can make care less stressful.',
  },
] as const

type WelcomeState = { from?: string }

function toggleGoal(set: Set<OnboardingGoalId>, id: OnboardingGoalId): Set<OnboardingGoalId> {
  const next = new Set(set)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  return next
}

export function Onboarding() {
  const [index, setIndex] = useState(0)
  const [howItWorksStep, setHowItWorksStep] = useState(0)
  const [selectedGoals, setSelectedGoals] = useState<Set<OnboardingGoalId>>(() => new Set())
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = (location.state as WelcomeState | null)?.from

  const isWelcome = index === 0
  const isHowItWorks = index === 1
  const isGoals = index === 2
  const isKnow = index === 3

  function finish() {
    saveOnboardingGoals([...selectedGoals])
    setOnboardingDone()
    const target =
      redirectTo && redirectTo !== '/welcome' && redirectTo.startsWith('/')
        ? redirectTo
        : '/'
    navigate(target, { replace: true })
  }

  function next() {
    if (isHowItWorks && howItWorksStep < HOW_IT_WORKS_STEPS.length - 1) {
      setHowItWorksStep((s) => s + 1)
      return
    }
    if (index < TOTAL_STEPS - 1) {
      if (isHowItWorks) setHowItWorksStep(0)
      setIndex((i) => i + 1)
      return
    }
    finish()
  }

  function goBack() {
    if (isHowItWorks && howItWorksStep > 0) {
      setHowItWorksStep((s) => s - 1)
      return
    }
    if (index === 0) return
    setHowItWorksStep(0)
    setIndex((i) => i - 1)
  }

  return (
    <GradientScreen className="min-h-dvh">
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col safe-px safe-pt">
        <div className="shrink-0 pt-3">
          <OnboardingProgress step={index + 1} total={TOTAL_STEPS} />
        </div>

        <div
          className={[
            'flex min-h-0 flex-1 flex-col',
            isKnow ? 'justify-start pt-4' : isHowItWorks ? '' : 'justify-center pt-2',
          ].join(' ')}
        >
          {/* Screen 1 — Welcome */}
          {isWelcome && (
            <div className="space-y-6 text-center">
              <MascotGlow tone="blue">
                <ToothCharacter color="blue" size={132} />
              </MascotGlow>
              <div className="space-y-3 px-1">
                <p className="type-label font-semibold text-[#5E89ED]">Welcome to JustSmile</p>
                <h1 className="type-onboarding-headline mx-auto max-w-[18rem] text-[#191919]">
                  Prevent problems before they become painful.
                </h1>
                <p className="type-body-lg text-[#667085]">
                  Check in on your smile, build brushing habits, and know when to seek care.
                </p>
              </div>
            </div>
          )}

          {/* Screen 2 — How It Works */}
          {isHowItWorks && (
            <>
              <div className="min-h-8 flex-[1.1]" aria-hidden />
              <HowItWorksSteps activeStep={howItWorksStep} onStepChange={setHowItWorksStep} />
              <div className="min-h-6 flex-[0.75]" aria-hidden />
            </>
          )}

          {/* Screen 3 — Goals */}
          {isGoals && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="type-onboarding-headline text-[#191919]">
                  What would you like help with?
                </h1>
                <p className="type-body-lg text-[#667085]">
                  Pick any that apply. You can change this anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {goalOptions.map(({ id, label, desc, accent, character }) => {
                  const selected = selectedGoals.has(id)
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSelectedGoals((s) => toggleGoal(s, id))}
                      className={[
                        'flex items-center gap-3 rounded-[1.125rem] border border-white/90 bg-white/95 p-3.5 text-left transition',
                        'shadow-[0_4px_20px_-6px_rgba(94,137,237,0.1)] active:scale-[0.98]',
                        selected ? `ring-2 ring-offset-2 ring-offset-white ${accent}` : '',
                      ].join(' ')}
                    >
                      <ToothCharacter color={character} size={40} className="shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading text-[14px] font-semibold text-[#191919]">
                          {label}
                        </span>
                        <span className="mt-0.5 block text-[13px] text-[#667085]">{desc}</span>
                      </span>
                      <span
                        className={[
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition',
                          selected
                            ? 'border-[#5E89ED] bg-[#5E89ED] text-white'
                            : 'border-[#E5E7EB] bg-white',
                        ].join(' ')}
                        aria-hidden
                      >
                        {selected && (
                          <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2.5 6 5 8.5 9.5 3.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Screen 4 — Important To Know */}
          {isKnow && (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <MascotGlow className="mb-3">
                  <ToothCharacter color="coach" size={80} />
                </MascotGlow>
                <h1 className="type-onboarding-headline text-[#191919]">
                  A few things to know
                </h1>
                <p className="type-body mt-2 max-w-[320px] text-[#667085]">
                  JustSmile helps you check in, build habits, and find care when you need it.
                </p>
              </div>

              <ul className="space-y-0 px-1">
                {knowItems.map((item, index) => (
                  <li
                    key={item.title}
                    className={[
                      'py-4',
                      index > 0 ? 'border-t border-[#E8EEF2]' : '',
                    ].join(' ')}
                  >
                    <p className="type-label font-semibold text-[#191919]">{item.title}</p>
                    <p className="type-body mt-1.5 leading-relaxed text-[#667085]">{item.copy}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          className="shrink-0 pt-6"
          style={{ paddingBottom: 'max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1.5rem))' }}
        >
          <div className="flex gap-4">
            {index > 0 && (
              <SecondaryButton onClick={goBack} className="min-w-0 flex-1 py-3.5">
                Back
              </SecondaryButton>
            )}
            <PrimaryButton onClick={next} className="min-w-0 flex-1 py-3.5">
              {isKnow
                ? 'Get Started'
                : isHowItWorks && howItWorksStep < HOW_IT_WORKS_STEPS.length - 1
                  ? 'Next step'
                  : 'Continue'}
            </PrimaryButton>
          </div>
          {isWelcome && (
            <button
              type="button"
              onClick={finish}
              className="mt-3 w-full py-2 text-center text-sm font-medium text-[#5E89ED]"
            >
              Skip intro
            </button>
          )}
        </div>
      </div>
    </GradientScreen>
  )
}
