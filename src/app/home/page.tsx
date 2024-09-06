"use client";

import React, {useEffect, useRef} from "react";
import Carousel from "@/components/carousel/Carousel";
import Image from 'next/image';
import categories, {cardServiceData, clientData, customerData, socialLinks} from "@/app/home/constant";
import images from "@/configs/images";
import {motion} from 'framer-motion';
import BackgroundSection from "@/components/banners/BackgroundSection";
import SolidButton from "@/components/button/SolidButton";
import IconSocialLink from "@/components/icons/IconSocialLink";
import RightArrowButton from "@/components/button/RightArrowButton";
import DiscoverButton from "@/components/button/DiscoverButton";
import ScrollAnimation from "@/components/animations/ScrollAnimation";
import TitleText from "@/components/texts/TitleText";
import MotionImageCard from "@/components/card/MotionImageCar";
import SeparatorAbout from "@/components/shape/SeparatorAbout";
import Heading2 from "@/components/texts/Heading2";
import CustomerCard from "@/components/card/CustomerCard";
import TextContent from "@/components/texts/TextContent";
import Line from "@/components/shape/Lines";
import ServiceCard from "@/components/card/ServiceCard";
import CoopClientCard from "@/components/card/CoopClientCard";
import languages from "@/configs/languages";
import {REPEAT_INTERVAL, SCROLL_AMOUNT} from "@/utils/constants";
import TabFrame from "@/components/tab/TabFrame";
import TabPrint from "@/components/tab/TabPrint";
import Heading3 from "@/components/texts/Heading3";
import {shuffleArray} from "@/utils/shuffle";
import CategoryCard from "@/components/card/CategoryCard";

const CategorySection = () => (
    <section id='category' className="py-8 text-center md:container md:mx-auto">
        <h2 className="text-2lg md:text-4xl font-raleway font-normal mb-1 md:mb-8 text-brown-500 text-opacity-50">
            {languages.get('home.subTitle.category')}
        </h2>
        <h2 className="text-2xl md:text-7xl font-playfairBold font-bold md:mb-8 uppercase text-brown-500 text-opacity-70">
            {languages.get('home.title.category')}
        </h2>
        <div className="flex flex-col md:flex-row justify-between">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                />
            ))}
        </div>
    </section>
);

const HeaderSectionAbout = () => (
    <div className="text-left order-99">
        <TitleText
            firstText={languages.get('home.title.firstText.about')}
            secondText={languages.get('home.title.secondText.about')}
            justifyCenter={false}  // Optional, defaults to true
        />
        <Heading2
            align='left'
            marginBottom='mb-6'
            text={languages.get('home.title.header2.about')}
        />
    </div>
);

const TextContentAbout = () => (
    <TextContent
        text={languages.get('home.title.textContent.about')}
        marginBottom={"mb-4"}
    />
);

const SocialLinksAbout = () => (
    <div className="flex items-center mt-4">
        <h4 className=" text-sm md:text-1.25lg font-normal font-raleway text-caption mr-5">{languages.get('home.header4.socialLinks.about')}</h4>
        <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
                <IconSocialLink key={index} src={link.src} alt={link.alt}/>
            ))}
        </div>
    </div>
);

const ImageContentAbout = () => (
    <motion.div
        className="mt-4 rounded-lg cursor-grab"
        whileHover={{
            scale: 1.05,
        }}
        transition={{type: 'spring', stiffness: 300, damping: 20}}
    >
        <Image
            src={images.homeAbout2}
            alt="Mộc Decor"
            width={564}
            height={312}
            className="rounded-lg"
        />
    </motion.div>
);

const AboutSection = () => (
    <section id="about" className=" px-6 md:px-0 py-8 text-center md:container md:mx-auto flex flex-col md:flex-row mb-4">
        {/*Image left*/}
        <div id="contentLeft" className="md:w-1/2 md:order-20">
            <Image
                src={images.homeAbout1}
                alt="Mộc Decor"
                width={1024}
                height={768}
                className="w-full max-w-lg mx-auto object-cover h-252 md:h-auto rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-z-4 cursor-grab"
            />
        </div>

        <div id="contentRight" className="md:w-1/2 flex flex-col items-start">
            <HeaderSectionAbout/>
            <TextContentAbout/>
            <SeparatorAbout/>
            <SocialLinksAbout/>
            <ImageContentAbout/>
        </div>
    </section>
);

