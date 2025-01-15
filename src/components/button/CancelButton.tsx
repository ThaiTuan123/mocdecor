// src/components/CancelButton.tsx
import React from 'react';

interface CancelButtonProps {
  onClick: () => void;
  absolute?: boolean;
  className?: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
  absolute = true,
  className,
}) => {
  return (
    // <button
    //   onClick={onClick}
    //   className={`${absolute ? 'absolute right-4 top-12 lg:right-4 lg:top-4' : ''} ${className || ''} z-10 flex items-center justify-center text-black hover:text-red-500 lg:hidden`}
    // >
    //
    //   /////
    //   <FiXSquare className="h-8 w-8" />
    // </button>

    <button
      className={`${absolute ? 'absolute right-2 top-2 lg:right-4 lg:top-4' : ''} ${className || ''} z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black bg-opacity-50 p-2 text-white shadow-md hover:bg-red-500 hover:bg-opacity-70 lg:hidden`}
      // className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black bg-opacity-50 p-2 text-white shadow-md hover:bg-red-500 hover:bg-opacity-70"
      onClick={onClick}
    >
      ✕
    </button>
  );
};

export default CancelButton;
