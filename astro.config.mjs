// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sidesteps.app',
  // The HTML compressor drops the space at a line break before an inline
  // tag (e.g. `as a\n<a>`), and Prettier wraps lines exactly there.
  compressHTML: false,
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
