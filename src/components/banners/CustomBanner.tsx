import React from 'react';

interface CustomBannerProps {
  backgroundImage: string;
  breadcrumb: string[];
  title: string;
  description: string;
}

const CustomBanner: React.FC<CustomBannerProps> = ({
  backgroundImage,
  breadcrumb,
  title,
  description,
}) => {
  return (
    <div className={`h-80 bg-cover bg-center ${backgroundImage}`}>
      <div className="container mx-auto flex h-full flex-col items-center justify-center">
        <div className="flex">
          {breadcrumb.map((crumb, index) => (
            <p
              key={index}
              className={
                index === breadcrumb.length - 1
                  ? 'text-white'
                  : 'px-1 text-black-50'
              }
            >
              {crumb}
              {index !== breadcrumb.length - 1 && ' / '}
            </p>
          ))}
        </div>
        <h1 className="font-playfairBold py-2 text-6xl font-bold text-white">
          {title}
        </h1>
        <p className="font-raleway px-80 text-center text-xl text-white">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CustomBanner;
