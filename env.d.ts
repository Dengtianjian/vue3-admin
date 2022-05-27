/// <reference types="vite/client" />

import "vue-router"

declare module 'vue-router' {
  interface RouteMeta {
    title?: string,
    icon?: unknown,
    // key?: string,
    addToMenu?: boolean,
    auth?: boolean
  }
}