import React from 'react';
import Image from 'next/image';
import TextContent from "@/components/texts/TextContent";

interface BackgroundSectionProps {
    title: string;
    subTitle: string;
    backgroundDesktop: string; // Path to the desktop image
    backgroundMobile: string;  // Path to the mobile image
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({
                                                                 title,
                                                                 subTitle,
                                                                 backgroundDesktop,
                                                                 backgroundMobile,
                                                             }) => (
    <section
        className="2xl:container 2xl:mx-auto relative h-252 md:h-327 lg:max-h-430 lg:h-430 flex items-center justify-start">
        {/* Background Image for Mobile */}
        <div className="absolute inset-0 md:hidden">
            <Image
                src={backgroundMobile}
                alt="Background"
                fill={true}
                className="object-fill"
                quality={75}
                priority // Ensure faster loading for above-the-fold content
            />
        </div>

        {/* Background Image for Desktop */}
        <div className="absolute inset-0 hidden md:block">
            <Image
                src={backgroundDesktop}
                alt="Background"
                fill={true}
                className="object-cover"
                quality={75}
                priority // Ensure faster loading for above-the-fold content
            />
        </div>

        {/* Content */}
        <div className="relative z-10 content-center w-4/5 md:w-3/5 lg:w-2/5 px-6 lg:pl-36">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary uppercase font-playfairBold">
                {title}
            </h1>
            <TextContent className="my-2" text={subTitle}/>
        </div>
    </section>
);

export default BackgroundSection;
