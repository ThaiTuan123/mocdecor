"use client";

import React from "react";
import Carousel from "@/components/carousel/Carousel";
import Image from 'next/image';
import categories, {cardServiceData, clientData, customerData, socialLinks} from "@/app/home/constant";
import images from "@/configs/images";
import {motion} from 'framer-motion';
import BackgroundSection from "@/components/banners/BackgroundSection";
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
import languages from "@/configs/languages";
import TabFrame from "@/components/tab/TabFrame";
import TabPrint from "@/components/tab/TabPrint";
import Heading3 from "@/components/texts/Heading3";
import CategoryCard from "@/components/card/CategoryCard";
import VideoYoutube from "@/components/video/VideoYoutube";
import {useRecoilValue} from "recoil";
import {directionState, scrollIntervalState, speedState} from "@/recoil/atoms/feedbackScrollableAtom";
import {useFeedbackScrollerAnimation} from "@/recoil/hooks/useFeedbackScrollerAnim";
import MobileArrowButton from "@/components/button/MobileArrowButton";

const CategorySection = () => (
    <section id='category' className="py-0 pt-8 md:py-8 text-center md:container md:mx-auto">
        <h2 className="text-2lg md:text-4xl font-raleway font-normal mb-1 md:mb-8 text-brown-500 text-opacity-50">
            {languages.get('home.subTitle.category')}
        </h2>
        <h2 className="text-2xl md:text-7xl font-playfairBold font-bold md:mb-8 uppercase text-brown-500 text-opacity-70">
            {languages.get('home.title.category')}
        </h2>
        <div className="flex flex-col md:flex-row gap-0 md:gap-2 content-center items-center justify-center">
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
    <div className="text-left order-99 flex flex-col items-center md:items-start">
        <TitleText
            firstText={languages.get('home.title.firstText.about')}
            secondText={languages.get('home.title.secondText.about')}
            justifyCenter={false}  // Optional, defaults to true
        />
        <Heading2
            marginBottom='mb-6'
            text={languages.get('home.title.header2.about')}
            classNameText='text-center md:text-left'
        />
    </div>
);

const TextContentAbout = () => (
    <TextContent
        text={languages.get('home.title.textContent.about')}
        marginBottom={"mb-4"}
        className='order-2 md:order-none !mb-3 md:mb-4'
    />
);

const SocialLinksAbout = () => (
    <div className="order-3 md:order-none flex items-center mt-4">
        <h4 className=" text-sm md:text-1.25lg font-normal font-raleway text-caption mr-5">{languages.get('home.header4.socialLinks.about')}</h4>
        <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
                <IconSocialLink
                    key={index}
                    src={link.src}
                    alt={link.alt}
                    link={link.link}
                />
            ))}
        </div>
    </div>
);

const ImageContentAbout = () => (
    <motion.div
        className="order-1 lg:order-none mt-4 rounded-lg cursor-grab mb-3 md:mb-0"
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
            className="rounded-lg w-full"
        />
    </motion.div>
);

const AboutSection = () => (
    <section id="about"
             className="px-6 md:px-0 pt-0 pb-4 md:pb-8 md:py-8 text-center flex flex-col md:flex-row mb-4 2xl:container 2xl:mx-auto">
        {/*Image left*/}
        <div id="contentLeft" className="hidden lg:block w-full md:w-1/2 md:order-20 md:pl-20 2xl:pl-40">
            <Image
                src={images.homeAbout1}
                alt="Mộc Decor"
                width={1024}
                height={768}
                className="w-full max-w-lg mx-auto md:object-cover h-252 md:h-auto rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-z-4 cursor-grab"
            />
        </div>

        <div id="contentRight" className="w-full lg:w-1/2 flex flex-col items-start px-2 md:px-6">
            <HeaderSectionAbout/>
            <div id="contentLeft" className="block md:hidden w-full lg:w-1/2 lg:order-20 lg:pl-20 2xl:pl-40">
                <Image
                    src={images.homeAbout1}
                    alt="Mộc Decor"
                    width={1024}
                    height={768}
                    className="object-cover md:object-fill w-full max-w-lg mx-auto h-252 lg:h-auto rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-z-4 cursor-grab"
                />
            </div>
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
        backgroundMobileClass: "bg-image-home-background-print-mobile",
        tabComponent: <TabPrint/>
    },
    {
        title: languages.get('home.title.background.frame'),
        subTitle: languages.get('home.subTitle.background.frame'),
        backgroundClass: "bg-image-home-background-frame",
        backgroundMobileClass: "bg-image-home-background-frame-mobile",
        tabComponent: <TabFrame/>
    },
    {
        title: languages.get('home.title.background.album'),
        subTitle: languages.get('home.subTitle.background.album'),
        backgroundClass: "bg-image-home-background-album",
        backgroundMobileClass: "bg-image-home-background-album-mobile",
        tabComponent: <TabPrint/>
    }
];

