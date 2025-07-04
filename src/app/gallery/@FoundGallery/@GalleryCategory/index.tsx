// src/app/gallery/@FoundGallery/@GalleryCategory/index.tsx

import React, { useState, useEffect } from 'react';
import languages from '@/configs/languages';
import LabelValue from '@/components/texts/LabelValue';
import OrderItemCard from '@/components/card/OrderItemCard';
import { FiCopy } from 'react-icons/fi';
import { BsCashCoin } from 'react-icons/bs';
import { formatDate } from '@/utils/dateTimeFormat';
import MobileGalleryItem from '@/app/gallery/@FoundGallery/@GalleryItem/MobileGalleryItem';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface GalleryCategoryProps {
  uploadState: any;
  setUploadState: React.Dispatch<any>;
  setSelectedUpload: React.Dispatch<React.SetStateAction<string>>;
  selectedUpload: string;
  orderId: String;
  orderStatus: 0 | 1 | 2 | 3 | 4 | 8 | 9;
  insertedAt: string;
  linkConfirmOrder: string;
  isMobile?: boolean;
  orderData?: any;
}

const statusText = {
  0: languages.get('product.detail.status.new'),
  1: languages.get('product.detail.status.confirmed'),
  2: languages.get('product.detail.status.gived'),
  3: languages.get('product.detail.status.received'),
  4: languages.get('product.detail.status.backed'),
  6: languages.get('product.detail.status.cancel'),
  8: languages.get('product.detail.status.packed'),
  9: languages.get('product.detail.status.shipping'),
};

