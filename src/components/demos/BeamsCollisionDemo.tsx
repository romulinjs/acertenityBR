import { useEffect, useRef, useState } from 'react'

interface CollisionProps {
  compact?: boolean
  speed?: number
  hue?: number
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  size: number
  color: string
}

export function BeamsCollisionDemo({ compact = false, speed = 1, hue = 270 }: CollisionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hitCount, setHitCount] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let width = (canvas.width = canvas.parentElement?.clientWidth || 320)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 220)

    const onResize = () => {
      if (!canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', onResize)

    const beamXList = [0.2, 0.35, 0.5, 0.65, 0.8]
    const beams = beamXList.map((ratio) => ({
      xRatio: ratio,
      y: -Math.random() * 200,
      length: 60 + Math.random() * 40,
      velocity: (3 + Math.random() * 3) * speed,
      color: `hsl(${hue + Math.random() * 40 - 20}, 90%, 65%)`,
    }))

    const sparks: Spark[] = []
    const collisionY = height * 0.72

    const render = () => {
      ctx.fillStyle = 'rgba(8, 8, 12, 0.25)'
      ctx.fillRect(0, 0, width, height)

      // Linha de impacto
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(width * 0.1, collisionY)
      ctx.lineTo(width * 0.9, collisionY)
      ctx.stroke()

      // Brilho na linha
      ctx.fillStyle = 'rgba(167, 139, 250, 0.15)'
      ctx.fillRect(width * 0.2, collisionY - 1, width * 0.6, 2)

      // Renderizar e atualizar feixes
      beams.forEach((beam) => {
        beam.y += beam.velocity
        const x = width * beam.xRatio

        // Desenhar feixe
        const grad = ctx.createLinearGradient(x, beam.y - beam.length, x, beam.y)
        grad.addColorStop(0, 'rgba(0,0,0,0)')
        grad.addColorStop(1, beam.color)

        ctx.strokeStyle = grad
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.moveTo(x, Math.max(0, beam.y - beam.length))
        ctx.lineTo(x, beam.y)
        ctx.stroke()

        // Checar colisão
        if (beam.y >= collisionY) {
          beam.y = -Math.random() * 100
          setHitCount((prev) => prev + 1)

          // Gerar fagulhas
          const count = compact ? 8 : 16
          for (let i = 0; i < count; i++) {
            const angle = Math.PI + (Math.random() - 0.5) * Math.PI
            const s = (2 + Math.random() * 4) * speed
            sparks.push({
              x,
              y: collisionY,
              vx: Math.cos(angle) * s,
              vy: Math.sin(angle) * s,
              alpha: 1,
              size: Math.random() * 2.5 + 1,
              color: beam.color,
            })
          }
        }
      })

      // Atualizar fagulhas
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.1 // gravidade
        s.alpha -= 0.028

        if (s.alpha <= 0) {
          sparks.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.globalAlpha = s.alpha
        ctx.shadowBlur = 6
        ctx.shadowColor = s.color
        ctx.fill()
        ctx.globalAlpha = 1
      }

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
        minHeight: compact ? '160px' : '270px',
        overflow: 'hidden',
        background: '#08080d',
        display: 'flex',
        flexDirection: 'column',
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
          padding: '0 16px',
        }}
      >
        <span
          style={{
            fontSize: '9px',
            fontFamily: 'var(--mono)',
            color: '#a78bfa',
            letterSpacing: '0.12em',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          {compact ? 'COLLISION FX' : 'FEIXES COM COLISÃO'}
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: compact ? '17px' : '26px',
            fontWeight: 600,
            color: '#f1f5f9',
            letterSpacing: '-0.04em',
          }}
        >
          {compact ? 'Beams with Collision' : 'Impacto luminoso e centelhas'}
        </h3>
        {!compact && (
          <div
            style={{
              marginTop: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '11px',
              fontFamily: 'var(--mono)',
              color: '#cbd5e1',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#a78bfa',
                boxShadow: '0 0 8px #a78bfa',
              }}
            />
            {hitCount} colisões detectadas em tempo real
          </div>
        )}
      </div>
    </div>
  )
}
