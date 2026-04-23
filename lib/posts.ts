import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { format, parseISO } from 'date-fns'

const contentDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readingTime: string
  tags?: string[]
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(contentDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const stats = readingTime(fileContents)

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: String(data.date),
        category: data.category,
        readingTime: stats.text,
        tags: data.tags || [],
      }
    })

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    category: data.category,
    readingTime: stats.text,
    tags: data.tags || [],
    content,
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories).sort()
}

export function formatDate(dateString: string | Date): string {
  try {
    if (!dateString) return 'Unknown date'
    if (dateString instanceof Date) {
      return isNaN(dateString.getTime()) ? 'Unknown date' : format(dateString, 'MMMM d, yyyy')
    }
    const parsed = parseISO(String(dateString))
    return isNaN(parsed.getTime()) ? String(dateString) : format(parsed, 'MMMM d, yyyy')
  } catch {
    return String(dateString)
  }
}