import { describe, expect, it } from 'vitest';

import { pickId, pushRecent, recentLimit } from './draw';

const ids = Array.from({ length: 10 }, (_, i) => i + 1);

describe('pickId', () => {
  it('avoids recently drawn ids', () => {
    const recent = [1, 2, 3, 4];
    for (let r = 0; r < 1; r += 0.05) {
      expect(recent).not.toContain(pickId(ids, recent, () => r));
    }
  });

  it('only avoids the most recent draws, up to the limit', () => {
    // The limit for 10 cards is 4, so 1 and 2 are drawable again.
    const recent = [1, 2, 3, 4, 5, 6];
    expect(pickId(ids, recent, () => 0)).toBe(1);
  });

  it('falls back to the whole deck when everything is recent', () => {
    expect(pickId([1, 2], [1, 2], () => 0.99)).toBe(2);
  });

  it('throws on an empty deck', () => {
    expect(() => pickId([], [])).toThrow();
  });
});

describe('pushRecent', () => {
  it('appends, de-duplicates, and trims to the limit', () => {
    expect(pushRecent([1, 2, 3], 2, 10)).toEqual([1, 3, 2]);
    expect(pushRecent([1, 2, 3, 4], 5, 10)).toHaveLength(recentLimit(10));
    expect(pushRecent([1, 2, 3, 4], 5, 10)).toEqual([2, 3, 4, 5]);
  });
});
