//ProductCarousel.tsx

import React, {useRef} from "react";
import Image from "next/image";
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from "react-icons/md";

interface ProductCarouselProps {
    images?: string[];
    onImageSelect: (image: string) => void;
    onImageHover: (image: string) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({images = [], onImageSelect, onImageHover}) => {
    const carouselRef = useRef<HTMLDivElement>(null); // Ref to the scrollable container

    const defaultImages = [
        "https://picsum.photos/300/300?random=30",
        "https://picsum.photos/300/300?random=31",
        "https://picsum.photos/300/300?random=32",
        "https://picsum.photos/300/300?random=33",
        "https://picsum.photos/300/300?random=34",
        "https://picsum.photos/300/300?random=34",
    ];

    const displayImages = images.length > 0 ? images : defaultImages;

    // Scroll left
    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({left: -200, behavior: 'smooth'});
        }
    };

    // Scroll right
    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({left: 200, behavior: 'smooth'});
        }
    };

    return (
        <div className="relative">
            {/* Scroll buttons */}
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 p-2"
                onClick={scrollLeft}
            >
                <MdOutlineNavigateBefore size={24} color="white"/>
            </button>

            <div className="flex overflow-hidden whitespace-nowrap" ref={carouselRef}>
                {/* Display images with horizontal scroll */}
                {displayImages.map((image, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-1/4 md:w-1/6 lg:w-1/4 p-1 cursor-pointer"
                        onClick={() => onImageSelect(image)}
                        onMouseEnter={() => onImageHover(image)}
                    >
                        <Image
                            src={image}
                            alt={`Product image ${index + 1}`}
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover"
                        />
                    </div>
                ))}
            </div>

            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 -opacity-50 p-2"
                onClick={scrollRight}
            >
                <MdOutlineNavigateNext size={24} color="white"/>
            </button>
        </div>
    );
};

export default ProductCarousel;
