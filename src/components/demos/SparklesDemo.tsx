import { useEffect, useRef } from 'react'

interface SparklesProps {
  compact?: boolean
  particleCount?: number
  hue?: number
}

export function SparklesDemo({ compact = false, particleCount = compact ? 50 : 120, hue = 265 }: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200)

    const onResize = () => {
      if (!canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', onResize)

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      alpha: Math.random(),
      alphaChange: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      vy: Math.random() * 0.4 - 0.2,
      vx: Math.random() * 0.4 - 0.2,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.alpha += p.alphaChange
        if (p.alpha <= 0.1 || p.alpha >= 0.95) {
          p.alphaChange = -p.alphaChange
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, 90%, 80%, ${Math.max(0, p.alpha)})`
        ctx.shadowBlur = 6
        ctx.shadowColor = `hsl(${hue}, 90%, 75%)`
        ctx.fill()
      })

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [compact, particleCount, hue])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '280px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090b',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          pointerEvents: 'none',
          padding: '0 20px',
        }}
      >
        <span
          style={{
            fontSize: '9px',
            fontFamily: 'var(--mono)',
            color: `hsl(${hue}, 90%, 75%)`,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          {compact ? 'SPARKLES' : 'SPARKLES CORE PARTICLES'}
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: compact ? '20px' : '36px',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#ffffff',
          }}
        >
          Aceternity UI
        </h2>
        {/* Linha gradiente cintilante embaixo */}
        <div
          style={{
            width: compact ? '140px' : '260px',
            height: '2px',
            margin: '10px auto 0',
            background: `linear-gradient(to right, transparent, hsl(${hue}, 90%, 75%), transparent)`,
            boxShadow: `0 0 14px hsl(${hue}, 90%, 75%)`,
          }}
        />
      </div>
    </div>
  )
}
