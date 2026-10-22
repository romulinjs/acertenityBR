import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface LampProps {
  compact?: boolean
  hue?: number
}

export function LampDemo({ compact = false, hue = 195 }: LampProps) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        minHeight: compact ? '180px' : '320px',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#09090b',
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          isolation: 'isolate',
          zIndex: 0,
        }}
      >
        {/* Feixe Esquerdo da Lâmpada */}
        <motion.div
          initial={{ opacity: 0.5, width: compact ? '8rem' : '15rem' }}
          animate={{ opacity: 1, width: compact ? '16rem' : '30rem' }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: 0,
            right: '50%',
            height: compact ? '10rem' : '16rem',
            overflow: 'visible',
            backgroundImage: `conic-gradient(from 70deg at center top, hsl(${hue}, 85%, 60%), transparent 60%)`,
            color: '#fff',
            maskImage: 'linear-gradient(to top, white, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, white, transparent)',
          }}
        />

        {/* Feixe Direito da Lâmpada */}
        <motion.div
          initial={{ opacity: 0.5, width: compact ? '8rem' : '15rem' }}
          animate={{ opacity: 1, width: compact ? '16rem' : '30rem' }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            height: compact ? '10rem' : '16rem',
            overflow: 'visible',
            backgroundImage: `conic-gradient(from 290deg at center top, transparent 40%, hsl(${hue}, 85%, 60%))`,
            color: '#fff',
            maskImage: 'linear-gradient(to top, white, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, white, transparent)',
          }}
        />

        {/* Brilho central e desfoque */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '12rem',
            width: compact ? '14rem' : '28rem',
            borderRadius: '50%',
            backgroundColor: `hsl(${hue}, 90%, 65%)`,
            filter: 'blur(70px)',
            opacity: 0.35,
          }}
        />

        {/* Linha horizontal superior de emissão de luz */}
        <motion.div
          initial={{ width: compact ? '8rem' : '15rem' }}
          animate={{ width: compact ? '16rem' : '30rem' }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '2px',
            backgroundColor: `hsl(${hue}, 90%, 75%)`,
            boxShadow: `0 0 20px 4px hsl(${hue}, 90%, 70%)`,
          }}
        />
      </div>

      {/* Conteúdo iluminado */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 20px',
          textAlign: 'center',
          marginTop: compact ? '-30px' : '-50px',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '9px',
            fontFamily: 'var(--mono)',
            color: `hsl(${hue}, 90%, 75%)`,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          <Sparkles size={11} /> LAMP EFFECT CONTAINER
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: compact ? '18px' : '34px',
            fontWeight: 600,
            letterSpacing: '-0.05em',
            color: '#f8fafc',
            background: `linear-gradient(to bottom, #ffffff, hsla(${hue}, 30%, 75%, 0.8))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 10px 30px rgba(0,0,0,0.8)',
          }}
        >
          Build websites the right way
        </h2>
        {!compact && (
          <p
            style={{
              margin: '8px 0 0',
              fontSize: '11px',
              color: '#94a3b8',
              fontFamily: 'var(--mono)',
            }}
          >
            O icônico cone de iluminação e reflexão de luz da Aceternity UI
          </p>
        )}
      </motion.div>
    </div>
  )
}
