import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2 } from 'lucide-react'
import { sound } from '../utils/audio'

interface FullscreenModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function FullscreenModal({ isOpen, onClose, title, children }: FullscreenModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(5, 5, 8, 0.95)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header do modo Cinema */}
          <div
            style={{
              height: '56px',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#09090d',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Maximize2 size={16} color="#a78bfa" />
              <strong style={{ fontSize: '13px', color: '#f8fafc', fontWeight: 600 }}>
                {title}
              </strong>
              <span
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--mono)',
                  color: '#64748b',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                MODO CINEMA
              </span>
            </div>

            <button
              onClick={() => {
                onClose()
                sound.playClick(400, 0.03)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#cbd5e1',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              <X size={14} /> Fechar <kbd style={{ fontFamily: 'var(--mono)', fontSize: '9px', opacity: 0.6 }}>ESC</kbd>
            </button>
          </div>

          {/* Área principal em tela cheia */}
          <div
            style={{
              flex: 1,
              width: '100%',
              height: 'calc(100vh - 56px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