const sectionsData = [
    {
        title: languages.get('home.title.background.print'),
        subTitle: languages.get('home.subTitle.background.print'),
        backgroundClass: "bg-image-home-background-print",
        tabComponent: <TabPrint/>
    },
    {
        title: languages.get('home.title.background.frame'),
        subTitle: languages.get('home.subTitle.background.frame'),
        backgroundClass: "bg-image-home-background-frame",
        tabComponent: <TabFrame/>
    },
    {
        title: languages.get('home.title.background.album'),
        subTitle: languages.get('home.subTitle.background.album'),
        backgroundClass: "bg-image-home-background-album",
        tabComponent: <TabPrint/>
    }
];

const OtherProductsSection: React.FC = () => {
    const handleClick = () => {
        alert('Discover button clicked!');
    };

    return (
        <section className="bg-white pb-8 px-4">
            <div className="container mx-auto flex flex-col items-center">
                <div className="flex items-center mb-2">
                    <TitleText
                        firstText={languages.get('home.title.firstText.otherProducts')}
                        secondText={languages.get('home.title.secondText.otherProducts')}
                    />
                </div>
                <Heading2 text={languages.get('home.title.header2.otherProducts')}/>
                <div className="grid gap-6 max-w-7xl w-full ">
                    <div className="flex col-span-2 h-80">
                        {/* Sổ tay */}
                        <div
                            className="bg-image-notebook-home bg-cover text-white px-10 py-8 rounded-lg relative flex flex-col justify-center items-start w-7/12">
                            <Heading3 text={languages.get('home.title.header3.notebook')}/>
                            <DiscoverButton onClick={handleClick}>
                                {languages.get('button.discover')}
                            </DiscoverButton>
                        </div>

                        {/* Vòng Tay */}
                        <div
                            className="bg-image-bracelet-home bg-cover text-white p-4 rounded-lg flex justify-between items-end w-5/12 ml-4 h-80">
                            <h3 className="text-4xl font-bold uppercase font-playfairBold ">{languages.get('home.title.header3.bracelet')}</h3>
                            <RightArrowButton onClick={handleClick}/>
                        </div>
                    </div>
                    <div className="flex col-span-2 h-80">
                        {/* Lịch gỗ */}
                        <div
                            className="bg-image-calendar-home bg-cover text-white px-10 py-8 rounded-lg relative flex flex-col justify-end w-5/12">
                            <div className="flex items-center justify-between w-full">
                                <h3 className="text-4xl font-bold uppercase font-playfairBold">{languages.get('home.title.header3.calendar')}</h3>
                                <RightArrowButton onClick={handleClick}/>
                            </div>
                        </div>
                        {/* Vòng Tay */}
                        <div
                            className="bg-image-wooden-pen-home bg-cover text-white p-4 rounded-lg flex flex-col justify-center items-start w-7/12 ml-4 h-80">
                            <Heading3 text={languages.get('home.title.header3.woodenPen')}/> <DiscoverButton
                            onClick={handleClick}>
                            {languages.get('button.discover')}
                        </DiscoverButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StorySection: React.FC = () => {
    return (
        <section className='h-946'>
            <div className='relative'>
                <div className='bg-image-product-story md:h-80 relative z-10'>
                    <div className='w-full flex flex-col pt-16'>
                        <TitleText
                            firstText={languages.get('home.title.firstText.story')}
                            secondText={languages.get('home.title.secondText.story')}
                        />
                        <Heading2 text={languages.get('home.title.header2.story')}/>
                    </div>
                </div>

                <div
                    id='content'
                    className='absolute max-w-6xl mx-auto inset-0 z-20 mt-52'
                >
                    <div className='flex h-[600] '>
                        <div
                            className="w-3/5 bg-image-story-home-1 bg-cover flex items-end justify-between px-8 py-8 rounded">
                            <Heading3 size={'text-2xl'}
                                      text={languages.get('home.title.header3.itemStory1')}/>
                            <SolidButton text={languages.get('button.readMore')} href="/your-target-page"/>
                        </div>
                        <div className='w-2/5 flex flex-col gap-4 pl-4'>
                            <MotionImageCard
                                src={images.homeStory2}
                                alt="Other Image 2"
                                text={languages.get('home.title.p.itemStory2')}
                            />
                            <MotionImageCard
                                src={images.homeStory3}
                                alt="Other Image 3"
                                text={languages.get('home.title.p.itemStory3')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const GiftSection: React.FC = () => {
    const handleClick = () => {
        alert('Discover button clicked!');
    };
    return (
        <section
            className={`bg-image-gift-home bg-cover bg-center max-h-96 h-96 flex`}>
            <div className='max-w-6xl ml-20'>
                <div className='flex flex-row items-center'>
                    <Image src={images.logoMocHome} alt="Logo" width={290} height={290}/>
                    <div className="h-24 w-1 bg-white mx-4"></div>
                    <div id='title'>
                        <div className="flex-n1 flex flex-col items-start">
                            <h2 className="text-4xl font-extrabold text-white mb-4 font-raleway">{languages.get('home.title.header2.gift1')}</h2>
                            <h2 className="text-4xl font-extrabold text-white font-raleway">{languages.get('home.title.header2.gift2')}</h2>
                        </div>
                    </div>
                </div>
                <DiscoverButton className='ml-8' onClick={handleClick}>
                    {languages.get('button.discover')}
                </DiscoverButton>
            </div>
        </section>
    );
}

const FeedbackScrollableSection: React.FC<{ scrollInterval: number }> = ({scrollInterval = REPEAT_INTERVAL}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const maxScrollLeft = container.scrollWidth - container.clientWidth;

                container.scrollBy({
                    left: container.scrollLeft + 300 > maxScrollLeft ? -maxScrollLeft : 300,
                    behavior: 'smooth',
                });
            }
        }, scrollInterval);

        return () => clearInterval(intervalId);
    }, [scrollInterval]);

    return (
        <div className="overflow-x-auto scroll-smooth pb-10" ref={scrollRef}>
            <div className="inline-flex space-x-4">
                {customerData.concat(customerData).map((data, index) => (
                    <CustomerCard
                        key={index}
                        imageCustomerUrl={data.imageCustomerUrl}
                        textDescription={data.textDescription}
                        nameCustomer={data.nameCustomer}
                    />
                ))}
            </div>
        </div>
    );
};