const OtherProductsSection: React.FC = () => {
    const handleClick = () => {
        alert('Discover button clicked!');
    };

    return (
        <section className="bg-white pb-8 px-7 md:px-4">
            <div className="container mx-auto flex flex-col items-center">
                <div className="flex items-center mb-2">
                    <TitleText
                        firstText={languages.get('home.title.firstText.otherProducts')}
                        secondText={languages.get('home.title.secondText.otherProducts')}
                    />
                </div>
                <Heading2 text={languages.get('home.title.header2.otherProducts')}/>
                <div className="flex flex-col md:grid gap-4 md:gap-6 max-w-7xl w-full ">
                    <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:col-span-2">
                        {/* Sổ tay */}
                        <div
                            className="h-40 md:h-80 bg-image-notebook-home bg-cover text-white  gap-1 md:gap-0 px-4 md:px-10 py-8 rounded-lg relative flex flex-col justify-center items-start w-full md:w-7/12">
                            <Heading3 text={languages.get('home.title.header3.notebook')}/>
                            <DiscoverButton className="hidden md:block" onClick={handleClick}>
                                {languages.get('button.discover')}
                            </DiscoverButton>
                            <MobileArrowButton onClick={handleClick}/>
                        </div>

                        {/* Vòng Tay */}
                        <div
                            className="gap-1 md:0 bg-image-vong-tay-home-mobile md:bg-image-bracelet-home bg-cover text-white p-4 rounded-lg flex flex-col md:flex-row md:justify-between justify-center items-start md:items-end w-full md:w-5/12 ml-0 md:ml-4 h-40 md:h-80">
                            <h3 className="hidden md:block text-4xl font-bold uppercase font-playfairBold ">{languages.get('home.title.header3.bracelet')}</h3>
                            <RightArrowButton onClick={handleClick}/>
                            {/*Mobile custom*/}
                            <Heading3 classNameAll="md:hidden"
                                      text={languages.get('home.title.header3.bracelet.mobile')}/>
                            <MobileArrowButton onClick={handleClick}/>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row col-span-2 h-80 gap-4 md:gap-0">
                        {/* Lịch gỗ */}
                        <div
                            className="h-40 md:h-80 bg-image-lich-go-mobile md:bg-image-calendar-home bg-cover text-white px-4 md:px-10 py-4 rounded-lg relative flex flex-col justify-start md:justify-end w-full md:w-5/12">
                            <div
                                className="gap-1 md:gap-0 flex flex-col md:flex-row md:items-center md:justify-between w-full">
                                <h3 className="hidden md:block text-4xl font-bold uppercase font-playfairBold">{languages.get('home.title.header3.calendar')}</h3>
                                <RightArrowButton onClick={handleClick}/>
                                {/*Mobile custom*/}
                                <Heading3 classNameAll="md:hidden"
                                          text={languages.get('home.title.header3.calendar.mobile')}/>
                                <MobileArrowButton onClick={handleClick}/>
                            </div>
                        </div>
                        {/* Bút gỗ */}
                        <div
                            className="py-8 gap-1 md:gap-0 bg-image-wooden-pen-home bg-cover text-white p-4 rounded-lg flex flex-col justify-center items-start w-full md:w-7/12 ml-0 md:ml-4 h-40 md:h-80">
                            <Heading3 text={languages.get('home.title.header3.woodenPen')}/> <DiscoverButton
                            className="hidden md:block"
                            onClick={handleClick}>
                            {languages.get('button.discover')}
                        </DiscoverButton>
                            <MobileArrowButton onClick={handleClick}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StorySection: React.FC = () => {
    return (
        <section className='2xl:mx-auto 2xl:container h-896 lg:h-946'>
            <div className='relative'>
                <div className='bg-image-product-story h-218 md:h-80 relative z-10'>
                    <div className='w-full flex flex-col pt-16 px-7 md:px-0'>
                        <TitleText
                            firstText={languages.get('home.title.firstText.story')}
                            secondText={languages.get('home.title.secondText.story')}
                        />
                        <Heading2 className='mb-6 md:mb-8' text={languages.get('home.title.header2.story')}/>
                    </div>
                </div>

                <div
                    id='content'
                    className='absolute max-w-6xl mx-auto inset-0 z-20 mt-44 md:mt-52'
                >
                    <div className='flex md:h-[600] '>
                        <div
                            className=" hidden md:visible w-full md:w-3/5 bg-image-story-home-1 bg-cover md:flex items-end justify-between px-8 py-8 rounded">
                            <Heading3 size={'text-2xl'}
                                      text={languages.get('home.title.header3.itemStory1')}/>
                            {/*TODO add this button when have blogs*/}
                            {/*<SolidButton text={languages.get('button.readMore')} href="/your-target-page"/>*/}
                        </div>
                        <div className='w-full md:w-2/5 flex flex-col gap-4 px-6 md:px-0 md:pl-4'>
                            <MotionImageCard
                                src={images.homeStory1}
                                alt="Other Image 1"
                                text={languages.get('home.title.p.itemStory1')}
                                className={"visible md:hidden"}
                            />
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
            className={`2xl:mx-auto 2xl:container bg-image-gift-home-mobile md:bg-image-gift-home bg-cover bg-center h-648 md:max-h-96 md:h-96 flex mt-8 md:mt-0`}>
            <div className='w-full md:max-w-6xl mx-0 md:mx-20'>
                <div className='flex flex-col md:flex-row items-center pt-40 pb-8 md:pb-0 md:pt-0'>
                    <Image className='hidden md:block' src={images.logoMocHome} alt="Logo" width={290} height={290}/>
                    <Image className='block md:hidden' src={images.logoMocHomeMobile} alt="Logo mobile" width={187}
                           height={187}/>
                    <div className="h-24 w-1 bg-white mx-4 hidden md:block"></div>
                    <div id='title'>
                        <div className="flex-n1 font-raleway flex flex-col md:items-start items-center">
                            <h2 className="text-4xl font-extrabold text-white mb-4 font-raleway">{languages.get('home.title.header2.gift1')}</h2>
                            <h2 className="text-4xl font-extrabold text-white font-raleway">{languages.get('home.title.header2.gift2')}</h2>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row w-full justify-center md:justify-start px-0 md:px-8'>
                    <DiscoverButton className='items-center justify-center ' onClick={handleClick}>
                        {languages.get('button.discover')}
                    </DiscoverButton>
                </div>
            </div>
        </section>
    );
}


const FeedbackScrollableSection: React.FC = () => {
    return (
        <motion.div
            className='flex flex-row gap-6'
            animate={{ x: ["0%", "-100%"] }}
            transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
            }}
        >
            {customerData.concat(customerData).map((data, index) => (
                <CustomerCard
                    key={index}
                    imageCustomerUrl={data.imageCustomerUrl}
                    textDescription={data.textDescription}
                    nameCustomer={data.nameCustomer}
                />
            ))}
        </motion.div>
    );
};

