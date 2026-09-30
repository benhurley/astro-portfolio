# Ben Ventures: website design system (v1.15)

What changed in each version is in `CHANGELOG.md`.

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
3. **Square corners.** The logo has none, so the UI has none (`--radius: 0`). The only round things are avatars and circular illustrations (`.media-round`), because there the circle is the artwork's own shape.
4. **Depth, never flat.** Interface elements that sit on the page (cards, buttons, inputs, code blocks) are raised with a 2px outline and a **hard offset shadow**. Images and video get the same 2px outline but **never a shadow**. A borderless, shadowless "flat" version of these components is off-brand, however clean it looks. See §6.
5. **Two weights.** Jost 400 and 500. Nothing bolder: the logo already carries the weight.
6. **Brand colour is punctuation.** Pages are Paper and Ink. Cyan is the action colour: the primary button, link underlines and focus. Magenta is the alternate button, badges, the logo's `<` and code. Yellow is text selection. Outlines and shadows: Ink in light mode; in dark mode, a quiet warm line with a near-black shadow, and coloured buttons cast a deep shade of their own colour.
7. **WCAG 2.2 AA is the floor**, in both themes.

---

## 2. Colour

### Brand inks (fixed)

| Token | Hex | Use on the web |
|---|---|---|
| `--bv-cyan` | `#00AEEF` | Logo `>`, call-to-action fills, link underlines. **Never text on a light background** (2.2:1). |
| `--bv-magenta` | `#EC008C` | Logo `<` and code syntax. **Never text, and never behind small text**: Ink, white and Paper on it are all under 4.5:1. Badges use `--color-badge`. |
| `--bv-yellow` | `#FFF200` | Text selection, always as a fill with Ink text on it (13.9:1). **Never yellow text** (1.04:1 on Paper). |
| `--bv-ink` | `#231F20` | Text (light theme), background (dark theme). |
| `--bv-paper` | `#F4F1EA` | Background (light theme), text (dark theme). |

### Semantic colours (switch with the theme)

Components use these, never the brand inks directly (except the logo and link underline).

| Token | Light | Dark | Contrast | Use |
|---|---|---|---|---|
| `--color-bg` | `#F4F1EA` | `#231F20` | — | Page background |
| `--color-surface` | `#FBF9F4` | `#231F20` | — | Cards, inputs. In dark it matches the page: no lighter charcoal panels |
| `--color-fg` | `#231F20` | `#F4F1EA` | 14.5:1 | Text, primary button fill |
| `--color-fg-muted` | `#67625A` | `#A8A294` | 5.4:1 / 6.4:1 | Captions, dates, eyebrows |
| `--color-rule` | `#DDD6C8` | `#3A3533` | decorative | Mobile menu separators only. **No lines between page sections** |
| `--color-outline` | `#231F20` | `#57504D` | 14.5:1 / 2.1:1 | The 2px outline of outlined buttons, cards, code blocks, images and the header edge. In dark mode a quiet warm line |
| `--color-shadow` | `#231F20` | `#0E0C0C` | — | Hard offset shadows for those elements. Light: the same Ink as the outline. Dark: near-black |
| `--color-input-border` | `#231F20` | `#7A746A` | 14.5:1 / 3.5:1 | Form field borders. Kept at 3:1 or more, which the dark `--color-outline` isn't |
| `--color-cta-outline` / `-shadow` | Ink / Ink | none / `#00688F` | — | The cyan button's outline and shadow. Dark: **no outline, and a tonal shadow** in deep cyan |
| `--color-alt-outline` / `-shadow` | Ink / Ink | none / `#7A0049` | — | The magenta button's, likewise: deep-magenta tonal shadow |
| `--color-cta-hover` | `#66CFF5` | same | 9.2:1 with Ink | Primary (cyan) button on hover |
| `--color-alt` / `-fg` | `#D4007E` / `#FFFFFF` | same | 5.1:1 | Magenta button: the logo magenta deepened enough to carry text |
| `--color-alt-hover` | `#B8006D` | same | 6.4:1 with white | Magenta button on hover |
| `--color-hover-tint` | `#E9E4D8` | `#1A1718` | 12.9:1 / 15.8:1 | Outlined buttons and linked cards fill with this on hover |
| `--color-border` | `#8F897C` | `#7A746A` | 3.1:1 / 3.5:1 | Reserved: a lighter control border if one is ever needed. Currently unused |
| `--color-accent` | `#0076A3` | `#00AEEF` | 4.5:1 / 6.4:1 | Cyan when it's text-sized: link and nav hover text |
| `--color-cta` | `#00AEEF` | `#00AEEF` | — | Call-to-action button fill, primary button hover |
| `--color-cta-fg` | `#231F20` | `#231F20` | 6.4:1 | Text on a cyan fill. **Never white** (2.5:1) |
| `--color-badge` / `-fg` | `#D4007E` / `#FFFFFF` | same | 5.1:1 | Badge fill and text: the logo magenta deepened just enough to carry small text |
| `--color-underline` | `#00AEEF` | `#00AEEF` | decorative | Link underlines |
| `--color-focus` | `#0076A3` | `#00AEEF` | 4.5:1 / 6.4:1 | Focus ring (needs 3:1) |
| `--color-codeblock-bg` | `#1A1718` | `#1A1718` | — | Code blocks are dark in both themes |
| `--color-band-bg` | `#231F20` | `#151213` | — | The guiding-principle band. On dark it's *darker* than the page, never lighter |
| `--color-band-fg` / `-muted` | `#F4F1EA` / `#A8A294` | same | 14.5:1 / 6.4:1 | Text on the band |
| `--color-grid` | `#E6E0D3` | `#2C2829` | decorative | Background grid lines |

