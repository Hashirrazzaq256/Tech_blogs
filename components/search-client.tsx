'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search as SearchIcon, X } from 'lucide-react'
import Fuse from 'fuse.js'
import type { PostMeta } from '@/lib/posts'
import { Input } from '@/components/ui/input'

const POSTS_PER_PAGE = 6

interface SearchClientProps {
  initialPosts: PostMeta[]
}

export function SearchClient({ initialPosts }: SearchClientProps) {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const fuse = useMemo(
    () =>
      new Fuse(initialPosts, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'excerpt', weight: 0.3 },
          { name: 'category', weight: 0.2 },
          { name: 'tags', weight: 0.1 },
        ],
        threshold: 0.3,
        includeScore: true,
        ignoreLocation: true,
      }),
    [initialPosts]
  )

  const results = useMemo(() => {
    if (!query.trim()) return initialPosts
    return fuse.search(query).map((result) => result.item)
  }, [query, fuse, initialPosts])

  const paginatedResults = results.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const totalPages = Math.ceil(results.length / POSTS_PER_PAGE)

  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-[680px] px-6 py-16 md:py-24">
        <h1 className="font-sans text-4xl font-bold tracking-tight text-foreground mb-6">
          Search
        </h1>

        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
          <Input
            type="search"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10 pr-10 h-12 text-lg"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('')
                setCurrentPage(1)
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground-muted hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="mt-4 text-sm text-foreground-muted">
          {results.length} {results.length === 1 ? 'result' : 'results'}
          {query && ` for "${query}"`}
        </p>
      </section>

      <section className="mx-auto max-w-[680px] px-6 pb-16">
        {paginatedResults.length > 0 ? (
          <div className="space-y-8">
            {paginatedResults.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group border-l-2 border-transparent hover:border-accent transition-all duration-200 pl-4 -ml-4"
              >
                <article className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-foreground-muted">
                    <time dateTime={post.date}>{post.date}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                    <span>·</span>
                    <span className="text-accent uppercase tracking-wider text-[10px] font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="font-sans text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-foreground-secondary line-clamp-2">
                    {post.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        ) : query ? (
          <p className="text-foreground-secondary text-center py-12">
            No results found for &quot;{query}&quot;
          </p>
        ) : (
          <p className="text-foreground-secondary text-center py-12">
            Start typing to search posts...
          </p>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1.5 text-sm border border-border rounded hover:border-accent transition-colors"
              >
                Previous
              </button>
            )}
            <span className="px-3 py-1.5 text-sm text-foreground-muted">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1.5 text-sm border border-border rounded hover:border-accent transition-colors"
              >
                Next
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}