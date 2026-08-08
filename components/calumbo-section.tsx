import { MapPin } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from '@/components/reveal'
import { GridField, OrbitalSystem, Coord } from '@/components/decor'

export function CalumboSection() {
  return (
    <section
      id="calumbo"
      className="relative isolate overflow-hidden border-t border-border bg-gradient-to-br from-electric-blue via-deep-blue to-deep-blue py-24 sm:py-32"
    >
      <GridField className="opacity-50" />
      <OrbitalSystem
        className="left-[-40%] top-[-10%] w-[90%] opacity-40 sm:left-[-20%] lg:left-auto lg:right-[-8%] lg:top-1/2 lg:w-[46%] lg:-translate-y-1/2"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full border border-blue-yonder/50 text-neon-yellow">
            <MapPin size={16} weight="fill" />
          </span>
          <Coord>Sede local · Calumbo</Coord>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-8 font-display font-black uppercase leading-[0.9] tracking-tight text-balance text-[clamp(2.6rem,10vw,7rem)]">
            O global <br />
            <span className="text-neon-yellow">encontra</span> o local
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal delay={120} className="lg:col-span-6">
            <p className="text-pretty text-xl leading-relaxed text-foreground">
              O NASA Space Apps Calumbo traz este movimento internacional para a nossa
              comunidade. É o ponto onde a curiosidade local se liga aos dados e à ciência
              partilhados por todo o mundo.
            </p>
          </Reveal>
          <Reveal delay={200} className="lg:col-span-6">
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Aqui, quem participa não é apenas espetador da exploração espacial — é parte
              dela. Reunimos talento, ideias e vontade de resolver problemas reais, criando
              um espaço onde qualquer pessoa pode contribuir, aprender e crescer.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
