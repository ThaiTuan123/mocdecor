import React from 'react';
import Image from 'next/image';
import {Product} from '@/types/product';
import {CURRENCY_SYMBOL} from "@/configs/constants/constants";

// Functional component for rendering a product card
const ProductCard: React.FC<Product> = ({title, price, rating, reviewCount, image}) => {
    // Helper function to render star icons
    const renderStars = () => (
        [...Array(5)].map((_, i) => (
            <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${i < rating ? 'text-rating' : 'text-gray-300'}`}
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
        <div className="p-4 transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer">
            <Image
                src={image}
                alt={title}
                width={368} // Adjust width based on your needs
                height={269} // Adjust height based on your needs
                className="w-full h-auto"
            />
            <div className="mt-4 text-start">
                <h2 className="text-xl font-raleway font-bold text-brown-900">{title}</h2>
                <div className="flex items-center justify-start mt-2">
                    <div className="flex items-start">
                        {renderStars()}
                    </div>
                    <span className="ml-2 text-sm text-gray-100 font-medium font-raleway">({reviewCount})</span>
                </div>
                <p className="mt-2 text-xl font-normal text-orange-600 font-raleway">
                    {price} {CURRENCY_SYMBOL}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
