# Spot illustrations

Paste these **inline**. Every shape is coloured by a class that `base.css` maps to the theme
tokens, so the art flips between light and dark with the rest of the page.

| File | Subject |
|---|---|
| `collaborate.inline.svg` | Design and code windows overlapping, two collaborators' cursors |
| `coming-soon.inline.svg` | Tablet and phone showing a launch page with a notify button |
| `website.inline.svg` | Browser window: image, text, call-to-action |

- Size with CSS: they fill their container up to 400px (`.spot`). Square, 1:1.
- Each has `role="img"` and an `aria-label`. If one is purely decorative next to text that says the same
  thing, swap those for `aria-hidden="true"`.
- **They don't work as `<img src>`**: an external file can't read the page's tokens. For `<img>`, Figma,
  decks or email use the fixed files in the kit's `spot/` folder (`-light` / `-dark`), and add class
  `spot` to the `<img>` so it doesn't get the image outline.
- Don't edit colours inside the SVGs. Change tokens instead.
