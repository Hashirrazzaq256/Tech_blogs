'use client'

import { useState, useCallback } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CodeBlockWrapper({ children, ...props }: any) {
  const [copied, setCopied] = useState(false)
  
  const childProps = (children as React.ReactElement)?.props || {}
  const code = childProps.children || ''
  const className = childProps.className || ''
  const language = className.replace('language-', '') || 'text'
  const isBlock = className.startsWith('language-')

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(String(code))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  if (!isBlock) {
    return (
      <code className="font-mono text-sm bg-surface px-1.5 py-0.5 rounded text-foreground" {...props}>
        {children}
      </code>
    )
  }

  return (
    <div className="relative group my-6" {...props}>
      <div className="absolute left-0 top-0 right-0 flex items-center justify-between px-4 py-2 bg-[#16161e] border-b border-white/10 rounded-t-lg z-10">
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
        className="font-mono text-sm leading-[1.7] p-4 pt-12 rounded-b-lg overflow-x-auto"
        style={{
          backgroundColor: '#1e1e2e',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        }}
      >
        {children}
      </pre>
    </div>
  )
}