/**
 * Configuração central do site NASA Space Apps Calumbo.
 *
 * IMPORTANTE: A inscrição acontece num site externo.
 * Quando o URL real de inscrição for disponibilizado, basta alterar
 * REGISTRATION_URL aqui — todos os botões de inscrição serão atualizados.
 */
export const REGISTRATION_URL = 'https://aosav.ao/'

export const NAV_LINKS = [
  { label: 'O Space Apps', href: '#space-apps' },
  { label: 'Calumbo', href: '#calumbo' },
  { label: 'Participar', href: '#porque-participar' },
  { label: 'A Missão', href: '#experiencia' },
  { label: 'Desafios', href: '#desafios' },
  { label: 'Eu Vou', href: '#eu-vou' },
] as const

/** Ligações externas — utilizar sempre com abertura segura (noopener). */
export const EXTERNAL = {
  registration: REGISTRATION_URL,
} as const
