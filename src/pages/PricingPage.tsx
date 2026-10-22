import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  HelpCircle,
  Lock,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import { sound } from '../utils/audio'

interface PricingTier {
  id: string
  name: string
  badge?: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  highlight?: boolean
  cta: string
}

const tiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Hobby',
    description: 'Perfect for learning, personal experiments, and small side projects.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Access to 30+ open source components',
      'Framer Motion & Tailwind CSS code',
      'MIT Commercial License',
      'Community Discord support',
      'Interactive component playground',
      'Dark mode ready out of the box',
    ],
    cta: 'Start Building Free',
  },
  {
    id: 'pro',
    name: 'Aceternity Pro',
    badge: 'MOST POPULAR',
    description: 'Everything you need to ship world-class client work and high-converting SaaS apps.',
    monthlyPrice: 15,
    yearlyPrice: 79,
    highlight: true,
    features: [
      'Everything in Hobby',
      'All 8 Full-Page Production Templates',
      'Advanced Pro Components (Apple Carousel, Canvas Reveal, etc.)',
      'Complete Figma Design System Tokens',
      'Unlimited Commercial Projects & Clients',
      'Weekly component drops & priority feature requests',
      'VIP Discord channel with creators',
      'Lifetime license option with zero recurring fees',
    ],
    cta: 'Get Aceternity Pro',
  },
  {
    id: 'team',
    name: 'Team & Agency',
    badge: 'UNLIMITED POWER',
    description: 'Designed for agencies, design studios, and engineering teams shipping at scale.',
    monthlyPrice: 29,
    yearlyPrice: 199,
    features: [
      'Everything in Aceternity Pro',
      'Seat license for up to 10 team members',
      'Shared team component library snippet manager',
      'Direct 1-on-1 architecture review session',
      'Priority showcase feature on ui.aceternity.com',
      'Dedicated Slack / Discord channel support',
      'Custom invoice & procurement assistance',
    ],
    cta: 'Get Team License',
  },
]

const pricingFaqs = [
  {
    q: 'Can I use Aceternity Pro components in client projects?',
    a: 'Yes, 100%! With Aceternity Pro, you can use all templates and components in an unlimited number of client and commercial websites. You cannot resell or redistribute the components as a raw UI kit, but any finished website or SaaS is completely permitted.',
  },
  {
    q: 'Do I get access to future templates and components?',
    a: 'Yes! All Pro and Team members receive lifetime access to newly released components, templates, and Figma files without having to pay upgrade fees.',
  },
  {
    q: 'What is your refund policy?',
    a: 'We offer a 14-day no-questions-asked refund policy. If Aceternity UI does not accelerate your workflow or meet your design expectations, email us and we will promptly refund your purchase.',
  },
  {
    q: 'Is this a recurring subscription or a one-time purchase?',
    a: 'Our Pro plan is offered either as an annual pass or as a one-time lifetime license. You retain full access to all downloaded code and updates for the duration of your license.',
  },
]

