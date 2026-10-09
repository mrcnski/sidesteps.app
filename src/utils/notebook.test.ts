import { describe, expect, it } from 'vitest';

import {
  groupByProblem,
  notebookToMarkdown,
  type NotebookEntry,
} from './notebook';

const entry = (
  key: string,
  problem: string,
  createdAt: string,
  note = '',
): NotebookEntry => ({ key, cueId: Number(key), problem, note, createdAt });

const entries = [
  entry('1', 'Naming', '2026-01-01T00:00:00Z', 'Short\nand sweet'),
  entry('2', 'Tap', '2026-01-02T00:00:00Z'),
  entry('3', ' Naming ', '2026-01-03T00:00:00Z'),
  entry('4', '', '2025-12-31T00:00:00Z'),
];

describe('groupByProblem', () => {
  it('groups by trimmed problem, newest first', () => {
    const groups = groupByProblem(entries);
    expect(groups.map((g) => g.problem)).toEqual(['Naming', 'Tap', '']);
    expect(groups[0].entries.map((e) => e.key)).toEqual(['3', '1']);
  });
});

describe('notebookToMarkdown', () => {
  it('renders groups with notes on one line', () => {
    expect(notebookToMarkdown(entries, (id) => `Cue ${id}`)).toBe(
      [
        '## Naming',
        '',
        '- **Cue 3**',
        '- **Cue 1**: Short and sweet',
        '',
        '## Tap',
        '',
        '- **Cue 2**',
        '',
        '## Untitled problem',
        '',
        '- **Cue 4**',
      ].join('\n'),
    );
  });
});