**Two cyans, and why.** Pure cyan `#00AEEF` is 2.2:1 on Paper: fine as a fill with Ink text on it (6.4:1), but too faint to be text or a focus ring on a light background. `#0076A3` is the same hue, darkened just enough to pass AA (4.5:1), and takes over wherever cyan must be *read* in the light theme. On dark backgrounds pure cyan passes (6.4:1), so the dark theme uses it everywhere. Rule of thumb: **cyan fills get Ink text; cyan text on light uses the dark cyan.**

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
| `--text-display` | 44 → 72px | 500 | 1.05 | −0.03em | Home page headline only, once per page |
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
| Gap between sections (one shared gap) | 64px | 64px | 96px |

**Section spacing is ONE shared gap, not padding on both sides.** 64px (mobile) / 96px (desktop) is the total distance from the end of one section's content to the start of the next. `base.css` does this by giving `.section` top padding only, plus bottom padding on the last block in `<main>`. Never pad sections top *and* bottom: adjacent sections would double to 128 / 192px.

**Sections are separated by space alone.** No rules or borders between sections, and no alternating background colours: a line or colour change between two sections reads as a pattern that isn't there. **The one exception is the guiding-principle band** (§7): a single full-width Ink band, at most once per page.

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

## 6. Depth

The website uses **hard offset shadows**: solid, unblurred blocks of colour behind raised elements, like a print slightly off register. It's the web's version of the logo's flat cuts and square corners. **Flat design is not an option for this brand.**

### The rules
1. **Light mode: every raised element gets a 2px Ink outline and an Ink hard shadow.** Dark mode uses **tonal shadows**: coloured buttons drop the outline and cast a shadow in a deep shade of their own fill (cyan → `#00688F`, magenta → `#7A0049`); outlined buttons, cards, inputs and code blocks keep a quiet warm line (`#57504D`, inputs `#7A746A`) with a near-black shadow (`#0E0C0C`). Always use the tokens; never hand-pick a shadow colour.
2. **Solid, never blurred.** The shadow's blur radius is always `0`. No soft or "realistic" drop shadows, no glows, no `filter: drop-shadow()` with blur.
3. **Always down and to the right, at 45°.** Light comes from the top left. X and Y offsets are always equal.
4. **No white or light shadows, ever, and never semi-transparent.** The only coloured shadows are the dark-mode tonal shadows under coloured buttons, each a deep shade of that button's own fill. (Dark mode was tried with Paper outlines and shadows, greys, black and stone; the Paper mirror read as brash, the greys as muddy. Tonal is what held up.)
5. **Never inset.** Depth goes out from the page, not in.
6. **Use the scale, not a new number.**

| Token | Offset | Use |
|---|---|---|
| `--shadow-sm` | 3px | Inputs, small buttons |
| `--shadow-md` | 4px | Buttons |
| `--shadow-lg` | 6px | Cards, code blocks |

