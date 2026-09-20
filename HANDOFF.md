# True Wellness Movement, website handoff

**Last updated:** 2026-09-20, the day the site went live.
**Live:** https://www.truewellnessmovement.com
**Repo:** https://github.com/ndxtraders/True-Wellness (branch `main`)
**Local checkout:** `~/Desktop/True-Wellness-Site`
**Vercel project:** `true-wellness-site`, team **Raul Vaughn's projects** (Pro).
The project name does not match the repo name. Do not guess hostnames from either.
**Owner:** Rev Vaughn. **Client:** Boclaire, his wife.

Open work is **not in this file**. It is in `LAUNCH-PUNCHLIST.md` at the repo root.
This file explains how the thing is built and why. That one tracks what is still wrong.

---

## 0. Read these three things before you touch anything

**1. The site is live. Every push is public within a minute.**
`main` deploys to the real domain automatically. There is no staging branch and no
review step. A typo pushed at 9:02 is on a client's business website at 9:03.
Section 5 covers the deploy path and the rollback.

**2. GitHub is often ahead of the local checkout.**
Rev edits pages directly on github.com. Those edits never reach
`~/Desktop/True-Wellness-Site` on their own. Run `git pull` before you read a file,
and treat the file on GitHub as the truth when the two differ. Section 4.

**3. There are no per-class page files.**
All sixteen class pages are generated from one data file. If you go looking for
`src/app/classes/private-somatic-flow/page.tsx` you will not find it, and you must
not create it. Section 8.

---

## 1. What this is

A website for True Wellness Movement, a children's and family wellness practice in
Jamestown, Tuolumne County, California.

It replaced the previous site, `ndxtraders/TrueWellnessMovement`, on 2026-09-20.

**The old repo is reference only. Do not modify it.** Rev has said this twice. Its
content and its integration identifiers carried over. Its design, palette,
typography and page structure deliberately did not. This is a new site, not a port.

---

## 2. Where everything lives

| Path | What it is |
|---|---|
| `~/Desktop/True-Wellness-Site` | This project. The git repo. |
| `~/Desktop/True Wellness Movement` | Source material. Not in the repo. |
| `~/Desktop/True Wellness Movement/BOCLAIRE_TRUE_WELLNESS_AI_MASTER_CONTEXT.md` | The brand, voice and claims bible, 59 sections. The governing brief. Read it before writing copy. |
| `~/Desktop/True Wellness Movement/Class descriptions/` | Boclaire's own class flyers. The source for most class pages. Her wording wins over invented wording. |
| `~/Desktop/True Wellness Movement/Photos/` | Her supplied photos and the clean logo PNG. |
| `~/Desktop/True Wellness Movement/PRD-website-redesign.md` | The PRD, base document plus amendments 1 to 5. **Canonical copy.** |

**The source folder is outside the repo on purpose.** The master context holds
pricing history and private business notes. The repo is public. Keep them apart.

A duplicate PRD at the repo root is gitignored by the `PRD-*.md` rule. The copy in
the source folder is canonical.

### Sections of the master context that get cited most

- **6** do not rename a program that already has a name
- **12** voice
- **15 and 44** claim standards
- **29** fixed Korean names
- **34** do not make Boclaire sound perfect
- **40** the seven-question brand test
- **45** visual style, and the prohibition on drawing children as tiny adults

---

## 3. Stack

Next.js 16.3.4 (App Router, Turbopack), React 19.2.8, Tailwind v4.3, TypeScript 5.
Deploys to Vercel on push to `main`. Fully static, every route prerenders.

```bash
npm run dev        # localhost:3111
npm run build      # must stay clean, 33 routes
npm run typecheck
```

No CMS. Content is typed data in `src/content/`, shaped so a CMS (Keystatic was the
recommendation) can be layered on later without a rewrite.

---

## 4. The editing model, and how to backfill

Rev edits pages **directly on github.com**. That is deliberate and it is not going
to change. It means the local checkout goes stale silently.

### Before you read or change any file

```bash
cd ~/Desktop/True-Wellness-Site
git fetch origin
git status -sb            # is local behind origin/main?
git pull --ff-only origin main
```

If `--ff-only` refuses, the local checkout has commits GitHub does not. **Do not
force anything and do not rebase without asking Rev.** Show him
`git log --oneline origin/main..HEAD` and `git log --oneline HEAD..origin/main`
and let him decide which side is right.

