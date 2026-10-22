import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ColourfulTextDemo({ compact = false, customText = '' }: { compact?: boolean; customText?: string }) {
  const text = customText || 'Make your websites look 10x better'
  const colors = [
    '#38bdf8', '#818cf8', '#c084fc', '#f472b6',
    '#fb7185', '#fbbf24', '#34d399', '#2dd4bf',
  ]
  const [currentColors, setCurrentColors] = useState(colors)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentColors((prev) => {
        const shuffled = [...prev].sort(() => Math.random() - 0.5)
        return shuffled
      })
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: compact ? '160px' : '260px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090b',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontSize: '9px',
          fontFamily: 'var(--mono)',
          color: '#a78bfa',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}
      >
        COLOURFUL TEXT ANIMATION
      </span>
      <h2
        style={{
          margin: 0,
          fontSize: compact ? '18px' : '36px',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 1.25,
          maxWidth: compact ? '280px' : '520px',
        }}
      >
        {text.split(' ').map((word, wordIdx) => (
          <span key={word + wordIdx} style={{ display: 'inline-block', marginRight: '8px' }}>
            {word.split('').map((char, charIdx) => {
              const color = currentColors[(wordIdx * 4 + charIdx) % currentColors.length]
              return (
                <motion.span
                  key={charIdx}
                  animate={{ color }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              )
            })}
          </span>
        ))}
      </h2>
    </div>
  )
}
