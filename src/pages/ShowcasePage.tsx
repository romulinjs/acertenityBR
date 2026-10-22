import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  Plus,
  Sparkles,
  X,
} from 'lucide-react'
import { sound } from '../utils/audio'

interface ShowcaseProject {
  id: string
  title: string
  category: 'SaaS' | 'AI' | 'DevTools' | 'Portfolio' | 'Web3'
  description: string
  url: string
  componentsUsed: string[]
  gradient: string
  stars?: string
}

const initialProjects: ShowcaseProject[] = [
  {
    id: 'nexus-ai',
    title: 'Nexus AI Studio',
    category: 'AI',
    description: 'Next-generation multimodal generative workspace with neural agent nodes.',
    url: 'https://nexus.ai',
    componentsUsed: ['Lamp Effect', 'Canvas Reveal', 'Sparkles Core'],
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
    stars: '4.9 ★',
  },
  {
    id: 'vortex-cloud',
    title: 'Vortex Cloud Engine',
    category: 'DevTools',
    description: 'Autonomous edge deployments and real-time observability for distributed systems.',
    url: 'https://vortex.cloud',
    componentsUsed: ['Vortex', 'Meteors', 'Card Spotlight'],
    gradient: 'linear-gradient(135deg, #022c22 0%, #020617 100%)',
    stars: '5.0 ★',
  },
  {
    id: 'chronos-pay',
    title: 'Chronos Finance',
    category: 'Web3',
    description: 'Decentralized protocol infrastructure with high-frequency institutional liquidity.',
    url: 'https://chronos.finance',
    componentsUsed: ['3D Card', 'Following Pointer', 'Wavy Background'],
    gradient: 'linear-gradient(135deg, #311042 0%, #09090b 100%)',
    stars: '4.8 ★',
  },
  {
    id: 'aurora-design',
    title: 'Aurora Studio',
    category: 'Portfolio',
    description: 'Award-winning creative engineering and digital art collective based in Tokyo.',
    url: 'https://aurora.design',
    componentsUsed: ['Apple Carousel', 'Lens Effect', 'Glare Card'],
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    stars: '4.9 ★',
  },
  {
    id: 'pulse-metrics',
    title: 'Pulse Metrics',
    category: 'SaaS',
    description: 'Customer analytics and cohort retention metrics built specifically for modern founders.',
    url: 'https://pulsemetrics.io',
    componentsUsed: ['Macbook Scroll', 'Infinite Cards', 'Animated Tooltip'],
    gradient: 'linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)',
    stars: '4.7 ★',
  },
  {
    id: 'hyper-flow',
    title: 'HyperFlow Orchestrator',
    category: 'DevTools',
    description: 'Visual DAG pipeline builder for microservices orchestration and ETL flows.',
    url: 'https://hyperflow.run',
    componentsUsed: ['Hero Highlight', 'Wobble Card', 'Beams Collision'],
    gradient: 'linear-gradient(135deg, #172554 0%, #030712 100%)',
    stars: '4.9 ★',
  },
]

