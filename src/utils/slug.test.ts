import { describe, expect, it } from 'vitest';

import { slugify } from './slug';

describe('slugify', () => {
  it('drops apostrophes and punctuation', () => {
    expect(slugify('What’s your gut feeling?')).toBe('whats-your-gut-feeling');
    expect(slugify("Don't jam it")).toBe('dont-jam-it');
    expect(slugify('Think 10 moves ahead')).toBe('think-10-moves-ahead');
  });
});
