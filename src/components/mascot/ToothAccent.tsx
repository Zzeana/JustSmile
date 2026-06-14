import { ToothCharacter, type ToothColor } from './ToothCharacter'
import { TOOTH_CARD_SIZE, TOOTH_COACH_SIZE, TOOTH_HEADER_SIZE } from './toothRoles'

export function ToothAccent({
  color,
  size = TOOTH_CARD_SIZE,
  className = '',
}: {
  color: ToothColor
  size?: number
  className?: string
}) {
  return <ToothCharacter color={color} size={size} className={`shrink-0 ${className}`.trim()} />
}

/** Purple Coach character with sparkle badge — support & questions. */
export function CoachToothBadge({ size = TOOTH_COACH_SIZE }: { size?: number }) {
  return (
    <div className="relative shrink-0">
      <ToothCharacter color="coach" size={size} />
      <span
        className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#BF9BDE] text-[10px] text-white shadow-sm"
        aria-hidden
      >
        ✦
      </span>
    </div>
  )
}

export function CardToothHeader({
  color,
  title,
  trailing,
}: {
  color: ToothColor
  title: string
  trailing?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2.5">
        <ToothAccent color={color} size={TOOTH_HEADER_SIZE} />
        <h2 className="type-section text-[#191919]">{title}</h2>
      </div>
      {trailing}
    </div>
  )
}
