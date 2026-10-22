import { useState } from 'react'
import { motion } from 'framer-motion'

interface HeroHighlightProps {
  compact?: boolean
  hue?: number
}

export function HeroHighlightDemo({ compact = false, hue = 265 }: HeroHighlightProps) {
  const [pos, setPos] = useState({ x: 50, y: 50 })

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPos({ x, y })
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
        background: '#09090e',
        overflow: 'hidden',
        padding: '20px',
        textAlign: 'center',
      }}
      onPointerMove={handlePointerMove}
    >
      {/* Luz radial suave seguindo o cursor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, hsla(${hue}, 80%, 55%, 0.18), transparent 45%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: compact ? '260px' : '440px' }}>
        <span
          style={{
            fontSize: '9px',
            fontFamily: 'var(--mono)',
            color: '#94a3b8',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '8px',
          }}
        >
          HERO HIGHLIGHT
        </span>

        <h3
          style={{
            margin: 0,
            fontSize: compact ? '18px' : '28px',
            lineHeight: 1.25,
            fontWeight: 600,
            color: '#f8fafc',
            letterSpacing: '-0.04em',
          }}
        >
          Interfaces com intenção e{' '}
          <motion.span
            initial={{ backgroundSize: '0% 100%' }}
            animate={{ backgroundSize: '100% 100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
            style={{
              display: 'inline-block',
              padding: '0 4px',
              borderRadius: '4px',
              backgroundImage: `linear-gradient(to right, hsla(${hue}, 85%, 65%, 0.8), hsla(${hue + 45}, 90%, 60%, 0.8))`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left center',
              color: '#08080c',
            }}
          >
            clareza visual
          </motion.span>
        </h3>
      </div>
    </div>
  )
}
