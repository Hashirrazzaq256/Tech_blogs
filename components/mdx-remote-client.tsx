'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'

interface MDXClientProps {
  source: MDXRemoteSerializeResult
}

const components = {
  h1: (props: any) => <h1 className="font-sans text-3xl font-bold mt-10 mb-4 text-foreground" {...props} />,
  h2: (props: any) => <h2 className="font-sans text-2xl font-semibold mt-10 mb-4 text-foreground" {...props} />,
  h3: (props: any) => <h3 className="font-sans text-xl font-semibold mt-8 mb-3 text-foreground" {...props} />,
  p: (props: any) => <p className="mb-5 text-foreground-secondary font-serif leading-7" {...props} />,
  ul: (props: any) => <ul className="list-disc list-outside mb-5 pl-6 text-foreground-secondary" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-outside mb-5 pl-6 text-foreground-secondary" {...props} />,
  li: (props: any) => <li className="mb-2 text-foreground-secondary" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-2 border-accent pl-5 italic my-5 text-foreground-secondary" {...props} />
  ),
  code: (props: any) => <code className="font-mono text-sm bg-surface px-1.5 py-0.5 rounded text-foreground" {...props} />,
  pre: (props: any) => (
    <pre className="bg-surface p-4 rounded-lg overflow-x-auto mb-5 text-sm text-foreground" {...props} />
  ),
  hr: () => <hr className="border-border my-10" />,
  a: (props: any) => (
    <a className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent" {...props} />
  ),
  strong: (props: any) => <strong className="font-semibold text-foreground" {...props} />,
}

export function MDXRemoteClient({ source }: MDXClientProps) {
  return <MDXRemote {...source} components={components} />
}