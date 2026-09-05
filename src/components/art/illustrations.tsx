/**
 * True Wellness Movement illustration system.
 *
 * WHY ILLUSTRATION AND NOT PHOTOGRAPHY
 *
 * This is not a workaround for a thin photo library. For this specific brand it
 * is the better answer, for five reasons that all trace to the master context:
 *
 *   1. Section 45 rules out both conventional routes to a beautiful wellness
 *      site: "not overly spa-like" closes luxury minimalism, "not flashy"
 *      closes bright high-production kids' branding. Illustration threads
 *      between them in a way stock photography cannot.
 *   2. Photographing minors requires a signed release from every parent, every
 *      session, forever. Illustration removes an entire legal and logistical
 *      burden from a children's business.
 *   3. Section 45 also says: no children who look like tiny adults in a
 *      corporate wellness retreat. Faceless figures cannot fall into that
 *      trap. Nobody is performing wellness at a camera.
 *   4. It scales. A half-day shoot yields perhaps twenty usable frames. Every
 *      class, pillar and page needs art, forever.
 *   5. It is ownable. Every competitor within two hundred miles is using the
 *      same stock yoga photograph.
 *
 * Photography still does the work it is genuinely best at: real Sierra
 * landscape. Illustration carries people and ideas, photography carries place.
 * That division is exactly the one Breathe magazine uses.
 *
 * HOUSE STYLE
 *
 *   - Flat shapes. No gradients. Color varies by overlap and texture, never by
 *     a linear-gradient, which is the single fastest way to look like a 2015
 *     SaaS landing page.
 *   - Faces are left blank. Deliberate, and approved. It keeps the figures
 *     universal, sidesteps the release problem, and is the established idiom
 *     of the reference.
 *   - Three or four colors per piece. More reads as decoration.
 *   - Every shape carries grain or displacement. See defs.tsx.
 *   - Colors come from Tailwind utilities bound to the theme tokens, so the
 *     whole set restyles from one source of truth if the palette moves. The
 *     site is light-only by decision (see globals.css), so these are tuned for
 *     the warm paper ground and nothing else.
 *   - Sage and lilac appear here as large fields, which is the one role the
 *     palette rules permit them.
 *
 * All components accept className for sizing and are aria-hidden by default;
 * pass a `title` when a piece carries meaning a screen reader needs.
 */

interface ArtProps {
  className?: string
  /** Supply only when the illustration carries information not in the copy. */
  title?: string
}

function svgProps(title?: string) {
  return title
    ? { role: 'img' as const, 'aria-label': title }
    : { 'aria-hidden': true as const, focusable: 'false' as const }
}

/* ------------------------------------------------------------------ */
/* Landscape                                                           */
/* ------------------------------------------------------------------ */

/**
 * Layered foothills with a low sun. The site's establishing shot.
 *
 * Deliberately echoes the actual terrain in Boclaire's own photographs:
 * oak-studded rolling hills, water at the base, a big sky. Wide aspect so it
 * can run full-bleed as a band.
 */
