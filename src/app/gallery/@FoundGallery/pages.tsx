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

  function checkArrayFormat(arr: any[]): number {
    const isStringArray = arr.every(item => typeof item === 'string');
    if (isStringArray) {
      return 1;
    }

    const isStringArrayOfArrays = arr.every(
      item =>
        Array.isArray(item) &&
        item.every(subItem => typeof subItem === 'string')
    );
    if (isStringArrayOfArrays) {
      return 2;
    }

    if (arr.length === 0) {
      return 0;
    }

    return -1;
  }

  useEffect(() => {
    if (orderData && orderData.items && orderData.items.length > 0) {
      const itemsInitState: any = [];
      orderData.items.map((item: any, idx: number) => {
        if (item.images.length === 0) {
          if (item.product.allow_merge_image) {
            const data = {
              id: `${item.id}`,
              input: [],
              name: item.variationInfo.name,
              image: item.productImage,
              field: item.variationInfo.fields,
              variationId: item.variationId,
              imageLimit: item.product?.imagesLimit || -1,
              detail: item.variationInfo.detail,
              countSelected: item.images?.length || 0,
              allow_merge_image: item.product.allow_merge_image,
              quantity: item.quantity || 0,
            };
            itemsInitState.push(data);
          } else {
            Array.from({ length: item.quantity || 0 }).map((_, index) => {
              const data = {
                id: `${item.id}-${index + 1}`,
                input: [],
                name: item.variationInfo.name,
                image: item.productImage,
                field: item.variationInfo.fields,
                variationId: item.variationId,
                imageLimit: item.product?.imagesLimit || -1,
                detail: item.variationInfo.detail,
                countSelected: item.images?.length || 0,
                allow_merge_image: item.product.allow_merge_image,
                quantity: item.quantity || 0,
              };
              if (item.product?.imagesLimit) {
                itemsInitState.push(data);
              }
            });
          }
        } else {
          const imageArrType = checkArrayFormat(item.images);
          if (imageArrType === 1) {
            const input = item.images.map((img: any, index: number) => {
              return {
                id: `${item.id}-${index + 1}-0`,
                file: null,
                url: img,
                status: 'done',
                remoteUrl: img,
              };
            });
            const data = {
              id: `${item.id}-1`,
              input,
              name: item.variationInfo.name,
              image: item.productImage,
              field: item.variationInfo.fields,
              variationId: item.variationId,
              imageLimit: item.product?.imagesLimit || -1,
              detail: item.variationInfo.detail,
              countSelected: item.images?.length || 0,
              allow_merge_image: item.product.allow_merge_image,
              quantity: item.quantity || 0,
            };
            if (item.product?.imagesLimit) {
              itemsInitState.push(data);
            }
          } else if (imageArrType === 2) {
            item.images.flatMap((img: any, index: number) => {
              const input = img.map((im: any, imgIndex: number) => {
                return {
                  id: `${item.id}-${index + 1}-${imgIndex}`,
                  file: null,
                  url: im,
                  status: 'done',
                  remoteUrl: im,
                };
              });
              const data = {
                id: `${item.id}-${index + 1}`,
                input,
                name: item.variationInfo.name,
                image: item.productImage,
                field: item.variationInfo.fields,
                variationId: item.variationId,
                imageLimit: item.product?.imagesLimit || -1,
                detail: item.variationInfo.detail,
                countSelected: item.images?.length || 0,
                allow_merge_image: item.product.allow_merge_image,
                quantity: item.quantity || 0,
              };
              if (item.product?.imagesLimit) {
                itemsInitState.push(data);
              }
            });
          }
        }
      });
      setUploadState(itemsInitState);
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
      {/* Mobile Layout */}
      <div className="block lg:hidden">
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
            isMobile={true}
            orderData={orderData}
          />
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:w-full">
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
            isMobile={false}
            orderData={orderData}
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
          linkConfirmOrder={orderData.link_confirm_order}
        />
      </div>
    </div>
  );
}