### Interaction: depth is the feedback
**Hover changes only the fill**, one step *away* from the text colour so contrast rises: cyan lightens (`--color-cta-hover`), magenta deepens (`--color-alt-hover`), outlined buttons and linked cards fill with `--color-hover-tint`. The outline, shadow and text never change, and nothing moves, lifts or animates position. Links in running text are the exception: their text turns `--color-accent` on hover. That rule is scoped to `a:not(.btn, .card)`; a button or card that is an `<a>` keeps its text colour.
- No `transform`, no shadow growth, no scale, on any hover or press.

### What stays flat
- **Assets never get shadows.** Images and video in page content get the 2px `--color-outline` outline and nothing else (applied by default in `base.css`). Media inside a card's media slot fills it edge to edge with **no** outline of its own, because the card's outline already frames it. The logo never gets an outline or a shadow; if it's ever placed as an `<img>`, add `.media-bare`.
- Text, links, icons, navigation, the mobile menu panel, the header and the footer.
- The header: a 2px `--color-outline` line underneath at all times (a line, not a shadow).

### Dark theme
**Tonal shadows.** Surfaces are the same Ink as the page (no lighter charcoal). Coloured buttons are pure fill, with no outline, over a shadow in a deep shade of their own colour, like ink printed slightly off register. Outlined buttons, cards and code blocks have a quiet warm line and a near-black shadow; form inputs use a slightly lighter line to stay accessible. Depth is present but calm; nothing is white.

---

## 7. Components

All are in `base.css` and on `reference.html`.

### Header
- Sticky, `--color-bg` background, 2px `--color-outline` bottom edge, always visible.
- Height 64px mobile, 80px desktop. Logo left, navigation right.

### Navigation
- **≥ 768px:** inline links, Jost 500, 32px apart. The current page gets `aria-current="page"` and a cyan underline.
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
| Primary (`.btn--primary`) | `--color-cta` (cyan) | Ink | Lightens to `#66CFF5` | The main action. One per view |
| Magenta (`.btn--magenta`) | `--color-alt` (`#D4007E`) | White | Deepens to `#B8006D` | A second call to action beside a primary ("Get in touch" / "Book a call"). At most one per view, never on its own as the only button |
| Secondary (`.btn--secondary`) | `--color-surface` | fg | Fills with `--color-hover-tint` | Everything else |

The old Ink-filled primary is retired: every button is a call to action, so three styles was one too many. `.btn--cta` still works as an alias of `.btn--primary`.

All buttons: 2px `--color-outline` outline, `--shadow-md` (small buttons `--shadow-sm`), 48px tall (44px small), 24px side padding, Jost 500, square corners. Hover changes only the fill (§6). Below 640px, buttons in a `.btn-row` go full width.

### Links
Inherit the text colour, with a **2px cyan underline** offset 0.2em. On hover the text turns `--color-accent` (dark cyan on light, cyan on dark). Links are always underlined in running text; the underline is what makes them links, so colour alone never does.

### Focus
Every interactive element shows a **3px cyan outline (`--color-focus`), 2px offset**, on keyboard focus (`:focus-visible`). Never remove it without a visible replacement.

### Cards
`--color-surface` fill, 2px `--color-outline` outline, `--shadow-lg`, 24px padding, square corners. Optional **media slot** (`.card__media`) at the top: 16:10, edge to edge, separated by the outline colour, image `object-fit: cover`, no shadow of its own. Work cards should use it. If the whole card is a link, hover fills it with `--color-hover-tint`, the same as an outlined button. The title can be any heading level (`h2`, `h3`, `h4`), or add `.card__title` to whatever element holds it. Content order: media → eyebrow → title → muted description. A `.badge` can sit inline after the title.

### Guiding-principle band (`.band`)
One short statement on a full-width Ink band: `--color-band-bg`, Paper text, the statement at h1 size (`.band__statement`, max 22 characters per line), with an optional mono eyebrow. It spans the full viewport width; its content sits in the normal `.container`.
- **At most one per page.** It's the one exception to "no alternating section backgrounds".
- It's a statement, not a section to fill: one sentence, no cards, no grid, no buttons (a single text link at most).
- It takes one `--section-space` of margin above and pads **48px** (`--space-7`) inside, at every screen size; the next section's normal top padding gives the gap below. Don't pad it by `--section-space`: that makes the band 64–96px taller than its one sentence needs.
- In dark mode it's darker than the page (`#151213`), never lighter.

