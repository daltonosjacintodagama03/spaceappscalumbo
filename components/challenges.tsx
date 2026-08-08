import { Planet, ShootingStar, Broadcast } from '@phosphor-icons/react/dist/ssr'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { Coord } from '@/components/decor'

const keywords = ['Mission', 'Data', 'Science', 'Code', 'Design', 'Impact']

const placeholders = [
  {
    tag: 'Terra',
    icon: Planet,
    title: 'Desafio por anunciar',
    body: 'Os desafios oficiais serão revelados em breve. Prepara-te para explorar temas sobre o nosso planeta.',
  },
  {
    tag: 'Espaço',
    icon: ShootingStar,
    title: 'Desafio por anunciar',
    body: 'Uma missão dedicada à exploração espacial aguarda a tua equipa. Detalhes em breve.',
  },
  {
    tag: 'Dados',
    icon: Broadcast,
    title: 'Desafio por anunciar',
    body: 'Trabalha com conjuntos de dados abertos para resolver problemas concretos. Fica atento.',
  },
]

export function Challenges() {
  return (
    <section id="desafios" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      {/* Concept keyword marquee */}
      <div className="mb-16 select-none overflow-hidden border-y border-border py-4" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-8">
          {[...keywords, ...keywords, ...keywords, ...keywords].map((k, i) => (
            <span
              key={`${k}-${i}`}
              className="font-display text-3xl font-black uppercase tracking-tight text-transparent sm:text-4xl"
              style={{ WebkitTextStroke: '1px rgba(46,150,245,0.35)' }}
            >
              {k}
              <span className="mx-8 text-neon-yellow" style={{ WebkitTextStroke: '0' }}>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Desafios"
          title={
            <>
              Missões que ligam <span className="text-blue-yonder">dados a impacto</span>
            </>
          }
          description="Cada desafio é uma missão: uma pergunta real que combina ciência, código, design e criatividade. Os desafios oficiais serão anunciados brevemente."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {placeholders.map((c, i) => (
            <Reveal key={i} delay={i * 90}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors hover:border-blue-yonder/50">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-blue-yonder/30 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-blue-yonder">
                    {c.tag}
                  </span>
                  <c.icon size={28} weight="duotone" className="text-neon-yellow" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold leading-tight">{c.title}</h3>
                <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
                <div className="mt-6 flex items-center gap-2 border-t border-border pt-4">
                  <Coord>Estado</Coord>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-neon-yellow">
                    <span className="size-1.5 rounded-full bg-neon-yellow" />
                    Em preparação
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
