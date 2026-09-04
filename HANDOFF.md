# True Wellness Movement — Handoff

**Last updated:** 2026-09-04
**Repo:** https://github.com/ndxtraders/True-Wellness
**Local:** `~/Desktop/True-Wellness-Site` · `npm run dev` → http://localhost:3111
**Owner:** Rev Vaughn. **Client:** Boclaire, his wife.

> Read this before touching anything. Several decisions here were made
> deliberately and reversing them by accident would cost real work.

---

## 1. What this is

A brand-new website for True Wellness Movement — a children's and family
wellness practice in Jamestown, Tuolumne County, California.

It **replaces** the existing site at
https://github.com/ndxtraders/TrueWellnessMovement (live at
`truewellnessmovement.vercel.app`).

**The old site is reference only. Do not modify it.** Rev was explicit about
this twice. Its *content* and its *integration identifiers* carry over. Its
design, palette, typography, and page structure deliberately do not — this is
not a port, it is a new site.

---

## 2. Where things live

| Path | What |
|---|---|
| `~/Desktop/True-Wellness-Site` | This project (the git repo) |
| `~/Desktop/True Wellness Movement` | Source material — **not** in the repo |
| `~/Desktop/True Wellness Movement/BOCLAIRE_TRUE_WELLNESS_AI_MASTER_CONTEXT.md` | The 44-section brand/voice/claims bible. Read it. |
| `~/Desktop/True Wellness Movement/Photos` | Boclaire's supplied photos + the good logo PNG |

**The source folder is intentionally outside the repo.** The repo is **public**
and the master context contains pricing history and private business notes.
Keep it out.

### Research produced during the first session

Six audits live in the session scratchpad. They are thorough and worth reading
before redoing any of that thinking:

```
/private/tmp/claude-501/-Users-raulvaughn-Desktop/b9538fe8-.../scratchpad/research/
  00-FOUNDATION-BRIEF.md    synthesis + decisions
  01-existing-site-audit.md every integration id, all content, all defects
  02-content-model.md       36 offerings inventoried, site map, pillar definitions
  03-voice-and-claims.md    voice spec, banned constructions, claim tiers
  04-asset-audit.md         every image measured and judged
  05-design-references.md   typography + palette with contrast math
  06-market-and-tech.md     local market + stack
```

⚠️ **Scratchpad paths are session-scoped and will eventually be cleaned up.**
If these still exist, copy them into `~/Desktop/True Wellness Movement/research/`
before doing anything else.

---

## 3. Stack

Next.js 16.3.4 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript.
Deploys to Vercel. Fully static — every route prerenders.

```bash
npm run dev        # localhost:3111
npm run build      # must stay clean
npm run typecheck
```

No CMS yet. Content is typed data in `src/content/`, structured so a CMS
(Keystatic was the recommendation) can be layered on later without a rewrite.

---

## 4. Decisions already made — do not silently reverse

### Palette: purple is the ink, not an accent

`#5C2E6F` is sampled from the actual logo mark. It hits **9.40:1** on the warm
paper ground — better than any earth tone available. So it carries headings,
links, buttons, and chrome.

**The old site's green `#83B14E` is retired permanently.** It failed WCAG AA as
text (2.45:1) and as a button ground (2.51:1), and its only visual source was an
AI-generated image being dropped.

Terracotta moved `#8C4339` → `#9C4A2C` because the original mudded against the
purple at 1.43:1.

**Structural rule:** never place purple directly against an earth accent as
figure-and-ground. They sit at near-identical luminance. Always separate them
with `bg` or `surface`.

### Typography: Fraunces + Hanken Grotesk

Replaces Playfair Display + Lato. Playfair's hairlines fail below 28px, forcing
the huge-headline-over-tiny-grey-body template silhouette, and Playfair+Lato is
the Squarespace/Wix wellness template stack.

Fraunces' `SOFT` and `WONK` axes are dialed up on display sizes — that
irregularity is the one detail that could only belong to this brand.

### CSS layering — important

Element defaults in `globals.css` are wrapped in `@layer base`. **Keep them
there.** Unlayered rules beat Tailwind's layered utilities, so without it an
`h3` element selector defeats a `text-caption` utility on the same element.
This already caused one visible bug.

### The logo is an alpha mask

`public/brand/*-mask.png` are white-on-transparent masks driven by CSS
`mask-image` with `background-color: currentColor`. One asset recolors correctly
in light and dark — no second file, no hardcoded color.

Built from `True Wellness Movement 2 Logo.png` (the clean one). Measured: ring
centre (440, 484), radius ≈ 378 in mask space.

