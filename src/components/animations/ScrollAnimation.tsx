import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type ScrollAnimationProps = {
    children: ReactNode;
};

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children }) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <>
            {!isMobile ? (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true }}
                >
                    {children}
                </motion.div>
            ) : (
                <div>{children}</div>
            )}
        </>
    );
};

export default ScrollAnimation;