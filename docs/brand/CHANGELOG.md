# Web design system changelog

## 1.3

Feedback from the site build. The site's override block for these can be deleted after re-copying `tokens.css` and `base.css`.

- **Dark-mode shadows** are the outline grey `#7A746A`, not black. Rule in `WEB.md` §6 updated ("never coloured"; the old "always dark, never light" is gone).
- **Secondary button hover** keeps its fill; the outline and text turn `--color-accent`. It no longer fills with the text colour (which made it identical to Primary).
- **CTA button hover** lightens the fill to `--color-cta-hover` (`#66CFF5`, Ink text 9.2:1) instead of filling with the text colour. New token.
- **Header bottom edge** is always visible. The scroll-triggered version and its script are removed.
- **Display headline** is 44 → 72px: `clamp(2.75rem, 2.1667rem + 2.5926vw, 4.5rem)`.
- **Section spacing** is one shared gap: `.section` pads its top only, and the last block in `<main>` pads its bottom. `WEB.md` now says so explicitly (64 / 96px total, never doubled).
- **New components:** guiding-principle band (`.band`, `.band__statement`, tokens `--color-band-*`), badge (`.badge`), background grid (`.bg-grid`, tokens `--color-grid`, `--grid-cell`). A single band is explicitly allowed as the one exception to the no-alternating-backgrounds rule.
- **Card title hover** works for any heading level (`h2`–`h4`) or `.card__title`, not only `h3`.
- **Fixed:** the card media block was duplicated in `base.css`, and one copy had a broken selector (`a.card__media`). Now defined once.
- Not adopted (awaiting a brand decision): the proposed blue-slate dark theme.

## 1.0 – 1.2

Initial system, the cyan/magenta swap (cyan as the action colour), hard offset depth, and the move away from flat design.
