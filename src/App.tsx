import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronRight,
  Command,
  Component,
  Copy,
  ExternalLink,
  Maximize2,
  Search,
} from 'lucide-react'

// Components
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CodeBlock } from './components/CodeBlock'
import { DemoPreview } from './components/DemoPreview'
import { FullscreenModal } from './components/FullscreenModal'

// Data & Helpers
import { allItems, snippetsFor, type CatalogItem } from './data/catalog'
import { copyText } from './clipboard'
import { sound } from './utils/audio'

// Pages
import { HomePage } from './pages/HomePage'
import { ComponentsPage } from './pages/ComponentsPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { TemplateDetailPage } from './pages/TemplateDetailPage'
import { PricingPage } from './pages/PricingPage'
import { ShowcasePage } from './pages/ShowcasePage'
import { DocsPage } from './pages/DocsPage'

const typeLabel: Record<CatalogItem['type'], string> = {
  component: 'Component',
  effect: 'Effect',
  block: 'Section',
  template: 'Template',
}

function getPath(item: CatalogItem) {
  return `/${item.type === 'template' ? 'templates' : 'components'}/${item.slug}`
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export function App() {
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('aceui-saved') ?? '[]') as string[]
    } catch {
      return []
    }
  })
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('aceui-saved', JSON.stringify(saved))
  }, [saved])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((value) => !value)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const toggleSaved = (slug: string) => {
    sound.playPop()
    setSaved((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    )
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="aceternity-app-root">
        {/* Aceternity Global Fixed Navbar */}
        <Navbar openSearch={() => setSearchOpen(true)} savedCount={saved.length} />

        <div className="aceternity-page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/components"
              element={<ComponentsPage saved={saved} toggleSaved={toggleSaved} />}
            />
            <Route
              path="/components/:slug"
              element={<ItemPage saved={saved} toggleSaved={toggleSaved} />}
            />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/templates/:slug" element={<TemplateDetailPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Aceternity Global Footer */}
        <Footer />

        {/* Global Search Palette */}
        <AnimatePresence>
          {searchOpen && <SearchPalette close={() => setSearchOpen(false)} />}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  )
}

