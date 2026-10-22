import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { sound } from '../../utils/audio'

interface AppleCard {
  id: number
  category: string
  title: string
  src: string
  content: string
}

export function AppleCarouselDemo({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<AppleCard | null>(null)

  const cards: AppleCard[] = [
    {
      id: 1,
      category: 'Artificial Intelligence',
      title: 'You can do more with AI than ever before.',
      src: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      content: 'Projetos criativos agora combinam modelos generativos com interfaces táteis de baixa latência e transições cinematográficas.',
    },
    {
      id: 2,
      category: 'Productivity',
      title: 'Enhance your daily workflow with Aceternity.',
      src: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
      content: 'Componentes pré-fabricados com foco em microinterações permitem acelerar a entrega de interfaces memoráveis.',
    },
    {
      id: 3,
      category: 'Design Systems',
      title: 'A new dimension of spatial depth.',
      src: 'linear-gradient(135deg, #ec4899, #be185d)',
      content: 'A profundidade no eixo Z eleva a experiência do usuário, criando pontos focais naturais sem sobrecarregar a tela.',
    },
  ]

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: compact ? '170px' : '280px',
        display: 'flex',
        alignItems: 'center',
        padding: compact ? '10px' : '20px',
        background: '#09090b',
        overflowX: 'auto',
      }}
    >
      <div style={{ display: 'flex', gap: '14px', width: '100%', justifyContent: 'center' }}>
        {cards.slice(0, compact ? 2 : 3).map((card) => (
          <motion.div
            key={card.id}
            layoutId={`apple-card-${card.id}`}
            onClick={() => {
              setSelected(card)
              sound.playPop()
            }}
            whileHover={{ scale: 1.03 }}
            style={{
              flex: 1,
              maxWidth: compact ? '140px' : '220px',
              height: compact ? '140px' : '210px',
              borderRadius: '20px',
              background: card.src,
              padding: compact ? '12px' : '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: compact ? '8px' : '10px',
                  fontFamily: 'var(--mono)',
                  color: 'rgba(255,255,255,0.7)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {card.category}
              </span>
              <h4
                style={{
                  margin: '6px 0 0',
                  fontSize: compact ? '11px' : '15px',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </h4>
            </div>

            <span
              style={{
                alignSelf: 'flex-start',
                padding: '4px 8px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                fontSize: '9px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Explorar <ArrowRight size={10} />
            </span>
          </motion.div>
        ))}
      </div>

      {/* Modal Expansível Estilo Apple */}
      <AnimatePresence>
        {selected && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 30,
              background: 'rgba(5, 5, 8, 0.85)',
              backdropFilter: 'blur(12px)',
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
              layoutId={`apple-card-${selected.id}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '420px',
                borderRadius: '24px',
                background: selected.src,
                padding: '24px',
                color: '#ffffff',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--mono)',
                    color: 'rgba(255,255,255,0.8)',
                    textTransform: 'uppercase',
                  }}
                >
                  {selected.category}
                </span>
                <button
                  onClick={() => {
                    setSelected(null)
                    sound.playClick(500, 0.02)
                  }}
                  style={{
                    border: 'none',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <X size={15} />
                </button>
              </div>

              <h3 style={{ margin: '14px 0 10px', fontSize: '22px', fontWeight: 700, lineHeight: 1.25 }}>
                {selected.title}
              </h3>

              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  padding: '16px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                {selected.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
