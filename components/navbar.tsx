'use client'

import { useEffect, useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import { NAV_LINKS, REGISTRATION_URL } from '@/lib/site'
import { Wordmark } from '@/components/wordmark'
import { CtaExternal } from '@/components/cta'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-deep-blue/85 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-yonder">
          <Wordmark size="sm" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <CtaExternal href={REGISTRATION_URL} size="md" withArrow={false}>
            Participar
          </CtaExternal>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="grid size-10 place-items-center rounded-md text-foreground outline-none focus-visible:ring-2 focus-visible:ring-blue-yonder lg:hidden"
        >
          {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'origin-top overflow-hidden border-t border-border bg-deep-blue/95 backdrop-blur-md transition-all duration-300 lg:hidden',
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-display text-lg font-medium text-foreground transition-colors hover:bg-muted"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 px-1">
            <CtaExternal href={REGISTRATION_URL} size="lg" className="w-full" withArrow={false}>
              Participar
            </CtaExternal>
          </li>
        </ul>
      </div>
    </header>
  )
}
