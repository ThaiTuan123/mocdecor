"use client";

import React, { useState } from 'react';
import { useIsMobile } from '@/utils/useIsMobile';

interface CommonButtonProps {
    type?: "button" | "submit" | "reset";
    text?: string;
    className?: string;
    href?: string;
    onClick?: () => void;
}

const CommonButton: React.FC<CommonButtonProps> = ({ type = "button", text, className, href, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useIsMobile(); // Use the hook

    const commonClassNames = `px-20 py-3 rounded border-2 border-primary ${className} ${
        !isMobile ? `transition-all duration-300 ease-in-out transform ${isHovered ? 'bg-white text-primary scale-105' : 'bg-primary text-white scale-100'}` : 'bg-primary text-white'
    }`;

    if (href) {
        return (
            <a
                href={href}
                className={commonClassNames}
                onMouseEnter={() => !isMobile && setIsHovered(true)} // Conditional hover effect
                onMouseLeave={() => !isMobile && setIsHovered(false)} // Conditional hover effect
            >
                {text} {/* Use text prop */}
            </a>
        );
    }

    // Render as a button if href is not provided
    return (
        <button
            type={type}
            className={commonClassNames}
            onMouseEnter={() => !isMobile && setIsHovered(true)} // Conditional hover effect
            onMouseLeave={() => !isMobile && setIsHovered(false)} // Conditional hover effect
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default CommonButton;
