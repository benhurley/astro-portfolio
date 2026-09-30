# Web design system changelog

## 1.13

- **Outline and shadow always match:** Ink in light mode, **Paper in dark mode**, the exact mirror. The grey (`#7A746A`) outline and shadow are gone from dark mode. `--color-shadow-hover` and `--shadow-*-hover` removed.
- **Cyan is now the primary button** (`.btn--primary`). The Ink-filled primary is retired. `.btn--cta` remains as an alias.
- **New magenta button** (`.btn--magenta`, `--color-alt` `#D4007E` with white text): a second call to action beside the primary.
- **Hover changes only the fill**, away from the text colour: cyan → `#66CFF5`, magenta → `#B8006D`, secondary buttons and linked cards → `--color-hover-tint`. Outline, shadow and text never change.
- Because outlines are Paper in dark mode, images, embeds and the header edge are Paper there too.

## 1.12

From the site build. The site's button-text override can be deleted after re-copying `base.css`.

- **Fixed: button and card text changed colour on hover.** The plain-link rule `a:hover` also matched `a.btn` and `a.card`; until 1.10 the per-button hover colours hid it. On a cyan CTA in dark mode the text turned cyan on cyan and vanished. Now `a:not(.btn, .card):hover`.
- **`colors/tokens.json` is generated** from `tokens.css` on every build (brand inks with CMYK/Pantone, every colour token for light and dark, and all non-colour tokens). It had not been updated since 1.2. The build also fails if the two dark-theme blocks in `tokens.css` differ.
- **coming-soon has one cyan element:** the phone's button is outlined, per the spot rules.
- **Unused spot styles removed** from `base.css` (`sp-glyph`, `sp-join`, `sp-magenta`, `sp-screen*`, `sp-stroke-cyan`, `sp-wrench*`, `sp-yellow`). Spot classes now live only in `spot.py` and are injected into `base.css` by the build, which fails on any unused or undefined class.
- The fixed spot exports read their colours from `tokens.css` instead of a copy inside `spot.py`.

## 1.11

- **Badges are magenta**, not yellow: `--color-badge` `#D4007E` with white text (5.1:1, both themes). The logo magenta `#EC008C` can't carry small text (every pairing is under 4.5:1), so the badge uses this slightly deeper shade. Magenta gets a small, repeated UI job that balances cyan; yellow stays as text selection.
- New tokens `--color-badge`, `--color-badge-fg`.

## 1.10

- **Shadows are the outline grey `#7A746A` at rest, in both themes.** In light mode an Ink shadow under the Ink primary button merged into one block; grey never matches any fill.
- **One hover for every button and linked card: the shadow darkens** (grey → Ink in light, grey → black in dark) via new `--color-shadow-hover` and `--shadow-sm/md/lg-hover`. Fills, outlines and text no longer change on hover. Removed: the cyan primary hover, the accent outline on secondary, the lighter CTA fill (`--color-cta-hover` deleted), the accent outline and title on cards.
- **Badges are yellow** (fill, with Ink text, 13.9:1), giving the reserved ink a job. Never yellow text.
- Known and accepted: on hover in light mode, the Ink primary button sits on an Ink shadow, only while the pointer is on it.

## 1.9

From the site build. All three site.css overrides (hero art, band padding, embed border) can be deleted after re-copying `base.css`.

- **Hero illustration hidden below 1024px.** It only appears beside the headline. 1.7 said to stack it under the text on mobile, which looked lopsided on phones and tablets.
- **Band padding back to 48px** (`--space-7`) inside, at every size. 1.3 had changed it to a full `--section-space` (64 / 96px) without flagging it, undoing the approved 48px.
- **Fixed: embeds never got their outline.** The iframe border reset (`iframe { border: 0 }`, specificity 0,0,1) beat the zero-specificity media outline rule, so YouTube embeds stayed unoutlined. The reset is now `:where(iframe)`.

## 1.8

- **Spot art simplified**, back to the format of the original illustrations: one object on a soft circle. `collaborate` → **`advise`** (two speech bubbles: a question, and a cyan reply with a check), **`coming-soon`** (tablet and phone, simple page, cyan button), `website` → **`legacy-site`** (a browser window stuck on a loading spinner). Update references to the old file names.
- **Spot grid plates removed.** Spots sit on a circle (`sp-disc`) now, so the 1.7 "hide the spot grid on a gridded background" rule and `.spot--no-plate` are gone; a spot can sit on `.bg-grid` as-is.
- **Spot rules rewritten** for simplicity: one idea, few shapes, no people, no words, one cyan element.
- New spot classes: `sp-disc`, `sp-track`, `sp-stroke-ink`, `sp-stroke-strong`, `sp-screen`, `sp-screen-muted`, `sp-screen-line`. Removed: `sp-grid`.

## 1.7

From the site build. Both site.css overrides (hero spot grid, YouTube outline) can be deleted after re-copying `base.css`.

- **Spot on a gridded background:** the spot's own grid plate is hidden automatically inside `.bg-grid`, and `.spot--no-plate` does the same anywhere else. The two grids can't line up and together read as plaid. New spot rule 8 in `WEB.md`.
- **New `.hero__split`** layout for a hero with an illustration (art beside the text from 1024px, below it on mobile). The reference page uses it.
- **Embeds get the media outline:** `iframe` joins `img` and `video` in the outline rule and its exceptions (`.card__media`, `.media-bare`). The browser's default iframe border is removed.
- **New `.embed-16x9`** for full-width 16:9 video embeds, with guidance: `title` attribute, `loading="lazy"`, `youtube-nocookie.com`.

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
