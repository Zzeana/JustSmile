import type { ReactNode } from 'react'
import { ProfileAvatarButton } from './ProfileAvatarButton'

type ScreenHeaderProps = {
  title: ReactNode
  trailing?: ReactNode
  variant?: 'display' | 'title'
  showProfile?: boolean
  className?: string
}

export function ScreenHeader({
  title,
  trailing,
  variant = 'title',
  showProfile = false,
  className = '',
}: ScreenHeaderProps) {
  const titleClass = variant === 'display' ? 'type-display' : 'type-h1'

  return (
    <header className={['flex shrink-0 items-center justify-between gap-4', className].join(' ')}>
      <h1 className={`min-w-0 text-[#191919] ${titleClass}`}>{title}</h1>
      {(trailing || showProfile) && (
        <div className="flex shrink-0 items-center gap-2.5">
          {trailing}
          {showProfile ? <ProfileAvatarButton /> : null}
        </div>
      )}
    </header>
  )
}

/** Standard page title row; profile avatar only when `showProfile` is set (Home). */
export function PageHeader({ showProfile = false, ...props }: Omit<ScreenHeaderProps, 'variant'>) {
  return <ScreenHeader {...props} variant="title" showProfile={showProfile} />
}
