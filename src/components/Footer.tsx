import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { sound } from '../utils/audio'

function GithubIcon({ size = 15 }: { size?: number }) {
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

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    sound.playPop()
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
    }, 2000)
  }

  return (
    <footer className="aceternity-footer">
      <div className="footer-glow" />
      <div className="footer-inner">
        <div className="footer-top-grid">
          {/* Brand & Newsletter Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand" onClick={() => sound.playClick()}>
              <span className="brand-mark">
                <i /><i /><i /><i />
              </span>
              <span className="footer-brand-text">
                <strong>Aceternity UI</strong>
                <small>Make your websites look 10x better</small>
              </span>
            </Link>
            <p className="footer-desc">
              Copy paste the most trending components and use them in your websites
              without having to worry about styling and animations.
            </p>

            <form className="footer-newsletter" onSubmit={handleSubscribe}>
              <span className="newsletter-title">Subscribe to updates</span>
              <div className="newsletter-input-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (subscribed) setSubscribed(false)
                  }}
                  placeholder="Enter your email address..."
                  required
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  {subscribed ? <Check size={14} className="text-emerald-400" /> : <ArrowRight size={14} />}
                </button>
              </div>
              {subscribed && (
                <span className="newsletter-success">
                  <Check size={12} /> You are on the list! Welcome to Aceternity.
                </span>
              )}
            </form>
          </div>

          {/* Links Column 1 */}
          <div className="footer-col">
            <h4 className="footer-heading">Components</h4>
            <ul className="footer-links">
              <li><Link to="/components?category=Hero" onClick={() => sound.playClick()}>Hero & Headers</Link></li>
              <li><Link to="/components?category=Cards" onClick={() => sound.playClick()}>Cards & 3D</Link></li>
              <li><Link to="/components?category=Backgrounds" onClick={() => sound.playClick()}>Backgrounds</Link></li>
              <li><Link to="/components?category=Text" onClick={() => sound.playClick()}>Text Effects</Link></li>
              <li><Link to="/components?category=Navigation" onClick={() => sound.playClick()}>Navigation</Link></li>
              <li><Link to="/components" onClick={() => sound.playClick()}>All Components</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="footer-col">
            <h4 className="footer-heading">Templates</h4>
            <ul className="footer-links">
              <li><Link to="/templates/saas-launch" onClick={() => sound.playClick()}>SaaS Launchpad</Link></li>
              <li><Link to="/templates/studio-portfolio" onClick={() => sound.playClick()}>Studio Portfolio</Link></li>
              <li><Link to="/templates/developer-hub" onClick={() => sound.playClick()}>Developer Hub</Link></li>
              <li><Link to="/templates/ai-startup" onClick={() => sound.playClick()}>AI Startup</Link></li>
              <li><Link to="/templates" onClick={() => sound.playClick()}>Browse All 8 Templates</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="footer-col">
            <h4 className="footer-heading">Product & Pro</h4>
            <ul className="footer-links">
              <li><Link to="/pricing" onClick={() => sound.playClick()}>Pricing & Plans</Link></li>
              <li><Link to="/showcase" onClick={() => sound.playClick()}>Showcase</Link></li>
              <li><Link to="/docs" onClick={() => sound.playClick()}>Documentation</Link></li>
              <li><a href="https://github.com/romulinjs/acertenityBR" target="_blank" rel="noreferrer">GitHub Repository</a></li>
              <li><a href="https://ui.aceternity.com" target="_blank" rel="noreferrer">Original Aceternity UI</a></li>
            </ul>
          </div>

          {/* Links Column 4 */}
          <div className="footer-col">
            <h4 className="footer-heading">Community & Social</h4>
            <div className="footer-social-row">
              <a
                href="https://github.com/romulinjs/acertenityBR"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="GitHub"
              >
                <GithubIcon size={15} />
              </a>
              <a
                href="https://twitter.com/mannupaaji"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="Twitter / X"
              >
                <TwitterIcon size={15} />
              </a>
              <a
                href="https://ui.aceternity.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="Aceternity Official"
              >
                <Sparkles size={15} />
              </a>
            </div>
            <div className="footer-badge">
              <span className="status-dot-live" />
              <span>All 30+ components fully interactive</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Aceternity UI. Crafted with React 19, Framer Motion & Tailwind CSS.
          </div>
          <div className="footer-bottom-links">
            <Link to="/docs" onClick={() => sound.playClick()}>Privacy Policy</Link>
            <span>•</span>
            <Link to="/docs" onClick={() => sound.playClick()}>Terms of Service</Link>
            <span>•</span>
            <Link to="/docs" onClick={() => sound.playClick()}>Licensing (MIT)</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
