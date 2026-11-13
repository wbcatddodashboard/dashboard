import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Tests don't need Tailwind. An inline PostCSS config stops Vite from loading
  // postcss.config.mjs, whose string plugin form only Next.js understands.
  css: { postcss: { plugins: [] } },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    passWithNoTests: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
