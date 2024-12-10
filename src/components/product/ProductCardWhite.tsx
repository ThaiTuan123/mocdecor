import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { CURRENCY_SYMBOL } from '@/configs/constants/constants';
import { FaRegStar, FaStar } from 'react-icons/fa';

// Extend Product props to include onClick
interface ProductCardProps extends Product {
  onClick?: () => void;
}

// Functional component for rendering a product card
const ProductCardWhite: React.FC<ProductCardProps> = ({
  onClick,
  ...product
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { images, product_id, reviewCount, rating, retail_price } = product;
  const { rate = 5, count = 100 } = rating || {};
  // Helper function to render star icons
  const renderStars = () =>
    [...Array(5)].map((_, i) =>
      i < rate ? (
        <FaStar key={i} className="text-rating" size={16} />
      ) : (
        <FaRegStar key={i} className="text-gray-300" size={16} />
      )
    );

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  return (
    <div
      className="transform cursor-pointer rounded ring-1 ring-stroke transition-transform duration-300 ease-in-out hover:ring-caption"
      onClick={onClick} // Attach onClick handler
    >
      <div className="relative h-44 w-full md:h-52 lg:h-252 xl:h-301">
        {/* Placeholder image with blur effect */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <svg
              className="h-12 w-12 animate-spin text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4V2m0 20v-2m8.66-12.66L22 12m-20 0L2.34 7.34m16.97 16.97L20 12m-16.97-2.97L4 12m14.65 1.5a9.951 9.951 0 0 1-3.65.64A9.951 9.951 0 0 1 7.35 13a9.951 9.951 0 0 1-1.5-3.65A9.951 9.951 0 0 1 9.35 6.85a9.951 9.951 0 0 1 3.65-.64A9.951 9.951 0 0 1 16.65 7.35 9.951 9.951 0 0 1 18 11.35a9.951 9.951 0 0 1-.64 3.65z"
              />
            </svg>
          </div>
        )}
        <Image
          src={images?.[0]}
          alt={product.product.name}
          width={368}
          height={269}
          className={`h-full w-full rounded-t object-fill ${
            isLoading ? 'blur-sm' : 'blur-0'
          } transition-all duration-300`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="mt-4 px-1 text-start md:px-4 md:pb-4">
        <h2 className="font-raleway truncate text-sm font-bold text-white md:text-xl">
          {product.product.name}
        </h2>
        <div className="mt-2 flex items-center justify-start">
          <div className="flex items-start">{renderStars()}</div>
          <span className="font-raleway ml-2 text-sm font-medium text-white">
            ({rating.count})
          </span>
        </div>
        <p className="font-raleway mt-2 text-sm font-normal text-white md:text-xl">
          {retail_price} {CURRENCY_SYMBOL}
        </p>
      </div>
    </div>
  );
};

export default ProductCardWhite;
