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
    <button
      className={`'${className || ''} z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black bg-opacity-50 p-2 text-white shadow-md hover:bg-red-500 hover:bg-opacity-70 lg:hidden`}
      onClick={onClick}
    >
      ✕
    </button>
  );
};

export default CancelButton;
