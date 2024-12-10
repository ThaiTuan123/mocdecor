// src/components/SharedButton.tsx

import React from 'react';
import Link from 'next/link';
import { useIsMobile } from '@/utils/useIsMobile';

interface SharedButtonProps {
  text: string;
  href: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
  hoverBgColor: string;
  hoverTextColor: string;
}

const SharedButton: React.FC<SharedButtonProps> = ({
  text,
  href,
  borderColor,
  textColor,
  bgColor,
  hoverBgColor,
  hoverTextColor,
}) => {
  const isMobile = useIsMobile();

  return (
    <Link href={href}>
      <button
        className={`border-2 px-16 py-4 ${borderColor} ${textColor} ${bgColor} rounded text-lg font-bold uppercase ${!isMobile ? 'transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-bright-main hover:text-brown-500' : ''}`}
      >
        {text}
      </button>
    </Link>
  );
};

export default SharedButton;