### The specific risk

Copy edits and code edits collide in the same files. `src/content/classes.ts` holds
both the prose a human wants to edit and the typed structure the build depends on.
A hand edit that drops a comma or a closing brace breaks the build for the whole
site, not just one page.

So: **after any pull that brings in hand edits, run `npm run build` before doing
anything else.** A broken build on `main` means Vercel keeps serving the last good
deployment and the new copy silently does not appear. That failure looks like "my
edit did nothing" rather than like an error.

---

## 5. How it is deployed

Push to `main`, Vercel builds, the live domain updates. That is the whole pipeline.

### The domain

| | |
|---|---|
| Registrar and DNS | Namecheap, nameservers `dns1/dns2.registrar-servers.com` |
| Apex `A` | `216.150.1.1` |
| `www` CNAME | `272d44ff3619e02a.vercel-dns-016.com.` |
| Canonical host | `www`. The apex 308s to it. |
| Also on the domain | SPF for Namecheap email forwarding, two `google-site-verification` TXT records, five `eforward` MX records |

**Do not touch the MX or TXT records.** Email forwarding runs on this domain, and
the two Google records are what keep Search Console verified.

`site.url` in `src/lib/site.ts` is `https://www.truewellnessmovement.com`. It feeds
`metadataBase`, every canonical, every OG URL and every sitemap entry. It is `www`
and not the apex because the apex redirects, and a canonical pointing at a redirect
is a canonical pointing at the wrong place.

### The `isLive` flag

`export const isLive = true` in `src/lib/site.ts`. One boolean, three effects:

| What | File | `false` | `true` |
|---|---|---|---|
| `/robots.txt` | `src/app/robots.ts` | `Disallow: /` | `Allow: /` plus the `Sitemap:` line |
| `robots` meta tag | `src/app/layout.tsx` | `noindex, nofollow, nocache` | `index, follow` |
| GA4 `G-CBXJ1LM80R` | `src/app/layout.tsx` | not rendered at all | rendered |

It exists as one flag rather than three edits because the dangerous failure is
shipping with a stale `Disallow: /` in place, which makes a local business
invisible on Google indefinitely and raises no error anywhere.

**It is `true` now. Setting it to `false` takes the live site out of Google.** If
you need a quiet deployment, make a preview branch instead.

### Rollback

The old static site still runs in the same Pro team as project
`truewellnessmovement`, serving `truewellnessmovement-two.vercel.app`. Rolling back
is moving the domain between two projects inside one account. Instant, no DNS
change, no ownership re-verification.

(The `-two` suffix is there because a **free** Vercel account,
`dans-projects-b454f17d`, still holds the global hostname
`truewellnessmovement.vercel.app`. That account no longer serves the real domain.)

---

## 6. What is built

33 routes, all static.

```
/                            home
/about                       Boclaire, credentials, screening. Uses the painting.
/approach                    pillar hub, plus how we talk about wellness claims
/approach/[slug]             3 pillar pages
/classes                     hub, 16 classes grouped by audience
/classes/[slug]              16 class detail pages
/childrens-center            the outdoor wellness space and herb garden, donate
/childrens-center/sponsor    4 sponsorship tiers, DonorBox wired
/contact
/policies                    scope of practice, privacy, analytics, donations
/robots.txt                  generated by src/app/robots.ts
/sitemap.xml                 generated by src/app/sitemap.ts, 27 URLs
/icon.png  /apple-icon.png   generated
/_not-found
```

Header navigation: Classes, Our Approach, Children's Center, an About menu holding
About Boclaire and Contact, plus a DonorBox donate button. Footer adds Policies and
the Linktree link.

### Known gaps in the routing

The homepage audience cards link to anchors on the classes hub
(`/classes#group-children` and so on). That works, but those group headings carry
no `scroll-mt`, so the 72px sticky header covers the heading a visitor just jumped
to. Only `#special-programs` has the offset. Real audience pages
(`/programs/children`, `/teens`, and so on) still do not exist.

`families-parents` is defined as an audience and has a "For families" group on the
hub, but no class uses it, so the group is filtered out and never renders.

---

## 7. File map

