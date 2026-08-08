'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  UploadSimple,
  DownloadSimple,
  ShareNetwork,
  ArrowsOutCardinal,
  Trash,
} from '@phosphor-icons/react'
import {
  CARD_H,
  CARD_VARIANTS,
  CARD_W,
  drawCard,
  type CardVariant,
} from '@/components/social-card/draw-card'
import { cn } from '@/lib/utils'

export default function CardGenerator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  const [name, setName] = useState('')
  const [variant, setVariant] = useState<CardVariant>(CARD_VARIANTS[0])
  const [hasImage, setHasImage] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [fontsReady, setFontsReady] = useState(false)
  const [canShare, setCanShare] = useState(false)

  const families = useMemo(
    () => ({
      display: 'var(--font-fira-sans), sans-serif',
      mono: 'var(--font-fira-code), monospace',
    }),
    [],
  )

  // Resolve the real computed font-family strings for canvas use.
  const resolvedFamilies = useRef({ display: 'sans-serif', mono: 'monospace' })

  useEffect(() => {
    const probe = document.createElement('span')
    probe.style.fontFamily = families.display
    document.body.appendChild(probe)
    resolvedFamilies.current.display = getComputedStyle(probe).fontFamily || 'sans-serif'
    probe.style.fontFamily = families.mono
    resolvedFamilies.current.mono = getComputedStyle(probe).fontFamily || 'monospace'
    probe.remove()

    let active = true
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (active) setFontsReady(true)
      })
    } else {
      setFontsReady(true)
    }
    return () => {
      active = false
    }
  }, [families])

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && !!navigator.canShare)
  }, [])

  const redraw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawCard(ctx, {
      name,
      variant,
      image: hasImage ? imgRef.current : null,
      zoom,
      offsetX: offset.x,
      offsetY: offset.y,
      displayFamily: resolvedFamilies.current.display,
      monoFamily: resolvedFamilies.current.mono,
    })
  }, [name, variant, hasImage, zoom, offset])

  useEffect(() => {
    redraw()
  }, [redraw, fontsReady])

  // Cleanup object URL on unmount.
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  const handleFile = useCallback(
    (file: File | undefined | null) => {
      if (!file || !file.type.startsWith('image/')) return
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
      const url = URL.createObjectURL(file)
      objectUrlRef.current = url
      const img = new Image()
      img.onload = () => {
        imgRef.current = img
        setHasImage(true)
        setZoom(1)
        setOffset({ x: 0, y: 0 })
        redraw()
      }
      img.src = url
    },
    [redraw],
  )

  const removeImage = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
    imgRef.current = null
    setHasImage(false)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  // Drag to reposition the photo within the circle.
  const dragState = useRef<{ dragging: boolean; startX: number; startY: number; baseX: number; baseY: number }>({
    dragging: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  })

  const scaleFactor = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return 1
    return CARD_W / canvas.getBoundingClientRect().width
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!hasImage) return
    ;(e.target as HTMLCanvasElement).setPointerCapture(e.pointerId)
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      baseX: offset.x,
      baseY: offset.y,
    }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragState.current.dragging) return
    const f = scaleFactor()
    setOffset({
      x: dragState.current.baseX + (e.clientX - dragState.current.startX) * f,
      y: dragState.current.baseY + (e.clientY - dragState.current.startY) * f,
    })
  }
  const onPointerUp = () => {
    dragState.current.dragging = false
  }

  const exportBlob = useCallback(
    () =>
      new Promise<Blob | null>((resolve) => {
        const canvas = canvasRef.current
        if (!canvas) return resolve(null)
        canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95)
      }),
    [],
  )

  const fileName = useMemo(() => {
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return `eu-vou-space-apps-calumbo${slug ? `-${slug}` : ''}.png`
  }, [name])

  const handleDownload = useCallback(async () => {
    const blob = await exportBlob()
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }, [exportBlob, fileName])

  const handleShare = useCallback(async () => {
    const blob = await exportBlob()
    if (!blob) return
    const file = new File([blob], fileName, { type: 'image/png' })
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Eu vou ao NASA Space Apps Calumbo',
          text: 'Eu vou estar presente no NASA Space Apps Calumbo!',
        })
        return
      }
    } catch {
      /* user cancelled or share failed — fall back to download */
    }
    void handleDownload()
  }, [exportBlob, fileName, handleDownload])

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      {/* Preview */}
      <div className="order-1 lg:sticky lg:top-24">
        <div className="relative mx-auto w-full max-w-[420px]">
          <canvas
            ref={canvasRef}
            width={CARD_W}
            height={CARD_H}
            role="img"
            aria-label={`Pré-visualização do cartão "Eu Vou" para ${name.trim() || 'o teu nome'}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={cn(
              'aspect-[1080/1350] w-full rounded-2xl border border-border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]',
              hasImage ? 'cursor-grab touch-none active:cursor-grabbing' : '',
            )}
          />
          {hasImage && (
            <p className="mt-3 flex items-center justify-center gap-1.5 font-mono text-xs text-muted-foreground">
              <ArrowsOutCardinal size={14} aria-hidden="true" />
              Arrasta na foto para reposicionar
            </p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="order-2 flex flex-col gap-8">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="card-name" className="font-display text-sm font-bold uppercase tracking-wide text-blue-yonder">
            01 — O teu nome
          </label>
          <input
            id="card-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={32}
            placeholder="Escreve o teu nome"
            className="h-14 rounded-xl border border-input bg-card px-4 font-display text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-blue-yonder focus-visible:ring-4 focus-visible:ring-blue-yonder/30"
          />
        </div>

        {/* Photo */}
        <div className="flex flex-col gap-3">
          <span className="font-display text-sm font-bold uppercase tracking-wide text-blue-yonder">
            02 — A tua foto (opcional)
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-yonder/45 bg-transparent px-5 py-3 font-display text-sm font-bold text-foreground outline-none transition-colors hover:bg-blue-yonder/10 focus-visible:ring-4 focus-visible:ring-blue-yonder/30"
            >
              <UploadSimple size={20} weight="bold" />
              {hasImage ? 'Trocar foto' : 'Carregar foto'}
            </button>
            {hasImage && (
              <button
                type="button"
                onClick={removeImage}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-transparent px-5 py-3 font-display text-sm font-bold text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-4 focus-visible:ring-blue-yonder/30"
              >
                <Trash size={20} weight="bold" />
                Remover
              </button>
            )}
          </div>

          {hasImage && (
            <div className="mt-1 flex flex-col gap-2">
              <label htmlFor="card-zoom" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Ampliar foto
              </label>
              <input
                id="card-zoom"
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-neon-yellow"
              />
            </div>
          )}
          <p className="text-xs leading-relaxed text-muted-foreground">
            A tua foto e o teu nome ficam apenas no teu dispositivo. Nada é enviado ou guardado.
          </p>
        </div>

        {/* Variant */}
        <div className="flex flex-col gap-3">
          <span className="font-display text-sm font-bold uppercase tracking-wide text-blue-yonder">
            03 — Estilo do cartão
          </span>
          <div className="flex flex-wrap gap-2.5">
            {CARD_VARIANTS.map((v) => {
              const active = v.id === variant.id
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariant(v)}
                  aria-pressed={active}
                  className={cn(
                    'inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 font-display text-sm font-bold transition-colors outline-none focus-visible:ring-4 focus-visible:ring-blue-yonder/30',
                    active
                      ? 'border-neon-yellow bg-neon-yellow/10 text-foreground'
                      : 'border-border text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="size-4 rounded-full border border-white/20"
                    style={{ backgroundColor: v.accent }}
                  />
                  {v.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-neon-yellow px-6 py-4 font-display font-bold uppercase tracking-wide text-deep-blue shadow-[0_10px_30px_-8px_rgba(234,254,7,0.45)] outline-none transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:ring-4 focus-visible:ring-blue-yonder/50"
          >
            <DownloadSimple size={20} weight="bold" />
            Descarregar cartão
          </button>
          {canShare && (
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-yonder/45 px-6 py-4 font-display font-bold uppercase tracking-wide text-foreground outline-none transition-colors hover:bg-blue-yonder/10 focus-visible:ring-4 focus-visible:ring-blue-yonder/50"
            >
              <ShareNetwork size={20} weight="bold" />
              Partilhar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
