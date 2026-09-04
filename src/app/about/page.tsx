import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { contact } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Boclaire',
  description:
    'Boclaire is a Natural Wellness Practitioner and Educator in Tuolumne County, California — a certified yoga, acupressure, and child development teacher.',
}

/**
 * Credentials listed here are the ones stated in Boclaire's own master context.
 * Several items on the previous site — a book, a founded studio, a recreation
 * department role, a magazine feature — are not in any source available here and
 * are deliberately held back until she confirms them. See HANDOFF.md.
 */
const credentials = [
  'Natural Wellness Practitioner & Educator',
  'Certified Child Development Teacher',
  'Certified Yoga Teacher',
  'Certified Acupressure Teacher',
  'Mindfulness Teacher',
  'Certified Trauma-Informed Practitioner',
]

const screening = ['DOJ mandated reporter training', 'Livescan background screening']

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-[--spacing-section] lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <figure className="order-2 lg:order-1">
            <Image
              src="/images/boclaire-painting.jpg"
              alt="A painted portrait of Boclaire, eyes closed, hands together at the throat."
              width={1080}
              height={807}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="w-full rounded-[--radius-card] border border-line"
            />
            <figcaption className="mt-3 text-caption text-ink-muted">
              A painted portrait of Boclaire.
            </figcaption>
          </figure>

          <div className="order-1 lg:order-2">
            <h1 className="text-h1 text-ink">Meet Boclaire</h1>
            <div className="mt-6 max-w-xl space-y-5 text-body-lg text-ink-muted">
              <p>
                Boclaire is a Natural Wellness Practitioner and Educator. She teaches yoga,
                movement, and mindfulness to children, families, caregivers, and elders here in
                Tuolumne County.
              </p>
              <p>
                Her work pulls from a lot of places — mindfulness, movement, yoga, acupressure,
                Traditional Chinese Medicine, child development, positive parenting, and a
                stubborn belief that time outside does more for most of us than one more indoor
                program.
              </p>
              <p>
                What she is most interested in is how it all connects. How the body, the mind,
                movement, the environment, relationships, and ordinary daily habits work on each
                other. That is usually where the useful answer is.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-[--spacing-section] md:grid-cols-2">
          <div>
            <h2 className="text-h3 text-ink">Training and certification</h2>
            <ul className="mt-6 space-y-3">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3 text-ink-muted">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-h3 text-ink">Working with children</h2>
            <p className="mt-6 text-ink-muted">
              If you are handing your child to someone, you should get to know this part before
              you get to the philosophy.
            </p>
            <ul className="mt-6 space-y-3">
              {screening.map((c) => (
                <li key={c} className="flex gap-3 text-ink-muted">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-[--spacing-section]">
          <div className="max-w-2xl">
            <h2 className="text-h2 text-ink">Not trying to sound perfect</h2>
            <p className="mt-6 text-body-lg text-ink-muted">
              Boclaire does not have perfectly calm mornings or perfectly behaved days, and the
              work has never been about that. It is about noticing sooner, pausing where you can,
              and repairing when you do not. That goes for the people teaching as much as the
              people learning.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/classes"
                className="rounded-pill bg-plum px-7 py-3.5 font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
              >
                See the classes
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="rounded-pill border border-line-strong px-7 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-plum hover:text-plum"
              >
                Email Boclaire
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
