# Sidesteps

A deck of short, sideways cues for getting unstuck on a problem. Draw a card,
hold it up against what you’re working on, and see what moves.

Static site: Astro + Tailwind CSS v4. No backend; the notebook, current problem,
and recent draws live in `localStorage`.

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run test      # Vitest unit tests
npm run lint      # astro check + prettier --check
npm run format    # prettier --write
```

## Layout

- `src/data/cues.ts`: the deck. Each cue is `[text, suit]`; ids are
  positions in the list, so **append new cues at the end** to keep existing ids
  (and saved notebook entries) stable.
- `src/data/suits.ts`: the seven suits. Suit colours live in
  `src/styles/global.css` (`--suit-*`).
- `src/components`: cards (`CardFace`, `CardBack`, `MiniCard`), the draw stage,
  header/footer.
- `src/scripts`: client-side behaviour for drawing and the keep/copy buttons.
- `src/utils`: pure helpers (draw logic, notebook formatting) plus the
  `localStorage` wrapper.
- `public/og.png`: social share image (1200×630).

## Pages

- `/`: draw a card. `/?draw` draws one immediately.
- `/deck/`: every card, filterable by suit (`/deck/#feel`) and searchable.
- `/cue/<slug>/`: a single card, with a form to save it plus a note.
- `/notebook/`: kept cards grouped by problem, with notes and Markdown export.
- `/about/`

## Deployment

`site` in `astro.config.mjs` is a placeholder (`https://sidesteps.app`); set it
to the real domain before deploying so canonical and Open Graph URLs are right.
