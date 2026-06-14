import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { getAssistantReply } from '../../lib/chatAssistantReplies'

type Msg = { id: string; role: 'user' | 'assistant'; text: string }

const WELCOME =
  "Hi! I’m your JustSmile guide. I can explain scans, habits, and everyday oral wellness in plain language-I’m not a doctor and I don’t diagnose. What’s on your mind?"

export function ChatAssistant() {
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: 'welcome', role: 'assistant', text: WELCOME },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  useEffect(() => {
    if (open) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [open, messages, scrollToBottom])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  function send() {
    const text = input.trim()
    if (!text) return
    setInput('')
    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    window.setTimeout(() => {
      const reply = getAssistantReply(text)
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: reply }])
    }, 350)
  }

  return (
    <>
      {/* Floating guide - sits above tab bar */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 z-[60] h-16 w-16 rounded-full bg-white p-[3px] shadow-lg shadow-teal-900/15 ring-2 ring-teal-200/90 transition hover:ring-teal-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 active:scale-95"
        style={{ bottom: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))' }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label="Open chat guide"
      >
        <span className="relative block h-full w-full overflow-hidden rounded-full bg-gradient-to-b from-teal-50/90 to-teal-100/50 ring-1 ring-inset ring-teal-100/70">
          <img
            src="/chat-guide-icon.png?v=4"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-contain object-center p-0.5"
            draggable={false}
          />
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[70] bg-stone-900/35 backdrop-blur-[2px]"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          />

          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-assistant-title"
            className="fixed inset-x-0 bottom-0 z-[80] mx-auto flex h-[min(88dvh,640px)] w-full max-w-lg flex-col rounded-t-3xl border border-stone-200/90 bg-white shadow-2xl safe-pb"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-stone-100 px-4 py-3">
              <div>
                <h2 id="chat-assistant-title" className="font-heading text-base font-semibold text-stone-900">
                  Guide
                </h2>
                <p className="text-xs text-stone-500">Wellness tips-not medical advice</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-label="Close chat"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div
              ref={listRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-teal-600 text-white'
                        : 'bg-stone-100 text-stone-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              className="shrink-0 border-t border-stone-100 p-3"
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
            >
              <div className="flex gap-2">
                <label htmlFor="chat-assistant-input" className="sr-only">
                  Message
                </label>
                <input
                  id="chat-assistant-input"
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  autoComplete="off"
                  className="min-w-0 flex-1 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-[15px] text-stone-900 placeholder:text-stone-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
                />
                <button
                  type="submit"
                  className="font-heading shrink-0 rounded-2xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}
