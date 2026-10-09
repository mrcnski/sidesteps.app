import { describe, expect, it } from 'vitest';

import { CUES } from './cues';
import { SUIT_IDS } from './suits';

describe('CUES', () => {
  it('has unique slugs and sequential ids', () => {
    expect(new Set(CUES.map((c) => c.slug)).size).toBe(CUES.length);
    expect(CUES.map((c) => c.id)).toEqual(CUES.map((_, i) => i + 1));
  });

  it('uses every suit', () => {
    expect(new Set(CUES.map((c) => c.suit))).toEqual(new Set(SUIT_IDS));
  });

  it('has notes that end in punctuation', () => {
    for (const cue of CUES) expect(cue.note).toMatch(/[.?!]$/);
  });
});