export function HillsSun({
  className,
  title,
  compact = false,
  withFigures = false,
}: ArtProps & {
  /**
   * Crops most of the empty sky. At full width the 1200x420 box renders about
   * 500px tall, which on a 13" laptop pushes the whole hero below the fold.
   * Compact keeps the ridges and moves the sun down so it is not clipped by
   * the new top edge.
   */
  compact?: boolean
  /** Places three children on the near ridge. Hero use. */
  withFigures?: boolean
}) {
  return (
    <svg
      viewBox={compact ? '0 120 1200 300' : '0 0 1200 420'}
      className={className}
      {...svgProps(title)}
    >
      {/* sky stays the page ground: nothing drawn */}

      {/* Sun. Sits high and right, clear of the lilac ridge rather than half
          sunk behind it: a sun bisected by a hill reads as a setting sun, and
          this is a page about being outside during the day. Placed at x=930
          where the ridge line dips, which is the only stretch of sky tall
          enough to hold it in the compact crop. */}
      <circle
        cx="930"
        cy={compact ? 186 : 148}
        r={compact ? 52 : 58}
        className="fill-sun"
        opacity="0.9"
        filter="url(#twm-grain)"
      />

      {/* farthest ridge */}
      <path
        d="M0 268 C 120 214 214 236 302 250 C 402 266 470 214 560 200 C 664 184 720 226 812 238 C 918 252 1006 208 1104 196 C 1146 190 1178 196 1200 204 L1200 420 L0 420 Z"
        className="fill-lilac"
        opacity="0.55"
        filter="url(#twm-painted)"
      />

      {/* middle ridge */}
      <path
        d="M0 312 C 96 280 180 292 268 304 C 372 318 448 282 548 274 C 654 266 726 300 830 306 C 934 312 1024 280 1120 272 C 1156 269 1182 274 1200 280 L1200 420 L0 420 Z"
        className="fill-sage"
        opacity="0.7"
        filter="url(#twm-painted)"
      />

      {/* near ridge */}
      <path
        d="M0 356 C 110 336 196 348 300 356 C 418 365 502 340 606 336 C 716 332 792 356 900 360 C 1002 364 1104 346 1200 340 L1200 420 L0 420 Z"
        className="fill-forest"
        opacity="0.85"
        filter="url(#twm-painted)"
      />

      {/* oaks on the near ridge: simple canopy blobs, not trees with trunks */}
      <g className="fill-forest" filter="url(#twm-grain)">
        <ellipse cx="168" cy="340" rx="26" ry="19" />
        <ellipse cx="212" cy="346" rx="17" ry="13" />
        <ellipse cx="742" cy="341" rx="22" ry="16" />
        <ellipse cx="1046" cy="331" rx="19" ry="14" />
      </g>

      {/* Children on the near ridge.
          The hero previously opened on empty scenery. The most characteristic
          thing in this practice's world is children moving outdoors, so they
          belong in the establishing shot rather than only on the cards.
          Light fills, because the near ridge is the darkest band in the scene. */}
      {withFigures && (
        /* Scaled and dropped so the whole group sits inside the dark foreground
           band. The first pass straddled the ridge line, which left each figure
           half light-on-dark and half light-on-light: the cream ones washed out
           from the waist up. A figure has to live in one band. */
        <g transform="translate(187 147) scale(0.68)">
          {/* running, arms out */}
          <g>
            <path d="M700 356 C 694 368 690 380 691 390" className="stroke-bg" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M712 356 C 720 368 726 378 727 388" className="stroke-bg" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M700 360 C 695 340 700 322 706 321 C 712 322 717 340 712 360 Z" className="fill-bg" filter="url(#twm-grain)" />
            <path d="M700 332 C 688 336 681 342 678 350" className="stroke-bg" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M712 332 C 724 328 731 320 732 311" className="stroke-bg" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="706" cy="308" r="10" className="fill-bg" filter="url(#twm-grain)" />
          </g>

          {/* arms lifted */}
          <g>
            <path d="M754 358 C 751 372 750 384 751 392" className="stroke-lilac" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M766 358 C 770 372 771 384 770 392" className="stroke-lilac" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M752 362 C 748 340 753 320 760 319 C 767 320 772 340 768 362 Z" className="fill-lilac" filter="url(#twm-grain)" />
            <path d="M752 334 C 743 322 739 310 740 300" className="stroke-lilac" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M768 334 C 777 322 781 310 780 300" className="stroke-lilac" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="760" cy="306" r="10" className="fill-lilac" filter="url(#twm-grain)" />
          </g>

          {/* crouched, looking at something on the ground */}
          <g>
            <path d="M806 366 C 800 376 798 386 800 392" className="stroke-bg" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M818 366 C 824 376 826 384 824 391" className="stroke-bg" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M804 370 C 800 354 806 340 812 340 C 818 341 822 356 818 370 Z" className="fill-bg" filter="url(#twm-grain)" />
            <path d="M818 352 C 826 358 830 364 830 370" className="stroke-bg" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="811" cy="329" r="9" className="fill-bg" filter="url(#twm-grain)" />
          </g>
        </g>
      )}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Figures                                                             */
/* ------------------------------------------------------------------ */

/*
 * Proportion note. First pass gave every figure a head roughly two-thirds the
 * width of its torso, which made all five read as toddlers regardless of who
 * they were meant to be. Heads are now near a quarter of the body mass and
 * torsos run longer. Slightly elongated is the idiom here; large-headed is the
 * children's-picture-book idiom, and this brand serves elders and teens too.
 */

/**
 * A single seated figure, cross-legged, hands resting on the knees.
 * Carries somatic flow, meditation and the adult one-to-one work.
 */
export function FigureSeated({ className, title }: ArtProps) {
  return (
    <svg viewBox="0 0 320 340" className={className} {...svgProps(title)}>
      <ellipse cx="160" cy="300" rx="104" ry="17" className="fill-lilac" opacity="0.45" filter="url(#twm-grain)" />

      {/* crossed legs */}
      <path
        d="M70 268 C 94 246 226 246 250 268 C 264 284 242 300 160 300 C 78 300 56 284 70 268 Z"
        className="fill-plum"
        opacity="0.85"
        filter="url(#twm-painted)"
      />

      {/* torso: narrow at the shoulder, widening to the seat */}
      <path
        d="M124 274 C 115 214 126 146 160 142 C 194 146 205 214 196 274 Z"
        className="fill-amber"
        filter="url(#twm-painted)"
      />

      {/* arms out to the knees */}
      <path d="M130 186 C 106 212 96 246 106 272" className="stroke-amber" strokeWidth="15" strokeLinecap="round" fill="none" />
      <path d="M190 186 C 214 212 224 246 214 272" className="stroke-amber" strokeWidth="15" strokeLinecap="round" fill="none" />

      {/* hair: falls behind the shoulders, softer than the first pass */}
      <path
        d="M132 116 C 126 78 142 60 160 60 C 178 60 194 78 188 116 C 194 148 186 170 174 178 C 180 152 178 126 171 116 C 164 126 156 126 149 116 C 142 126 140 152 146 178 C 134 170 126 148 132 116 Z"
        className="fill-ink"
        opacity="0.72"
        filter="url(#twm-painted)"
      />
      <circle cx="160" cy="110" r="26" className="fill-bg" filter="url(#twm-grain)" />
      <circle cx="160" cy="110" r="26" className="fill-amber" opacity="0.26" filter="url(#twm-grain)" />
    </svg>
  )
}

/**
 * An adult and a child seated facing each other. The mommy-and-me moment,
 * and the warmest thing in the set. Used where the site needs to stop being a
 * brochure for a second.
 */
export function FigurePair({ className, title }: ArtProps) {
  return (
    <svg viewBox="0 0 420 340" className={className} {...svgProps(title)}>
      <ellipse cx="210" cy="302" rx="180" ry="18" className="fill-sage" opacity="0.4" filter="url(#twm-grain)" />

      {/* --- adult, left, facing right --- */}
      <path
        d="M54 272 C 76 250 188 250 208 272 C 220 288 200 302 130 302 C 60 302 42 288 54 272 Z"
        className="fill-plum"
        opacity="0.85"
        filter="url(#twm-painted)"
      />
      <path
        d="M96 276 C 88 218 98 152 132 148 C 166 152 176 218 168 276 Z"
        className="fill-amber"
        filter="url(#twm-painted)"
      />
      <path d="M164 192 C 196 198 216 212 226 228" className="stroke-amber" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M100 190 C 78 214 72 244 82 272" className="stroke-amber" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path
        d="M106 122 C 100 86 116 68 132 68 C 148 68 164 86 158 122 C 164 152 156 174 145 182 C 151 156 149 132 142 122 C 136 132 128 132 122 122 C 115 132 113 156 119 182 C 108 174 100 152 106 122 Z"
        className="fill-ink"
        opacity="0.72"
        filter="url(#twm-painted)"
      />
      <circle cx="132" cy="116" r="24" className="fill-bg" filter="url(#twm-grain)" />
      <circle cx="132" cy="116" r="24" className="fill-amber" opacity="0.26" filter="url(#twm-grain)" />

      {/* --- child, right, facing left, smaller --- */}
      <path
        d="M248 280 C 264 264 346 264 360 280 C 368 292 354 302 304 302 C 254 302 240 292 248 280 Z"
        className="fill-moss"
        opacity="0.85"
        filter="url(#twm-painted)"
      />
      <path
        d="M280 282 C 274 240 282 200 304 198 C 326 200 334 240 328 282 Z"
        className="fill-lilac"
        filter="url(#twm-painted)"
      />
      <path d="M282 228 C 262 234 250 244 244 256" className="stroke-lilac" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M326 228 C 340 240 344 258 340 274" className="stroke-lilac" strokeWidth="12" strokeLinecap="round" fill="none" />
      {/* two small buns: reads as "child" without needing a face */}
      <circle cx="284" cy="160" r="12" className="fill-ink" opacity="0.72" filter="url(#twm-grain)" />
      <circle cx="324" cy="160" r="12" className="fill-ink" opacity="0.72" filter="url(#twm-grain)" />
      <path
        d="M283 186 C 278 158 289 144 304 144 C 319 144 330 158 325 186 C 320 168 313 162 304 162 C 295 162 288 168 283 186 Z"
        className="fill-ink"
        opacity="0.72"
        filter="url(#twm-painted)"
      />
      <circle cx="304" cy="182" r="21" className="fill-bg" filter="url(#twm-grain)" />
      <circle cx="304" cy="182" r="21" className="fill-amber" opacity="0.26" filter="url(#twm-grain)" />
    </svg>
  )
}

/**
 * Two figures walking. Wellness Walk Wednesdays, the meditative walk, and the
 * school programs. Mid-stride rather than posed, because the class is a walk
 * and not a photograph of a walk.
 */
export function FigureWalking({ className, title }: ArtProps) {
  return (
    <svg viewBox="0 0 420 340" className={className} {...svgProps(title)}>
      {/* ground: a soft band rather than a drawn line, which read as a scar */}
      <ellipse cx="210" cy="304" rx="196" ry="15" className="fill-sage" opacity="0.42" filter="url(#twm-grain)" />

      {/* --- taller figure --- */}
      {/* Legs run longer than the torso and the stride is open. The first pass
          had legs shorter than the body, which read as standing still. */}
      <path d="M150 196 C 134 232 124 272 124 296" className="stroke-plum" strokeWidth="20" strokeLinecap="round" fill="none" />
      <path d="M174 196 C 192 230 204 268 206 294" className="stroke-plum" strokeWidth="20" strokeLinecap="round" fill="none" />
      {/* feet */}
      <path d="M116 300 L138 300" className="stroke-plum" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M200 298 L222 298" className="stroke-plum" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path
        d="M141 204 C 133 160 141 116 161 114 C 181 116 189 160 181 204 Z"
        className="fill-plum"
        filter="url(#twm-painted)"
      />
      <path d="M143 146 C 126 168 120 190 124 208" className="stroke-plum" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M179 146 C 196 166 200 188 196 206" className="stroke-plum" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path
        d="M136 84 C 130 48 146 30 161 30 C 176 30 192 48 186 84 C 192 112 184 132 173 140 C 179 114 177 92 170 82 C 164 92 158 92 152 82 C 145 92 143 114 149 140 C 138 132 130 112 136 84 Z"
        className="fill-ink"
        opacity="0.72"
        filter="url(#twm-painted)"
      />
      <circle cx="161" cy="78" r="24" className="fill-bg" filter="url(#twm-grain)" />
      <circle cx="161" cy="78" r="24" className="fill-amber" opacity="0.26" filter="url(#twm-grain)" />

      {/* --- shorter figure --- */}
      <path d="M264 232 C 252 258 246 284 246 298" className="stroke-moss" strokeWidth="17" strokeLinecap="round" fill="none" />
      <path d="M284 232 C 296 256 304 282 304 296" className="stroke-moss" strokeWidth="17" strokeLinecap="round" fill="none" />
      <path d="M238 302 L256 302" className="stroke-moss" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M298 300 L316 300" className="stroke-moss" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path
        d="M255 238 C 248 202 255 172 274 170 C 293 172 300 202 293 238 Z"
        className="fill-moss"
        filter="url(#twm-painted)"
      />
      <path d="M257 194 C 243 210 238 226 241 240" className="stroke-moss" strokeWidth="12" strokeLinecap="round" fill="none" />
      {/* the near arm swings up: a child walking, not marching */}
      <path d="M291 194 C 309 186 317 168 315 150" className="stroke-moss" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path
        d="M252 148 C 247 118 261 102 273 102 C 285 102 299 118 294 148 C 289 130 282 124 273 124 C 264 124 257 130 252 148 Z"
        className="fill-ink"
        opacity="0.72"
        filter="url(#twm-painted)"
      />
      <circle cx="273" cy="146" r="20" className="fill-bg" filter="url(#twm-grain)" />
      <circle cx="273" cy="146" r="20" className="fill-amber" opacity="0.26" filter="url(#twm-grain)" />
    </svg>
  )
}

/**
 * A child in tree pose: one foot to the standing knee, arms lifted into a V.
 * Children's yoga and the school enrichment work.
 *
 * Arms go up and out rather than pressed together overhead. Overhead palms
 * collide with the head at this scale and the whole figure loses its silhouette.
 */
export function FigureTree({ className, title }: ArtProps) {
  return (
    <svg viewBox="0 0 320 340" className={className} {...svgProps(title)}>
      <ellipse cx="160" cy="304" rx="80" ry="14" className="fill-sage" opacity="0.5" filter="url(#twm-grain)" />

      {/* standing leg, weight-bearing and properly thick */}
      <path d="M156 216 C 155 250 155 280 156 298" className="stroke-plum" strokeWidth="23" strokeLinecap="round" fill="none" />
      <path d="M146 302 L172 302" className="stroke-plum" strokeWidth="13" strokeLinecap="round" fill="none" />

      {/* Bent leg, drawn as two limbs rather than one curve: thigh out to an
          open knee, shin returning in, then a foot resting at the standing
          thigh. A single stroke here read as a hook, not a leg. */}
      <path d="M166 224 C 190 226 206 240 210 258" className="stroke-plum" strokeWidth="19" strokeLinecap="round" fill="none" />
      <path d="M210 258 C 200 250 186 244 172 242" className="stroke-plum" strokeWidth="17" strokeLinecap="round" fill="none" />
      <ellipse cx="170" cy="242" rx="11" ry="7" className="fill-plum" filter="url(#twm-grain)" />

      {/* torso */}
      <path
        d="M134 224 C 127 178 138 132 160 130 C 182 132 193 178 186 224 Z"
        className="fill-lilac"
        filter="url(#twm-painted)"
      />

      {/* arms lifted into a V, like branches */}
      <path d="M140 158 C 120 128 112 96 114 68" className="stroke-lilac" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M180 158 C 200 128 208 96 206 68" className="stroke-lilac" strokeWidth="14" strokeLinecap="round" fill="none" />

      <path
        d="M138 118 C 133 88 147 72 160 72 C 173 72 187 88 182 118 C 177 100 170 94 160 94 C 150 94 143 100 138 118 Z"
        className="fill-ink"
        opacity="0.72"
        filter="url(#twm-painted)"
      />
      <circle cx="160" cy="114" r="22" className="fill-bg" filter="url(#twm-grain)" />
      <circle cx="160" cy="114" r="22" className="fill-amber" opacity="0.26" filter="url(#twm-grain)" />

      {/* one leaf at the foot: the only whimsy the set allows itself */}
      <path d="M196 300 C 210 286 228 284 236 288 C 229 301 212 307 196 300 Z" className="fill-moss" filter="url(#twm-painted)" />
    </svg>
  )
}

/**
 * A seated elder figure, upright and supported, hands resting on the thighs.
 * Brain Wellness Support for Elders and the caregiver work.
 *
 * Drawn with dignity and not frailty. Master context sections 9 and 44: these
 * sessions are supportive, not clinical, and the art must not imply decline.
 * The seat is a plain bench block. A four-legged chair at this scale reads as
 * a table and puts furniture in front of the person.
 */
export function FigureElder({ className, title }: ArtProps) {
  return (
    <svg viewBox="0 0 320 340" className={className} {...svgProps(title)}>
      <ellipse cx="160" cy="308" rx="96" ry="14" className="fill-lilac" opacity="0.4" filter="url(#twm-grain)" />

      {/* lower legs */}
      <path d="M137 250 L135 300" className="stroke-plum" strokeWidth="21" strokeLinecap="round" fill="none" />
      <path d="M185 250 L187 300" className="stroke-plum" strokeWidth="21" strokeLinecap="round" fill="none" />
      <path d="M124 304 L148 304" className="stroke-plum" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M176 304 L200 304" className="stroke-plum" strokeWidth="12" strokeLinecap="round" fill="none" />

      {/* bench: one soft block, behind the figure */}
      <path
        d="M88 232 C 88 222 96 216 108 216 L212 216 C 224 216 232 222 232 232 L232 254 C 232 262 224 266 212 266 L108 266 C 96 266 88 262 88 254 Z"
        className="fill-amber"
        opacity="0.5"
        filter="url(#twm-painted)"
      />

      {/* thighs across the bench */}
      <path d="M130 240 C 150 231 172 231 192 238" className="stroke-plum" strokeWidth="21" strokeLinecap="round" fill="none" />

      {/* torso, upright */}
      <path
        d="M130 244 C 122 196 132 142 160 138 C 188 142 198 196 190 244 Z"
        className="fill-sage"
        filter="url(#twm-painted)"
      />

      {/* arms, hands to the thighs */}
      <path d="M134 178 C 118 202 118 226 128 242" className="stroke-sage" strokeWidth="15" strokeLinecap="round" fill="none" />
      <path d="M186 178 C 202 202 202 226 192 242" className="stroke-sage" strokeWidth="15" strokeLinecap="round" fill="none" />

      {/* hair, swept back and silvered */}
      <path
        d="M134 110 C 128 76 144 58 160 58 C 176 58 192 76 186 110 C 191 134 183 150 173 156 C 179 134 176 116 169 108 C 163 118 157 118 151 108 C 144 116 141 134 147 156 C 137 150 129 134 134 110 Z"
        className="fill-line-strong"
        opacity="0.85"
        filter="url(#twm-painted)"
      />
      <circle cx="160" cy="104" r="25" className="fill-bg" filter="url(#twm-grain)" />
      <circle cx="160" cy="104" r="25" className="fill-amber" opacity="0.26" filter="url(#twm-grain)" />
    </svg>
  )
}

/**
 * Two hands, one resting a thumb on a point of the other forearm.
 * Acupressure therapy and the hands-on part of the somatic work.
 *
 * Drawn as gesture rather than anatomy. A correct hand at card size is a lot of
 * small shapes that turn to mush; a confident simple one reads instantly.
 */
export function FigureHands({ className, title }: ArtProps) {
  return (
    <svg viewBox="0 0 320 320" className={className} {...svgProps(title)}>
      {/* receiving forearm, running low across the frame */}
      <path
        d="M36 214 C 96 196 168 190 232 198"
        className="stroke-amber"
        strokeWidth="34"
        strokeLinecap="round"
        fill="none"
      />
      {/* its hand, fingers suggested by three short strokes */}
      <ellipse cx="252" cy="202" rx="26" ry="19" className="fill-amber" filter="url(#twm-grain)" />
      <path d="M272 192 L292 186" className="stroke-amber" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M274 202 L296 200" className="stroke-amber" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M272 212 L292 216" className="stroke-amber" strokeWidth="9" strokeLinecap="round" fill="none" />

      {/* working hand coming in from above */}
      <path
        d="M128 44 C 116 84 112 120 120 150"
        className="stroke-plum"
        strokeWidth="30"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M104 148 C 100 176 118 190 140 186 C 160 182 168 164 160 146 C 150 128 118 128 104 148 Z"
        className="fill-plum"
        filter="url(#twm-painted)"
      />
      {/* thumb, meeting the point */}
      <path d="M148 176 C 138 188 132 194 128 198" className="stroke-plum" strokeWidth="15" strokeLinecap="round" fill="none" />

      {/* the point itself: the only place the site draws attention with a ring */}
      <circle cx="126" cy="202" r="9" className="fill-lilac" />
      <circle cx="126" cy="202" r="17" className="stroke-plum" strokeWidth="3" fill="none" opacity="0.6" />
      <circle cx="126" cy="202" r="27" className="stroke-plum" strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Botanical                                                           */
/* ------------------------------------------------------------------ */

/**
 * A herb sprig. Section rule, list marker, card corner.
 * The herb garden is the literal subject of the Children's Center, so this is
 * the brand's most-earned decorative motif.
 */
export function Sprig({ className, title }: ArtProps) {
  return (
    <svg viewBox="0 0 120 200" className={className} {...svgProps(title)}>
      <path
        d="M60 196 C 58 150 58 96 60 44"
        className="stroke-moss"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        filter="url(#twm-rough)"
      />
      <g className="fill-moss" filter="url(#twm-painted)">
        <path d="M60 160 C 40 158 26 146 24 132 C 42 128 56 140 60 160 Z" />
        <path d="M60 148 C 80 146 94 134 96 120 C 78 116 64 128 60 148 Z" />
        <path d="M60 120 C 42 118 30 108 28 96 C 44 92 56 102 60 120 Z" />
        <path d="M60 108 C 78 106 90 96 92 84 C 76 80 64 90 60 108 Z" />
        <path d="M60 80 C 46 78 36 70 34 60 C 48 57 57 65 60 80 Z" />
        <path d="M60 70 C 74 68 84 60 86 50 C 72 47 63 55 60 70 Z" />
      </g>
      <path d="M60 46 C 52 34 54 20 62 12 C 70 22 68 36 60 46 Z" className="fill-sage" filter="url(#twm-painted)" />
    </svg>
  )
}

/**
 * Bee on a sage bloom.
 *
 * This is the brand's keystone motif and the reason it exists is measurable:
 * Boclaire's own photograph "Bee Happy" is 71% purple by pixel share at
 * H286/291/271, against the logo mark's H282. The brand purple has a real
 * source in the natural world and in her own camera roll. This illustration is
 * the vector restatement of that fact, and it is what stops the purple reading
 * as an arbitrary brand-deck choice.
 */
export function BeeBloom({ className, title }: ArtProps) {
  return (
    <svg viewBox="0 0 260 220" className={className} {...svgProps(title)}>
      {/* stem */}
      <path
        d="M96 216 C 100 176 108 146 122 124"
        className="stroke-moss"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        filter="url(#twm-rough)"
      />
      <path d="M100 180 C 82 176 70 164 68 150 C 86 148 98 160 100 180 Z" className="fill-moss" filter="url(#twm-painted)" />
      <path d="M106 152 C 124 148 136 136 136 122 C 118 120 108 132 106 152 Z" className="fill-moss" filter="url(#twm-painted)" />

      {/* blossom cluster, the purple */}
      <g filter="url(#twm-painted)">
        <circle cx="122" cy="106" r="26" className="fill-lilac" />
        <circle cx="152" cy="86" r="20" className="fill-lilac" opacity="0.9" />
        <circle cx="104" cy="76" r="18" className="fill-plum" opacity="0.55" />
        <circle cx="138" cy="58" r="14" className="fill-plum" opacity="0.4" />
      </g>

      {/* bee. Legible at a glance needs four things: a striped abdomen, a
          distinct head, two wings clearly clear of the body, and antennae.
          The first pass had a plain oval and read as a pinecone. */}
      <g transform="translate(186 62) rotate(-18)" filter="url(#twm-grain)">
        {/* wings, drawn first so the body sits over them */}
        <ellipse cx="-4" cy="-16" rx="20" ry="10" transform="rotate(-26 -4 -16)" className="fill-bg" opacity="0.8" />
        <ellipse cx="12" cy="-14" rx="17" ry="9" transform="rotate(10 12 -14)" className="fill-bg" opacity="0.65" />
        {/* abdomen */}
        <ellipse cx="6" cy="2" rx="24" ry="14" className="fill-amber" />
        {/* stripes */}
        <path d="M-2 -10 C 1 -3 1 6 -2 13" className="stroke-ink" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.62" />
        <path d="M10 -11 C 13 -4 13 6 10 13" className="stroke-ink" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.62" />
        <path d="M21 -8 C 24 -3 24 5 21 10" className="stroke-ink" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
        {/* head */}
        <circle cx="-22" cy="0" r="10" className="fill-ink" opacity="0.72" />
        {/* antennae */}
        <path d="M-27 -7 C -33 -14 -37 -17 -42 -18" className="stroke-ink" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M-24 -9 C -27 -18 -29 -22 -32 -26" className="stroke-ink" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      </g>

      {/* flight line */}
      <path
        d="M226 96 C 240 78 236 56 216 44"
        className="stroke-amber"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 9"
        fill="none"
        opacity="0.75"
      />
    </svg>
  )
}

/**
 * A seed head, drawn as a radial burst. Small accent for section breaks and
 * the empty corner of a card.
 */
export function SeedHead({ className, title }: ArtProps) {
  const spokes = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2
    return {
      x1: 60 + Math.cos(a) * 12,
      y1: 60 + Math.sin(a) * 12,
      x2: 60 + Math.cos(a) * 42,
      y2: 60 + Math.sin(a) * 42,
      cx: 60 + Math.cos(a) * 47,
      cy: 60 + Math.sin(a) * 47,
    }
  })
  return (
    <svg viewBox="0 0 120 120" className={className} {...svgProps(title)}>
      <g filter="url(#twm-rough)">
        {spokes.map((s, i) => (
          <g key={i}>
            <line
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              className="stroke-amber"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx={s.cx} cy={s.cy} r="4" className="fill-amber" opacity="0.55" />
          </g>
        ))}
      </g>
      <circle cx="60" cy="60" r="11" className="fill-moss" filter="url(#twm-grain)" />
    </svg>
  )
}

/**
 * A wide, low arc band. Structural rather than pictorial: use it to close a
 * colored section without the hard horizontal edge that makes a page look
 * like stacked rectangles.
 */
export function ArcBand({ className, title }: ArtProps) {
  return (
    <svg viewBox="0 0 1200 90" className={className} preserveAspectRatio="none" {...svgProps(title)}>
      {/* No filter here. The displacement map speckles a shape this wide and
          shallow, and the artefacts read as dirt on the screen rather than as
          brush texture. A clean curve is the better call. */}
      <path d="M0 90 C 220 18 420 6 600 8 C 800 10 1000 26 1200 86 L1200 90 Z" className="fill-bg" />
    </svg>
  )
}
