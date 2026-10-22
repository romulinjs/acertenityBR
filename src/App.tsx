import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronDown, ChevronRight,
  Command, Component, Copy, ExternalLink, Grid2X2, Layers3, Menu, Search, Sparkles,
  X,
} from 'lucide-react'
import {
  BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams, useSearchParams,
} from 'react-router-dom'
import { CodeBlock } from './components/CodeBlock'
import { DemoPreview } from './components/DemoPreview'
import { allItems, categories, catalogItems, snippetsFor, templateItems, type CatalogItem } from './data/catalog'
import { copyText } from './clipboard'

const typeLabel: Record<CatalogItem['type'], string> = {
  component: 'Component', effect: 'Effect', block: 'Section', template: 'Template',
}

function getPath(item: CatalogItem) {
  return `/${item.type === 'template' ? 'templates' : 'components'}/${item.slug}`
}

function App() {
  const [saved, setSaved] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('aceui-saved') ?? '[]') as string[] } catch { return [] }
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => { localStorage.setItem('aceui-saved', JSON.stringify(saved)) }, [saved])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((value) => !value)
      }
      if (event.key === 'Escape') { setSearchOpen(false); setMobileOpen(false) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const toggleSaved = (slug: string) => setSaved((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug])

  return <BrowserRouter>
    <div className="app-frame">
      <Sidebar savedCount={saved.length} mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} />
      <div className="app-main">
        <TopBar openSearch={() => setSearchOpen(true)} toggleMobile={() => setMobileOpen((value) => !value)} />
        <Routes>
          <Route path="/" element={<CatalogPage saved={saved} toggleSaved={toggleSaved} />} />
          <Route path="/components/:slug" element={<ItemPage saved={saved} toggleSaved={toggleSaved} />} />
          <Route path="/templates/:slug" element={<ItemPage saved={saved} toggleSaved={toggleSaved} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
      <AnimatePresence>{searchOpen && <SearchPalette close={() => setSearchOpen(false)} />}</AnimatePresence>
      {mobileOpen && <button className="mobile-scrim" aria-label="Fechar menu" onClick={() => setMobileOpen(false)} />}
    </div>
  </BrowserRouter>
}