function ItemPage({
  saved,
  toggleSaved,
}: {
  saved: string[]
  toggleSaved: (slug: string) => void
}) {
  const { slug = '' } = useParams()
  const item = allItems.find((entry) => entry.slug === slug)
  const navigate = useNavigate()
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [hue, setHue] = useState(265)
  const [speed, setSpeed] = useState(1)
  const [customText, setCustomText] = useState('')
  const [motionOn, setMotionOn] = useState(true)
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const [notice, setNotice] = useState(false)
  const [installCopied, setInstallCopied] = useState(false)

  if (!item) return <NotFound />
  const snippet = snippetsFor(item)
  const isSaved = saved.includes(item.slug)
  const related = allItems
    .filter(
      (entry) =>
        entry.slug !== item.slug &&
        (entry.category === item.category ||
          entry.tags.some((tag) => item.tags.includes(tag)))
    )
    .slice(0, 4)

  async function shareItem() {
    sound.playClick()
    const url = `${window.location.origin}${getPath(item as CatalogItem)}`
    const copied = await copyText(url)
    setNotice(copied)
    if (copied) window.setTimeout(() => setNotice(false), 1800)
  }

  async function copyInstallCommand() {
    sound.playClick()
    const copied = await copyText('pnpm add framer-motion lucide-react')
    setInstallCopied(copied)
    if (copied) window.setTimeout(() => setInstallCopied(false), 1800)
  }

  const isTextComponent = [
    'text',
    'flip',
    'typewriter',
    'encrypted',
    'squiggle',
    'hero-highlight',
    'colourful-text',
  ].includes(item.demo)

  return (
    <main className="page-content detail-page">
      <div className="detail-breadcrumb">
        <button
          onClick={() => {
            sound.playClick()
            navigate('/components')
          }}
        >
          <ArrowLeft size={14} /> Back to components
        </button>
        <ChevronRight size={13} />
        <span>{item.category}</span>
        <ChevronRight size={13} />
        <span className="breadcrumb-current">{item.name}</span>
      </div>

      <section className="detail-heading">
        <div className="detail-heading-copy">
          <div className="detail-eyebrow">
            <span className={`type-pill type-${item.type}`}>{typeLabel[item.type]}</span>
            <span className="detail-category">{item.category}</span>
            <span className="detail-separator">/</span>
            <span>React + Framer Motion</span>
          </div>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <div className="detail-tags">
            {item.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="detail-actions">
          <button
            className="detail-icon-button"
            onClick={() => {
              sound.playWhoosh()
              setFullscreenOpen(true)
            }}
            title="Open in Fullscreen Cinema Mode"
            style={{
              background: 'rgba(167, 139, 250, 0.12)',
              borderColor: 'rgba(167, 139, 250, 0.3)',
              color: '#c4b5fd',
            }}
          >
            <Maximize2 size={14} />
            <span>Cinema Mode</span>
          </button>
          <button
            className={`detail-icon-button ${isSaved ? 'saved' : ''}`}
            onClick={() => toggleSaved(item.slug)}
            aria-label="Save item"
          >
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button className="detail-icon-button" onClick={shareItem}>
            <Copy size={14} />
            <span>{notice ? 'Copied Link!' : 'Share'}</span>
          </button>
          <a className="source-link" href={item.source} target="_blank" rel="noreferrer">
            Official Aceternity <ArrowUpRight size={13} />
          </a>
        </div>
      </section>

      <div className="detail-layout">
        <div className="detail-main-column">
          <div className="detail-panel-header">
            <div className="preview-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={tab === 'preview'}
                className={tab === 'preview' ? 'active' : ''}
                onClick={() => {
                  sound.playClick()
                  setTab('preview')
                }}
              >
                Interactive Playground
              </button>
              <button
                role="tab"
                aria-selected={tab === 'code'}
                className={tab === 'code' ? 'active' : ''}
                onClick={() => {
                  sound.playClick()
                  setTab('code')
                }}
              >
                Source Code <span>3 files</span>
              </button>
            </div>
            <div className="live-preview-label">
              <span className="preview-live">
                <i /> {tab === 'preview' ? '60 FPS PREVIEW' : 'SOURCE CODE'}
              </span>
              <span className="panel-divider" />
              <button
                onClick={() => {
                  sound.playClick()
                  setMotionOn((value) => !value)
                }}
                className={`motion-toggle ${motionOn ? 'on' : ''}`}
              >
                <span /> Motion {motionOn ? 'on' : 'off'}
              </button>
            </div>
          </div>

          {tab === 'preview' ? (
            <div className="preview-stage" data-motion={motionOn ? 'on' : 'off'}>
              <DemoPreview
                item={item}
                motionEnabled={motionOn}
                hue={hue}
                speed={speed}
                customText={customText}
              />
              <div className="preview-stage-footer">
                <span>
                  <Command size={12} /> Interact with mouse, touch, or click to test physics
                </span>
                <span>PRODUCTION HARDENED</span>
              </div>
            </div>
          ) : (
            <CodeBlock files={snippet} />
          )}

          {/* Interactive Controls Bar */}
          {tab === 'preview' && (
            <div className="preview-controls" style={{ flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="control-label">THEME PALETTE</span>
                <div className="hue-swatches">
                  {[
                    { name: 'Violet', h: 265 },
                    { name: 'Cyan', h: 195 },
                    { name: 'Emerald', h: 155 },
                    { name: 'Amber', h: 38 },
                    { name: 'Rose', h: 330 },
                  ].map((swatch) => (
                    <button
                      key={swatch.name}
                      aria-label={`Apply ${swatch.name} hue`}
                      title={swatch.name}
                      className={hue === swatch.h ? 'selected' : ''}
                      style={{ background: `hsl(${swatch.h}, 80%, 65%)` }}
                      onClick={() => {
                        sound.playClick(600 + swatch.h, 0.02)
                        setHue(swatch.h)
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="control-label">ANIMATION SPEED</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {[0.5, 1, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        sound.playClick()
                        setSpeed(s)
                      }}
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '5px',
                        padding: '3px 8px',
                        background: speed === s ? 'rgba(167, 139, 250, 0.2)' : 'transparent',
                        color: speed === s ? '#c4b5fd' : '#94a3b8',
                        fontSize: '10px',
                        fontFamily: 'var(--mono)',
                        cursor: 'pointer',
                      }}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {isTextComponent && (
                <div style={{ flex: '1 0 200px' }}>
                  <span className="control-label">CUSTOM TEXT</span>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter custom preview text..."
                    style={{
                      width: '100%',
                      background: '#121217',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      color: '#f8fafc',
                      fontSize: '11px',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              <div className="control-note">
                <span className="control-label">ACCELERATION</span>
                <span style={{ fontSize: '11px' }}>GPU Transforms & Canvas 2D</span>
              </div>
            </div>
          )}

          <div className="detail-description">
            <div>
              <span className="section-kicker">
                ABOUT THIS COMPONENT <span>/ 01</span>
              </span>
              <h2>
                True Fidelity.<br />
                <i>Ready for your app.</i>
              </h2>
            </div>
            <p>
              {item.description} Built to match the original Aceternity UI catalog
              with precision: responsive breakpoints, tactile feedback, spring mechanics,
              and dark mode harmony.
            </p>
          </div>

          <section className="related-section">
            <div className="related-heading">
              <div>
                <span className="section-kicker">
                  CONTINUE EXPLORING <span>/ 02</span>
                </span>
                <h2>Related components</h2>
              </div>
              <Link to="/components" onClick={() => sound.playClick()}>
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="related-grid">
              {related.map((entry) => (
                <article className="related-card" key={entry.slug}>
                  <div className="related-art">
                    <DemoPreview item={entry} compact />
                  </div>
                  <Link
                    className="related-meta"
                    to={getPath(entry)}
                    onClick={() => sound.playClick(750, 0.02)}
                  >
                    <span>{entry.category}</span>
                    <strong>{entry.name}</strong>
                    <ArrowUpRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="detail-sidebar">
          <div className="info-card">
            <span className="section-kicker">SUMMARY</span>
            <div className="info-row">
              <span>Category</span>
              <strong>{item.category}</strong>
            </div>
            <div className="info-row">
              <span>Type</span>
              <strong>{typeLabel[item.type]}</strong>
            </div>
            <div className="info-row">
              <span>Stack</span>
              <strong>React 19 · TS · Motion</strong>
            </div>
            <div className="info-row">
              <span>Best Use</span>
              <strong>
                {item.category === 'Backgrounds'
                  ? 'Hero / CTA'
                  : item.category === 'Templates'
                  ? 'Full Application'
                  : 'Product UI & Landing'}
              </strong>
            </div>
            <div className="info-divider" />
            <div className="info-tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="install-card">
            <div className="install-card-title">
              <span className="install-icon">
                <Component size={14} />
              </span>
              <strong>Get Started</strong>
            </div>
            <p>Install peer packages and drop the snippet into your project.</p>
            <code>pnpm add framer-motion lucide-react</code>
            <button onClick={copyInstallCommand}>
              {installCopied ? (
                <>
                  <Check size={13} /> Command Copied!
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy Command
                </>
              )}
            </button>
          </div>

          <div className="source-card">
            <span className="source-icon">
              <ExternalLink size={14} />
            </span>
            <strong>Official Aceternity Page</strong>
            <p>Visit the official documentation for additional variations.</p>
            <a href={item.source} target="_blank" rel="noreferrer">
              Open Aceternity <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="tip-card">
            <span>PRO TIP</span>
            <p>Tactile micro-animations retain users and elevate perception of quality.</p>
            <div className="tip-mark">✳</div>
          </div>
        </aside>
      </div>

      <FullscreenModal
        isOpen={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        title={item.name}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DemoPreview
            item={item}
            compact={false}
            motionEnabled={motionOn}
            hue={hue}
            speed={speed}
            customText={customText}
          />
        </div>
      </FullscreenModal>
    </main>
  )
}

function SearchPalette({ close }: { close: () => void }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const normalized = query.toLowerCase().trim()
  const results = allItems
    .filter(
      (item) =>
        !normalized ||
        [item.name, item.category, item.description, ...item.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalized)
    )
    .slice(0, 8)

  const go = (item: CatalogItem) => {
    sound.playClick()
    navigate(getPath(item))
    close()
  }

  return (
    <motion.div
      className="search-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <motion.div
        className="search-dialog"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.99 }}
        role="dialog"
        aria-modal="true"
        aria-label="Search the component library"
      >
        <div className="search-dialog-input">
          <Search size={17} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && results[0]) {
                event.preventDefault()
                go(results[0])
              }
            }}
            placeholder="Search 30+ components, effects, templates..."
          />
          <kbd>ESC</kbd>
        </div>
        <div className="search-dialog-label">
          {normalized ? `${results.length} RESULTS FOUND` : 'QUICK SUGGESTIONS'}
        </div>
        <div className="search-results">
          {results.map((item, index) => (
            <button key={item.slug} onClick={() => go(item)}>
              <span className={`result-icon result-${index % 4}`}>
                <Component size={15} />
              </span>
              <span className="result-copy">
                <strong>{item.name}</strong>
                <small>
                  {item.category} · {typeLabel[item.type]}
                </small>
              </span>
              <ArrowUpRight size={14} />
            </button>
          ))}
          {results.length === 0 && (
            <div className="search-no-results">No components match your query.</div>
          )}
        </div>
        <div className="search-dialog-footer">
          <span>
            <kbd>↵</kbd> to open
          </span>
          <span>ESC to close</span>
          <span>ACETERNITY UI EXPLORER</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function NotFound() {
  return (
    <main className="page-content not-found">
      <span className="tiny-label">404 / NOT FOUND</span>
      <h1>
        Page not found
        <br />
        <i>or moved.</i>
      </h1>
      <p>The component or page you are looking for does not exist.</p>
      <Link to="/components">
        Browse Components <ArrowRight size={14} />
      </Link>
    </main>
  )
}

export default App
