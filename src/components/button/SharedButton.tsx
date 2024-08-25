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
                className={`px-16 py-4 border-2 ${borderColor} ${textColor} ${bgColor} font-bold text-lg rounded uppercase ${!isMobile ? 'transition-all duration-300 ease-in-out hover:bg-bright-main hover:text-brown-500 transform hover:scale-105' : ''}`}
            >
                {text}
            </button>
        </Link>
    );
};

export default SharedButton;
