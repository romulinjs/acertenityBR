import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { sound } from '../../utils/audio'

interface PinProps {
  compact?: boolean
  hue?: number
}

export function Pin3DDemo({ compact = false, hue = 265 }: PinProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: compact ? '170px' : '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090e',
        perspective: '1000px',
        overflow: 'hidden',
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        sound.playWhoosh()
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Flutuante em 3D */}
      <div
        style={{
          width: compact ? '200px' : '260px',
          padding: compact ? '12px' : '16px',
          borderRadius: '14px',
          background: 'linear-gradient(145deg, #161320, #0d0c12)',
          border: isHovered
            ? `1px solid hsla(${hue}, 80%, 65%, 0.5)`
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered
            ? `0 20px 40px rgba(0,0,0,0.8), 0 0 25px hsla(${hue}, 80%, 55%, 0.2)`
            : '0 10px 25px rgba(0,0,0,0.5)',
          transform: isHovered
            ? 'rotateX(20deg) translateZ(40px) translateY(-10px)'
            : 'rotateX(35deg) translateZ(10px)',
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s, box-shadow 0.3s',
          zIndex: 5,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '8px', fontFamily: 'var(--mono)', color: `hsl(${hue}, 85%, 75%)` }}>
            ACETERNITY 3D PIN
          </span>
          <ArrowUpRight size={13} color={`hsl(${hue}, 85%, 75%)`} />
        </div>
        <h4 style={{ margin: '8px 0 4px', fontSize: compact ? '13px' : '16px', color: '#f8fafc', fontWeight: 600 }}>
          Aceternity UI
        </h4>
        <p style={{ margin: 0, fontSize: compact ? '9px' : '11px', color: '#94a3b8' }}>
          Componentes que flutuam no espaço com perspectiva.
        </p>
      </div>

      {/* Linha vertical de feixe / pino conectando ao chão */}
      <div
        style={{
          width: '2px',
          height: compact ? '40px' : '65px',
          background: `linear-gradient(to bottom, hsla(${hue}, 85%, 70%, 0.8), transparent)`,
          zIndex: 3,
          boxShadow: `0 0 8px hsl(${hue}, 85%, 70%)`,
        }}
      />

      {/* Anéis de Radar Pulsantes no Chão */}
      <div
        style={{
          position: 'relative',
          width: '100px',
          height: '40px',
          display: 'grid',
          placeItems: 'center',
          transform: 'rotateX(65deg)',
          marginTop: '-15px',
        }}
      >
        <span
          className="radar-ring"
          style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: `1px solid hsla(${hue}, 85%, 65%, 0.5)`,
            animation: 'radar-pulse 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
          }}
        />
        <span
          className="radar-ring"
          style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: `1px solid hsla(${hue}, 85%, 65%, 0.5)`,
            animation: 'radar-pulse 2s cubic-bezier(0, 0.2, 0.8, 1) infinite 0.7s',
          }}
        />
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: `hsl(${hue}, 90%, 75%)`,
            boxShadow: `0 0 10px 2px hsl(${hue}, 90%, 75%)`,
          }}
        />
      </div>

      <style>{`
        @keyframes radar-pulse {
          0% { transform: scale(0.2); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
