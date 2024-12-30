'use client';

import React, { useEffect, useState } from 'react';
import images from '@/configs/images';
import languages from '@/configs/languages';
import Image from 'next/image';
import NotFoundGallery from '@/app/gallery/@Notfound/Pages';
import FoundGallery from '@/app/gallery/@FoundGallery/pages';
import { useGallery } from '@/recoil/hooks/useGallery';
import Empty from '@/app/gallery/@Empty/Pages';
import { getOrder } from '@/services/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FooterDiscover from '@/components/footer/FooterDiscover';

// Reusable Hero Section Component
const HeroSection: React.FC<{
  introText: string;
  uploadText: string;
  title: string;
  buttonText: string;
  descText: string;
  placeholder: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
}> = ({
  introText,
  uploadText,
  title,
  buttonText,
  descText,
  placeholder,
  inputValue,
  onInputChange,
  onKeyPress,
  onButtonClick,
}) => {
  return (
    <div className="flex min-h-44 justify-center bg-image-hero-gallery bg-cover bg-no-repeat px-6 py-7 text-white md:min-h-80 md:px-0 md:py-16">
      <div className="flex w-full flex-col items-center gap-2 md:w-2/3">
        <div className="flex flex-row gap-1">
          <span className="text-black-50">{introText}</span>
          <span>/</span>
          <span>{uploadText}</span>
        </div>
        <h1 className="text-center text-2xl font-bold uppercase md:text-6lg">
          {title}
        </h1>
        <div className="order-2 my-4 flex h-16 w-full items-center rounded bg-white px-4 lg:order-1">
          <img
            src={images.icons.search}
            className="mr-2 size-5"
            alt="Search Icon"
          />
          <input
            type="text"
            placeholder={placeholder}
            className="h-full flex-1 text-karaka outline-none"
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={onKeyPress}
          />
          <button
            className="size-12 items-center justify-center rounded bg-primary hover:scale-105 md:flex lg:h-12 lg:w-44"
            onClick={onButtonClick}
          >
            <span className="hidden lg:block" aria-disabled="true">
              {buttonText}
            </span>
            <Image
              width={20}
              height={20}
              src={images.icons.mobileSearch}
              className="mx-auto block lg:hidden"
              alt="Button Icon"
            />
          </button>
        </div>
        <span className="font-raleway order-1 w-full text-center text-lg md:w-1/2 md:text-2lg lg:order-2">
          {descText}
        </span>
      </div>
    </div>
  );
};

// Main Page Component
const Page: React.FC = () => {
  const {
    placeholder,
    inputValue,
    isInputEmpty,
    isFound,
    handleInputChange,
    handleButtonClick,
    handleKeyPress,
  } = useGallery();

  const heroIntroText = languages.get('gallery.hero.intro.text');
  const heroUploadText = languages.get('gallery.hero.upload.text');
  const heroTitle = languages.get('galley.hero.title');
  const heroButtonText = languages.get('galley.hero.button.text');
  const heroDescText = languages.get('galley.hero.desc');
  const path = usePathname();
  const orderId = path.split('/')[2];
  const [orderData, setOrderData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    console.log(orderId);
    if (orderId) {
      getOrder(orderId).then(data => setOrderData(data));
    }
  }, [orderId]);

  const onClickSearch = () => {
    if (inputValue) {
      router.push(`/gallery/${inputValue}`);
    }
  };

  const renderGallery = () => {
    if (orderData && orderData?.items && orderData?.items.length > 0) {
      return <FoundGallery orderData={orderData} setOrderData={setOrderData} />;
    } else {
      return <Empty />;
    }
  };

  return (
    <div>
      <HeroSection
        introText={heroIntroText}
        uploadText={heroUploadText}
        title={heroTitle}
        buttonText={heroButtonText}
        descText={heroDescText}
        placeholder={placeholder}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onButtonClick={onClickSearch}
      />
      <div className="found-gallery-container">{renderGallery()}</div>
      <FooterDiscover />
    </div>
  );
};

export default Page;
