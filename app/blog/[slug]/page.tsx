import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, ArrowLeft, Calendar, Tag } from 'lucide-react'
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import CodeBlock from '@/components/mdx-code-block'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

const components = {
  pre: CodeBlock,
  code: CodeBlock,
}

export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === resolvedParams.slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <article className="animate-fade-in">
      <header className="mx-auto max-w-[680px] px-6 py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Blog
        </Link>

        <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" />
            <span className="text-accent">{post.category}</span>
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-[680px] px-6 pb-8">
        <p className="font-serif text-lg text-foreground-secondary italic border-l-2 border-accent pl-4">
          {post.excerpt}
        </p>
      </section>

      <section className="mx-auto max-w-[680px] px-6 pb-16">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: {
                      dark: 'one-dark-pro',
                      light: 'github-light',
                    },
                    keepBackground: true,
                    defaultLang: 'plaintext',
                  },
                ],
              ],
            },
          }}
          components={components}
        />
      </section>

      {(prevPost || nextPost) && (
        <section className="mx-auto max-w-[680px] px-6 py-16 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group p-4 border border-border rounded-lg hover:border-accent transition-colors"
              >
                <span className="text-xs text-foreground-muted uppercase tracking-wider">
                  Previous
                </span>
                <h3 className="font-sans text-lg font-semibold text-foreground group-hover:text-accent transition-colors mt-1">
                  {prevPost.title}
                </h3>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group p-4 border border-border rounded-lg hover:border-accent transition-colors md:col-start-2"
              >
                <span className="text-xs text-foreground-muted uppercase tracking-wider">
                  Next
                </span>
                <h3 className="font-sans text-lg font-semibold text-foreground group-hover:text-accent transition-colors mt-1">
                  {nextPost.title}
                </h3>
              </Link>
            )}
          </div>
        </section>
      )}
    </article>
  )
}
