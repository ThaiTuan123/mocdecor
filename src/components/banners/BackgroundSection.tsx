import React from 'react';
import TextContent from "@/components/texts/TextContent";

interface BackgroundSectionProps {
    title: string;
    subTitle: string;
    backgroundClass: string;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({title, subTitle, backgroundClass}) => (
    <section
        className={`bg-cover bg-center max-h-96 h-96 ${backgroundClass} flex items-center justify-start pl-36`}>
        <div className='content-center'>
            <h1 className="text-6xl font-bold text-primary uppercase font-playfairBold ">{title}</h1>
            <TextContent text={subTitle}/>
        </div>
    </section>
);

export default BackgroundSection;
