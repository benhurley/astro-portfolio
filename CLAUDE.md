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
  `section`, `grid`, `card`, `btn btn--primary|secondary|cta`, `btn-row`, `eyebrow`, `lead`, `muted`, `display`,
  `framed`).
- Depth is required (WEB.md §6): never ship a flat card, button, input, code block or content image. Shadows are
  solid, unblurred, down-right, `--color-shadow` only (never coloured), sized from `--shadow-sm|md|lg`.
- Logo: `src/components/Logo.astro` (`variant="lockup|mark|monogram"`). Never redraw it or set it in type.
- Icons: Lucide through `astro-icon` (`<Icon name="lucide:…" aria-hidden="true" size="1.25rem" />`), used sparingly;
  `site.css` squares off the line caps.
- Motion: colour transitions plus the kit's hover lift / press on buttons and linked cards. No page-transition
  animations (so no `ClientRouter`), no parallax.
