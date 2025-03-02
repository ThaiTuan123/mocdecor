import React from 'react';
import imagesIcons from '@/configs/images';

interface AddImageButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  imageLimit?: number;
}

const AddImageButton: React.FC<AddImageButtonProps> = ({ onClick, imageLimit }) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center text-update hover:text-done-text"
    >
      <img
        className="mb-1 h-5 w-5 transition-transform group-hover:scale-105 group-hover:text-done-text lg:mb-2 lg:h-12 lg:w-12"
        src={imagesIcons.svg.icAddIconPhoto}
        alt={''}
      />
      <span className="px-1 text-x text-update group-hover:text-done-text lg:text-sm">
        Upload tối đa ({imageLimit}) ảnh (kích thước tối đa 60mb/ảnh)
      </span>
    </button>
  );
};

export default AddImageButton;
