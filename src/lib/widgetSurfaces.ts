/** Semantic surface fills — use only when color communicates meaning */
export type SemanticSurface = 'healthy' | 'attention' | 'coach' | 'white'

export const SEMANTIC_SURFACE: Record<SemanticSurface, string> = {
  healthy: 'bg-[#E9FFDB]', // Fresh Mint
  attention: 'bg-[#FFDBA7]', // Peach Fuzz
  coach: 'bg-[#D7C3F8]', // Soft Lilac
  white: 'bg-white',
}

export function semanticSurface(tone: SemanticSurface): string {
  return SEMANTIC_SURFACE[tone]
}

/** @deprecated use SemanticSurface */
export type WidgetTone = SemanticSurface

/** @deprecated use SEMANTIC_SURFACE */
export const WIDGET_SURFACE = SEMANTIC_SURFACE

export function widgetSurface(tone: SemanticSurface): string {
  return SEMANTIC_SURFACE[tone]
}
