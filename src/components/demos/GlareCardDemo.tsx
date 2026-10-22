import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { sound } from '../../utils/audio'

interface GlareProps {
  compact?: boolean
  hue?: number
}

export function GlareCardDemo({ compact = false }: GlareProps) {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
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
        background: '#08080c',
      }}
    >
      <div
        onPointerMove={handlePointerMove}
        onMouseEnter={() => {
          setIsHovered(true)
          sound.playWhoosh()
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          setPos({ x: 50, y: 50 })
        }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: compact ? '240px' : '300px',
          height: compact ? '140px' : '220px',
          borderRadius: '18px',
          background: 'linear-gradient(145deg, #121019, #09090d)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: compact ? '12px' : '18px',
          cursor: 'pointer',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(168, 85, 247, 0.25)'
            : '0 8px 24px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Lâmina iridescente arco-íris */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isHovered ? 0.75 : 0.15,
            transition: 'opacity 0.3s ease',
            background: `radial-gradient(
              circle at ${pos.x}% ${pos.y}%,
              rgba(255,255,255,0.4) 0%,
              rgba(255, 110, 196, 0.25) 20%,
              rgba(120, 119, 198, 0.3) 40%,
              rgba(0, 220, 255, 0.2) 60%,
              transparent 80%
            )`,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />

        {/* Reflexo diagonal */}
        <div
          style={{
            position: 'absolute',
            inset: '-50%',
            transform: `translate(${(pos.x - 50) * 0.4}%, ${(pos.y - 50) * 0.4}%) rotate(35deg)`,
            background: 'linear-gradient(90deg, transparent 40%, rgba(255, 255, 255, 0.15) 50%, transparent 60%)',
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0.3,
            transition: 'opacity 0.2s',
          }}
        />

        {/* Conteúdo */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              fontFamily: 'var(--mono)',
              color: '#d8b4fe',
            }}
          >
            <Sparkles size={12} /> GLARE CARD
          </span>
          <span style={{ fontSize: '9px', fontFamily: 'var(--mono)', color: '#64748b' }}>HOLOGRAPHIC</span>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h4 style={{ margin: '0 0 6px', fontSize: compact ? '14px' : '18px', fontWeight: 600, color: '#f8fafc' }}>
            Iridescent Foil Reflection
          </h4>
          <p style={{ margin: 0, fontSize: compact ? '9px' : '11px', color: '#94a3b8' }}>
            {compact ? 'Reflexo que acompanha o ponteiro.' : 'Lâmina holográfica dinâmica que reage ao ângulo de visualização.'}
          </p>
        </div>
      </div>
    </div>
  )
}
