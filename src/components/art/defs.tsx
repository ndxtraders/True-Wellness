/**
 * Shared SVG filter definitions for the illustration system.
 *
 * Rendered exactly once, in the root layout, inside a zero-size hidden SVG.
 * Every illustration references these by global id, so the noise is defined a
 * single time no matter how many pieces of art a page carries.
 *
 * Two filters do all the work of making flat vector shapes read as painted:
 *
 *   twm-grain  A monochrome fractal-noise wash multiplied over the shape. This
 *              is the difference between "clipart" and "gouache". Without it
 *              flat fills look printed by a machine; with it they look laid
 *              down by a brush.
 *
 *   twm-rough  A small displacement map that pushes edges off true by a few
 *              pixels. Nothing in nature is drawn with a perfect bezier, and
 *              the brand's own rule is not to look artificially polished
 *              (master context 34 and 36).
 *
 * Both are deliberately subtle. Turned up they read as a filter effect, which
 * is worse than no texture at all.
 *
 * IMPORTANT: only apply these to shapes with a real bounding box. SVG filter
 * regions default to filterUnits="objectBoundingBox", so on a stroke-only path
 * (a leg, an arm) the bbox is near-zero-width and the region clips a 20-unit
 * stroke down to a hairline. Stroked limbs in illustrations.tsx are therefore
 * unfiltered by design; their irregularity comes from the path geometry.
 */
export function ArtDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        {/* Paper grain. Multiplied, low alpha, desaturated. */}
        <filter id="twm-grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="7" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
          <feComponentTransfer in="mono" result="soft">
            <feFuncA type="linear" slope="0.3" intercept="0" />
          </feComponentTransfer>
          <feComposite in="soft" in2="SourceGraphic" operator="in" result="masked" />
          <feBlend in="SourceGraphic" in2="masked" mode="multiply" />
        </filter>

        {/* Brush-edge irregularity. Scale stays low; past ~6 it reads as melted. */}
        <filter id="twm-rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="3" result="warp" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Both at once, for the large shapes that carry a composition. */}
        <filter id="twm-painted" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="11" result="warp" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="wobbled"
          />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="5" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
          <feComponentTransfer in="mono" result="soft">
            <feFuncA type="linear" slope="0.28" intercept="0" />
          </feComponentTransfer>
          <feComposite in="soft" in2="wobbled" operator="in" result="masked" />
          <feBlend in="wobbled" in2="masked" mode="multiply" />
        </filter>
      </defs>
    </svg>
  )
}
