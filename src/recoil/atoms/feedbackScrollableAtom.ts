import { atom } from 'recoil';

// Atom for scroll interval
export const scrollIntervalState = atom<number>({
  key: 'scrollIntervalState',
  default: 5000, // Default value
});

// Atom for scroll direction
export const directionState = atom<string>({
  key: 'directionState',
  default: 'left', // Default value
});

// Atom for scroll speed
export const speedState = atom<string>({
  key: 'speedState',
  default: 'slow', // Default value
});

// Atom for animation state
export const animationState = atom<boolean>({
  key: 'animationState',
  default: false,
});
