/**
 * Client-side canvas renderer for the "EU VOU" social card.
 * Everything runs in the browser — no data leaves the device.
 */

export const CARD_W = 1080
export const CARD_H = 1350

export interface CardVariant {
  id: string
  label: string
  bgFrom: string
  bgTo: string
  accent: string
  /** Text color placed on the accent (for contrast). */
  onAccent: string
}

export const CARD_VARIANTS: CardVariant[] = [
  { id: 'orbita', label: 'Órbita', bgFrom: '#0042A6', bgTo: '#07173F', accent: '#EAFE07', onAccent: '#07173F' },
  { id: 'missao', label: 'Missão', bgFrom: '#07173F', bgTo: '#0A1E52', accent: '#E43700', onAccent: '#FFFFFF' },
  { id: 'nebula', label: 'Nébula', bgFrom: '#0960E1', bgTo: '#07173F', accent: '#2E96F5', onAccent: '#07173F' },
]

export interface DrawOptions {
  name: string
  variant: CardVariant
  image: HTMLImageElement | null
  /** Photo zoom multiplier (1 = cover). */
  zoom: number
  /** Photo offset in card pixels. */
  offsetX: number
  offsetY: number
  displayFamily: string
  monoFamily: string
}

const PHOTO_CX = CARD_W / 2
const PHOTO_CY = 452
const PHOTO_R = 208

function withAlpha(hex: string, alpha: number) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function setLetterSpacing(ctx: CanvasRenderingContext2D, value: string) {
  // letterSpacing is widely supported but guard for older engines.
  try {
    // @ts-expect-error - not in all TS lib versions
    ctx.letterSpacing = value
  } catch {
    /* no-op */
  }
}

function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  family: string,
  weight: string,
  start: number,
  maxWidth: number,
  min = 24,
) {
  let size = start
  ctx.font = `${weight} ${size}px ${family}`
  while (ctx.measureText(text).width > maxWidth && size > min) {
    size -= 2
    ctx.font = `${weight} ${size}px ${family}`
  }
  return size
}

