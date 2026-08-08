import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-display font-bold uppercase tracking-wide transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-blue-yonder/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50'

const sizes = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const variants = {
  // Neon yellow accent — the primary "mission" action.
  primary:
    'bg-neon-yellow text-deep-blue hover:brightness-105 hover:-translate-y-0.5 shadow-[0_10px_30px_-8px_rgba(234,254,7,0.45)]',
  // Outlined for secondary discovery action.
  outline:
    'border border-blue-yonder/45 bg-transparent text-foreground hover:border-blue-yonder hover:bg-blue-yonder/10',
  // Solid neon-blue.
  solid: 'bg-neon-blue text-white hover:bg-electric-blue hover:-translate-y-0.5',
}

interface CtaProps {
  children: React.ReactNode
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  withArrow?: boolean
}

/** Internal anchor (smooth-scroll to a section). */
export function CtaAnchor({
  href,
  children,
  variant = 'outline',
  size = 'md',
  className,
  withArrow,
}: CtaProps & { href: string }) {
  return (
    <a href={href} className={cn(base, sizes[size], variants[variant], className)}>
      {children}
      {withArrow && <Arrow />}
    </a>
  )
}

/** External link opened safely in a new tab (used for registration). */
export function CtaExternal({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  withArrow = true,
}: CtaProps & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {children}
      {withArrow && <Arrow />}
    </a>
  )
}

function Arrow() {
  return (
    <ArrowUpRight
      weight="bold"
      className="size-[1.1em] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden="true"
    />
  )
}
