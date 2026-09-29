# Ben Ventures: website design system (v1.0)

The spec for building and maintaining the Ben Ventures website on desktop and mobile.
It is implemented, not just described, in this folder:

| File | What it is |
|---|---|
| `tokens.css` | Every colour, font, size, space and breakpoint as CSS custom properties. **The source of truth.** |
| `base.css` | Element defaults and the components below (header, nav, buttons, links, cards, forms, code, footer). |
| `logo/*.inline.svg` | Theme-aware logo SVGs to paste inline. See `logo/README.md`. |
| `reference.html` | A live page showing every component. Open it in a browser and resize it; it's the visual answer to "what should this look like?" |
| `screenshots/` | The reference page at 1440px and 390px, light and dark, plus the open mobile menu. |

Load order: fonts → `tokens.css` → `base.css` → your site's own CSS.

---

## 1. Principles

1. **Use tokens, never raw values.** No hex codes, font names or pixel sizes in component CSS where a token exists. If a design needs a value that has no token, add the token first.
2. **Mobile first.** Base styles are for phones; `min-width` media queries add to them.
3. **Square corners.** The logo has none, so the UI has none (`--radius: 0`). The only round things are avatars.
4. **Two weights.** Jost 400 and 500. Nothing bolder: the logo already carries the weight.
5. **Brand colour is punctuation.** Pages are Paper and Ink. Magenta appears in small, deliberate places (link underlines, focus rings, one accent button); cyan appears only in the logo and code.
6. **WCAG 2.2 AA is the floor**, in both themes.

---

## 2. Colour

### Brand inks (fixed)

| Token | Hex | Use on the web |
|---|---|---|
| `--bv-cyan` | `#00AEEF` | Logo `<` and syntax highlighting only. **Never text on a light background** (2.2:1). |
| `--bv-magenta` | `#EC008C` | Logo `>`, link underlines, focus ring. **Never body text** (3.8:1). |
| `--bv-yellow` | `#FFF200` | Text selection and highlighter-style emphasis, always with Ink text on it. |
| `--bv-ink` | `#231F20` | Text (light theme), background (dark theme). |
| `--bv-paper` | `#F4F1EA` | Background (light theme), text (dark theme). |

### Semantic colours (switch with the theme)

Components use these, never the brand inks directly (except the logo and link underline).

| Token | Light | Dark | Contrast | Use |
|---|---|---|---|---|
| `--color-bg` | `#F4F1EA` | `#231F20` | — | Page background |
| `--color-surface` | `#FBF9F4` | `#2C2827` | — | Cards, inputs |
| `--color-fg` | `#231F20` | `#F4F1EA` | 14.5:1 | Text, primary button fill |
| `--color-fg-muted` | `#67625A` | `#A8A294` | 5.4:1 / 6.4:1 | Captions, dates, eyebrows |
| `--color-rule` | `#DDD6C8` | `#3A3533` | decorative | Dividers, card borders |
| `--color-border` | `#8F897C` | `#7A746A` | 3.1:1 / 3.5:1 | Form control borders (needs 3:1) |
| `--color-accent` | `#D4007E` | `#F038A5` | 4.5:1 | Magenta when it's text-sized: hover text, accent button |
| `--color-accent-contrast` | `#FFFFFF` | `#231F20` | 5.1:1 / 4.5:1 | Text on an accent button |
| `--color-focus` | `#EC008C` | `#EC008C` | 3.8:1 | Focus ring (needs 3:1) |
| `--color-codeblock-bg` | `#1A1718` | `#1A1718` | — | Code blocks are dark in both themes |

**Why `--color-accent` isn't the logo magenta:** `#EC008C` is 3.8:1 on Paper, which fails AA for normal text. `#D4007E` is the same hue, darkened just enough to pass (4.5:1). Use the pure ink for graphics and underlines and the accent token for anything people read.

### Themes

- The site follows the device setting (`prefers-color-scheme`) by default.
- A manual toggle is optional. If you add one, set `data-theme="light"` or `"dark"` on `<html>`, store the choice in `localStorage` (key `bv-theme`), and apply it with a small inline script in `<head>` **before** the stylesheets load, or the page flashes the wrong theme. `reference.html` has a working example of both.
- Every screen must be checked in both themes before release.

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Everything | **Jost** 400 / 500 | Open-source geometric sans (SIL OFL), chosen to match the logo's circle-and-stroke letters. |
| Code, eyebrows | **JetBrains Mono** 400 | Open source (SIL OFL). |

