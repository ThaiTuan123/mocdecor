import Image from 'next/image';
import React from 'react';

interface CoopClientCardProps {
    src: string; // TypeScript interface for prop types
    alt: string;
    width?: number;
    height?: number;
}

const CoopClientCard: React.FC<CoopClientCardProps> = ({src, alt, width = 232.77, height = 142.9}) => {
    return (
        <div className="w-36 md:w-232.77 bg-white shadow-lg rounded py-2 md:py-4 px-7 md:px-14">
            <div className="flex justify-center">
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className='object-contain'
                />
            </div>
        </div>
    );
};

export default CoopClientCard;
