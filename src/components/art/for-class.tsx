import type { ArtKey } from '@/content/classes'
import {
  BeeBloom,
  FigureElder,
  FigureHands,
  FigurePair,
  FigureSeated,
  FigureTree,
  FigureWalking,
  Sprig,
} from './illustrations'

const registry = {
  seated: FigureSeated,
  pair: FigurePair,
  walking: FigureWalking,
  tree: FigureTree,
  elder: FigureElder,
  hands: FigureHands,
  bee: BeeBloom,
  sprig: Sprig,
} as const

/**
 * Picks the illustration for a class.
 *
 * Falls back to the seated figure rather than rendering nothing, so a class
 * added without an `art` key still gets a card that looks finished. An empty
 * image slot is the defect that made the first version of this site read as a
 * document rather than a website.
 */
export function ClassArt({ art, className }: { art?: ArtKey; className?: string }) {
  const Art = registry[art ?? 'seated']
  return <Art className={className} />
}
