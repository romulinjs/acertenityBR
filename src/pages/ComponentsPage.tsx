import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  ChevronDown,
  Component,
  Grid2X2,
  Layers3,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { catalogItems, categories, type CatalogItem } from '../data/catalog'
import { DemoPreview } from '../components/DemoPreview'
import { sound } from '../utils/audio'

const typeLabel: Record<CatalogItem['type'], string> = {
  component: 'Component',
  effect: 'Effect',
  block: 'Section',
  template: 'Template',
}

function getComponentPath(item: CatalogItem) {
  return `/components/${item.slug}`
}

export function ComponentsPage({
  saved,
  toggleSaved,
}: {
  saved: string[]
  toggleSaved: (slug: string) => void
}) {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<'featured' | 'az'>('featured')

  const activeCategory = params.get('category') ?? ''
  const savedOnly = params.get('saved') === '1'
  const filterType = params.get('type') ?? 'all'

  const nonTemplateCategories = categories.filter((c) => c !== 'Templates')

  const visibleItems = useMemo(() => {
    let source = catalogItems.filter((i) => i.type !== 'template')

    if (savedOnly) {
      source = source.filter((item) => saved.includes(item.slug))
    }
    if (activeCategory) {
      source = source.filter((item) => item.category === activeCategory)
    }
    if (filterType !== 'all') {
      source = source.filter((item) => item.type === filterType)
    }

    const normalized = query.trim().toLowerCase()
    if (normalized) {
      source = source.filter((item) =>
        [item.name, item.category, item.description, ...item.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalized)
      )
    }

    return [...source].sort((a, b) =>
      sort === 'az'
        ? a.name.localeCompare(b.name)
        : Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    )
  }, [activeCategory, filterType, query, saved, savedOnly, sort])

  const setCategory = (cat: string) => {
    sound.playClick()
    const next = new URLSearchParams(params)
    if (cat === activeCategory) next.delete('category')
    else next.set('category', cat)
    next.delete('saved')
    setParams(next)
  }

  const setType = (type: string) => {
    sound.playClick()
    const next = new URLSearchParams(params)
    if (type === 'all') next.delete('type')
    else next.set('type', type)
    setParams(next)
  }

  const clearFilters = () => {
    sound.playClick()
    setParams(new URLSearchParams())
    setQuery('')
  }

  return (
    <div className="components-page-layout">
      {/* Category Sidebar */}
      <aside className="components-sidebar">
        <div className="sidebar-group">
          <span className="sidebar-group-title">EXPLORE</span>
          <button
            className={`sidebar-nav-btn ${!activeCategory && !savedOnly ? 'active' : ''}`}
            onClick={() => {
              sound.playClick()
              clearFilters()
            }}
          >
            <Grid2X2 size={15} />
            <span>All Components</span>
            <span className="badge-count">{catalogItems.length}</span>
          </button>
          <button
            className={`sidebar-nav-btn ${savedOnly ? 'active' : ''}`}
            onClick={() => {
              sound.playClick()
              const next = new URLSearchParams()
              next.set('saved', '1')
              setParams(next)
            }}
          >
            <Bookmark size={15} />
            <span>Saved Collection</span>
            <span className="badge-count">{saved.length}</span>
          </button>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-group">
          <span className="sidebar-group-title">CATEGORIES</span>
          {nonTemplateCategories.map((cat) => {
            const count = catalogItems.filter((i) => i.category === cat).length
            const isSelected = activeCategory === cat
            return (
              <button
                key={cat}
                className={`sidebar-nav-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                <span className="cat-bullet" />
                <span>{cat}</span>
                <span className="badge-count">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-group">
          <span className="sidebar-group-title">TEMPLATES</span>
          <Link
            to="/templates"
            className="sidebar-nav-btn"
            onClick={() => sound.playClick()}
          >
            <Layers3 size={15} />
            <span>Full Templates</span>
            <span className="badge-count">8</span>
          </Link>
          <Link
            to="/pricing"
            className="sidebar-nav-btn"
            onClick={() => sound.playClick()}
          >
            <Sparkles size={15} />
            <span>Aceternity Pro</span>
            <span className="badge-pro">PRO</span>
          </Link>
        </div>
      </aside>

      {/* Main Catalog View */}
      <main className="components-main-content">
        {/* Header Title & Intro */}
        <div className="components-header">
          <div className="components-header-left">
            <span className="components-eyebrow">
              <Sparkles size={13} className="text-violet-400" />
              <span>THE ACETERNITY CATALOG</span>
            </span>
            <h1 className="components-title">
              {savedOnly
                ? 'Your Saved Components'
                : activeCategory
                ? `${activeCategory} Components`
                : 'All Components'}
            </h1>
            <p className="components-subtitle">
              Interactive demos running 60 FPS in React and Framer Motion. Click on
              any card to inspect code, adjust hues, and test live physics.
            </p>
          </div>

          <div className="components-header-count">
            <span className="count-number">
              {visibleItems.length.toString().padStart(2, '0')}
            </span>
            <span className="count-label">Components Available</span>
          </div>
        </div>

        {/* Toolbar & Filter Bar */}
        <div className="components-controls-bar">
          <div className="type-pills">
            <button
              className={filterType === 'all' && !savedOnly ? 'active' : ''}
              onClick={() => setType('all')}
            >
              <Grid2X2 size={13} />
              <span>All ({catalogItems.length})</span>
            </button>
            <button
              className={filterType === 'component' ? 'active' : ''}
              onClick={() => setType('component')}
            >
              <Component size={13} />
              <span>UI Components</span>
            </button>
            <button
              className={filterType === 'effect' ? 'active' : ''}
              onClick={() => setType('effect')}
            >
              <Sparkles size={13} />
              <span>Effects & Canvas</span>
            </button>
          </div>

          <div className="search-and-sort">
            <div className="components-search-input">
              <Search size={14} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components by name, tag, category..."
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="clear-search-btn"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="sort-wrapper">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as 'featured' | 'az')}
                aria-label="Sort components"
              >
                <option value="featured">Featured First</option>
                <option value="az">Alphabetical (A-Z)</option>
              </select>
              <ChevronDown size={12} className="sort-chevron" />
            </div>
          </div>
        </div>

        {/* Active Filter Summary */}
        {(query || activeCategory || savedOnly || filterType !== 'all') && (
          <div className="active-filters-row">
            <span>
              Showing <strong>{visibleItems.length}</strong> results
              {query && <> for &quot;<strong>{query}</strong>&quot;</>}
              {activeCategory && <> in &quot;<strong>{activeCategory}</strong>&quot;</>}
              {savedOnly && <> in <strong>Saved Collection</strong></>}
            </span>
            <button onClick={clearFilters} className="clear-filters-btn">
              <span>Clear filters</span>
              <X size={12} />
            </button>
          </div>
        )}

        {/* Component Grid */}
        {visibleItems.length > 0 ? (
          <motion.div className="components-cards-grid" layout>
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, index) => {
                const isSaved = saved.includes(item.slug)
                return (
                  <motion.article
                    key={item.slug}
                    className="comp-card"
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, delay: Math.min(index % 6, 5) * 0.03 }}
                  >
                    {/* Live Preview Area */}
                    <div className="comp-card-preview">
                      <Link
                        to={getComponentPath(item)}
                        className="comp-preview-link"
                        onClick={() => sound.playClick(750, 0.02)}
                      >
                        <DemoPreview item={item} compact />
                      </Link>

                      <button
                        className={`comp-save-btn ${isSaved ? 'saved' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSaved(item.slug)
                        }}
                        title={isSaved ? 'Remove from saved' : 'Save for later'}
                        aria-label="Save component"
                      >
                        <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>

                      <span className="comp-type-badge">{typeLabel[item.type]}</span>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="comp-card-meta">
                      <div className="comp-card-title-row">
                        <Link
                          to={getComponentPath(item)}
                          className="comp-card-name"
                          onClick={() => sound.playClick(750, 0.02)}
                        >
                          {item.name}
                        </Link>
                        <Link
                          to={getComponentPath(item)}
                          className="comp-card-open"
                          aria-label={`Open ${item.name}`}
                          onClick={() => sound.playClick(750, 0.02)}
                        >
                          <ArrowUpRight size={15} />
                        </Link>
                      </div>

                      <p className="comp-card-desc">{item.description}</p>

                      <div className="comp-card-tags">
                        <span className="comp-tag-category">{item.category}</span>
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="comp-tag-clickable"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              sound.playClick()
                              setQuery(tag)
                            }}
                            title={`Filter by tag ${tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="components-empty-state">
            <div className="empty-state-icon">
              <Search size={22} />
            </div>
            <h3>No components found</h3>
            <p>
              {savedOnly
                ? "You haven't saved any components yet. Click the bookmark icon on any card to save it here."
                : 'Try adjusting your search query or reset your filters.'}
            </p>
            <button onClick={clearFilters} className="btn-aceternity-secondary">
              <span>Reset All Filters</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
