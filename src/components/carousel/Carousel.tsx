import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {CarouselItem} from "@/components/carousel/types";
import CommonButton from "@/components/button/CustomButton";
import CarouselButton from "@/components/button/CarouselButton";
import languages from "@/configs/languages";

const Carousel = () => {
    const [items, setItems] = useState<CarouselItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/json/Items.json');
                const data = await response.json();
                console.log('Fetched Data:', data);
                setItems(data.items.bootstrap);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchItems();
    }, []);

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
    const [loaded, setLoaded] = useState<boolean[]>(Array(items.length).fill(false));

    const handleImageLoad = (index: number) => {
        setLoaded(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
        });
    };

    return (
        <div className="relative h-584 overflow-hidden md:h-background-height">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${index === activeIndex ? 'translate-x-0' : 'translate-x-full'}`}
                    style={{transform: `translateX(${(index - activeIndex) * 100}%)`}}
                    data-carousel-item={index === activeIndex ? "active" : ""}
                >
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className={`block w-full h-full transition-all duration-500 ${loaded[index] ? 'blur-0' : 'blur-lg'}`}
                        onLoadingComplete={() => handleImageLoad(index)}
                    />
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