**Loading.** The reference page uses Google Fonts for convenience. For production, **self-host WOFF2 files** (download from Google Fonts or the projects' GitHub releases), subset to Latin, `font-display: swap`, and `<link rel="preload">` the Jost 400 file. The fallback stack (`Futura, "Century Gothic", "Avenir Next", system-ui`) keeps the layout close if fonts fail.

**Never set the logo or wordmark in Jost.** They are drawn artwork. Use the SVGs.

### Type scale

Sizes are fluid: they scale smoothly from the first value at a 360px viewport to the second at 1440px.

| Token | Mobile → desktop | Weight | Line height | Letter spacing | Use |
|---|---|---|---|---|---|
| `--text-display` | 44 → 84px | 500 | 1.05 | −0.02em | Home page headline only, once per page |
| `--text-h1` | 34 → 56px | 500 | 1.05 | −0.02em | Page titles |
| `--text-h2` | 26 → 38px | 500 | 1.2 | 0 | Section titles |
| `--text-h3` | 20 → 24px | 500 | 1.2 | 0 | Card and sub-section titles |
| `--text-lg` | 19 → 21px | 400 | 1.6 | 0 | Lead paragraph |
| `--text-base` | 17 → 18px | 400 | 1.6 | 0 | Body |
| `--text-sm` | 14px | 400 | 1.6 | 0 | Footer, eyebrows, meta |
| `--text-xs` | 13px | 400 | — | 0 | Legal only |

Rules:
- **Sentence case** for headings, buttons and nav. No all-caps.
- Running text is capped at **68 characters** per line (`--measure`).
- Eyebrow labels (the small line above a heading) are JetBrains Mono, lowercase, muted, e.g. `01 · work`.
- Don't use font-size to create hierarchy below h3; use weight or colour.

---

## 4. Layout

### Breakpoints (mobile first, `min-width`)

| Name | Width | What changes |
|---|---|---|
| base | 0–639px | 4 columns, 16px gutters, 64px header, 26px logo, stacked full-width buttons |
| `sm` | ≥ 640px | 8 columns, 24px gutters, buttons sit side by side |
| `md` | ≥ 768px | Navigation moves from the menu panel into the header |
| `lg` | ≥ 1024px | 12 columns, 40px gutters, 80px header, 32px logo, larger section spacing |
| `xl` | ≥ 1280px | Content stops growing at 1200px and centres |

CSS variables can't be used inside media queries, so these numbers are repeated in `base.css`. If one changes, search both files.

### Grid and spacing

| | Mobile | Tablet (≥640) | Desktop (≥1024) |
|---|---|---|---|
| Columns | 4 | 8 | 12 |
| Column gap | 16px | 24px | 24px |
| Side gutter | 16px | 24px | 40px |
| Max content width | — | — | 1200px |
| Section padding (top/bottom) | 64px | 64px | 96px |

**Spacing scale (4px base):** `--space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 24 · `-6` 32 · `-7` 48 · `-8` 64 · `-9` 96 · `-10` 128. Use only these.

Cards span 4 columns, which makes them one per row on mobile, two on tablet and three on desktop with no extra CSS.

---

## 5. Logo on the website

| Where | Version | Size |
|---|---|---|
| Header, ≥ 1024px | Horizontal lockup (`lockup.inline.svg`) | 32px tall (≈ 221px wide) |
| Header, 360–1023px | Horizontal lockup | 26px tall (≈ 180px wide) |
| Header, < 360px | Mark only (`mark.inline.svg`) | 26px tall |
| Footer | Mark only | 24px tall (the minimum) |
| Favicon, tab, bookmarks | bv monogram | Files in `favicon/` |

- **Inline the SVG** so it follows the theme. `<img>` can't read CSS variables; use the fixed-colour files from `logo/svg/` only where inline isn't possible.
- The header logo links home, with `aria-label="Ben Ventures, home"` on the link; the SVG itself is `aria-hidden`.
- Keep the clear space (height of the b's bowl) free. In the header that's handled by the header's own padding.
- Don't animate, rotate, recolour or place the logo on a photo without using the all-Paper version.

---

## 6. Components

All are in `base.css` and on `reference.html`.

### Header
- Sticky, `--color-bg` background, 1px `--color-rule` bottom border.
- Height 64px mobile, 80px desktop. Logo left, navigation right.

### Navigation
- **≥ 768px:** inline links, Jost 500, 32px apart. The current page gets `aria-current="page"` and a magenta underline.
- **< 768px:** a text button labelled **Menu** (it changes to **Close**) opens a full-screen panel under the header with links at h2 size, each at least 56px tall, separated by rules. Required behaviour:
  - `aria-expanded` and `aria-controls` on the button
  - focus moves to the first link on open; **Esc** closes and returns focus to the button
  - tapping a link closes the panel
  - the page behind doesn't scroll while it's open
  - the panel closes automatically if the window grows past 768px
- A text label, not a hamburger icon: it's clearer and needs no icon.

### Buttons
| Variant | Fill | Text | Hover | Use |
|---|---|---|---|---|
| Primary | Ink / Paper (fg) | bg | Accent magenta | Main action. One per view. |
| Secondary | Transparent, 2px fg border | fg | Fills with fg | Other actions |
| Accent | `--color-accent` | `--color-accent-contrast` | Fills with fg | Rare: contact/submit, at most one per page |

48px tall (44px for the small variant), 24px side padding, Jost 500, square corners. Below 640px, buttons in a `.btn-row` go full width.

### Links
Inherit the text colour, with a **2px magenta underline** offset 0.2em. On hover the text turns `--color-accent`. Links are always underlined in running text; the underline is what makes them links, so colour alone never does.

### Focus
Every interactive element shows a **3px magenta outline, 2px offset**, on keyboard focus (`:focus-visible`). Never remove it without a visible replacement.

### Cards
`--color-surface` fill, 1px `--color-rule` border, 24px padding, square corners. If the whole card is a link, the border turns `--color-fg` on hover. Content order: eyebrow → h3 → muted description.

### Forms
Label above the field (14px, 500). Inputs 48px tall, 1px `--color-border`, `--color-surface` fill; the border turns `--color-fg` on focus plus the magenta focus ring. **Input text must be at least 16px** or iOS Safari zooms the page on focus.

### Code
Inline code: JetBrains Mono at 0.9em on `--color-code-bg`. Code blocks are dark in both themes, with brand syntax colours: tags cyan, attributes `#F038A5`, strings yellow, comments `#A8A294`. All pass AA on the block background.

### Text selection
Yellow highlight with Ink text, in both themes. This is where the reserved yellow ink finally shows up.

### Footer
1px rule on top, mark at 24px, © line, secondary links, 14px muted text.

---

## 7. Motion

- Only colour and border transitions: 120ms, `cubic-bezier(0.2, 0, 0, 1)`.
- No parallax, scroll-jacking or animated logo.
- `prefers-reduced-motion: reduce` switches transitions off (already in `base.css`).

## 8. Icons and images

- **Icons:** only if needed. Use an outline set drawn at 1.5–2px with **square line caps and mitred joins** to match the logo's flat cuts (for example Lucide or Tabler with `stroke-linecap="square"`). Size to the text: 20px next to body text.
- **Images:** no filters, overlays or gradients. Square corners. Always set `width`/`height` (or `aspect-ratio`) to avoid layout shift, and `loading="lazy"` below the fold. Alt text is required; decorative images get `alt=""`.

## 9. Page setup checklist

- `<html lang="en">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`. Don't disable zoom.
- Paste `favicon/head-snippet.html` into `<head>` (favicons, manifest, theme colour, Open Graph image).
- A "Skip to content" link as the first focusable element (`.skip-link`).
- One `<h1>` per page. Landmarks: `header`, `nav`, `main`, `footer`.
- Every page gets its own `<title>` and meta description. Title format: `Page name · Ben Ventures`.

## 10. Accessibility requirements (WCAG 2.2 AA)

- Text contrast ≥ 4.5:1. The 3:1 large-text allowance applies only at 24px and up, because this system has no bold (700) weight. UI and focus indicators ≥ 3:1. The token pairs above already pass; **new pairings must be checked**.
- Everything works with a keyboard alone, in a logical order, with visible focus.
- Touch targets at least 44 × 44px.
- The page works at 200% zoom and at 320px wide with no horizontal scrolling.
- Colour is never the only signal (links are underlined; errors use text as well as colour).

## 11. Maintaining the system

- **Change tokens, not components.** A colour or size change happens in `tokens.css` and flows everywhere.
- **Adding a token:** add it to `tokens.css` (both themes if it's a colour), check its contrast, document it in this file, and mirror it in `colors/tokens.json`.
- **Versioning:** the header of `tokens.css` and this file carry a version (currently 1.0). Bump the minor version for additions and the major version for anything renamed or removed, and note it in a changelog.
- **Brand colour values never change on the web alone.** The five inks are shared with print. Changing one is a brand decision and means regenerating the kit.

### Review checklist for every change

- [ ] No raw hex, font names or px sizes in component CSS where a token exists
- [ ] Checked at 360, 390, 768, 1024 and 1440px wide
- [ ] Checked in light **and** dark theme
- [ ] Keyboard only: can reach and use everything, focus is always visible
- [ ] New colour pairings pass contrast (4.5:1 text, 3:1 UI)
- [ ] Nothing below 44px tap size, no input text below 16px
- [ ] Logo is the inline SVG, at a specified size, with its clear space
- [ ] `reference.html` updated if a component changed
