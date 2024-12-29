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
}: GalleryItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedItem, setSelectedItem] = useState<any>({});

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (selectedUpload) {
      const item = uploadState.find((it: any) => it.id == selectedUpload);
      setSelectedItem(item);
    }
  }, [selectedUpload]);

  const removeImage = (index: number) => {
    setSelectedItem((prev: any) => {
      const updatedInput = prev.input.filter(
        (_: any, i: number) => i !== index
      );
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
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    if (files.length > 5) {
      alert('Bạn chỉ được tải lên tối đa 5 hình cùng một lúc.');
      return;
    }

    const newImages: string[] = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setSelectedItem((prev: any) => {
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
              setUploadState((prev: any) =>
                prev.map((item: any) =>
                  item.id === updatedItem.id ? updatedItem : item
                )
              );
              return updatedItem;
            });
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUploadImage = async () => {};

  return (
    <div className="ml-0 w-full rounded border border-stroke bg-white lg:ml-4 lg:w-2/3">
      {/* Header */}
      <div className="border-b border-stroke px-6 py-5 lg:px-7">
        <h2 className="mb-4 text-xl font-semibold text-primary">
          {languages.get('product.detail.title')}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-between lg:gap-4">
            {selectedItem &&
              selectedItem?.field &&
              selectedItem?.field.length > 0 &&
              selectedItem?.field.map((item: any, index: number) => (
                <LabelValueProductDetail
                  key={index}
                  label={item?.name}
                  value={item?.value}
                />
              ))}
          </div>
          {/* <div className="ml-0 lg:ml-16">
            <LabelValueProductDetail
              label={languages.get('product.detail.status.quantity')}
              value="10"
            />
          </div> */}
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="overflow-y-auto px-6 py-8 lg:max-h-540 lg:px-8">
        <p className="mb-4 text-sm font-medium">
          {languages.get('product.detail.status.upload')}
        </p>
        <div className="grid grid-cols-3 gap-4 bg-gray-200 px-3 py-4 lg:p-5">
          {/*TODO @lam */}
          {selectedItem &&
            selectedItem.input &&
            selectedItem.input.map((image: string, index: number) => (
              <div key={index} className="relative">
                <Image
                  width={200}
                  height={150}
                  src={image}
                  alt={`Uploaded image ${index}`}
                  className="h-100 w-full rounded object-cover lg:h-150"
                />
                <RemoveImageButton onClick={() => removeImage(index)} />
              </div>
            ))}
          <div className="relative flex h-100 w-full items-center justify-center rounded border-2 border-dashed border-gray-400 lg:h-150">
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
          <p className="mb-4 text-sm font-medium uppercase">
            {languages.get('product.detail.status.message')}
          </p>
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
}
