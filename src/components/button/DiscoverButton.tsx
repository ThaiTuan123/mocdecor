import React, { ReactNode } from 'react';

interface DiscoverButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

const DiscoverButton: React.FC<DiscoverButtonProps> = ({ children, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`text-lg mt-2 bg-white text-primary py-4 px-10 rounded uppercase transition-all duration-300 ease-in-out transform hover:bg-brown-200 hover:text-white hover:scale-105 ${className}`}
        >
            {children}
        </button>
    );
};

export default DiscoverButton;
