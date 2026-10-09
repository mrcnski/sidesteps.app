export const SUIT_IDS = [
  'reframe',
  'subtract',
  'structure',
  'act',
  'pace',
  'feel',
  'resource',
] as const;

export type SuitId = (typeof SUIT_IDS)[number];

export interface Suit {
  id: SuitId;
  name: string;
  description: string;
}

export const SUITS: Record<SuitId, Suit> = {
  reframe: {
    id: 'reframe',
    name: 'Reframe',
    description: 'Look at the problem from a different angle.',
  },
  subtract: {
    id: 'subtract',
    name: 'Subtract',
    description: 'Remove, shrink, or let go.',
  },
  structure: {
    id: 'structure',
    name: 'Structure',
    description: 'Find the shape, edges, and patterns.',
  },
  act: {
    id: 'act',
    name: 'Act',
    description: 'Do something, often something blunt.',
  },
  pace: {
    id: 'pace',
    name: 'Pace',
    description: 'Change the speed. Usually, slow down.',
  },
  feel: {
    id: 'feel',
    name: 'Feel',
    description: 'Check in with what is going on inside.',
  },
  resource: {
    id: 'resource',
    name: 'Resource',
    description: 'Draw on people, tools, and the past.',
  },
};
