import { cn } from '@/lib/utils'

/**
 * Typographic lockup for the local chapter identity "NASA Space Apps Calumbo".
 *
 * NOTE: This is a text wordmark for the chapter name — it deliberately does
 * NOT recreate, approximate or recolor the official NASA Space Apps logo mark,
 * which is a protected brand asset. When the official logo file is provided,
 * replace this component's usage with the supplied image asset.
 */
export function Wordmark({
  className,
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md'
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} aria-label="NASA Space Apps Calumbo">
      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-blue-yonder/50"
      >
        <span className="h-2 w-2 rounded-full bg-neon-yellow shadow-[0_0_10px_2px_rgba(234,254,7,0.5)]" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-medium uppercase tracking-[0.32em] text-blue-yonder',
            size === 'sm' ? 'text-[0.6rem]' : 'text-[0.68rem]',
          )}
        >
          NASA Space Apps
        </span>
        <span
          className={cn(
            'font-display font-black uppercase tracking-tight text-foreground',
            size === 'sm' ? 'text-base' : 'text-xl',
          )}
        >
          Calumbo
        </span>
      </span>
    </span>
  )
}