### Badge (`.badge`)
A small label: "case study", "new", a status. **Magenta fill (`--color-badge`, `#D4007E`), white text** (5.1:1, both themes), JetBrains Mono 13px, 2px × 8px padding, square corners. **Flat**: badges never get an outline or shadow. Use one per item at most, and never as a button: if it's clickable, it's a link or a button instead.

### Background grid (`.bg-grid`)
A faint 32px grid (`--grid-cell`, 1px lines in `--color-grid`) that fades out towards the bottom. **Decorative, and only behind the hero.** Never behind running text longer than a paragraph, never on the band, never on cards. It's drawn on a `::before` layer so its fade never touches the content, and a gridded hero keeps the single section gap.

### Section calls to action
A CTA that closes a section, after a grid or list ("View all work"), is **centred** under it with `.section-cta`, 48px below. CTAs inside a block of text (the hero, a paragraph) align with that text.

### Forms
Label above the field (14px, 500). Inputs 48px tall, 2px `--color-input-border` outline, `--shadow-sm`, `--color-surface` fill, muted placeholder; the cyan focus ring shows on focus. **Input text must be at least 16px** or iOS Safari zooms the page on focus.

### Code
Inline code: JetBrains Mono at 0.9em on `--color-code-bg`. Code blocks are dark in both themes, raised with the 2px outline and `--shadow-lg`, with brand syntax colours: tags magenta (`#F038A5`, lifted for contrast), attributes cyan, strings yellow, comments `#A8A294`. All pass AA on the block background.

### Text selection
Yellow highlight with Ink text, in both themes. The one place yellow appears on the site.

### Footer
Separated by space, not a rule. Mark at 24px, © line, secondary links, 14px muted text. A theme switch, if present, is a `.link-button` (underlined text), not a boxed button.

---

## 8. Motion

- Colour transitions only (fill, text, outline): 120ms, `cubic-bezier(0.2, 0, 0, 1)`.
- Nothing moves on hover or press.
- No parallax, scroll-jacking or animated logo.
- `prefers-reduced-motion: reduce` switches transitions off (already in `base.css`).

## 9. Icons and images

- **Icons:** only if needed. Use an outline set drawn at 1.5–2px with **square line caps and mitred joins** to match the logo's flat cuts (for example Lucide or Tabler with `stroke-linecap="square"`). Size to the text: 20px next to body text.
- **Images:** no filters, overlays or gradients. Square corners. Images, video **and embeds** (`img`, `video`, `iframe`) get a 2px `--color-outline` outline and square corners, and **never a shadow** (default styling in `base.css` for anything inside `<main>`). No outline inside a card's media slot; opt anything else out with `.media-bare` (logos, icons placed as `<img>`).
  - **Video embeds (YouTube, Vimeo):** add `.embed-16x9` so the iframe fills its container at 16:9. Always give the iframe a `title` (screen readers announce it), add `loading="lazy"`, and use the privacy-enhanced host (`youtube-nocookie.com`) for YouTube.
  - **Circular art (`.media-round`):** only for a **square** image whose artwork is a circle filling it edge to edge (avatars, round badges of circular art). The class rounds the image into a circle so the 2px outline traces the art exactly. Never use it to crop a rectangular photo or illustration into a circle, and never on buttons, cards or other interface elements. Always set `width`/`height` (or `aspect-ratio`) to avoid layout shift, and `loading="lazy"` below the fold. Alt text is required; decorative images get `alt=""`.

### Spot illustrations

Three simple spots, each **one object on a soft circle**, drawn in the system's style: 4-unit outlines, square corners, flat (no shadows), and the brand inks used sparingly. They're inline SVGs (`web/spot/`) coloured by theme tokens, so they switch with light and dark. The kit's `spot/` folder has fixed light/dark SVG and PNG exports for slides, docs and email.

