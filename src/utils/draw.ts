/** How many recent draws to avoid repeating, as a fraction of the deck. */
const RECENT_FRACTION = 0.4;

export function recentLimit(deckSize: number): number {
  return Math.floor(deckSize * RECENT_FRACTION);
}

/**
 * Picks a random id from `ids`, avoiding anything in `recent` when possible.
 * `recent` is ordered oldest-first; only its tail (up to `recentLimit`) counts.
 */
export function pickId(
  ids: readonly number[],
  recent: readonly number[],
  random: () => number = Math.random,
): number {
  if (ids.length === 0) throw new Error('Cannot draw from an empty deck');

  const avoid = new Set(recent.slice(-recentLimit(ids.length)));
  const pool = ids.filter((id) => !avoid.has(id));
  const from = pool.length > 0 ? pool : ids;
  return from[Math.floor(random() * from.length)];
}

/** Appends `id` to the recent list, trimming it to the deck's recent limit. */
export function pushRecent(
  recent: readonly number[],
  id: number,
  deckSize: number,
): number[] {
  const next = [...recent.filter((r) => r !== id), id];
  return next.slice(-Math.max(1, recentLimit(deckSize)));
}
