# Web design system changelog

## 1.6

- **New spot illustrations** (`web/spot/`): `collaborate`, `coming-soon`, `website`. Drawn from the system's own parts, coloured entirely by classes mapped to tokens, so they switch with light and dark. Fixed light/dark SVG and PNG exports are in the kit's `spot/` folder.
- **Spot styles** added to `base.css` (`.spot` and the `sp-*` classes). `img.spot` is excluded from the image outline.
- **The old circular illustrations are retired.** They had baked-in colours and couldn't follow the theme. `.media-round` stays for avatars and other circular art.
- `WEB.md` has rules for drawing new spots so the set stays consistent.

## 1.5

From the site build. The site's circular-illustration override can be deleted after re-copying `base.css`.

- **New `.media-round`** for square images whose artwork is a circle filling the file edge to edge (avatars, circular illustrations). It rounds the image into a circle (`--radius-round`) so the standard 2px outline traces the art. Still no shadow.
- **Round shapes rule widened** from "avatars only" to "avatars and circular illustrations". Everything else stays square. Not for cropping rectangular images into circles.

## 1.4

From the site build. The site's "image borders" override can be deleted after re-copying `base.css`.

- **Images and video get the 2px outline** (`--border-strong`, `--color-outline`: Ink on light, `#7A746A` on dark) and square corners, the same edge as buttons. **Still no shadow on any asset.** This replaces 1.3's "no shadows, outlines or frames on images".
- Applied by default to `img` and `video` inside `<main>`, at zero specificity (`:where`) so components can override it.
- No outline inside `.card__media` (the card frames it) and none on anything marked `.media-bare` (for a logo or icon placed as an `<img>`).

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
