// src/components/CancelButton.tsx
import React from 'react';
import {FiXSquare} from "react-icons/fi";

interface CancelButtonProps {
    onClick: () => void;
    absolute?: boolean;
    className?: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onClick, absolute = true, className }) => {
    return (
        <button
            onClick={onClick}
            className={`${absolute ? 'absolute top-12 right-4 lg:top-4 lg:right-4' : ''} ${className || ''} text-black hover:text-red-500 flex items-center justify-center z-10 lg:hidden`}
        >
            <FiXSquare className="w-8 h-8" />
        </button>
    );
};

export default CancelButton;
