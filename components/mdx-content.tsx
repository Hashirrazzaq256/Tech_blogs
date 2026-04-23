import { serialize } from 'next-mdx-remote/serialize'

export async function getMDXSource(content: string) {
  return await serialize(content, {
    mdxOptions: {
      development: false,
    },
  })
}