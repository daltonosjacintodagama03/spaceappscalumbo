import Image from 'next/image'
import { cn } from '@/lib/utils'

import logoDarkBg from '@/public/logo-space-apps-calumbo.png'
import logoLightBg from '@/public/logo-space-apps-calumbo-light-bg.png'

/**
 * Official NASA Space Apps Calumbo emblem.
 *
 * Two supplied variants:
 *  - `onDark`  → white/red mark on navy field (Diapositivo5). Use on the
 *                site's deep-space background. Clipped to a circle so the
 *                square navy field blends into the page.
 *  - `onLight` → black/red mark on white field (Diapositivo4). Use on light
 *                surfaces.
 */
export function Logo({
  variant = 'onDark',
  className,
  priority = false,
}: {
  variant?: 'onDark' | 'onLight'
  className?: string
  priority?: boolean
}) {
  const src = variant === 'onDark' ? logoDarkBg : logoLightBg

  return (
    <span
      className={cn(
        'relative inline-block aspect-square overflow-hidden rounded-full',
        // Subtle ring only on the dark emblem to lift it off the near-navy page.
        variant === 'onDark' && 'ring-1 ring-inset ring-blue-yonder/20',
        className,
      )}
    >
      <Image
        src={src}
        alt="NASA Space Apps Calumbo"
        fill
        sizes="200px"
        priority={priority}
        className="scale-[1.04] object-cover"
      />
    </span>
  )
}
