import React from 'react';

interface RemoveImageButtonProps {
  onClick: () => void;
}

const RemoveImageButton: React.FC<RemoveImageButtonProps> = ({ onClick }) => (
  <button
    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black bg-opacity-50 p-2 text-white shadow-md hover:bg-red-500 hover:bg-opacity-70"
    onClick={onClick}
  >
    ✕
  </button>
);

export default RemoveImageButton;