export function ShowcasePage() {
  const [projects, setProjects] = useState<ShowcaseProject[]>(initialProjects)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Form states
  const [formName, setFormName] = useState('')
  const [formUrl, setFormUrl] = useState('')
  const [formCategory, setFormCategory] = useState<'SaaS' | 'AI' | 'DevTools' | 'Portfolio' | 'Web3'>('SaaS')
  const [formDesc, setFormDesc] = useState('')

  const categories = ['all', 'SaaS', 'AI', 'DevTools', 'Portfolio', 'Web3']

  const filtered = projects.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sound.playPop()
    const newProject: ShowcaseProject = {
      id: `custom-${Date.now()}`,
      title: formName,
      category: formCategory,
      description: formDesc || 'Community submitted website powered by Aceternity UI.',
      url: formUrl.startsWith('http') ? formUrl : `https://${formUrl}`,
      componentsUsed: ['Custom Aceternity Stack'],
      gradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
      stars: '5.0 ★',
    }
    setProjects([newProject, ...projects])
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setModalOpen(false)
      setFormName('')
      setFormUrl('')
      setFormDesc('')
    }, 1500)
  }

  return (
    <div className="showcase-page-wrap">
      {/* Hero */}
      <section className="showcase-hero">
        <div className="hero-radial-beam" />
        <div className="showcase-hero-inner">
          <div className="eyebrow-pill">
            <Sparkles size={13} className="text-violet-400" />
            <span>BUILT WITH ACETERNITY UI</span>
          </div>
          <h1 className="showcase-title">
            Inspiring products built by{' '}
            <span className="gradient-text-shimmer">the community</span>
          </h1>
          <p className="showcase-subtitle">
            Explore world-class websites, venture-backed startups, and creative portfolios
            designed with Aceternity components.
          </p>

          <div className="showcase-actions">
            <button
              className="btn-aceternity-primary"
              onClick={() => {
                sound.playClick()
                setModalOpen(true)
              }}
            >
              <Plus size={15} />
              <span>Submit Your Project</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Category Bar */}
      <div className="showcase-filter-bar">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                sound.playClick()
                setActiveCategory(cat)
              }}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>
        <div className="showcase-count-tag">
          <strong>{filtered.length}</strong> projects featured
        </div>
      </div>

      {/* Projects Grid */}
      <div className="showcase-grid">
        {filtered.map((item, idx) => (
          <motion.article
            key={item.id}
            className="showcase-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
          >
            {/* Visual Header / Mock Artwork */}
            <div
              className="showcase-visual"
              style={{ background: item.gradient }}
            >
              <div className="visual-window-bar">
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
                <span className="visual-url">{item.url.replace('https://', '')}</span>
              </div>
              <div className="visual-inner-content">
                <Globe size={32} className="visual-globe-icon" />
                <h4>{item.title}</h4>
                <span className="visual-stars">{item.stars}</span>
              </div>
            </div>

            {/* Content */}
            <div className="showcase-body">
              <div className="showcase-meta-top">
                <span className="showcase-cat-pill">{item.category}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="showcase-visit-link"
                  onClick={() => sound.playClick()}
                >
                  <span>Visit</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <h3 className="showcase-item-title">{item.title}</h3>
              <p className="showcase-item-desc">{item.description}</p>

              <div className="showcase-components-used">
                <span className="used-label">COMPONENTS:</span>
                <div className="used-tags">
                  {item.componentsUsed.map((comp) => (
                    <span key={comp} className="used-tag">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Submit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="checkout-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="checkout-modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {!submitted ? (
                <div>
                  <div className="modal-header">
                    <span className="modal-pill">COMMUNITY SHOWCASE</span>
                    <h3 className="modal-title">Submit your Aceternity website</h3>
                    <p className="modal-desc">
                      Share your work with over 100,000 monthly developers and get
                      featured on our official showcase page.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="modal-checkout-form">
                    <div className="form-field">
                      <label>Project Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Acme Studio"
                      />
                    </div>

                    <div className="form-field">
                      <label>Website URL</label>
                      <input
                        type="url"
                        required
                        value={formUrl}
                        onChange={(e) => setFormUrl(e.target.value)}
                        placeholder="https://mywebsite.com"
                      />
                    </div>

                    <div className="form-field">
                      <label>Category</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as any)}
                        aria-label="Select Category"
                      >
                        <option value="SaaS">SaaS Platform</option>
                        <option value="AI">AI Application</option>
                        <option value="DevTools">Developer Tools</option>
                        <option value="Portfolio">Portfolio & Agency</option>
                        <option value="Web3">Web3 & Crypto</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Short Description</label>
                      <textarea
                        value={formDesc}
                        onChange={(e) => setFormDesc(e.target.value)}
                        placeholder="Tell us what your project does..."
                        rows={3}
                      />
                    </div>

                    <button type="submit" className="btn-modal-pay">
                      <span>Submit Website</span>
                      <ArrowRight size={15} />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="checkout-success-view">
                  <div className="success-icon-badge">
                    <Check size={28} className="text-emerald-400" />
                  </div>
                  <h3>Website Submitted!</h3>
                  <p>
                    Thank you! Your project has been added to our live showcase list.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
