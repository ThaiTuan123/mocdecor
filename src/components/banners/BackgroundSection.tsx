import React from 'react';
import TextContent from "@/components/texts/TextContent";

interface BackgroundSectionProps {
    title: string;
    subTitle: string;
    backgroundClass: string;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({title, subTitle, backgroundClass}) => (
    <section
        className={`bg-cover bg-no-repeat bg-center h-252 md:max-h-96 md:h-96 ${backgroundClass} flex items-center justify-start pl-6 md:pl-36`}>
        <div className='content-center w-3/5 md:w-2/5'>
            <h1 className="text-4xl md:text-6xl font-bold text-primary uppercase font-playfairBold ">{title}</h1>
            <TextContent text={subTitle}/>
        </div>
    </section>
);

export default BackgroundSection;
