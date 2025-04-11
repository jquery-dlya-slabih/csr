import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import UnpluginDetectDuplicatedDeps from 'unplugin-detect-duplicated-deps/vite';
import UnpluginUnused from 'unplugin-unused/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';
import unusedCode from 'vite-plugin-unused-code';

import manifest from './pwa.manifest.ts';
import { getTSConfigPaths, getSVGR, getViteImageOptimizer, cssConfig } from './vite.shared.ts';

export default defineConfig({
  css: cssConfig.css,
  build: {
    ...cssConfig.build
  },
  server: {
    port: 3000,
    host: 'csr-local.com'
  },
  plugins: [
    mkcert({
      hosts: ['csr-local.com'],
      savePath: 'ssl'
    }),
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    getTSConfigPaths(),
    tailwindcss(),
    react(),
    getSVGR(),
    getViteImageOptimizer(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest,
      outDir: 'dist',
      workbox: {
        globPatterns: ['**/*.{js,css,svg,png,webp}'],
        navigateFallback: null
      }
    }),
    unusedCode({
      patterns: ['src/entry-client.tsx', 'src/index.css'],
      failOnHint: true
    }),
    UnpluginUnused(),
    UnpluginDetectDuplicatedDeps({
      throwErrorWhenDuplicated: true
    })
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts'
  }
});
