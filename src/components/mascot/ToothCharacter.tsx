export type ToothVariant =
  | 'happy'
  | 'content'
  | 'neutral'
  | 'celebrate'
  | 'reassure'
  | 'wink'
  | 'surprised'
  | 'concerned'
  | 'sad'

export type ToothColor =
  | 'blue'
  | 'darkblue'
  | 'green'
  | 'teal'
  | 'purple'
  | 'coach'
  | 'pink'
  | 'yellow'
  | 'orange'

const CHARACTER_BASE = '/characters'

const colorFiles: Record<ToothColor, string> = {
  blue: 'blue.png',
  darkblue: 'darkblue.png',
  green: 'green.png',
  teal: 'teal.png',
  purple: 'purple.png',
  coach: 'coach.png',
  pink: 'pink.png',
  yellow: 'yellow.png',
  orange: 'orange.png',
}

/** Semantic variants → character artwork from Reference 2 */
const variantImages: Record<ToothVariant, ToothColor> = {
  happy: 'green',
  content: 'blue',
  neutral: 'purple',
  celebrate: 'green',
  reassure: 'darkblue',
  wink: 'teal',
  surprised: 'yellow',
  concerned: 'pink',
  sad: 'orange',
}

export function toothImageSrc(variant: ToothVariant | ToothColor): string {
  if (variant in colorFiles) {
    return `${CHARACTER_BASE}/${colorFiles[variant as ToothColor]}`
  }
  const color = variantImages[variant as ToothVariant]
  return `${CHARACTER_BASE}/${colorFiles[color]}`
}

export function ToothCharacter({
  variant = 'content',
  color,
  size = 80,
  className = '',
  alt = '',
}: {
  variant?: ToothVariant
  /** Override variant with a specific character color */
  color?: ToothColor
  size?: number
  className?: string
  alt?: string
}) {
  const src = color ? toothImageSrc(color) : toothImageSrc(variant)

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      draggable={false}
      aria-hidden={alt ? undefined : true}
      className={['object-contain', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
    />
  )
}
