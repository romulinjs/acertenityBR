import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sound } from '../../utils/audio'

export function LinkPreviewDemo({ compact = false }: { compact?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null)

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
        padding: '24px',
        background: '#09090b',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: compact ? '280px' : '440px', lineHeight: 1.8, fontSize: compact ? '13px' : '17px', color: '#cbd5e1' }}>
        Projetos modernos usam o ecossistema do{' '}
        <span
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => {
            setHovered('tailwind')
            sound.playPop()
          }}
          onMouseLeave={() => setHovered(null)}
        >
          <span
            style={{
              color: '#38bdf8',
              fontWeight: 600,
              cursor: 'pointer',
              borderBottom: '1px dashed #38bdf8',
            }}
          >
            Tailwind CSS
          </span>
          <AnimatePresence>
            {hovered === 'tailwind' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  bottom: '120%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '180px',
                  borderRadius: '12px',
                  background: '#18181b',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                  overflow: 'hidden',
                  zIndex: 40,
                  pointerEvents: 'none',
                  padding: '8px',
                }}
              >
                <div
                  style={{
                    height: '80px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '12px',
                  }}
                >
                  tailwindcss.com
                </div>
                <div style={{ marginTop: '6px', fontSize: '9px', color: '#94a3b8', textAlign: 'left', fontFamily: 'var(--mono)' }}>
                  A utility-first CSS framework.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </span>{' '}
        combinado com o poder do{' '}
        <span
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => {
            setHovered('motion')
            sound.playPop()
          }}
          onMouseLeave={() => setHovered(null)}
        >
          <span
            style={{
              color: '#a855f7',
              fontWeight: 600,
              cursor: 'pointer',
              borderBottom: '1px dashed #a855f7',
            }}
          >
            Framer Motion
          </span>
          <AnimatePresence>
            {hovered === 'motion' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  bottom: '120%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '180px',
                  borderRadius: '12px',
                  background: '#18181b',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                  overflow: 'hidden',
                  zIndex: 40,
                  pointerEvents: 'none',
                  padding: '8px',
                }}
              >
                <div
                  style={{
                    height: '80px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #9333ea, #c084fc)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '12px',
                  }}
                >
                  framer.com/motion
                </div>
                <div style={{ marginTop: '6px', fontSize: '9px', color: '#94a3b8', textAlign: 'left', fontFamily: 'var(--mono)' }}>
                  Production-ready motion library.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </span>{' '}
        para construir websites 10x melhores.
      </div>
    </div>
  )
}
