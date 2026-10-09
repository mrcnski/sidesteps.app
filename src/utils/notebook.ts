export interface NotebookEntry {
  /** Unique entry id. */
  key: string;
  cueId: number;
  problem: string;
  note: string;
  /** ISO timestamp. */
  createdAt: string;
}

export interface NotebookGroup {
  problem: string;
  entries: NotebookEntry[];
}

/** Groups entries by problem, newest group and newest entry first. */
export function groupByProblem(entries: NotebookEntry[]): NotebookGroup[] {
  const sorted = [...entries].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const groups = new Map<string, NotebookEntry[]>();
  for (const entry of sorted) {
    const problem = entry.problem.trim();
    const group = groups.get(problem);
    if (group) group.push(entry);
    else groups.set(problem, [entry]);
  }
  return [...groups].map(([problem, entries]) => ({ problem, entries }));
}

/** Renders the notebook as Markdown, for copying elsewhere. */
export function notebookToMarkdown(
  entries: NotebookEntry[],
  cueText: (cueId: number) => string,
): string {
  return groupByProblem(entries)
    .map(({ problem, entries }) => {
      const lines = entries.map((entry) => {
        const note = entry.note.trim();
        const head = `- **${cueText(entry.cueId)}**`;
        return note ? `${head}: ${note.replace(/\n+/g, ' ')}` : head;
      });
      return [`## ${problem || 'Untitled problem'}`, '', ...lines].join('\n');
    })
    .join('\n\n');
}
