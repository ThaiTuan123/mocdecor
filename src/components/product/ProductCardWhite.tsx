import React, {useState} from 'react';
import Image from 'next/image';
import {Product} from '@/types/product';
import {CURRENCY_SYMBOL} from "@/configs/constants/constants";
import {FaRegStar, FaStar} from "react-icons/fa";

// Extend Product props to include onClick
interface ProductCardProps extends Product {
    onClick?: () => void;
}

// Functional component for rendering a product card
const ProductCardWhite: React.FC<ProductCardProps> = ({title, price, rating, reviewCount, image, onClick}) => {
    const [isLoading, setIsLoading] = useState(true);

    // Helper function to render star icons
    const renderStars = () => (
        [...Array(5)].map((_, i) => (
            i < rating.rate ? (
                <FaStar key={i} className="text-rating" size={16} />
            ) : (
                <FaRegStar key={i} className="text-gray-300" size={16} />
            )
        ))
    );

    const truncateTitle = (title: string, maxLength: number) => {
        return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
    };

    return (
        <div
            className="transition-transform duration-300 ease-in-out transform cursor-pointer rounded ring-1 ring-stroke hover:ring-caption"
            onClick={onClick} // Attach onClick handler
        >
            <div className="relative w-full h-44 md:h-52 lg:h-252 xl:h-301">
                {/* Placeholder image with blur effect */}
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 4V2m0 20v-2m8.66-12.66L22 12m-20 0L2.34 7.34m16.97 16.97L20 12m-16.97-2.97L4 12m14.65 1.5a9.951 9.951 0 0 1-3.65.64A9.951 9.951 0 0 1 7.35 13a9.951 9.951 0 0 1-1.5-3.65A9.951 9.951 0 0 1 9.35 6.85a9.951 9.951 0 0 1 3.65-.64A9.951 9.951 0 0 1 16.65 7.35 9.951 9.951 0 0 1 18 11.35a9.951 9.951 0 0 1-.64 3.65z"/>
                        </svg>
                    </div>
                )}
                <Image
                    src={image}
                    alt={title}
                    width={368}
                    height={269}
                    className={`w-full h-full object-fill rounded-t ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <div className="px-1 md:px-4 md:pb-4 mt-4 text-start">
                <h2 className="text-sm md:text-xl font-raleway font-bold text-white truncate">{title}</h2>
                <div className="flex items-center justify-start mt-2">
                    <div className="flex items-start">
                        {renderStars()}
                    </div>
                    <span className="ml-2 text-sm text-white font-medium font-raleway">({rating.count})</span>
                </div>
                <p className="mt-2 text-sm md:text-xl font-normal text-white font-raleway">
                    {price} {CURRENCY_SYMBOL}
                </p>
            </div>
        </div>
    );
};

export default ProductCardWhite;
