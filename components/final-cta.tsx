import { REGISTRATION_URL } from '@/lib/site'
import { CtaExternal } from '@/components/cta'
import { GridField, OrbitalSystem, Coord } from '@/components/decor'
import { Reveal } from '@/components/reveal'

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border py-28 sm:py-40">
      <GridField className="opacity-60" />
      <OrbitalSystem className="left-1/2 top-1/2 w-[140%] max-w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal className="flex justify-center">
          <Coord>Preparação de lançamento</Coord>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 font-display font-black uppercase leading-[0.9] tracking-tight text-balance text-[clamp(2.4rem,8vw,5.5rem)]">
            A tua próxima missão <span className="text-neon-yellow">começa aqui</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Junta-te ao NASA Space Apps Calumbo e transforma curiosidade em impacto.
            As vagas para esta jornada estão à tua espera.
          </p>
        </Reveal>
        <Reveal delay={220} className="mt-10 flex justify-center">
          <CtaExternal href={REGISTRATION_URL} variant="primary" size="lg">
            Participar
          </CtaExternal>
        </Reveal>
      </div>
    </section>
  )
}
