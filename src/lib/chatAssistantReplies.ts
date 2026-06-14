/**
 * Simple guide responses-offline, not a medical model.
 * Always encourage professional care for symptoms and emergencies.
 */
export function getAssistantReply(userMessage: string): string {
  const m = userMessage.toLowerCase().trim()
  if (!m) {
    return "Take your time-when you’re ready, ask me about scans, habits, or how JustSmile fits into your routine."
  }

  // Urgent / safety-first
  if (
    /\b(severe|unbearable|can't swallow|cannot swallow|trouble breathing|fever|face swell|spreading|emergency|911|er\b|hospital)\b/.test(
      m,
    )
  ) {
    return "That sounds like something a clinician should see in person. If symptoms are severe or getting worse-especially trouble breathing or swallowing-please use urgent care, the ER, or emergency dental services near you. I’m only here for general guidance, not urgent assessment."
  }

  if (/\b(pain|hurts|aching|toothache)\b/.test(m)) {
    return "Pain is worth taking seriously. I can’t tell what’s causing it from chat. A dentist or urgent care can help you figure out next steps. Until you’re seen, gentle brushing and avoiding very hot or cold foods sometimes helps-skip DIY cures you’re unsure about."
  }

  if (/\b(anxious|anxiety|scared|nervous|afraid|dentist phobia)\b/.test(m)) {
    return "Lots of people feel uneasy about dental stuff-you’re not alone. Small steps help: tell your provider you’re nervous, ask what to expect, and bring headphones or a friend if it helps. JustSmile is meant to feel calm and judgment-free, too."
  }

  if (/\b(scan|photo|picture|snapshot|camera|result|risk)\b/.test(m)) {
    return "A scan in JustSmile is a quick photo check-in. You’ll get a simple snapshot-style read-not a diagnosis-with ideas for what to watch or do next. Lighting and angles matter, so think of it as a wellness nudge, not a label. You can always run another one later to compare."
  }

  if (/\b(brush|brushing|floss|habit|streak|coach)\b/.test(m)) {
    return "Great topic. Gentle brushing twice a day and cleaning between teeth most days is a solid baseline. The brushing coach walks you through two minutes in four areas-no rush. Habits you log here are just for you; small wins count."
  }

  if (/\b(gum|gums|gingivitis)\b/.test(m)) {
    return "Healthy gums often look firm and pink, but everyone’s mouth is different. If something’s sore, bleeding often, or changing, a hygienist or dentist can take a proper look. At home, soft circles along the gum line usually beat hard scrubbing."
  }

  if (/\b(cavity|decay|hole|crack)\b/.test(m)) {
    return "I can’t see your teeth from here or say if there’s decay-that needs an exam. If you notice a hole, sharp edge, or food always getting stuck in one spot, it’s worth booking a visit when you can."
  }

  if (/\b(whiten|whitening|yellow|stain)\b/.test(m)) {
    return "Stains happen for lots of reasons-food, drinks, age. Over-the-counter options exist, but what’s safe depends on your teeth and gums. A dentist can suggest something that fits you without irritating enamel or gums."
  }

  if (/\b(cost|cheap|afford|uninsured|money|free)\b/.test(m)) {
    return "Care costs can be tough. Community clinics, dental schools, and sliding-scale centers sometimes help-our Find Care screen lists example-style resources (mock data for now). You can also try 211 or your local health department for real options nearby."
  }

  if (/\b(when.*dentist|see a dentist|need.*dentist|appointment)\b/.test(m) || /\bhow often\b.*\b(check|visit|dentist)\b/.test(m)) {
    return "Many people aim for a routine check about every six months to a year, but your dentist may suggest something different. If something’s been bothering you for more than a week or two, earlier is usually better than waiting."
  }

  if (/\b(just ?smile|what is this|how does (this|it) work)\b/.test(m)) {
    return "JustSmile is here to support everyday oral wellness-photo check-ins, habit tracking, brushing coach, and gentle info. We’re not a substitute for a dentist and we don’t diagnose; think of us as a friendly guide on your phone."
  }

  if (/\b(diagnos|is this|do i have|am i)\b/.test(m)) {
    return "I’m not able to diagnose or say what’s going on with your mouth-only a licensed provider can do that after an exam. I’m happy to explain how the app works or share general wellness tips instead."
  }

  if (/\b(thank|thanks|ty\b|helpful)\b/.test(m)) {
    return "You’re so welcome. Taking care of your smile is a kindness to yourself-keep going at your own pace."
  }

  if (/\b(hi|hello|hey)\b/.test(m)) {
    return "Hi there! Ask me about scans, habits, the brushing coach, or finding care-I’ll do my best to point you in a helpful direction."
  }

  return "I’m not sure I caught that, but I’m here to help with JustSmile-scans, habits, brushing tips, or where to look for care. For anything medical or urgent, a dentist or clinic is the right call. What would you like to explore?"
}
