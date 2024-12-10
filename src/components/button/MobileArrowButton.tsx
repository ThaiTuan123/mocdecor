import React from 'react';
import { ARROW_RIGHT } from '@/utils/constants';

interface MobileArrowProps {
  onClick: () => void;
}

const MobileArrow: React.FC<MobileArrowProps> = ({ onClick }) => (
  <div
    className="flex w-11 flex-col items-center rounded bg-white transition duration-700 ease-in-out md:hidden md:w-14"
    onClick={onClick}
  >
    <span className="text-1.25lg text-primary md:text-2xl">{ARROW_RIGHT}</span>
  </div>
);

export default MobileArrow;
