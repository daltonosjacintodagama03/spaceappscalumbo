import { Reveal } from '@/components/reveal'
import { Coord } from '@/components/decor'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Coord>{index}</Coord>
        <span className="h-px w-8 bg-neon-yellow" />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-neon-yellow">
          {eyebrow}
        </span>
      </div>
      <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,3.6rem)] font-black uppercase leading-[0.95] tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
