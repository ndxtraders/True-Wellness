/**
 * The mark, as a CSS mask.
 *
 * The logo is a single ink on paper, so rather than shipping a light version and
 * a dark version, the artwork drives `mask-image` and takes its color from
 * `currentColor`. One asset, both themes, and it recolors anywhere it's placed.
 *
 * Source artwork is Boclaire's supplied PNG, keyed to alpha and trimmed.
 */

type LogoProps = {
  /** `roundel` is the circle and figure alone — use it below ~64px, where the arc wordmark is illegible. */
  variant?: 'wordmark' | 'roundel'
  className?: string
}

const art = {
  wordmark: { src: '/brand/wordmark-mask.png', ratio: 920 / 865 },
  roundel: { src: '/brand/roundel-mask.png', ratio: 1 },
} as const

export function Logo({ variant = 'wordmark', className = '' }: LogoProps) {
  const { src, ratio } = art[variant]
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: 'block',
        aspectRatio: String(ratio),
        backgroundColor: 'currentColor',
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}
