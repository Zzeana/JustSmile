/** Did you know hero (onboarding). Asset: `/public/onboarding-did-you-know.png`. Goal icons: `/public/onboarding-goals/*.png`. */

export function DidYouKnowIllustration(props: { className?: string }) {
  return (
    <img
      src="/onboarding-did-you-know.png?v=1"
      alt=""
      className={`object-contain ${props.className ?? ''}`}
      draggable={false}
    />
  )
}
