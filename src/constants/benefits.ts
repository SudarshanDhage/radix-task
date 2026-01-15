export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const BENEFITS: Benefit[] = [
  {
    id: 'track',
    icon: 'iconTrack',
    title: 'Keep tasks in one place',
    description: 'Save time, avoid losing work and information, delegate, and track tasks to stay on schedule',
  },
  {
    id: 'prioritize',
    icon: 'iconPrioritize',
    title: 'Prioritize your work',
    description: 'Tracking tasks allows everyone to understand which are more important or require more time, so',
  },
  {
    id: 'collaborate',
    icon: 'iconCollaborate',
    title: 'Improve collaboration',
    description: 'Tracking tasks allows everyone to understand which are more important or require more time, so',
  },
];
