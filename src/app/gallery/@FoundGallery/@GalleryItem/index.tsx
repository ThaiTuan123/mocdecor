import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import AddImageButton from '@/components/button/AddImageButton';
import RemoveImageButton from '@/components/button/RemoveImageButton';
import Image from 'next/image';
import languages from '@/configs/languages';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/utils/constants';

interface PreviewImage {
  id: string;
  file: File | null;
  url: string;
  status: string;
  remoteUrl: string | null;
}

interface SelectedItem {
  id?: string;
  input: PreviewImage[];
  countSelected: number;
}

interface GalleryItemProps {
  uploadState: any;
  setUploadState: React.Dispatch<any>;
  selectedUpload: any;
  setSelectedUpload: Dispatch<SetStateAction<any>>;
  orderData: any;
  orderId: string;
}

export default function GalleryItem({
  uploadState,
  setUploadState,
  selectedUpload,
  setSelectedUpload,
  orderData,
  orderId,
}: GalleryItemProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    input: [],
    countSelected: 0,
  });
  const [previewImages, setPreviewImages] = useState<
    { id: string; file: File | null; url: string; status: string }[]
  >([]);
  const [uploadQueue, setUploadQueue] = useState<
    { id: string; file: File; tabId: string }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAllowSubmit, setIsAllowSubmit] = useState(false);
  const [maxUploadLimit, setMaxUploadLimit] = useState(1);
  const [currentUploadLimit, setCurrentUploadLimit] = useState(1);

  const MAX_BATCH_SIZE = 5;
  const MAX_FILE_SIZE_MB = 60;

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
    if (selectedUpload) {
      const item = uploadState.find((it: any) => it.id === selectedUpload);
      setSelectedItem(item || { input: [], countSelected: 0 });
      setMaxUploadLimit(item?.imageLimit);
      setCurrentUploadLimit(item?.imageLimit);
      setPreviewImages(item?.input || []);
    }
  }, [selectedUpload, uploadState]);

  useEffect(() => {
    if (uploadQueue.length > 0 && !isUploading) {
      const batch = uploadQueue.slice(0, MAX_BATCH_SIZE);
      uploadBatch(batch);
    }
  }, [uploadQueue, isUploading]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter(file => {
      const fileType = file.type.toLowerCase();
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(fileType)) {
        toast.error(
          `File ${file.name} không phải là ảnh hợp lệ. Chỉ chấp nhận các định dạng jpg, jpeg, png.`
        );
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File ${file.name} vượt quá giới hạn 60MB.`);
        return false;
      }
      return true;
    });

    const totalSelectedImages = previewImages.length + validFiles.length;
    if (totalSelectedImages > maxUploadLimit) {
      toast.error(`Bạn chỉ được chọn tối đa ${maxUploadLimit} ảnh.`);
      return;
    }

    const newPreviews = Array.from(files).map(file => ({
      id: `${file.name}-${Date.now()}`,
      file: file,
      url: URL.createObjectURL(file),
      remoteUrl: null,
      status: 'loading',
    }));

    setPreviewImages(prev => [...prev, ...newPreviews]);
    setSelectedItem((prev: any) => ({
      ...prev,
      input: [...prev.input, ...newPreviews],
      countSelected: prev.countSelected + newPreviews.length,
    }));
    setUploadState((prev: any[]) =>
      prev.map(item =>
        item.id === selectedItem.id
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
        tabId: selectedUpload,
      })),
    ]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadBatch = async (
    batch: { id: string; file: File; tabId: string }[]
  ) => {
    setIsUploading(true);
    for (const { id, file, tabId } of batch) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('https://cdn.mocdecor.org/single', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          updateImageStatus(id, 'done', result.paths, tabId);
        } else {
          // console.error('Upload failed', response.statusText);
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
    setPreviewImages(prev =>
      prev.map(image =>
        image.id === id ? { ...image, status, remoteUrl } : image
      )
    );
    setSelectedItem(prev => ({
      ...prev,
      input: prev.input.map(image =>
        image.id === id ? { ...image, status, remoteUrl } : image
      ),
    }));

    setUploadState((prev: any[]) =>
      prev.map(item =>
        item.id === tabId
          ? {
              ...item,
              input: item.input.map(
                (image: {
                  id: string;
                  file: File | null;
                  url: string;
                  status: string;
                }) =>
                  image.id === id ? { ...image, status, remoteUrl } : image
              ),
            }
          : item
      )
    );
  };

  const removeImage = (id: string) => {
    setPreviewImages(prev => prev.filter(image => image.id !== id));
    setSelectedItem((prev: SelectedItem) => ({
      ...prev,
      input: prev.input.filter((image: any) => image.id !== id),
      countSelected: prev.countSelected - 1,
    }));
    setUploadState((prev: any[]) =>
      prev.map(item =>
        item.id === selectedItem.id
          ? {
              ...item,
              input: item.input.filter((image: any) => image.id !== id),
              countSelected: item.countSelected - 1,
            }
          : item
      )
    );
  };

  const submitOrder = async () => {
    const note = (document.getElementById('note') as HTMLTextAreaElement)
      ?.value;
    const allItemsComplete = uploadState.every(
      (item: any) => item.input.length === item.imageLimit
    );

    if (!allItemsComplete) {
      toast.error(
        'Bạn cần upload đầy đủ ảnh cho tất cả các sản phẩm trước khi xác nhận.'
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
        console.log('Order submitted successfully');
        router.push(`/success?orderId=${orderId}`);
      } else {
        console.error('Failed to submit order', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting order', error);
    }
  };

  return (
    <div className="ml-0 w-full rounded border border-stroke bg-white lg:ml-4 lg:w-2/3">
      <div className="border-b border-stroke px-6 py-5 lg:px-7">
        <h2 className="mb-4 text-xl font-semibold text-primary">
          Chi tiết sản phẩm
        </h2>
      </div>

      <div className="overflow-y-auto px-6 py-8 lg:max-h-540 lg:px-8">
        <div className="grid grid-cols-3 gap-4 bg-gray-200 px-3 py-4 lg:p-5">
          {previewImages.map(image => (
            <div key={image.id} className="relative">
              <Image
                width={200}
                height={150}
                src={image.url}
                alt={`Preview ${image.id}`}
                className="h-100 w-full rounded object-cover lg:h-150"
              />
              {image.status === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                  <span
                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-primary"
                    aria-label="Loading"
                  ></span>
                </div>
              )}
              {image.status === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-90">
                  <span
                    className="inline-block text-2xl text-red-900"
                    aria-label="Error"
                  >
                    !
                  </span>
                </div>
              )}
              {isAllowSubmit && (
                <RemoveImageButton onClick={() => removeImage(image.id)} />
              )}
            </div>
          ))}
          {previewImages.length < maxUploadLimit && (
            <div className="relative flex h-100 w-full items-center justify-center rounded border-2 border-dashed border-gray-400 lg:h-150">
              <AddImageButton
                onClick={() => fileInputRef.current?.click()}
                imageLimit={currentUploadLimit}
              />
            </div>
          )}
        </div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileChange}
        />

        <p className="mt-2 text-lg text-gray-100">
          <strong className="text-black">
            {languages.get('product.detail.status.note')}
          </strong>{' '}
          {languages.get('product.detail.status.noteDetail')}
        </p>

        {/* Notes Section */}
        <div className="mt-6">
          <p className="mb-4 text-sm font-medium uppercase">
            {languages.get('product.detail.status.message')}
          </p>
          <textarea
            id="note"
            placeholder={languages.get('product.detail.status.messageDetail')}
            className="w-full resize-none rounded border p-2"
            rows={4}
          />
        </div>
      </div>

      {isAllowSubmit && (
        <div className="border-t border-stroke px-8 py-8">
          <button
            className="w-full rounded bg-black-50 px-6 py-2 uppercase text-black-300 hover:bg-gray-400 disabled:bg-gray-300 disabled:text-gray-500"
            onClick={submitOrder}
          >
            {languages.get('product.detail.status.buttonDone')}
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
