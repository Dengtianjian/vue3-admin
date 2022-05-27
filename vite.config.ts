/// <reference types="vitest" />

import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    // global: true
  },
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    process.env.REPORT ?
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) : null
  ],
  base: "/dashboard/",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "!": fileURLToPath(new URL("./src/views", import.meta.url)),
      "#": fileURLToPath(new URL("./src/components", import.meta.url)),
      "$": fileURLToPath(new URL("./src/api", import.meta.url)),

      //* 新的别名
      "@Service": fileURLToPath(new URL("./src/service", import.meta.url)),
    }
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "assets/[name]-[hash].js",
        manualChunks(id, { getModuleIds, getModuleInfo }) {
          if (id.includes('naive-ui')) {
            return "assets/naive-ui/" + id.toString().slice(id.toString().lastIndexOf("/") + 1, id.toString().lastIndexOf(".")) + "[hash]";
          } else if (id.includes('node_modules')) {
            return "assets/naive-ui/" + id.toString().split('node_modules/')[1].split('/')[1].toString();
          }
        }
      }
    }
  }
})
