'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  cardServiceData,
  clientData,
  customerData,
  socialLinks,
} from '@/app/home/constant';
import images from '@/configs/images';
import { motion } from 'framer-motion';
import BackgroundSection from '@/components/banners/BackgroundSection';
import IconSocialLink from '@/components/icons/IconSocialLink';
import RightArrowButton from '@/components/button/RightArrowButton';
import DiscoverButton from '@/components/button/DiscoverButton';
import ScrollAnimation from '@/components/animations/ScrollAnimation';
import TitleText from '@/components/texts/TitleText';
import MotionImageCard from '@/components/card/MotionImageCar';
import SeparatorAbout from '@/components/shape/SeparatorAbout';
import Heading2 from '@/components/texts/Heading2';
import CustomerCard from '@/components/card/CustomerCard';
import TextContent from '@/components/texts/TextContent';
import Line from '@/components/shape/Lines';
import ServiceCard from '@/components/card/ServiceCard';
import languages from '@/configs/languages';
import Heading3 from '@/components/texts/Heading3';
import MobileArrowButton from '@/components/button/MobileArrowButton';
import CategoryCard from '@/components/card/CategoryCard';
import Carousel from '@/components/carousel/Carousel';
import useMenu from '@/recoil/hooks/useMenu';
import useTopPosProductCategory from '@/recoil/hooks/useTopProductCategories';
import { useRecoilState } from 'recoil';
import { isImageLoadedState } from '@/recoil/atoms/imageLoadAtom';
import CategoryProductTab from '@/components/tab/CategoryTab';
import { renderScrollSection } from '@/utils/helpers/renderScrollSection';
import { fetchProducts } from '@/services/fetchProducts';
import { Product } from '@/types/product';
import ProductSection from './component/ProductSection';

