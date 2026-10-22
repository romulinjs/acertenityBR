import { useState } from 'react'

interface MacbookProps {
  compact?: boolean
  hue?: number
}

export function MacbookDemo({ compact = false, hue = 265 }: MacbookProps) {
  const [lidAngle, setLidAngle] = useState(25) // inclinação em graus

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '290px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: compact ? '10px' : '20px',
        background: 'radial-gradient(ellipse at 50% 90%, #171524, #08080d 75%)',
        perspective: '1000px',
      }}
    >
      {/* Tela do Macbook (Tampa) */}
      <div
        style={{
          width: compact ? '180px' : '280px',
          height: compact ? '110px' : '170px',
          borderRadius: '12px 12px 2px 2px',
          background: '#0d0d12',
          border: '4px solid #1e1e24',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(167, 139, 250, 0.15)',
          transform: `rotateX(${lidAngle}deg)`,
          transformOrigin: 'bottom center',
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Notch / Câmera */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '32px',
            height: '6px',
            borderRadius: '0 0 4px 4px',
            background: '#1e1e24',
            zIndex: 4,
          }}
        />

        {/* Display do App */}
        <div
          style={{
            flex: 1,
            background: `linear-gradient(135deg, #09090e 30%, hsla(${hue}, 80%, 25%, 0.35))`,
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: '3px' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#eab308' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#22c55e' }} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '8px', color: '#a78bfa', fontFamily: 'var(--mono)' }}>ACETERNITY OS</span>
            <strong style={{ display: 'block', fontSize: compact ? '9px' : '13px', color: '#fff', marginTop: '2px' }}>
              Motion Design Studio
            </strong>
          </div>

          <div
            style={{
              height: '4px',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}
          >
            <div style={{ width: '65%', height: '100%', background: `hsl(${hue}, 85%, 65%)` }} />
          </div>
        </div>
      </div>

      {/* Base do Macbook */}
      <div
        style={{
          width: compact ? '210px' : '320px',
          height: compact ? '10px' : '14px',
          borderRadius: '2px 2px 10px 10px',
          background: 'linear-gradient(to bottom, #2b2b36, #14141a)',
          borderTop: '1px solid #474755',
          boxShadow: '0 10px 30px rgba(0,0,0,0.9)',
          position: 'relative',
        }}
      >
        {/* Entalhe de abertura central */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '3px',
            background: '#121217',
            borderRadius: '0 0 4px 4px',
          }}
        />
      </div>

      {/* Sombra da base */}
      <div
        style={{
          width: compact ? '190px' : '290px',
          height: '14px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.7)',
          filter: 'blur(10px)',
          marginTop: '-4px',
        }}
      />

      {/* Controles para inclinar */}
      {!compact && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '10px',
            color: '#64748b',
            fontFamily: 'var(--mono)',
          }}
        >
          <span>Ângulo da tela:</span>
          {[10, 25, 40].map((deg) => (
            <button
              key={deg}
              onClick={() => setLidAngle(deg)}
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                padding: '2px 6px',
                background: lidAngle === deg ? `hsla(${hue}, 80%, 60%, 0.2)` : 'transparent',
                color: lidAngle === deg ? `hsl(${hue}, 90%, 75%)` : '#94a3b8',
                cursor: 'pointer',
              }}
            >
              {deg}°
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
