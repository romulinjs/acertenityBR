import { useState } from 'react'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import { sound } from '../../utils/audio'

export function CanvasRevealDemo({ compact = false, hue = 155 }: { compact?: boolean; hue?: number }) {
  const [hovered, setHovered] = useState(false)

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
        background: '#09090b',
        padding: '20px',
      }}
    >
      <div
        onMouseEnter={() => {
          setHovered(true)
          sound.playWhoosh()
        }}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: compact ? '240px' : '320px',
          height: compact ? '140px' : '200px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: '#0e0e13',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: compact ? '14px' : '20px',
          cursor: 'pointer',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Camada Canvas Reveal Dot Matrix */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: hovered ? 1 : 0.15,
            transition: 'opacity 0.4s ease',
            backgroundImage: `radial-gradient(hsl(${hue}, 85%, 65%) 1px, transparent 1px)`,
            backgroundSize: '12px 12px',
            maskImage: hovered
              ? 'radial-gradient(ellipse at 50% 50%, black 50%, transparent 95%)'
              : 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 60%)',
            WebkitMaskImage: hovered
              ? 'radial-gradient(ellipse at 50% 50%, black 50%, transparent 95%)'
              : 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 60%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at center, hsla(${hue}, 80%, 55%, ${hovered ? 0.2 : 0}), transparent 70%)`,
            transition: 'background 0.4s ease',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              fontFamily: 'var(--mono)',
              color: `hsl(${hue}, 90%, 75%)`,
            }}
          >
            <Sparkles size={12} /> CANVAS REVEAL
          </span>
          <ArrowUpRight size={14} color="#94a3b8" />
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h4 style={{ margin: '0 0 6px', fontSize: compact ? '14px' : '18px', fontWeight: 600, color: '#f8fafc' }}>
            Dot Matrix Shader
          </h4>
          <p style={{ margin: 0, fontSize: compact ? '9px' : '11px', color: '#94a3b8' }}>
            {compact ? 'Passe o mouse para revelar a malha.' : 'Revelação gradual com transição suave e matriz de pontos luminosos.'}
          </p>
        </div>
      </div>
    </div>
  )
}
