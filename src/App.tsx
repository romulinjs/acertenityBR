import { useEffect, useMemo, useState } from 'react'
import type { MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronDown, ChevronRight,
  Command, Component, Copy, ExternalLink, Grid2X2, Layers3, Maximize2, Menu,
  Search, Sparkles, Volume2, VolumeX, X,
} from 'lucide-react'
import {
  BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams, useSearchParams,
} from 'react-router-dom'
import { CodeBlock } from './components/CodeBlock'
import { DemoPreview } from './components/DemoPreview'
import { FullscreenModal } from './components/FullscreenModal'
import { allItems, categories, catalogItems, snippetsFor, templateItems, type CatalogItem } from './data/catalog'
import { copyText } from './clipboard'
import { sound } from './utils/audio'

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
  const [audioEnabled, setAudioEnabled] = useState(() => sound.enabled)

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

  const toggleSaved = (slug: string) => {
    sound.playPop()
    setSaved((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug])
  }

  const toggleSound = () => {
    const next = sound.toggle()
    setAudioEnabled(next)
  }

  return <BrowserRouter>
    <div className="app-frame">
      <Sidebar savedCount={saved.length} mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} />
      <div className="app-main">
        <TopBar
          openSearch={() => setSearchOpen(true)}
          toggleMobile={() => setMobileOpen((value) => !value)}
          audioEnabled={audioEnabled}
          toggleSound={toggleSound}
        />
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
  const choose = (query: string) => { sound.playClick(650, 0.02); navigate(`/${query}`); closeMobile() }

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
      <div className="sidebar-note"><span className="note-icon"><Sparkles size={13} /></span><strong>Componentes Vivos.</strong><p>Padrões interativos, física de animação e alta fidelidade.</p><span className="note-foot">ACETERNITY EXPLORER · 2026</span></div>
    </div>
    <div className="sidebar-bottom"><span className="online-indicator" /> <span>Local live library</span><span className="version-tag">v2.0</span></div>
  </aside>
}

