import type { Metadata } from 'next'
import BreathingShapes from '@/components/BreathingShapes'

export const metadata: Metadata = {
  title: 'Breathing Exercises',
  description: 'Follow a simple breathing shape at your own pace. Choose a pattern, adjust the timing, and pause whenever you need to.',
  alternates: { canonical: '/breathing' },
}

export default function BreathingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12 pb-4 sm:pt-16">
      <header className="mb-8 max-w-2xl">
        <p className="text-small font-medium text-moss">A moment to notice your breath</p>
        <h1 className="mt-3 text-display text-plum">Breathing exercises</h1>
        <p className="mt-5 text-body-lg text-ink-muted">
          Pick a shape and follow its rhythm. Let your breath stay gentle, and choose a pace that feels comfortable for you.
        </p>
      </header>

      <BreathingShapes />

      <aside aria-labelledby="comfort-heading" className="mt-10 max-w-3xl border-l-2 border-moss pl-5">
        <h2 id="comfort-heading" className="text-h4">Listen to your body</h2>
        <p className="mt-3 text-small text-ink-muted">
          You don’t need to force a deep breath or a hold. If a pattern feels uncomfortable, stop and
          return to your usual breathing.
        </p>
      </aside>
    </div>
  )
}
