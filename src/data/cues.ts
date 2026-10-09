import type { SuitId } from './suits';

import { slugify } from '../utils/slug';

export interface Cue {
  /** 1-based position in the deck. Stable; used in storage and on the card. */
  id: number;
  slug: string;
  text: string;
  note: string;
  suit: SuitId;
}

type CueDef = [text: string, suit: SuitId, note: string];

// prettier-ignore
const DEFS: CueDef[] = [
  ['Let it loop', 'pace', 'Let the process repeat instead of forcing an ending. Some problems resolve on the third pass, not the first.'],
  ['Let it die', 'subtract', 'Not everything deserves rescuing. What would you gain by letting this one go?'],
  ['Save it for later', 'pace', 'Park it somewhere safe. A good idea at the wrong time is still a good idea later.'],
  ['Take it apart', 'structure', 'Break it into pieces small enough to understand. Which piece is actually broken?'],
  ['Don’t jam it', 'pace', 'If it resists, forcing it will break something. Ease off and find out why it won’t fit.'],
  ['Turn it off and on again', 'act', 'Reset to a known state. The cheapest fix is sometimes the right one.'],
  ['Relax a rule', 'reframe', 'Which constraint did you impose on yourself? Bend it and see what opens up.'],
  ['Stay small', 'subtract', 'Shrink the scope until it’s obviously doable. You can grow it later.'],
  ['Can you buy something?', 'resource', 'Money trades for time, skill, or a finished part. Is this worth solving yourself?'],
  ['Secret compartment', 'structure', 'Is there a hidden space, spare capacity, or unused option tucked inside what you already have?'],
  ['Take your time', 'pace', 'There is no deadline in the room right now. Let the answer arrive at its own speed.'],
  ['Would superglue work?', 'act', 'Consider the crude, permanent, good-enough fix. Elegance is optional.'],
  ['What is the feeling?', 'feel', 'Name the emotion underneath the problem. It may be the actual problem.'],
  ['Did you lose something?', 'resource', 'Maybe what’s missing is something you once had: a habit, a tool, a person, a sense of ease.'],
  ['What stands on its own?', 'structure', 'Find the part that works independently. Build from there, or ship just that.'],
  ['Should you pull or push?', 'act', 'Force it forward, or create the conditions that draw it toward you?'],
  ['What are the boundaries?', 'structure', 'Where does this problem begin and end? What sits outside your responsibility?'],
  ['Consider counting', 'reframe', 'Put a number on it. Measuring can dissolve a vague worry or expose the real bottleneck.'],
  ['Are you too cautious?', 'feel', 'What would you try if failure were cheap? It may be cheaper than you think.'],
  ['More of the same', 'act', 'Maybe it’s working and just needs more repetitions. Don’t switch strategies too soon.'],
  ['Familiarity is fine', 'resource', 'You don’t need a novel approach. Use what you already know well.'],
  ['Try a new tool', 'resource', 'A different instrument changes what’s easy. What tool would make this trivial?'],
  ['Add some spice', 'act', 'Introduce something unexpected: an odd ingredient, a playful twist, a little risk.'],
  ['Chew on it', 'pace', 'Hold it loosely in mind for a while. Let the background process do its work.'],
  ['Try an old solution', 'resource', 'Something that worked before, here or elsewhere, may work again.'],
  ['Resurrect something', 'resource', 'Dig up an abandoned idea or project. It may fit now in a way it didn’t then.'],
  ['Trim down', 'subtract', 'Cut away what’s extra until only what matters is left.'],
  ['Maximize', 'act', 'Turn it all the way up. What happens at the extreme?'],
  ['Try minimalism', 'subtract', 'What is the fewest moving parts that could possibly work?'],
  ['Fight or flight?', 'feel', 'Is your body bracing for a threat? Check whether it’s real, then choose: engage or walk away.'],
  ['What’s your gut feeling?', 'feel', 'Before you reason it through, what does your instinct already say?'],
  ['Acceptance', 'feel', 'Stop resisting how things are. A problem accepted is often half solved.'],
  ['Take a break', 'pace', 'Step away entirely. Walk, eat, sleep. Come back with fresh eyes.'],
  ['Overwhelming force', 'act', 'Throw far more at it than seems necessary. Leave no room for doubt.'],
  ['Think 10 moves ahead', 'structure', 'Play it forward. Where does each option lead, and what comes after that?'],
  ['Chaos', 'act', 'Shuffle, randomize, break the order. See what falls out.'],
  ['Question assumptions', 'reframe', 'List what you’re taking for granted. Which of those are actually true?'],
  ['It’s OK to be wrong', 'feel', 'Make a guess and commit to it. Being wrong quickly is how you get to right.'],
  ['Higher ground', 'reframe', 'Zoom out until the problem looks small. What does it look like from up there?'],
  ['Ask for help', 'resource', 'Someone may already know the answer, or will see it in a minute.'],
  ['Old acquaintances', 'resource', 'Who from your past would know about this? Reach out to them.'],
  ['Safe space', 'feel', 'Where, or with whom, could you think about this without pressure?'],
  ['Fire at will', 'act', 'Stop aiming. Try many things quickly and see what hits.'],
  ['Perfect is the enemy of good', 'subtract', 'Done and decent beats ideal and imaginary. What would good enough look like?'],
  ['Dumb it down', 'reframe', 'Explain it to a child. The simple version may be the real one.'],
  ['Separation', 'structure', 'Put some distance between the parts, or between yourself and the problem.'],
  ['Are you conflating?', 'reframe', 'Two different things may be wearing the same name. Pull them apart.'],
  ['Retrace your steps', 'resource', 'Go back to the last point where things made sense. What changed after that?'],
  ['Look at the fruit', 'reframe', 'Judge by results, not intentions. What has this actually produced?'],
  ['Are the experts wrong?', 'reframe', 'Conventional wisdom has blind spots. Is this one of them?'],
  ['What would make you happy?', 'feel', 'Forget “correct” for a moment. Which outcome would you actually enjoy?'],
  ['Let the light in', 'feel', 'Bring it into the open. Tell someone, write it down, stop keeping it hidden.'],
  ['Try a change of scenery', 'pace', 'Move somewhere else. A new place shakes loose new thoughts.'],
  ['Ignore it', 'subtract', 'Some problems shrink when left alone. What happens if you do nothing?'],
  ['Feedback', 'structure', 'Get a signal from the real world. Test it, show it, measure it.'],
  ['Cycles', 'structure', 'Is this a recurring pattern? Where are you in the cycle right now?'],
  ['One thing at a time', 'pace', 'Pick a single thread and follow it to the end before touching the next.'],
  ['What is negligible?', 'subtract', 'Some parts barely matter. Drop them from the picture and see what’s left.'],
  ['What is the foundation?', 'structure', 'What does everything else rest on? Get that right first.'],
  ['What is non-negotiable?', 'structure', 'Find the hard requirements. Everything else is flexible.'],
  ['Smooth or rough?', 'act', 'Does this call for polish, or would rough and raw serve it better?'],
  ['Is there prior art?', 'resource', 'Someone has probably faced this before. Find out how they solved it.'],
  ['What can you live with?', 'feel', 'Define the minimum you’d be at peace with, and aim there.'],
  ['What are your talents?', 'resource', 'Lean on what you’re naturally good at. Reshape the problem to fit your strengths.'],
  ['Delegate', 'resource', 'Does this have to be you? Hand it to someone better placed.'],
  ['Make peace', 'feel', 'Is there a conflict, outer or inner, that needs settling before anything else can move?'],
  ['Relax', 'pace', 'Unclench. Tension narrows thinking. Breathe, and loosen your grip.'],
  ['Loose or tight?', 'structure', 'Should this be tightly controlled, or left loose to find its own shape?'],
  ['Swap something', 'act', 'Replace one part with something else: a material, a person, the order of steps.'],
  ['Clarify', 'reframe', 'Write down exactly what the problem is. Vagueness hides answers.'],
  ['Is there a contradiction?', 'reframe', 'Two things you want may be incompatible. Which one matters more?'],
  ['Can you say no?', 'subtract', 'Decline something. The freed-up capacity might be the solution.'],
  ['Silence is an answer', 'subtract', 'You don’t have to respond. Not answering is also an answer.'],
  ['What’s your contribution?', 'feel', 'How are you part of this problem? Own your share of it.'],
  ['Is it the wrong question?', 'reframe', 'Maybe the problem as stated can’t be solved. What’s the better question?'],
  ['What are you ignoring?', 'reframe', 'Look directly at the thing you keep avoiding looking at.'],
  ['Roll it', 'act', 'Get it moving and let momentum carry it. Or roll the dice and let chance decide.'],
  ['Salt', 'act', 'A small amount of the right thing transforms the whole. What pinch is missing?'],
  ['What’s left?', 'subtract', 'Set aside what’s done, solved, or irrelevant. Look at what remains.'],
  ['Try again', 'act', 'Same approach, one more time, with your full attention.'],
  ['What doesn’t fit?', 'reframe', 'Find the anomaly. The odd detail is often the clue.'],
  ['Slow is fine', 'pace', 'Slow progress is still progress. Speed isn’t the goal.'],
  ['Restraint', 'subtract', 'Hold back. Doing less, deliberately, can be the stronger move.'],
  ['Fractals', 'structure', 'Does the same pattern repeat at smaller and larger scales? Solve it once, apply it everywhere.'],
];

export const CUES: Cue[] = DEFS.map(([text, suit, note], i) => ({
  id: i + 1,
  slug: slugify(text),
  text,
  note,
  suit,
}));

export const CUE_COUNT = CUES.length;

export function cuesInSuit(suit: SuitId): Cue[] {
  return CUES.filter((cue) => cue.suit === suit);
}
