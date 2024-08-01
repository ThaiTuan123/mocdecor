"use client";

import Link from 'next/link';
import {useState} from 'react';

// @ts-ignore
const CustomButton = ({href, children}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={href} legacyBehavior>
            <a
                className={`px-20 py-4 rounded transition-all duration-300 ${
                    isHovered ? 'bg-white text-primary border-2 border-primary' : 'bg-primary text-white'
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children}
            </a>
        </Link>
    );
};

export default CustomButton;
