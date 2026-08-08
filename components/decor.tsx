import { cn } from '@/lib/utils'

/**
 * Subtle coordinate-grid background. Rendered as an inline SVG pattern so it
 * stays crisp and lightweight. Kept low-opacity to never overpower content.
 */
export function GridField({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="coord-grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path
            d="M56 0H0V56"
            fill="none"
            stroke="var(--color-blue-yonder)"
            strokeWidth="1"
            strokeOpacity="0.12"
          />
        </pattern>
        <radialGradient id="grid-fade" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-mask">
          <rect width="100%" height="100%" fill="url(#grid-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#coord-grid)" mask="url(#grid-mask)" />
    </svg>
  )
}

/**
 * Concentric orbital rings with drifting bodies. Purely decorative.
 * Rotation respects prefers-reduced-motion (handled globally in CSS).
 */
export function OrbitalSystem({
  className,
  animate = true,
}: {
  className?: string
  animate?: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute aspect-square', className)}
    >
      <div className={cn('absolute inset-0', animate && 'animate-orbit-slow')}>
        <Ring inset="0%" />
        <Body className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-neon-yellow" size={14} />
      </div>
      <div className={cn('absolute inset-[14%]', animate && 'animate-orbit-med')}>
        <Ring inset="0%" dashed />
        <Body className="right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-blue-yonder" size={10} />
      </div>
      <div className={cn('absolute inset-[30%]', animate && 'animate-orbit-fast')}>
        <Ring inset="0%" />
        <Body className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-rocket-red" size={12} />
      </div>
      <div className="absolute inset-[46%] rounded-full border border-blue-yonder/30" />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-yellow shadow-[0_0_24px_6px_rgba(234,254,7,0.4)]" />
    </div>
  )
}

function Ring({ inset, dashed }: { inset: string; dashed?: boolean }) {
  return (
    <div
      className={cn(
        'absolute rounded-full border',
        dashed ? 'border-dashed border-blue-yonder/25' : 'border-blue-yonder/20',
      )}
      style={{ inset }}
    />
  )
}

function Body({ className, size }: { className?: string; size: number }) {
  return (
    <span
      className={cn('absolute rounded-full', className)}
      style={{ width: size, height: size }}
    />
  )
}

/** Small monospace coordinate label used as an editorial detail. */
export function Coord({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'font-mono text-[0.7rem] uppercase tracking-[0.25em] text-blue-yonder/80',
        className,
      )}
    >
      {children}
    </span>
  )
}
