/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ROOT: string;
  readonly VITE_MEDIA_ROOT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
