import { useState } from 'react'

interface InfiniteCardsProps {
  compact?: boolean
  speed?: number
  hue?: number
}

export function InfiniteCardsDemo({ compact = false, speed = 1 }: InfiniteCardsProps) {
  const [paused, setPaused] = useState(false)

  const items = [
    {
      quote: 'A melhor biblioteca de microinterações para interfaces modernas.',
      author: 'Guilherme Silva',
      role: 'Staff Designer @ FinTech',
    },
    {
      quote: 'Transformou a percepção visual do nosso SaaS em poucas horas.',
      author: 'Beatriz Ramos',
      role: 'Founder & CEO',
    },
    {
      quote: 'Efeitos que encantam sem prejudicar a performance do navegador.',
      author: 'Lucas Mendes',
      role: 'Frontend Architect',
    },
    {
      quote: 'Atenção aos detalhes em um nível que nunca vi em outras libs.',
      author: 'Mariana Costa',
      role: 'Head of Product',
    },
  ]

  const duration = Math.max(8, 25 / speed)

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '260px',
        overflow: 'hidden',
        background: '#09090d',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '16px 0',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Máscara gradiente nos dois lados */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '50px',
          background: 'linear-gradient(to right, #09090d, transparent)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50px',
          background: 'linear-gradient(to left, #09090d, transparent)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Faixa deslizante infinita */}
      <div
        style={{
          display: 'flex',
          gap: '14px',
          width: 'max-content',
          animation: `infinite-marquee ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            style={{
              width: compact ? '190px' : '260px',
              padding: compact ? '10px 12px' : '16px 18px',
              borderRadius: '12px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <p
              style={{
                margin: '0 0 10px',
                fontSize: compact ? '9px' : '11px',
                color: '#cbd5e1',
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}
            >
              "{item.quote}"
            </p>
            <div>
              <strong style={{ display: 'block', fontSize: compact ? '10px' : '12px', color: '#f8fafc', fontWeight: 600 }}>
                {item.author}
              </strong>
              <small style={{ fontSize: compact ? '8px' : '10px', color: '#64748b', fontFamily: 'var(--mono)' }}>
                {item.role}
              </small>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes infinite-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}
