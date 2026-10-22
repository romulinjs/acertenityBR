import { useRef, useState } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { sound } from '../../utils/audio'

interface Card3DProps {
  compact?: boolean
  hue?: number
}

export function ThreeDCardDemo({ compact = false, hue = 265 }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calcula rotação (-15 a 15 graus)
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    const rotX = -yPct * 24
    const rotY = xPct * 24

    setRotation({ x: rotX, y: rotY })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    sound.playWhoosh()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      style={{
        perspective: '1000px',
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: compact ? '8px' : '20px',
        background: '#09090d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          width: '100%',
          maxWidth: compact ? '260px' : '340px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(25, 22, 38, 0.95), rgba(13, 13, 18, 0.98))',
          border: isHovered ? `1px solid hsla(${hue}, 80%, 65%, 0.45)` : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px hsla(${hue}, 80%, 55%, 0.2)`
            : '0 10px 30px rgba(0, 0, 0, 0.5)',
          padding: compact ? '14px' : '22px',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.08s ease-out, border-color 0.3s, box-shadow 0.3s' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
          position: 'relative',
        }}
      >
        {/* Glow dinâmico de fundo */}
        <div
          style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '16px',
            background: `radial-gradient(circle at 50% 0%, hsla(${hue}, 80%, 60%, 0.15), transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Top Header com TranslateZ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: 'translateZ(25px)',
            marginBottom: compact ? '8px' : '14px',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              fontFamily: 'var(--mono)',
              color: `hsl(${hue}, 85%, 75%)`,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <Sparkles size={12} /> 3D CARD
          </span>
          <span
            style={{
              fontSize: '9px',
              fontFamily: 'var(--mono)',
              color: '#64748b',
            }}
          >
            TILT FX
          </span>
        </div>

        {/* Título com TranslateZ maior */}
        <h4
          style={{
            margin: '0 0 8px',
            fontSize: compact ? '15px' : '20px',
            fontWeight: 600,
            color: '#f8fafc',
            transform: 'translateZ(45px)',
            transition: 'transform 0.1s ease-out',
            letterSpacing: '-0.03em',
          }}
        >
          Perspective & Depth
        </h4>

        <p
          style={{
            margin: 0,
            fontSize: compact ? '10px' : '12px',
            color: '#94a3b8',
            lineHeight: 1.55,
            transform: 'translateZ(30px)',
          }}
        >
          {compact
            ? 'Passe o mouse para inclinar o card em 3D.'
            : 'Camadas com diferentes elevações no eixo Z flutuam para fora do card conforme o ponteiro se move.'}
        </p>

        {/* Imagem / preview interna elevada */}
        <div
          style={{
            marginTop: compact ? '10px' : '16px',
            height: compact ? '60px' : '90px',
            borderRadius: '10px',
            background: `linear-gradient(120deg, hsla(${hue}, 70%, 40%, 0.3), hsla(${hue + 40}, 80%, 50%, 0.15))`,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateZ(55px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--mono)',
              color: '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            translateZ(55px)
          </span>
        </div>

        {/* Botão de ação projetado no espaço 3D */}
        {!compact && (
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transform: 'translateZ(40px)',
            }}
          >
            <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--mono)' }}>
              x: {rotation.x.toFixed(1)}° y: {rotation.y.toFixed(1)}°
            </span>
            <button
              onClick={() => sound.playClick()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                background: `hsl(${hue}, 80%, 65%)`,
                color: '#0f0a1c',
                border: 'none',
                fontWeight: 600,
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              Interagir <ArrowUpRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
