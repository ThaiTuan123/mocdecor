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
    <div className="flex flex-1 flex-col items-center justify-center border border-white py-0 text-center text-white md:justify-start md:py-5 lg:justify-center lg:py-12">
      <Image src={icon} alt={title} width={50} height={50} />
      <p className="font-raleway mt-4 text-sm font-bold md:text-lg lg:text-xl">
        {title}
      </p>
      <p className="font-raleway pt-2 text-sm md:text-lg">{description}</p>
    </div>
  );
};

export default ServiceCard;
