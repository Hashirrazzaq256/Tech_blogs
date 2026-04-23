'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { subscribeToNewsletter } from '@/lib/newsletter'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  className?: string
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) return

    setLoading(true)
    setStatus('idle')

    const result = await subscribeToNewsletter(email)

    setLoading(false)

    if (result.success) {
      setStatus('success')
      setMessage('Thanks for subscribing!')
      setEmail('')
    } else {
      setStatus('error')
      setMessage(result.error || 'Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          aria-label="Email address"
          className="flex-1"
        />
        <Button type="submit" disabled={loading} className="sm:w-auto">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Subscribing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Subscribe
            </span>
          )}
        </Button>
      </div>

      {status !== 'idle' && (
        <p
          className={cn(
            'text-sm animate-fade-in',
            status === 'success' ? 'text-green-400' : 'text-red-400'
          )}
        >
          {message}
        </p>
      )}
    </form>
  )
}