'use client';

import images from '@/configs/images';
import Image from 'next/image';
import languages from '@/configs/languages';
import React from 'react';

export default function NotFound() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="order-3 flex-none text-center lg:order-1 lg:flex-1 lg:text-start">
          <div className="px-6 py-6 md:bg-contain md:bg-fixed md:bg-no-repeat md:px-20 md:py-12 lg:bg-image-left-error lg:py-72">
            <h1 className="font-playfairBold mb-4 text-2xl font-bold text-primary md:text-4xl">
              {languages.get('404.error.Title')}
            </h1>
            <p className="mb-2 text-sm md:mb-5 md:text-lg lg:mb-6">
              {languages.get('404.error.Message1')}
            </p>
            <p className="mb-4 text-sm md:mb-5 md:text-lg lg:mb-6">
              {languages.get('404.error.Message2')}
            </p>

            <button
              onClick={() => (window.location.href = '/')}
              className="font-raleway transform rounded bg-primary px-24 py-4 uppercase text-white duration-150 hover:scale-105 md:px-16 lg:px-20"
            >
              {languages.get('404.button.returnHome')}
            </button>
          </div>
        </div>
        <div className="order-1 mt-10 flex flex-none animate-upDown justify-center lg:order-3 lg:mt-0 lg:flex-1">
          <Image
            src={images.image404}
            alt="Broken"
            width={500}
            height={400}
            className="w-272 md:w-327 lg:w-500"
          />
        </div>
      </div>
    </div>
  );
}