| Spot | Shows | Use for |
|---|---|---|
| `advise` | Two speech bubbles: a question, and a cyan reply with a check | Advising, consulting, "let's talk" |
| `coming-soon` | A tablet and a phone showing a simple page; the tablet's button is the one cyan element, the phone's is outlined | Launches, new products, mobile work |
| `legacy-site` | A browser window stuck loading: a spinner (the logo's ring) with a magenta arc, grey placeholder bars | Slow or outdated sites that need rebuilding |

**Keep new spots as simple as these:**
1. **One idea, one object** (or one pair), centred on the circle. If it needs a caption to make sense, it's too complicated.
2. **Few shapes.** Panels, bubbles, devices, flat bars for text. No people, no words, no icons from a set, no detailed scenes.
3. **Canvas 400 × 400**, circle radius 190 (`sp-disc`), objects inside it with room to breathe.
4. **Flat.** 4-unit outlines, no shadows at all. Spots are assets, and assets never get shadows; depth belongs to the interface around them. No blur, gradients or transparency either.
5. **Colour only through the spot classes** (`sp-*`). They're defined once, in `CLASS_CSS` in `spot/spot.py`; the build copies them into `base.css` between the `spot-classes` markers and **fails** if any class is unused or undefined, so dead styles can't pile up. Never a hex value in a spot.
6. **Cyan marks the answer or the action**, at most one cyan element per spot.
7. **Check both themes** before shipping.

A spot is decorative next to a heading, so use `aria-hidden="true"` there instead of `role="img"`. The drawing script is `spot/spot.py` (Python 3, no dependencies; it reads colours from `web/tokens.css` via `spot/tokens_parse.py`): add a function, register it in `SPOTS`, and export.

**Hero with an illustration:** `.hero__split` puts the art beside the text from 1024px (7 : 5 columns). **Below 1024px the art is hidden**, phones and tablets alike: stacked under the buttons it looks lopsided and pushes the first section down, so the buttons lead straight into the next section.

## 10. Page setup checklist

- `<html lang="en">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`. Don't disable zoom.
- Paste `favicon/head-snippet.html` into `<head>` (favicons, manifest, theme colour, Open Graph image).
- A "Skip to content" link as the first focusable element (`.skip-link`).
- One `<h1>` per page. Landmarks: `header`, `nav`, `main`, `footer`.
- Every page gets its own `<title>` and meta description. Title format: `Page name · Ben Ventures`.

## 11. Accessibility requirements (WCAG 2.2 AA)

- Text contrast ≥ 4.5:1. The 3:1 large-text allowance applies only at 24px and up, because this system has no bold (700) weight. UI and focus indicators ≥ 3:1. The token pairs above already pass; **new pairings must be checked**.
- Everything works with a keyboard alone, in a logical order, with visible focus.
- Touch targets at least 44 × 44px.
- The page works at 200% zoom and at 320px wide with no horizontal scrolling.
- Colour is never the only signal (links are underlined; errors use text as well as colour).

## 12. Maintaining the system

- **Change tokens, not components.** A colour or size change happens in `tokens.css` and flows everywhere.
- **Adding a token:** add it to `tokens.css` (both themes if it's a colour, in **both** dark blocks), check its contrast, and document it in this file. `colors/tokens.json` is generated from `tokens.css` by the kit build, so never edit it by hand; the build also fails if the two dark-theme blocks in `tokens.css` differ.
- **Versioning:** the header of `tokens.css` and this file carry a version (currently 1.15). Bump the minor version for additions and the major version for anything renamed or removed, and note it in a changelog.
- **Brand colour values never change on the web alone.** The five inks are shared with print. Changing one is a brand decision and means regenerating the kit.

### Review checklist for every change

- [ ] No raw hex, font names or px sizes in component CSS where a token exists
- [ ] Checked at 360, 390, 768, 1024 and 1440px wide
- [ ] Checked in light **and** dark theme
- [ ] Keyboard only: can reach and use everything, focus is always visible
- [ ] Raised elements have the 2px outline **and** a hard shadow from the scale: nothing flat, nothing blurred, nothing light in dark mode
- [ ] Images, video and embeds (iframes): 2px outline, no shadow; no outline inside card media slots or on the logo
- [ ] Round corners only on avatars and circular art (`.media-round`, square files only)
- [ ] Illustrations are the system's spot art, inline so they switch theme; new ones stay as simple as the three spots
- [ ] Outlines and shadows only from the tokens (Ink in light; tonal in dark), never white; hover changes only the fill; nothing moves
- [ ] At most one cyan primary and one magenta button per view
- [ ] No lines between sections; section spacing is one shared gap, never doubled; closing section CTAs centred
- [ ] At most one guiding-principle band per page (48px padding inside); background grid only behind the hero; hero art hidden below 1024px
- [ ] New colour pairings pass contrast (4.5:1 text, 3:1 UI)
- [ ] Nothing below 44px tap size, no input text below 16px
- [ ] Logo is the inline SVG, at a specified size, with its clear space
- [ ] `reference.html` updated if a component changed
