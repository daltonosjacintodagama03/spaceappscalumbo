import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { AboutSpaceApps } from '@/components/about-space-apps'
import { CalumboSection } from '@/components/calumbo-section'
import { WhyParticipate } from '@/components/why-participate'
import { MissionJourney } from '@/components/mission-journey'
import { Challenges } from '@/components/challenges'
import { Community } from '@/components/community'
import { SocialCardGenerator } from '@/components/social-card-generator'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <a
        href="#space-apps"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-neon-yellow focus:px-4 focus:py-2 focus:font-display focus:font-bold focus:text-deep-blue"
      >
        Saltar para o conteúdo
      </a>
      <Navbar />
      <main>
        <Hero />
        <AboutSpaceApps />
        <CalumboSection />
        <WhyParticipate />
        <MissionJourney />
        <Challenges />
        <Community />
        <SocialCardGenerator />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