function TopBar({
  openSearch,
  toggleMobile,
  audioEnabled,
  toggleSound,
}: {
  openSearch: () => void
  toggleMobile: () => void
  audioEnabled: boolean
  toggleSound: () => void
}) {
  const location = useLocation()
  const pathTitle = location.pathname.startsWith('/templates/') ? 'Templates' : location.pathname.startsWith('/components/') ? 'Components' : 'Discover'
  return <header className="topbar">
    <div className="topbar-left"><button className="mobile-menu-button" aria-label="Open navigation" onClick={toggleMobile}><Menu size={18} /></button><span className="topbar-crumb">Library</span><ChevronRight size={13} /><span className="topbar-current">{pathTitle}</span></div>
    <div className="topbar-actions">
      <button className="top-search" onClick={openSearch}><Search size={15} /><span>Search components...</span><kbd><Command size={11} /> K</kbd></button>
      <button
        onClick={toggleSound}
        className="sound-toggle-btn"
        title={audioEnabled ? 'Desativar sons táteis' : 'Ativar sons táteis'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: audioEnabled ? 'rgba(167, 139, 250, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          border: audioEnabled ? '1px solid rgba(167, 139, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '6px 9px',
          color: audioEnabled ? '#c4b5fd' : '#94a3b8',
          fontSize: '11px',
          cursor: 'pointer',
        }}
      >
        {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        <span style={{ fontSize: '10px', fontFamily: 'var(--mono)' }}>{audioEnabled ? 'Áudio On' : 'Áudio'}</span>
      </button>
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
    sound.playClick()
    const nextParams = new URLSearchParams(params)
    if (next === 'all') nextParams.delete('view'); else nextParams.set('view', next)
    nextParams.delete('saved')
    setParams(nextParams)
  }
  const setCategory = (category: string) => {
    sound.playClick()
    const nextParams = new URLSearchParams(params)
    if (category === activeCategory) nextParams.delete('category'); else nextParams.set('category', category)
    nextParams.delete('saved')
    setParams(nextParams)
  }
  const clearFilters = () => { sound.playClick(); setParams(new URLSearchParams()); setQuery('') }

  return <main className="page-content catalog-page">
    <section className="catalog-hero">
      <div className="hero-grid-bg" /><div className="hero-orb hero-orb-a" /><div className="hero-orb hero-orb-b" />
      <div className="hero-copy-main">
        <div className="eyebrow-pill"><span className="pulse-dot" /> CURATED COMPONENT LIBRARY <span className="pill-divider" /> REACT · CANVAS · MOTION</div>
        <h1>Make interfaces<br />feel <span>different.</span></h1>
        <p>Biblioteca interativa com física de movimento, renderização gráfica avançada e código de produção correspondente ao que você vê na tela.</p>
        <div className="hero-buttons">
          <button onClick={() => { sound.playClick(); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Explorar catálogo vivo <ArrowRight size={15} />
          </button>
          <button className="hero-secondary" onClick={() => setView('templates')}>
            Ver templates <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="hero-footnotes">
          <span><i className="tiny-check"><Check size={9} /></i> Demos táteis com física real</span>
          <span><i className="tiny-check"><Check size={9} /></i> Efeitos em Canvas 2D & Framer Motion</span>
        </div>
      </div>
      <motion.div className="hero-feature" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
        <div className="hero-feature-head"><span><Sparkles size={13} /> FEATURED PREVIEW</span><span className="preview-live"><i /> LIVE INTERACTION</span></div>
        <DemoPreview item={catalogItems[0]} />
        <div className="hero-feature-caption"><div><strong>Aurora Background</strong><span>Ambient color · smooth motion</span></div><Link to={getPath(catalogItems[0])} aria-label="View Aurora Background"><ArrowUpRight size={16} /></Link></div>
      </motion.div>
      <div className="hero-stats"><div><strong>{catalogItems.length}</strong><span>componentes</span></div><i /><div><strong>{categories.length}</strong><span>coleções</span></div><i /><div><strong>{templateItems.length}</strong><span>templates</span></div></div>
    </section>

    <section className="catalog-section" id="catalog">
      <div className="section-heading-row"><div><div className="section-kicker">THE LIBRARY <span> / 01</span></div><h2>{savedOnly ? 'Sua coleção salva' : view === 'templates' ? 'Templates em página cheia' : activeCategory || 'Explorar componentes'}</h2><p>{savedOnly ? 'Sua seleção pessoal para acesso rápido.' : 'Passe o cursor sobre os cards ou abra qualquer item para testar os controles ao vivo.'}</p></div><div className="section-count"><strong>{visible.length.toString().padStart(2, '0')}</strong><span>itens<br />disponíveis</span></div></div>
      <div className="catalog-controls">
        <div className="view-switch" role="tablist" aria-label="Content type">
          <button className={view === 'all' && !savedOnly ? 'active' : ''} onClick={() => setView('all')}><Grid2X2 size={14} /> Todos <span>{allItems.length}</span></button>
          <button className={view === 'components' ? 'active' : ''} onClick={() => setView('components')}><Component size={14} /> Componentes <span>{catalogItems.length}</span></button>
          <button className={view === 'templates' ? 'active' : ''} onClick={() => setView('templates')}><Layers3 size={14} /> Templates <span>{templateItems.length}</span></button>
        </div>
        <div className="catalog-toolbar"><label className="inline-search"><Search size={15} /><input aria-label="Search the library" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar por nome, categoria, tag..." />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={13} /></button>}</label><label className="sort-select"><span>Ordem:</span><select aria-label="Sort items" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Destaques</option><option value="az">A a Z</option></select><ChevronDown size={12} /></label></div>
      </div>
      {!savedOnly && <div className="category-chips"><button className={!activeCategory ? 'active' : ''} onClick={() => setCategory('')}>Todas as categorias</button>{categories.filter((category) => view !== 'templates' ? category !== 'Templates' : category === 'Templates').map((category) => <button className={activeCategory === category ? 'active' : ''} key={category} onClick={() => setCategory(category)}>{category}<span>{allItems.filter((item) => item.category === category).length}</span></button>)}</div>}
      {(query || activeCategory || savedOnly) && <div className="filter-summary"><span>Exibindo <strong>{visible.length}</strong> {visible.length === 1 ? 'item' : 'itens'}{query && <> para <strong>“{query}”</strong></>}{activeCategory && <> na categoria <strong>{activeCategory}</strong></>}</span><button onClick={clearFilters}>Limpar filtros <X size={12} /></button></div>}
      {visible.length ? <motion.div className="catalog-grid" layout>
        <AnimatePresence mode="popLayout">{visible.map((item, index) => <CatalogCard item={item} key={item.slug} saved={saved.includes(item.slug)} toggleSaved={toggleSaved} index={index} onTagClick={(tag) => setQuery(tag)} />)}</AnimatePresence>
      </motion.div> : <div className="empty-state"><div className="empty-icon"><Search size={20} /></div><h3>{savedOnly ? 'Nenhum item salvo ainda.' : 'Nenhum resultado encontrado.'}</h3><p>{savedOnly ? 'Use o ícone de bookmark nos cards para salvar.' : 'Tente pesquisar com outro termo ou limpar os filtros.'}</p><button onClick={clearFilters}>Redefinir visualização <ArrowRight size={14} /></button></div>}
    </section>
    <section className="closing-banner"><div className="closing-glow" /><div className="closing-icon"><Sparkles size={17} /></div><div><span className="tiny-label">PRONTO PARA USAR EM PRODUÇÃO</span><h2>Adapte ao seu design.</h2><p>Copie os trechos de código com React e Framer Motion diretamente para o seu projeto.</p></div><a href="https://ui.aceternity.com/components" target="_blank" rel="noreferrer">Ver documentação original <ArrowUpRight size={15} /></a></section>
  </main>
}

function CatalogCard({
  item,
  saved,
  toggleSaved,
  index,
  onTagClick,
}: {
  item: CatalogItem
  saved: boolean
  toggleSaved: (slug: string) => void
  index: number
  onTagClick: (tag: string) => void
}) {
  const stop = (event: MouseEvent) => event.stopPropagation()
  return <motion.article className="catalog-card" layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .22, delay: Math.min(index % 6, 5) * .025 }}>
    <div className="catalog-card-preview">
      <Link to={getPath(item)} className="card-preview-link" onClick={() => sound.playClick(750, 0.02)}>
        <DemoPreview item={item} compact />
      </Link>
      <button className={`save-button ${saved ? 'saved' : ''}`} onClick={(event) => { stop(event); toggleSaved(item.slug) }} aria-label={saved ? 'Remove from saved' : 'Save item'} title={saved ? 'Remover dos salvos' : 'Salvar para depois'}><Bookmark size={14} fill={saved ? 'currentColor' : 'none'} /></button>
      <span className="card-kind">{typeLabel[item.type]}</span>
    </div>
    <div className="catalog-card-content">
      <div className="card-title-row">
        <Link to={getPath(item)} className="card-title" onClick={() => sound.playClick(750, 0.02)}>{item.name}</Link>
        <Link to={getPath(item)} className="card-open" aria-label={`Open ${item.name}`} onClick={() => sound.playClick(750, 0.02)}><ArrowUpRight size={15} /></Link>
      </div>
      <p>{item.description}</p>
      <div className="card-tags">
        <span className="category-label">{item.category}</span>
        {item.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              sound.playClick()
              onTagClick(tag)
            }}
            style={{ cursor: 'pointer' }}
            title={`Filtrar por ${tag}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.article>
}

function ItemPage({ saved, toggleSaved }: { saved: string[]; toggleSaved: (slug: string) => void }) {
  const { slug = '' } = useParams()
  const isTemplateRoute = useLocation().pathname.startsWith('/templates/')
  const item = allItems.find((entry) => entry.slug === slug && (isTemplateRoute ? entry.type === 'template' : entry.type !== 'template'))
  const navigate = useNavigate()
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [hue, setHue] = useState(265) // Cor base violeta moderna
  const [speed, setSpeed] = useState(1)
  const [customText, setCustomText] = useState('')
  const [motionOn, setMotionOn] = useState(true)
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const [notice, setNotice] = useState(false)
  const [installCopied, setInstallCopied] = useState(false)

  if (!item) return <NotFound />
  const snippet = snippetsFor(item)
  const isSaved = saved.includes(item.slug)
  const related = allItems.filter((entry) => entry.slug !== item.slug && (entry.category === item.category || entry.tags.some((tag) => item.tags.includes(tag)))).slice(0, 4)

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

  const isTextComponent = ['text', 'flip', 'typewriter', 'encrypted', 'squiggle', 'hero-highlight'].includes(item.demo)

  return <main className="page-content detail-page">
    <div className="detail-breadcrumb"><button onClick={() => { sound.playClick(); navigate(-1) }}><ArrowLeft size={14} /> Voltar à biblioteca</button><ChevronRight size={13} /><span>{item.category}</span><ChevronRight size={13} /><span className="breadcrumb-current">{item.name}</span></div>
    <section className="detail-heading">
      <div className="detail-heading-copy">
        <div className="detail-eyebrow"><span className={`type-pill type-${item.type}`}>{typeLabel[item.type]}</span><span className="detail-category">{item.category}</span><span className="detail-separator">/</span><span>React + Framer Motion</span></div>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <div className="detail-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="detail-actions">
        <button
          className="detail-icon-button"
          onClick={() => {
            sound.playWhoosh()
            setFullscreenOpen(true)
          }}
          title="Abrir em tela cheia (Modo Cinema)"
          style={{ background: 'rgba(167, 139, 250, 0.12)', borderColor: 'rgba(167, 139, 250, 0.3)', color: '#c4b5fd' }}
        >
          <Maximize2 size={14} />
          <span>Modo Cinema</span>
        </button>
        <button className={`detail-icon-button ${isSaved ? 'saved' : ''}`} onClick={() => toggleSaved(item.slug)} aria-label="Save item"><Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} /><span>{isSaved ? 'Salvo' : 'Salvar'}</span></button>
        <button className="detail-icon-button" onClick={shareItem}><Copy size={14} /><span>{notice ? 'Copiado!' : 'Compartilhar'}</span></button>
        <a className="source-link" href={item.source} target="_blank" rel="noreferrer">Referência Original <ArrowUpRight size={13} /></a>
      </div>
    </section>

    <div className="detail-layout">
      <div className="detail-main-column">
        <div className="detail-panel-header">
          <div className="preview-tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'preview'} className={tab === 'preview' ? 'active' : ''} onClick={() => { sound.playClick(); setTab('preview') }}>Preview Interativo</button>
            <button role="tab" aria-selected={tab === 'code'} className={tab === 'code' ? 'active' : ''} onClick={() => { sound.playClick(); setTab('code') }}>Código Fonte <span>3 arquivos</span></button>
          </div>
          <div className="live-preview-label">
            <span className="preview-live"><i /> {tab === 'preview' ? 'LIVE COMPONENT' : 'SOURCE CODE'}</span>
            <span className="panel-divider" />
            <button onClick={() => { sound.playClick(); setMotionOn((value) => !value) }} className={`motion-toggle ${motionOn ? 'on' : ''}`}><span /> Motion {motionOn ? 'on' : 'off'}</button>
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
              <span><MousePointer2Icon /> Interaja com o mouse para sentir a física e animação</span>
              <span>RENDERIZAÇÃO VIVA</span>
            </div>
          </div>
        ) : (
          <CodeBlock files={snippet} />
        )}

        {/* Painel de Controles Vivos no Detalhe */}
        {tab === 'preview' && (
          <div className="preview-controls" style={{ flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="control-label">ESQUEMA DE CORES</span>
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
                    aria-label={`Aplicar tom ${swatch.name}`}
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
              <span className="control-label">VELOCIDADE</span>
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
                <span className="control-label">TEXTO PERSONALIZADO</span>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Digite seu texto aqui..."
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
              <span className="control-label">ESTADO INTERATIVO</span>
              <span style={{ fontSize: '11px' }}>Física 60fps & Framer Motion</span>
            </div>
          </div>
        )}

        <div className="detail-description">
          <div>
            <span className="section-kicker">SOBRE ESTE COMPONENTE <span>/ 01</span></span>
            <h2>Fidelidade real.<br /><i>Pronto para produção.</i></h2>
          </div>
          <p>
            {item.description} Esta demonstração foi desenvolvida para corresponder com fidelidade ao que o componente oferece no design system da Aceternity UI: microinterações táteis, perspectiva e aceleração fluida.
          </p>
        </div>

        <section className="related-section">
          <div className="related-heading">
            <div><span className="section-kicker">CONTINUE EXPLORANDO <span>/ 02</span></span><h2>Componentes relacionados</h2></div>
            <Link to="/" onClick={() => sound.playClick()}>Ver todos <ArrowRight size={14} /></Link>
          </div>
          <div className="related-grid">
            {related.map((entry) => (
              <article className="related-card" key={entry.slug}>
                <div className="related-art"><DemoPreview item={entry} compact /></div>
                <Link className="related-meta" to={getPath(entry)} onClick={() => sound.playClick(750, 0.02)}>
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
          <span className="section-kicker">EM RESUMO</span>
          <div className="info-row"><span>Coleção</span><strong>{item.category}</strong></div>
          <div className="info-row"><span>Tipo</span><strong>{typeLabel[item.type]}</strong></div>
          <div className="info-row"><span>Stack</span><strong>React · TS · Motion</strong></div>
          <div className="info-row"><span>Uso recomendado</span><strong>{item.category === 'Backgrounds' ? 'Hero / CTA' : item.category === 'Templates' ? 'Página completa' : 'Interface de Produto'}</strong></div>
          <div className="info-divider" />
          <div className="info-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>

        <div className="install-card">
          <div className="install-card-title"><span className="install-icon"><Component size={14} /></span><strong>Começar a usar</strong></div>
          <p>Instale os pacotes e copie o código pronto para o seu app.</p>
          <code>pnpm add framer-motion lucide-react</code>
          <button onClick={copyInstallCommand}>{installCopied ? <><Check size={13} /> Comando Copiado!</> : <><Copy size={13} /> Copiar comando</>}</button>
        </div>

        <div className="source-card">
          <span className="source-icon"><ExternalLink size={14} /></span>
          <strong>Documentação Oficial</strong>
          <p>Visite a página oficial na Aceternity UI para variantes adicionais.</p>
          <a href={item.source} target="_blank" rel="noreferrer">Abrir Aceternity <ArrowUpRight size={13} /></a>
        </div>

        <div className="tip-card">
          <span>DICA PRO</span>
          <p>Microinterações com física e som tátil enriquecem a experiência e retêm o usuário.</p>
          <div className="tip-mark">✳</div>
        </div>
      </aside>
    </div>

    {/* Modal de Tela Cheia / Cinema Mode */}
    <FullscreenModal
      isOpen={fullscreenOpen}
      onClose={() => setFullscreenOpen(false)}
      title={item.name}
    >
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
}

function MousePointer2Icon() { return <span className="mouse-pointer-inline"><Command size={12} /></span> }

function SearchPalette({ close }: { close: () => void }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const normalized = query.toLowerCase().trim()
  const results = allItems.filter((item) => !normalized || [item.name, item.category, item.description, ...item.tags].join(' ').toLowerCase().includes(normalized)).slice(0, 8)
  const go = (item: CatalogItem) => { sound.playClick(); navigate(getPath(item)); close() }

  return <motion.div className="search-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
    <motion.div className="search-dialog" initial={{ opacity: 0, y: -12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .99 }} role="dialog" aria-modal="true" aria-label="Search the component library">
      <div className="search-dialog-input"><Search size={17} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && results[0]) { event.preventDefault(); go(results[0]) } }} placeholder="Pesquisar componentes, efeitos, templates..." /><kbd>ESC</kbd></div>
      <div className="search-dialog-label">{normalized ? `${results.length} RESULTADOS` : 'SUGESTÕES PARA VOCÊ'}</div>
      <div className="search-results">{results.map((item, index) => <button key={item.slug} onClick={() => go(item)}><span className={`result-icon result-${index % 4}`}><Component size={15} /></span><span className="result-copy"><strong>{item.name}</strong><small>{item.category} · {typeLabel[item.type]}</small></span><ArrowUpRight size={14} /></button>)}{results.length === 0 && <div className="search-no-results">Nenhum componente encontrado.</div>}</div>
      <div className="search-dialog-footer"><span><kbd>↵</kbd> para abrir</span><span>ESC para fechar</span><span>EXPLORAR A BIBLIOTECA</span></div>
    </motion.div>
  </motion.div>
}

function NotFound() {
  return <main className="page-content not-found"><span className="tiny-label">404 / FORA DO MAPA</span><h1>Nada por aqui<br /><i>ainda.</i></h1><p>Este componente pode ter mudado de endereço. O restante da biblioteca está à sua disposição.</p><Link to="/">Voltar para a biblioteca <ArrowRight size={14} /></Link></main>
}

function Footer() {
  return <footer className="site-footer"><span>ACETERNITY UI EXPLORER <i>·</i> ESTUDO INDEPENDENTE DE ALTA FIDELIDADE</span><span>FEITO PARA AS INTERFACES QUE BRILHAM <Sparkles size={12} /></span></footer>
}

export default App
