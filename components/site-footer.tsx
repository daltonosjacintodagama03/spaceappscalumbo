import { InstagramLogo, LinkedinLogo, XLogo, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { NAV_LINKS, REGISTRATION_URL } from '@/lib/site'
import { Logo } from '@/components/logo'
import { Coord } from '@/components/decor'

const socials = [
  { label: 'Instagram (placeholder)', icon: InstagramLogo },
  { label: 'LinkedIn (placeholder)', icon: LinkedinLogo },
  { label: 'X (placeholder)', icon: XLogo },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-deep-blue">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="onDark" className="h-24 w-24" />
            <p className="mt-5 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Um capítulo local do NASA Space Apps Challenge. Ciência, espaço,
              tecnologia e comunidade — em Calumbo, Angola.
            </p>
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-neon-yellow underline-offset-4 hover:underline"
            >
              Participar →
            </a>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3">
            <Coord>Navegação</Coord>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <Coord>Contacto e redes</Coord>
            <a
              href="mailto:contacto@example.ao"
              className="mt-4 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <EnvelopeSimple size={18} weight="duotone" />
              contacto@example.ao{' '}
              <span className="font-mono text-xs text-blue-yonder/70">(placeholder)</span>
            </a>
            <ul className="mt-6 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <span
                    role="img"
                    aria-label={s.label}
                    title={s.label}
                    className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground"
                  >
                    <s.icon size={20} weight="regular" aria-hidden="true" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            © {new Date().getFullYear()} NASA Space Apps Calumbo. Iniciativa comunitária
            local. Não afiliada oficialmente à NASA nesta demonstração.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            «NASA Space Apps Challenge» é uma marca dos respetivos detentores.
          </p>
        </div>
      </div>
    </footer>
  )
}
