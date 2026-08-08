import { Database, Globe, Lightbulb, UsersThree } from '@phosphor-icons/react/dist/ssr'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { Coord } from '@/components/decor'

const pillars = [
  {
    icon: Database,
    title: 'Dados abertos',
    body: 'Acesso a conjuntos de dados reais da NASA — do clima aos oceanos, do espaço à Terra.',
  },
  {
    icon: Globe,
    title: 'Colaboração global',
    body: 'Um dos maiores hackathons do mundo, com equipas a trabalhar em simultâneo em centenas de locais.',
  },
  {
    icon: Lightbulb,
    title: 'Ciência e criatividade',
    body: 'Ferramentas para resolver problemas com engenho, código, design e pensamento científico.',
  },
  {
    icon: UsersThree,
    title: 'Comunidade',
    body: 'Pessoas de áreas diferentes unidas por um objetivo comum: criar impacto.',
  },
]

export function AboutSpaceApps() {
  return (
    <section id="space-apps" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              eyebrow="O que é"
              title={
                <>
                  Um desafio <span className="text-blue-yonder">global</span> de dados abertos
                </>
              }
              description="O NASA Space Apps Challenge é o maior hackathon anual do mundo. Durante um fim de semana, milhares de pessoas usam dados abertos da NASA para responder a desafios reais da Terra e do espaço."
            />
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 80} className="bg-card">
                  <div className="flex h-full flex-col gap-4 p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl bg-neon-blue/15 text-blue-yonder">
                        <p.icon size={22} weight="duotone" />
                      </span>
                      <Coord>{`0${i + 1}`}</Coord>
                    </div>
                    <h3 className="font-display text-xl font-bold">{p.title}</h3>
                    <p className="text-pretty leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
