// src/components/CancelButton.tsx
import React from 'react';

interface CancelButtonProps {
    onClick: () => void;
    absolute?: boolean;
    className?: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({onClick, absolute = true, className}) => {
    return (
        <button
            onClick={onClick}
            className={`${absolute ? 'absolute top-16 right-6 lg:top-4 lg:right-4' : ''} ${className || ''} text-black hover:text-red-500 flex items-center justify-center z-10`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 28 28"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    );
};

export default CancelButton;
