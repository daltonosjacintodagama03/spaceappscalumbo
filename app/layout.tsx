import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fira_Sans, Overpass, Fira_Code } from 'next/font/google'
import './globals.css'

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-fira-sans',
  display: 'swap',
})

const overpass = Overpass({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-overpass',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NASA Space Apps Calumbo — Ciência, Espaço e Inovação',
  description:
    'NASA Space Apps Calumbo reúne estudantes, programadores, designers, cientistas e criadores para construir soluções com os dados abertos da NASA. Junta-te à missão.',
  generator: 'v0.app',
  keywords: [
    'NASA Space Apps',
    'Calumbo',
    'Angola',
    'hackathon',
    'ciência',
    'espaço',
    'inovação',
    'dados abertos NASA',
  ],
  openGraph: {
    title: 'NASA Space Apps Calumbo',
    description:
      'Inovadores reúnem-se para construir soluções com os dados abertos da NASA. A tua próxima missão começa aqui.',
    locale: 'pt_AO',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#07173F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt"
      className={`${firaSans.variable} ${overpass.variable} ${firaCode.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
