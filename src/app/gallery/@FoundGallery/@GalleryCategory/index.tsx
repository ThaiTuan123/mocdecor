// src/app/gallery/@FoundGallery/@GalleryCategory/index.tsx

import React from 'react';
import languages from '@/configs/languages';
import LabelValue from '@/components/texts/LabelValue';
import OrderItemCard from '@/components/card/OrderItemCard';
import { OrderList } from '@/types/order';
import orderListData from '@/app/data/orderListData.json';

export default function GalleryCategory() {
  const orders: OrderList = orderListData; // Typing the imported data

  return (
    <div className="w-full rounded bg-white lg:w-1/3 lg:border lg:border-stroke">
      <div className="px-7 pt-5">
        <p className="mb-4 text-xl font-semibold text-primary">
          {languages.get('product.detail.title')}
        </p>
        <div className="mb-4 flex flex-col gap-y-4">
          <LabelValue
            label={languages.get('product.detail.orderId')}
            value="4353434535362"
          />
          <LabelValue
            label={languages.get('product.detail.orderDate')}
            value="12/07/2024"
          />
          <LabelValue
            label={languages.get('product.detail.status')}
            value={languages.get('product.detail.status.confirmed')}
            isStatus={true}
          />
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
        {orders.orders.map((order) => (
          <OrderItemCard
            key={order.id}
            imageSrc={order.imageSrc}
            title={order.title}
            selectedCount={order.selectedCount}
            totalCount={order.totalCount}
            status={order.status}
            onClick={() => console.log(`Order ${order.id} clicked`)}
          />
        ))}
      </div>
    </div>
  );
}