```
src/
  app/
    layout.tsx              fonts, metadata, robots meta, GA4 gate, ArtDefs
    globals.css             ALL design tokens. Read the comment block at the top.
    robots.ts               generates /robots.txt from `isLive`
    sitemap.ts              generates /sitemap.xml from classes.ts and pillars.ts
    page.tsx                home
    about/ approach/ classes/ childrens-center/ contact/ policies/
  components/
    site-header.tsx  site-footer.tsx  logo.tsx
    contact-form.tsx        Web3Forms POST, honeypot, in-place thank-you
    waitlist-button.tsx     placeholder, opens a mailto, collects no email
    art/
      illustrations.tsx     13 hand-authored SVG components. The house style.
      defs.tsx              3 shared SVG filters, rendered once in the layout
      for-class.tsx         maps a class's `art` key to a component
      for-pillar.tsx        same, for pillars
  content/
    classes.ts              16 classes. THE file people actually edit.
    classes-archive.ts      pulled classes, kept for reference, not rendered
    pillars.ts              3 pillars
    pillars-archive.ts      2 retired pillars
    sponsorship.ts          4 sponsorship tiers
    types.ts                shared key types and `statusLabels`. See the warning in section 8.
  lib/
    site.ts                 isLive, site constants, contact, integrations, disclosures
public/
  brand/                    logo masks, see section 9
  images/                   see section 12
```

---

## 8. How to edit content

### A class

**There is one file: `src/content/classes.ts`.** Each class is an object in the
`classes` array. `src/app/classes/[slug]/page.tsx` is the single template that
renders all sixteen, and `src/app/classes/page.tsx` renders the hub.

On GitHub:
`https://github.com/ndxtraders/True-Wellness/blob/main/src/content/classes.ts`

Fields, from `ClassOffering`:

| Field | Notes |
|---|---|
| `slug` | The URL. `/classes/<slug>`. Changing it breaks links; add a redirect in `next.config.ts` when you do. |
| `name` | Never rename a program without Boclaire's say-so. Master context 6. |
| `nameKo` | Korean name where one is fixed. `두뇌 건강 지원 세션` is exact, never substitute `어르신 두뇌 운동`. |
| `audience` | Drives which group the card lands in on the hub. |
| `audienceLabel` | The line above the h1 on the detail page. |
| `tagline` | Her flyer subtitle. Shown under the title, and as the card line. |
| `summary` | One sentence. The card line when there is no tagline, and the meta description. |
| `body` | Array of paragraphs at the top of the detail page. |
| `sections` | One or two labelled lists, each `{ heading, intro?, bullets }`. Headings use her own labels. |
| `closing` | Her closing or goal line, set large. |
| `callToAction` | `{ heading, text, label, href }`, where a flyer has one. |
| `honestNote` | A limit specific to this class, rendered under "Worth being clear about". |
| `honestNoteHeading` | Overrides that heading. Used by Private Somatic Flow and Brain Wellness Support for Elders. |
| `details` | Short facts for the details card. The first also shows on the hub card. |
| `price`, `priceUnit`, `priceFrom`, `priceTiers`, `priceConfirmed` | **No class currently sets any of these.** The rendering works; the data is empty pending Boclaire. |
| `faithBased` | Prints a "Faith-based" marker. |
| `primaryAction` | `waitlist` (default) or `contact`. |
| `status` | `enrolling`, `waitlist`, `by-request`, `in-development`. Renders as a visible chip. Defaults to `waitlist` via `statusOf()`. |
| `art` | Which illustration. See `ArtKey`. Defaults to `seated`. |
| `source`, `verifyNote` | Internal only, never rendered. Where the copy came from and what still needs confirming. |

The sixteen slugs today:

```
nature-based-sensory-experience   meditative-walk           mindful-movement-workout
body-prayer-session               kids-birthday-hike-party  adult-birthday-hike-party
rv-wellness-retreat               childrens-bible-study     teen-girls-bible-circle
brain-wellness-for-elders         mindful-teen-circle       private-somatic-flow
one-to-one-mindfulness-enrichment wellness-walk             guided-mindful-walk
zenflow
```

Two notes on those. `childrens-bible-study` is the slug, but the class is named
**Kid's Bible Stories**; the slug was left alone so existing links resolve. Its
first body paragraph still opens "Children's Bible Study focuses on...", which is
an open item in the punch list.

