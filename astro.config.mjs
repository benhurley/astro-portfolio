import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import compress from 'astro-compress'
import icon from 'astro-icon'
import { fileURLToPath } from 'url'

import sitemap from '@astrojs/sitemap'

// Absolute URLs (og:image, canonical, sitemap) use the production domain, except on Netlify deploy previews and
// branch deploys, which point at their own URL so link previews work before a merge (Netlify sets CONTEXT and
// DEPLOY_PRIME_URL at build time).
const site =
  process.env.CONTEXT && process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL
    ? process.env.DEPLOY_PRIME_URL
    : 'https://www.benvent.com'

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  site,
  integrations: [
    mdx(),
    icon(),
    // HTML is left to Astro's compressHTML: astro-compress's HTML pass strips attribute quotes and reorders
    // attributes, which link-preview scrapers (iMessage, Slack) fail to parse, so they ignore og:image.
    compress({ HTML: false }),
    sitemap(),
  ],
  vite: {
    resolve: {
      alias: {
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@content': fileURLToPath(new URL('./src/content', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@public': fileURLToPath(new URL('./public', import.meta.url)),
        '@post-images': fileURLToPath(new URL('./public/posts', import.meta.url)),
        '@project-images': fileURLToPath(new URL('./public/projects', import.meta.url)),
      },
    },
  },
})
