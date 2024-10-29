"use client";

import React, {useState} from "react";
import {useIsMobile} from "@/utils/useIsMobile";

interface CommonButtonProps {
    type?: "button" | "submit" | "reset";
    text?: string;
    className?: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean; // Add the disabled prop
    cancelButton?: boolean
}

const CommonButton: React.FC<CommonButtonProps> = ({
                                                       type = "button",
                                                       text,
                                                       className = "",
                                                       href,
                                                       onClick,
                                                       disabled = false, // Add default value for disabled
                                                       cancelButton = false
                                                   }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useIsMobile();

    // Base styles for all buttons
    const baseStyles = `md:px-20 md:py-3 px-8 py-3 text-base rounded border-2 border-primary ${className}`;

    // Styles for desktop hover effect
    const desktopHoverStyles = `transition-all duration-300 ease-in-out transform ${cancelButton ? 'text-primary bg-red' : 'bg-primary text-white'} ${
        isHovered ? "md:bg-white md:text-primary md:scale-105" : `md:bg-primary md:text-white md:scale-100`
    }`;

    // Conditionally apply styles based on the device type
    const buttonClassNames = `${baseStyles} ${desktopHoverStyles}`;

    // Render as anchor tag if href is provided
    if (href) {
        return (
            <a
                href={href}
                className={buttonClassNames}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {text}
            </a>
        );
    }

    // Render as button if href is not provided
    return (
        <button
            type={type}
className={`!text-lg ${buttonClassNames}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default CommonButton;
