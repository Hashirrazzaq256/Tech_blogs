import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

export async function getMDXSource(content: string) {
  return await serialize(content, {
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
  })
}