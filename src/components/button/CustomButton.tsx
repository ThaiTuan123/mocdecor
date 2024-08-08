"use client";

import React, {useState} from 'react';

interface CommonButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({onClick, type = "button", children, className}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-20 py-4 rounded transition-all duration-300 ${className} ${
                isHovered ? 'bg-white text-primary border-2 border-primary' : 'bg-primary text-white'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </button>
    );
};

export default CommonButton;