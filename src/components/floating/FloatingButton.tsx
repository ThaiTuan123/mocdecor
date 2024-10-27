"use client";

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import images from "@/configs/images";
import imagesIcons from "@/configs/images";

interface FloatingButtonConfig {
    onClick: () => void;
    imageSrc: string;
    altText: string;
}

const floatingButtonConfigs: FloatingButtonConfig[] = [
    {
        //TODO: change alert to link facebook
        onClick: () => alert('Call button clicked!'),
        imageSrc: imagesIcons.svg.icMessage,
        altText: "Call"
    },
    {
        onClick: () => window.scrollTo({top: 0, behavior: 'smooth'}),
        imageSrc: images.icons.ic_toTop,
        altText: "Back to Top"
    },
];

const FloatingButtons: React.FC = () => {
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButtons(window.scrollY > 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`overflow-hidden fixed right-4 bottom-4 flex flex-col gap-4 transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0'} z-50`}
        >
            {floatingButtonConfigs.map((buttonConfig, index) => (
                <FloatingButton
                    key={index}
                    onClick={buttonConfig.onClick}
                    imageSrc={buttonConfig.imageSrc}
                    altText={buttonConfig.altText}
                />
            ))}
        </div>
    );
};

interface FloatingButtonProps {
    onClick: () => void;
    imageSrc: string;
    altText: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({onClick, imageSrc, altText}) => (
    <button
        onClick={onClick}
        className="p-3 bg-caption rounded-full shadow-lg text-white hover:bg-captionHover focus:outline-none"
        aria-label={altText}
    >
        <Image
            src={imageSrc}
            alt={altText}
            width={30}
            height={30}
        />
    </button>
);

export default FloatingButtons;
