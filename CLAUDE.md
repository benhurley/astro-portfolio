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
  in `--color-outline`; shadow in `--color-shadow` (outline grey at rest, both themes), sized from
  `--shadow-sm|md|lg`. Never white/Paper or brand-coloured shadows.
- If Ben wants something the kit doesn't allow, add it as a labelled, numbered override block at the end of
  `site.css` and list it for the kit maintainers; delete it once a kit update covers it. Open at v1.11: button text
  colours are pinned on hover, because the kit's `a:hover` accent colour leaks into link-buttons.
- Images, video and iframes in `<main>` get the kit's 2px outline automatically (no class needed, never a shadow).
  Video embeds use `.embed-16x9`, a `title`, `loading="lazy"` and `youtube-nocookie.com`. Use
  `.media-round` for square files with circular art (the quote avatars), `.media-bare` to opt an image out.
- Follow the kit for sections (one shared gap, no lines), the guiding-principle `.band`, `.badge` and `.bg-grid`
  (hero only; the fade is the kit's design, and Ben is keeping it). Site-specific choices on top of the kit: a
  `.band__note` line under the band statement (copy doesn't have to come from the kit), and the project write-up is a
  centred `.prose` column, as on the original site.
- Keep `main`'s last child a real section: the kit pads `main > :last-child` for the closing gap.
- Logo: `src/components/Logo.astro` (`variant="lockup|mark|monogram"`). Never redraw it or set it in type.
- Icons: Lucide through `astro-icon` (`<Icon name="lucide:…" aria-hidden="true" size="1.25rem" />`), used sparingly;
  `site.css` squares off the line caps.
- Hover on buttons and linked cards only darkens the shadow (`--shadow-*-hover`): no fill, outline or text change, and
  nothing moves. No page-transition animations (so no `ClientRouter`) or parallax.
- Illustrations are the kit's spot art: inline SVGs in `src/assets/spot/` (verbatim from the kit's `web/spot/`),
  rendered with `<Spot name="advise|coming-soon|legacy-site" />` or `<ContentMedia spot="…">`; the hero uses the
  kit's `.hero__split`. Never use `<img>` for them, never edit their
  colours, and draw new ones with the kit's `spot/spot.py` so the set matches.
