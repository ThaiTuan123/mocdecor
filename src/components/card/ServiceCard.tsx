// Card.tsx
import React from 'react';
import Image from 'next/image';

interface CardProps {
    icon: string;
    title: string;
    description: string;
}

const ServiceCard: React.FC<CardProps> = ({ icon, title, description }) => {
    return (
        <div className='flex-1 flex flex-col justify-center items-center text-center text-white border border-white'>
            <Image
                src={icon}
                alt={title}
                width={50}
                height={50}
            />
            <h3 className='mt-4 font-bold'>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default ServiceCard;
