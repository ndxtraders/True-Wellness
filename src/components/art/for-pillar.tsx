import type { PillarKey } from '@/content/types'
import { BeeBloom, FigureHands, FigureSeated, FigureTree, Sprig } from './illustrations'

/**
 * One illustration per pillar, all five distinct.
 *
 * Repetition is the failure mode here: the first render of the classes hub used
 * the same seated figure on all fourteen cards and read as a template.
 */
const registry: Record<PillarKey, (p: { className?: string }) => React.JSX.Element> = {
  'returning-to-balance': FigureHands,
  'whole-person-thinking': BeeBloom,
  'somatic-movement': FigureTree,
  'mindful-meditation': FigureSeated,
  'healthy-meals': Sprig,
}

export function PillarArt({ pillar, className }: { pillar: PillarKey; className?: string }) {
  const Art = registry[pillar]
  return <Art className={className} />
}
