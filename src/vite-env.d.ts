/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UNSPLASH_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
