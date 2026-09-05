import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { contact } from '@/lib/site'
import { ArcBand, FigureSeated, SeedHead, Sprig } from '@/components/art/illustrations'

export const metadata: Metadata = {
  title: 'About Boclaire',
  description:
    'Boclaire is a Natural Wellness Practitioner and Educator in Tuolumne County, California: a certified yoga, acupressure, and child development teacher.',
}

/**
 * Credentials come from Boclaire's master context.
 *
 * One open discrepancy, deliberately unresolved here. The master context says
 * "Certified Acupressure Teacher". Her own class flyers say "certified
 * acupressure therapist" and "certified in Acupressure Therapy". Therapist is
 * the stronger claim of the two, so the conservative wording stands until she
 * says which is right. Upgrading a credential on inference is exactly the thing
 * master context 36 forbids.
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

/**
 * Restored from Boclaire's own class-description flyers.
 *
 * The previous handoff held all four back as unverified, because they appear on
 * the old website but nowhere in the master context. Her flyers are the missing
 * source: "She is the author of Children's Meditation Stories and the founder of
 * Sierra Yoga Center, Mindful Mom, and the True Wellness Movement", and "She has
 * also served for many years as a contract instructor with the Tuolumne County
 * Recreation Department."
 *
 * Still held back, because no source available here confirms it: the April 2026
 * Sonora Living feature.
 */
const alsoTrue = [
  {
    label: 'Author',
    detail: '<em>Children’s Meditation Stories</em>',
  },
  { label: 'Founder', detail: 'Sierra Yoga Center' },
  { label: 'Founder', detail: 'Mindful Mom' },
  {
    label: 'Contract instructor',
    detail: 'Tuolumne County Recreation Department, for many years',
  },
]

const hasTaught = [
  'Kids yoga and movement classes',
  'Mindful Parenting workshops',
  'Growing Mindful Minds workshops',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero. The painting stays: it is the only likeness that exists. */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-(--spacing-section) lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <figure className="order-2 lg:order-1">
            <Image
              src="/images/boclaire-painting.jpg"
              alt="A painted portrait of Boclaire, eyes closed, hands together at the throat."
              width={1080}
              height={807}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="w-full rounded-(--radius-card) border border-line"
            />
            <figcaption className="mt-3 text-caption text-ink-muted">
              A painted portrait of Boclaire.
            </figcaption>
          </figure>

          <div className="order-1 lg:order-2">
            <p className="font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
              Your instructor
            </p>
            <h1 className="mt-4 text-display text-ink">Meet Boclaire</h1>
            <div className="mt-7 max-w-xl space-y-5 text-body-lg text-ink-muted">
              <p>
                Boclaire is a Natural Wellness Practitioner and Educator. She teaches yoga,
                movement, and mindfulness to children, families, caregivers, and elders here in
                Tuolumne County.
              </p>
              <p>
                Her work pulls from a lot of places: mindfulness, movement, yoga, acupressure,
                Traditional Chinese Medicine, child development, positive parenting, and a stubborn
                belief that time outside does more for most of us than one more indoor program.
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

      {/* Screening first, on the coloured field, because it is the thing a
          parent actually needs before any of the philosophy matters. */}
      <section className="bg-sage">
        <div className="mx-auto max-w-6xl px-5 pt-(--spacing-section) pb-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            <FigureSeated className="h-40 w-auto shrink-0" />
            <div className="max-w-2xl">
              <h2 className="text-h2 text-ink">Before the philosophy</h2>
              <p className="mt-5 text-body-lg text-ink">
                If you are handing your child to someone, you should get to know this part first.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {screening.map((c) => (
                  <li key={c} className="flex gap-3 text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-plum"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-small text-ink/85">
                Small groups, and a parent is welcome to stay for any children&rsquo;s class.
              </p>
            </div>
          </div>
        </div>
        <ArcBand className="-mb-px block w-full" />
      </section>

      {/* Training, and the separate list of things she has done. */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-(--spacing-section) md:grid-cols-2">
          <div>
            <div className="flex items-start gap-5">
              <Sprig className="hidden h-28 w-auto shrink-0 sm:block" />
              <div>
                <h2 className="text-h3 text-ink">Training and certification</h2>
                <ul className="mt-6 space-y-3">
                  {credentials.map((c) => (
                    <li key={c} className="flex gap-3 text-ink-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay"
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-h3 text-ink">Also</h2>
            <dl className="mt-6 space-y-5">
              {alsoTrue.map((a) => (
                <div key={`${a.label}-${a.detail}`} className="border-t border-line pt-4">
                  <dt className="font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
                    {a.label}
                  </dt>
                  <dd
                    className="mt-1 text-ink"
                    dangerouslySetInnerHTML={{ __html: a.detail }}
                  />
                </div>
              ))}
            </dl>

            <h3 className="mt-10 font-sans text-caption font-medium tracking-[0.06em] text-ink-muted uppercase">
              She has facilitated
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {hasTaught.map((t) => (
                <li
                  key={t}
                  className="rounded-pill border border-line-strong px-4 py-1.5 text-small text-ink-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Master context 34: do not make Boclaire sound perfect. */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="mx-auto flex max-w-3xl items-start gap-8">
            <SeedHead className="mt-2 hidden h-16 w-16 shrink-0 sm:block" />
            <div>
              <h2 className="text-h2 text-ink">Not trying to sound perfect</h2>
              <p className="mt-6 text-body-lg text-ink-muted">
                Boclaire does not have perfectly calm mornings or perfectly behaved days, and the
                work has never been about that. It is about noticing sooner, pausing where you can,
                and repairing when you do not. That goes for the people teaching as much as the
                people learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-(--spacing-section)">
          <div className="max-w-2xl">
            <h2 className="text-h3 text-ink">Come and see</h2>
            <p className="mt-5 text-ink-muted">
              Email her directly. She will tell you honestly whether what you need is something she
              does.
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
