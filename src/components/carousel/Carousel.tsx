import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CarouselItem } from '@/components/carousel/types';
import { activeIndexState } from '@/recoil/atoms/activeIndexStateAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  carouselItemsState,
  isLoadingState,
  useFetchCarouselItems,
} from '@/recoil/hooks/useCarouselItems';
import images from '@/configs/images';
import CommonButton from '@/components/button/CustomButton';
import languages from '@/configs/languages';
import CarouselButton from '@/components/button/CarouselButton';

const Carousel = () => {
  const items = useRecoilValue(carouselItemsState);
  const fetchCarouselItems = useFetchCarouselItems();
  const isLoading = useRecoilValue(isLoadingState);

  const [activeIndex, setActiveIndex] = useRecoilState(activeIndexState);
  const [loaded, setLoaded] = useState<boolean[]>(
    Array(items.length).fill(false)
  );

  useEffect(() => {
    console.warn('Carousel component rendered');
    fetchCarouselItems; // Fetch dữ liệu khi component render lần đầu
  }, [fetchCarouselItems]);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % items.length;
        return loaded[nextIndex] ? nextIndex : prevIndex; // Chuyển slide nếu đã load xong
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [items, loaded, setActiveIndex]);

  const handlePrevious = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % items.length);
  };

  return (
    <div
      id="indicators-carousel"
      className={`3xl:mx-container relative w-full 3xl:mx-auto`}
      data-carousel="static"
    >
      <>
        <CarouselWrapper
          items={items}
          activeIndex={activeIndex}
          loaded={loaded}
          setLoaded={setLoaded}
          isLoading={isLoading}
        />
        <CarouselControls
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </>
    </div>
  );
};

const CarouselWrapper = ({
  items,
  activeIndex,
  loaded,
  setLoaded,
  isLoading,
}: {
  items: CarouselItem[];
  activeIndex: number;
  loaded: boolean[];
  setLoaded: React.Dispatch<React.SetStateAction<boolean[]>>;
  isLoading: boolean;
}) => {
  const fallbackImageUrl = images.bannerHomeError;

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden">
      {isLoading && (
        <Image
          src={fallbackImageUrl}
          alt="Loading"
          fill={true}
          className="absolute inset-0 block h-full w-full object-cover blur-md"
          priority
        />
      )}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transform transition-transform duration-700 ease-in-out ${
            index === activeIndex ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ transform: `translateX(${(index - activeIndex) * 100}%)` }}
          data-carousel-item={index === activeIndex ? 'active' : ''}
        >
          <Image
            fetchPriority={'high'}
            src={item.imageUrl}
            alt={item.title}
            fill={true}
            className={`block h-full w-full object-cover transition-opacity duration-500`}
            blurDataURL={fallbackImageUrl}
            loading="eager"
            onLoad={() => {
              const updatedLoaded = [...loaded];
              updatedLoaded[index] = true;
              setLoaded(updatedLoaded);
            }}
          />
        </div>
      ))}
    </div>
  );
};

const CarouselIndicators = ({
  items,
  activeIndex,
  setActiveIndex,
}: {
  items: CarouselItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}) => (
  <div className="absolute bottom-24 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
    <div className="flex flex-col space-y-10">
      <div id="indicatorsSlider" className="flex justify-center space-x-3">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-3 w-3 transition-transform duration-300 ease-in-out ${
              index === activeIndex
                ? 'scale-110 bg-brown-500 outline outline-white'
                : 'bg-brown-200 hover:scale-110'
            } `}
            aria-current={index === activeIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  </div>
);

const CarouselControls = ({
  handlePrevious,
  handleNext,
}: {
  handlePrevious: () => void;
  handleNext: () => void;
}) => (
  <>
    <CarouselButton type="prev" handleClick={handlePrevious} />
    <CarouselButton type="next" handleClick={handleNext} />
  </>
);

export default Carousel;
