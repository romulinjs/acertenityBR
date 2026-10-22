import { useState } from 'react'
import { motion } from 'framer-motion'
import { MousePointer2, Sparkles } from 'lucide-react'

interface FollowingPointerProps {
  compact?: boolean
  hue?: number
}

export function FollowingPointerDemo({ compact = false, hue = 265 }: FollowingPointerProps) {
  const [pos, setPos] = useState({ x: 120, y: 80 })
  const [isInside, setIsInside] = useState(false)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090d',
        padding: '20px',
        cursor: 'none',
        overflow: 'hidden',
      }}
      onPointerMove={handlePointerMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      {/* Card da área de teste */}
      <div
        style={{
          width: '100%',
          maxWidth: compact ? '240px' : '320px',
          padding: compact ? '14px' : '20px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #13121d, #0d0c14)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '9px',
            fontFamily: 'var(--mono)',
            color: `hsl(${hue}, 85%, 75%)`,
            marginBottom: '6px',
          }}
        >
          <Sparkles size={11} /> FOLLOWING POINTER
        </span>
        <h4 style={{ margin: '0 0 6px', fontSize: compact ? '14px' : '18px', color: '#fff', fontWeight: 600 }}>
          Custom Collaborative Cursor
        </h4>
        <p style={{ margin: 0, fontSize: compact ? '9px' : '11px', color: '#94a3b8' }}>
          Mova o mouse dentro deste card para ver o ponteiro customizado com identificador de usuário.
        </p>
      </div>

      {/* Ponteiro Customizado Seguindo o Cursor */}
      {isInside && (
        <motion.div
          animate={{ x: pos.x, y: pos.y }}
          transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 50,
          }}
        >
          {/* Ícone de seta estilizado */}
          <MousePointer2
            size={18}
            fill={`hsl(${hue}, 90%, 65%)`}
            color="#ffffff"
            style={{ transform: 'rotate(-10deg) translate(-2px, -2px)' }}
          />

          {/* Badge flutuante do usuário */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              left: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 8px',
              borderRadius: '999px',
              background: `hsl(${hue}, 80%, 55%)`,
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ade80',
                display: 'inline-block',
              }}
            />
            Manu (Designer)
          </div>
        </motion.div>
      )}
    </div>
  )
}
