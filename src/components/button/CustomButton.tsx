// src/components/CommonButton.tsx

"use client";

import React, { useState } from 'react';
import { useIsMobile } from '@/utils/useIsMobile';

interface CommonButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({ onClick, type = "button", children, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useIsMobile(); // Use the hook

    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-20 py-3 rounded border-2 border-primary ${className} ${
                !isMobile ? `transition-all duration-300 ease-in-out transform ${isHovered ? 'bg-white text-primary scale-105' : 'bg-primary text-white scale-100'}` : 'bg-primary text-white'
            }`}
            onMouseEnter={() => !isMobile && setIsHovered(true)} // Conditional hover effect
            onMouseLeave={() => !isMobile && setIsHovered(false)} // Conditional hover effect
        >
            {children}
        </button>
    );
};

export default CommonButton;
