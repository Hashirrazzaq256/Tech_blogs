import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://industrial.blog'

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...postUrls,
  ]
}