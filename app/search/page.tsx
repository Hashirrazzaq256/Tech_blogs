import { getAllPosts } from '@/lib/posts'
import { SearchClient } from '@/components/search-client'

export const revalidate = 60

export default function SearchPage() {
  const posts = getAllPosts()

  return <SearchClient initialPosts={posts} />
}