- `wordmark-mask.png` — full mark, header use
- `roundel-mask.png` — circle + figure only, for ≤64px where the arc text is illegible

**There is still no vector.** A real SVG would be better. Ask Boclaire's
designer / Canva / her print vendor before anyone hand-traces it.

### Honesty is structural, not editorial

`src/content/types.ts` defines two gates:

- `status` — `enrolling` / `waitlist` / `by-request` / `in-development`. A
  concept may appear on the site **as long as it is labeled one.**
- `verified` — anything `false` is filtered out of the public build by
  `publicOfferings()`. Unconfirmed facts cannot ship by accident.

Do not route around these. They exist because Boclaire's own standards forbid
presenting a concept as a running class, and memory is not a control.

---

## 5. What is built

```
/                        home — hero, audience routing, pillars, centre, contact
/classes                 catalogue, 10 classes
/classes/[slug]          10 detail pages
/approach                pillar hub + "how we talk about wellness claims"
/approach/[slug]         5 pillar pages
/about                   Boclaire, credentials, screening — uses the painting
/contact
/childrens-center        donate + sponsor, DonorBox wired
```

All 25 internal links resolve. Light and dark both verified.

### Pricing — placeholder

**Every class is $167 as a placeholder**, per Rev, except **Acupressure Therapy
at $135, which is confirmed.** Placeholder prices render with a visible
"placeholder" note and a line saying the real number will be confirmed before
anyone is asked to pay. `priceConfirmed: false` drives that. Remove the flag
when real numbers land.

### Waitlist buttons — placeholder

`src/components/waitlist-button.tsx`. There is **no signup endpoint yet** —
Boclaire is building the MailerLite forms.

It deliberately does **not** collect an email address. Capturing addresses with
nowhere to put them loses them and promises a list membership that does not
exist. It opens a pre-addressed `mailto:` instead, which actually reaches her.

**To wire it up:** swap the `href` for the MailerLite form URL. Nothing else
changes.

---

## 6. Integrations — carried over verbatim, do not regenerate

All in `src/lib/site.ts`. These are live and attached to real accounts.

| Service | Identifier |
|---|---|
| GA4 | `G-CBXJ1LM80R` — carries all measurement history |
| MailerLite | account `53138`, form `4tjIUv` |
| Web3Forms | `44e85080-7afb-4ca2-8c9f-4c7485323760` |
| DonorBox | `donorbox.org/true-wellness` — the only wired payment path |
| Linktree | `linktr.ee/truewellnessmovement` |
| Spotify | episode `1gTuKRVYZlKgkISZ52EeEW` |

Legacy URLs 301 in `next.config.ts`: `/sponsors.html` → `/childrens-center/sponsor`,
`/index.html` → `/`.

⚠️ **`/childrens-center/sponsor` does not exist yet** — that redirect currently
lands on a 404. Either build the sponsor page or repoint the redirect to
`/childrens-center`. **Do this before launch**; `sponsors.html` is indexed and is
the primary conversion path on the current site.

---

## 7. Images

`public/images/` — Rev copied these from the old repo.

| File | Verdict |
|---|---|
| `boclaire-painting.jpg` | **In use** on `/about`. Rev approved it explicitly. It is a photo of a painting, not a portrait. |
| `hero.jpg` | **Not used.** AI-generated, and 1290px caps at ~645 CSS px on a 2× display — already blurry in a full-bleed slot. |
| `heavenly-herb-garden.jpg` | **Do not ship.** 9.1 MB, and it has the **Google Gemini AI watermark baked into the pixels**. Also a PNG wearing a `.jpg` extension. Fails Core Web Vitals on its own. |
| `mountain-bottom.jpg` | **Do not ship.** A screenshot of a rendered web footer, with a white curved edge and a scroll-to-top button baked into the image. Cannot survive a dark section or a different background. Use an SVG mask / `clip-path` instead. |

### Two things Rev has been told, that still need action

1. **GPS EXIF.** Four of Boclaire's source photos carry GPS coordinates from
   shots at or near her property. **Strip EXIF before publishing any of them.**
2. **Orientation flags.** Four source photos carry non-identity EXIF orientation
   (three at `6`, one at `3`). Most compression presets strip EXIF — strip
   without baking the rotation into pixels first and three landscapes render
   sideways and one upside down, in production, silently.

`Love my skin.jpg` in the source folder is **excluded**: different woman, and it
carries burned-in **TSkin USA** branding — another company.

### Tooling note

