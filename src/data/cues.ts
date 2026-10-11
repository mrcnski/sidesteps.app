import type { SuitId } from './suits';

import { slugify } from '../utils/slug';

export interface Cue {
  /** 1-based position in the deck. Stable; used in storage and on the card. */
  id: number;
  slug: string;
  text: string;
  suit: SuitId;
}

type CueDef = [text: string, suit: SuitId];

// prettier-ignore
const DEFS: CueDef[] = [
  ['Let it loop', 'pace'],
  ['Let it die', 'subtract'],
  ['Save it for later', 'pace'],
  ['Take it apart', 'structure'],
  ['Don’t jam it', 'pace'],
  ['Turn it off and on again', 'act'],
  ['Relax a rule', 'reframe'],
  ['Stay small', 'subtract'],
  ['Buy something', 'resource'],
  ['Secret compartment', 'structure'],
  ['Take your time', 'pace'],
  ['Would superglue work?', 'act'],
  ['What is the feeling?', 'feel'],
  ['Did you lose something?', 'resource'],
  ['What stands on its own?', 'structure'],
  ['Should you pull or push?', 'act'],
  ['What are the boundaries?', 'structure'],
  ['Consider counting', 'reframe'],
  ['Are you too cautious?', 'feel'],
  ['More of the same', 'act'],
  ['Familiarity is fine', 'resource'],
  ['Try a new tool', 'resource'],
  ['Add some spice', 'act'],
  ['Chew on it', 'pace'],
  ['Try an old solution', 'resource'],
  ['Resurrect something', 'resource'],
  ['Trim down', 'subtract'],
  ['Maximize', 'act'],
  ['Try minimalism', 'subtract'],
  ['Fight or flight?', 'feel'],
  ['What’s your gut feeling?', 'feel'],
  ['Acceptance', 'feel'],
  ['Take a break', 'pace'],
  ['Overwhelming force', 'act'],
  ['Think 10 moves ahead', 'structure'],
  ['Chaos', 'act'],
  ['Question assumptions', 'reframe'],
  ['It’s OK to be wrong', 'feel'],
  ['Higher ground', 'reframe'],
  ['Ask for help', 'resource'],
  ['Old acquaintances', 'resource'],
  ['Fire at will', 'act'],
  ['Perfect is the enemy of good', 'subtract'],
  ['Dumb it down', 'reframe'],
  ['Separate', 'structure'],
  ['Are you conflating?', 'reframe'],
  ['Retrace your steps', 'resource'],
  ['Look at the fruit', 'reframe'],
  ['Are the experts wrong?', 'reframe'],
  ['What would make you happy?', 'feel'],
  ['Let the light in', 'feel'],
  ['Try a change of scenery', 'pace'],
  ['Ignore it', 'subtract'],
  ['Feedback', 'structure'],
  ['Cycles', 'structure'],
  ['One thing at a time', 'pace'],
  ['What is negligible?', 'subtract'],
  ['What is the foundation?', 'structure'],
  ['What is non-negotiable?', 'structure'],
  ['Smooth or rough?', 'act'],
  ['Is there prior art?', 'resource'],
  ['What can you live with?', 'feel'],
  ['What are your talents?', 'resource'],
  ['Delegate', 'resource'],
  ['Make peace', 'feel'],
  ['Relax', 'pace'],
  ['Loose or tight?', 'structure'],
  ['Swap something', 'act'],
  ['Clarify', 'reframe'],
  ['Is there a contradiction?', 'reframe'],
  ['Can you say no?', 'subtract'],
  ['Silence is an answer', 'subtract'],
  ['What’s your contribution?', 'feel'],
  ['Is it the wrong question?', 'reframe'],
  ['What are you ignoring?', 'reframe'],
  ['Roll it', 'act'],
  ['Water', 'act'],
  ['Salt', 'act'],
  ['What’s left?', 'subtract'],
  ['Try again', 'act'],
  ['What doesn’t fit?', 'reframe'],
  ['Slow is fine', 'pace'],
  ['Restraint', 'subtract'],
  ['Fractals', 'structure'],
];

export const CUES: Cue[] = DEFS.map(([text, suit], i) => ({
  id: i + 1,
  slug: slugify(text),
  text,
  suit,
}));

export const CUE_COUNT = CUES.length;

export function cuesInSuit(suit: SuitId): Cue[] {
  return CUES.filter((cue) => cue.suit === suit);
}