**Faith-based classes sit under `audience: 'spiritual'`.** This keeps their
Christian framing clear. Keep the public label simple and factual. Do not add
commentary about the visitor's beliefs or choices. `body-prayer-session` is flagged
`faithBased` but still sits under `adults`; whether it moves is undecided.

### A pillar

`src/content/pillars.ts`. Three: Whole-Person Approach, Somatic Movement, Mindful
Living. Two more, Returning to Balance and Healthy Meals, are retired to
`pillars-archive.ts`, though `PillarKey` in `types.ts` still carries their keys.

"Whole-Person Approach" carries `definitionConfirmed: false`. It appears nowhere in
the master context. It was inferred from Boclaire's philosophy and it is faithful
to it, but it is an inference and she has not signed off.

### A sponsorship tier

`src/content/sponsorship.ts`. Four tiers named for Sierra foothills plants:
California Poppy $167, Yerba Santa $500, Elderberry $1,000, Oak $2,000.

The naming is Boclaire's and it is some of the better brand work on the old site.
It is preserved exactly.

The arithmetic is coherent and worth knowing: every tier is **$10.42 per
child-hour**, based on 16 hours per child. $167 is one child's share of the $2,000
monthly program. It is a **sponsorship rate, not a class price.** Conflating them
means charging a parent what it costs a donor to fund a child.

### Honesty is structural. Except where it is not, yet.

`status` is real and it works. A concept may appear on the site as long as it is
labeled one, and the chip renders from the data.

**`verified` does not exist any more, and `types.ts` lies about it.** That file
still defines an `Offering` interface with a `verified` field, plus
`publicOfferings()`, `pendingVerification()`, `offeringsByAudience()` and
`offeringsByPillar()`. **None of them are imported anywhere.** `ClassOffering` has
no `verified` field at all. Only `statusLabels` and the key types are used.

Earlier versions of this document described that filter as a control that stops an
unconfirmed claim from shipping. It is not one. Do not rely on it. Either wire it
up or delete the dead exports; it is in the punch list.

---

## 9. Design decisions, do not silently reverse

### Light only. There is no dark theme.

Rev, twice: *"why are you using a dark theme for a wellness site? It doesn't fit
the mood"* and *"the site needs to be bright and light, not dark. This isn't a tech
site."*

The dark theme is fully removed and `html { color-scheme: light }` is set, which
also keeps form controls, scrollbars and autofill light for a visitor whose OS is
dark. Do not add `prefers-color-scheme` back. Supporting an inverted theme doubled
the QA surface and introduced real bugs.

### Palette: "Oak & Iris". Purple is the ink, not an accent.

Every value was sampled or contrast-tested, not chosen by eye. Full reasoning is in
the comment block at the top of `src/app/globals.css`.

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#faf6f0` | warm paper |
| `--color-surface` | `#f1eae0` | raised sections |
| `--color-ink` | `#2b2130` | 14.31:1. Never `#000`. |
| `--color-ink-muted` | `#5b4e60` | 7.21:1 |
| `--color-line` | `#dfd4c6` | hairline, decorative only |
| `--color-line-strong` | `#8e8073` | inputs and controls, 3.56:1 |
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

**The old site's `#83B14E` green is retired in the roles that broke it.** It failed
WCAG AA as text (2.33:1) and as a button ground (2.51:1). It survives only as
`--color-sage`, knocked back to 65% over the paper, where it is a ground and
nothing sits on it except ink at 8.42:1 and plum at 5.53:1.

Four structural rules:

1. Sage, lilac, sun and forest are **grounds, never figures.** They never carry text, an icon, a meaningful border, or a button label.
2. On a sage field: ink for body copy, plum for large display headings. **White on sage is forbidden**, 2.51:1.
3. Purple is never figure-and-ground against an earth accent. They sit at near-identical luminance and mud together. Separate them with `bg`, `surface`, or art.
4. One saturated field per viewport.

### Typography: Fraunces plus Hanken Grotesk

Replaces Playfair Display plus Lato. Playfair's hairlines fail below 28px, which
forces the huge-headline-over-tiny-grey-body template silhouette, and Playfair plus
Lato is the Squarespace and Wix wellness template stack.

Fraunces carries the `SOFT` and `WONK` axes and they are dialed up at display
sizes. That irregularity is the one detail that could only belong to this brand.
The axes are set per element in `globals.css`, and declaring `axes` in `next/font`
means `weight` must be left off entirely.

