import { Suspense } from 'react'
import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { PostCard } from '@/components/post-card'
import { Clock, FileText } from 'lucide-react'

export const revalidate = 60

const POSTS_PER_PAGE = 6

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const allPosts = getAllPosts()
  const categories = getAllCategories()

  const currentPage = params.page ? parseInt(params.page, 10) : 1
  const selectedCategory = params.category

  const filteredPosts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-[680px] px-6 py-16 md:py-24">
        <h1 className="font-sans text-4xl font-bold tracking-tight text-foreground mb-4">
          Blog
        </h1>
        <p className="font-serif text-lg text-foreground-secondary leading-relaxed">
          {selectedCategory
            ? `Posts tagged with "${selectedCategory}"`
            : 'All posts from the archive.'}
        </p>
      </section>

      {categories.length > 0 && (
        <section className="mx-auto max-w-[680px] px-6 pb-12">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider border rounded-full transition-colors ${
                !selectedCategory
                  ? 'border-accent text-accent'
                  : 'border-border text-foreground-secondary hover:border-accent hover:text-accent'
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider border rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'border-accent text-accent'
                    : 'border-border text-foreground-secondary hover:border-accent hover:text-accent'
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[680px] px-6 pb-16">
        {paginatedPosts.length > 0 ? (
          <div className="space-y-8">
            {paginatedPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="h-12 w-12 text-foreground-muted mb-4" />
            <p className="text-foreground-secondary mb-4">
              No posts found in this category.
            </p>
            <Link
              href="/blog"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              View all posts
            </Link>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}${
                  selectedCategory
                    ? `&category=${encodeURIComponent(selectedCategory)}`
                    : ''
                }`}
                className="px-3 py-1.5 text-sm border border-border rounded hover:border-accent transition-colors"
              >
                Previous
              </Link>
            )}
            <span className="px-3 py-1.5 text-sm text-foreground-muted">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}${
                  selectedCategory
                    ? `&category=${encodeURIComponent(selectedCategory)}`
                    : ''
                }`}
                className="px-3 py-1.5 text-sm border border-border rounded hover:border-accent transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  )
}