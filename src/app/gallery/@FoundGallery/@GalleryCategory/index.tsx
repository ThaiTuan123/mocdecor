// src/app/gallery/@FoundGallery/@GalleryCategory/index.tsx

import React from 'react';
import languages from '@/configs/languages';
import LabelValue from '@/components/texts/LabelValue';
import OrderItemCard from '@/components/card/OrderItemCard';
import { OrderList } from '@/types/order';
import orderListData from '@/app/data/orderListData.json';
import { BsCashCoin } from 'react-icons/bs';
import { PAYMENT_LINK } from '@/utils/constants';
import { formatDate } from '@/utils/dateTimeFormat';

interface GalleryCategoryProps {
  uploadState: any;
  setUploadState: React.Dispatch<any>;
  setSelectedUpload: React.Dispatch<React.SetStateAction<string>>;
  orderId: String;
  orderStatus: 0 | 1 | 2 | 3 | 4 | 8 | 9;
  insertedAt: string;
  linkConfirmOrder: string;
}

const statusText = {
  0: languages.get('product.detail.status.new'),
  1: languages.get('product.detail.status.confirmed'),
  2: languages.get('product.detail.status.gived'),
  3: languages.get('product.detail.status.received'),
  4: languages.get('product.detail.status.backed'),
  8: languages.get('product.detail.status.packed'),
  9: languages.get('product.detail.status.shipping'),
};

export default function GalleryCategory({
  uploadState,
  setUploadState,
  setSelectedUpload,
  orderId,
  orderStatus,
  insertedAt,
  linkConfirmOrder,
}: GalleryCategoryProps) {
  return (
    <div className="w-full rounded bg-white lg:w-1/3 lg:border lg:border-stroke">
      <div className="px-7 pt-5">
        <p className="mb-4 text-xl font-semibold text-primary">
          {languages.get('product.info.title')}
        </p>
        <div className="mb-4 flex flex-col gap-y-4">
          <LabelValue
            label={languages.get('product.detail.orderId')}
            value={orderId}
          />
          <LabelValue
            label={languages.get('product.detail.orderDate')}
            value={formatDate(insertedAt)}
          />
          <LabelValue
            label={languages.get('product.detail.status')}
            value={statusText[orderStatus]}
            isStatus={true}
          />
          {/*TODO add link thanh toán*/}
          <div className="flex w-full flex-row items-center justify-between">
            <p className="font-raleway text-sm text-brown-900">Thanh toán</p>
            <div className="flex gap-2">
              {/* Copy Icon */}
              <div className="group relative">
                <button
                  className="rounded-md border border-gray-300 p-2 hover:outline hover:outline-2 hover:outline-primary"
                  onClick={() =>
                    navigator.clipboard.writeText(linkConfirmOrder)
                  }
                >
                  <FiCopy className="h-5 w-5 text-black" />
                </button>
                <div className="absolute left-1/2 top-full z-10 hidden w-max -translate-x-1/2 translate-y-2 rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
                  Copy link thanh toán
                </div>
              </div>

              {/* Buy Icon */}
              <div className="group relative">
                <button
                  className="rounded-md border border-gray-300 p-2 hover:outline hover:outline-2 hover:outline-primary"
                  onClick={() => window.open(linkConfirmOrder, '_blank')}
                >
                  <BsCashCoin className="h-5 w-5 text-black" />
                </button>
                <div className="absolute left-1/2 top-full z-10 hidden w-max -translate-x-1/2 translate-y-2 rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
                  Link thanh toán
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Note */}
      <div className="flex h-28 items-center bg-pampas px-7 lg:hidden">
        <p className="w-full text-left text-gray-100">
          {languages.get('product.detail.status.mobileNote')}
        </p>
      </div>

      {/* Order List */}
      <div className="h-[630px] overflow-y-auto">
        {uploadState.length &&
          uploadState.map((order: any) => (
            <OrderItemCard
              key={order.id}
              imageSrc={order.image}
              title={order.name}
              selectedCount={order.countSelected}
              totalCount={40}
              status={'click'}
              onClick={() => setSelectedUpload(order.id)}
            />
          ))}
      </div>
    </div>
  );
}
