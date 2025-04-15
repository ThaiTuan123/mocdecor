// src/components/CarouselButton.tsx
import React from 'react';

interface CarouselButtonProps {
  type: 'prev' | 'next';
  handleClick: () => void;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({
  type,
  handleClick,
}) => {
  return (
    <button
      type="button"
      className={`absolute top-0 ${type === 'prev' ? 'left-0' : 'right-0'} z-30 flex h-full cursor-pointer items-center justify-center px-4`}
      data-carousel={type}
      onClick={handleClick}
    >
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:border-transparent active:transform-none active:border-transparent group-hover:bg-gray-200 group-focus:ring-4 group-focus:ring-gray-300 sm:h-10 sm:w-10`}
      >
        <svg
          className={`h-3 w-3 text-brown-700 sm:h-4 sm:w-4 ${type === 'prev' ? 'rtl:rotate-180' : ''}`}
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
