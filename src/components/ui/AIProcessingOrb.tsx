/** Soft blue/mint AI orb for scan analysis states only. */
export function AIProcessingOrb({ size = 112 }: { size?: number }) {
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }} aria-hidden>
      <div className="ai-orb-glow absolute inset-0 rounded-full" />
      <div
        className="absolute inset-[6%] rounded-full border border-dashed border-[#5E89ED]/35 ai-orb-ring"
        style={{ borderWidth: 1.5 }}
      />
      <div className="ai-orb-core absolute inset-[18%] rounded-full" />
      <div className="ai-orb-shimmer absolute inset-[28%] rounded-full opacity-70" />
    </div>
  )
}

export function AIProcessingOverlay({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 safe-px backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-sm rounded-[1.5rem] border border-white/80 bg-white/95 p-8 text-center shadow-[0_16px_48px_-12px_rgba(94,137,237,0.28)] backdrop-blur-sm">
        <AIProcessingOrb />
        <p className="mt-6 font-heading text-[17px] font-semibold text-[#191919]">{title}</p>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-[#667085]">{subtitle}</p>}
      </div>
    </div>
  )
}