const FeedbackSection: React.FC = () => {
    return (
        <section className='pb-20'>
            <div id='content' className='flex flex-col pt-28'>
                <div className='flex flex-col items-center pb-16'>
                    <TitleText
                        firstText={languages.get('home.title.firstText.feedback')}
                        secondText={languages.get('home.title.secondText.feedback')}
                    />
                    <Heading2 text={languages.get('home.title.header2.feedback')}/>
                </div>

                <div className='flex flex-col'>
                    <FeedbackScrollableSection scrollInterval={3000}/>
                </div>
            </div>
        </section>
    );
}

const ServiceSection: React.FC = () => {
    return (
        <section className='bg-image-service-home bg-cover h-full bg-no-repeat max-w-full'>
            {/* Main content */}
            <div className='pt-28 px-36 pb-20 flex flex-col'>
                <div className='gap-y-12 flex flex-col'>
                    {/* Content for Hiếu */}
                    <div className='flex flex-row gap-16 justify-center items-center'>
                        <div className='flex-col flex justify-start items-start w-3/5'>
                            <TitleText
                                firstText={languages.get('home.title.firstText.service')}
                                secondText={languages.get('home.title.secondText.service')}
                                textColor='text-white'
                                bgColor='bg-white'
                            />
                            <Heading2
                                className='mt-8'
                                text={languages.get('home.title.header2.service')}
                                textColor={"text-white"}
                                align={"left"}
                            />
                            <TextContent
                                textColor={'text-white'}
                                text={languages.get('home.title.textContentHieu.service')}
                            />
                            <h4 className='text-white font-semibold font-raleway'> {languages.get('home.title.header4Hieu.service')} </h4>
                        </div>
                        <div className='w-2/5 items-center justify-center flex'>
                            <Image
                                src={images.hieuServiceHome}
                                alt='HIẾU NGUYỄN - Mộc Founder'
                                width={463}
                                height={833}
                                className="transform transition-transform duration-1000 ease-in-out hover:scale-110 overflow-hidden"
                            />
                        </div>
                    </div>
                    <Line height={"h-px"}/>
                    {/* Content for Phú */}
                    <div className='flex flex-row gap-16 justify-center items-start'>
                        <div className='w-2/5 items-center justify-center flex'>
                            <Image
                                src={images.phuServiceHome}
                                alt='PHƯỚC PHÚ - Mộc Founder'
                                width={463}
                                height={833}
                                className="transform transition-transform duration-1000 ease-in-out hover:scale-110 overflow-hidden"
                            />
                        </div>
                        <div className='flex-col flex justify-start items-start w-3/5'>
                            <Heading2
                                text={languages.get('home.title.header2Phu.service')}
                                textColor={"text-white"}
                                align={"left"}
                            />
                            <TextContent
                                textColor={'text-white'}
                                text={languages.get('home.title.textContentPhu.service')}
                            />
                            <h4 className='text-white font-semibold font-raleway'> {languages.get('home.title.header4Phu.service')} </h4>
                        </div>
                    </div>
                </div>
            </div>
            {/* Services offered */}
            <div className='flex flex-row justify-between h-60 opacity-80'>
                {cardServiceData.map((card, index) => (
                    <ServiceCard key={index} icon={card.icon} title={card.title} description={card.description}/>
                ))}
            </div>
        </section>
    );
}

