import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Copy,
  Eye,
  Laptop,
  Maximize2,
  Smartphone,
  Sparkles,
  Tablet,
  Zap,
} from 'lucide-react'
import { templateItems, snippetsFor } from '../data/catalog'
import { DemoPreview } from '../components/DemoPreview'
import { CodeBlock } from '../components/CodeBlock'
import { FullscreenModal } from '../components/FullscreenModal'
import { copyText } from '../clipboard'
import { sound } from '../utils/audio'

type ViewportMode = 'desktop' | 'tablet' | 'mobile'

export function TemplateDetailPage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const template = templateItems.find((t) => t.slug === slug)

  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [viewport, setViewport] = useState<ViewportMode>('desktop')
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  if (!template) {
    return (
      <div className="template-not-found">
        <h2>Template not found</h2>
        <p>The template you are looking for does not exist or has been moved.</p>
        <Link to="/templates" className="btn-aceternity-primary">
          <ArrowLeft size={15} />
          <span>Back to Templates</span>
        </Link>
      </div>
    )
  }

  const snippet = snippetsFor(template)

  const handleShare = async () => {
    sound.playClick()
    const url = window.location.href
    const success = await copyText(url)
    setCopiedLink(success)
    if (success) setTimeout(() => setCopiedLink(false), 2000)
  }

  const viewportWidths: Record<ViewportMode, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '390px',
  }

  return (
    <div className="template-detail-layout">
      {/* Top Breadcrumb & Action Header */}
      <div className="template-detail-top-nav">
        <div className="template-nav-left">
          <button
            onClick={() => {
              sound.playClick()
              navigate('/templates')
            }}
            className="template-back-btn"
          >
            <ArrowLeft size={14} />
            <span>Templates</span>
          </button>
          <span className="nav-separator">/</span>
          <span className="template-active-name">{template.name}</span>
          <span className="template-pill-pro">PRO</span>
        </div>

        {/* Viewport & View Mode Toggles */}
        <div className="template-nav-center">
          <div className="viewport-switcher" role="tablist">
            <button
              className={viewport === 'desktop' ? 'active' : ''}
              onClick={() => {
                sound.playClick()
                setViewport('desktop')
              }}
              title="Desktop View (100%)"
              aria-label="Desktop View"
            >
              <Laptop size={14} />
              <span>Desktop</span>
            </button>
            <button
              className={viewport === 'tablet' ? 'active' : ''}
              onClick={() => {
                sound.playClick()
                setViewport('tablet')
              }}
              title="Tablet View (768px)"
              aria-label="Tablet View"
            >
              <Tablet size={14} />
              <span>Tablet</span>
            </button>
            <button
              className={viewport === 'mobile' ? 'active' : ''}
              onClick={() => {
                sound.playClick()
                setViewport('mobile')
              }}
              title="Mobile View (390px)"
              aria-label="Mobile View"
            >
              <Smartphone size={14} />
              <span>Mobile</span>
            </button>
          </div>

          <div className="tab-switcher">
            <button
              className={tab === 'preview' ? 'active' : ''}
              onClick={() => {
                sound.playClick()
                setTab('preview')
              }}
            >
              <Eye size={13} />
              <span>Live Preview</span>
            </button>
            <button
              className={tab === 'code' ? 'active' : ''}
              onClick={() => {
                sound.playClick()
                setTab('code')
              }}
            >
              <Code2 size={13} />
              <span>Source Code</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="template-nav-right">
          <button
            className="btn-cinema-mode"
            onClick={() => {
              sound.playWhoosh()
              setFullscreenOpen(true)
            }}
            title="Fullscreen Cinema Mode"
          >
            <Maximize2 size={14} />
            <span>Cinema</span>
          </button>

          <button
            className="btn-share-template"
            onClick={handleShare}
            title="Copy shareable link"
          >
            {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <Link
            to="/pricing"
            className="btn-aceternity-pro"
            onClick={() => sound.playPop()}
          >
            <Zap size={14} className="text-amber-400" />
            <span>Get Template</span>
          </Link>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="template-viewport-wrap">
        {tab === 'preview' ? (
          <div
            className="template-stage-frame"
            style={{
              width: viewportWidths[viewport],
              transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              margin: '0 auto',
            }}
          >
            <div className="template-stage-header-bar">
              <div className="browser-dots">
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              <div className="browser-address">
                <span>https://preview.aceternity.com/{template.slug}</span>
              </div>
              <div className="browser-badge">
                <Sparkles size={11} className="text-violet-400" />
                <span>60 FPS INTERACTIVE</span>
              </div>
            </div>

            <div className="template-inner-demo-area">
              <DemoPreview item={template} compact={false} />
            </div>
          </div>
        ) : (
          <div className="template-code-view">
            <CodeBlock files={snippet} />
          </div>
        )}
      </div>

      {/* Template Spec & Features Footer Section */}
      <section className="template-meta-section">
        <div className="template-meta-grid">
          <div className="meta-info-col">
            <span className="meta-kicker">TEMPLATE SPECIFICATIONS</span>
            <h2 className="meta-title">{template.name}</h2>
            <p className="meta-desc">{template.description}</p>
            <div className="meta-tags-list">
              {template.tags.map((tag) => (
                <span key={tag} className="meta-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="meta-features-col">
            <span className="meta-kicker">WHAT&apos;S INCLUDED</span>
            <ul className="meta-features-list">
              <li>
                <Check size={14} className="text-emerald-400" />
                <span>Next.js 15 App Router + React 19 architecture</span>
              </li>
              <li>
                <Check size={14} className="text-emerald-400" />
                <span>Custom tailored Tailwind CSS config and CSS variables</span>
              </li>
              <li>
                <Check size={14} className="text-emerald-400" />
                <span>Responsive layouts with desktop, tablet & mobile variants</span>
              </li>
              <li>
                <Check size={14} className="text-emerald-400" />
                <span>Framer Motion smooth scroll and entrance micro-interactions</span>
              </li>
              <li>
                <Check size={14} className="text-emerald-400" />
                <span>Figma components and design tokens file included</span>
              </li>
            </ul>
          </div>

          <div className="meta-cta-col">
            <div className="meta-pricing-card">
              <div className="pricing-card-header">
                <span className="card-badge">PRO LICENSE</span>
                <div className="card-price">
                  <span className="currency">$</span>
                  <span className="amount">79</span>
                  <span className="period">/ lifetime</span>
                </div>
              </div>
              <p className="card-text">
                Unlimited commercial projects, all 8 templates, and future updates.
              </p>
              <Link
                to="/pricing"
                className="btn-checkout-link"
                onClick={() => sound.playPop()}
              >
                <span>Unlock All Templates</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Mode */}
      <FullscreenModal
        isOpen={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        title={`${template.name} · Fullscreen Live View`}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <DemoPreview item={template} compact={false} />
        </div>
      </FullscreenModal>
    </div>
  )
}
