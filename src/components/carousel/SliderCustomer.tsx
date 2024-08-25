import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface SliderCustomerProps {
    children: React.ReactNode[];
}

const SliderCustomer: React.FC<SliderCustomerProps> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < children.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(children.length - 1);
        }
    };

    return (
        <div className='relative'>
            <motion.div
                className='flex'
                initial={{ x: 0 }}
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ duration: 0.5 }}
                style={{ width: `${children.length * 100}%` }}
            >
                {children.map((child, index) => (
                    <div key={index} className='w-full flex-shrink-0'>
                        {child}
                    </div>
                ))}
            </motion.div>
            <button
                onClick={handlePrev}
                className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded'
            >
                &lt;
            </button>
            <button
                onClick={handleNext}
                className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded'
            >
                &gt;
            </button>
        </div>
    );
};

export default SliderCustomer;