const CategorySection = () => {
  const { menu } = useMenu();

  return (
    <section
      id="category"
      className="py-0 pt-8 text-center md:container md:mx-auto md:py-8"
    >
      <p className="mb-1 text-2lg font-normal text-brown-500 md:mb-8 md:text-4lg">
        {languages.get('home.subTitle.category')}
      </p>
      <h2 className="font-playfairBold text-2xl font-bold uppercase text-brown-500 text-opacity-70 md:mb-8 md:text-7xl">
        {languages.get('home.title.category')}
      </h2>
      <div className="flex flex-col content-center items-center justify-center gap-0 md:flex-row md:gap-2 lg:justify-between xl:justify-center">
        {menu?.types?.length > 0 &&
          menu?.types?.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
      </div>
    </section>
  );
};

const HeaderSectionAbout = () => (
  <div className="order-99 flex w-full flex-col items-center text-left lg:w-fit lg:items-start">
    <TitleText
      firstText={languages.get('home.title.firstText.about')}
      secondText={languages.get('home.title.secondText.about')}
      justifyCenter={false} // Optional, defaults to true
    />
    <Heading2
      text={languages.get('home.title.header2.about')}
      classNameText="text-center lg:text-left mb-0 lg:mb-6"
    />
  </div>
);

const TextContentAbout = () => (
  <TextContent
    text={languages.get('home.title.textContent.about')}
    marginBottom={'mb-4'}
    className="order-2 !mb-3 md:my-4 lg:order-none 2xl:w-[600px]"
  />
);

const SocialLinksAbout = () => (
  <div className="order-3 mt-0 flex items-center md:mt-4 lg:order-none">
    <p className="font-raleway mr-5 text-smLh font-normal text-caption md:text-1.25lg">
      {languages.get('home.header4.socialLinks.about')}
    </p>
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
  <div className="order-1 mb-3 mt-4 w-full cursor-grab rounded-lg md:mb-0 lg:order-none">
    <Image
      src={images.homeAbout2}
      alt="Mộc Decor"
      width={564}
      height={312}
      className="w-full rounded-lg lg:w-auto"
    />

    <Image
      src={images.homeAbout3}
      alt="Mộc Decor"
      width={564}
      height={312}
      className="mt-4 w-full rounded-lg md:mt-8 lg:hidden"
    />
  </div>
);

const AboutSection = () => (
  <section
    id="about"
    className="mb-4 flex flex-col px-6 pt-0 text-center 2xl:container md:flex-row md:py-8 md:pb-8 lg:px-0 2xl:mx-auto"
  >
    {/*Image left*/}
    <div
      id="contentLeft"
      className="md:order-20 hidden w-full pr-8 md:w-1/2 lg:block lg:max-h-[630px] lg:pl-20 xl:max-h-[630px] xl:pr-0 2xl:pl-32 3xl:pl-96"
    >
      <Image
        src={images.homeAbout1}
        alt="Mộc Decor"
        width={524}
        height={630}
        className="mx-auto h-252 rounded-lg px-8 md:object-fill lg:h-[630px] 3xl:px-10 3xl:pl-6"
      />
    </div>

    <div
      id="contentRight"
      className="flex w-full flex-col items-start lg:max-h-[630px] lg:w-1/2 lg:pr-20 xl:max-h-[630px]"
    >
      <HeaderSectionAbout />
      <div
        id="contentLeft"
        className="lg:order-20 block lg:hidden lg:w-1/2 lg:pl-20 2xl:pl-40"
      >
        <Image
          src={images.homeAbout1}
          alt="Mộc Decor"
          width={1024}
          height={768}
          className="mx-auto hidden h-252 w-full max-w-lg rounded-lg object-cover lg:flex lg:h-auto lg:object-fill"
        />
      </div>
      <TextContentAbout />
      <SeparatorAbout />
      <SocialLinksAbout />
      <ImageContentAbout />
    </div>
  </section>
);

const OtherProductsSection: React.FC = () => {
  const handleClick = () => {
    alert('Discover button clicked!');
  };

  return (
    <section className="bg-white px-7 pb-8 md:px-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-2 flex items-center">
          <TitleText
            firstText={languages.get('home.title.firstText.otherProducts')}
            secondText={languages.get('home.title.secondText.otherProducts')}
          />
        </div>
        <Heading2
          className="mb-6"
          text={languages.get('home.title.header2.otherProducts')}
        />
        <div className="flex w-full max-w-7xl flex-col gap-4 md:grid md:gap-6">
          <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:gap-0">
            {/* Sổ tay */}
            <div className="relative flex h-40 w-full flex-col items-start justify-center gap-1 rounded-lg bg-image-notebook-home bg-cover px-4 py-8 text-white md:h-80 md:w-7/12 md:gap-0 md:px-10">
              <Heading3 text={languages.get('home.title.header3.notebook')} />
              <DiscoverButton className="hidden md:block" onClick={handleClick}>
                {languages.get('button.discover')}
              </DiscoverButton>
              <MobileArrowButton onClick={handleClick} />
            </div>

            {/* Vòng Tay */}
            <div className="md:0 ml-0 flex h-40 w-full flex-col items-start justify-center gap-1 rounded-lg bg-image-vong-tay-home-mobile bg-cover p-4 text-white md:ml-4 md:h-80 md:w-5/12 md:flex-row md:items-end md:justify-between md:bg-image-bracelet-home">
              <h3 className="font-playfairBold hidden text-4xl font-bold uppercase md:block">
                {languages.get('home.title.header3.bracelet')}
              </h3>
              <RightArrowButton onClick={handleClick} />
              {/*Mobile custom*/}
              <Heading3
                classNameAll="md:hidden"
                text={languages.get('home.title.header3.bracelet.mobile')}
              />
              <MobileArrowButton onClick={handleClick} />
            </div>
          </div>
          <div className="col-span-2 flex h-80 flex-col gap-4 md:flex-row md:gap-0">
            {/* Lịch gỗ */}
            <div className="relative flex h-40 w-full flex-col justify-start rounded-lg bg-image-lich-go-mobile bg-cover px-4 py-4 text-white md:h-80 md:w-5/12 md:justify-end md:bg-image-calendar-home md:px-10">
              <div className="flex w-full flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-0">
                <h3 className="font-playfairBold hidden text-4xl font-bold uppercase md:block">
                  {languages.get('home.title.header3.calendar')}
                </h3>
                <RightArrowButton onClick={handleClick} />
                {/*Mobile custom*/}
                <Heading3
                  classNameAll="md:hidden"
                  text={languages.get('home.title.header3.calendar.mobile')}
                />
                <MobileArrowButton onClick={handleClick} />
              </div>
            </div>
            {/* Bút gỗ */}
            <div className="ml-0 flex h-40 w-full flex-col items-start justify-center gap-1 rounded-lg bg-image-wooden-pen-home bg-cover p-4 py-8 text-white md:ml-4 md:h-80 md:w-7/12 md:gap-0">
              <Heading3 text={languages.get('home.title.header3.woodenPen')} />{' '}
              <DiscoverButton className="hidden md:block" onClick={handleClick}>
                {languages.get('button.discover')}
              </DiscoverButton>
              <MobileArrowButton onClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StorySection: React.FC = () => {
  return (
    <section className="h-896 2xl:container lg:h-946 2xl:mx-auto">
      <div className="relative">
        {/* Background image section */}
        <div className="relative h-218 md:h-80">
          <Image
            src={images.imageProductStory} // Replace with your actual image path
            alt="Product Story Background"
            fill={true}
            quality={75} // Optimize image quality
            className={'object-cover'}
            priority={true}
          />
          <div className="absolute inset-0 z-10"></div>
          {/* Optional overlay */}
          <div className="relative z-20 flex w-full flex-col px-7 pt-16 md:px-0">
            <TitleText
              firstText={languages.get('home.title.firstText.story')}
              secondText={languages.get('home.title.secondText.story')}
            />
            <Heading2
              className="mb-6 md:mb-8"
              text={languages.get('home.title.header2.story')}
            />
          </div>
        </div>

        {/* Content section */}
        <div
          id="content"
          className="absolute inset-0 z-30 mx-auto mt-44 md:mt-52 lg:max-w-7xl"
        >
          <div className="flex w-full md:h-[600]">
            {/* Left side background image */}
            <div className="relative hidden w-full items-end justify-between rounded px-8 py-8 md:flex md:w-3/5">
              <Image
                src={images.imageStoryHome1}
                alt="Story Background"
                fill={true}
                className="rounded object-cover" // Optional styling
                quality={75}
                priority
              />
              <div className="z-10">
                {' '}
                {/* Content over the image */}
                <Heading3
                  size={'text-2xl'}
                  text={languages.get('home.title.header3.itemStory1')}
                />
                {/* TODO: Add button when blogs are available */}
                {/* <SolidButton text={languages.get('button.readMore')} href="/your-target-page" /> */}
              </div>
            </div>
            {/* Right side motion cards */}
            <div className="flex w-full flex-col gap-4 px-6 md:w-2/5 md:px-0 md:pl-4">
              <MotionImageCard
                src={images.homeStory1}
                alt="Other Image 1"
                text={languages.get('home.title.p.itemStory1')}
                className={'visible md:hidden'}
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
  );
};

const GiftSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useRecoilState(isImageLoadedState);

  const handleClick = () => {
    alert('Discover button clicked!');
  };
  return (
    <section className="relative mt-8 flex h-648 2xl:container md:mt-0 md:h-96 md:max-h-96 2xl:mx-auto">
      {/* Background images */}
      <div
        className={`absolute inset-0 z-0 ${!isLoaded ? 'animate-pulse bg-gray-200' : ''}`}
      >
        <Image
          src={images.giftHomeMobile} // Replace with the actual mobile background image
          alt="Gift Section Background Mobile"
          fill={true}
          className="block object-cover md:hidden"
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 100vw, 0" // Mobile tối đa 100% viewport width
          loading="lazy"
          quality={75}
        />
        <Image
          src={images.giftHome} // Replace with the actual desktop background image
          alt="Gift Section Background Desktop"
          fill={true}
          className="hidden object-cover md:block"
          onLoad={() => setIsLoaded(true)}
          sizes="(min-width: 768px) 100vw" // Desktop tối đa 100% viewport width
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-0 w-full md:mx-20 md:max-w-6xl">
        <div className="flex flex-col items-center pb-8 pt-40 md:flex-row md:pb-0 md:pt-0">
          {/* Logos */}
          <Image
            className="hidden md:block"
            src={images.logoMocHome}
            alt="Logo"
            width={290}
            height={290}
            quality={75}
            loading="lazy"
          />
          <Image
            className="block md:hidden"
            src={images.logoMocHomeMobile}
            alt="Logo Mobile"
            width={187}
            height={187}
            quality={75}
            loading="lazy"
          />
          <div className="mx-4 hidden h-24 w-1 bg-white md:block"></div>
          <div id="title">
            <div className="flex-n1 font-raleway flex flex-col items-center md:items-start">
              <p className="font-raleway mb-4 text-4xl font-extrabold text-white">
                {languages.get('home.title.header2.gift1')}
              </p>
              <p className="font-raleway text-4xl font-extrabold text-white">
                {languages.get('home.title.header2.gift2')}
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex w-full flex-row justify-center px-0 md:justify-start md:px-8">
          <DiscoverButton
            className="items-center justify-center"
            onClick={handleClick}
          >
            {languages.get('button.discover')}
          </DiscoverButton>
        </div>
      </div>
    </section>
  );
};

const FeedbackScrollableSection: React.FC = () => {
  return (
    <motion.div
      className="flex flex-row gap-6"
      animate={{ x: ['0%', '-100%'] }}
      transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {customerData.concat(customerData).map((data, index) => (
        <CustomerCard
          key={index}
          imageCustomerUrl={data.imageCustomerUrl}
          textDescription={data.textDescription}
          nameCustomer={data.nameCustomer}
          isAboveFold={index < 4}
        />
      ))}
    </motion.div>
  );
};

const FeedbackSection: React.FC = () => {
  return (
    <section className="pb-8 2xl:container md:pb-20 2xl:mx-auto">
      <div id="content" className="flex flex-col pt-8 md:pt-16 lg:pt-28">
        <div className="flex flex-col items-center px-6 pb-0 md:pb-14">
          <TitleText
            firstText={languages.get('home.title.firstText.feedback')}
            secondText={languages.get('home.title.secondText.feedback')}
          />
          <Heading2 text={languages.get('home.title.header2.feedback')} />
        </div>

        <div className="flex flex-col overflow-hidden">
          <FeedbackScrollableSection />
        </div>
      </div>
    </section>
  );
};

const ServiceSection: React.FC = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.homeBackgroundService} //background image
          alt="Service Section Background"
          fill={true}
          className="object-cover"
          quality={75}
          priority // Preload for better performance
        />
      </div>
      {/* Main content */}
      <div className="flex flex-col px-6 pb-8 pt-8 2xl:container md:px-6 md:pb-0 md:pt-28 lg:px-36 2xl:mx-auto">
        <div className="flex flex-col gap-y-12">
          {/* Content for Hiếu */}
          <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-16">
            <div className="flex w-full flex-col items-start justify-start lg:w-3/5">
              <TitleText
                firstText={languages.get('home.title.firstText.service')}
                secondText={languages.get('home.title.secondText.service')}
                textColor="text-white"
                bgColor="bg-white"
                itemsCenter={true}
              />
              <Heading2
                className="!mb-0 mt-3"
                text={languages.get('home.title.header2.service')}
                textColor={'text-white'}
                align={'left'}
              />
              <TextContent
                className="!mb-2 !mt-6 md:mb-8 md:mt-8"
                textColor={'text-white'}
                text={languages.get('home.title.textContentHieu.service')}
              />
              <p className="font-raleway font-semibold text-white">
                {' '}
                {languages.get('home.title.header4Hieu.service')}{' '}
              </p>
            </div>
            <div className="flex w-full items-center justify-center lg:w-2/5">
              <div className="relative w-full">
                <Suspense fallback={<p>Loading video...</p>}>
                  <div
                    className="relative w-full"
                    style={{
                      height: 0,
                      position: 'relative',
                      paddingBottom: '56.25%',
                    }}
                  >
                    <video preload="none" autoPlay loop muted>
                      <source src="/assets/videos/1.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
          <Line height={'h-px'} />
          {/* Content for Phú */}
          <div className="flex flex-col items-start justify-center gap-6 lg:flex-row lg:gap-16">
            <div className="order-2 flex w-full items-center justify-center lg:order-none lg:w-2/5">
              <div className="relative w-full">
                <Suspense fallback={<p>Loading video...</p>}>
                  <div
                    className="relative w-full"
                    style={{
                      height: 0,
                      position: 'relative',
                      paddingBottom: '56.25%',
                    }}
                  >
                    <video preload="none" autoPlay loop muted>
                      <source src="/assets/videos/2.webm" type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </Suspense>
              </div>
            </div>
            <div className="order-1 flex w-full flex-col items-start justify-start md:order-2 lg:w-3/5">
              <Heading2
                text={languages.get('home.title.header2Phu.service')}
                textColor={'text-white'}
                align={'left'}
                className="!mb-3 md:mb-8"
              />
              <TextContent
                textColor={'text-white'}
                text={languages.get('home.title.textContentPhu.service')}
              />
              <p className="font-raleway font-semibold text-white">
                {' '}
                {languages.get('home.title.header4Phu.service')}{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Services offered */}
      <div className="grid h-584 grid-cols-2 flex-row justify-between pb-16 pt-6 opacity-80 2xl:container md:flex md:h-64 md:flex-row md:pb-0 2xl:mx-auto">
        {cardServiceData.map((card, index) => (
          <ServiceCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
};

// Main section containing both scrolling components
const CoopClientsSection: React.FC = () => {
  return (
    <section className="mt-0 bg-gradient-to-b from-white to-just-right to-60%">
      <div
        id="content"
        className="flex flex-col gap-y-6 pb-14 pt-16 2xl:container md:gap-y-12 md:pb-10 md:pt-32 2xl:mx-auto"
      >
        <div className="flex flex-col items-center px-6 md:px-0">
          <TitleText
            firstText={languages.get('home.title.firstText.coopClient')}
            secondText={languages.get('home.title.secondText.coopClient')}
          />
          <Heading2
            className="mb-0 md:mb-8"
            text={languages.get('home.title.header2.coopClient')}
          />
        </div>

        <div className="flex flex-col gap-y-4 md:gap-y-8">
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {/* Animate the first set of images */}
            <motion.div
              className="flex gap-6"
              animate={{ x: ['0%', '-100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[...clientData, ...clientData].map((client, index) => (
                <Image
                  key={index}
                  className="h-16 w-32 gap-3 lg:h-32 lg:w-60 lg:gap-10"
                  width={232.77}
                  height={142.9}
                  src={client.src}
                  alt={client.alt}
                />
              ))}
            </motion.div>

            <motion.div
              className="mt-4 flex gap-6 lg:mt-7"
              animate={{ x: ['-100%', '0%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[...clientData, ...clientData].map((client, index) => (
                <Image
                  key={index}
                  className="h-16 w-32 gap-3 lg:h-32 lg:w-60 lg:gap-10"
                  width={232.77}
                  height={142.9}
                  src={client.src}
                  alt={client.alt}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      {/* <Carousel />
      {renderScrollSection(CategorySection)}
      {renderScrollSection(AboutSection)} */}

      <ProductSection />

      {/* {renderScrollSection(OtherProductsSection)}
      {renderScrollSection(StorySection)}
      {renderScrollSection(GiftSection)}
      {renderScrollSection(FeedbackSection)}
      {renderScrollSection(ServiceSection)}
      {renderScrollSection(CoopClientsSection)} */}
    </>
  );
};

export default HomePage;
