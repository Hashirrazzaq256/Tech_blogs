import Link from 'next/link'
import { Clock } from 'lucide-react'
import type { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/posts'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: PostMeta
  className?: string
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'block group border-l-2 border-transparent hover:border-accent transition-all duration-200 pl-4 -ml-4',
        className
      )}
    >
      <article className="space-y-2">
        <div className="flex items-center gap-3 text-xs text-foreground-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
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
  )
}