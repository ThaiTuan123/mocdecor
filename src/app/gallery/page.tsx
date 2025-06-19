'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import languages from '@/configs/languages';
import images from '@/configs/images';
import FooterDiscover from '@/components/footer/FooterDiscover';

export default function GallerySearch() {
  const [orderid, setOrderid] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderid.trim()) {
      setError('Vui lòng nhập mã đơn hàng');
      return;
    }

    router.push(`/gallery/${orderid}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="flex min-h-44 justify-center bg-image-hero-gallery bg-cover bg-no-repeat py-8 text-white md:min-h-80 md:py-16">
        <div className="flex w-full flex-col items-center gap-2 px-6 md:w-2/3 md:px-0">
          <div className="flex flex-row gap-1">
            <span className="text-black-50">
              {languages.get('gallery.hero.intro.text')}
            </span>
            <span>/</span>
            <span>{languages.get('gallery.hero.upload.text')}</span>
          </div>
          <h1 className="text-center text-2xl font-bold uppercase md:text-6lg">
            {languages.get('galley.hero.title')}
          </h1>

          <div className="order-2 my-4 flex h-16 w-full items-center rounded bg-white px-4 2xl:container lg:order-1">
            <img
              src={images.icons.search}
              className="mr-2 size-5"
              alt="Search Icon"
            />
            <input
              type="text"
              placeholder="Nhập mã đơn hàng của bạn..."
              className="h-full flex-1 text-karaka outline-none"
              value={orderid}
              onChange={e => {
                setOrderid(e.target.value);
                setError('');
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
            />
            <button
              className="size-12 items-center justify-center rounded bg-primary hover:scale-105 md:flex lg:h-12 lg:w-44"
              onClick={handleSubmit}
            >
              <span className="hidden lg:block" aria-disabled="true">
                {languages.get('galley.hero.button.text')}
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

          <span className="order-1 w-full text-center font-raleway text-lg md:w-1/2 md:text-2lg lg:order-2">
            {languages.get('galley.hero.desc')}
          </span>

          {error && (
            <p className="mt-2 text-center text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>

      {/* Main Content - Empty State */}
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Image
            src={images.emptyGallery || images.icons.search}
            alt="Nhập mã đơn hàng"
            width={200}
            height={200}
            className="mx-auto animate-moveUpDown"
          />
          <h2 className="mt-6 text-2xl font-semibold text-primary">
            {languages.get('galley.empty.title') ||
              'Nhập mã đơn hàng để xem thư viện'}
          </h2>
          <p className="mt-2 text-base text-karaka">
            {languages.get('galley.empty.desc') ||
              'Vui lòng nhập mã đơn hàng của bạn ở trên để xem thư viện ảnh sản phẩm'}
          </p>
        </div>
      </div>

      <FooterDiscover />
    </div>
  );
}
