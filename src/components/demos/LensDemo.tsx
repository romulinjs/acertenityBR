import { useState } from 'react'

interface LensProps {
  compact?: boolean
  hue?: number
}

export function LensDemo({ compact = false, hue = 265 }: LensProps) {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPos({ x, y })
  }

  const lensSize = compact ? 70 : 120

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
        userSelect: 'none',
      }}
      onPointerMove={handlePointerMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem / Card Base */}
      <div
        style={{
          width: compact ? '220px' : '320px',
          height: compact ? '130px' : '180px',
          borderRadius: '14px',
          background: `radial-gradient(ellipse at 70% 30%, hsla(${hue}, 80%, 45%, 0.35), #0f0e17 70%)`,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        <span style={{ fontSize: '9px', fontFamily: 'var(--mono)', color: `hsl(${hue}, 80%, 75%)` }}>
          MICRO-INTERACTION
        </span>
        <h4 style={{ margin: '8px 0 4px', fontSize: compact ? '14px' : '18px', color: '#fff', fontWeight: 600 }}>
          Pixel Precision Lens
        </h4>
        <p style={{ margin: 0, fontSize: compact ? '9px' : '11px', color: '#94a3b8' }}>
          Mova o cursor para inspecionar com zoom
        </p>
      </div>

      {/* Lente Lupa Circular Interativa */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            border: `2px solid hsla(${hue}, 90%, 75%, 0.8)`,
            boxShadow: `0 0 25px hsla(${hue}, 80%, 60%, 0.4), inset 0 0 20px rgba(0,0,0,0.5)`,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {/* Conteúdo com escala 2.2x ampliado no ponto exato */}
          <div
            style={{
              position: 'absolute',
              width: compact ? '220px' : '320px',
              height: compact ? '130px' : '180px',
              left: `${-pos.x * 2.2 + lensSize / 2}%`,
              top: `${-pos.y * 2.2 + lensSize / 2}%`,
              transform: 'scale(2.2)',
              transformOrigin: 'top left',
              background: `radial-gradient(ellipse at 70% 30%, hsla(${hue}, 85%, 55%, 0.5), #0f0e17 70%)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '9px', fontFamily: 'var(--mono)', color: `hsl(${hue}, 80%, 85%)` }}>
              MICRO-INTERACTION
            </span>
            <h4 style={{ margin: '8px 0 4px', fontSize: compact ? '14px' : '18px', color: '#fff', fontWeight: 600 }}>
              Pixel Precision Lens
            </h4>
          </div>
        </div>
      )}
    </div>
  )
}
