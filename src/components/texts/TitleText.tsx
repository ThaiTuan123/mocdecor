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
            className={`flex mb-2 ${itemsCenter ? 'items-center' : ''} ${justifyCenter ? 'justify-center' : ''}`}
        >
            <motion.div
                className={`w-8 h-px ${bgColor} mr-2`}
                initial={{ width: 0 }}
                animate={{ width: '2rem' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            ></motion.div>
            <h3 className={`text-sm md:text-lg font-raleway font-normal mr-1 uppercase ${textColor}`}>
                {firstText}
            </h3>
            <h3 className={`text-sm md:text-lg font-raleway font-bold uppercase ${textColor}`}>
                <Typewriter
                    words={[secondText]}
                    loop={false}
                    cursor
                    cursorStyle=" "
                    typeSpeed={70}
                    deleteSpeed={100}
                    delaySpeed={1000}
                />
            </h3>
        </div>
    );
};

export default TitleText;
