import Link from 'next/link'
import { Github, Twitter, Rss } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: '/feed.xml', icon: Rss, label: 'RSS' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-sans text-sm font-semibold text-foreground hover:text-accent transition-colors"
            >
              Industrial
            </Link>
            <span className="text-foreground-muted text-sm">
              {currentYear}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-foreground-muted hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}