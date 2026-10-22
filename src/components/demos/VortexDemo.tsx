import { useEffect, useRef } from 'react'

interface VortexProps {
  compact?: boolean
  particleCount?: number
  speed?: number
  hue?: number
}

export function VortexDemo({ compact = false, particleCount = compact ? 40 : 90, speed = 1, hue = 265 }: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })

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

    // Partículas
    const centerX = () => width / 2
    const centerY = () => height / 2

    const particles = Array.from({ length: particleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * Math.min(width, height) * 0.45 + 10,
      speed: (0.005 + Math.random() * 0.015) * speed,
      size: Math.random() * 2 + 1,
      colorOffset: Math.random() * 50 - 25,
      alpha: Math.random() * 0.7 + 0.3,
    }))

    const render = () => {
      // Efeito de cauda (motion blur suave)
      ctx.fillStyle = 'rgba(10, 10, 16, 0.2)'
      ctx.fillRect(0, 0, width, height)

      const cx = mouseRef.current.active ? mouseRef.current.x : centerX()
      const cy = mouseRef.current.active ? mouseRef.current.y : centerY()

      particles.forEach((p) => {
        p.angle += p.speed
        p.radius -= 0.15 * speed
        if (p.radius < 5) {
          p.radius = Math.min(width, height) * 0.45 + Math.random() * 20
        }

        const x = cx + Math.cos(p.angle) * p.radius
        const y = cy + Math.sin(p.angle) * p.radius

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue + p.colorOffset}, 85%, 65%, ${p.alpha})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `hsl(${hue}, 90%, 60%)`
        ctx.fill()
      })

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [compact, particleCount, speed, hue])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    }
  }

  const onMouseLeave = () => {
    mouseRef.current.active = false
  }

  return (
    <div
      className="vortex-container"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '260px',
        overflow: 'hidden',
        background: '#09090e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            display: 'inline-block',
            fontSize: '9px',
            fontFamily: 'var(--mono)',
            color: '#c4b5fd',
            letterSpacing: '0.12em',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}
        >
          {compact ? 'VORTEX CANVAS' : 'CAMPO GRAVITACIONAL'}
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: compact ? '18px' : '28px',
            fontWeight: 600,
            color: '#f8fafc',
            letterSpacing: '-0.04em',
            textShadow: '0 0 20px rgba(167, 139, 250, 0.5)',
          }}
        >
          {compact ? 'Vortex Particle System' : 'Energia em espiral contínua'}
        </h3>
        {!compact && (
          <p
            style={{
              margin: '8px 0 0',
              fontSize: '11px',
              color: '#94a3b8',
              fontFamily: 'var(--mono)',
            }}
          >
            Mova o mouse para atrair as partículas para a posição do cursor
          </p>
        )}
      </div>
    </div>
  )
}
