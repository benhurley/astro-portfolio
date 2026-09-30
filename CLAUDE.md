# CLAUDE.md

Astro 5 static site for Ben Ventures (benvent.com), deployed on Netlify from `main`.

## Commands

- `npm run dev` · `npm run build` · `npm run preview` · `npm run lint` · `npm run format`
- There are no unit tests. Verify with `npm run build`, `npm run lint`, and by looking at the built pages in both themes.
- `package-lock.json` is gitignored. In a fresh worktree, copy it from the main checkout before `npm ci`, or run
  `npm install`.

## Design system

- The spec is `docs/brand/WEB.md`. Follow it; it wins over habit.
- `src/styles/brand/{tokens,base}.css` are verbatim from the brand kit. Don't edit them; add site-level styles to
  `src/styles/site.css` or a component `<style>` using tokens only.
- No Tailwind, no SCSS, no UI component library. Plain semantic HTML with the classes from `base.css` (`container`,
  `section`, `section-cta`, `grid`, `card` + `card__media`, `btn btn--primary|secondary|cta`, `btn-row`, `link-button`,
  `eyebrow`, `lead`, `muted`, `display`).
- Depth is required (WEB.md §6) for cards, buttons, inputs and code blocks, never for images or other media. Outline
  in `--color-outline`, shadow in `--color-shadow` (never coloured), sized from `--shadow-sm|md|lg`. Never
  white/Paper shadows.
- Ben's deliberate departures from the kit live in the numbered "Site overrides" block at the end of `site.css`
  (dark shadows in outline grey, secondary button hover, always-on header edge, 44–72px display type). When a kit
  update covers one, delete it from the block.
- No lines or alternating backgrounds between sections. The one exception is the home page's single "guiding
  principle" band, modelled on the old site's: always dark (code-block colours), plain (the page grid stops at it),
  with a cyan `.badge` label and a normal h2. Ben rejected a Paper band in dark mode, a full cyan band and the yellow
  highlight.
- Stacked sections share one `--section-space` gap (site.css "Section rhythm"); don't let their padding double.
- The page has a faint drafting-grid texture (`--grid-line`, `--grid-size` in `site.css`), restoring the old site's
  grid in brand colours. Keep it subtle; raised elements have solid fills over it.
- If the brand kit changes, re-copy `web/tokens.css`, `web/base.css` and `web/WEB.md` verbatim, diff them first, and
  adapt the site to them. Don't patch the kit's rules in `site.css`.
- Logo: `src/components/Logo.astro` (`variant="lockup|mark|monogram"`). Never redraw it or set it in type.
- Icons: Lucide through `astro-icon` (`<Icon name="lucide:…" aria-hidden="true" size="1.25rem" />`), used sparingly;
  `site.css` squares off the line caps.
- Motion: colour transitions only. No lift, press, page-transition animations (so no `ClientRouter`) or parallax.
- Illustrations are "spot" art: transparent with a round cream backdrop (`hero-image.webp`, `*-spot.webp`), passed to
  `ContentMedia` with `art`.
