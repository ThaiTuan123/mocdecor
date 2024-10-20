import React from 'react';

interface RemoveImageButtonProps {
    onClick: () => void;
}

const RemoveImageButton: React.FC<RemoveImageButtonProps> = ({ onClick }) => (
    <button
        className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 hover:bg-red-500 p-2 rounded-full text-white shadow-md w-8 h-8 flex items-center justify-center"
        onClick={onClick}
    >
        ✕
    </button>
);

export default RemoveImageButton;