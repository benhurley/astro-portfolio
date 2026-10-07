# Ben Ventures

The website for [Ben Ventures](https://www.benvent.com/): design and frontend development. Built with
[Astro](https://astro.build), deployed on Netlify.

## Getting started

Requires Node 24 (see `.nvmrc`).

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Start the dev server at `localhost:4321`  |
| `npm run build`   | Build the production site to `./dist/`    |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | ESLint, including strict `jsx-a11y` rules |
| `npm run format`  | Prettier                                  |

## Design system

The site implements the Ben Ventures brand kit's web design system (v1.0). The spec is
[`docs/brand/WEB.md`](docs/brand/WEB.md). Read it before changing anything visual.

Stylesheets load in this order, from `src/layouts/DefaultLayout.astro`:

1. `src/styles/fonts.css`: self-hosted Jost 400/500 (plus 400 italic) and JetBrains Mono 400, from `public/fonts/`
2. `src/styles/brand/tokens.css`: every colour, size, space and breakpoint. **The source of truth.**
3. `src/styles/brand/base.css`: element defaults and the core components (header, nav, buttons, links, cards, forms, footer)
4. `src/styles/site.css`: site-specific components (work cards, page header, prose, gallery, quote, lightbox) built only
   from tokens

`src/styles/brand/` holds verbatim copies of `web/tokens.css` and `web/base.css` from the brand kit. Update them by
copying from a new kit, not by editing them here. Prettier ignores that folder so they stay byte-identical.

The rules that matter most:

- **Tokens only.** No raw hex, font names or pixel sizes in component CSS where a token exists.
- **Depth, never flat.** Cards, buttons, inputs and code blocks get a 2px outline (`--color-outline`) and a hard,
  unblurred offset shadow from the scale (`--shadow-sm|md|lg`), always dark. Images and other media never do; in a
  card they fill the `.card__media` slot. Hover changes colour only; nothing moves.
- **Space, not lines.** Sections are separated by spacing alone. A section's closing CTA is centred (`.section-cta`).
- **Square corners, two weights (400/500), Title Case headings, buttons and nav** (Ben's call; the kit says sentence case). Cyan is the action colour (link underlines, focus, the one
  `.btn--cta` per page); magenta appears only in the logo's `<` and in code.
- **The logo is artwork.** Use `src/components/Logo.astro` (inline, theme-aware SVG), never an `<img>` or a font.
- **Light and dark.** The theme follows the OS; the footer toggle stores an override in `localStorage` (`bv-theme`).
  Check every change in both themes, at 360, 390, 768, 1024 and 1440px.
- **WCAG 2.2 AA** is the floor.

## Content

Portfolio projects are MDX files in `src/content/projects/` (schema in `src/content.config.ts`). Card images live in
`src/assets/images/projects/`; banners and gallery images in `public/projects/<project-id>/`.

Useful classes inside MDX: `gallery` / `gallery__link` / `gallery__img` for the image grid (links open `#imgN`
lightboxes), `link-row` + `external-link` for outbound links, `video` for embeds, and the `BlockQuote` component for
testimonials.

## Credits

Originally based on [Accessible Astro Starter](https://github.com/incluud/accessible-astro-starter) (MIT).
