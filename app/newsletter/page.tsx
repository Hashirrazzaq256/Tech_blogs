import { NewsletterForm } from '@/components/newsletter-form'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

export const metadata = {
  title: 'Subscribe',
  description: 'Subscribe to get new posts delivered to your inbox.',
}

export default function NewsletterPage() {
  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-[680px] px-6 py-16 md:py-24">
        <h1 className="font-sans text-4xl font-bold tracking-tight text-foreground mb-4">
          Newsletter
        </h1>
        <p className="font-serif text-lg text-foreground-secondary leading-relaxed mb-8">
          Get new posts delivered to your inbox. No spam, no ads, just what matters.
          Unsubscribe anytime.
        </p>

        <div className="border border-border rounded-lg p-8">
          <NewsletterForm />
        </div>

        <div className="mt-12 space-y-4">
          <h2 className="font-sans text-sm font-semibold text-foreground-muted uppercase tracking-wider">
            What you'll get
          </h2>
          <ul className="space-y-3">
            {[
              { icon: CheckCircle2, text: 'New posts as soon as they are published' },
              { icon: AlertCircle, text: 'No spam, ever' },
              { icon: Send, text: 'Quick unsubscribe if you change your mind' },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3 text-sm text-foreground-secondary">
                <item.icon className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}