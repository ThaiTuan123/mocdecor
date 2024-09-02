"use client";

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import images from "@/configs/images";

interface FloatingButtonConfig {
    onClick: () => void;
    imageSrc: string;
    altText: string;
}

const floatingButtonConfigs: FloatingButtonConfig[] = [
    {
        //TODO: change alert to link facebook
        onClick: () => alert('Call button clicked!'),
        imageSrc: "https://s3-alpha-sig.figma.com/img/7dc8/cea4/10701e72c48e850f42fe80478a160706?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Su~AemNL6F5w5LBVwuVbU0yPAYMZ9Y4C5Gw09yjrS7clZ4GBeFHpHBzzeRmBjWUIeEPdtcKzrXbKFXLtWn7I9MUSR3kieDHz6gousnEleT4-3mm74~9essEhT9fnI01rgn0qSRpdE4V4GiwmfQtdSPkRPI7k4Hw1YtSuC9eYe363D9OQmVoxkaIY-r3s6aBzeyMfhuTCUKeREg4am3xGvhhEqd9S~Qo3Mgx4gYJYw9wHJv2VvH811UxBlr~5zcC8XBCPdT2CFC02PUxC~LPJAaCKyGULZIqmrbZ0cOiB6YswYPLYGU6FmOJWVJSpu7lVK7KZe27VWhFB0MX92UB1yw__",
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
            className={`fixed right-4 bottom-4 flex flex-col gap-4 transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0'} z-50`}
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
