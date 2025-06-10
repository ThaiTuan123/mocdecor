'use client';

import images from '@/configs/images';
import Image from 'next/image';
import languages from '@/configs/languages';
import React, { Suspense } from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { SiZalo } from 'react-icons/si';
import { IoLogoFacebook } from 'react-icons/io';
import { useSearchParams } from 'next/navigation';

function FinishContent() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get('orderId') || 'N/A';
  const noUploadsNeeded = searchParams.get('noUploadsNeeded') === 'true';
  const linkConfirmOrder = searchParams.get('linkConfirmOrder') || '';

  return (
    <div>
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="order-3 flex-none text-center lg:order-1 lg:flex-1 lg:text-start">
          <div className="px-6 py-6 md:bg-contain md:bg-fixed md:bg-no-repeat md:px-20 md:py-12 lg:bg-image-left-error lg:py-72">
            <h1 className="font-playfairBold mb-4 text-1.25lg font-bold text-primary md:text-4xl">
              Cảm ơn bạn đã đặt hàng của MỘC
            </h1>
            <p className="mr-2 text-sm">
              Mã đơn hàng: <span className="font-bold">{orderCode}</span>
            </p>

            <div className="flex items-center justify-center gap-2 md:justify-start">
              <p className="mb-4 pt-5 text-sm md:mb-5 md:text-lg lg:mb-6">
                Link thanh toán:
              </p>
              <button
                className="rounded-md border border-gray-300 p-2 hover:outline hover:outline-2 hover:outline-primary"
                onClick={() => window.open(linkConfirmOrder, '_blank')}
              >
                <BsCashCoin className="h-5 w-5 text-black" />
              </button>
            </div>

            <p className="mb-4 text-sm md:mb-5 md:text-lg lg:mb-6">
              {noUploadsNeeded
                ? `Đơn hàng ${orderCode} không yêu cầu tải ảnh lên. `
                : ''}
              Đơn hàng của bạn sẽ được xác nhận trong vòng 24h. Nếu có bất kỳ
              thắc mắc nào, vui lòng liên hệ với chúng tôi qua :
            </p>

            <div className="mb-4 flex justify-center gap-2 md:mb-5 lg:mb-6 lg:justify-start">
              <button
                className="rounded-md border border-gray-300 p-2 hover:outline hover:outline-2 hover:outline-primary"
                onClick={() =>
                  window.open('https://www.facebook.com/mocdecor99', '_blank')
                }
              >
                <IoLogoFacebook className="h-5 w-5 text-facebook" />
              </button>
              <button
                className="rounded-md border border-gray-300 p-2 hover:outline hover:outline-2 hover:outline-primary"
                onClick={() =>
                  window.open('https://zalo.me/0378663309', '_blank')
                }
              >
                <SiZalo className="h-5 w-5 text-zalo" />
              </button>
            </div>

            <button
              onClick={() => (window.location.href = '/')}
              className="transform rounded bg-primary px-14 py-4 font-raleway uppercase text-white duration-150 hover:scale-105 md:px-16 lg:px-20"
            >
              {languages.get('404.button.returnHome')}
            </button>
          </div>
        </div>
        <div className="order-1 mt-10 flex flex-none animate-upDown justify-center lg:order-3 lg:mt-0 lg:flex-1">
          <Image
            src={images.successShopping}
            alt="finish"
            width={500}
            height={400}
            className="w-272 md:w-327 lg:w-500"
          />
        </div>
      </div>
    </div>
  );
}

export default function Finish() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FinishContent />
    </Suspense>
  );
}