const ScrollableSection: React.FC<{ scrollInterval: number }> = ({scrollInterval = REPEAT_INTERVAL}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const shuffledClientData = shuffleArray([...clientData]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const maxScrollLeft = container.scrollWidth - container.clientWidth;

                container.scrollBy({
                    left: container.scrollLeft + SCROLL_AMOUNT > maxScrollLeft ? -maxScrollLeft : SCROLL_AMOUNT,
                    behavior: 'smooth',
                });
            }
        }, scrollInterval); // Dynamic interval based on prop

        return () => clearInterval(intervalId);
    }, [scrollInterval]);

    return (
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth pb-10" ref={scrollRef}>
            <div className="inline-flex space-x-4">
                {shuffledClientData.map((client, index) => (
                    <CoopClientCard
                        key={index}
                        src={client.src}
                        alt={client.alt}
                    />
                ))}
            </div>
        </div>
    );
};

const CoopClientsSection: React.FC = () => {
    return (
        <section className="bg-gradient-to-b from-white to-just-right to-60% ">
            <div id='content' className='flex flex-col py-28 gap-y-12'>
                <div className='flex flex-col items-center'>
                    <TitleText
                        firstText={languages.get('home.title.firstText.coopClient')}
                        secondText={languages.get('home.title.secondText.coopClient')}
                    />
                    <Heading2 text={languages.get('home.title.header2.coopClient')}/>
                </div>

                <div className='gap-y-8 flex flex-col'>
                    {/* Slider to first */}
                    <ScrollableSection scrollInterval={5000}/>

                    {/* Slider to second */}
                    <ScrollableSection scrollInterval={3000}/>
                </div>
            </div>
        </section>
    );
}

const HomePage = () => (
    <>
        <Carousel/>
        <ScrollAnimation>
            <CategorySection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <AboutSection/>
        </ScrollAnimation>

        {sectionsData.map((section, index) => (
            <ScrollAnimation key={index}>
                <BackgroundSection
                    title={section.title}
                    subTitle={section.subTitle}
                    backgroundClass={section.backgroundClass}
                />
                {section.tabComponent}
            </ScrollAnimation>
        ))}

        <ScrollAnimation>
            <OtherProductsSection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <StorySection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <GiftSection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <FeedbackSection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <ServiceSection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <CoopClientsSection/>
        </ScrollAnimation>
    </>
);

export default HomePage;
