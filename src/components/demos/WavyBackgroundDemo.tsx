import { useEffect, useRef } from 'react'

interface WavyProps {
  compact?: boolean
  speed?: number
  hue?: number
}

export function WavyBackgroundDemo({ compact = false, speed = 1, hue = 260 }: WavyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let step = 0
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200)

    const onResize = () => {
      if (!canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', onResize)

    const waves = [
      { amp: 30, freq: 0.008, speed: 0.02 * speed, offset: 0, color: `hsla(${hue}, 80%, 65%, 0.4)` },
      { amp: 45, freq: 0.006, speed: 0.015 * speed, offset: 1.5, color: `hsla(${hue + 35}, 85%, 60%, 0.35)` },
      { amp: 20, freq: 0.012, speed: 0.025 * speed, offset: 3, color: `hsla(${hue - 40}, 90%, 70%, 0.3)` },
      { amp: 35, freq: 0.005, speed: 0.01 * speed, offset: 4.5, color: `hsla(${hue + 70}, 75%, 55%, 0.25)` },
    ]

    const render = () => {
      ctx.fillStyle = '#0a0a0f'
      ctx.fillRect(0, 0, width, height)

      ctx.filter = compact ? 'blur(20px)' : 'blur(40px)'

      waves.forEach((w) => {
        ctx.beginPath()
        ctx.moveTo(0, height)
        for (let x = 0; x <= width; x += 10) {
          const y = height * 0.5 + Math.sin(x * w.freq + step * w.speed + w.offset) * w.amp
          ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.closePath()
        ctx.fillStyle = w.color
        ctx.fill()
      })

      ctx.filter = 'none'
      step += 1
      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [compact, speed, hue])

  return (
    <div
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
            color: '#e0e7ff',
            letterSpacing: '0.12em',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}
        >
          {compact ? 'WAVY GRADIENT' : 'ONDAS FLUIDAS'}
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: compact ? '18px' : '28px',
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: '-0.04em',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {compact ? 'Wavy Background' : 'Ondas dinâmicas em alta definição'}
        </h3>
      </div>
    </div>
  )
}