### The illustration system

`src/components/art/illustrations.tsx`, thirteen hand-authored SVG components.

This is the answer to the photography problem, and Rev chose the reference himself:
*Breathe* magazine, and to a lesser extent *Mantra*. Faceless figures are
explicitly approved. It solves three things at once. There is no photograph of
Boclaire's face in any asset. Photographing children requires a signed release from
every parent. And master context 45 forbids drawing children as tiny adults.

Components: `HillsSun` (takes `compact` and `withFigures`), `ArcBand`,
`FigureSeated`, `FigurePair`, `FigureWalking`, `FigureTree`, `FigureElder`,
`FigureHands`, `FigureGathering`, `FigureTrail`, `Sprig`, `BeeBloom`, `SeedHead`.

`ArtKey` in `classes.ts` maps nine of them for class art: `seated`, `pair`,
`walking`, `tree`, `trail`, `elder`, `bee`, `sprig`, `hands`. `ClassArt` falls back
to `seated` rather than rendering an empty slot.

**The `/art-gallery` review page is gone**, deleted before launch. To look at all of
them at once, read the file or rebuild the page locally without committing it.

### The logo is an alpha mask

`public/brand/*-mask.png` are white-on-transparent masks driven by CSS `mask-image`
with `background-color: currentColor`, so one asset recolors correctly anywhere.
Built from `True Wellness Movement 2 Logo.png`, the clean one. Ring centre
(440, 484), radius about 378 in mask space.

- `wordmark-mask.png` full mark, header
- `roundel-mask.png` circle and figure only, for 64px and below where the arc text is illegible

**There is still no vector.** A real SVG would be better. Ask Boclaire's designer,
Canva, her print vendor, or her signage supplier before anyone hand-traces it.

---

## 10. Traps that have already cost a debug cycle

**Tailwind v4 dropped v3's bare custom property syntax.** `p-[--x]` is no longer
valid. It must be `p-(--x)`. This is the worst bug in the project's history because
it **fails silently**: the class name looks right, the build passes, typecheck is
clean, and every affected rule emits invalid CSS that the browser discards. 52
utilities were affected. Every section rendered with 0px padding and every card
with 0px radius, which is exactly what Rev was complaining about when he said the
content blocks looked crowded. If spacing looks wrong, grep for `-[--` before
assuming anything else.

**Deleting a route leaves a stale type validator behind.** After removing
`src/app/art-gallery/page.tsx`, the next build failed with
`TS2307: Cannot find module '../../../src/app/art-gallery/page.js'` from
`.next/dev/types/validator.ts`. The source was already gone. Fix: `rm -rf .next`
and rebuild. Do that after deleting any route.

**SVG filters default to `filterUnits="objectBoundingBox"`.** A stroke-only path
has a near-zero-width bounding box, so the filter region clips the stroke to a
hairline. This is why 31 stroke-only elements have no filter applied. Documented in
`src/components/art/defs.tsx`.

**Keep element defaults inside `@layer base` in `globals.css`.** Unlayered rules
beat Tailwind's layered utilities, so an unlayered `h3` selector defeats a
`text-caption` utility on the same element. This already caused one visible bug.

**A text token used as a large field inverts badly.** `--color-forest` exists
separately from `--color-moss` for this reason, even though they share a value
today. Moss is a text color and may be tuned for legibility. Forest is a ground and
may be tuned for depth. Collapse them and one of the two jobs eventually loses.

**This machine has no ImageMagick, no potrace, no PIL.** Image work was done with
small Swift and CoreGraphics programs. Reuse that approach rather than installing
globals without asking. Gotcha: `NSBitmapImageRep` can report `bitsPerPixel: 32`
with `samplesPerPixel: 3`, a padding byte. Stride by `bitsPerPixel / 8`, never by
`samplesPerPixel`, or you read across channel boundaries.

**Check `df -h` when a native module fails to load.** Rev's disk hit 145 MB free on
a 228 GB drive and it silently truncated Next's SWC binary mid-install. The symptom
is `segment '__TEXT' load command content extends beyond end of file`.

**Do not infer a Vercel deployment's existence from guessed hostnames.** The
project is `true-wellness-site`, named after the local folder, not after the repo.
Three guessed hostnames returning 404 led to a wrong conclusion that no deployment
existed. Ask, or check the dashboard.

