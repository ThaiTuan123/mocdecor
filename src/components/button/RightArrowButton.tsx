import React from 'react';

interface RightArrowButtonProps {
    onClick?: () => void;
}

const RightArrowButton: React.FC<RightArrowButtonProps> = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col justify-center items-center bg-white w-14 h-8 rounded transition-all duration-500 ease-in-out cursor-pointer group hover:bg-brown-200"
        >
            <span className="text-primary text-2xl transform group-hover:translate-x-2 group-hover:text-white transition-all duration-500 ease-in-out">
                &#8594;
            </span>
        </div>
    );
};

export default RightArrowButton;
