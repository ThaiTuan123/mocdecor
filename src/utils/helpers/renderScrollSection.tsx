import React from 'react';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

export const renderScrollSection = (Component: React.ComponentType) => (
  <ScrollAnimation>
    <Component />
  </ScrollAnimation>
);
