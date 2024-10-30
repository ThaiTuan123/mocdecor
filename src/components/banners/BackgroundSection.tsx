import React from 'react';
import TextContent from "@/components/texts/TextContent";

interface BackgroundSectionProps {
    title: string;
    subTitle: string;
    backgroundClass: string;
    backgroundMobileClass: string;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({title, subTitle, backgroundClass,backgroundMobileClass}) => (
    <section
        className={`2xl:container 2xl:mx-auto bg-cover bg-no-repeat bg-center h-252 lg:max-h-430 lg:h-430 ${backgroundMobileClass} md:${backgroundClass} flex items-center justify-start px-6 lg:pl-36`}>
        <div className='content-center w-4/5 md:w-3/5 lg:w-2/5'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary uppercase font-playfairBold ">{title}</h1>
            <TextContent className='my-2' text={subTitle}/>
        </div>
    </section>
);

export default BackgroundSection;
