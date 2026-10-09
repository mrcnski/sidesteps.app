import { CUES, type Cue } from '../data/cues';
import { addToNotebook, getProblem } from '../utils/storage';

export function notifyNotebookChange(): void {
  document.dispatchEvent(new CustomEvent('notebook:change'));
}

export function cueUrl(cue: Cue): string {
  return new URL(`/cue/${cue.slug}/`, location.origin).toString();
}

/**
 * Wires up the "Keep" and "Copy link" buttons inside `root`. The cue is read
 * from `root.dataset.cueId` at click time, so callers can change it freely.
 * Returns a function that resets the buttons to their idle state.
 */
export function bindCueActions(root: HTMLElement): () => void {
  const keep = root.querySelector<HTMLButtonElement>('[data-keep]');
  const copy = root.querySelector<HTMLButtonElement>('[data-copy-link]');
  const copyLabel = root.querySelector<HTMLElement>('[data-copy-label]');
  let copyTimer: number | undefined;

  const currentCue = () =>
    CUES.find((c) => c.id === Number(root.dataset.cueId));

  const setKept = (kept: boolean) => {
    if (!keep) return;
    keep.querySelector('[data-keep-idle]')?.classList.toggle('hidden', kept);
    keep.querySelector('[data-keep-done]')?.classList.toggle('hidden', !kept);
    keep.disabled = kept;
    keep.classList.toggle('opacity-80', kept);
  };

  keep?.addEventListener('click', () => {
    const cue = currentCue();
    if (!cue) return;
    addToNotebook(cue.id, getProblem());
    setKept(true);
    notifyNotebookChange();
  });

  copy?.addEventListener('click', async () => {
    const cue = currentCue();
    if (!cue || !copyLabel) return;
    try {
      await navigator.clipboard.writeText(cueUrl(cue));
      copyLabel.textContent = 'Copied';
    } catch {
      copyLabel.textContent = 'Couldn’t copy';
    }
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => {
      copyLabel.textContent = 'Copy link';
    }, 1800);
  });

  return () => setKept(false);
}
