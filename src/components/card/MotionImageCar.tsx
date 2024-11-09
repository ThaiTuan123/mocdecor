import {motion} from 'framer-motion';
import React from "react";
import Image from "next/image";

interface MotionImageCardProps {
    src: string;
    alt: string;
    text: string;
    className?: string;
}

const MotionImageCard: React.FC<MotionImageCardProps> = ({src, alt, text, className}) => (
    <motion.div
        className={`flex flex-col ${className}`}
        whileHover={{
            scale: 1.025,
        }}
        transition={{type: 'spring', stiffness: 300, damping: 20}}
    >
        <Image
            width={450}
            height={176}
            src={src}
            alt={alt}
            className="w-full md:h-full h-44 object-cover rounded-lg"
        />
        <p className="bottom-0 left-0 text-lg md:text-1.25lg font-raleway font-semibold  md:font-normal mt-4">
            {text}
        </p>
    </motion.div>
);

export default MotionImageCard;
