import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const reasons = [
  {
    verb: 'Criar',
    body: 'Transforma ideias em protótipos, apps, visualizações e soluções tangíveis num só fim de semana.',
  },
  {
    verb: 'Aprender',
    body: 'Domina novas ferramentas, dados e métodos científicos com mentoria e colaboração.',
  },
  {
    verb: 'Colaborar',
    body: 'Trabalha lado a lado com pessoas de áreas diferentes e constrói uma rede que perdura.',
  },
  {
    verb: 'Resolver',
    body: 'Enfrenta desafios reais da Terra e do espaço com pensamento crítico e criatividade.',
  },
  {
    verb: 'Impactar',
    body: 'As tuas soluções podem inspirar mudança — na comunidade, no país e além.',
  },
]

export function WhyParticipate() {
  return (
    <section id="porque-participar" className="relative border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Porquê participar"
          title={
            <>
              Cinco razões para <span className="text-blue-yonder">entrar em órbita</span>
            </>
          }
        />

        <ul className="mt-14 border-t border-border">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.verb} delay={i * 60}>
              <div className="group grid grid-cols-1 items-baseline gap-3 border-b border-border py-8 transition-colors hover:bg-card/60 sm:grid-cols-12 sm:gap-6 sm:px-4">
                <span className="col-span-1 font-mono text-sm text-blue-yonder/70 sm:col-span-1">
                  {`0${i + 1}`}
                </span>
                <h3 className="col-span-1 font-display text-4xl font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-neon-yellow sm:col-span-4 sm:text-5xl">
                  {r.verb}
                </h3>
                <p className="col-span-1 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:col-span-7">
                  {r.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
