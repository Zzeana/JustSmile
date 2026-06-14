const PROFILE_NAME_KEY = 'justsmile_profile_name_v1'

export function getUserDisplayName(): string {
  try {
    return localStorage.getItem(PROFILE_NAME_KEY)?.trim() || 'Zeana'
  } catch {
    return 'Zeana'
  }
}

export function getUserInitials(name = getUserDisplayName()): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
  }
  return (parts[0]?.slice(0, 1) ?? 'Z').toUpperCase()
}

export function timeGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}
