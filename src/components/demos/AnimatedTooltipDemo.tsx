import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { sound } from '../../utils/audio'

interface TooltipProps {
  compact?: boolean
  hue?: number
}

interface User {
  id: number
  name: string
  designation: string
  avatar: string
}

export function AnimatedTooltipDemo({ compact = false, hue = 265 }: TooltipProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0)

  // Rotação suave baseada na posição do mouse dentro do item
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig)
  // Translação no eixo X
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig)

  const users: User[] = [
    { id: 1, name: 'Lucas Rossi', designation: 'Frontend Lead', avatar: 'LR' },
    { id: 2, name: 'Sofia Alencar', designation: 'Motion Designer', avatar: 'SA' },
    { id: 3, name: 'André Ramos', designation: 'Creative Dev', avatar: 'AR' },
    { id: 4, name: 'Elena Vance', designation: 'Product Architect', avatar: 'EV' },
  ]

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2
    x.set(event.nativeEvent.offsetX - halfWidth)
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '260px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090d',
        padding: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {users.slice(0, compact ? 3 : 4).map((user) => (
          <div
            key={user.id}
            style={{
              position: 'relative',
              marginLeft: '-10px',
              cursor: 'pointer',
            }}
            onMouseEnter={() => {
              setHoveredIndex(user.id)
              sound.playPop()
            }}
            onMouseLeave={() => setHoveredIndex(null)}
            onMouseMove={handleMouseMove}
          >
            {/* Tooltip Animado com Framer Motion */}
            {hoveredIndex === user.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  top: '-70px',
                  left: '50%',
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: 'nowrap',
                  position: 'absolute',
                  zIndex: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  background: '#0f0e17',
                  border: `1px solid hsla(${hue}, 80%, 65%, 0.4)`,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
                  padding: '6px 12px',
                  pointerEvents: 'none',
                }}
              >
                {/* Linha de brilho superior */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '20%',
                    right: '20%',
                    height: '1px',
                    background: `hsl(${hue}, 90%, 75%)`,
                  }}
                />
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#f8fafc' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontFamily: 'var(--mono)' }}>
                  {user.designation}
                </div>
              </motion.div>
            )}

            {/* Avatar circular */}
            <div
              style={{
                width: compact ? '40px' : '52px',
                height: compact ? '40px' : '52px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, hsla(${hue + user.id * 30}, 80%, 55%, 0.8), #1a162b)`,
                border: '2px solid #09090d',
                display: 'grid',
                placeItems: 'center',
                color: '#f8fafc',
                fontSize: compact ? '11px' : '14px',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                transition: 'transform 0.2s',
                transform: hoveredIndex === user.id ? 'scale(1.15) translateY(-4px)' : 'scale(1)',
              }}
            >
              {user.avatar}
            </div>
          </div>
        ))}
      </div>

      {!compact && (
        <span
          style={{
            marginTop: '24px',
            fontSize: '10px',
            color: '#64748b',
            fontFamily: 'var(--mono)',
          }}
        >
          Passe o mouse pelos avatares para testar a mola física
        </span>
      )}
    </div>
  )
}
