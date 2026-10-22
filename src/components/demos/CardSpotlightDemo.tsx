import { useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { sound } from '../../utils/audio'

interface SpotlightProps {
  compact?: boolean
  hue?: number
}

export function CardSpotlightDemo({ compact = false, hue = 265 }: SpotlightProps) {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [opacity, setOpacity] = useState(0)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPos({ x, y })
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: compact ? '8px' : '20px',
        background: '#09090d',
      }}
    >
      <div
        onPointerMove={handlePointerMove}
        onMouseEnter={() => {
          setOpacity(1)
          sound.playWhoosh()
        }}
        onMouseLeave={() => setOpacity(0)}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: compact ? '260px' : '340px',
          borderRadius: '16px',
          background: '#0e0e13',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: compact ? '14px' : '24px',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Spotlight Radial suave com máscara */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
            background: `radial-gradient(
              320px circle at ${pos.x}px ${pos.y}px,
              hsla(${hue}, 85%, 65%, 0.25),
              transparent 80%
            )`,
          }}
        />

        {/* Grade de pontos interna revelada pela luz */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: opacity * 0.7,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
            maskImage: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, black, transparent)`,
          }}
        />

        {/* Conteúdo */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: `hsla(${hue}, 80%, 60%, 0.15)`,
              border: `1px solid hsla(${hue}, 80%, 65%, 0.3)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: `hsl(${hue}, 90%, 75%)`,
              marginBottom: '14px',
            }}
          >
            <Sparkles size={16} />
          </div>

          <h4
            style={{
              margin: '0 0 8px',
              fontSize: compact ? '14px' : '18px',
              fontWeight: 600,
              color: '#f8fafc',
            }}
          >
            Card Spotlight
          </h4>

          <p
            style={{
              margin: 0,
              fontSize: compact ? '10px' : '12px',
              color: '#94a3b8',
              lineHeight: 1.5,
            }}
          >
            {compact
              ? 'Iluminação focal que rastreia o cursor.'
              : 'O halo de luz segue a posição exata do ponteiro revelando detalhes sutis da superfície.'}
          </p>

          {!compact && (
            <div
              style={{
                marginTop: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                color: `hsl(${hue}, 85%, 75%)`,
                fontWeight: 600,
              }}
            >
              Ver documentação <ArrowRight size={13} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
