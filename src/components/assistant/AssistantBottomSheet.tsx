import { useEffect, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_MAX_WIDTH, PAGE_GUTTER } from '../layout/pageLayout'
import {
  CARE_PROMPT_ICONS,
  IconCamera,
  IconHeart,
  IconMapPin,
  IconPersonCircle,
  IconQuestionCircle,
} from './AssistantSheetIcons'
import { useAssistant, CARE_COACH_PROMPTS } from '../../context/AssistantContext'

type SheetAction = {
  id: string
  label: string
  description?: string
  icon: React.ReactNode
  onSelect: () => void
}

function ActionIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8EEF2] text-[#5E89ED]">
      {children}
    </span>
  )
}

export function AssistantBottomSheet() {
  const panelId = useId()
  const navigate = useNavigate()
  const { sheetOpen, sheetMode, closeSheet, launchCoach } = useAssistant()

  useEffect(() => {
    if (!sheetOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeSheet()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheetOpen, closeSheet])

  if (!sheetOpen) return null

  const isCare = sheetMode === 'care'

  const actions: SheetAction[] = [
    {
      id: 'question',
      label: 'Ask a question',
      description: 'General oral wellness education',
      icon: <IconQuestionCircle />,
      onSelect: () => launchCoach({ source: 'general' }),
    },
    {
      id: 'snapshot',
      label: 'Understand my snapshot',
      description: 'Get help reading your latest check-in',
      icon: <IconCamera />,
      onSelect: () =>
        launchCoach({
          source: 'snapshot',
          intro: 'I can help you understand your snapshot in plain language.',
          prefill: 'Help me understand my latest Smile Snapshot.',
        }),
    },
    {
      id: 'concern',
      label: 'Talk through a concern',
      description: 'Calm support when something feels uncertain',
      icon: <IconHeart />,
      onSelect: () =>
        launchCoach({
          source: 'concern',
          intro: 'Tell me what is on your mind.',
          prefill: 'I have a concern about my oral health.',
        }),
    },
    {
      id: 'care',
      label: 'Find care nearby',
      description: 'Browse affordable care options',
      icon: <IconMapPin />,
      onSelect: () => {
        closeSheet()
        navigate('/find-care')
      },
    },
    {
      id: 'hygienist',
      label: 'Talk to a dental hygienist',
      description: 'Human support when available',
      icon: <IconPersonCircle />,
      onSelect: () =>
        launchCoach({
          source: 'general',
          intro: 'Request hygienist support for extra guidance when available.',
          prefill: 'I would like to connect with a dental hygienist for support.',
        }),
    },
  ]

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[55] bg-[#191919]/20 backdrop-blur-[2px]"
        aria-label="Close help menu"
        onClick={closeSheet}
      />

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby="assistant-sheet-title"
        className={`fixed inset-x-0 bottom-0 z-[60] mx-auto w-full ${APP_MAX_WIDTH} animate-[fadeIn_0.3s_ease-out] rounded-t-[1.5rem] border border-[#E8EEF2] bg-white ${PAGE_GUTTER} pb-6 pt-5 shadow-[0_-8px_40px_-8px_rgba(94,137,237,0.2)] safe-pb`}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E8EEF2]" aria-hidden />

        {isCare ? (
          <>
            <div className="space-y-1">
              <h2 id="assistant-sheet-title" className="font-heading text-[1.125rem] font-bold text-[#191919]">
                JustSmile Coach
              </h2>
              <p className="text-[14px] text-[#667085]">Pick a question to get started.</p>
            </div>

            <ul className="mt-4 space-y-2">
              {CARE_COACH_PROMPTS.map((prompt, index) => {
                const PromptIcon = CARE_PROMPT_ICONS[index] ?? IconQuestionCircle
                return (
                  <li key={prompt}>
                    <button
                      type="button"
                      onClick={() =>
                        launchCoach({
                          source: 'care',
                          intro: 'I can help you think through care options and what to ask.',
                          prefill: prompt,
                          suggestedPrompts: CARE_COACH_PROMPTS,
                        })
                      }
                      className="flex w-full items-center gap-3 rounded-[1.125rem] border border-[#E8EEF2] bg-[#FAFAFA]/80 px-3.5 py-3 text-left transition active:scale-[0.99] hover:bg-[#E8EEF2]/40"
                    >
                      <ActionIcon>
                        <PromptIcon />
                      </ActionIcon>
                      <span className="font-heading text-[14px] font-semibold leading-snug text-[#191919]">
                        {prompt}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <>
            <div className="space-y-1">
              <h2 id="assistant-sheet-title" className="font-heading text-[1.125rem] font-bold text-[#191919]">
                Need help?
              </h2>
              <p className="text-[14px] text-[#667085]">Ask a question or find care.</p>
            </div>

            <ul className="mt-4 space-y-2">
              {actions.map((action) => (
                <li key={action.id}>
                  <button
                    type="button"
                    onClick={action.onSelect}
                    className="flex w-full items-center gap-3 rounded-[1.125rem] border border-[#E8EEF2] bg-[#FAFAFA]/80 px-3.5 py-3 text-left transition active:scale-[0.99] hover:bg-[#E8EEF2]/40"
                  >
                    <ActionIcon>{action.icon}</ActionIcon>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-[14px] font-semibold text-[#191919]">
                        {action.label}
                      </span>
                      {action.description && (
                        <span className="mt-0.5 block text-[12px] text-[#667085]">{action.description}</span>
                      )}
                    </span>
                    <svg className="h-4 w-4 shrink-0 text-[#8B95A5]" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}