This machine has **no ImageMagick, potrace, or PIL**. Image work in session one
was done with small Swift/CoreGraphics programs (in the scratchpad:
`logomask.swift`, `roundel.swift`, `render.swift`, `crop.swift`). They work well —
reuse them rather than installing globals without asking. **Gotcha:**
`NSBitmapImageRep` can report `bitsPerPixel: 32` with `samplesPerPixel: 3` (a
padding byte). Stride by `bitsPerPixel / 8`, never by `samplesPerPixel`, or you
read across channel boundaries. This cost a debug cycle.

---

## 8. Blocked on Boclaire — ranked

**These block real work. Nothing downstream is honest without them.**

1. **Which classes can someone actually book this month, and at what price?**
   The single biggest blocker. Drives every status chip and all pricing. The
   live site still says "Classes Begin Fall 2026" and it is now September 2026.
2. **Does an original vector logo file exist?** Check the designer, Canva, her
   print vendor, her signage supplier, her Instagram profile upload.
3. **Is a half-day photo shoot in budget?** There is **no photograph of
   Boclaire's face** in any asset. The painting is a stopgap Rev approved, not a
   solution. A shoot also covers: a children's class in session (with signed
   releases for every minor), a mommy-and-me pair, a somatic single, the studio
   interior, and a detail set.
4. **Credential verification — five items,** none of which appear in the master
   context and all of which were on the old site: *Children's Meditation
   Stories* (the book), Sierra Yoga Center, Mindful Mom (org vs. the book
   *Mindful Mom, Mindful Child*), the Tuolumne County Recreation Department
   role, and the April 2026 Sonora Living feature. Also: is it "Certified
   Acupressure **Teacher**" (master context) or "certified in Acupressure
   **Therapy**" (old site)? The current `/about` page uses only the master
   context list — **do not add the others back until confirmed.**
5. **Exact 501(c)(3) status.** Filed, pending, or fiscally sponsored? Is there an
   EIN? Drives donation copy, schema types, and the honest answer donors ask.
6. **How does a sponsor actually get charged today?** On the old site every
   sponsorship tier CTA opens an email form, not a payment. Do recurring
   DonorBox plans exist for $167 / $500 / $1,000 / $2,000?
7. **Do the two proposed pillar definitions get approved?** "Returning to
   Balance" and "Whole-Person Thinking" appear **nowhere** in the master
   context — they were inferred from her philosophy and are faithful to it, but
   they are inferences. Flagged in code as `definitionConfirmed: false`.
8. **Is she Live Scan cleared, insured, and mandated-reporter trained *today*?**
   `/about` currently states the first and third. Highest-converting sentences
   on the site for parents and schools — and only if true.

### Note on claims

Rev has confirmed the Tuolumne County statistics come from separate research he
holds sources for. **Use them as written; do not re-litigate them and do not
redo that research.** He also said: no further web research on this project.

---

## 9. Next up, in order

1. Build `/childrens-center/sponsor` (or fix the redirect) — indexed URL,
   primary conversion path.
2. Get real prices and availability → flip `priceConfirmed`, set real statuses.
3. Wire the MailerLite waitlist into `WaitlistButton`.
4. Photo shoot → replaces the painting, kills the AI hero, fills every empty slot.
5. Audience pages (`/programs/children`, `/teens`, `/adults`,
   `/caregivers-elders`, `/schools`). The homepage audience cards currently all
   route to `/classes` as a stopgap — that is the compromise to revisit first.
6. `/policies` — scope of practice, privacy (both forms collect PII and GA4 is
   running), cancellation, photo release for minors. **None of this exists.**
7. Korean surface (`/ko/`) for the elder work. The program name
   **두뇌 건강 지원 세션** is fixed and must be preserved exactly — never
   substitute 어르신 두뇌 운동, which is a descriptive subhead at most.
8. Schema.org, sitemap, OG images.

---

## 10. Working with Rev

From his global CLAUDE.md, and confirmed in session:

- **Terse.** Under 100 words in chat. No recaps, no summary tables, no trailing
  suggestions. Deliverables keep full register.
- **He leads, you decide.** He asked for decisions, not menus. Make the call,
  state the assumption, move.
- **Never delete his files** without explicit confirmation. Back up before
  modifying anything he did not just create.
- **Be economical.** The account has been in extra usage. Don't spawn agent
  fleets for work you can do directly.
- His disk was at **145 MB free** on a 228 GB drive. That silently truncated
  Next's SWC binary mid-install and cost a debug cycle. If a native module fails
  to load with `segment '__TEXT' load command content extends beyond end of
  file`, check `df -h` first.