function Sidebar({ savedCount, mobileOpen, closeMobile }: { savedCount: number; mobileOpen: boolean; closeMobile: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [openCategories, setOpenCategories] = useState(true)
  const params = new URLSearchParams(location.search)
  const activeCategory = params.get('category')
  const savedActive = params.get('saved') === '1'
  const choose = (query: string) => { navigate(`/${query}`); closeMobile() }

  return <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
    <div className="brand-row">
      <Link to="/" className="brand-lockup" onClick={closeMobile}>
        <span className="brand-mark"><i /><i /><i /><i /></span>
        <span><strong>aceternity</strong><small>component explorer</small></span>
      </Link>
      <button className="sidebar-close" aria-label="Close menu" onClick={closeMobile}><X size={16} /></button>
    </div>
    <div className="sidebar-scroll">
      <div className="side-label">WORKSPACE</div>
      <button className={`side-link ${location.pathname === '/' && !activeCategory && !savedActive ? 'side-active' : ''}`} onClick={() => choose('')}><Grid2X2 size={16} /><span>Discover</span><span className="side-count">{allItems.length}</span></button>
      <button className={`side-link ${savedActive ? 'side-active' : ''}`} onClick={() => choose('?saved=1')}><Bookmark size={16} /><span>Saved collection</span><span className="side-count">{savedCount}</span></button>
      <div className="side-divider" />
      <button className="side-section-trigger" onClick={() => setOpenCategories((value) => !value)}><span className="side-label">LIBRARY</span><ChevronDown size={14} className={openCategories ? '' : 'chevron-closed'} /></button>
      <AnimatePresence initial={false}>{openCategories && <motion.div className="side-categories" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
        {categories.filter((category) => category !== 'Templates').map((category) => {
          const count = catalogItems.filter((item) => item.category === category).length
          return <button key={category} className={`side-link side-category ${activeCategory === category ? 'side-active' : ''}`} onClick={() => choose(`?category=${encodeURIComponent(category)}`)}>
            <span className="category-dot" /><span>{category}</span><span className="side-count">{count}</span>
          </button>
        })}
        <button className={`side-link side-category ${params.get('view') === 'templates' ? 'side-active' : ''}`} onClick={() => choose('?view=templates')}><span className="category-dot category-dot-template" /><span>Templates</span><span className="side-count">{templateItems.length}</span></button>
      </motion.div>}</AnimatePresence>
      <div className="side-divider" />
      <div className="side-label">REFERENCE</div>
      <a className="side-link side-external" href="https://ui.aceternity.com/components" target="_blank" rel="noreferrer"><ExternalLink size={15} /><span>Aceternity UI</span><ArrowUpRight size={12} /></a>
      <div className="sidebar-note"><span className="note-icon"><Sparkles size={13} /></span><strong>A library in motion.</strong><p>Patterns to explore, remix, and make your own.</p><span className="note-foot">INDEPENDENT COMPONENT STUDY · 2026</span></div>
    </div>
    <div className="sidebar-bottom"><span className="online-indicator" /> <span>Local component library</span><span className="version-tag">v1.0</span></div>
  </aside>
}

function TopBar({ openSearch, toggleMobile }: { openSearch: () => void; toggleMobile: () => void }) {
  const location = useLocation()
  const pathTitle = location.pathname.startsWith('/templates/') ? 'Templates' : location.pathname.startsWith('/components/') ? 'Components' : 'Discover'
  return <header className="topbar">
    <div className="topbar-left"><button className="mobile-menu-button" aria-label="Open navigation" onClick={toggleMobile}><Menu size={18} /></button><span className="topbar-crumb">Library</span><ChevronRight size={13} /><span className="topbar-current">{pathTitle}</span></div>
    <div className="topbar-actions">
      <button className="top-search" onClick={openSearch}><Search size={15} /><span>Search components...</span><kbd><Command size={11} /> K</kbd></button>
      <span className="topbar-divider" />
      <a className="topbar-version" href="https://ui.aceternity.com/components" target="_blank" rel="noreferrer">Reference <ArrowUpRight size={12} /></a>
    </div>
  </header>
}

function CatalogPage({ saved, toggleSaved }: { saved: string[]; toggleSaved: (slug: string) => void }) {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const view = params.get('view') ?? 'all'
  const activeCategory = params.get('category') ?? ''
  const savedOnly = params.get('saved') === '1'

  const visible = useMemo(() => {
    let source = view === 'templates' ? templateItems : view === 'components' ? catalogItems : allItems
    if (savedOnly) source = source.filter((item) => saved.includes(item.slug))
    if (activeCategory) source = source.filter((item) => item.category === activeCategory)
    const normalized = query.trim().toLowerCase()
    if (normalized) source = source.filter((item) => [item.name, item.category, item.description, ...item.tags].join(' ').toLowerCase().includes(normalized))
    return [...source].sort((a, b) => sort === 'az' ? a.name.localeCompare(b.name) : Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  }, [activeCategory, query, saved, savedOnly, sort, view])

  const setView = (next: string) => {
    const nextParams = new URLSearchParams(params)
    if (next === 'all') nextParams.delete('view'); else nextParams.set('view', next)
    nextParams.delete('saved')
    setParams(nextParams)
  }
  const setCategory = (category: string) => {
    const nextParams = new URLSearchParams(params)
    if (category === activeCategory) nextParams.delete('category'); else nextParams.set('category', category)
    nextParams.delete('saved')
    setParams(nextParams)
  }
  const clearFilters = () => { setParams(new URLSearchParams()); setQuery('') }

  return <main className="page-content catalog-page">
    <section className="catalog-hero">
      <div className="hero-grid-bg" /><div className="hero-orb hero-orb-a" /><div className="hero-orb hero-orb-b" />
      <div className="hero-copy-main">
        <div className="eyebrow-pill"><span className="pulse-dot" /> CURATED COMPONENT LIBRARY <span className="pill-divider" /> REACT · MOTION</div>
        <h1>Make interfaces<br />feel <span>different.</span></h1>
        <p>Thoughtful components, expressive motion, and full-page starting points — made to be explored and remixed.</p>
        <div className="hero-buttons"><button onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>Explore the library <ArrowRight size={15} /></button><button className="hero-secondary" onClick={() => setView('templates')}>Browse templates <ArrowUpRight size={14} /></button></div>
        <div className="hero-footnotes"><span><i className="tiny-check"><Check size={9} /></i> Built for modern interfaces</span><span><i className="tiny-check"><Check size={9} /></i> Motion-ready patterns</span></div>
      </div>
      <motion.div className="hero-feature" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
        <div className="hero-feature-head"><span><Sparkles size={13} /> FEATURED PREVIEW</span><span className="preview-live"><i /> LIVE</span></div>
        <DemoPreview item={catalogItems[0]} />
        <div className="hero-feature-caption"><div><strong>Aurora Background</strong><span>Ambient color · slow motion</span></div><Link to={getPath(catalogItems[0])} aria-label="View Aurora Background"><ArrowUpRight size={16} /></Link></div>
      </motion.div>
      <div className="hero-stats"><div><strong>{catalogItems.length}</strong><span>component studies</span></div><i /><div><strong>{categories.length}</strong><span>collections</span></div><i /><div><strong>{templateItems.length}</strong><span>page starters</span></div></div>
    </section>

    <section className="catalog-section" id="catalog">
      <div className="section-heading-row"><div><div className="section-kicker">THE LIBRARY <span> / 01</span></div><h2>{savedOnly ? 'Your saved collection' : view === 'templates' ? 'Full-page templates' : activeCategory || 'Browse the collection'}</h2><p>{savedOnly ? 'A personal shortlist of patterns to come back to.' : 'Explore the building blocks behind expressive digital experiences.'}</p></div><div className="section-count"><strong>{visible.length.toString().padStart(2, '0')}</strong><span>items<br />available</span></div></div>
      <div className="catalog-controls">
        <div className="view-switch" role="tablist" aria-label="Content type">
          <button className={view === 'all' && !savedOnly ? 'active' : ''} onClick={() => setView('all')}><Grid2X2 size={14} /> All items <span>{allItems.length}</span></button>
          <button className={view === 'components' ? 'active' : ''} onClick={() => setView('components')}><Component size={14} /> Components <span>{catalogItems.length}</span></button>
          <button className={view === 'templates' ? 'active' : ''} onClick={() => setView('templates')}><Layers3 size={14} /> Templates <span>{templateItems.length}</span></button>
        </div>
        <div className="catalog-toolbar"><label className="inline-search"><Search size={15} /><input aria-label="Search the library" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, category, tag..." />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={13} /></button>}</label><label className="sort-select"><span>Sort:</span><select aria-label="Sort items" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="az">A to Z</option></select><ChevronDown size={12} /></label></div>
      </div>
      {!savedOnly && <div className="category-chips"><button className={!activeCategory ? 'active' : ''} onClick={() => setCategory('')}>All categories</button>{categories.filter((category) => view !== 'templates' ? category !== 'Templates' : category === 'Templates').map((category) => <button className={activeCategory === category ? 'active' : ''} key={category} onClick={() => setCategory(category)}>{category}<span>{allItems.filter((item) => item.category === category).length}</span></button>)}</div>}
      {(query || activeCategory || savedOnly) && <div className="filter-summary"><span>Showing <strong>{visible.length}</strong> matching {visible.length === 1 ? 'item' : 'items'}{query && <> for <strong>“{query}”</strong></>}{activeCategory && <> in <strong>{activeCategory}</strong></>}</span><button onClick={clearFilters}>Clear filters <X size={12} /></button></div>}
      {visible.length ? <motion.div className="catalog-grid" layout>
        <AnimatePresence mode="popLayout">{visible.map((item, index) => <CatalogCard item={item} key={item.slug} saved={saved.includes(item.slug)} toggleSaved={toggleSaved} index={index} />)}</AnimatePresence>
      </motion.div> : <div className="empty-state"><div className="empty-icon"><Search size={20} /></div><h3>{savedOnly ? 'Nothing saved just yet.' : 'No matches in this corner.'}</h3><p>{savedOnly ? 'Use the bookmark on any card to build a collection.' : 'Try another name, category, or keyword.'}</p><button onClick={clearFilters}>Reset the view <ArrowRight size={14} /></button></div>}
    </section>
    <section className="closing-banner"><div className="closing-glow" /><div className="closing-icon"><Sparkles size={17} /></div><div><span className="tiny-label">A STARTING POINT, NOT A FINISH LINE</span><h2>Make it your own.</h2><p>Use these patterns to start quickly, then shape every detail around your product.</p></div><a href="https://ui.aceternity.com/components" target="_blank" rel="noreferrer">Explore the source <ArrowUpRight size={15} /></a></section>
  </main>
}

function CatalogCard({ item, saved, toggleSaved, index }: { item: CatalogItem; saved: boolean; toggleSaved: (slug: string) => void; index: number }) {
  const stop = (event: MouseEvent) => event.stopPropagation()
  return <motion.article className="catalog-card" layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .22, delay: Math.min(index % 6, 5) * .025 }}>
    <div className="catalog-card-preview"><div className="card-preview-link"><DemoPreview item={item} compact /></div><button className={`save-button ${saved ? 'saved' : ''}`} onClick={(event) => { stop(event); toggleSaved(item.slug) }} aria-label={saved ? 'Remove from saved' : 'Save item'} title={saved ? 'Remove from saved' : 'Save for later'}><Bookmark size={14} fill={saved ? 'currentColor' : 'none'} /></button><span className="card-kind">{typeLabel[item.type]}</span></div>
    <div className="catalog-card-content"><div className="card-title-row"><Link to={getPath(item)} className="card-title">{item.name}</Link><Link to={getPath(item)} className="card-open" aria-label={`Open ${item.name}`}><ArrowUpRight size={15} /></Link></div><p>{item.description}</p><div className="card-tags"><span className="category-label">{item.category}</span>{item.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div></div>
  </motion.article>
}

function ItemPage({ saved, toggleSaved }: { saved: string[]; toggleSaved: (slug: string) => void }) {
  const { slug = '' } = useParams()
  const isTemplateRoute = useLocation().pathname.startsWith('/templates/')
  const item = allItems.find((entry) => entry.slug === slug && (isTemplateRoute ? entry.type === 'template' : entry.type !== 'template'))
  const navigate = useNavigate()
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [hue, setHue] = useState(0)
  const [motionOn, setMotionOn] = useState(true)
  const [notice, setNotice] = useState(false)
  const [installCopied, setInstallCopied] = useState(false)
  if (!item) return <NotFound />
  const snippet = snippetsFor(item)
  const isSaved = saved.includes(item.slug)
  const related = allItems.filter((entry) => entry.slug !== item.slug && (entry.category === item.category || entry.tags.some((tag) => item.tags.includes(tag)))).slice(0, 4)
  const styleVars = { filter: `hue-rotate(${hue}deg)`, opacity: 'var(--demo-opacity, 1)' } as CSSProperties

  async function shareItem() {
    const url = `${window.location.origin}${getPath(item as CatalogItem)}`
    const copied = await copyText(url)
    setNotice(copied)
    if (copied) window.setTimeout(() => setNotice(false), 1800)
  }

  async function copyInstallCommand() {
    const copied = await copyText('pnpm add framer-motion')
    setInstallCopied(copied)
    if (copied) window.setTimeout(() => setInstallCopied(false), 1800)
  }

  return <main className="page-content detail-page">
    <div className="detail-breadcrumb"><button onClick={() => navigate(-1)}><ArrowLeft size={14} /> Back to library</button><ChevronRight size={13} /><span>{item.category}</span><ChevronRight size={13} /><span className="breadcrumb-current">{item.name}</span></div>
    <section className="detail-heading"><div className="detail-heading-copy"><div className="detail-eyebrow"><span className={`type-pill type-${item.type}`}>{typeLabel[item.type]}</span><span className="detail-category">{item.category}</span><span className="detail-separator">/</span><span>React + Motion</span></div><h1>{item.name}</h1><p>{item.description}</p><div className="detail-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="detail-actions"><button className={`detail-icon-button ${isSaved ? 'saved' : ''}`} onClick={() => toggleSaved(item.slug)} aria-label="Save item"><Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} /><span>{isSaved ? 'Saved' : 'Save'}</span></button><button className="detail-icon-button" onClick={shareItem}><Copy size={14} /><span>{notice ? 'Copied' : 'Share'}</span></button><a className="source-link" href={item.source} target="_blank" rel="noreferrer">Source <ArrowUpRight size={13} /></a></div></section>

    <div className="detail-layout">
      <div className="detail-main-column">
        <div className="detail-panel-header"><div className="preview-tabs" role="tablist"><button role="tab" aria-selected={tab === 'preview'} className={tab === 'preview' ? 'active' : ''} onClick={() => setTab('preview')}>Preview</button><button role="tab" aria-selected={tab === 'code'} className={tab === 'code' ? 'active' : ''} onClick={() => setTab('code')}>Code <span>3 files</span></button></div><div className="live-preview-label"><span className="preview-live"><i /> {tab === 'preview' ? 'LIVE PREVIEW' : 'SOURCE VIEW'}</span><span className="panel-divider" /><button onClick={() => setMotionOn((value) => !value)} className={`motion-toggle ${motionOn ? 'on' : ''}`}><span /> Motion {motionOn ? 'on' : 'off'}</button></div></div>
        {tab === 'preview' ? <div className="preview-stage" data-motion={motionOn ? 'on' : 'off'} style={styleVars}><DemoPreview item={item} motionEnabled={motionOn} /><div className="preview-stage-footer"><span><MousePointer2Icon /> {item.demo === 'ripple' || item.demo === 'comparison' ? 'Try the controls inside the preview' : 'Move your cursor or select a control to explore'}</span><span>RESPONSIVE PREVIEW</span></div></div> : <CodeBlock files={snippet} />}
        {tab === 'preview' && <div className="preview-controls"><div><span className="control-label">COLOR TONE</span><div className="hue-swatches">{[0, 32, 100, 178, 250].map((value, index) => <button key={value} aria-label={`Apply color preset ${index + 1}`} className={hue === value ? 'selected' : ''} style={{ '--swatch-hue': `${value}deg` } as CSSProperties} onClick={() => setHue(value)} />)}</div></div><div className="control-note"><span className="control-label">INTERACTION</span><span>{item.demo === 'ripple' || item.demo === 'comparison' ? 'Click or drag to interact' : 'Hover, focus, and scroll states'}</span></div></div>}
        <div className="detail-description"><div><span className="section-kicker">ABOUT THIS PATTERN <span>/ 01</span></span><h2>A small detail.<br /><i>A different feeling.</i></h2></div><p>{item.description} This independent preview shows how the pattern can be adapted to a real product. Use the example as a starting point, then tune content, color, motion, and layout to suit your interface.</p></div>
        <section className="related-section"><div className="related-heading"><div><span className="section-kicker">KEEP EXPLORING <span>/ 02</span></span><h2>Related patterns</h2></div><Link to="/">View all <ArrowRight size={14} /></Link></div><div className="related-grid">{related.map((entry) => <article className="related-card" key={entry.slug}><div className="related-art"><DemoPreview item={entry} compact /></div><Link className="related-meta" to={getPath(entry)}><span>{entry.category}</span><strong>{entry.name}</strong><ArrowUpRight size={14} /></Link></article>)}</div></section>
      </div>
      <aside className="detail-sidebar"><div className="info-card"><span className="section-kicker">AT A GLANCE</span><div className="info-row"><span>Collection</span><strong>{item.category}</strong></div><div className="info-row"><span>Pattern type</span><strong>{typeLabel[item.type]}</strong></div><div className="info-row"><span>Built with</span><strong>React · CSS · Motion</strong></div><div className="info-row"><span>Suggested use</span><strong>{item.category === 'Backgrounds' ? 'Hero / CTA' : item.category === 'Templates' ? 'Full page' : 'Product UI'}</strong></div><div className="info-divider" /><div className="info-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="install-card"><div className="install-card-title"><span className="install-icon"><Component size={14} /></span><strong>Start building</strong></div><p>A code sample is ready to explore. Adapt it to your app's structure.</p><code>pnpm add framer-motion</code><button onClick={copyInstallCommand}>{installCopied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy install command</>}</button></div><div className="source-card"><span className="source-icon"><ExternalLink size={14} /></span><strong>Explore the reference</strong><p>Open the original component page for source documentation and published variants.</p><a href={item.source} target="_blank" rel="noreferrer">Open reference <ArrowUpRight size={13} /></a></div><div className="tip-card"><span>PRO TIP</span><p>Small motion works best when it supports the content instead of competing with it.</p><div className="tip-mark">✳</div></div></aside>
    </div>
  </main>
}

function MousePointer2Icon() { return <span className="mouse-pointer-inline"><Command size={12} /></span> }

function SearchPalette({ close }: { close: () => void }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const normalized = query.toLowerCase().trim()
  const results = allItems.filter((item) => !normalized || [item.name, item.category, item.description, ...item.tags].join(' ').toLowerCase().includes(normalized)).slice(0, 8)
  const go = (item: CatalogItem) => { navigate(getPath(item)); close() }
  return <motion.div className="search-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
    <motion.div className="search-dialog" initial={{ opacity: 0, y: -12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .99 }} role="dialog" aria-modal="true" aria-label="Search the component library">
      <div className="search-dialog-input"><Search size={17} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && results[0]) { event.preventDefault(); go(results[0]) } }} placeholder="Search components, effects, templates..." /><kbd>ESC</kbd></div>
      <div className="search-dialog-label">{normalized ? `${results.length} RESULTS` : 'SUGGESTED FOR YOU'}</div>
      <div className="search-results">{results.map((item, index) => <button key={item.slug} onClick={() => go(item)}><span className={`result-icon result-${index % 4}`}><Component size={15} /></span><span className="result-copy"><strong>{item.name}</strong><small>{item.category} · {typeLabel[item.type]}</small></span><ArrowUpRight size={14} /></button>)}{results.length === 0 && <div className="search-no-results">No patterns match this search.</div>}</div>
      <div className="search-dialog-footer"><span><kbd>↵</kbd> to open</span><span>ESC to close</span><span>EXPLORE THE LIBRARY</span></div>
    </motion.div>
  </motion.div>
}

function NotFound() {
  return <main className="page-content not-found"><span className="tiny-label">404 / OFF THE MAP</span><h1>Nothing here<br /><i>just yet.</i></h1><p>This pattern may have moved. The rest of the library is still right where you left it.</p><Link to="/">Back to the library <ArrowRight size={14} /></Link></main>
}

function Footer() {
  return <footer className="site-footer"><span>AC / UI EXPLORER <i>·</i> AN INDEPENDENT COMPONENT STUDY</span><span>BUILT FOR THE DETAILS THAT MOVE <Sparkles size={12} /></span></footer>
}

export default App
