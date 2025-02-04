import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import LabelValueProductDetail from '@/components/texts/LabelValueProductDetail';
import languages from '@/configs/languages';
import AddImageButton from '@/components/button/AddImageButton';
import RemoveImageButton from '@/components/button/RemoveImageButton';
import Image from 'next/image';

interface GalleryItemProps {
  uploadState: any;
  setUploadState: React.Dispatch<any>;
  selectedUpload: any;
  setSelectedUpload: Dispatch<SetStateAction<any>>;
  orderData: any;
}

export default function GalleryItem({
  uploadState,
  setUploadState,
  selectedUpload,
  orderData,
}: GalleryItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [previewImages, setPreviewImages] = useState<
    { id: string; file: File; url: string }[]
  >([]);
  const [uploadStatuses, setUploadStatuses] = useState<
    Record<string, boolean | 'error'>
  >({});
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const MAX_BATCH_SIZE = 5; // Số lượng ảnh tối đa mỗi lần upload

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (selectedUpload) {
      const item = uploadState.find((it: any) => it.id === selectedUpload);
      setSelectedItem(item);
    }
  }, [selectedUpload]);

  const removeImage = (id: string) => {
    // Loại bỏ ảnh khỏi danh sách preview
    setPreviewImages(prev => prev.filter(image => image.id !== id));

    // Loại bỏ trạng thái upload
    setUploadStatuses(prev => {
      const { [id]: _, ...rest } = prev; // Loại bỏ trạng thái của ảnh bị xoá
      return rest;
    });
  };
  const uploadBatch = async (batch: { id: string; file: File }[]) => {
    const urls: string[] = [];

    for (const { id, file } of batch) {
      const formData = new FormData();
      formData.append('file', file);
      setUploadStatuses(prev => ({ ...prev, [id]: true }));

      try {
        // Upload từng file
        const response = await fetch('http://localhost:3005/single', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          urls.push(result.path);
        } else {
          console.error('Tải lên thất bại', response.statusText);
          alert('Có lỗi xảy ra khi tải lên file.');
          setUploadStatuses(prev => ({ ...prev, [id]: 'error' }));
        }
      } catch (error) {
        console.error('Lỗi khi tải lên file', error);
        setUploadStatuses(prev => ({ ...prev, [id]: 'error' }));
      } finally {
        setUploadStatuses(prev => {
          if (prev[id] !== 'error') {
            return { ...prev, [id]: false };
          }
          return prev;
        });
      }
    }

    return urls;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    const newPreviews = Array.from(files).map(file => ({
      id: `${file.name}-${Date.now()}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviewImages(prev => [...prev, ...newPreviews]);

    let remainingImages = [...newPreviews];
    while (remainingImages.length > 0) {
      const currentBatch = remainingImages.slice(0, MAX_BATCH_SIZE); // Lấy nhóm 5 ảnh đầu tiên
      console.log('currentBatch', currentBatch);
      const uploadedUrls = await uploadBatch(currentBatch); // Upload nhóm ảnh

      setUploadedImages(prev => [...prev, ...uploadedUrls]);

      // Cập nhật `selectedItem.input`
      setSelectedItem((prev: any) => {
        const updatedInput = [...(prev.input || []), ...uploadedUrls];
        const updatedItem = {
          ...prev,
          input: updatedInput,
          countSelected: updatedInput.length,
        };

        setUploadState((uploadStatePrev: any) =>
          uploadStatePrev.map((item: any) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        return updatedItem;
      });

      // Loại bỏ nhóm đã upload khỏi danh sách
      remainingImages = remainingImages.slice(MAX_BATCH_SIZE);
    }
  };

  return (
    <div className="ml-0 w-full rounded border border-stroke bg-white lg:ml-4 lg:w-2/3">
      {/* Header */}
      <div className="border-b border-stroke px-6 py-5 lg:px-7">
        <h2 className="mb-4 text-xl font-semibold text-primary">
          {languages.get('product.detail.title')}
        </h2>
      </div>

      {/* Image Upload Section */}
      <div className="overflow-y-auto px-6 py-8 lg:max-h-540 lg:px-8">
        <div className="grid grid-cols-3 gap-4 bg-gray-200 px-3 py-4 lg:p-5">
          {previewImages.map(image => (
            <div key={image.id} className="relative">
              <Image
                width={200}
                height={150}
                src={image.url}
                alt={`Preview image`}
                className="h-100 w-full rounded object-cover lg:h-150"
              />
              {uploadStatuses[image.id] === true && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                  <span
                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-primary"
                    aria-label="Loading"
                  ></span>
                </div>
              )}
              {uploadStatuses[image.id] === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-90">
                  <span
                    className="inline-block text-2xl text-red-900"
                    aria-label="Error"
                  >
                    !
                  </span>
                </div>
              )}
              <RemoveImageButton onClick={() => removeImage(image.id)} />
            </div>
          ))}
          <div className="relative flex h-100 w-full items-center justify-center rounded border-2 border-dashed border-gray-400 lg:h-150">
            <AddImageButton onClick={handleAddImageClick} />
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
