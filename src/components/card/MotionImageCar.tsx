import { motion } from 'framer-motion';
import React from "react";

interface MotionImageCardProps {
    src: string;
    alt: string;
    text: string;
}

const MotionImageCard: React.FC<MotionImageCardProps> = ({ src, alt, text }) => (
    <motion.div
        className="flex flex-col"
        whileHover={{
            scale: 1.05,
            rotateX: 15,
            rotateY: -15,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-lg"
        />
        <p className="bottom-0 left-0 text-1.25lg font-raleway font-normal mt-4">
            {text}
        </p>
    </motion.div>
);

export default MotionImageCard;
