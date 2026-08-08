'use client'

import dynamic from 'next/dynamic'
import { SpinnerGap } from '@phosphor-icons/react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

// Lazy-load the canvas generator so it never weighs on the initial bundle.
const CardGenerator = dynamic(() => import('@/components/social-card/card-generator'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-border bg-card">
      <SpinnerGap size={32} className="animate-spin text-blue-yonder" aria-hidden="true" />
      <span className="sr-only">A carregar o gerador de cartões…</span>
    </div>
  ),
})

export function SocialCardGenerator() {
  return (
    <section
      id="eu-vou"
      className="relative isolate overflow-hidden border-t border-border bg-gradient-to-br from-electric-blue/90 via-deep-blue to-deep-blue py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Eu Vou"
          title={
            <>
              Cria o teu cartão <span className="text-neon-yellow">«Eu Vou»</span>
            </>
          }
          description="Gera uma imagem personalizada para anunciares nas redes sociais que vais estar presente. Tudo acontece no teu dispositivo — sem contas, sem servidores, sem complicações."
        />

        <Reveal className="mt-14">
          <CardGenerator />
        </Reveal>
      </div>
    </section>
  )
}
