import { useMemo } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { sound } from '../../utils/audio'

interface MeteorsProps {
  compact?: boolean
  number?: number
  hue?: number
}

export function MeteorsDemo({ compact = false, number = compact ? 12 : 20, hue = 210 }: MeteorsProps) {
  const meteors = useMemo(() => {
    return Array.from({ length: number }).map((_, idx) => ({
      id: idx,
      top: -Math.floor(Math.random() * 80) - 20,
      left: Math.floor(Math.random() * 300) - 50,
      animationDelay: (Math.random() * 0.8 + 0.2).toFixed(2),
      animationDuration: Math.floor(Math.random() * 6 + 3),
    }))
  }, [number])

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
        padding: compact ? '10px' : '20px',
        background: '#09090d',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: compact ? '260px' : '340px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #13121d 0%, #0a0a0f 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: compact ? '14px' : '22px',
          overflow: 'hidden',
          boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
        }}
      >
        {/* Chuva de Meteoros */}
        {meteors.map((meteor) => (
          <span
            key={meteor.id}
            style={{
              position: 'absolute',
              top: `${meteor.top}px`,
              left: `${meteor.left}px`,
              height: '1.5px',
              width: '1.5px',
              borderRadius: '9999px',
              backgroundColor: `hsl(${hue}, 90%, 75%)`,
              boxShadow: `0 0 0 1px hsla(${hue}, 80%, 60%, 0.2)`,
              transform: 'rotate(215deg)',
              animation: `meteor-fall ${meteor.animationDuration}s linear infinite`,
              animationDelay: `${meteor.animationDelay}s`,
              pointerEvents: 'none',
            }}
          >
            {/* Rastro do Meteoro */}
            <span
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '60px',
                height: '1px',
                background: `linear-gradient(to right, hsl(${hue}, 90%, 75%), transparent)`,
                display: 'block',
              }}
            />
          </span>
        ))}

        {/* Conteúdo do Card */}
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
              marginBottom: '12px',
            }}
          >
            <Sparkles size={16} />
          </div>

          <h3
            style={{
              margin: '0 0 6px',
              fontSize: compact ? '15px' : '19px',
              fontWeight: 600,
              color: '#f8fafc',
              letterSpacing: '-0.03em',
            }}
          >
            Meteors Effect
          </h3>

          <p
            style={{
              margin: '0 0 16px',
              fontSize: compact ? '10px' : '12px',
              color: '#94a3b8',
              lineHeight: 1.5,
            }}
          >
            {compact
              ? 'Chuva de meteoros com rastro luminoso.'
              : 'Linhas pontiagudas de luz que cruzam o card em ângulo contínuo trazendo vida e sensação de movimento.'}
          </p>

          <button
            onClick={() => sound.playClick()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: compact ? '5px 10px' : '7px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#f8fafc',
              fontSize: compact ? '10px' : '11px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Explorar efeito <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes meteor-fall {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-400px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
