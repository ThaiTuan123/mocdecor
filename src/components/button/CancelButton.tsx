// src/components/CancelButton.tsx
import React from 'react';
import { FiXSquare } from 'react-icons/fi';

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
    <button
      onClick={onClick}
      className={`${absolute ? 'absolute right-4 top-12 lg:right-4 lg:top-4' : ''} ${className || ''} z-10 flex items-center justify-center text-black hover:text-red-500 lg:hidden`}
    >
      <FiXSquare className="h-8 w-8" />
    </button>
  );
};

export default CancelButton;
