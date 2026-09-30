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
- Ben's decisions that override WEB.md live in the "Site overrides" block at the end of `site.css`. They win over the
  kit: dark theme is deeper with black shadows and a muted outline, hover is colour-only (no lift or press), sections
  have no rule between them, and images never get a frame or shadow.
- No Tailwind, no SCSS, no UI component library. Plain semantic HTML with the classes from `base.css` (`container`,
  `section`, `grid`, `card`, `btn btn--primary|secondary|cta`, `btn-row`, `eyebrow`, `lead`, `muted`, `display`,
  `framed`).
- Depth is required (WEB.md §6) for cards, buttons, inputs and code blocks, never for images. Shadows are solid,
  unblurred, down-right, `--color-shadow` only (never coloured), sized from `--shadow-sm|md|lg`.
- Logo: `src/components/Logo.astro` (`variant="lockup|mark|monogram"`). Never redraw it or set it in type.
- Icons: Lucide through `astro-icon` (`<Icon name="lucide:…" aria-hidden="true" size="1.25rem" />`), used sparingly;
  `site.css` squares off the line caps.
- Motion: colour transitions only. No lift, press, page-transition animations (so no `ClientRouter`) or parallax.
- Illustrations are "spot" art: transparent with a round cream backdrop (`hero-image.webp`, `*-spot.webp`), passed to
  `ContentMedia` with `art`.
