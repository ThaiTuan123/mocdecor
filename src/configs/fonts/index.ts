// src/fonts/index.ts
import localFont from 'next/font/local';

// Define and export the Raleway font configuration
export const ralewayRegular = localFont({
  src: '/fonts/raleway/raleway-regular.woff2',
  display: 'swap',
  weight: '400',
});

// Playfair Display Font
export const playfairDisplayRegular = localFont({
  src: '/fonts/playfair-display/playfairDisplay-Regular.ttf',
  display: 'swap',
  weight: '400',
});

export const playfairDisplayMedium = localFont({
  src: '/fonts/playfair-display/playfairDisplay-Medium.ttf',
  display: 'swap',
  weight: '400',
});

export const playfairDisplayBold = localFont({
  src: '/fonts/playfair-display/playfairDisplay-Bold.ttf',
  display: 'swap',
  weight: '400',
});
