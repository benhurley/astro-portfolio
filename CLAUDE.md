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
  `section`, `section-cta`, `grid`, `card` + `card__media`, `btn btn--primary|magenta|secondary`, `btn-row`, `link-button`,
  `eyebrow`, `lead`, `muted`, `display`).
- Depth is required (WEB.md §6) for cards, buttons, inputs and code blocks, never for images or other media. Outline
  and shadow come from tokens only: Ink in light; tonal in dark (quiet `#57504D` line + near-black shadow, and
  coloured buttons drop the outline for a deep shade of their own fill). Never white or light shadows. Spots are flat.
- If Ben wants something the kit doesn't allow, add it as a labelled, numbered override block at the end of
  `site.css` and list it for the kit maintainers; delete it once a kit update covers it. Open at v1.15: 32px band padding (kit 48px), spots shrink to
  160px (centred, text stays left) on phones, and Title Case copy (below).
- Copy: Title Case for headings, buttons, nav and link labels (major words capitalised; a, an, the, and, or, to, in,
  of, on, for, with lowercase unless first). Running text (descriptions, leads, the band note) stays sentence case.
  Eyebrows and badges stay lowercase mono. WEB.md §3 says sentence case; Ben prefers Title Case.
- Images, video and iframes in `<main>` get the kit's 2px outline automatically (no class needed, never a shadow).
  Video embeds use `.embed-16x9`, a `title`, `loading="lazy"` and `youtube-nocookie.com`. Use
  `.media-round` for square files with circular art (the quote avatars), `.media-bare` to opt an image out.
- Follow the kit for sections (one shared gap, no lines), the guiding-principle `.band`, `.badge` and `.bg-grid`
  (hero only; the fade is the kit's design, and Ben is keeping it). Site-specific choices on top of the kit: a
  `.band__note` line under the band statement (copy doesn't have to come from the kit), and the project write-up is a
  centred `.prose` column, as on the original site.
- Keep `main`'s last child a real section: the kit pads `main > :last-child` for the closing gap.
- Brand colour per the kit (WEB.md §1.6): cyan = primary buttons, link underlines, focus; magenta = `.btn--magenta`
  (only beside a primary, one per view) and `.badge` (one per item: the band label, and project `badge` frontmatter
  such as `latest`); yellow = text selection only. Eyebrows stay muted.
- Logo: `src/components/Logo.astro` (`variant="lockup|mark|monogram"`). Never redraw it or set it in type.
- Icons: Lucide through `astro-icon` (`<Icon name="lucide:…" aria-hidden="true" size="1.25rem" />`), used sparingly;
  `site.css` squares off the line caps.
- Hover on buttons and linked cards changes only the fill (cyan lightens, magenta deepens, others tint): no outline,
  shadow or text change, and nothing moves. No page-transition animations (so no `ClientRouter`) or parallax.
- Illustrations are the kit's spot art: inline SVGs in `src/assets/spot/` (verbatim from the kit's `web/spot/`),
  rendered with `<Spot name="advise|coming-soon|legacy-site" />` or `<ContentMedia spot="…">`; the hero uses the
  kit's `.hero__split`. Never use `<img>` for them, never edit their
  colours, and draw new ones with the kit's `spot/spot.py` so the set matches.
