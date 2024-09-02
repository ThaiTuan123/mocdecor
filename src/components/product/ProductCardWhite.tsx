import React from 'react';
import Image from 'next/image';
import {Product} from '@/types/product';
import {CURRENCY_SYMBOL} from "@/configs/constants/constants";

// Functional component for rendering a product card
const ProductCardWhite: React.FC<Product> = ({title, price, rating, reviewCount, image}) => {
    // Helper function to render star icons
    const renderStars = () => (
        [...Array(5)].map((_, i) => (
            <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${i < rating.rate ? 'text-rating' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
            </svg>
        ))
    );

    const truncateTitle = (title: string, maxLength: number) => {
        return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
    };

    return (
        <div className="p-4 transition-transform transform hover:scale-110 cursor-pointer">
            <Image
                src={image}
                alt={title}
                width={368}
                height={269}
                className="w-full h-269 object-fill"
            />
            <div className="mt-4 text-start">
                <h2 className="text-xl font-raleway font-bold text-white">
                    {truncateTitle(title, 60)}
                </h2>
                <div className="flex items-center justify-start mt-2">
                    <div className="flex items-start">
                        {renderStars()}
                    </div>
                    <span className="ml-2 text-sm text-white font-medium font-raleway">({rating.count})</span>
                </div>
                <p className="mt-2 text-xl font-normal text-white font-raleway">
                    {price} {CURRENCY_SYMBOL}
                </p>
            </div>
        </div>
    );
};

export default ProductCardWhite;