const FeedbackSection: React.FC = () => {
    return (
        <section className='2xl:mx-auto 2xl:container pb-8 md:pb-20'>
            <div id='content' className='flex flex-col pt-8 md:pt-16 lg:pt-28'>
                <div className='flex flex-col items-center pb-0 px-6 md:pb-14'>
                    <TitleText
                        firstText={languages.get('home.title.firstText.feedback')}
                        secondText={languages.get('home.title.secondText.feedback')}
                    />
                    <Heading2 text={languages.get('home.title.header2.feedback')}/>
                </div>

                <div className='flex flex-col overflow-hidden'>
                    <FeedbackScrollableSection/>
                </div>
            </div>
        </section>
    );
}

const ServiceSection: React.FC = () => {
    return (
        /*bg-image-service-home*/
        <section className='bg-image-service-home bg-cover md:bg-fixed bg-no-repeat '>
            {/* Main content */}
            <div className='pt-8 md:pt-28 px-6 md:px-6 lg:px-36 pb-8 md:pb-0 flex flex-col 2xl:mx-auto 2xl:container'>
                <div className='gap-y-12 flex flex-col'>
                    {/* Content for Hiếu */}
                    <div className='flex flex-col lg:flex-row gap-6 lg:gap-16 justify-center items-center'>
                        <div className='flex-col flex justify-start items-start w-full lg:w-3/5'>
                            <TitleText
                                firstText={languages.get('home.title.firstText.service')}
                                secondText={languages.get('home.title.secondText.service')}
                                textColor='text-white'
                                bgColor='bg-white'
                                itemsCenter={true}
                            />
                            <Heading2
                                className='mt-3 !mb-0'
                                text={languages.get('home.title.header2.service')}
                                textColor={"text-white"}
                                align={"left"}
                            />
                            <TextContent
                                className='!mb-2 !mt-6 md:mt-8 md:mb-8'
                                textColor={'text-white'}
                                text={languages.get('home.title.textContentHieu.service')}
                            />
                            <h4 className='text-white font-semibold font-raleway'> {languages.get('home.title.header4Hieu.service')} </h4>
                        </div>
                        <div className='w-full lg:w-2/5 items-center justify-center flex'>
                            <div className="relative w-full ">
                                <VideoYoutube videoId="t-QhaFw-zy8" height="0px"/>
                            </div>
                        </div>
                    </div>
                    <Line height={"h-px"}/>
                    {/* Content for Phú */}
                    <div className='flex flex-col lg:flex-row gap-6 lg:gap-16 justify-center items-start'>
                        <div className='w-full lg:w-2/5 items-center justify-center flex order-2 lg:order-none'>
                            <div className="relative w-full">
                                <VideoYoutube videoId="tSmyaP5QfeM" height="0px"/>
                            </div>
                        </div>
                        <div className='flex-col flex justify-start items-start w-full order-1 md:order-2 lg:w-3/5'>
                            <Heading2
                                text={languages.get('home.title.header2Phu.service')}
                                textColor={"text-white"}
                                align={"left"}
                                className='!mb-3 md:mb-8'
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
            <div
                className='pb-16 pt-6 md:pb-0 flex-row md:flex-row justify-between md:h-64 h-584 opacity-80 2xl:mx-auto 2xl:container grid grid-cols-2 md:flex'>
                {cardServiceData.map((card, index) => (
                    <ServiceCard key={index} icon={card.icon} title={card.title} description={card.description}/>
                ))}
            </div>
        </section>
    );
}

