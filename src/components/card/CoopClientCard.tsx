import Image from 'next/image';
import React from 'react';

interface CoopClientCardProps {
  src: string; // TypeScript interface for prop types
  alt: string;
  width?: number;
  height?: number;
}

const CoopClientCard: React.FC<CoopClientCardProps> = ({
  src,
  alt,
  width = 232.77,
  height = 142.9,
}) => {
  return (
    <div className="w-36 rounded bg-white px-7 py-2 shadow-lg md:w-232.77 md:px-14 md:py-4">
      <div className="flex justify-center">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default CoopClientCard;
