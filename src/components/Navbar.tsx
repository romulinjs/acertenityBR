import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Search, Command, Volume2, VolumeX, Menu, X, ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import { sound } from '../utils/audio'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

interface NavbarProps {
  openSearch: () => void
  savedCount: number
}

export function Navbar({ openSearch, savedCount }: NavbarProps) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(() => sound.enabled)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const toggleSound = () => {
    const next = sound.toggle()
    setAudioEnabled(next)
  }

  const navLinks = [
    { name: 'Components', path: '/components' },
    { name: 'Templates', path: '/templates' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Showcase', path: '/showcase' },
    { name: 'Docs', path: '/docs' },
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo Aceternity UI */}
        <Link to="/" className="header-logo" onClick={() => sound.playClick()}>
          <div className="aceternity-logo-icon">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="header-logo-text">
            <strong>Aceternity</strong>
            <span className="logo-badge">UI</span>
          </div>
        </Link>

        {/* Links de navegação principais Desktop */}
        <nav className="header-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path)
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                onClick={() => sound.playClick()}
              >
                {link.name}
                {link.name === 'Pricing' && <span className="pro-pill">PRO</span>}
              </Link>
            )
          })}
        </nav>

        {/* Ações da Direita */}
        <div className="header-actions">
          {/* Busca rápida Cmd+K */}
          <button
            className="search-trigger-btn"
            onClick={() => {
              sound.playClick()
              openSearch()
            }}
          >
            <Search size={14} />
            <span>Search components...</span>
            <kbd>
              <Command size={10} /> K
            </kbd>
          </button>

          {/* Som Tátil */}
          <button
            className={`action-btn-icon ${audioEnabled ? 'active-sound' : ''}`}
            onClick={toggleSound}
            title={audioEnabled ? 'Mudo' : 'Ativar feedback sonoro tátil'}
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Coleção Salva */}
          <Link
            to="/components?saved=1"
            className="action-btn-icon saved-link-btn"
            title="Itens salvos"
            onClick={() => sound.playClick()}
          >
            <Sparkles size={15} />
            {savedCount > 0 && <span className="saved-badge">{savedCount}</span>}
          </Link>

          {/* Social Links */}
          <a
            href="https://github.com/romulinjs/acertenityBR"
            target="_blank"
            rel="noreferrer"
            className="action-btn-icon social-icon"
            title="GitHub Repository"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href="https://twitter.com/mannupaaji"
            target="_blank"
            rel="noreferrer"
            className="action-btn-icon social-icon"
            title="Twitter / X"
          >
            <TwitterIcon size={15} />
          </a>

          {/* Botão CTA Principal */}
          <Link
            to="/pricing"
            className="header-cta-btn"
            onClick={() => sound.playWhoosh()}
          >
            <span>Get All-Access</span>
            <ArrowUpRight size={13} />
          </Link>

          {/* Botão Menu Mobile */}
          <button
            className="mobile-toggle-btn"
            onClick={() => {
              sound.playClick()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <div className="mobile-dropdown-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="mobile-nav-link"
                onClick={() => {
                  sound.playClick()
                  setMobileMenuOpen(false)
                }}
              >
                <span>{link.name}</span>
                {link.name === 'Pricing' && <span className="pro-pill">PRO</span>}
              </Link>
            ))}
            <div className="mobile-dropdown-footer">
              <Link
                to="/pricing"
                className="header-cta-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Get All-Access Pro</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
