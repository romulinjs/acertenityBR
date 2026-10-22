import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Sparkles } from 'lucide-react'
import { sound } from '../../utils/audio'

interface ExpandableProps {
  compact?: boolean
  hue?: number
}

interface Item {
  id: string
  title: string
  subtitle: string
  tag: string
  description: string
  accent: string
}

export function ExpandableCardsDemo({ compact = false, hue = 265 }: ExpandableProps) {
  const [selected, setSelected] = useState<Item | null>(null)

  const items: Item[] = [
    {
      id: 'item-1',
      title: 'Design Systems 2.0',
      subtitle: 'Componentes fluidos e adaptativos',
      tag: 'ARCHITECTURE',
      description: 'Uma abordagem moderna para design tokens e microinterações táteis que respeitam a intenção do usuário.',
      accent: `hsl(${hue}, 85%, 65%)`,
    },
    {
      id: 'item-2',
      title: 'Canvas Shader Pipeline',
      subtitle: 'Renderização fluida a 60fps',
      tag: 'PERFORMANCE',
      description: 'Como combinar WebGL, Canvas 2D e Framer Motion para efeitos cinematográficos sem travamentos na CPU.',
      accent: '#38bdf8',
    },
  ]

  return (
    <div
      style={{
        position: 'relative',
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
        style={{
          width: '100%',
          maxWidth: compact ? '260px' : '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => {
              setSelected(item)
              sound.playPop()
            }}
            whileHover={{ scale: 1.02 }}
            style={{
              padding: compact ? '10px 12px' : '14px 16px',
              borderRadius: '12px',
              background: '#121117',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '8px',
                  fontFamily: 'var(--mono)',
                  color: item.accent,
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                {item.tag}
              </span>
              <strong style={{ fontSize: compact ? '11px' : '13px', color: '#f1f5f9', fontWeight: 600 }}>
                {item.title}
              </strong>
              {!compact && (
                <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#94a3b8' }}>
                  {item.subtitle}
                </p>
              )}
            </div>
            <span
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'grid',
                placeItems: 'center',
                color: '#94a3b8',
              }}
            >
              <ArrowUpRight size={14} />
            </span>
          </motion.div>
        ))}
      </div>

      {/* Modal Expandido com Framer Motion layoutId */}
      <AnimatePresence>
        {selected && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              background: 'rgba(5, 5, 8, 0.8)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
            onClick={() => {
              setSelected(null)
              sound.playClick(500, 0.02)
            }}
          >
            <motion.div
              layoutId={`card-${selected.id}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '380px',
                borderRadius: '16px',
                background: '#15141c',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '22px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '9px',
                    fontFamily: 'var(--mono)',
                    color: selected.accent,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Sparkles size={11} /> {selected.tag}
                </span>
                <button
                  onClick={() => {
                    setSelected(null)
                    sound.playClick(500, 0.02)
                  }}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <h3 style={{ margin: '14px 0 4px', fontSize: '18px', color: '#f8fafc', fontWeight: 600 }}>
                {selected.title}
              </h3>
              <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#94a3b8' }}>
                {selected.subtitle}
              </p>

              <div
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '11px',
                  color: '#cbd5e1',
                  lineHeight: 1.6,
                }}
              >
                {selected.description}
              </div>

              <button
                onClick={() => {
                  setSelected(null)
                  sound.playPop()
                }}
                style={{
                  marginTop: '16px',
                  width: '100%',
                  padding: '9px',
                  borderRadius: '8px',
                  background: selected.accent,
                  color: '#08080c',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '11px',
                  cursor: 'pointer',
                }}
              >
                Fechar detalhes
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