export function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly')
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'success'>('form')

  const handleSelectTier = (tier: PricingTier) => {
    sound.playPop()
    if (tier.id === 'free') {
      window.location.href = '/components'
      return
    }
    setSelectedTier(tier)
    setCheckoutStep('form')
  }

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    sound.playClick()
    setCheckoutStep('processing')
    setTimeout(() => {
      sound.playPop()
      setCheckoutStep('success')
    }, 1200)
  }

  return (
    <div className="pricing-page-container">
      {/* Hero */}
      <section className="pricing-hero">
        <div className="hero-radial-beam" />
        <div className="pricing-hero-inner">
          <div className="eyebrow-pill">
            <Sparkles size={13} className="text-violet-400" />
            <span>TRANSPARENT VALUE FOR SERIOUS BUILDERS</span>
          </div>
          <h1 className="pricing-title">
            Invest in design that{' '}
            <span className="gradient-text-shimmer">converts 10x more</span>
          </h1>
          <p className="pricing-subtitle">
            Ship premium landing pages, interactive apps, and award-winning websites
            with production-ready code.
          </p>

          {/* Billing Switch */}
          <div className="billing-switch-wrapper">
            <div className="billing-switch">
              <button
                className={billingCycle === 'monthly' ? 'active' : ''}
                onClick={() => {
                  sound.playClick()
                  setBillingCycle('monthly')
                }}
              >
                Monthly Billing
              </button>
              <button
                className={billingCycle === 'yearly' ? 'active' : ''}
                onClick={() => {
                  sound.playClick()
                  setBillingCycle('yearly')
                }}
              >
                <span>Annual Billing</span>
                <span className="save-badge">SAVE 20%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="pricing-cards-section">
        <div className="pricing-grid">
          {tiers.map((tier) => {
            const price = billingCycle === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice
            return (
              <div
                key={tier.id}
                className={`pricing-card ${tier.highlight ? 'pricing-card-highlight' : ''}`}
              >
                {tier.badge && (
                  <div className="tier-badge-pill">
                    <Sparkles size={12} />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div className="tier-header">
                  <h3 className="tier-name">{tier.name}</h3>
                  <p className="tier-desc">{tier.description}</p>
                </div>

                <div className="tier-price-row">
                  <span className="price-symbol">$</span>
                  <span className="price-amount">{price}</span>
                  <span className="price-term">
                    {tier.id === 'free'
                      ? '/ forever'
                      : billingCycle === 'yearly'
                      ? '/ year'
                      : '/ month'}
                  </span>
                </div>

                <button
                  className={`btn-tier-cta ${
                    tier.highlight ? 'btn-tier-primary' : 'btn-tier-outline'
                  }`}
                  onClick={() => handleSelectTier(tier)}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight size={15} />
                </button>

                <div className="tier-features-list">
                  <span className="features-kicker">WHAT&apos;S INCLUDED:</span>
                  {tier.features.map((feat) => (
                    <div key={feat} className="tier-feature-item">
                      <div className="check-icon-circle">
                        <Check size={11} className="text-emerald-400" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="comparison-section">
        <div className="section-header">
          <span className="section-eyebrow">
            <Zap size={14} />
            <span>FEATURE BREAKDOWN</span>
          </span>
          <h2 className="section-title">Compare plan capabilities</h2>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Hobby</th>
                <th>Aceternity Pro</th>
                <th>Team & Agency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Open-Source Components (30+)</td>
                <td><Check size={16} className="text-emerald-400" /></td>
                <td><Check size={16} className="text-emerald-400" /></td>
                <td><Check size={16} className="text-emerald-400" /></td>
              </tr>
              <tr>
                <td>Full Production Templates (8)</td>
                <td className="text-zinc-600">—</td>
                <td><Check size={16} className="text-emerald-400" /></td>
                <td><Check size={16} className="text-emerald-400" /></td>
              </tr>
              <tr>
                <td>Figma Official Design Files</td>
                <td className="text-zinc-600">—</td>
                <td><Check size={16} className="text-emerald-400" /></td>
                <td><Check size={16} className="text-emerald-400" /></td>
              </tr>
              <tr>
                <td>Commercial Client Projects</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Team Seats</td>
                <td>1 user</td>
                <td>1 user</td>
                <td>Up to 10 users</td>
              </tr>
              <tr>
                <td>Weekly Component Drops</td>
                <td className="text-zinc-600">—</td>
                <td><Check size={16} className="text-emerald-400" /></td>
                <td><Check size={16} className="text-emerald-400" /></td>
              </tr>
              <tr>
                <td>Architecture Advisory Call</td>
                <td className="text-zinc-600">—</td>
                <td className="text-zinc-600">—</td>
                <td>1-on-1 Session</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="pricing-faq-section">
        <div className="section-header">
          <span className="section-eyebrow">
            <HelpCircle size={14} />
            <span>COMMON QUESTIONS</span>
          </span>
          <h2 className="section-title">Billing & License FAQ</h2>
        </div>

        <div className="faq-accordion">
          {pricingFaqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div
                key={faq.q}
                className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => {
                    sound.playClick()
                    setOpenFaq(isOpen ? null : index)
                  }}
                >
                  <span>{faq.q}</span>
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
                    >
                      <p className="faq-answer-text">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* Interactive Mock Checkout Modal */}
      <AnimatePresence>
        {selectedTier && (
          <motion.div
            className="checkout-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTier(null)}
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
                onClick={() => setSelectedTier(null)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              {checkoutStep === 'form' && (
                <div>
                  <div className="modal-header">
                    <span className="modal-pill">ACETERNITY SECURE CHECKOUT</span>
                    <h3 className="modal-title">Upgrade to {selectedTier.name}</h3>
                    <p className="modal-price-display">
                      ${billingCycle === 'yearly' ? selectedTier.yearlyPrice : selectedTier.monthlyPrice}
                      <small> / {billingCycle === 'yearly' ? 'year' : 'month'}</small>
                    </p>
                  </div>

                  <form onSubmit={handleSimulateCheckout} className="modal-checkout-form">
                    <div className="form-field">
                      <label>Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        defaultValue="developer@aceternity.dev"
                      />
                    </div>

                    <div className="form-field">
                      <label>Card Information</label>
                      <div className="card-input-container">
                        <CreditCard size={16} className="text-zinc-400" />
                        <input
                          type="text"
                          required
                          placeholder="4242 •••• •••• 4242"
                          defaultValue="4242 4242 4242 4242"
                        />
                        <span className="card-exp">12/28</span>
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Name on Card</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        defaultValue="Alex Rivers"
                      />
                    </div>

                    <div className="checkout-security-note">
                      <Lock size={13} className="text-emerald-400" />
                      <span>256-bit Encrypted SSL. 14-day money-back guarantee.</span>
                    </div>

                    <button type="submit" className="btn-modal-pay">
                      <span>Complete Order (${billingCycle === 'yearly' ? selectedTier.yearlyPrice : selectedTier.monthlyPrice})</span>
                      <ArrowRight size={15} />
                    </button>
                  </form>
                </div>
              )}

              {checkoutStep === 'processing' && (
                <div className="checkout-processing-view">
                  <div className="spinner-glow" />
                  <h4>Authorizing payment...</h4>
                  <p>Connecting to secure payment gateway.</p>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="checkout-success-view">
                  <div className="success-icon-badge">
                    <Check size={28} className="text-emerald-400" />
                  </div>
                  <h3>Welcome to {selectedTier.name}!</h3>
                  <p>
                    Your license key has been generated and your account is active.
                    You now have unrestricted access to all Pro components and templates.
                  </p>
                  <div className="license-box">
                    <span>LICENSE KEY:</span>
                    <code>ACE-PRO-{Math.random().toString(36).substring(2, 10).toUpperCase()}-2026</code>
                  </div>
                  <div className="modal-success-actions">
                    <Link
                      to="/templates"
                      className="btn-aceternity-primary"
                      onClick={() => {
                        sound.playClick()
                        setSelectedTier(null)
                      }}
                    >
                      <span>Explore Pro Templates</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
