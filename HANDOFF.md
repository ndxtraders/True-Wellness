# True Wellness Movement, website handoff

**Last updated:** 2026-09-06
**Repo:** https://github.com/ndxtraders/True-Wellness (branch `main`)
**Local checkout:** `~/Desktop/True-Wellness-Site`
**Staging:** https://true-wellness-site.vercel.app (publicly reachable, no login)
**Owner:** Rev Vaughn. **Client:** Boclaire, his wife.
**Vercel project name:** `true-wellness-site`, which does not match the repo name `True-Wellness`. Do not guess hostnames from the repo name.

---

## 0. Read these three things before you touch anything

**1. GitHub may be ahead of the local checkout.**
Rev edits pages directly on github.com. Those edits never reach `~/Desktop/True-Wellness-Site` on their own. Run `git pull` before you read a file, and treat the file on GitHub as the truth when the two differ. Full procedure in section 4.

**2. The site is deliberately invisible to Google right now.**
One constant, `isLive` in `src/lib/site.ts`, is currently `false`. It suppresses `/robots.txt`, the `robots` meta tag, and the GA4 tag together. Do not flip it as a side effect of other work. Section 5 is the cutover checklist.

**3. There are no per-class page files.**
All fourteen class pages are generated from one data file. If you go looking for `src/app/classes/natures-sensory-gym/page.tsx` you will not find it and you must not create it. Section 8.

---

## 1. What this is

A new website for True Wellness Movement, a children's and family wellness
practice in Jamestown, Tuolumne County, California.

It replaces the existing site at https://github.com/ndxtraders/TrueWellnessMovement.

**The old repo is reference only. Do not modify it.** Rev has said this twice.
Its content and its integration identifiers carry over. Its design, palette,
typography and page structure deliberately do not. This is a new site, not a port.

---

## 2. Where everything lives

| Path | What it is |
|---|---|
| `~/Desktop/True-Wellness-Site` | This project. The git repo. |
| `~/Desktop/True Wellness Movement` | Source material. Not in the repo. |
| `~/Desktop/True Wellness Movement/BOCLAIRE_TRUE_WELLNESS_AI_MASTER_CONTEXT.md` | The brand, voice and claims bible, 59 sections. The governing brief. Read it before writing copy. |
| `~/Desktop/True Wellness Movement/Class descriptions/` | Boclaire's own class flyers. The source for every class page. Her wording wins over invented wording. |
| `~/Desktop/True Wellness Movement/Photos/` | Her supplied photos and the clean logo PNG. |
| `~/Desktop/True Wellness Movement/PRD-website-redesign.md` | The living PRD, base document plus amendments 1 to 5. **Canonical copy.** |

**The source folder is outside the repo on purpose.** The master context holds
pricing history and private business notes. The repo is public. Keep them apart.

A duplicate of the PRD sits at the repo root and is gitignored by the `PRD-*.md`
rule in `.gitignore`. The copy in `~/Desktop/True Wellness Movement` is canonical.
If the two differ, the one in the source folder is right.

### Sections of the master context that get cited most

- **6** do not rename a program that already has a name
- **12** voice
- **15 and 44** claim standards
- **34** do not make Boclaire sound perfect
- **40** the seven-question brand test
- **45** visual style, and the prohibition on drawing children as tiny adults

---

## 3. Stack

Next.js 16.3.4 (App Router, Turbopack), React 19, Tailwind v4, TypeScript.
Deploys to Vercel on push to `main`. Fully static, every route prerenders.

```bash
npm run dev        # localhost:3111
npm run build      # must stay clean, 32 routes
npm run typecheck
```

No CMS. Content is typed data in `src/content/`, shaped so a CMS (Keystatic was
the recommendation) can be layered on later without a rewrite.

---

## 4. The editing model, and how to backfill

Rev edits pages **directly on github.com**. That is deliberate and it is not
going to change. It means the local checkout goes stale silently.

### Before you read or change any file

```bash
cd ~/Desktop/True-Wellness-Site
git fetch origin
git status -sb            # is local behind origin/main?
git pull --ff-only origin main
```

