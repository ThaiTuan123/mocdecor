import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { CURRENCY_SYMBOL } from "@/configs/constants/constants";
import {FaRegStar, FaStar} from "react-icons/fa";

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
      className="p-1 md:p-4 transition-transform duration-300 ease-in-out transform hover:outline-4 cursor-pointer rounded ring-1 bg-white ring-stroke hover:ring-caption"
      onClick={onClick}
    >
      <div className="relative w-full h-44 md:h-52 lg:h-220 xl:h-269">
        {isLoading ? (
          // Skeleton Loader for Image
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
        ) : null}
        <Image
          src={images?.[0]}
          alt={product.product.name}
          width={212}
          height={269}
          className={`w-full h-full rounded-t object-fill transition-all duration-300 ${
            isLoading ? "blur-sm" : "blur-0"
          }`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="mt-4 text-start">
        {isLoading ? (
          // Skeleton Loaders for Text Content
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <p className="text-sm md:text-xl font-raleway font-bold text-brown-900 truncate">
              {product.product.name}
            </p>
            <div className="flex items-center justify-start mt-2">
              <div className="flex items-start">{renderStars()}</div>
              <span className="ml-2 text-sm text-gray-100 font-medium font-raleway">
                {count}
              </span>
            </div>
            <p className="mt-2 text-sm md:text-xl font-normal text-orange-600 font-raleway">
              {retail_price} {CURRENCY_SYMBOL}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
