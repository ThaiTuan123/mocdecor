// Card.tsx
import React from 'react';
import Image from 'next/image';

interface CardProps {
    icon: string;
    title: string;
    description: string;
}

const ServiceCard: React.FC<CardProps> = ({icon, title, description}) => {
    return (
        <div
            className='py-0 md:py-5 lg:py-12 flex-1 flex flex-col justify-center md:justify-start lg:justify-center items-center text-center text-white border border-white'>
            <Image
                src={icon}
                alt={title}
                width={50}
                height={50}
            />
            <h3 className='text-sm md:text-lg lg:text-xl mt-4 font-bold'>{title}</h3>
            <p className='text-sm md:text-lg pt-2'>{description}</p>
        </div>
    );
};

export default ServiceCard;
