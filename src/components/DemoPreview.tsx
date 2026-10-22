import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight, AudioLines, Check, ChevronDown, CircleHelp, Command, Compass, Layers2, LayoutDashboard, MousePointer2, Orbit, Sparkles, WandSparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CatalogItem } from '../data/catalog'
import { templateCopy } from '../data/templates'

type Props = { item: CatalogItem; compact?: boolean; motionEnabled?: boolean }

const copyLines = ['Interfaces com intenção.', 'Uma ideia por vez.', 'Menos ruído. Mais sinal.']
const encryptedAlphabet = '▓▒░#@%&*+-'

export function DemoPreview({ item, compact = false, motionEnabled = true }: Props) {
  const [step, setStep] = useState(0)
  const [pointer, setPointer] = useState({ x: 50, y: 50 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const artRef = useRef<HTMLDivElement>(null)
  const [range, setRange] = useState(52)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notice, setNotice] = useState(false)
  const words = ['inesquecível', 'mais claro', 'em movimento']

  useEffect(() => {
    if (compact || !motionEnabled) return
    if (item.demo !== 'flip' && item.demo !== 'typewriter' && item.demo !== 'encrypted') return
    const timer = window.setInterval(() => setStep((value) => value + 1), item.demo === 'typewriter' ? 170 : 2200)
    return () => window.clearInterval(timer)
  }, [compact, item.demo, motionEnabled])

  useEffect(() => {
    if (compact || !motionEnabled || !['sticky', 'timeline', 'pin', 'parallax'].includes(item.demo)) return
    let frame = 0
    const updateProgress = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const element = artRef.current
        if (!element) return
        const rect = element.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
        setScrollProgress((current) => Math.abs(current - progress) < .01 ? current : progress)
      })
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [compact, item.demo, motionEnabled])

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (compact) return
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 })
  }

  const styleVars = {
    '--pointer-x': `${pointer.x}%`, '--pointer-y': `${pointer.y}%`,
    '--scroll-progress': scrollProgress,
    '--scroll-offset': `${(scrollProgress - .5) * 32}px`,
    '--scroll-offset-slow': `${(scrollProgress - .5) * 14}px`,
    '--scroll-offset-fast': `${(scrollProgress - .5) * 46}px`,
    '--scroll-tilt': `${9 - scrollProgress * 7}deg`,
  } as CSSProperties
  const activeStep = scrollProgress > .015 ? Math.min(2, Math.floor(scrollProgress * 3)) : step % 3
  const wrap = (children: ReactNode, extra = '') => (
    <div ref={artRef} className={`demo-art demo-${item.demo} ${compact ? 'is-compact' : ''} ${extra}`} style={styleVars} onPointerMove={onPointerMove}>

      {children}
    </div>
  )

  switch (item.demo) {
    case 'aurora':
      return wrap(<>
        <div className="aurora-blur aurora-a" /><div className="aurora-blur aurora-b" /><div className="aurora-blur aurora-c" />
        <div className="demo-grid-wash" />
        <div className="aurora-copy"><span className="tiny-label">{compact ? 'MOTION / 01' : 'UM NOVO CAPÍTULO COMEÇA AQUI'}</span><h3>{compact ? 'Light, in motion.' : <>A forma<br />de <i>fazer diferente.</i></>}</h3>{!compact && <button onClick={() => setNotice(true)}>Explore a collection <ArrowUpRight size={14} /></button>}</div>
        {!compact && notice && <span className="demo-toast"><Check size={13} /> Pronto para explorar</span>}
      </>, 'aurora-stage')
    case 'beam':
      return wrap(<>
        <div className="beam-glow beam-glow-one" /><div className="beam-glow beam-glow-two" />
        <svg className="beam-svg" viewBox="0 0 760 360" preserveAspectRatio="none" aria-hidden="true"><path d="M-40 318C132 235 201 64 402 75S627 238 810 48"/><path d="M-20 160C188 331 306 354 494 222S652 99 795 122"/><path d="M0 49C179 128 206 228 418 236S670 160 790 302"/></svg>
        <div className="beam-content"><span className="tiny-label">BACKGROUND / BEAMS</span><h3>{compact ? 'Follow the light.' : <>Light in the<br /><i>right direction.</i></>}</h3>{!compact && <span className="beam-caption">SVG paths · layered glow · slow motion</span>}</div>
        <span className="beam-node node-a" /><span className="beam-node node-b" />
      </>, 'beam-stage')
    case 'ripple':
      return wrap(<>
        <div className="ripple-field">{Array.from({ length: compact ? 36 : 64 }, (_, index) => <button key={index} aria-label={`Ativar ponto ${index + 1}`} onClick={() => setStep((v) => v + 1)} className={index === step % (compact ? 36 : 64) ? 'ripple-on' : ''} />)}</div>
        {!compact && <div className="ripple-caption"><MousePointer2 size={14} /> Clique em uma célula para criar uma onda <span>{step ? `${step} interações` : '0 interações'}</span></div>}
      </>, 'ripple-stage')
    case 'dots':
      return wrap(<><div className="dot-matrix" /><div className="dot-radial" /><div className="dots-copy"><span className="tiny-label">ATMOSPHERE / 04</span><h3>{compact ? 'A quiet glow.' : 'Subtle by nature.'}</h3></div></>, 'dots-stage')
    case 'spotlight':
      return wrap(<><div className="spotlight-wash" /><div className="spotlight-content"><span className="tiny-label">HOVER TO EXPLORE</span><h3>{compact ? 'Find your focus.' : <>A little light<br />goes a <i>long way.</i></>}</h3>{!compact && <p>Move your cursor through the frame.</p>}</div><div className="spotlight-cursor"><MousePointer2 size={14} /></div></>, 'spotlight-stage')
    case 'card':
      return wrap(<div className="showcase-card"><div className="card-glare" /><div className="card-topline"><span><Sparkles size={14} /> AC / STUDIO</span><span>01 — 04</span></div><div className="card-orbit"><span /><span /><span /></div><div className="card-copy"><span className="tiny-label">DESIGN SYSTEMS</span><h3>{compact ? 'A different point of view.' : 'Designed to feel different.'}</h3><p>{compact ? 'Hover interactions, layered depth and a little bit of light.' : 'Build an expressive system one considered component at a time.'}</p><span className="card-cta">Explore the system <ArrowUpRight size={14} /></span></div><div className="card-index">AC — 24</div></div>, 'card-stage')
    case 'grid':
      return wrap(<div className="layout-preview-grid">{['Workflows','Thoughtful UI','The next step','No limits'].map((label, i) => <button onClick={() => setStep(i)} className={step === i ? 'selected' : ''} key={label}><span>0{i + 1}</span><strong>{label}</strong><small>{i === step && !compact ? 'Selected · click another card' : 'Make room for more.'}</small></button>)}</div>, 'grid-stage')
    case 'bento':
      return wrap(<div className="bento-preview"><div className="bento-lead"><span className="tiny-label">NORTHSTAR / WORKSPACE</span><h3>Everything<br />has its place.</h3><span className="bento-orbit"><Orbit size={44} strokeWidth={1} /></span></div><div className="bento-feature"><span className="bento-icon"><Layers2 size={15} /></span><strong>Build in layers</strong><small>A clearer way to shape ideas.</small></div><div className="bento-feature"><span className="bento-icon"><AudioLines size={15} /></span><strong>Find your rhythm</strong><small>Keep the important things moving.</small></div></div>, 'bento-stage')
    case 'menu':
      return wrap(<div className="nav-preview"><a className="nav-brand" href="#preview" onClick={(e) => e.preventDefault()}>northstar<span>®</span></a><div className="nav-links"><button onClick={() => setMenuOpen(!menuOpen)}>Product <ChevronDown size={12} /></button><a href="#studio" onClick={(e) => e.preventDefault()}>Studio</a><a href="#journal" onClick={(e) => e.preventDefault()}>Journal</a></div><button className="nav-action" onClick={() => setNotice(!notice)}>{notice ? 'You are on the list' : 'Get early access'} <ArrowUpRight size={12} /></button>{menuOpen && !compact && <div className="mega-menu"><div><span className="tiny-label">EXPLORE NORTHSTAR</span><strong>A calmer kind of workspace.</strong></div><a href="#features" onClick={(e) => e.preventDefault()}>Features <ArrowUpRight size={13} /></a><a href="#about" onClick={(e) => e.preventDefault()}>Our approach <ArrowUpRight size={13} /></a></div>}</div>, 'menu-stage')
    case 'text': {
      const initial = compact || !motionEnabled ? false : { opacity: 0, y: 10 }
      const animate = { opacity: 1, y: 0 }
      return wrap(<div className="text-preview"><span className="tiny-label">WORDS IN MOTION</span><h3><motion.span initial={initial} animate={animate} transition={{ delay: motionEnabled ? .12 : 0, duration: motionEnabled ? .3 : 0 }}>Make</motion.span> <motion.span initial={initial} animate={animate} transition={{ delay: motionEnabled ? .25 : 0, duration: motionEnabled ? .3 : 0 }}>room</motion.span><br /><motion.i initial={initial} animate={animate} transition={{ delay: motionEnabled ? .4 : 0, duration: motionEnabled ? .3 : 0 }}>for the next idea.</motion.i></h3></div>, 'text-stage')
    }
    case 'flip':
      return wrap(<div className="text-preview"><span className="tiny-label">FLIP WORDS / LIVE</span><h3>Make something<br /><i key={step}>{words[step % words.length]}</i></h3><div className="flip-indicators">{words.map((word, i) => <button aria-label={`Mostrar ${word}`} onClick={() => setStep(i)} className={step % words.length === i ? 'active' : ''} key={word} />)}</div></div>, 'text-stage')
    case 'typewriter': {
      const phrase = copyLines[step % copyLines.length]
      const shown = compact ? 'Interfaces, in motion.' : phrase.slice(0, (step % (phrase.length + 12)))
      return wrap(<div className="text-preview"><span className="tiny-label">TYPEWRITER / LIVE</span><h3>{shown}<span className="typing-caret">|</span></h3>{!compact && <span className="type-hint">One character at a time.</span>}</div>, 'text-stage')
    }
    case 'encrypted': {
      const source = 'SIGNAL OVER NOISE'
      const display = compact || step > 5 ? source : Array.from(source, (char, i) => char === ' ' ? ' ' : encryptedAlphabet[(i + step) % encryptedAlphabet.length]).join('')
      return wrap(<div className="text-preview"><span className="tiny-label">DECRYPT / 08</span><h3 className="encrypted-text">{display}</h3><span className="type-hint">{compact ? 'A message, revealed.' : 'Scramble → resolve → reveal'}</span></div>, 'text-stage')
    }
    case 'squiggle':
      return wrap(<div className="text-preview"><span className="tiny-label">SVG DISTORTION / 02</span><h3 className="squiggle-copy">Nothing stays<br /><i>quite still.</i></h3></div>, 'text-stage')
    case 'sticky':
      return wrap(<div className="sticky-preview"><div className="sticky-visual"><span className="tiny-label">SCROLL / REVEAL</span><div className="sticky-art"><Orbit size={50} strokeWidth={1} /></div><strong>One story,<br />layered.</strong></div><div className="sticky-steps"><article className={activeStep === 0 ? 'current' : ''}><span>01</span><strong>Start with a signal</strong><small>Bring the most important idea forward.</small></article><article className={activeStep === 1 ? 'current' : ''}><span>02</span><strong>Build on the thought</strong><small>Let each layer earn its place.</small></article><article className={activeStep === 2 ? 'current' : ''}><span>03</span><strong>Leave room to move</strong><small>Make the next step feel natural.</small></article><button className="step-next" onClick={() => setStep((v) => v + 1)}>Next section <ArrowDownRight size={13} /></button></div></div>, 'sticky-stage')
    case 'timeline':
      return wrap(<div className="timeline-preview"><span className="tiny-label">OUR STORY / 2022 — 2026</span>{[['2022','A small beginning'],['2024','The system takes shape'],['2026','A new chapter']].map(([year, title], i) => <article key={year} className={activeStep === i ? 'current' : ''}><span className="timeline-dot" /><time>{year}</time><strong>{title}</strong><small>Good work, made with intention.</small></article>)}<button onClick={() => setStep((v) => v + 1)}>Advance story ↗</button></div>, 'timeline-stage')
    case 'dock':
      return wrap(<div className="dock-demo">{[Compass, LayoutDashboard, WandSparkles, CircleHelp].map((Icon, index) => <button key={index} onClick={() => setStep(index)} className={step % 4 === index ? 'active' : ''} title={['Discover','Overview','Create','Help'][index]}><Icon size={compact ? 17 : 20} /><span>{!compact && ['Discover','Overview','Create','Help'][index]}</span></button>)}</div>, 'dock-stage')
    case 'banner':
      return wrap(<div className="banner-demo"><span className="live-dot" />{notice ? 'You are all caught up.' : 'A new collection is ready for you.'}<button onClick={() => setNotice(!notice)}>{notice ? 'Dismiss' : 'Take a look'} <ArrowUpRight size={12} /></button></div>, 'banner-stage')
    case 'globe':
      return wrap(<div className="globe-demo"><div className="globe-ring ring-one" /><div className="globe-ring ring-two" /><div className="globe-core"><div className="globe-lat" /><div className="globe-lon" /><span className="globe-point point-one" /><span className="globe-point point-two" /><span className="globe-point point-three" /></div><div className="globe-label label-one">NYC <i>· 40.7°</i></div><div className="globe-label label-two">BER <i>· 52.5°</i></div><span className="globe-foot">A NETWORK WITHOUT EDGES</span></div>, 'globe-stage')
    case 'cards':
      return wrap(<div className="stack-preview"><div className="stack-back" /><div className="stack-middle" /><article className="stack-front"><span className="tiny-label">A NOTE FOR LATER</span><strong>{['Keep it moving.','Make it memorable.','Leave space to think.'][step % 3]}</strong><small>FIELD NOTES · 0{(step % 3) + 1}</small></article>{!compact && <button className="stack-next" onClick={() => setStep((v) => v + 1)}>Next note <ArrowUpRight size={13} /></button>}</div>, 'cards-stage')
    case 'pin':
      return wrap(<div className="pin-demo"><div className="pin-window"><div className="pin-top"><span /><span /><span /><small>northstar.studio</small></div><div className="pin-body"><span className="tiny-label">PRODUCT / 2026</span><h3>Bring the<br />big picture<br /><i>into focus.</i></h3><div className="pin-chart"><span /><span /><span /><span /><span /><span /></div></div></div><span className="pin-shadow" /></div>, 'pin-stage')
    case 'parallax':
      return wrap(<div className="parallax-preview">{['A quiet ritual','Make room','The long view','A finer detail','Less, better','Keep looking'].map((text, index) => <div className={`parallax-tile tile-${index + 1}`} key={text}><span>0{index + 1}</span><strong>{text}</strong></div>)}</div>, 'parallax-stage')
    case 'comparison':
      return wrap(<div className="compare-demo"><div className="compare-side compare-before"><span>BEFORE</span><strong>A lot to<br />look at.</strong><div className="compare-lines"><i /><i /><i /></div></div><div className="compare-side compare-after" style={{ clipPath: `inset(0 0 0 ${range}%)` }}><span>AFTER</span><strong>Room for<br /><i>what matters.</i></strong><div className="compare-lines"><i /><i /><i /></div></div><div className="compare-divider" style={{ left: `${range}%` }} /><input aria-label="Arraste para comparar" type="range" min="10" max="90" value={range} onChange={(event) => setRange(Number(event.target.value))} />{!compact && <span className="compare-hint">Arraste o controle</span>}</div>, 'compare-stage')
    case 'template': {
      const copy = templateCopy[item.slug] ?? templateCopy['saas-launch']
      return wrap(<div className={`template-preview template-${item.slug}`}><nav><a href="#home" onClick={(event) => event.preventDefault()}>{copy.brand}<span>®</span></a><div>{copy.nav.map((label) => <a href="#section" onClick={(event) => event.preventDefault()} key={label}>{label}</a>)}</div><button onClick={() => setNotice(!notice)}>{notice ? 'Request received' : copy.nav[0]} ↗</button></nav><div className={`template-hero template-hero-${item.slug}`}><span className="tiny-label">{copy.eyebrow}</span><h3>{copy.headline[0]}<br /><i>{copy.headline[1]}</i></h3><p>{copy.description}</p><button onClick={() => setNotice(!notice)}>{notice ? 'You’re on the list' : copy.action} <ArrowUpRight size={13} /></button></div><div className="template-bottom"><span>{copy.footer}</span><span>SCROLL TO EXPLORE ↓</span></div></div>, 'template-stage')
    }
    case 'button':
      return wrap(<div className="button-demo"><span className="tiny-label">A SMALL MOMENT OF MOTION</span><button onClick={() => setNotice(!notice)} className={notice ? 'clicked' : ''}>{notice ? 'Copied to your clipboard' : 'Start building'} <ArrowUpRight size={14} /></button><span className="button-foot">{notice ? <><Check size={12} /> Interaction complete</> : 'Move your cursor over the border'}</span></div>, 'button-stage')
    case 'logos':
      return wrap(<div className="logos-demo"><span className="tiny-label">TRUSTED BY CURIOUS TEAMS</span><div>{['northstar','plainform','MODERN / DAY','Atelier 09'].map((brand, i) => <strong key={brand} className={`logo-wordmark logo-${i}`}>{brand}</strong>)}</div></div>, 'logos-stage')
    default:
      return wrap(<div className="fallback-demo"><Command size={22} /><span>{item.name}</span></div>)
  }
}
