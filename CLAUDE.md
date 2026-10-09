# CLAUDE.md

Sidesteps is a static Astro + Tailwind v4 site: a deck of problem-solving cues. See README.md for commands and layout.

## Conventions

- typescript: Order imports external first, then a blank line, then internal.
- Use the CSS variables / theme colours in `src/styles/global.css` instead of hard-coded colours. Every colour has a dark-mode value.
- Cards use container queries (`cqi` units), so card internals scale with the card's width. Size a card by sizing its wrapper.
- Keep `src/utils` pure and unit-tested; put DOM code in `src/scripts` or component `<script>`s.
- Cue ids are list positions and are stored in users' notebooks: append new cues, don't reorder or delete.

## Commit Messages

First line format: `{area}: {concise description}` (e.g. `deck: add three cues`, `notebook: fix export`).
