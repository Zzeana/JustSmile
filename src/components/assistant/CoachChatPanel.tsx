import { useCallback, useEffect, useRef, useState } from 'react'
import { CoachToothBadge } from '../mascot/ToothAccent'
import { getAssistantReply } from '../../lib/chatAssistantReplies'
import type { CoachLaunch } from '../../context/AssistantContext'

type Msg = { id: string; role: 'user' | 'assistant'; text: string }

const BASE_WELCOME =
  'Ask me about scans, habits, anxiety, or finding care.'

export function CoachChatPanel({
  launch,
  suggestedPrompts,
  prefillRequest,
}: {
  launch?: CoachLaunch | null
  suggestedPrompts: string[]
  prefillRequest?: string | null
}) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: 'welcome', role: 'assistant', text: launch?.intro ?? BASE_WELCOME },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const appliedLaunch = useRef<string | null>(null)

  const scrollToBottom = useCallback(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (!launch) return
    const key = JSON.stringify(launch)
    if (appliedLaunch.current === key) return
    appliedLaunch.current = key

    const intro = launch.intro ?? BASE_WELCOME
    setMessages([{ id: 'welcome', role: 'assistant', text: intro }])
    if (launch.prefill) setInput(launch.prefill)
    window.setTimeout(() => inputRef.current?.focus(), 100)
  }, [launch])

  useEffect(() => {
    if (!prefillRequest) return
    setInput(prefillRequest)
    window.setTimeout(() => inputRef.current?.focus(), 100)
  }, [prefillRequest])

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setInput('')
    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    window.setTimeout(() => {
      const reply = getAssistantReply(trimmed)
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: reply }])
    }, 350)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  const welcomeMsg = messages[0]?.role === 'assistant' ? messages[0] : null
  const threadMessages = welcomeMsg ? messages.slice(1) : messages

  return (
    <div className="space-y-4">
      {welcomeMsg && (
        <div className="flex items-start gap-3">
          <CoachToothBadge />
          <p className="min-w-0 pt-1 text-[15px] leading-relaxed text-[#191919]">{welcomeMsg.text}</p>
        </div>
      )}

      <div
        ref={listRef}
        className={[
          'space-y-2.5 overflow-y-auto rounded-[1.125rem] bg-[#FAFAFA] p-3.5',
          threadMessages.length > 0 ? 'max-h-52' : 'hidden',
        ].join(' ')}
        role="log"
        aria-live="polite"
      >
        {threadMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={[
                'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed',
                msg.role === 'user'
                  ? 'bg-[#5E89ED] text-white'
                  : 'bg-white text-[#191919] shadow-[0_1px_2px_rgba(25,25,25,0.06)]',
              ].join(' ')}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => sendMessage(prompt)}
            className="rounded-full bg-[#BF9BDE] px-3 py-1.5 text-left text-[12px] leading-snug text-white transition hover:bg-[#A888CC]"
          >
            &ldquo;{prompt}&rdquo;
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <label htmlFor="coach-chat-input" className="sr-only">
          Ask about your smile
        </label>
        <input
          id="coach-chat-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your smile…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-2xl bg-white px-4 py-3 text-[15px] text-[#191919] shadow-[0_1px_2px_rgba(25,25,25,0.06)] placeholder:text-[#8B95A5] focus:outline-none focus:ring-2 focus:ring-[#BF9BDE]/30"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="shrink-0 rounded-2xl bg-[#BF9BDE] px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-[#A888CC] disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  )
}
