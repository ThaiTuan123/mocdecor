import React from 'react';
import Image from 'next/image';
import images from "@/configs/images";
import languages from "@/configs/languages";
import {useRecoilState} from "recoil";
import {isImageLoadedState} from "@/recoil/atoms/imageLoadAtom";

interface CardCustomerProps {
    imageCustomerUrl: string;
    textDescription?: string;
    nameCustomer?: string;
}

const CustomerCard: React.FC<CardCustomerProps> = ({imageCustomerUrl, textDescription, nameCustomer}) => {
    const [isImageLoaded, setIsImageLoaded] = useRecoilState(isImageLoadedState);

    return (
        <div>
            <div className="relative w-327 md:w-412 h-327">
                {/* Optimized background image */}
                <div
                    className={`relative w-full h-full ${!isImageLoaded ? 'animate-pulse bg-gray-200' : ''}`}
                >
                    <Image
                        src={imageCustomerUrl}
                        alt="Customer Background"
                        fill={true}
                        className={`object-cover transition-opacity duration-500 ${
                            isImageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        quality={75} // Adjust image quality
                        loading="lazy" // Enable lazy loading
                        onLoad={() => setIsImageLoaded(true)} // Set image loaded state
                        onError={() => setIsImageLoaded(true)} // Fallback in case of errors
                    />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end items-start h-full px-6 pb-7">
                    <div>
                        <Image
                            src={images.icons.homeQuoteCustomer}
                            alt="quote"
                            width={51.88}
                            height={46.69}
                            className="opacity-20"
                        />
                    </div>
                    <div className="text-white text-start font-raleway font-medium pt-5">
                        <p className="text-sm md:text-lg break-words">{textDescription}</p>
                    </div>
                </div>
            </div>
            <div className="pt-4 md:pt-6">
                <p className="text-lg md:text-xl font-raleway font-semibold uppercase">{nameCustomer}</p>
                <p className="text-sm md:text-lg text-gray-100 font-raleway mt-2">
                    {languages.get('home.title.p.roleCustomer')}
                </p>
            </div>
        </div>
    );
};

export default CustomerCard;
