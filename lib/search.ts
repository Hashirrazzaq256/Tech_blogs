import Fuse from 'fuse.js'
import type { PostMeta } from './posts'

const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'excerpt', weight: 0.3 },
    { name: 'category', weight: 0.2 },
    { name: 'tags', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
  ignoreLocation: true,
}

export function createSearchIndex(posts: PostMeta[]): Fuse<PostMeta> {
  return new Fuse(posts, fuseOptions)
}

export function searchPosts(fuse: Fuse<PostMeta>, query: string): PostMeta[] {
  if (!query.trim()) {
    return []
  }

  const results = fuse.search(query)
  return results.map((result) => result.item)
}