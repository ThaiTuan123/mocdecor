'use client';

import GalleryCategory from '@/app/gallery/@FoundGallery/@GalleryCategory';
import GalleryItem from '@/app/gallery/@FoundGallery/@GalleryItem';
import { useEffect, useRef, useState } from 'react';

interface FoundGalleryProps {
  orderData: any;
  setOrderData: React.Dispatch<React.SetStateAction<{}>>;
}

export default function FoundGallery({
  orderData,
  setOrderData,
}: FoundGalleryProps) {
  const isFirstLoad = useRef(true);
  const [uploadState, setUploadState] = useState<any>([]);
  const [selectedUpload, setSelectedUpload] = useState('');

  // useEffect(() => {
  //   if (orderData && orderData.items && orderData.items.length > 0) {
  //     const initState = orderData.items.flatMap((item: any) =>
  //       Array.from({ length: item.quantity }, (_, index) => ({
  //         id: `${item.id}-${index + 1}`,
  //         input: item.images ?? [],
  //         name: item.variationInfo.name,
  //         image: item.productImage,
  //         field: item.variationInfo.fields,
  //         variationId: item.variationId,
  //         detail: item.variationInfo.detail,
  //         countSelected: item.images?.length || 0,
  //       }))
  //     );
  //     setUploadState(initState);
  //   }
  // }, [orderData]);

  useEffect(() => {
    if (orderData && orderData.items && orderData.items.length > 0) {
      const initState = orderData.items.flatMap((item: any) =>
        Array.from({ length: item.quantity }, (_, index) => ({
          id: `${item.id}-${index + 1}`,
          input: (item.images ?? []).map((img: string, imgIndex: number) => ({
            id: `${item.id}-${index + 1}-${imgIndex}`,
            file: null,
            url: img,
            status: 'done',
            remoteUrl: img,
          })),
          name: item.variationInfo.name,
          image: item.productImage,
          field: item.variationInfo.fields,
          variationId: item.variationId,
          detail: item.variationInfo.detail,
          countSelected: item.images?.length || 0,
        }))
      );
      setUploadState(initState);
    }
  }, [orderData]);

  useEffect(() => {
    if (uploadState.length && isFirstLoad.current) {
      setSelectedUpload(uploadState[0].id);
      isFirstLoad.current = false;
    }
  }, [uploadState]);

  return (
    <div className="flex flex-col lg:flex-row lg:px-20 lg:py-9 2xl:px-52 3xl:px-96 4xl:mx-auto 4xl:max-w-7xl 4xl:px-0">
      {/* Left Section - Gallery Category */}
      {orderData && (
        <GalleryCategory
          uploadState={uploadState}
          setUploadState={setUploadState}
          setSelectedUpload={setSelectedUpload}
          selectedUpload={selectedUpload}
          orderId={orderData.id}
          orderStatus={orderData.status}
          insertedAt={orderData.insertedAt}
          linkConfirmOrder={orderData.link_confirm_order}
        />
      )}

      {/* Right Section - Gallery Item */}
      <GalleryItem
        uploadState={uploadState}
        setUploadState={setUploadState}
        setSelectedUpload={setSelectedUpload}
        selectedUpload={selectedUpload}
        orderData={orderData}
        orderId={orderData.id}
      />
    </div>
  );
}
