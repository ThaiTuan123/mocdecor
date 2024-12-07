// src/app/gallery/@FoundGallery/@GalleryCategory/index.tsx

import React, { useEffect } from "react";
import languages from "@/configs/languages";
import LabelValue from "@/components/texts/LabelValue";
import OrderItemCard from "@/components/card/OrderItemCard";

interface GalleryCategoryProps {
    uploadState: any
    setUploadState: React.Dispatch<any>
    setSelectedUpload: React.Dispatch<React.SetStateAction<string>>
}

export default function GalleryCategory({ uploadState, setUploadState, setSelectedUpload }: GalleryCategoryProps) {

    return (
        <div className="w-full lg:w-1/3 lg:border lg:border-stroke bg-white rounded">
            <div className='pt-5 px-7'>
                <h2 className="text-xl font-semibold mb-4 text-primary">{languages.get('product.detail.title')}</h2>
                <div className="mb-4 flex flex-col gap-y-4">
                    <LabelValue label={languages.get('product.detail.orderId')} value="4353434535362"/>
                    <LabelValue label={languages.get('product.detail.orderDate')} value="12/07/2024"/>
                    <LabelValue
                        label={languages.get('product.detail.status')}
                        value={languages.get('product.detail.status.confirmed')}
                        isStatus={true}
                    />
                </div>
            </div>

            {/* Mobile Note */}
            <div className='bg-pampas h-28 px-7 flex items-center lg:hidden'>
                <p className="text-left w-full text-gray-100">
                    {languages.get('product.detail.status.mobileNote')}
                </p>
            </div>

            {/* Order List */}
            <div className="h-[630px] overflow-y-auto">
                {uploadState.length && uploadState.map((order: any) => (
                    <OrderItemCard
                        key={order.id}
                        imageSrc={order.image}
                        title={order.name}
                        selectedCount={order.countSelected}
                        totalCount={40}
                        status={"click"}
                        onClick={() => setSelectedUpload(order.id)}
                    />
                ))}
            </div>
        </div>
    );
}
