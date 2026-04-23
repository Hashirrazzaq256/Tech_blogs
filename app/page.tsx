import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { PostCard } from '@/components/post-card'
import { NewsletterForm } from '@/components/newsletter-form'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

const POSTS_PER_PAGE = 6

export default async function HomePage() {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const recentPosts = allPosts.slice(0, POSTS_PER_PAGE)

  return (
    <div className="animate-fade-in">
      <section className="mx-auto max-w-[680px] px-6 py-16 md:py-24">
        <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          A minimalist blog for<br className="hidden md:block" /> thoughtful ideas.
        </h1>
        <p className="font-serif text-lg text-foreground-secondary leading-relaxed">
          Exploring the intersection of design, development, and digital culture.
          Built for reading, optimized for clarity.
        </p>
      </section>

      {categories.length > 0 && (
        <section className="mx-auto max-w-[680px] px-6 pb-16">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground-secondary border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[680px] px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-sans text-sm font-semibold text-foreground-muted uppercase tracking-wider">
            Recent Posts
          </h2>
          <Link
            href="/blog"
            className="font-sans text-sm font-medium text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="space-y-8">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-foreground-secondary text-center py-12">
            No posts yet. Check back soon.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-[680px] px-6 pb-16">
        <div className="border border-border rounded-lg p-8">
          <h2 className="font-sans text-xl font-semibold text-foreground mb-2">
            Subscribe to the newsletter
          </h2>
          <p className="text-foreground-secondary text-sm mb-6">
            Get new posts delivered to your inbox. No spam, just what matters.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}