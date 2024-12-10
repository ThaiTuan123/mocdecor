import React from 'react';

interface RightArrowButtonProps {
  onClick?: () => void;
}

const RightArrowButton: React.FC<RightArrowButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group hidden h-8 w-14 cursor-pointer flex-col items-center justify-center rounded bg-white transition-all duration-1000 ease-in-out hover:bg-brown-200 md:flex"
    >
      <span className="transform text-2xl text-primary transition-all duration-1000 ease-in-out group-hover:translate-x-2 group-hover:text-white">
        &#8594;
      </span>
    </div>
  );
};

export default RightArrowButton;
