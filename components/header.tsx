'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/search', label: 'Search' },
  { href: '/newsletter', label: 'Newsletter' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-sans text-xl font-semibold tracking-tight text-foreground hover:text-accent transition-colors"
          >
            Industrial
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors link-underline',
                  pathname === link.href
                    ? 'text-accent'
                    : 'text-foreground-secondary hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/search">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <Link href="/search">
                <Search className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'text-base font-medium transition-colors px-2 py-2 rounded-md -mx-2',
                  pathname === link.href
                    ? 'text-accent bg-surface'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-surface'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}