import { useState } from 'react'
import type { ReactNode } from 'react'
import { Check, Copy, FileCode2 } from 'lucide-react'
import { copyText } from '../clipboard'

export type CodeFiles = Record<string, string>

function tokenClass(value: string) {
  if (value.startsWith('//')) return 'token-comment'
  if (value.startsWith('"') || value.startsWith("'") || value.startsWith('`')) return 'token-string'
  if (value.startsWith('<') || value === '/>' || value === '>') return 'token-tag'
  if (/^(import|from|export|function|return|const|let|new|className|default|true|false|map|onClick|useState|useEffect|motion|div|span|button)$/.test(value)) return 'token-keyword'
  if (/^\d+$/.test(value)) return 'token-number'
  if (value.startsWith('#')) return 'token-color'
  return ''
}

const syntaxPattern = /(\/\/.*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|<\/?[A-Za-z][\w.-]*|\/?>(?=)|\b(?:import|from|export|function|return|const|let|new|className|default|true|false|map|onClick|useState|useEffect|motion|div|span|button)\b|\b\d+\b|#[0-9a-fA-F]{3,8})/g

function renderLine(line: string, lineIndex: number) {
  const parts: ReactNode[] = []
  let lastIndex = 0
  for (const match of line.matchAll(syntaxPattern)) {
    const value = match[0]
    const index = match.index ?? 0
    if (index > lastIndex) parts.push(line.slice(lastIndex, index))
    parts.push(<span className={tokenClass(value)} key={`${lineIndex}-${index}`}>{value}</span>)
    lastIndex = index + value.length
  }
  if (lastIndex < line.length) parts.push(line.slice(lastIndex))
  return parts.length ? parts : ' '
}

export function CodeBlock({ files }: { files: CodeFiles }) {
  const tabs = Object.keys(files)
  const [active, setActive] = useState(tabs[0] ?? 'Component.tsx')
  const [copied, setCopied] = useState(false)
  const content = files[active] ?? ''

  async function copyCode() {
    const didCopy = await copyText(content)
    setCopied(didCopy)
    if (didCopy) window.setTimeout(() => setCopied(false), 1800)
  }

  return <section className="code-window" aria-label="Código de implementação">
    <div className="code-window__top">
      <div className="code-tabs" role="tablist" aria-label="Arquivos do exemplo">
        {tabs.map((name) => <button role="tab" aria-selected={active === name} className={active === name ? 'is-active' : ''} onClick={() => setActive(name)} key={name}>
          <FileCode2 size={13} />{name}
        </button>)}
      </div>
      <button className="code-copy" onClick={copyCode} aria-label="Copiar código"><span>{copied ? 'Copiado' : 'Copiar código'}</span>{copied ? <Check size={14} /> : <Copy size={14} />}</button>
    </div>
    <pre className="code-body"><code>{content.split('\n').map((line, index) => <span className="code-line" key={`${active}-${index}`}><span className="line-number">{String(index + 1).padStart(2, '0')}</span><span className="line-content">{renderLine(line, index)}</span></span>)}</code></pre>
    <div className="code-window__footer"><span><i className="status-dot" /> Exemplo independente · React + CSS</span><span>UTF-8</span></div>
  </section>
}