If `--ff-only` refuses, the local checkout has commits that GitHub does not.
**Do not force anything and do not rebase without asking Rev.** Show him
`git log --oneline origin/main..HEAD` and `git log --oneline HEAD..origin/main`
and let him decide which side is right.

### Reading what he changed

```bash
git log --oneline -20
git diff HEAD~1 -- src/content/classes.ts     # or whatever he touched
```

His GitHub edits land as commits authored through the web editor. They are real
commits, so `git log -p` shows exactly what changed and nothing is lost.

### The specific risk

Copy edits and code edits collide in the same files. `src/content/classes.ts`
holds both the prose a human wants to edit and the typed structure the build
depends on. A hand edit that drops a comma or a closing brace breaks the build
for the whole site, not just one page.

So: **after any pull that brings in hand edits, run `npm run build` before doing
anything else.** A broken build on `main` means Vercel serves the last good
deployment and the new copy silently does not appear. That failure looks like
"my edit did nothing" rather than like an error.

---

## 5. Going live

The site is currently **noindex, no analytics, crawler-blocked**. This is on
purpose while it is being reviewed internally.

### The switch

`src/lib/site.ts`:

```ts
export const isLive = false
```

One boolean. It drives three things:

| What | File | While `false` | While `true` |
|---|---|---|---|
| `/robots.txt` | `src/app/robots.ts` | `Disallow: /` | `Allow: /` |
| `robots` meta tag | `src/app/layout.tsx` | `noindex, nofollow, nocache` | `index, follow` |
| GA4 tag `G-CBXJ1LM80R` | `src/app/layout.tsx` | not rendered at all | rendered |

Verified in the build output: with `isLive: false`, none of the 29 prerendered
HTML pages contains the GA4 script or the measurement id.

**Why one flag rather than three files.** The dangerous failure is launching with
a stale `Disallow: /` still in place. That makes a local business invisible on
Google indefinitely and raises no error anywhere. Three switches means three
chances to forget one.

**Why not an environment variable.** `VERCEL_ENV === 'production'` is true for the
production deployment of the staging project too, so it would have unblocked
crawlers on `true-wellness-site.vercel.app` immediately. The site goes live when
a person says it does.

### Cutover checklist

1. Point `truewellnessmovement.com` at this Vercel project.
2. Confirm `site.url` in `src/lib/site.ts` is the real domain. It already reads `https://truewellnessmovement.com`.
3. Delete `src/app/art-gallery/page.tsx`. It is an internal illustration review page, unlinked, and it should not exist on a public site.
4. Resolve the placeholder pricing, or accept shipping it. Every class is $167 with a visible "placeholder" note except Acupressure Therapy at $135, which is confirmed.
5. Flip `isLive` to `true`.
6. `npm run build`, confirm `/robots.txt` now reads `Allow: /` and the meta tag reads `index, follow`.
7. Push. Then fetch `https://truewellnessmovement.com/robots.txt` and confirm it in production, not just locally.
8. Add `src/app/sitemap.ts`, and in the same change add the `Sitemap:` line to `robots.ts`. It is left out today because a `Sitemap:` pointing at a 404 is a reported error in Search Console.
9. Submit the domain in Search Console.

### Sharing the staging site for internal review

Production on `true-wellness-site.vercel.app` is currently **open to anyone with
the URL**, no Vercel account needed. Verified by anonymous fetch. So no shareable
link is required today.

If Deployment Protection is ever turned on, the permanent shareable link is:
Vercel dashboard, project, **Deployments**, click the deployment, **Share**, set
the dropdown to **"Anyone with the link."** Revoke by setting it back to
**"Only people with access."** Manage all of them under **Deployment Protection**,
**Access**, **All Access**, **Shareable Links**. On a Hobby account there is a
limit of **one shareable link per account**. Production domains need Member or
Project Administrator; preview domains need Developer.

---

## 6. What is built

32 routes, all static.

