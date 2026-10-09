import { CUES, type Cue } from '../data/cues';
import { SUITS } from '../data/suits';
import { pickId, pushRecent } from '../utils/draw';
import { getProblem, getRecent, setProblem, setRecent } from '../utils/storage';
import { bindCueActions } from './cueActions';

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

export function initDraw(): void {
  const stage = document.querySelector<HTMLElement>('[data-stage]');
  const flip = stage?.querySelector<HTMLElement>('[data-flip]');
  const inner = flip?.querySelector<HTMLElement>('.flip-inner');
  const face = stage?.querySelector<HTMLElement>('[data-card-face]');
  if (!stage || !flip || !inner || !face) return;

  const actions = stage.querySelector<HTMLElement>('[data-cue-actions]');
  const live = stage.querySelector<HTMLElement>('[data-live]');
  const trigger = stage.querySelector<HTMLElement>('[data-flip-trigger]');
  const form = document.querySelector<HTMLFormElement>('[data-draw-form]');
  const problem = document.querySelector<HTMLInputElement>('[data-problem]');
  const drawLabel = document.querySelector<HTMLElement>('[data-draw-label]');
  const resetActions = bindCueActions(stage);

  let busy = false;

  if (problem) {
    problem.value = getProblem();
    problem.addEventListener('input', () => setProblem(problem.value));
  }

  function render(cue: Cue) {
    const suit = SUITS[cue.suit];
    const num = String(cue.id).padStart(2, '0');
    face!.dataset.suit = cue.suit;
    face!.querySelector('[data-cue-text]')!.textContent = cue.text;
    face!.querySelector('[data-cue-note]')!.textContent = cue.note;
    face!.querySelector('[data-cue-suit-name]')!.textContent = suit.name;
    face!.querySelectorAll('[data-cue-num]').forEach((el) => {
      el.textContent = num;
    });
    face!.querySelectorAll('[data-suit-glyph] use').forEach((el) => {
      el.setAttribute('href', `#glyph-${cue.suit}`);
    });
    stage!.dataset.cueId = String(cue.id);
    if (live)
      live.textContent = `Card ${cue.id}, ${suit.name}: ${cue.text}. ${cue.note}`;
  }

  function nextCue(): Cue {
    const recent = getRecent();
    const id = pickId(
      CUES.map((c) => c.id),
      recent,
    );
    setRecent(pushRecent(recent, id, CUES.length));
    document.dispatchEvent(new CustomEvent('recent:change'));
    return CUES.find((c) => c.id === id)!;
  }

  async function tossAway() {
    const toss = flip!.animate(
      [
        { transform: 'none', opacity: 1 },
        { transform: 'translate(55%, -6%) rotate(12deg)', opacity: 0 },
      ],
      {
        duration: 340,
        easing: 'cubic-bezier(0.5, 0, 0.9, 0.5)',
        fill: 'forwards',
      },
    );
    await toss.finished;

    // Turn the card face-down out of sight, then bring it back as the top of
    // the deck.
    inner!.style.transition = 'none';
    flip!.classList.remove('is-flipped');
    void inner!.offsetWidth;
    inner!.style.transition = '';
    toss.cancel();

    await flip!.animate(
      [
        { transform: 'translateY(8px) scale(0.98)', opacity: 0 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 200, easing: 'ease-out' },
    ).finished;
  }

  async function draw() {
    if (busy) return;
    busy = true;

    const cue = nextCue();
    resetActions();
    // The "Tap to draw" hint is only for the very first draw.
    trigger?.querySelector('span')?.remove();

    if (reducedMotion()) {
      render(cue);
      flip!.classList.add('is-flipped');
      await flip!.animate([{ opacity: 0.2 }, { opacity: 1 }], 200).finished;
    } else {
      if (flip!.classList.contains('is-flipped')) await tossAway();
      render(cue);
      await nextFrame();
      flip!.classList.add('is-flipped');
      await new Promise((resolve) => setTimeout(resolve, 650));
    }

    actions?.classList.remove('invisible', 'opacity-0');
    if (drawLabel) drawLabel.textContent = 'Draw another';

    const rect = stage!.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      flip!.scrollIntoView({
        behavior: reducedMotion() ? 'auto' : 'smooth',
        block: 'center',
      });
    }

    busy = false;
  }

  trigger?.addEventListener('click', draw);
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    draw();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== ' ' || event.repeat || event.metaKey || event.ctrlKey)
      return;
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, button, a, [contenteditable]'))
      return;
    event.preventDefault();
    draw();
  });

  if (new URLSearchParams(location.search).has('draw')) {
    history.replaceState(null, '', location.pathname);
    setTimeout(draw, 350);
  }
}
