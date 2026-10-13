# CLAUDE.md

Sidesteps is a static Astro + Tailwind v4 site: a deck of problem-solving cues. See README.md for commands and layout.

## Conventions

- typescript: Order imports external first, then a blank line, then internal.
- Use the CSS variables / theme colours in `src/styles/global.css` instead of hard-coded colours. The palette is Nimbus, light by default with a dark variant under `:root[data-theme='dark']` (set from the saved choice or the system setting; see `ThemeToggle.astro`). Define every new variable in both, and use the `dark:` variant for theme-specific markup. Suit-tinted surfaces use `bg-card-face`, `border-card-edge` and `text-card-text`.
- Cards use container queries (`cqi` units), so card internals scale with the card's width. Size a card by sizing its wrapper.
- Keep `src/utils` pure and unit-tested; put DOM code in `src/scripts` or component `<script>`s.
- Cue ids are list positions and are stored in users' notebooks: append new cues, don't reorder or delete.

## Dev server

Astro 7 tracks the dev server in `.astro/dev.json`, and `astro dev stop` kills whichever server is recorded there, including one the user started in their terminal. When an agent needs a server (e.g. for screenshots), start a separate one with `npx astro dev --ignore-lock --port 4322` and stop it by its pid. Never run `astro dev stop`.

## Commit Messages

First line format: `{area}: {concise description}` (e.g. `deck: add three cues`, `notebook: fix export`).