```
/                            home
/about                       Boclaire, credentials, screening. Uses the painting.
/approach                    pillar hub, plus how we talk about wellness claims
/approach/[slug]             5 pillar pages
/classes                     hub, 14 classes grouped by audience
/classes/[slug]              14 class detail pages
/childrens-center            the outdoor wellness space and herb garden, donate
/childrens-center/sponsor    4 sponsorship tiers, DonorBox wired
/contact
/art-gallery                 INTERNAL. Unlinked. Delete before launch.
/robots.txt                  generated by src/app/robots.ts
/_not-found
```

Header navigation: Classes, Our Approach, Children's Center, About, plus a
DonorBox donate button. Footer adds Contact and the Linktree link.

### Known gaps in the routing

The homepage audience cards all route to `/classes` as a stopgap. The real
destinations (`/programs/children`, `/teens`, `/adults`, `/caregivers-elders`,
`/schools`) do not exist yet. This is the first compromise to revisit.

`/policies` does not exist. Nothing covers scope of practice, privacy, the photo
release for minors, or cancellation. Both forms collect PII and GA4 will run once
the site is live, so a privacy page is not optional at launch.

---

## 7. File map

```
src/
  app/
    layout.tsx              fonts, metadata, robots meta, GA4 gate, ArtDefs
    globals.css             ALL design tokens. Read the comment block at the top.
    robots.ts               generates /robots.txt from `isLive`
    page.tsx                home
    about/ approach/ classes/ childrens-center/ contact/ art-gallery/
  components/
    site-header.tsx  site-footer.tsx  logo.tsx
    waitlist-button.tsx     placeholder, opens a mailto, collects no email
    art/
      illustrations.tsx     11 hand-authored SVG components. The house style.
      defs.tsx              3 shared SVG filters, rendered once in the layout
      for-class.tsx         maps a class's `art` key to a component
      for-pillar.tsx        same, for pillars
  content/
    classes.ts              14 classes. THE file people actually edit.
    pillars.ts              5 pillars
    sponsorship.ts          4 sponsorship tiers
    types.ts                shared types, status labels, the `verified` gate
  lib/
    site.ts                 isLive, site constants, contact, integrations, disclosures
public/
  brand/                    logo masks, see section 10
  images/                   see section 12
```

---

## 8. How to edit content

### A class

**There is one file: `src/content/classes.ts`.** Each class is an object in the
`classes` array. `src/app/classes/[slug]/page.tsx` is the single template that
renders all fourteen, and `src/app/classes/page.tsx` renders the hub.

On GitHub:
`https://github.com/ndxtraders/True-Wellness/blob/main/src/content/classes.ts`

Fields, from `ClassOffering`:

| Field | Notes |
|---|---|
| `slug` | The URL. `/classes/<slug>`. Changing it breaks any existing link. |
| `name` | Never rename a program without Boclaire's say-so. Master context 6. |
| `nameKo` | Korean name where one is fixed. `두뇌 건강 지원 세션` is exact, never substitute `어르신 두뇌 운동`. |
| `audience` | One of `children`, `teens`, `adults`, `caregivers-elders`, `families-parents`, `schools`, `events`, `spiritual`. Drives which group the card lands in on the hub. |
| `audienceLabel` | The line above the h1 on the detail page. |
| `summary` | One sentence on the card. Activity, not outcome. |
| `body` | Array of paragraphs on the detail page. One string per paragraph. |
| `status` | `enrolling`, `waitlist`, `by-request`, `in-development`. Renders as a visible chip. |
| `price`, `priceUnit`, `priceConfirmed` | `priceConfirmed: false` prints the visible placeholder note. |
| `art` | Which illustration. One of `seated`, `pair`, `walking`, `tree`, `elder`, `hands`, `bee`, `sprig`. Defaults to `seated`. |
| `faithBased` | Prints a "Faith-based" marker. |
| `source`, `verifyNote` | Internal only, never rendered. Where the copy came from and what still needs confirming. |

The fourteen slugs today:

