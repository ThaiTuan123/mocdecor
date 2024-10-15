import React from 'react';
import { ARROW_RIGHT } from '@/utils/constants';

interface MobileArrowProps {
    onClick: () => void;
}

const MobileArrow: React.FC<MobileArrowProps> = ({ onClick }) => (
    <div
        className="flex md:hidden flex-col bg-white w-11 md:w-14 items-center rounded transition duration-700 ease-in-out"
        onClick={onClick}
    >
        <span className="text-primary text-1.25lg md:text-2xl">{ARROW_RIGHT}</span>
    </div>
);

export default MobileArrow;