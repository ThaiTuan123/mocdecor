"use client";

import React, {useState} from "react";
import {useIsMobile} from "@/utils/useIsMobile";

interface CommonButtonProps {
    type?: "button" | "submit" | "reset";
    text?: string;
    className?: string;
    href?: string;
    onClick?: () => void;
}

const CommonButton: React.FC<CommonButtonProps> = ({
                                                       type = "button",
                                                       text,
                                                       className = "",
                                                       href,
                                                       onClick,
                                                   }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useIsMobile();

    // Base styles for all buttons
    const baseStyles = `md:px-20 md:py-3 rounded border-2 border-primary ${className}`;

    // Styles for desktop hover effect
    const desktopHoverStyles = `transition-all duration-300 ease-in-out transform ${
        isHovered ? "bg-white text-primary scale-105" : "bg-primary text-white scale-100"
    }`;

    // Styles for mobile (no hover effect)
    const mobileStyles = `bg-primary text-white px-12 py-2`;

    // Conditionally apply styles based on the device type
    const buttonClassNames = `${baseStyles} ${isMobile ? mobileStyles : desktopHoverStyles}`;

    // Render as anchor tag if href is provided
    if (href) {
        return (
            <a
                href={href}
                className={buttonClassNames}
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
            >
                {text}
            </a>
        );
    }

    // Render as button if href is not provided
    return (
        <button
            type={type}
            className={buttonClassNames}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default CommonButton;