```
natures-sensory-gym          meditative-wellness-walk     mindful-movement-workout
body-prayer-session          kids-birthday-hike-party     adult-birthday-hike-party
rv-wellness-retreat          childrens-bible-study        teen-girls-bible-circle
acupressure-therapy          brain-wellness-for-elders    mindful-teen-circle
private-somatic-flow         wellness-walk
```

**Faith-based classes sit under `audience: 'spiritual'`.** This keeps their
Christian framing clear. Keep the public label simple and factual. Do not add
commentary about the visitor's beliefs or choices.

Open item: `body-prayer-session` is flagged `faithBased` but still sits under
`adults`. Decide whether it belongs in `spiritual` too.

Also: "For children" and "For teens" currently show one class each. That is not a
bug in the code, it is the missing-programs blocker in section 13 showing through.

### A pillar

`src/content/pillars.ts`. Five: Returning to Balance, Whole-Person Thinking,
Somatic Movement, Mindful Meditation, Healthy Meals.

Two of them carry `definitionConfirmed: false`. "Returning to Balance" and
"Whole-Person Thinking" appear nowhere in the master context. They were inferred
from Boclaire's philosophy and they are faithful to it, but they are inferences
and she has not signed off.

### A sponsorship tier

`src/content/sponsorship.ts`. Four tiers named for Sierra foothills plants:
California Poppy $167, Yerba Santa $500, Elderberry $1,000, Oak $2,000.

The naming is Boclaire's and it is some of the better brand work on the old site.
It is preserved exactly.

The arithmetic is coherent and worth knowing: every tier is **$10.42 per
child-hour**, based on 16 hours per child. $167 is one child's share of the
$2,000 monthly program. It is a **sponsorship rate, not a class price.**
Conflating them means charging a parent what it costs a donor to fund a child.

### Honesty is structural, not editorial

`src/content/types.ts` defines two gates. Do not route around either.

- **`status`** A concept may appear on the site as long as it is labeled one.
- **`verified`** Anything `false` is filtered out of the public build by `publicOfferings()`. An unconfirmed fact cannot ship by accident.

They exist because Boclaire's own standards forbid presenting a concept as a
running class, and because memory is not a control.

---

## 9. Design decisions, do not silently reverse

### Light only. There is no dark theme.

Rev, twice: *"why are you using a dark theme for a wellness site? It doesn't fit
the mood"* and *"the site needs to be bright and light, not dark. This isn't a
tech site."*

The dark theme is fully removed and `html { color-scheme: light }` is set, which
also keeps form controls, scrollbars and autofill light for a visitor whose OS is
dark. Do not add `prefers-color-scheme` back. Supporting an inverted theme
doubled the QA surface and it introduced real bugs.

### Palette: "Oak & Iris". Purple is the ink, not an accent.

Every value was sampled or contrast-tested, not chosen by eye. Full reasoning is
in the comment block at the top of `src/app/globals.css`.

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#faf6f0` | warm paper |
| `--color-surface` | `#f1eae0` | raised sections |
| `--color-ink` | `#2b2130` | 14.31:1. Never `#000`. |
| `--color-ink-muted` | `#5b4e60` | 7.21:1 |
| `--color-plum` | `#5c2e6f` | brand ink, sampled from the mark, 9.40:1 |
| `--color-moss` | `#4a6741` | text-safe green, 5.90:1 |
| `--color-amber` | `#8a5e12` | the accent, 5.29:1 |
| `--color-sage` | `#adc987` | **field only** |
| `--color-lilac` | `#d3a0e3` | **field only** |
| `--color-sun` | `#e8b23c` | **field only** |
| `--color-forest` | `#4a6741` | **field only**, landscape foreground |

**Terracotta is gone.** Cream ground plus high-contrast serif plus terracotta is
the single most recognizable generated-page signature, and the site was shipping
all three. Amber is earned twice over instead: the bee in Boclaire's own "Bee
Happy" photograph is amber, and the Sierra foothills are gold, which is what her
Heavenly Hills frames actually show. Gold against purple is also uncommon in this
market, where clay is the house default.

