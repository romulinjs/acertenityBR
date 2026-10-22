import { useState } from 'react'
import { sound } from '../../utils/audio'

interface FocusProps {
  compact?: boolean
  hue?: number
}

export function FocusCardsDemo({ compact = false, hue = 265 }: FocusProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const cards = [
    {
      title: 'Aurora Engine',
      category: 'WebGL & Shader',
      src: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
    },
    {
      title: 'Neural Synthesizer',
      category: 'Audio Architecture',
      src: `linear-gradient(135deg, hsl(${hue}, 80%, 45%), #ec4899)`,
    },
    {
      title: 'Kinetic Typography',
      category: 'Motion Systems',
      src: 'linear-gradient(135deg, #10b981, #3b82f6)',
    },
  ]

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: compact ? '6px' : '14px',
        padding: compact ? '8px' : '20px',
        background: '#08080c',
      }}
    >
      {cards.map((card, index) => {
        const isHovered = hovered === index
        const isDimmed = hovered !== null && !isHovered

        return (
          <div
            key={card.title}
            onMouseEnter={() => {
              setHovered(index)
              sound.playClick(900, 0.02)
            }}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: 1,
              maxWidth: compact ? '90px' : '160px',
              height: compact ? '130px' : '200px',
              borderRadius: '14px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              border: isHovered
                ? `1px solid hsla(${hue}, 90%, 75%, 0.6)`
                : '1px solid rgba(255, 255, 255, 0.08)',
              transform: isHovered ? 'scale(1.04) translateY(-3px)' : isDimmed ? 'scale(0.97)' : 'scale(1)',
              filter: isDimmed ? 'blur(4px) brightness(0.5)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              background: '#121217',
              boxShadow: isHovered ? '0 16px 32px rgba(0,0,0,0.6)' : 'none',
            }}
          >
            {/* Background com gradiente colorido */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: card.src,
                opacity: 0.35,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Overlay escuro de leitura */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(9, 9, 13, 0.95) 20%, transparent 80%)',
              }}
            />

            {/* Conteúdo na base */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: compact ? '8px' : '14px',
                zIndex: 2,
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: compact ? '7px' : '9px',
                  fontFamily: 'var(--mono)',
                  color: '#94a3b8',
                  marginBottom: '2px',
                }}
              >
                {card.category}
              </span>
              <strong
                style={{
                  display: 'block',
                  fontSize: compact ? '9px' : '13px',
                  fontWeight: 600,
                  color: '#f8fafc',
                  lineHeight: 1.2,
                }}
              >
                {card.title}
              </strong>
            </div>
          </div>
        )
      })}
    </div>
  )
}
