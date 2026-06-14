export function ProfileAvatarButton({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 44 : 36

  return (
    <button
      type="button"
      aria-label="Profile"
      className={[
        'shrink-0 overflow-hidden rounded-full',
        'ring-1 ring-[#D8E2F8]/80',
        'transition active:scale-[0.97]',
        size === 'lg' ? 'h-11 w-11' : 'h-9 w-9',
      ].join(' ')}
    >
      <img
        src="/profile-avatar-placeholder.png"
        alt=""
        width={dim}
        height={dim}
        draggable={false}
        aria-hidden
        className="h-full w-full object-cover"
      />
    </button>
  )
}
