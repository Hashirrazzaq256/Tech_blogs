'use client'

import { useState, useCallback } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CodeBlock({ children, ...props }: any) {
  const [copied, setCopied] = useState(false)

  const getRawText = (node: any): string => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(getRawText).join('')
    if (node?.props?.children) return getRawText(node.props.children)
    return ''
  }

  const rawCode = getRawText(children)
  const language = (props['data-language'] || 'text').toLowerCase()

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(rawCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [rawCode])

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-[#16161e] border-b border-white/10 rounded-t-lg">
        <span className="text-xs font-mono text-foreground-muted uppercase">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-foreground-muted" />
          )}
        </button>
      </div>
      <pre
        {...props}
        className="font-mono text-sm leading-[1.7] p-4 rounded-b-lg overflow-x-auto"
        style={{
          backgroundColor: '#1e1e2e',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)',
        }}
      >
        {children}
      </pre>
    </div>
  )
}
