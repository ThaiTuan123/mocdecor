import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {CarouselItem} from "@/components/carousel/types";
import CommonButton from "@/components/button/CustomButton";
import CarouselButton from "@/components/button/CarouselButton";
import languages from "@/configs/languages";
import {activeIndexState} from "@/recoil/atoms/activeIndexStateAtom";
import {useRecoilState, useRecoilValue} from "recoil";
import {carouselItemsState} from "@/recoil/hooks/useCarouselItems";
import images from "@/configs/images";
import {errorUrlsState} from "@/recoil/atoms/errorUrlsStateAtom";
import {loadedState} from "@/recoil/atoms/loadedStateAtom";

const Carousel = () => {
    const items = useRecoilValue(carouselItemsState);
    const [activeIndex, setActiveIndex] = useRecoilState(activeIndexState);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [items.length]);

    const handlePrevious = () => {
        setActiveIndex((activeIndex - 1 + items.length) % items.length);
    };

    const handleNext = () => {
        setActiveIndex((activeIndex + 1) % items.length);
    };

    return (
        <div id="indicators-carousel" className="3xl:mx-auto 3xl:mx-container relative w-full" data-carousel="static">
            <CarouselWrapper items={items} activeIndex={activeIndex}/>
            <CarouselControls handlePrevious={handlePrevious} handleNext={handleNext}/>
            <CarouselIndicators items={items} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
        </div>
    );
};

const CarouselWrapper = ({items, activeIndex}: { items: CarouselItem[], activeIndex: number }) => {
    // const [loaded, setLoaded] = useState<boolean[]>(Array(items.length).fill(false));

    const fallbackImageUrl = images.bannerHomeError;
    /*TODO fix add API banner*/

    const mockCarouselItems: CarouselItem[] = [
        {
            id: '1',
            title: 'Slide 1',
            imageUrl: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop',
        },
        {
            id: '2',
            title: 'Slide 2',
            imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop',
        },
        {
            id: '3',
            title: 'Slide 3',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop',
        },
        {
            id: '4',
            title: 'Slide 4',
            imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop',
        },
    ];

    return (
        <div className="relative h-584 overflow-hidden md:h-background-height">
            {mockCarouselItems.map((item, index) => (
                <div
                    key={item.id}
                    className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${index === activeIndex ? 'translate-x-0' : 'translate-x-full'}`}
                    style={{transform: `translateX(${(index - activeIndex) * 100}%)`}}
                    data-carousel-item={index === activeIndex ? "active" : ""}
                >
                    {/*TODO banner image API*/}
                    {/*<Image*/}
                    {/*    src={item.imageUrl}*/}
                    {/*    alt={item.title}*/}
                    {/*    fill={true}*/}
                    {/*    className={`block object-cover w-full h-full transition-all duration-500}`}*/}
                    {/*    priority={index === activeIndex} // Load the active slide first*/}
                    {/*    loading={index === activeIndex ? 'eager' : 'lazy'} // Lazy load others*/}
                    {/*/>*/}
                </div>
            ))}
        </div>
    );
};

const CarouselIndicators = ({items, activeIndex, setActiveIndex}: {
    items: CarouselItem[],
    activeIndex: number,
    setActiveIndex: (index: number) => void
}) => (
    <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-24 left-1/2">
        <div className='flex flex-col space-y-10'>
            <CommonButton className='text-xl' text={languages.get('home.button.carousel')}/>
            <div id='indicatorsSlider' className='flex space-x-3 justify-center'>
                {items.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 transition-transform duration-300 ease-in-out ${index === activeIndex ? 'bg-brown-500 outline outline-white scale-110' : 'bg-brown-200 hover:scale-110'} `}
                        aria-current={index === activeIndex ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                        data-carousel-slide-to={index}
                        onClick={() => setActiveIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    </div>
);

const CarouselControls = ({handlePrevious, handleNext}: { handlePrevious: () => void, handleNext: () => void }) => (
    <>
        <CarouselButton type="prev" handleClick={handlePrevious}/>
        <CarouselButton type="next" handleClick={handleNext}/>
    </>
);
export default Carousel;
