import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Eye,
  Sparkles,
  Zap,
} from 'lucide-react'
import { templateItems } from '../data/catalog'
import { DemoPreview } from '../components/DemoPreview'
import { sound } from '../utils/audio'

export function TemplatesPage() {
  const [filterTag, setFilterTag] = useState<string>('all')

  const allTags = ['all', 'SaaS', 'Portfolio', 'AI', 'Next.js', 'Dashboard']

  const filtered = templateItems.filter((item) => {
    if (filterTag === 'all') return true
    return item.tags.some((t) => t.toLowerCase() === filterTag.toLowerCase())
  })

  return (
    <div className="templates-page-wrap">
      {/* Templates Hero */}
      <section className="templates-hero">
        <div className="hero-radial-beam" />
        <div className="templates-hero-inner">
          <div className="eyebrow-pill">
            <Sparkles size={13} className="text-violet-400" />
            <span>FULL STACK NEXT.JS & ACETERNITY APPS</span>
          </div>
          <h1 className="templates-hero-title">
            Production-ready templates for{' '}
            <span className="gradient-text-shimmer">modern founders</span>
          </h1>
          <p className="templates-hero-desc">
            Ship your startup, portfolio, or developer platform in hours, not months.
            Built with Next.js 15 App Router, Tailwind CSS, Framer Motion, and Aceternity UI.
          </p>

          <div className="templates-stack-badges">
            <span className="stack-badge">Next.js 15 App Router</span>
            <span className="stack-badge">Tailwind CSS</span>
            <span className="stack-badge">Framer Motion</span>
            <span className="stack-badge">TypeScript First</span>
            <span className="stack-badge">Dark Mode Native</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="templates-filter-bar">
        <div className="template-pills-list">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`template-filter-pill ${filterTag === tag ? 'active' : ''}`}
              onClick={() => {
                sound.playClick()
                setFilterTag(tag)
              }}
            >
              {tag === 'all' ? 'All Templates' : tag}
            </button>
          ))}
        </div>
        <div className="templates-count-indicator">
          Showing <strong>{filtered.length}</strong> of {templateItems.length} templates
        </div>
      </div>

      {/* Templates Grid */}
      <div className="templates-catalog-grid">
        {filtered.map((template, index) => (
          <motion.div
            key={template.slug}
            className="full-template-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {/* Interactive Preview Container */}
            <div className="template-preview-container">
              <Link
                to={`/templates/${template.slug}`}
                className="template-preview-interactive-link"
                onClick={() => sound.playClick(650, 0.02)}
              >
                <DemoPreview item={template} compact />
              </Link>
              <div className="template-hover-actions">
                <Link
                  to={`/templates/${template.slug}`}
                  className="btn-template-live"
                  onClick={() => sound.playClick(700, 0.02)}
                >
                  <Eye size={15} />
                  <span>Live Interactive Preview</span>
                </Link>
              </div>
              <span className="template-status-badge">
                <Sparkles size={11} /> PRO INCLUDED
              </span>
            </div>

            {/* Template Information */}
            <div className="template-info-box">
              <div className="template-title-row">
                <Link
                  to={`/templates/${template.slug}`}
                  className="template-main-title"
                  onClick={() => sound.playClick()}
                >
                  {template.name}
                </Link>
                <Link
                  to={`/templates/${template.slug}`}
                  className="template-arrow-icon"
                  aria-label={`Open ${template.name}`}
                  onClick={() => sound.playClick()}
                >
                  <ArrowUpRight size={18} />
                </Link>
              </div>

              <p className="template-full-desc">{template.description}</p>

              {/* Inclusions */}
              <div className="template-features-list">
                <div className="feat-item">
                  <Check size={12} className="text-emerald-400" />
                  <span>Full Responsive Layout</span>
                </div>
                <div className="feat-item">
                  <Check size={12} className="text-emerald-400" />
                  <span>Interactive 60fps Components</span>
                </div>
                <div className="feat-item">
                  <Check size={12} className="text-emerald-400" />
                  <span>Clean React 19 + TypeScript</span>
                </div>
              </div>

              {/* Tags & Action Buttons */}
              <div className="template-card-footer">
                <div className="template-tag-group">
                  {template.tags.map((tag) => (
                    <span key={tag} className="template-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="template-action-row">
                  <Link
                    to={`/templates/${template.slug}`}
                    className="btn-template-primary"
                    onClick={() => sound.playClick()}
                  >
                    <span>View Template</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pro Access Callout */}
      <section className="templates-pro-callout">
        <div className="callout-glow" />
        <div className="callout-content">
          <div className="callout-pill">
            <Zap size={14} className="text-amber-400" />
            <span>ACETERNITY PRO PASS</span>
          </div>
          <h2>Get immediate access to all 8 templates</h2>
          <p>
            One license gives you full commercial rights, upcoming templates for life,
            and complete Figma project source files.
          </p>
          <div className="callout-actions">
            <Link
              to="/pricing"
              className="btn-aceternity-pro"
              onClick={() => sound.playPop()}
            >
              <span>Get Lifetime Pro Access</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