// Main section containing both scrolling components
const CoopClientsSection: React.FC = () => {
    return (
        <section className="bg-gradient-to-b from-white to-just-right to-60% mt-0">
            <div id='content'
                 className='flex flex-col pt-16 pb-14 md:pt-32 md:pb-10 gap-y-6 md:gap-y-12 2xl:container 2xl:mx-auto'>
                <div className='flex flex-col items-center px-6 md:px-0'>
                    <TitleText
                        firstText={languages.get('home.title.firstText.coopClient')}
                        secondText={languages.get('home.title.secondText.coopClient')}
                    />
                    <Heading2 className='mb-0 md:mb-8' text={languages.get('home.title.header2.coopClient')}/>
                </div>

                <div className='gap-y-4 md:gap-y-8 flex flex-col'>
                    <div style={{overflow: "hidden", whiteSpace: "nowrap"}}>
                        <motion.div className='flex gap-6'
                                    animate={{x: ["0%", "-100%"]}}
                                    transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                        >
                            {[...clientData, ...clientData].map((client, index) => (
                                <Image className='h-16 w-32 gap-3 lg:h-32  lg:w-60 lg:gap-10' width={232.77}
                                       height={142.9} key={index} src={client.src} alt={client.alt}/>
                            ))}
                        </motion.div>

                        <motion.div className='flex gap-6 mt-4 lg:mt-7'
                                    animate={{x: ["-100%", "0%"]}}
                                    transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                        >
                            {[...clientData, ...clientData].map((client, index) => (
                                <Image className='h-16 w-32 gap-3 lg:h-32 lg:w-60 lg:gap-10' width={232.77}
                                       height={142.9} key={index} src={client.src} alt={client.alt}/>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

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
                    backgroundMobileClass={section.backgroundMobileClass}
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
