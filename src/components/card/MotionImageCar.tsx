import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MotionImageCardProps {
  src: string;
  alt: string;
  text: string;
  className?: string;
  href?: string;
}

const MotionImageCard: React.FC<MotionImageCardProps> = ({
  src,
  alt,
  text,
  className,
  href,
}) => {
  const content = (
    <motion.div
      className={`flex flex-col ${className}`}
      whileHover={{
        scale: 1.025,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Image
        width={450}
        height={176}
        src={src}
        alt={alt}
        className="h-44 w-full rounded-lg object-cover md:h-full"
      />
      <p className="font-raleway bottom-0 left-0 mt-4 text-lg font-semibold md:text-1.25lg md:font-normal">
        {text}
      </p>
    </motion.div>
  );

  return href ? (
    <Link className="flex flex-col" href={href}>
      {content}
    </Link>
  ) : (
    content
  );
};

export default MotionImageCard;
