// src/components/CarouselButton.tsx
import React from 'react';

interface CarouselButtonProps {
    type: 'prev' | 'next';
    handleClick: () => void;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({ type, handleClick }) => {
    return (
        <button
            type="button"
            className={`absolute top-0 ${type === 'prev' ? 'left-0' : 'right-0'} z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`}
            data-carousel={type}
            onClick={handleClick}
        >
            <span
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-400/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none`}
            >
                <svg
                    className={`w-4 h-4 text-white dark:text-gray-800 ${type === 'prev' ? 'rtl:rotate-180' : ''}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={type === 'prev' ? 'M5 1 1 5l4 4' : 'm1 9 4-4-4-4'}
                    />
                </svg>
                <span className="sr-only">{type === 'prev' ? 'Previous' : 'Next'}</span>
            </span>
        </button>
    );
};

export default CarouselButton;