**The old site's `#83B14E` green is retired in the roles that broke it.** It
failed WCAG AA as text (2.33:1) and as a button ground (2.51:1). It survives only
as `--color-sage`, knocked back to 65% over the paper, where it is a ground and
nothing sits on it except ink at 8.42:1 and plum at 5.53:1.

Four structural rules:

1. Sage, lilac, sun and forest are **grounds, never figures.** They never carry text, an icon, a meaningful border, or a button label.
2. On a sage field: ink for body copy, plum for large display headings. **White on sage is forbidden**, 2.51:1.
3. Purple is never figure-and-ground against an earth accent. They sit at near-identical luminance and mud together. Separate them with `bg`, `surface`, or art.
4. One saturated field per viewport.

### Typography: Fraunces plus Hanken Grotesk

Replaces Playfair Display plus Lato. Playfair's hairlines fail below 28px, which
forces the huge-headline-over-tiny-grey-body template silhouette, and
Playfair plus Lato is the Squarespace and Wix wellness template stack.

Fraunces carries the `SOFT` and `WONK` axes and they are dialed up at display
sizes. That irregularity is the one detail that could only belong to this brand.
The axes are set per element in `globals.css`, and declaring `axes` in
`next/font` means `weight` must be left off entirely.

### The illustration system

`src/components/art/illustrations.tsx`, eleven hand-authored SVG components.

This is the answer to the photography problem, and Rev chose the reference
himself: *Breathe* magazine, and to a lesser extent *Mantra*. Faceless figures
are explicitly approved. It solves three things at once. There is no photograph
of Boclaire's face in any asset. Photographing children requires a signed release
from every parent. And master context 45 forbids drawing children as tiny adults.

Components: `HillsSun` (takes `compact` and `withFigures`), `ArcBand`,
`FigureSeated`, `FigurePair`, `FigureWalking`, `FigureTree`, `FigureElder`,
`FigureHands`, `Sprig`, `BeeBloom`, `SeedHead`.

Review them all at `/art-gallery` while it still exists.

### The logo is an alpha mask

`public/brand/*-mask.png` are white-on-transparent masks driven by CSS
`mask-image` with `background-color: currentColor`, so one asset recolors
correctly anywhere. Built from `True Wellness Movement 2 Logo.png`, the clean one.
Ring centre (440, 484), radius about 378 in mask space.

- `wordmark-mask.png` full mark, header
- `roundel-mask.png` circle and figure only, for 64px and below where the arc text is illegible

**There is still no vector.** A real SVG would be better. Ask Boclaire's designer,
Canva, her print vendor, or her signage supplier before anyone hand-traces it.

---

## 10. Traps that have already cost a debug cycle

**Tailwind v4 dropped v3's bare custom property syntax.** `p-[--x]` is no longer
valid. It must be `p-(--x)`. This is the worst bug in the project's history
because it **fails silently**: the class name looks right, the build passes,
typecheck is clean, and every affected rule emits invalid CSS that the browser
discards. 52 utilities were affected. Every section rendered with 0px padding and
every card with 0px radius, which is exactly what Rev was complaining about when
he said the content blocks looked crowded. If spacing looks wrong, grep for
`-[--` before assuming anything else.

**SVG filters default to `filterUnits="objectBoundingBox"`.** A stroke-only path
has a near-zero-width bounding box, so the filter region clips the stroke to a
hairline. This is why 31 stroke-only elements have no filter applied. Documented
in `src/components/art/defs.tsx`.

**Keep element defaults inside `@layer base` in `globals.css`.** Unlayered rules
beat Tailwind's layered utilities, so an unlayered `h3` selector defeats a
`text-caption` utility on the same element. This already caused one visible bug.

**A text token used as a large field inverts badly.** `--color-forest` exists
separately from `--color-moss` for this reason, even though they share a value
today. Moss is a text color and may be tuned for legibility. Forest is a ground
and may be tuned for depth. Collapse them and one of the two jobs eventually loses.

