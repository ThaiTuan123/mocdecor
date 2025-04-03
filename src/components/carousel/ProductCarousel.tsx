import React, { useRef } from 'react';
import Image from 'next/image';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

interface ProductCarouselProps {
  images?: string[];
  onImageSelect: (image: string) => void;
  onImageHover: (image: string) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  images = [],
  onImageSelect,
  onImageHover,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null); // Ref to the scrollable container
  const defaultImages = [
    'https://picsum.photos/300/300?random=30',
    'https://picsum.photos/300/300?random=31',
    'https://picsum.photos/300/300?random=32',
    'https://picsum.photos/300/300?random=33',
    'https://picsum.photos/300/300?random=34',
    'https://picsum.photos/300/300?random=34',
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  // Scroll left
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Hiển thị nút scroll chỉ khi có hơn 4 ảnh */}
      {displayImages.length > 4 && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-alto bg-opacity-40 px-0.5 py-2 hover:bg-opacity-100"
          onClick={scrollLeft}
        >
          <MdOutlineNavigateBefore size={24} color="#3A2A11" />
        </button>
      )}

      <div className="flex overflow-x-scroll no-scrollbar whitespace-nowrap" ref={carouselRef}>
        {/* Display images with horizontal scroll */}
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="mx-0.5 flex-shrink-0 cursor-pointer rounded-lg p-0.5 hover:bg-primary"
            onClick={() => onImageSelect(image)}
            onMouseEnter={() => onImageHover(image)}
          >
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              width={100}
              height={100}
              className="h-24 w-24 rounded object-cover"
            />
          </div>
        ))}
      </div>

      {displayImages.length > 4 && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-alto bg-opacity-40 px-0.5 py-2 hover:bg-opacity-100"
          onClick={scrollRight}
        >
          <MdOutlineNavigateNext size={24} color="#3A2A11" />
        </button>
      )}
    </div>
  );
};

export default ProductCarousel;
