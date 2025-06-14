'use client';

import React, { Suspense, useEffect } from 'react';
import Image from 'next/image';
import {
  cardServiceData,
  clientData,
  customerData,
  socialLinks,
} from '@/app/home/constant';
import images from '@/configs/images';
import { motion } from 'framer-motion';
import IconSocialLink from '@/components/icons/IconSocialLink';
import RightArrowButton from '@/components/button/RightArrowButton';
import DiscoverButton from '@/components/button/DiscoverButton';
import TitleText from '@/components/texts/TitleText';
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
import { useRecoilState } from 'recoil';
import { isImageLoadedState } from '@/recoil/atoms/imageLoadAtom';
import { renderScrollSection } from '@/utils/helpers/renderScrollSection';
import ProductSection from './component/ProductSection';
import BlogList from '@/components/blog/BlogList';
import { fetchBlogs } from '@/services/api';
import { blogsState } from '@/recoil/atoms/blogAtom';
import useMocClient from '@/recoil/hooks/useMocClient';
import useMocCustomerReview from '@/recoil/hooks/useMocCustomerReview';
import useMocEvent from '@/recoil/hooks/useMocEvent';
import useMocAbout from '@/recoil/hooks/useMocAbout';

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
      <h1 className="font-playfairBold text-2xl font-bold uppercase text-brown-500 text-opacity-70 md:mb-8 md:text-7xl">
        {languages.get('home.title.category')}
      </h1>
      <div className="flex flex-col content-center items-center justify-center gap-0 md:flex-row md:gap-2 lg:justify-between xl:justify-center">
        {menu?.types?.length > 0 &&
          menu?.types?.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
      </div>
    </section>
  );
};

const HeaderSectionAbout = ({ title }: { title?: string }) => {
  return (
    <div className="order-99 flex w-full flex-col items-center text-left lg:w-fit lg:items-start">
      <TitleText
        firstText={languages.get('home.title.firstText.about')}
        secondText={languages.get('home.title.secondText.about')}
        justifyCenter={false} // Optional, defaults to true
      />
      <Heading2
        text={title ?? languages.get('home.title.header2.about')}
        classNameText="text-center lg:text-left mb-0 lg:mb-6"
      />
    </div>
  );
};

const TextContentAbout = ({ content }: { content?: string }) => (
  <TextContent
    text={content ?? languages.get('home.title.textContent.about')}
    marginBottom={'mb-4'}
    className="order-2 !mb-3 md:my-4 lg:order-none 2xl:w-[600px]"
  />
);