export function drawCard(ctx: CanvasRenderingContext2D, opts: DrawOptions) {
  const { name, variant, image, zoom, offsetX, offsetY, displayFamily, monoFamily } = opts

  ctx.clearRect(0, 0, CARD_W, CARD_H)

  // 1) Background gradient (Electric Blue → Deep Blue, ~45deg).
  const grad = ctx.createLinearGradient(0, 0, CARD_W, CARD_H)
  grad.addColorStop(0, variant.bgFrom)
  grad.addColorStop(1, variant.bgTo)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, CARD_W, CARD_H)

  // 2) Coordinate grid (subtle).
  ctx.strokeStyle = withAlpha('#2E96F5', 0.1)
  ctx.lineWidth = 1
  const step = 72
  for (let x = step; x < CARD_W; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, CARD_H)
    ctx.stroke()
  }
  for (let y = step; y < CARD_H; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(CARD_W, y)
    ctx.stroke()
  }

  // 3) Orbital rings behind the photo.
  ctx.save()
  ctx.strokeStyle = withAlpha('#2E96F5', 0.35)
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(PHOTO_CX, PHOTO_CY, PHOTO_R + 46, 0, Math.PI * 2)
  ctx.stroke()

  ctx.setLineDash([4, 14])
  ctx.strokeStyle = withAlpha('#2E96F5', 0.4)
  ctx.beginPath()
  ctx.arc(PHOTO_CX, PHOTO_CY, PHOTO_R + 78, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])

  // Accent body on the outer ring.
  ctx.fillStyle = variant.accent
  ctx.beginPath()
  ctx.arc(PHOTO_CX + PHOTO_R + 46, PHOTO_CY, 10, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // 4) Photo (clipped to circle) or placeholder.
  ctx.save()
  ctx.beginPath()
  ctx.arc(PHOTO_CX, PHOTO_CY, PHOTO_R, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()

  if (image && image.complete && image.naturalWidth > 0) {
    const cover = Math.max((PHOTO_R * 2) / image.naturalWidth, (PHOTO_R * 2) / image.naturalHeight)
    const scale = cover * zoom
    const dw = image.naturalWidth * scale
    const dh = image.naturalHeight * scale
    const dx = PHOTO_CX - dw / 2 + offsetX
    const dy = PHOTO_CY - dh / 2 + offsetY
    ctx.drawImage(image, dx, dy, dw, dh)
  } else {
    const ph = ctx.createLinearGradient(PHOTO_CX - PHOTO_R, PHOTO_CY - PHOTO_R, PHOTO_CX + PHOTO_R, PHOTO_CY + PHOTO_R)
    ph.addColorStop(0, '#0A1E52')
    ph.addColorStop(1, '#07173F')
    ctx.fillStyle = ph
    ctx.fillRect(PHOTO_CX - PHOTO_R, PHOTO_CY - PHOTO_R, PHOTO_R * 2, PHOTO_R * 2)

    ctx.fillStyle = withAlpha('#9DB8E6', 0.9)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    setLetterSpacing(ctx, '4px')
    ctx.font = `700 30px ${displayFamily}`
    ctx.fillText('A TUA FOTO', PHOTO_CX, PHOTO_CY)
    setLetterSpacing(ctx, '0px')
  }
  ctx.restore()

  // Photo rim.
  ctx.strokeStyle = variant.accent
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.arc(PHOTO_CX, PHOTO_CY, PHOTO_R, 0, Math.PI * 2)
  ctx.stroke()

  // 5) Top eyebrow — chapter wordmark (text only).
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  setLetterSpacing(ctx, '10px')
  ctx.font = `700 26px ${displayFamily}`
  ctx.fillStyle = '#2E96F5'
  ctx.fillText('NASA SPACE APPS', PHOTO_CX + 5, 112)
  setLetterSpacing(ctx, '0px')

  // 6) Main statement "EU VOU".
  setLetterSpacing(ctx, '2px')
  ctx.font = `900 168px ${displayFamily}`
  ctx.fillStyle = variant.accent
  ctx.fillText('EU VOU', PHOTO_CX, 850)

  // 7) Subheading.
  setLetterSpacing(ctx, '14px')
  ctx.font = `700 40px ${displayFamily}`
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText('ESTAR PRESENTE', PHOTO_CX + 7, 912)
  setLetterSpacing(ctx, '0px')

  // 8) Participant name.
  const displayName = (name.trim() || 'O TEU NOME').toUpperCase()
  const nameSize = fitFontSize(ctx, displayName, displayFamily, '800', 76, CARD_W - 180)
  ctx.font = `800 ${nameSize}px ${displayFamily}`
  ctx.fillStyle = name.trim() ? '#FFFFFF' : withAlpha('#9DB8E6', 0.65)
  ctx.fillText(displayName, PHOTO_CX, 1058)

  // Accent underline beneath the name.
  const nameWidth = Math.min(ctx.measureText(displayName).width, CARD_W - 180)
  ctx.fillStyle = variant.accent
  ctx.fillRect(PHOTO_CX - nameWidth / 2, 1082, nameWidth, 5)

  // 9) Chapter identity + footer.
  setLetterSpacing(ctx, '8px')
  ctx.font = `900 38px ${displayFamily}`
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText('CALUMBO', PHOTO_CX, 1168)
  setLetterSpacing(ctx, '0px')

  // Footer separator line.
  ctx.strokeStyle = withAlpha('#2E96F5', 0.3)
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(90, 1240)
  ctx.lineTo(CARD_W - 90, 1240)
  ctx.stroke()

  // Footer meta (mono).
  ctx.font = `500 24px ${monoFamily}`
  ctx.fillStyle = withAlpha('#9DB8E6', 0.9)
  setLetterSpacing(ctx, '3px')
  ctx.textAlign = 'left'
  ctx.fillText('NASA SPACE APPS CALUMBO', 90, 1290)
  ctx.textAlign = 'right'
  ctx.fillText('CALUMBO · ANGOLA', CARD_W - 90, 1290)
  setLetterSpacing(ctx, '0px')

  // Accent dot detail.
  ctx.fillStyle = variant.accent
  ctx.beginPath()
  ctx.arc(PHOTO_CX, 1240, 5, 0, Math.PI * 2)
  ctx.fill()
}
