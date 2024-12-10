import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

interface TitleTextProps {
  firstText: string;
  secondText: string;
  itemsCenter?: boolean;
  justifyCenter?: boolean;
  textColor?: 'text-category' | 'text-white';
  bgColor?: 'bg-category' | 'bg-white';
}

const TitleText: React.FC<TitleTextProps> = ({
  firstText,
  secondText,
  itemsCenter = true,
  justifyCenter = true,
  textColor = 'text-category',
  bgColor = 'bg-category',
}) => {
  return (
    <div
      className={`mb-2 flex ${itemsCenter ? 'items-center' : ''} ${justifyCenter ? 'justify-center' : ''}`}
    >
      <motion.div
        className={`h-px w-8 ${bgColor} mr-2`}
        initial={{ width: 0 }}
        animate={{ width: '2rem' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      ></motion.div>
      <p className={`mr-1 text-sm uppercase md:text-lg ${textColor}`}>
        {firstText}
      </p>
      <p className={`text-sm font-bold uppercase md:text-lg ${textColor}`}>
        <Typewriter
          words={[secondText]}
          loop={false}
          cursor
          cursorStyle=" "
          typeSpeed={70}
          deleteSpeed={100}
          delaySpeed={1000}
        />
      </p>
    </div>
  );
};

export default TitleText;
