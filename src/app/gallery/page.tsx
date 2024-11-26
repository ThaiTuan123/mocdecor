'use client';

import React from "react";
import images from "@/configs/images";
import languages from "@/configs/languages";
import Image from "next/image";
import NotFoundGallery from "@/app/gallery/@Notfound/Pages";
import FoundGallery from "@/app/gallery/@FoundGallery/Pages";
import {useGallery} from "@/recoil/hooks/useGallery";
import Empty from "@/app/gallery/@Empty/Pages";

export default function Page() {

    // Extract constants for reusable text values
    const heroIntroText = languages.get("gallery.hero.intro.text");
    const heroUploadText = languages.get("gallery.hero.upload.text");
    const heroTitle = languages.get("galley.hero.title");
    const heroButtonText = languages.get("galley.hero.button.text");
    const heroDescText = languages.get("galley.hero.desc");

    // Use the custom hook
    const {
        placeholder,
        inputValue,
        isInputEmpty,
        isFound,
        handleInputChange,
        handleButtonClick,
        handleKeyPress
    } = useGallery();

    const renderHero = () => {
        return (
            <div
                className="px-6 md:px-0 min-h-44 md:min-h-80 bg-image-hero-gallery bg-no-repeat bg-cover flex justify-center py-7 md:py-16 text-white">
                <div className="w-full md:w-2/3 flex flex-col items-center gap-2">
                    <div className="flex flex-row gap-1">
                        <span className="text-black-50">
                            {heroIntroText}
                        </span>
                        <span>/</span>
                        <span>{heroUploadText}</span>
                    </div>
                    <h1 className="uppercase font-playfairBold text-2xl md:text-6lg text-center">
                        {heroTitle}
                    </h1>
                    <div className="w-full order-2 lg:order-1 h-16 bg-white rounded flex items-center px-4 my-4">
                        <img src={images.icons.search} className="mr-2 size-5" alt="Search Icon"/>
                        <input
                            type="text"
                            placeholder={placeholder}
                            className="flex-1 outline-none h-full text-karaka"
                            value={inputValue}
                            onChange={handleInputChange} // Update input value
                            onKeyDown={handleKeyPress}  // Trigger search on Enter key
                        />
                        <button
                            className="size-12 lg:w-44 lg:h-12 bg-primary md:flex justify-center items-center rounded hover:scale-105"
                            onClick={handleButtonClick}>
                            <span className="hidden lg:block" aria-disabled="true">
                                {heroButtonText}
                            </span>
                            <Image width={20} height={20} src={images.icons.mobileSearch}
                                   className="block lg:hidden mx-auto"
                                   alt="Button Icon"/>
                        </button>
                    </div>
                    <span className="order-1 lg:order-2 font-raleway text-lg md:text-2lg text-center w-full md:w-1/2">
                        {heroDescText}
                    </span>
                </div>
            </div>
        );
    };

    const renderGallery = () => {
        if (isFound === null) {
            return <Empty/>;
        } else if (isFound) {
            return <FoundGallery/>;
        } else {
            return <NotFoundGallery/>;
        }
    };

    return (
        <div>
            {renderHero()}
            {renderGallery()}
        </div>
    );
}