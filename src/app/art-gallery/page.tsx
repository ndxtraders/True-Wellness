/** Internal art review page. Not linked, not in the sitemap. Delete before launch. */
import {
  ArcBand, BeeBloom, FigureElder, FigurePair, FigureSeated, FigureTree,
  FigureWalking, HillsSun, SeedHead, Sprig,
} from '@/components/art/illustrations'

const figures = [
  ['FigureSeated', <FigureSeated key="a" className="w-full" />],
  ['FigurePair', <FigurePair key="b" className="w-full" />],
  ['FigureWalking', <FigureWalking key="c" className="w-full" />],
  ['FigureTree', <FigureTree key="d" className="w-full" />],
  ['FigureElder', <FigureElder key="e" className="w-full" />],
] as const

export default function Gallery() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-h1">Illustration system</h1>

      <h2 className="mt-12 text-h3">Landscape</h2>
      <div className="mt-4"><HillsSun className="w-full" /></div>
      <div className="mt-2 bg-sage"><ArcBand className="w-full" /></div>

      <h2 className="mt-12 text-h3">Figures</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {figures.map(([n, el]) => (
          <div key={n} className="rounded-[--radius-card] border border-line bg-surface p-4">
            {el}
            <p className="mt-2 text-caption text-ink-muted">{n}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-h3">Botanical</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-3">
        <div className="rounded-[--radius-card] border border-line bg-surface p-6"><Sprig className="mx-auto h-56" /><p className="mt-2 text-caption text-ink-muted">Sprig</p></div>
        <div className="rounded-[--radius-card] border border-line bg-surface p-6"><BeeBloom className="w-full" /><p className="mt-2 text-caption text-ink-muted">BeeBloom</p></div>
        <div className="rounded-[--radius-card] border border-line bg-surface p-6"><SeedHead className="mx-auto h-40" /><p className="mt-2 text-caption text-ink-muted">SeedHead</p></div>
      </div>

      <h2 className="mt-12 text-h3">On a sage field</h2>
      <div className="mt-4 bg-sage p-10">
        <p className="text-h4 text-ink">Ink on sage, 6.14:1.</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <FigureSeated className="w-full" />
          <FigureTree className="w-full" />
          <BeeBloom className="w-full" />
        </div>
      </div>
    </div>
  )
}