**This machine has no ImageMagick, no potrace, no PIL.** Image work was done with
small Swift and CoreGraphics programs. Reuse that approach rather than installing
globals without asking. Gotcha: `NSBitmapImageRep` can report `bitsPerPixel: 32`
with `samplesPerPixel: 3`, a padding byte. Stride by `bitsPerPixel / 8`, never by
`samplesPerPixel`, or you read across channel boundaries.

**Check `df -h` when a native module fails to load.** Rev's disk hit 145 MB free
on a 228 GB drive and it silently truncated Next's SWC binary mid-install. The
symptom is `segment '__TEXT' load command content extends beyond end of file`.

**Do not infer a Vercel deployment's existence from guessed hostnames.** The
project is `true-wellness-site`, named after the local folder, not after the repo.
Three guessed hostnames returning 404 led to a wrong conclusion that no deployment
existed. Ask, or check the dashboard.

**American spellings.** This is a California business. A previous copy pass
introduced "programme", "behaviour", "practised" and "journalling". They have been
normalized. Do not reintroduce them.

**No em dashes anywhere.** Rev's standing rule across all his projects.

---

## 11. Integrations, carried over verbatim, do not regenerate

All in `src/lib/site.ts`. These are live and attached to real accounts. Changing
a value silently breaks a revenue or measurement path.

| Service | Identifier |
|---|---|
| GA4 | `G-CBXJ1LM80R`, carries all measurement history. Currently gated off by `isLive`. |
| MailerLite | account `53138`, form `4tjIUv` |
| Web3Forms | `44e85080-7afb-4ca2-8c9f-4c7485323760` |
| DonorBox | campaign slug `true-wellness`, the only wired payment path |
| Linktree | `linktr.ee/truewellnessmovement` |
| Spotify | episode `1gTuKRVYZlKgkISZ52EeEW` |

### DonorBox does more than the old site used it for

Monthly recurring **already works**. The old site never used it: all four
sponsorship tiers pointed at an on-page email form, and the three donate buttons
used the bare campaign URL with no parameters. Four priced tiers were described in
detail and none of them could be paid for.

Both deep-link parameters are verified working on the public campaign URL, not
just the embed: `default_interval=m` preselects Monthly, `amount=<n>` prefills the
custom amount. `donorboxUrl({ amount, monthly })` in `src/lib/site.ts` builds them.

An embed path exists too if the form should ever be on-page rather than linked:
`https://donorbox.org/embed/true-wellness` plus the widget script at
`https://donorbox.org/widgets.js`.

### The waitlist is a placeholder

`src/components/waitlist-button.tsx`. There is no signup endpoint yet, Boclaire is
still building the MailerLite forms.

It deliberately **does not collect an email address.** Capturing addresses with
nowhere to put them loses them and promises a list membership that does not exist.
It opens a pre-addressed `mailto:` instead, which actually reaches her.

To wire it up: swap the `href` for the MailerLite form URL. Nothing else changes.

### Legacy redirects

In `next.config.ts`. `/sponsors.html` goes to `/childrens-center/sponsor`,
`/index.html` goes to `/`. **Both targets now exist**, so neither redirect lands
on a 404 any more. `sponsors.html` is indexed on the old site and is its primary
conversion path, so do not break this.

---

## 12. Images

`public/images/`.

| File | Verdict |
|---|---|
| `boclaire-painting.jpg` | **In use** on `/about` only. Rev approved it explicitly. It is a photo of a painting, not a portrait. He tried it in the homepage hero and rejected it: a realistic oil portrait clashes with the flat vector illustration system. |
| `heavenly-herb-garden.jpg` | **One page only**, the Children's Center, per Rev, who plans to edit it. It is 9.1 MB, it has the **Google Gemini watermark baked into the pixels**, and it is a PNG wearing a `.jpg` extension. It fails Core Web Vitals on its own. |
| `hero.jpg` | **Not used.** AI generated, and 1290px caps at about 645 CSS px on a 2x display, so it is already blurry in a full-bleed slot. |
| `mountain-bottom.jpg` | **Do not ship.** It is a screenshot of a rendered web footer, with a white curved edge and a scroll-to-top button baked in. It cannot survive a different background. Use an SVG mask or `clip-path`. |

