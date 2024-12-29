import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { CURRENCY_SYMBOL } from '@/configs/constants/constants';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { formatCurrency } from '@/utils/formatCurrency';

interface ProductCardProps extends Product {
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ onClick, ...product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { images, product_id, reviewCount, rating, retail_price } = product;
  const { rate = 4, count = 100 } = rating || {};
  const renderStars = () =>
    [...Array(5)].map((_, i) =>
      i < rate ? (
        <FaStar key={i} className="text-rating" size={16} />
      ) : (
        <FaRegStar key={i} className="text-gray-300" size={16} />
      )
    );

  return (
    <div
      className="transform cursor-pointer rounded bg-white p-1 ring-1 ring-stroke transition-transform duration-300 ease-in-out hover:outline-4 hover:ring-caption md:p-4"
      onClick={onClick}
    >
      <div className="xl:h-238 relative h-44 w-full md:h-52 lg:h-220">
        {isLoading ? (
          // Skeleton Loader for Image
          <div className="absolute inset-0 animate-pulse rounded bg-gray-200"></div>
        ) : null}
        <Image
          src={images?.[0]}
          alt={product.product.name}
          width={238}
          height={238}
          className={`h-full w-full rounded-t object-fill transition-all duration-300 ${
            isLoading ? 'blur-sm' : 'blur-0'
          }`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="mt-4 text-start">
        {isLoading ? (
          // Skeleton Loaders for Text Content
          <div className="animate-pulse space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-1/3 rounded bg-gray-200"></div>
              <div className="h-4 w-1/6 rounded bg-gray-200"></div>
            </div>
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          </div>
        ) : (
          <>
            <p className="font-raleway truncate text-sm font-bold text-brown-900 md:text-xl">
              {product.product.name}
            </p>
            <div className="mt-2 flex items-center justify-start">
              <div className="flex items-start">{renderStars()}</div>
              <span className="font-raleway ml-2 text-sm font-medium text-gray-100">
                {count}
              </span>
            </div>
            <p className="font-raleway mt-2 text-sm font-normal text-orange-600 md:text-xl">
              {`${formatCurrency(retail_price)} ${CURRENCY_SYMBOL}`}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
