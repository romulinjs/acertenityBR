import { useState } from 'react'

interface WobbleProps {
  compact?: boolean
  hue?: number
}

export function WobbleCardDemo({ compact = false, hue = 265 }: WobbleProps) {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    setTransform({
      x: xPct * 20,
      y: yPct * 20,
      scale: 1.03,
    })
  }

  const handlePointerLeave = () => {
    setTransform({ x: 0, y: 0, scale: 1 })
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: compact ? '8px' : '20px',
        background: '#09090d',
      }}
    >
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          width: '100%',
          maxWidth: compact ? '240px' : '320px',
          padding: compact ? '14px' : '20px',
          borderRadius: '16px',
          background: `linear-gradient(135deg, hsla(${hue}, 70%, 25%, 0.4), #0d0c13 80%)`,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
          cursor: 'pointer',
          boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
        }}
      >
        <span
          style={{
            fontSize: '8px',
            fontFamily: 'var(--mono)',
            color: `hsl(${hue}, 85%, 75%)`,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          WOBBLE PHYSICS
        </span>
        <h4 style={{ margin: '8px 0 6px', fontSize: compact ? '14px' : '18px', color: '#f8fafc', fontWeight: 600 }}>
          Interactive Inércia
        </h4>
        <p style={{ margin: 0, fontSize: compact ? '9px' : '11px', color: '#94a3b8', lineHeight: 1.5 }}>
          {compact ? 'Mova o cursor para sentir a elasticidade.' : 'O container acompanha o cursor com amortecimento físico e retorno elástico à posição original.'}
        </p>
      </div>
    </div>
  )
}
