import { ImageSquare } from '@phosphor-icons/react/dist/ssr'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const roles = [
  'Programação',
  'Design',
  'Ciência de dados',
  'Engenharia',
  'Comunicação',
  'Investigação',
  'Empreendedorismo',
  'Educação',
]

export function Community() {
  return (
    <section id="comunidade" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="05"
              eyebrow="Comunidade"
              title={
                <>
                  Competências diferentes, <span className="text-blue-yonder">missão comum</span>
                </>
              }
              description="A força do Space Apps está na diversidade. Programadores, designers, cientistas, comunicadores e curiosos juntam-se para resolver problemas que importam."
            />

            <Reveal delay={120}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {roles.map((role) => (
                  <li
                    key={role}
                    className="rounded-full border border-border bg-card px-4 py-2 font-display text-sm font-medium text-foreground"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Placeholder photo composition — clearly identifiable as reserved
              space for real event photography. */}
          <div className="lg:col-span-7">
            <Reveal className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PhotoPlaceholder key={i} tall={i === 1 || i === 4} />
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhotoPlaceholder({ tall }: { tall?: boolean }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-blue-yonder/30 bg-gradient-to-br from-card to-muted/40 p-4 text-center ${
        tall ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
      }`}
    >
      <ImageSquare size={26} weight="duotone" className="text-blue-yonder/60" aria-hidden="true" />
      <span className="font-mono text-[0.62rem] uppercase leading-tight tracking-[0.15em] text-muted-foreground">
        Fotografia do evento
      </span>
    </div>
  )
}