const SocialLinksAbout = () => (
  <div className="order-3 mt-0 flex items-center md:mt-4 lg:order-none">
    <p className="mr-5 font-raleway-fixed text-smLh font-normal text-caption md:text-1.25lg">
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

const ImageContentAbout = ({
  image1,
  image2,
}: {
  image1?: string;
  image2?: string;
}) => (
  <div className="order-1 mb-3 mt-4 w-full cursor-grab rounded-lg md:mb-0 lg:order-none">
    <Image
      src={image2 ?? images.homeAbout2}
      alt="Mộc Decor"
      width={564}
      height={312}
      className="w-full rounded-lg lg:w-auto"
    />

    <Image
      src={image1 ?? images.homeAbout3}
      alt="Mộc Decor"
      width={564}
      height={312}
      className="mt-4 w-full rounded-lg md:mt-8 lg:hidden"
    />
  </div>
);

const AboutSection: React.FC = () => {
  const { data } = useMocAbout();

  const { content, image_1, image_2, title } = data.data;

  return (
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
          src={image_1 ?? images.homeAbout1}
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
        <HeaderSectionAbout title={title} />
        <div
          id="contentLeft"
          className="lg:order-20 block lg:hidden lg:w-1/2 lg:pl-20 2xl:pl-40"
        >
          <Image
            src={image_1 ?? images.homeAbout1}
            alt="Mộc Decor"
            width={1024}
            height={768}
            className="mx-auto hidden h-252 w-full max-w-lg rounded-lg object-cover lg:flex lg:h-auto lg:object-fill"
          />
        </div>
        <TextContentAbout content={content} />
        <SeparatorAbout />
        <SocialLinksAbout />
        <ImageContentAbout image1={image_1} image2={image_2} />
      </div>
    </section>
  );
};

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

// const StorySection: React.FC = () => {
//   return (
//     <section className="h-896 2xl:container lg:h-946 2xl:mx-auto">
//       <div className="relative">
//         {/* Background image section */}
//         <div className="relative h-218 md:h-80">
//           <Image
//             src={images.imageProductStory} // Replace with your actual image path
//             alt="Product Story Background"
//             fill={true}
//             quality={75} // Optimize image quality
//             className={'object-cover'}
//             priority={true}
//           />
//           <div className="absolute inset-0 z-10"></div>
//           {/* Optional overlay */}
//           <div className="relative z-20 flex w-full flex-col px-7 pt-16 md:px-0">
//             <TitleText
//               firstText={languages.get('home.title.firstText.story')}
//               secondText={languages.get('home.title.secondText.story')}
//             />
//             <Heading2
//               className="mb-6 md:mb-8"
//               text={languages.get('home.title.header2.story')}
//             />
//           </div>
//         </div>
//
//         {/* Content section */}
//         <div
//           id="content"
//           className="absolute inset-0 z-30 mx-auto mt-44 md:mt-52 lg:max-w-7xl"
//         >
//           <div className="flex w-full md:h-[600]">
//             {/* Left side background image */}
//             <div className="relative hidden w-full items-end justify-between rounded px-8 py-8 md:flex md:w-3/5">
//               <Image
//                 src={images.imageStoryHome1}
//                 alt="Story Background"
//                 fill={true}
//                 className="rounded object-cover" // Optional styling
//                 quality={75}
//                 priority
//               />
//               <div className="z-10">
//                 {' '}
//                 {/* Content over the image */}
//                 <Heading3
//                   size={'text-2xl'}
//                   text={languages.get('home.title.header3.itemStory1')}
//                 />
//                 {/* TODO: Add button when blogs are available */}
//                 {/* <SolidButton text={languages.get('button.readMore')} href="/your-target-page" /> */}
//               </div>
//             </div>
//             {/* Right side motion cards */}
//             <div className="flex w-full flex-col gap-4 px-6 md:w-2/5 md:px-0 md:pl-4">
//               <MotionImageCard
//                 src={images.homeStory1}
//                 alt="Other Image 1"
//                 text={languages.get('home.title.p.itemStory1')}
//                 className={'visible md:hidden'}
//               />
//               <MotionImageCard
//                 src={images.homeStory2}
//                 alt="Other Image 2"
//                 text={languages.get('home.title.p.itemStory2')}
//               />
//               <MotionImageCard
//                 src={images.homeStory3}
//                 alt="Other Image 3"
//                 text={languages.get('home.title.p.itemStory3')}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const BlogSection = () => {
  const [blogs, setBlogs] = useRecoilState(blogsState);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data.contents.slice(0, 3)); // Hiển thị 3 bài post đầu tiên
      } catch (error) {
        console.error(error);
      }
    };

    loadBlogs().then(r => r);
  }, [setBlogs]);

  return (
    <section className="h-896 2xl:container lg:h-946 2xl:mx-auto">
      <BlogList blogs={blogs} />
    </section>
  );
};

const GiftSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useRecoilState(isImageLoadedState);
  const { data } = useMocEvent();

  const handleClick = () => {
    window.open(data.data.link, '_blank');
  };
  return (
    <section className="relative mt-8 flex h-648 2xl:container md:mt-0 md:h-96 md:max-h-96 2xl:mx-auto">
      {/* Background images */}
      <div
        className={`absolute inset-0 z-0 ${!isLoaded ? 'animate-pulse bg-gray-200' : ''}`}
      >
        <Image
          src={data?.data?.mobileImage ?? images.giftHomeMobile} // Replace with the actual mobile background image
          alt="Gift Section Background Mobile"
          fill={true}
          className="block object-cover md:hidden"
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 100vw, 0" // Mobile tối đa 100% viewport width
          loading="lazy"
          quality={75}
        />
        <Image
          src={data?.data?.desktopImage ?? images.giftHome} // Replace with the actual desktop background image
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
          <div className="mx-4 hidden h-24 w-1 bg-white md:block"></div>{' '}
          <div id="title">
            <div className="flex-n1 flex flex-col items-center md:items-start">
              {data.data.title ? (
                (() => {
                  const words = data.data.title.split(' ');
                  const totalWords = words.length;

                  let firstPartWords = 2; // Mặc định phần đầu là 2 từ

                  // Điều chỉnh số từ dựa trên tổng số từ
                  if (totalWords >= 6) {
                    firstPartWords = 3;
                  }

                  const firstPart = words.slice(0, firstPartWords).join(' ');
                  const secondPart = words.slice(firstPartWords).join(' ');

                  return (
                    <>
                      <p className="mb-4 font-raleway text-4xl font-extrabold text-white">
                        {firstPart}
                      </p>
                      <p className="font-raleway text-4xl font-extrabold text-white">
                        {secondPart}
                      </p>
                    </>
                  );
                })()
              ) : (
                <div>
                  <p className="mb-4 font-raleway text-4xl font-extrabold text-white">
                    {languages.get('home.title.header2.gift1')}
                  </p>
                  <p className="font-raleway text-4xl font-extrabold text-white">
                    {languages.get('home.title.header2.gift2')}
                  </p>
                </div>
              )}
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
  const { reviews } = useMocCustomerReview();
  const reviewRenderData =
    Array.isArray(reviews) && reviews.length > 0 ? reviews : customerData;

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
      {reviewRenderData.map((data, index) => (
        <CustomerCard
          key={index}
          imageCustomerUrl={data.image}
          textDescription={data.message}
          nameCustomer={data.name}
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
                  <div className="aspect-h-9 aspect-w-16 relative w-full">
                    <video
                      preload="metadata"
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      webkit-playsinline="true"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      style={{
                        objectFit: 'cover',
                      }}
                    >
                      <source src="/assets/videos/1.webm" type="video/webm" />
                      <source src="/assets/videos/1.mp4" type="video/mp4" />
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
                  <div className="aspect-h-9 aspect-w-16 relative w-full">
                    <video
                      preload="metadata"
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      webkit-playsinline="true"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      style={{
                        objectFit: 'cover',
                      }}
                    >
                      <source src="/assets/videos/2.webm" type="video/webm" />
                      <source src="/assets/videos/2.mp4" type="video/mp4" />
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
  const { client } = useMocClient();
  const clientRenderData =
    Array.isArray(client) && client.length > 0 ? client : clientData;

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
              {clientRenderData.map((clients, index) => (
                <Image
                  key={index}
                  className="h-16 w-32 gap-3 lg:h-32 lg:w-60 lg:gap-10"
                  width={232.77}
                  height={142.9}
                  src={clients.image}
                  alt={clients.name}
                />
              ))}
            </motion.div>

            <motion.div
              className="mt-4 flex gap-6 lg:mt-7"
              animate={{ x: ['-100%', '0%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {clientRenderData.map((clients, index) => (
                <Image
                  key={index}
                  className="h-16 w-32 gap-3 lg:h-32 lg:w-60 lg:gap-10"
                  width={232.77}
                  height={142.9}
                  src={clients.image}
                  alt={clients.name}
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
      <Carousel />
      {renderScrollSection(CategorySection)}
      {renderScrollSection(AboutSection)}
      {renderScrollSection(ProductSection)}
      {renderScrollSection(OtherProductsSection)}
      {renderScrollSection(BlogSection)}
      {renderScrollSection(GiftSection)}
      {renderScrollSection(FeedbackSection)}
      {renderScrollSection(ServiceSection)}
      {renderScrollSection(CoopClientsSection)}
    </>
  );
};

export default HomePage;
