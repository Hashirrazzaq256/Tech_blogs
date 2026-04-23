import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const posts = getAllPosts()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://industrial.blog'

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Industrial Blog</title>
    <description>A minimalist blog for thoughtful ideas.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}