export default function GalleryCategory({
  uploadState,
  setUploadState,
  setSelectedUpload,
  selectedUpload,
  orderId,
  orderStatus,
  insertedAt,
  linkConfirmOrder,
  isMobile = false,
  orderData,
}: GalleryCategoryProps) {
  const router = useRouter();
  const [expandedItem, setExpandedItem] = useState<string>('');
  const [uploadQueue, setUploadQueue] = useState<
    { id: string; file: File; tabId: string }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAllowSubmit, setIsAllowSubmit] = useState(false);
  const [note, setNote] = useState<string>('');

  const BASE_CDN_URL = process.env.BASE_CDN_URL || 'https://cdn.mocdecor99.com';
  const BASE_URL = process.env.BASE_URL || 'https://api.mocdecor99.com';
  const MAX_BATCH_SIZE = 5;

  useEffect(() => {
    if (orderData) {
      if (
        (orderData.statusClient === 1 && orderData.allowResendImage === true) ||
        orderData.statusClient === 0
      ) {
        setIsAllowSubmit(true);
      } else {
        setIsAllowSubmit(false);
      }
    }
  }, [orderData]);

  useEffect(() => {
    if (uploadQueue.length > 0 && !isUploading) {
      const batch = uploadQueue.slice(0, MAX_BATCH_SIZE);
      uploadBatch(batch);
    }
  }, [uploadQueue, isUploading]);

  const uploadBatch = async (
    batch: { id: string; file: File; tabId: string }[]
  ) => {
    setIsUploading(true);
    for (const { id, file, tabId } of batch) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${BASE_CDN_URL}/single`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          updateImageStatus(id, 'done', result.paths, tabId);
        } else {
          updateImageStatus(id, 'error', null, tabId);
        }
      } catch (error) {
        console.error('Error uploading file', error);
        updateImageStatus(id, 'error', null, tabId);
      } finally {
        setUploadQueue(prev => prev.filter(item => item.id !== id));
      }
    }
    setIsUploading(false);
  };

  const updateImageStatus = (
    id: string,
    status: string,
    remoteUrl: string | null = null,
    tabId: string
  ) => {
    setUploadState((prev: any[]) =>
      prev.map(item =>
        item.id === tabId
          ? {
              ...item,
              input: item.input.map((image: any) =>
                image.id === id ? { ...image, status, remoteUrl } : image
              ),
            }
          : item
      )
    );
  };

  const handleMobileUpload = (files: File[], itemId: string) => {
    const newPreviews = files.map(file => ({
      id: `${file.name}-${Date.now()}`,
      file: file,
      url: URL.createObjectURL(file),
      remoteUrl: null,
      status: 'loading',
    }));

    setUploadState((prev: any[]) =>
      prev.map(item =>
        item.id === itemId
          ? {
              ...item,
              input: [...item.input, ...newPreviews],
              countSelected: item.countSelected + newPreviews.length,
            }
          : item
      )
    );

    setUploadQueue(prev => [
      ...prev,
      ...newPreviews.map(({ id, file }) => ({
        id,
        file,
        tabId: itemId,
      })),
    ]);
  };

  const handleMobileRemove = (imageId: string, itemId: string) => {
    setUploadState((prev: any[]) =>
      prev.map(item =>
        item.id === itemId
          ? {
              ...item,
              input: item.input.filter((image: any) => image.id !== imageId),
              countSelected: item.countSelected - 1,
            }
          : item
      )
    );
  };

  const handleMobileRetry = (imageId: string, itemId: string) => {
    // Find the failed image
    const item = uploadState.find((item: any) => item.id === itemId);
    const failedImage = item?.input.find((img: any) => img.id === imageId);

    if (failedImage && failedImage.file) {
      // Reset status to loading
      setUploadState((prev: any[]) =>
        prev.map(item =>
          item.id === itemId
            ? {
                ...item,
                input: item.input.map((image: any) =>
                  image.id === imageId ? { ...image, status: 'loading' } : image
                ),
              }
            : item
        )
      );

      // Add to upload queue again
      setUploadQueue(prev => [
        ...prev,
        {
          id: imageId,
          file: failedImage.file,
          tabId: itemId,
        },
      ]);
    }
  };

  const submitOrder = async () => {
    const allItemsComplete = uploadState.every((item: any) => {
      const successfulUploads = item.input.filter(
        (img: any) => img.status === 'done'
      ).length;
      const requiredUploads = item.allow_merge_image
        ? item.imageLimit * item.quantity
        : item.imageLimit;
      return successfulUploads >= requiredUploads;
    });

    if (!allItemsComplete) {
      toast.error(
        'Bạn cần upload đầy đủ ảnh cho tất cả các sản phẩm trước khi xác nhận. Chỉ tính những ảnh upload thành công.'
      );
      return;
    }

    const anyImageUploading = uploadState.some((item: any) =>
      item.input.some((image: any) => image.status === 'loading')
    );

    if (anyImageUploading) {
      toast.info('Chúng tôi đang xử lý ảnh của bạn. Vui lòng chờ...');
      return;
    }

    const hasErrorImages = uploadState.some((item: any) =>
      item.input.some((image: any) => image.status === 'error')
    );

    if (hasErrorImages) {
      toast.warn('Có một số ảnh upload bị lỗi.Vui lòng thử upload lại.');
    }

    const mergedItemsMap = new Map<string, string[][]>();

    uploadState.forEach((item: any) => {
      const variationId = item.variationId;
      const images = item.input
        .filter((image: any) => image.status === 'done')
        .map((image: any) => image.remoteUrl);

      if (mergedItemsMap.has(variationId)) {
        const existingImages = mergedItemsMap.get(variationId) || [];
        mergedItemsMap.set(variationId, [...existingImages, images]);
      } else {
        mergedItemsMap.set(variationId, [images]);
      }
    });

    const items = Array.from(mergedItemsMap.entries()).map(
      ([variation_id, images]) => ({
        variation_id,
        images: images.length === 1 ? images[0] : images,
      })
    );

    const payload = { items, note };
    try {
      const response = await fetch(
        `${BASE_URL}/pos-orders/${orderId}/upload-images`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        router.push(
          `/success?orderId=${orderId}&linkConfirmOrder=${linkConfirmOrder}`
        );
      } else {
        console.error('Failed to submit order', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting order', error);
    }
  };

  const handleItemClick = (itemId: string) => {
    if (isMobile) {
      setExpandedItem(expandedItem === itemId ? '' : itemId);
    } else {
      setSelectedUpload(itemId);
    }
  };
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

          {/* Progress indicator for mobile - chỉ hiển thị khi có hoạt động upload */}
          {isMobile &&
            uploadState.length > 0 &&
            (uploadState.some((item: any) =>
              item.input.some((img: any) => img.status === 'loading')
            ) ||
              uploadState.some((item: any) =>
                item.input.some((img: any) => img.status === 'error')
              )) && (
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Tiến độ upload
                  </span>
                  <span className="text-sm text-gray-600">
                    {uploadState.reduce(
                      (acc: number, item: any) =>
                        acc +
                        item.input.filter((img: any) => img.status === 'done')
                          .length,
                      0
                    )}
                    /
                    {uploadState.reduce(
                      (acc: number, item: any) =>
                        acc +
                        (item.allow_merge_image
                          ? item.imageLimit * item.quantity
                          : item.imageLimit),
                      0
                    )}{' '}
                    ảnh
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (uploadState.reduce(
                          (acc: number, item: any) =>
                            acc +
                            item.input.filter(
                              (img: any) => img.status === 'done'
                            ).length,
                          0
                        ) /
                          uploadState.reduce(
                            (acc: number, item: any) =>
                              acc +
                              (item.allow_merge_image
                                ? item.imageLimit * item.quantity
                                : item.imageLimit),
                            0
                          )) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>

                {/* Upload status details */}
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {uploadState.some((item: any) =>
                    item.input.some((img: any) => img.status === 'loading')
                  ) && (
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-yellow-700">
                      🔄{' '}
                      {uploadState.reduce(
                        (acc: number, item: any) =>
                          acc +
                          item.input.filter(
                            (img: any) => img.status === 'loading'
                          ).length,
                        0
                      )}{' '}
                      đang tải
                    </span>
                  )}
                  {uploadState.some((item: any) =>
                    item.input.some((img: any) => img.status === 'error')
                  ) && (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-red-700">
                      ⚠️{' '}
                      {uploadState.reduce(
                        (acc: number, item: any) =>
                          acc +
                          item.input.filter(
                            (img: any) => img.status === 'error'
                          ).length,
                        0
                      )}{' '}
                      lỗi
                    </span>
                  )}
                  {uploadState.reduce(
                    (acc: number, item: any) =>
                      acc +
                      item.input.filter((img: any) => img.status === 'done')
                        .length,
                    0
                  ) > 0 && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-green-700">
                      ✅{' '}
                      {uploadState.reduce(
                        (acc: number, item: any) =>
                          acc +
                          item.input.filter((img: any) => img.status === 'done')
                            .length,
                        0
                      )}{' '}
                      hoàn thành
                    </span>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Mobile Note */}
      <div className="flex h-28 items-center bg-pampas px-7 lg:hidden">
        <p className="w-full text-left text-gray-100">
          {languages.get('product.detail.status.mobileNote')}
        </p>
      </div>

      {/* Order List */}
      <div className={`${isMobile ? 'pb-4' : 'h-3/4'} overflow-y-auto`}>
        {uploadState.length > 0 &&
          uploadState.map(
            (order: any) =>
              order?.imageLimit > 0 && (
                <div
                  key={order?.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <OrderItemCard
                    imageSrc={order?.image}
                    title={order?.name}
                    detail={order?.detail}
                    selectedCount={order?.input?.length}
                    totalCount={
                      order?.allow_merge_image
                        ? order?.imageLimit * order?.quantity
                        : order?.imageLimit
                    }
                    status={
                      isMobile
                        ? expandedItem === order?.id
                          ? 'active'
                          : 'click'
                        : order?.id === selectedUpload
                          ? 'active'
                          : 'click'
                    }
                    onClick={() => handleItemClick(order?.id)}
                    isMobile={isMobile}
                    isExpanded={expandedItem === order?.id}
                    uploadedCount={
                      order?.input?.filter((img: any) => img.status === 'done')
                        .length || 0
                    }
                    loadingCount={
                      order?.input?.filter(
                        (img: any) => img.status === 'loading'
                      ).length || 0
                    }
                    errorCount={
                      order?.input?.filter((img: any) => img.status === 'error')
                        .length || 0
                    }
                  />

                  {/* Mobile upload section */}
                  {isMobile && expandedItem === order?.id && (
                    <div className="px-4 pb-4">
                      <MobileGalleryItem
                        selectedItem={order}
                        isAllowSubmit={isAllowSubmit}
                        onUpload={handleMobileUpload}
                        onRemove={handleMobileRemove}
                        onRetry={handleMobileRetry}
                        previewImages={order?.input || []}
                        maxUploadLimit={
                          order?.allow_merge_image
                            ? order?.imageLimit * order?.quantity
                            : order?.imageLimit
                        }
                      />
                    </div>
                  )}
                </div>
              )
          )}
      </div>

      {/* Mobile Submit Button */}
      {isMobile && isAllowSubmit && (
        <div className="sticky bottom-0 z-10 border-t border-stroke bg-white px-6 py-4 shadow-lg">
          {/* Submit status summary - chỉ hiển thị khi có hoạt động upload */}
          {(uploadState.some((item: any) =>
            item.input.some((img: any) => img.status === 'loading')
          ) ||
            uploadState.some((item: any) =>
              item.input.some((img: any) => img.status === 'error')
            )) && (
            <div className="mb-3 text-center text-sm">
              {uploadState.every((item: any) => {
                const successfulUploads = item.input.filter(
                  (img: any) => img.status === 'done'
                ).length;
                const requiredUploads = item.allow_merge_image
                  ? item.imageLimit * item.quantity
                  : item.imageLimit;
                return successfulUploads >= requiredUploads;
              }) ? (
                <span className="text-green-600">
                  ✅ Tất cả sản phẩm đã tải lên đủ ảnh
                </span>
              ) : (
                <span className="text-orange-600">
                  ⏳ Còn{' '}
                  {
                    uploadState.filter((item: any) => {
                      const successfulUploads = item.input.filter(
                        (img: any) => img.status === 'done'
                      ).length;
                      const requiredUploads = item.allow_merge_image
                        ? item.imageLimit * item.quantity
                        : item.imageLimit;
                      return successfulUploads < requiredUploads;
                    }).length
                  }{' '}
                  sản phẩm cần upload thêm ảnh
                </span>
              )}
            </div>
          )}

          {/* Note input */}
          <div className="mb-3">
            <label
              htmlFor="note"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Ghi chú (tùy chọn)
            </label>
            <textarea
              id="note"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Nhập ghi chú cho đơn hàng..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              rows={3}
              maxLength={500}
            />
            <div className="mt-1 text-right text-xs text-gray-500">
              {note.length}/500 ký tự
            </div>
          </div>

          <button
            className="w-full rounded-lg bg-primary px-6 py-3 font-semibold uppercase text-white shadow-md transition-all hover:bg-opacity-90 active:scale-95 disabled:bg-gray-300 disabled:text-gray-500"
            onClick={submitOrder}
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="flex items-center justify-center">
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Đang xử lý...
              </div>
            ) : (
              languages.get('product.detail.status.buttonDone')
            )}
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
