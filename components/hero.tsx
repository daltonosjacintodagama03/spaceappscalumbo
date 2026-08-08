import { REGISTRATION_URL } from '@/lib/site'
import { CtaExternal, CtaAnchor } from '@/components/cta'
import { GridField, OrbitalSystem, Coord } from '@/components/decor'
import { Logo } from '@/components/logo'

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-br from-electric-blue via-deep-blue to-deep-blue"
    >
      <GridField className="opacity-70" />

      {/* Orbital system anchored to the right, bleeding off-canvas for an
          asymmetric, editorial composition. */}
      <OrbitalSystem
        className="right-[-30%] top-[8%] w-[120%] max-w-[1100px] opacity-90 sm:right-[-18%] lg:right-[-6%] lg:top-1/2 lg:w-[62%] lg:-translate-y-1/2"
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-12 lg:pt-24">
        <div className="lg:col-span-7">
          <Logo variant="onDark" className="mb-8 h-20 w-20 lg:hidden" priority />

          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-neon-yellow" />
            <Coord>Lat 09°S · Long 13°E · Angola</Coord>
          </div>

          <h1 className="font-display font-black uppercase leading-[0.86] tracking-tight text-balance">
            <span className="block text-blue-yonder text-[clamp(1.6rem,5vw,3rem)]">
              NASA Space Apps
            </span>
            <span className="mt-1 block text-foreground text-[clamp(3.4rem,15vw,10rem)]">
              Calumbo
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Estudantes, programadores, designers, cientistas e criadores reúnem-se
            para transformar os <span className="text-foreground">dados abertos da NASA</span>{' '}
            em soluções para os desafios do nosso planeta. Uma missão local, ligada a
            um movimento global.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaExternal href={REGISTRATION_URL} variant="primary" size="lg">
              Participar
            </CtaExternal>
            <CtaAnchor href="#space-apps" variant="outline" size="lg" withArrow>
              Descobrir o Space Apps
            </CtaAnchor>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
            <MetaItem term="Formato" desc="Hackathon" />
            <MetaItem term="Dados" desc="Abertos · NASA" />
            <MetaItem term="Missão" desc="Global × Local" />
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <Coord>Explorar</Coord>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-neon-yellow to-transparent" />
      </div>
    </section>
  )
}

function MetaItem({ term, desc }: { term: string; desc: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-blue-yonder/80">
        {term}
      </dt>
      <dd className="mt-1 font-display text-lg font-bold text-foreground">{desc}</dd>
    </div>
  )
}
