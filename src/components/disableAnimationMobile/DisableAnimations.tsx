// src/components/DisableAnimations.tsx

'use client';

import React, { useEffect } from 'react';
import { isMobile } from '@/utils/isMobile';

interface DisableAnimationsProps {
  children: React.ReactNode;
}

const DisableAnimations: React.FC<DisableAnimationsProps> = ({ children }) => {
  useEffect(() => {
    if (isMobile()) {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
                * {
                    transition: none !important;
                    animation: none !important;
                }
            `;
      document.head.appendChild(styleElement);

      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, []);

  return <>{children}</>;
};

export default DisableAnimations;
