import React from 'react';
import imagesIcons from "@/configs/images";

interface AddImageButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddImageButton: React.FC<AddImageButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-update hover:text-done-text flex flex-col items-center justify-center group"
        >
            <img
                className='w-5 h-5 lg:w-12 lg:h-12 mb-1 lg:mb-2 group-hover:text-done-text group-hover:scale-105 transition-transform'
                src={imagesIcons.svg.icAddIconPhoto} alt={""}/>
            <span className='text-x lg:text-sm text-update group-hover:text-done-text px-1'>Upload tối đa (40) ảnh (kích thước tối đa 60mb/ảnh)</span>
        </button>
    );
};

export default AddImageButton;