**A `dig` against your default resolver can be stale.** During the domain cutover,
the `www` CNAME still showed the old value on a cached lookup while the
authoritative answer was already correct. Query the nameserver directly
(`dig @dns1.registrar-servers.com ...`) before concluding a record did not save.

**American spellings.** This is a California business. A previous copy pass
introduced "programme", "behaviour", "practised" and "journalling". They have been
normalized. Do not reintroduce them.

**No em dashes anywhere.** Rev's standing rule across all his projects.

---

## 11. Integrations, carried over verbatim, do not regenerate

All in `src/lib/site.ts`. These are live and attached to real accounts. Changing a
value silently breaks a revenue or measurement path.

| Service | Identifier |
|---|---|
| GA4 | `G-CBXJ1LM80R`, carries all measurement history. Live since 2026-09-20. |
| MailerLite | account `53138`, form `4tjIUv`. Not wired into any page yet. |
| Web3Forms | `44e85080-7afb-4ca2-8c9f-4c7485323760`, delivers the contact form |
| DonorBox | campaign slug `true-wellness`, the only wired payment path |
| Linktree | `linktr.ee/truewellnessmovement` |
| Spotify | episode `1gTuKRVYZlKgkISZ52EeEW`. Not embedded on any page yet. |

### DonorBox does more than the old site used it for

Monthly recurring **already works**. The old site never used it: all four
sponsorship tiers pointed at an on-page email form, and the three donate buttons
used the bare campaign URL with no parameters. Four priced tiers were described in
detail and none of them could be paid for.

Both deep-link parameters are verified working on the public campaign URL, not just
the embed: `default_interval=m` preselects Monthly, `amount=<n>` prefills the custom
amount. `donorboxUrl({ amount, monthly })` in `src/lib/site.ts` builds them.

An embed path exists too if the form should ever be on-page rather than linked:
`https://donorbox.org/embed/true-wellness` plus the widget script at
`https://donorbox.org/widgets.js`.

### The waitlist is a placeholder

`src/components/waitlist-button.tsx`. There is no signup endpoint yet; Boclaire is
still building the MailerLite forms.

It deliberately **does not collect an email address.** Capturing addresses with
nowhere to put them loses them and promises a list membership that does not exist.
It opens a pre-addressed `mailto:` instead, which actually reaches her.

To wire it up: swap the `href` for the MailerLite form URL. Nothing else changes.

### Redirects

In `next.config.ts`, all `permanent: true`, which Next serves as 308.

| From | To | Why |
|---|---|---|
| `/sponsors.html` | `/childrens-center/sponsor` | indexed on the old site and its primary conversion path. Do not break it. |
| `/index.html` | `/` | old site's home |
| `/classes/meditative-wellness-walk` | `/classes/meditative-walk` | renamed 2026-09-19 |

Any future slug change needs a line here in the same commit.

---

## 12. Images

`public/images/`.

| File | Verdict |
|---|---|
| `boclaire-painting.jpg` | **In use** on `/about` only. Rev approved it explicitly. It is a photo of a painting, not a portrait. He tried it in the homepage hero and rejected it: a realistic oil portrait clashes with the flat vector illustration system. |
| `heavenly-herb-garden.jpg` | **In use** on the Children's Center only, per Rev, who plans to edit it. It is 9.1 MB, it has the **Google Gemini watermark baked into the pixels**, and it is a PNG wearing a `.jpg` extension. It fails Core Web Vitals on its own, and it is now doing that on a live site. |
| `True Wellness Movement Logo - Transparent.png` | **In use** on the homepage. |
| `hero.jpg` | **Not used.** AI generated, and 1290px caps at about 645 CSS px on a 2x display, so it is already blurry in a full-bleed slot. Safe to delete. |
| `mountain-bottom.jpg` | **Do not ship.** It is a screenshot of a rendered web footer, with a white curved edge and a scroll-to-top button baked in. It cannot survive a different background. Use an SVG mask or `clip-path`. Safe to delete. |

### Two things still needing action before any of Boclaire's photos ship

