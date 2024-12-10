import React, { ReactNode } from 'react';

interface DiscoverButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const DiscoverButton: React.FC<DiscoverButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`mt-2 transform rounded bg-white px-10 py-4 text-lg uppercase text-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brown-200 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default DiscoverButton;
