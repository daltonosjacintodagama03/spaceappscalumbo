import {
  Compass,
  UsersThree,
  ChartLineUp,
  Wrench,
  RocketLaunch,
} from '@phosphor-icons/react/dist/ssr'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const steps = [
  { n: '01', icon: Compass, title: 'Descobre o desafio', body: 'Escolhe entre os desafios oficiais aquele que te move.' },
  { n: '02', icon: UsersThree, title: 'Forma a tua equipa', body: 'Junta talentos complementares — código, design, ciência e ideias.' },
  { n: '03', icon: ChartLineUp, title: 'Explora os dados', body: 'Mergulha nos dados abertos da NASA e encontra padrões e oportunidades.' },
  { n: '04', icon: Wrench, title: 'Cria a solução', body: 'Constrói um protótipo funcional que responda ao desafio.' },
  { n: '05', icon: RocketLaunch, title: 'Apresenta a tua missão', body: 'Mostra o teu projeto ao mundo e defende o teu impacto.' },
]

export function MissionJourney() {
  return (
    <section
      id="experiencia"
      className="relative isolate overflow-hidden border-t border-border bg-gradient-to-br from-deep-blue to-electric-blue/80 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="A experiência"
          title={
            <>
              A tua sequência de <span className="text-neon-yellow">missão</span>
            </>
          }
          description="Da descoberta à apresentação, cinco etapas guiam a tua jornada durante o evento."
        />

        <ol className="relative mt-16 grid gap-y-10 md:grid-cols-5 md:gap-x-4">
          {/* Trajectory line (desktop) */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-blue-yonder/10 via-blue-yonder/50 to-blue-yonder/10 md:block"
          />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90} className="relative">
              <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-6">
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-blue-yonder/50 bg-deep-blue text-neon-yellow shadow-[0_0_0_6px_rgba(7,23,63,1)]">
                  <s.icon size={26} weight="duotone" />
                </span>
                <div>
                  <span className="font-mono text-sm text-blue-yonder/80">{s.n}</span>
                  <h3 className="mt-1 font-display text-lg font-bold leading-tight">{s.title}</h3>
                </div>
              </div>
              <p className="mt-4 max-w-[16rem] text-pretty leading-relaxed text-muted-foreground md:pl-0">
                {s.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
