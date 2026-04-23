/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}