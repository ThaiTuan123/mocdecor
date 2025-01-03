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

  useEffect(() => {
    if (orderData && orderData.items && orderData.items.length > 0) {
      const initState = orderData.items.flatMap((item: any) =>
        Array.from({ length: item.quantity }, (_, index) => ({
          id: `${item.id}-${index + 1}`,
          input: [],
          name: item.variationInfo.name,
          // image: item.images[0],
          field: item.variationInfo.fields,
          countSelected: 0,
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
    <div className="flex flex-col lg:flex-row lg:px-20 lg:py-9 2xl:px-36">
      {/* Left Section - Gallery Category */}
      <GalleryCategory
        uploadState={uploadState}
        setUploadState={setUploadState}
        setSelectedUpload={setSelectedUpload}
      />

      {/* Right Section - Gallery Item */}
      <GalleryItem
        uploadState={uploadState}
        setUploadState={setUploadState}
        setSelectedUpload={setSelectedUpload}
        selectedUpload={selectedUpload}
        orderData={orderData}
      />
    </div>
  );
}
