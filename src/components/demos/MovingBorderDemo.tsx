import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { sound } from '../../utils/audio'

interface MovingBorderProps {
  compact?: boolean
  hue?: number
}

export function MovingBorderDemo({ compact = false, hue = 265 }: MovingBorderProps) {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    sound.playClick(1000, 0.05)
    setTimeout(() => setClicked(false), 2000)
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
      <div
        onClick={handleClick}
        style={{
          position: 'relative',
          padding: '1.5px',
          borderRadius: '999px',
          overflow: 'hidden',
          cursor: 'pointer',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Feixe rotativo em gradiente cônico */}
        <div
          style={{
            position: 'absolute',
            inset: '-100%',
            background: `conic-gradient(from 0deg, transparent 75%, hsl(${hue}, 90%, 75%))`,
            animation: 'border-spin 3s linear infinite',
          }}
        />

        {/* Corpo interno do botão */}
        <button
          style={{
            position: 'relative',
            zIndex: 2,
            border: 'none',
            outline: 'none',
            borderRadius: '999px',
            background: clicked ? '#171224' : '#0e0d14',
            color: '#f8fafc',
            padding: compact ? '8px 18px' : '12px 24px',
            fontSize: compact ? '11px' : '13px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {clicked ? (
            <>
              <Check size={14} color="#86efac" /> Interação Concluída
            </>
          ) : (
            <>
              Moving Border Button <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>

      {!compact && (
        <span
          style={{
            marginTop: '18px',
            fontSize: '10px',
            color: '#64748b',
            fontFamily: 'var(--mono)',
          }}
        >
          Gradiente cônico girando em 360° pelo contorno
        </span>
      )}

      <style>{`
        @keyframes border-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
