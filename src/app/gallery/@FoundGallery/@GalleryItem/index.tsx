import React, { useEffect, useRef, useState } from 'react';
import LabelValueProductDetail from '@/components/texts/LabelValueProductDetail';
import languages from '@/configs/languages';
import useImageManager from '@/recoil/hooks/useImageManager';
import AddImageButton from '@/components/button/AddImageButton';
import { initialImages } from '@/app/gallery/initialImages';

interface GalleryItemProps {
  uploadState: any;
  setUploadState: React.Dispatch<any>;
  selectedUpload: string;
}

export default function GalleryItem({
                                      uploadState,
                                      setUploadState,
                                      selectedUpload,
                                    }: GalleryItemProps) {
  const { handleAddImage } = useImageManager(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [images, setImages] = useState([]);

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (selectedUpload) {
      const item = uploadState.find((it: any) => it.id == selectedUpload);
      setSelectedItem(item);
    }
  }, [selectedUpload]);

  // TODO removeImage @Lâm
  const removeImage = (index: number) => {
    setSelectedItem((prev) => {
      const updatedInput = prev.input.filter((_, i) => i !== index);
      const updatedItem = { ...prev, input: updatedInput, countSelected: updatedInput.length };

      setUploadState((uploadStatePrev) =>
        uploadStatePrev.map((item) =>
          item.id === updatedItem.id ? updatedItem : item,
        ),
      );

      return updatedItem;
    });
  };

  /*TODO check handle File >5*/
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    if (files.length > 5) {
      alert('Bạn chỉ được tải lên tối đa 5 hình cùng một lúc.');
      return;
    }

    /*    TODO uploadSingle @Lâm*/
    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setSelectedItem((prev) => {
              const updatedInput = [...(prev.input || []), ...newImages];
              if (updatedInput.length > 40) {
                alert('Bạn chỉ được tải lên tối đa 40 hình.');
                return prev;
              }
              const updatedItem = {
                ...prev,
                input: updatedInput,
                countSelected: updatedInput.length,
              };
              setUploadState((prev) =>
                prev.map((item) =>
                  item.id === updatedItem.id ? updatedItem : item,
                ),
              );
              return updatedItem;
            });
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }

  const handleUploadImage = async () => {
  };

  return (
    <div className="ml-0 w-full rounded border border-stroke bg-white lg:ml-4 lg:w-2/3">
      {/* Header */}
      <div className="border-b border-stroke px-6 py-5 lg:px-7">
        <h2 className="mb-4 text-xl font-semibold text-primary">
          {languages.get('product.detail.title')}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-between lg:gap-4">
            <LabelValueProductDetail
              label={languages.get('product.detail.status.classify')}
              value="Set nguyên liệu tự trang trí"
            />
            <LabelValueProductDetail
              label={languages.get('product.detail.status.color')}
              value="Xanh dương"
            />
            <LabelValueProductDetail
              label={languages.get('product.detail.status.size')}
              value="22x22cm (15x15cm khung)"
            />
          </div>
          <div className="ml-0 lg:ml-16">
            <LabelValueProductDetail
              label={languages.get('product.detail.status.quantity')}
              value="10"
            />
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="overflow-y-auto px-6 py-8 lg:max-h-540 lg:px-8">
        <h3 className="mb-4 text-sm font-medium">
          {languages.get('product.detail.status.upload')}
        </h3>
        <div className="grid grid-cols-3 gap-4 bg-gray-200 px-3 py-4 lg:p-5">
          {/*TODO @lam */}
          {selectedItem && selectedItem.input &&
            selectedItem.input.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  width={200}
                  height={150}
                  src={image}
                  alt={`Uploaded image ${index}`}
                  className="w-full h-100 lg:h-150 object-cover rounded"
                />
                //TODO RemoveImageButton @Lâm
                <RemoveImageButton onClick={() => removeImage(index)} />
              </div>
            ))}
          <div
            className="relative flex h-100 w-full items-center justify-center rounded border-2 border-dashed border-gray-400 lg:h-150">
            <AddImageButton onClick={handleAddImageClick} />
          </div>
        </div>

        {/*TODO Hidden File Input */}
        <input
          type="file"
          accept="image/*"
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
          <h3 className="mb-4 text-sm font-medium uppercase">
            {languages.get('product.detail.status.message')}
          </h3>
          <textarea
            placeholder={languages.get('product.detail.status.messageDetail')}
            className="w-full resize-none rounded border p-2"
            rows={4}
          />
        </div>
      </div>

      <div className="border-t border-stroke px-8 py-8">
        <button
          className="w-full rounded bg-black-50 px-6 py-2 uppercase text-black-300 hover:bg-gray-400"
          onClick={handleUploadImage}
        >
          {languages.get('product.detail.status.buttonDone')}
        </button>
      </div>
    </div>
  );
};
}