1. **GPS EXIF.** Four of her source photos carry coordinates from shots at or near her property. Strip EXIF before publishing any of them.
2. **Orientation flags.** Four carry non-identity EXIF orientation, three at `6` and one at `3`. Most compression presets strip EXIF. Strip without baking the rotation into pixels first and three landscapes render sideways and one upside down, in production, silently.

`Love my skin.jpg` in the source folder is **excluded**: different woman, and it
carries burned-in **TSkin USA** branding, another company.

---

## 13. Blocked on Boclaire, ranked

These block real work. Nothing downstream is honest without them.

1. **Which classes can someone actually book this month, and at what price?** The single biggest blocker, and it is now a live-site problem rather than a pre-launch one. No class on the site carries a price. Every price field is empty pending her.
2. **A cancellation policy.** `/policies` deliberately has no section on it. Writing one without her would be a claim about how the practice operates. Her answer becomes a section on that page.
3. **Credential verification.** Is it "Certified Acupressure **Teacher**" (master context) or "certified in Acupressure **Therapy**" (her own flyers)? Therapist is the stronger claim, so the conservative wording stands until she says. Still unconfirmed and held back: the April 2026 Sonora Living feature.
4. **Exact 501(c)(3) status.** Filed, pending, or fiscally sponsored? Is there an EIN? It drives donation copy, schema types, and the honest answer donors ask. The site currently says "currently pursuing" and "not tax-deductible at this time."
5. **Does an original vector logo file exist?** Designer, Canva, print vendor, signage supplier, Instagram profile upload.
6. **Is a half-day photo shoot in budget?** There is no photograph of Boclaire's face in any asset. A shoot also covers a children's class in session, a mommy-and-me pair, a somatic single, the studio interior, and a detail set. Signed releases are on file.
7. **Does the Whole-Person Approach definition get approved?** Flagged in code as `definitionConfirmed: false`.
8. **Is she Live Scan cleared, insured, and mandated-reporter trained today?** `/about` states the Live Scan screening and the DOJ mandated reporter training. These are the highest-converting sentences on the site for parents and schools, and only if true.

### On claims

Rev has confirmed the Tuolumne County statistics come from separate research he
holds sources for. **Use them as written. Do not re-litigate them and do not redo
that research.** He also asked for no further web research on this project, though
he has since supplied specific URLs case by case.

---

## 14. Next up, in order

The full list with detail is in `LAUNCH-PUNCHLIST.md`. In short:

1. Real prices and availability, then set `price`, `priceConfirmed` and real statuses.
2. A cancellation section on `/policies`, once Boclaire decides.
3. Resolve the dead `verified` gate in `types.ts`: wire it up or delete it.
4. `scroll-mt` on the classes hub group headings, so the homepage anchors do not land under the sticky header.
5. Wire MailerLite into `WaitlistButton`.
6. Fix the Kid's Bible Stories body paragraph, which still opens with the old name.
7. Compress or replace `heavenly-herb-garden.jpg`. 9.1 MB on a live page.
8. Delete `hero.jpg` and `mountain-bottom.jpg`.
9. Audience pages, so the homepage cards stop pointing at anchors.
10. schema.org markup and OG images.
11. Photo shoot. It replaces the painting and fills every empty slot.
12. Korean surface at `/ko/` for the elder work. `두뇌 건강 지원 세션` is fixed and must be preserved exactly.

---

## 15. Working with Rev

From his global CLAUDE.md and confirmed repeatedly in session.

- **Terse.** Under 100 words in chat. No recaps, no summary tables, no trailing suggestions, no "next steps" unless he asks. Deliverables keep full register.
- **He leads, you decide.** He asks for decisions, not menus. Make the call, state the assumption, move.
- **If you find something in scope, fix it.** Do not report it back as an open item.
- **When he gives replacement copy, change only that line.** Do not rewrite or improve around it. If his text has a typo, apply it verbatim and flag it; do not silently correct it.
- **Never push to `main` without explicit permission.** Never force-push. No `reset --hard` or `clean -fd` without confirmation.
- **Never delete his files** without explicit confirmation. Back up before modifying anything he did not just create.
- **Do not modify `.env` files or credentials** without asking.
- **Verify before declaring done.** Run the build. Check the live URL. He has caught inaccurate claims more than once, and each time the cause was inference presented as fact rather than a check that was actually run.
- **Be economical.** The account has been in extra usage. Do not spawn agent fleets for work you can do directly.