### Two things still needing action before any of Boclaire's photos ship

1. **GPS EXIF.** Four of her source photos carry coordinates from shots at or near her property. Strip EXIF before publishing any of them.
2. **Orientation flags.** Four carry non-identity EXIF orientation, three at `6` and one at `3`. Most compression presets strip EXIF. Strip without baking the rotation into pixels first and three landscapes render sideways and one upside down, in production, silently.

`Love my skin.jpg` in the source folder is **excluded**: different woman, and it
carries burned-in **TSkin USA** branding, another company.

---

## 13. Blocked on Boclaire, ranked

These block real work. Nothing downstream is honest without them.

1. **Which classes can someone actually book this month, and at what price?** The single biggest blocker. It drives every status chip and all pricing. The live site still says "Classes Begin Fall 2026" and it is now September 2026.
2. **Does an original vector logo file exist?** Designer, Canva, print vendor, signage supplier, Instagram profile upload.
3. **Is a half-day photo shoot in budget?** There is no photograph of Boclaire's face in any asset. A shoot also covers a children's class in session with signed releases for every minor, a mommy-and-me pair, a somatic single, the studio interior, and a detail set.
4. **Credential verification.** Is it "Certified Acupressure **Teacher**" (master context) or "certified in Acupressure **Therapy**" (her own flyers)? Therapist is the stronger claim, so the conservative wording stands until she says. Still unconfirmed and held back: the April 2026 Sonora Living feature. Restored from her flyers and now on the page: the book *Children's Meditation Stories*, Sierra Yoga Center, Mindful Mom, and the Tuolumne County Recreation Department role.
5. **Exact 501(c)(3) status.** Filed, pending, or fiscally sponsored? Is there an EIN? It drives donation copy, schema types, and the honest answer donors ask. The site currently says "currently pursuing" and "not tax-deductible at this time."
6. **Do the two proposed pillar definitions get approved?** Flagged in code as `definitionConfirmed: false`.
7. **Is she Live Scan cleared, insured, and mandated-reporter trained today?** `/about` states the Live Scan screening and the DOJ mandated reporter training. These are the highest-converting sentences on the site for parents and schools, and only if true.

### On claims

Rev has confirmed the Tuolumne County statistics come from separate research he
holds sources for. **Use them as written. Do not re-litigate them and do not redo
that research.** He also asked for no further web research on this project,
though he has since supplied specific URLs case by case.

---

## 14. Next up, in order

1. Get real prices and availability, then flip `priceConfirmed` and set real statuses.
2. Wire MailerLite into `WaitlistButton`.
3. `/policies`. Scope of practice, privacy, cancellation, photo release for minors. None of it exists and the privacy page is required at launch.
4. Audience pages, so the homepage cards stop all pointing at `/classes`.
5. Photo shoot. It replaces the painting, kills the AI hero, and fills every empty slot.
6. `src/app/sitemap.ts`, schema.org markup, OG images. Add the `Sitemap:` line to `robots.ts` in the same change.
7. Korean surface at `/ko/` for the elder work. `두뇌 건강 지원 세션` is fixed and must be preserved exactly.
8. Delete `/art-gallery`.

---

## 15. Working with Rev

From his global CLAUDE.md and confirmed repeatedly in session.

- **Terse.** Under 100 words in chat. No recaps, no summary tables, no trailing suggestions, no "next steps" unless he asks. Deliverables keep full register.
- **He leads, you decide.** He asks for decisions, not menus. Make the call, state the assumption, move.
- **If you find something in scope, fix it.** Do not report it back as an open item.
- **Never push to `main` without explicit permission.** Never force-push. No `reset --hard` or `clean -fd` without confirmation.
- **Never delete his files** without explicit confirmation. Back up before modifying anything he did not just create.
- **Do not modify `.env` files or credentials** without asking.
- **Verify before declaring done.** Run the build. He has caught inaccurate claims more than once, and each time the cause was inference presented as fact rather than a check that was actually run.
- **Be economical.** The account has been in extra usage. Do not spawn agent fleets for work you can do directly.
