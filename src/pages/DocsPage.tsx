import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  FileCode,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { copyText } from '../clipboard'
import { sound } from '../utils/audio'

export function DocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('introduction')

  const handleCopy = async (id: string, text: string) => {
    sound.playClick()
    const ok = await copyText(text)
    if (ok) {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 1800)
    }
  }

  const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'installation', label: 'Installation' },
    { id: 'utils', label: 'Utility Helper (cn)' },
    { id: 'tailwind', label: 'Tailwind Config' },
    { id: 'cli', label: 'CLI & Usage' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ]

  const installCmd = 'pnpm add framer-motion lucide-react clsx tailwind-merge'

  const utilsCode = `// lib/utils.ts
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`

  const tailwindConfigCode = `// tailwind.config.js
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [\`--\${key}\`, val])
  );

  addBase({
    ":root": newVars,
  });
}`

  const cliCode = `npx aceternity-ui add lamp-effect
# or manually copy from the Component Explorer`

  return (
    <div className="docs-page-container">
      {/* Docs Sidebar */}
      <aside className="docs-sidebar">
        <div className="docs-sidebar-inner">
          <span className="docs-sidebar-title">DOCUMENTATION</span>
          <nav className="docs-nav-list">
            {sections.map((sec) => (
              <button
                key={sec.id}
                className={`docs-nav-item ${activeSection === sec.id ? 'active' : ''}`}
                onClick={() => {
                  sound.playClick()
                  setActiveSection(sec.id)
                  document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>{sec.label}</span>
              </button>
            ))}
          </nav>

          <div className="docs-sidebar-divider" />

          <div className="docs-sidebar-card">
            <span className="card-badge">NEED HELP?</span>
            <p>Join the Discord community for immediate assistance from creators.</p>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="docs-help-link"
            >
              <span>Discord Support</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </aside>

      {/* Docs Content */}
      <main className="docs-content">
        {/* Intro */}
        <section id="introduction" className="docs-section">
          <div className="eyebrow-pill">
            <Sparkles size={13} className="text-violet-400" />
            <span>GETTING STARTED</span>
          </div>
          <h1 className="docs-title">Aceternity UI Documentation</h1>
          <p className="docs-lead">
            Aceternity UI is a curated collection of modern, interactive, and
            animated components crafted with React, Framer Motion, and Tailwind CSS.
          </p>
          <p className="docs-paragraph">
            Just like <strong>shadcn/ui</strong>, this is not an opaque npm component
            library that locks you into rigid styling. You copy and paste the components
            directly into your own codebase. You own the code, the animations, and the
            customization.
          </p>
        </section>

        {/* Installation */}
        <section id="installation" className="docs-section">
          <h2 className="docs-heading">Installation & Core Dependencies</h2>
          <p className="docs-paragraph">
            Aceternity components require only a few lightweight dependencies for spring
            physics, icons, and class management:
          </p>

          <div className="docs-code-card">
            <div className="code-card-header">
              <div className="code-lang">
                <Terminal size={14} />
                <span>BASH / TERMINAL</span>
              </div>
              <button
                className="btn-copy-code"
                onClick={() => handleCopy('install', installCmd)}
              >
                {copiedId === 'install' ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="code-content">
              <code>{installCmd}</code>
            </pre>
          </div>
        </section>

        {/* Utility Helper */}
        <section id="utils" className="docs-section">
          <h2 className="docs-heading">Utility Helper (cn)</h2>
          <p className="docs-paragraph">
            We use a utility function named <code>cn</code> that seamlessly combines{' '}
            <code>clsx</code> and <code>tailwind-merge</code>. This allows dynamic class
            toggling without Tailwind specificity conflicts.
          </p>

          <div className="docs-code-card">
            <div className="code-card-header">
              <div className="code-lang">
                <FileCode size={14} />
                <span>lib/utils.ts</span>
              </div>
              <button
                className="btn-copy-code"
                onClick={() => handleCopy('utils', utilsCode)}
              >
                {copiedId === 'utils' ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="code-content">
              <code>{utilsCode}</code>
            </pre>
          </div>
        </section>

        {/* Tailwind Config */}
        <section id="tailwind" className="docs-section">
          <h2 className="docs-heading">Tailwind Configuration</h2>
          <p className="docs-paragraph">
            Add the following configuration to your <code>tailwind.config.js</code> to
            enable color variables and custom animation keyframes:
          </p>

          <div className="docs-code-card">
            <div className="code-card-header">
              <div className="code-lang">
                <FileCode size={14} />
                <span>tailwind.config.js</span>
              </div>
              <button
                className="btn-copy-code"
                onClick={() => handleCopy('tailwind', tailwindConfigCode)}
              >
                {copiedId === 'tailwind' ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="code-content">
              <code>{tailwindConfigCode}</code>
            </pre>
          </div>
        </section>

        {/* CLI Usage */}
        <section id="cli" className="docs-section">
          <h2 className="docs-heading">Adding Components</h2>
          <p className="docs-paragraph">
            You can either copy the component code directly from our interactive
            explorer or use the official CLI command:
          </p>

          <div className="docs-code-card">
            <div className="code-card-header">
              <div className="code-lang">
                <Terminal size={14} />
                <span>CLI COMMAND</span>
              </div>
              <button
                className="btn-copy-code"
                onClick={() => handleCopy('cli', cliCode)}
              >
                {copiedId === 'cli' ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="code-content">
              <code>{cliCode}</code>
            </pre>
          </div>
        </section>

        {/* Next Steps CTA */}
        <div className="docs-footer-cta">
          <div className="cta-left">
            <h3>Ready to build?</h3>
            <p>Explore over 30 interactive components with live physics.</p>
          </div>
          <Link
            to="/components"
            className="btn-aceternity-primary"
            onClick={() => sound.playClick()}
          >
            <span>Explore Components</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </main>
    </div>
  )
}
