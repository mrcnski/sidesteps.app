import type { NotebookEntry } from './notebook';

const KEYS = {
  problem: 'sidesteps:problem',
  recent: 'sidesteps:recent',
  notebook: 'sidesteps:notebook',
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be full or disabled (e.g. private mode). Nothing to do.
  }
}

export const getProblem = (): string => read(KEYS.problem, '');
export const setProblem = (problem: string): void =>
  write(KEYS.problem, problem);

export const getRecent = (): number[] => read(KEYS.recent, []);
export const setRecent = (recent: number[]): void => write(KEYS.recent, recent);

export const getNotebook = (): NotebookEntry[] => read(KEYS.notebook, []);
export const setNotebook = (entries: NotebookEntry[]): void =>
  write(KEYS.notebook, entries);

export function addToNotebook(
  cueId: number,
  problem: string,
  note = '',
): NotebookEntry {
  const entry: NotebookEntry = {
    key: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    cueId,
    problem: problem.trim(),
    note: note.trim(),
    createdAt: new Date().toISOString(),
  };
  setNotebook([...getNotebook(), entry]);
  return entry;
}
