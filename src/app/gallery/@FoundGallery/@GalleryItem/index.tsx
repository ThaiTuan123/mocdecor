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
  >([]); // Lưu các ảnh được chọn kèm ID và URL preview
  const [uploadStatuses, setUploadStatuses] = useState<Record<string, boolean>>(
    {}
  ); // Trạng thái upload của từng ảnh, key là id của ảnh
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // Lưu URL ảnh sau khi upload thành công

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

  const uploadFiles = async (
    files: { id: string; file: File; url: string }[]
  ) => {
    const urls: string[] = [];

    for (const fileObject of files) {
      const { id, file } = fileObject;
      const formData = new FormData();
      formData.append('file', file);

      setUploadStatuses(prev => ({ ...prev, [id]: true })); // Đánh dấu đang upload

      try {
        const response = await fetch('https://cdn.mocdecor.org/multi', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          urls.push(result.paths); // Giả định server trả về URL ảnh
        } else {
          console.error(
            `Tải lên thất bại cho file: ${file.name}`,
            response.statusText
          );
          alert(`Tải lên thất bại cho file: ${file.name}`);
        }
      } catch (error) {
        console.error(`Lỗi khi tải lên file: ${file.name}`, error);
        alert(`Lỗi khi tải lên file: ${file.name}`);
      } finally {
        setUploadStatuses(prev => ({ ...prev, [id]: false })); // Upload xong (hoặc thất bại)
      }
    }

    return urls;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    // Tạo danh sách file và URL preview
    const newPreviews = Array.from(files).map(file => ({
      id: `${file.name}-${Date.now()}`, // Tạo ID duy nhất
      file,
      url: URL.createObjectURL(file),
    }));

    // Thêm ảnh mới vào cuối danh sách preview
    setPreviewImages(prev => [...prev, ...newPreviews]);

    // Upload các file được chọn
    const uploadedUrls = await uploadFiles(newPreviews);

    // Thêm URL ảnh vào state `selectedItem` và `uploadedImages`
    setSelectedItem((prev: any) => {
      const updatedInput = [...(prev.input || []), ...uploadedUrls];
      if (updatedInput.length > 40) {
        alert('Bạn chỉ được tải lên tối đa 40 hình.');
        return prev;
      }

      const updatedItem = {
        ...prev,
        input: updatedInput,
        countSelected: updatedInput.length,
      };

      setUploadState((prev: any) =>
        prev.map((item: any) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      return updatedItem;
    });

    setUploadedImages(prev => [...prev, ...uploadedUrls]); // Lưu danh sách URL ảnh sau khi upload
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
              {uploadStatuses[image.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                  <span
                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-primary"
                    aria-label="Loading"
                  ></span>
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
