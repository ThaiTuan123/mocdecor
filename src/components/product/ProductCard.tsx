import React, {useState} from 'react';
import Image from 'next/image';
import {Product} from '@/types/product';
import {CURRENCY_SYMBOL} from "@/configs/constants/constants";

interface ProductCardProps extends Product {
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({title, price, rating, reviewCount, image, onClick}) => {
    const [isLoading, setIsLoading] = useState(true);

    const renderStars = () => (
        [...Array(5)].map((_, i) => (
            <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${i < rating.rate ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
            </svg>
        ))
    );

    return (
        <div
            className="p-1 md:p-4 transition-transform duration-300 ease-in-out transform hover:outline-4 cursor-pointer rounded ring-1 ring-stroke hover:ring-caption"
            onClick={onClick}
        >
            <div className="relative w-full h-44 md:h-52 lg:h-220 xl:h-269">
                {isLoading ? (
                    // Skeleton Loader for Image
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
                ) : null}
                <Image
                    src={image}
                    alt={title}
                    width={368}
                    height={269}
                    className={`w-full h-full rounded-t object-fill transition-all duration-300 ${isLoading ? 'blur-sm' : 'blur-0'}`}
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
                        <h2 className="text-sm md:text-xl font-raleway font-bold text-brown-900 truncate">{title}</h2>
                        <div className="flex items-center justify-start mt-2">
                            <div className="flex items-start">
                                {renderStars()}
                            </div>
                            <span className="ml-2 text-sm text-gray-100 font-medium font-raleway">
                                ({rating.count})
                            </span>
                        </div>
                        <p className="mt-2 text-sm md:text-xl font-normal text-orange-600 font-raleway">
                            {price} {CURRENCY_SYMBOL}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
