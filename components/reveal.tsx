'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Delay in ms before the reveal transition begins. */
  delay?: number
}

/**
 * Reveal-on-scroll wrapper. Content is visible by default and only hidden
 * when JS + IntersectionObserver are available, so the site works without JS
 * and honours prefers-reduced-motion via CSS.
 */
export function Reveal({ children, as, className, delay = 0 }: RevealProps) {
  const Comp = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [primed, setPrimed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only prime the hidden state on the client where we can observe it.
    setPrimed(true)
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Comp
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(primed && 'reveal-init', visible && 'reveal-visible', className)}
    >
      {children}
    </Comp>
  )
}
