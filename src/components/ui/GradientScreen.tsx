import type { ReactNode } from 'react'
import { CARD_PAD, CARD_SHELL } from '../layout/pageLayout'
import { SEMANTIC_SURFACE, type SemanticSurface } from '../../lib/widgetSurfaces'

export function GradientScreen({
  children,
  className = '',
  variant: _variant = 'hero',
}: {
  children: ReactNode
  className?: string
  variant?: 'hero' | 'clinical' | 'celebrate'
}) {
  return (
    <div className={`relative min-h-full bg-transparent ${className}`}>
      <div className="relative">{children}</div>
    </div>
  )
}

export function MascotGlow({
  children,
  className = '',
}: {
  children: ReactNode
  tone?: 'blue' | 'mint' | 'both'
  className?: string
}) {
  return <div className={`relative flex items-center justify-center ${className}`}>{children}</div>
}

export function Card({
  children,
  className = '',
  tone = 'white',
}: {
  children: ReactNode
  className?: string
  glow?: boolean
  tone?: SemanticSurface
}) {
  return (
    <div
      className={[
        CARD_SHELL,
        CARD_PAD,
        SEMANTIC_SURFACE[tone],
        'shadow-[0_1px_2px_rgba(25,25,25,0.03),0_4px_16px_-6px_rgba(25,25,25,0.05)]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export function PrimaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={[
        'w-full rounded-2xl bg-[#5E89ED] py-3.5 type-body font-semibold text-white',
        'shadow-[0_4px_14px_-4px_rgba(94,137,237,0.35)] transition',
        'hover:bg-[#4A75D9] active:scale-[0.98] disabled:opacity-50',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={[
        'w-full rounded-2xl bg-white py-3.5 type-body font-semibold text-[#191919]',
        'shadow-[0_1px_2px_rgba(25,25,25,0.06),0_2px_8px_-2px_rgba(25,25,25,0.06)] transition',
        'hover:bg-[#FAFAFA] active:scale-[0.98] disabled:opacity-50',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
