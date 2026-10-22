import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Code2,
  Copy,
  Eye,
  Layers,
  Palette,
  Sparkles,
  Zap,
} from 'lucide-react'
import { templateItems } from '../data/catalog'
import { DemoPreview } from '../components/DemoPreview'
import { sound } from '../utils/audio'
import { LampDemo } from '../components/demos/LampDemo'
import { MeteorsDemo } from '../components/demos/MeteorsDemo'
import { SparklesDemo } from '../components/demos/SparklesDemo'
import { FollowingPointerDemo } from '../components/demos/FollowingPointerDemo'
import { CanvasRevealDemo } from '../components/demos/CanvasRevealDemo'
import { AppleCarouselDemo } from '../components/demos/AppleCarouselDemo'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Can I use Aceternity UI components for commercial and client projects?',
    answer:
      'Yes, absolutely! All Aceternity UI components are licensed under the MIT license. You can use them for commercial projects, client websites, SaaS applications, and personal experiments without attribution.',
  },
  {
    question: 'How do I add these components to my Next.js or React application?',
    answer:
      'Aceternity UI follows the shadcn/ui pattern. Simply click on any component, inspect its source code, and copy the component file into your `components/ui` folder along with the Tailwind utility `cn`. All required dependencies are lightweight (primarily Framer Motion and Lucide Icons).',
  },
  {
    question: 'Are all animations and interactions running at 60 FPS?',
    answer:
      'Yes! We optimize every demo with hardware-accelerated transforms, Canvas 2D/WebGL shaders, and requestAnimationFrame loops. Motion states respect user preferences (`prefers-reduced-motion`) and are carefully garbage-collected.',
  },
  {
    question: 'What is the difference between Aceternity Free and Aceternity Pro?',
    answer:
      'The open-source library includes over 30 foundational components and effects. Aceternity Pro gives you lifetime access to full-page production templates, Figma source files, advanced full-stack blocks, and dedicated priority support.',
  },
  {
    question: 'Does Aceternity UI support Tailwind CSS v4 and Next.js App Router?',
    answer:
      'Yes! All components are designed from the ground up to be compatible with Next.js 14/15 App Router (`"use client"` directives where animations occur) and the latest Tailwind CSS versions.',
  },
]

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="aceternity-home">
      {/* 1. ANNOUNCEMENT PILL */}
      <div className="home-announcement">
        <Link
          to="/templates"
          className="announcement-pill"
          onClick={() => sound.playClick()}
        >
          <span className="announcement-badge">NEW</span>
          <span className="announcement-text">
            Introducing Aceternity Templates & 8 Production Apps
          </span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* 2. OFFICIAL ACETERNITY HERO SECTION */}
      <section className="aceternity-hero-wrap">
        <div className="hero-radial-beam" />
        <div className="hero-grid-pattern" />

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-tagline"
          >
            <Sparkles size={14} className="text-violet-400" />
            <span>COPY & PASTE THE MOST TRENDING COMPONENTS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-headline"
          >
            Make your websites look{' '}
            <span className="gradient-text-shimmer">10x better</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-subheading"
          >
            Copy paste the most trending components and use them in your websites
            without having to worry about styling and animations. Built with
            Framer Motion and Tailwind CSS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-cta-group"
          >
            <Link
              to="/components"
              className="btn-aceternity-primary"
              onClick={() => sound.playClick(650, 0.03)}
            >
              <span>Explore Components</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/templates"
              className="btn-aceternity-secondary"
              onClick={() => sound.playClick(500, 0.02)}
            >
              <Layers size={16} />
              <span>Browse Templates</span>
            </Link>

            <Link
              to="/pricing"
              className="btn-aceternity-pro"
              onClick={() => sound.playPop()}
            >
              <Zap size={14} className="text-amber-400" />
              <span>Aceternity Pro</span>
            </Link>
          </motion.div>

          {/* Social Proof & Badges */}
          <div className="hero-stats-row">
            <div className="stat-pill">
              <span className="stat-number">30+</span>
              <span className="stat-label">Live Components</span>
            </div>
            <div className="stat-sep" />
            <div className="stat-pill">
              <span className="stat-number">8</span>
              <span className="stat-label">Production Templates</span>
            </div>
            <div className="stat-sep" />
            <div className="stat-pill">
              <span className="stat-number">100%</span>
              <span className="stat-label">Interactive 60fps</span>
            </div>
            <div className="stat-sep" />
            <div className="stat-pill">
              <span className="stat-number">MIT</span>
              <span className="stat-label">Open Source Ready</span>
            </div>
          </div>
        </div>

        {/* Live Hero Demo Stage (Lamp Effect) */}
        <div className="hero-live-demo-stage">
          <div className="stage-top-bar">
            <div className="stage-window-dots">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>
            <div className="stage-title">
              <Sparkles size={13} className="text-violet-400" />
              <span>Lamp Effect Demo · ui.aceternity.com</span>
            </div>
            <Link
              to="/components/lamp-effect"
              className="stage-action-link"
              onClick={() => sound.playClick()}
            >
              <span>View Code</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="stage-preview-area">
            <LampDemo />
          </div>
        </div>
      </section>

      {/* 3. TRENDING BENTO GRID */}
      <section className="trending-section">
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={14} />
            <span>FEATURED SELECTION</span>
          </div>
          <h2 className="section-title">Trending interactive components</h2>
          <p className="section-desc">
            Hover, click and drag over the components below to preview live physics,
            ambient lighting, and smooth animations.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Apple Carousel (Large) */}
          <div className="bento-card bento-col-span-2">
            <div className="bento-card-top">
              <div className="bento-card-info">
                <span className="bento-tag">CAROUSEL</span>
                <h3>Apple Cards Carousel</h3>
                <p>Smooth horizontal cards inspired by Apple Store product showcases with modal expand.</p>
              </div>
              <Link
                to="/components/apple-cards-carousel"
                className="bento-open-btn"
                onClick={() => sound.playClick()}
              >
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="bento-preview-wrap">
              <AppleCarouselDemo />
            </div>
          </div>

          {/* Card 2: Meteors */}
          <div className="bento-card">
            <div className="bento-card-top">
              <div className="bento-card-info">
                <span className="bento-tag">EFFECT</span>
                <h3>Meteors Effect</h3>
                <p>Glowing meteor trails crossing through cards with depth and atmosphere.</p>
              </div>
              <Link
                to="/components/meteors"
                className="bento-open-btn"
                onClick={() => sound.playClick()}
              >
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="bento-preview-wrap">
              <MeteorsDemo />
            </div>
          </div>

          {/* Card 3: Sparkles Core */}
          <div className="bento-card">
            <div className="bento-card-top">
              <div className="bento-card-info">
                <span className="bento-tag">CANVAS</span>
                <h3>Sparkles Core</h3>
                <p>Dynamic 2D particle canvas with twinkling stars and radial glow.</p>
              </div>
              <Link
                to="/components/sparkles-core"
                className="bento-open-btn"
                onClick={() => sound.playClick()}
              >
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="bento-preview-wrap">
              <SparklesDemo />
            </div>
          </div>

          {/* Card 4: Following Pointer */}
          <div className="bento-card">
            <div className="bento-card-top">
              <div className="bento-card-info">
                <span className="bento-tag">INTERACTION</span>
                <h3>Following Pointer</h3>
                <p>Figma-style collaborator cursor tracking mouse coordinates smoothly.</p>
              </div>
              <Link
                to="/components/following-pointer"
                className="bento-open-btn"
                onClick={() => sound.playClick()}
              >
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="bento-preview-wrap">
              <FollowingPointerDemo />
            </div>
          </div>

          {/* Card 5: Canvas Reveal Effect */}
          <div className="bento-card">
            <div className="bento-card-top">
              <div className="bento-card-info">
                <span className="bento-tag">SHADER / CANVAS</span>
                <h3>Canvas Reveal</h3>
                <p>Dot-matrix pattern revealed on mouse hover with vibrant gradient shifts.</p>
              </div>
              <Link
                to="/components/canvas-reveal"
                className="bento-open-btn"
                onClick={() => sound.playClick()}
              >
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="bento-preview-wrap">
              <CanvasRevealDemo />
            </div>
          </div>
        </div>

        <div className="section-cta-center">
          <Link
            to="/components"
            className="btn-aceternity-primary"
            onClick={() => sound.playClick()}
          >
            <span>View All 30+ Components</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 4. TEMPLATES SHOWCASE TEASER */}
      <section className="templates-teaser-section">
        <div className="section-header">
          <div className="section-eyebrow">
            <Layers size={14} />
            <span>FULL PRODUCTION APPS</span>
          </div>
          <h2 className="section-title">Production-ready templates</h2>
          <p className="section-desc">
            Complete landing pages, portfolios, and SaaS dashboards built with
            Aceternity UI, Next.js, and Tailwind CSS.
          </p>
        </div>

        <div className="templates-grid">
          {templateItems.slice(0, 3).map((template) => (
            <div key={template.slug} className="template-card">
              <div className="template-card-preview">
                <DemoPreview item={template} compact />
                <div className="template-card-overlay">
                  <Link
                    to={`/templates/${template.slug}`}
                    className="template-btn-preview"
                    onClick={() => sound.playClick(650, 0.02)}
                  >
                    <Eye size={14} />
                    <span>Live Preview</span>
                  </Link>
                </div>
              </div>
              <div className="template-card-body">
                <div className="template-card-head">
                  <h3 className="template-title">{template.name}</h3>
                  <span className="template-badge-pro">PRO READY</span>
                </div>
                <p className="template-desc">{template.description}</p>
                <div className="template-card-foot">
                  <div className="template-tags">
                    {template.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link
                    to={`/templates/${template.slug}`}
                    className="template-link"
                    onClick={() => sound.playClick()}
                  >
                    <span>Inspect</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta-center">
          <Link
            to="/templates"
            className="btn-aceternity-secondary"
            onClick={() => sound.playClick()}
          >
            <span>Explore All 8 Production Templates</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 5. WHY ACETERNITY UI / VALUE PROPOSITION */}
      <section className="why-section">
        <div className="section-header">
          <div className="section-eyebrow">
            <Zap size={14} />
            <span>ENGINEERED FOR EXCELLENCE</span>
          </div>
          <h2 className="section-title">Why developers love Aceternity UI</h2>
          <p className="section-desc">
            Traditional UI libraries are rigid. Aceternity provides code you own,
            customize, and adapt to your brand in minutes.
          </p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon-box">
              <Copy size={20} className="text-violet-400" />
            </div>
            <h3>Copy & Paste Architecture</h3>
            <p>
              No bloated npm dependencies that slow down your build. You own the code
              in your own repository with complete freedom to customize.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">
              <Zap size={20} className="text-amber-400" />
            </div>
            <h3>Framer Motion First</h3>
            <p>
              Silky smooth spring physics, layout animations, gestures, and hardware
              accelerated GPU rendering out of the box.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">
              <Palette size={20} className="text-cyan-400" />
            </div>
            <h3>Tailwind CSS Native</h3>
            <p>
              Style without leaving your JSX. Compatible with Tailwind CSS v3 and v4,
              custom themes, and CSS variables.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-box">
              <Code2 size={20} className="text-emerald-400" />
            </div>
            <h3>100% TypeScript Typed</h3>
            <p>
              Full IntelliSense autocompletion, strongly typed props, and zero runtime
              guesswork for developers.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="faq-section">
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={14} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="section-title">Everything you need to know</h2>
          <p className="section-desc">
            Have questions about Aceternity UI? Here are answers to the most common
            inquiries.
          </p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div
                key={faq.question}
                className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => {
                    sound.playClick()
                    setOpenFaq(isOpen ? null : index)
                  }}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={16}
                    className={`faq-chevron ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="faq-answer-text">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="home-cta-banner">
        <div className="cta-banner-glow" />
        <div className="cta-banner-content">
          <span className="cta-pill">START BUILDING TODAY</span>
          <h2 className="cta-title">
            Make your next project stand out from the crowd
          </h2>
          <p className="cta-desc">
            Join thousands of developers and designers creating award-winning
            websites with Aceternity UI.
          </p>
          <div className="cta-actions">
            <Link
              to="/components"
              className="btn-aceternity-primary"
              onClick={() => sound.playClick()}
            >
              <span>Explore Components</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/pricing"
              className="btn-aceternity-pro"
              onClick={() => sound.playPop()}
            >
              <Zap size={14} className="text-amber-400" />
              <span>Get Aceternity Pro</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
