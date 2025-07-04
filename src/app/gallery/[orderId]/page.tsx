'use client';

import React, { useEffect, useState } from 'react';
import images from '@/configs/images';
import languages from '@/configs/languages';
import Image from 'next/image';
import FoundGallery from '@/app/gallery/@FoundGallery/pages';
import { useGallery } from '@/recoil/hooks/useGallery';
import Empty from '@/app/gallery/@Empty/Pages';
import { getOrder, getProduct } from '@/services/api';
import { usePathname, useRouter } from 'next/navigation';
import FooterDiscover from '@/components/footer/FooterDiscover';

const Page: React.FC = () => {
  const heroIntroText = languages.get('gallery.hero.intro.text');
  const heroUploadText = languages.get('gallery.hero.upload.text');
  const heroTitle = languages.get('galley.hero.title');
  const heroDescText = languages.get('galley.hero.desc');
  const path = usePathname();
  const orderId = path.split('/')[2];
  const [orderData, setOrderData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    if (orderId) {
      getOrder(orderId).then(async data => {
        let items = data.items;
        items = await Promise.all(
          items.map(async (item: any) => {
            const product = await getProduct(item.variationId);

            item.product = product;
            return item;
          })
        );
        setOrderData(data);
 
        // Save to localStorage for order history
        if (data && data.id) {
          try {
            const existingUploaded = localStorage.getItem('uploadedOrders');
            const uploadedList = existingUploaded
              ? JSON.parse(existingUploaded)
              : [];

            if (!uploadedList.includes(orderId)) {
              uploadedList.push(orderId);
              localStorage.setItem(
                'uploadedOrders',
                JSON.stringify(uploadedList)
              );
            }
          } catch (error) {
            console.error('Error saving to localStorage:', error);
          }
        }
      });
    }
  }, [orderId]);

  // Hero Section với thông tin đơn hàng
  const renderHero = () => {
    return (
      <div className="flex min-h-44 justify-center bg-image-hero-gallery bg-cover bg-no-repeat px-6 py-7 text-white md:min-h-80 md:px-0 md:py-16">
        <div className="flex w-full flex-col items-center gap-2 md:w-2/3">
          <div className="flex flex-row gap-1">
            <span className="text-black-50">{heroIntroText}</span>
            <span>/</span>
            <span>{heroUploadText}</span>
          </div>
          <h1 className="text-center text-2xl font-bold uppercase md:text-6lg">
            {heroTitle}
          </h1>
          <div className="order-2 my-4 flex w-full items-center justify-center py-2">
            <div className="rounded bg-white/20 px-6 py-3 backdrop-blur-sm">
              <span className="text-xl font-semibold">
                Mã đơn hàng: {orderId}
              </span>
            </div>
          </div>
          <span className="order-1 w-full text-center font-raleway text-lg md:w-1/2 md:text-2lg lg:order-2">
            {heroDescText}
          </span>
          <button
            onClick={() => router.push('/gallery')}
            className="mt-4 rounded border border-white px-4 py-2 text-sm hover:bg-white hover:text-primary"
          >
            Tìm đơn hàng khác
          </button>
        </div>
      </div>
    );
  };

  const renderGallery = () => {
    if (orderData && orderData?.items) {
      return <FoundGallery orderData={orderData} setOrderData={setOrderData} />;
    } else {
      return <Empty />;
    }
  };

  return (
    <div>
      {renderHero()}
      {renderGallery()}
      <FooterDiscover />
    </div>
  );
};

export default Page;
