import React, {useRef} from "react";
import LabelValueProductDetail from "@/components/texts/LabelValueProductDetail";
import languages from "@/configs/languages";
import useImageManager from "@/recoil/hooks/useImageManager";
import RemoveImageButton from "@/components/button/RemoveImageButton";
import AddImageButton from "@/components/button/AddImageButton";
import {initialImages} from "@/app/gallery/initialImages";
import Image from "next/image";

export default function GalleryItem() {
    const {images, removeImage, handleAddImage} = useImageManager(initialImages);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddImageClick = () => {
        // Trigger the file input click event
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    /*TODO check handle File >5*/
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // Add the selected image to the gallery
                if (reader.result) {
                    handleAddImage(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full lg:w-2/3 border bg-white border-stroke rounded ml-0 lg:ml-4">
            {/* Header */}
            <div className="py-5 px-6 lg:px-7 border-b border-stroke">
                <h2 className="text-xl font-semibold mb-4 text-primary">{languages.get('product.detail.title')}</h2>
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
            <div className="px-6 lg:px-8 py-8 lg:max-h-540 overflow-y-auto">
                <h3 className="text-sm font-medium mb-4">{languages.get('product.detail.status.upload')}</h3>
                <div className="grid grid-cols-3 gap-4 bg-gray-200 px-3 py-4 lg:p-5">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <Image
                                width={200}
                                height={150}
                                src={image}
                                alt={`Uploaded image ${index}`}
                                className="w-full h-100 lg:h-150 object-cover rounded"
                            />
                            <RemoveImageButton onClick={() => removeImage(index)}/>
                        </div>
                    ))}
                    <div
                        className="relative w-full h-100 lg:h-150 flex items-center justify-center border-2 border-dashed border-gray-400 rounded">
                        <AddImageButton onClick={handleAddImageClick}/>
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

                <p className="text-lg text-gray-100 mt-2">
                    <strong
                        className="text-black">{languages.get('product.detail.status.note')}
                    </strong> {languages.get('product.detail.status.noteDetail')}
                </p>

                {/* Notes Section */}
                <div className="mt-6">
                    <h3 className="text-sm font-medium mb-4 uppercase">{languages.get('product.detail.status.message')}</h3>
                    <textarea
                        placeholder={languages.get('product.detail.status.messageDetail')}
                        className="w-full p-2 border rounded resize-none"
                        rows={4}
                    />
                </div>
            </div>

            <div className="px-8 py-8 border-t border-stroke">
                <button className="bg-black-50 hover:bg-gray-400 text-black-300 py-2 px-6 rounded w-full uppercase">
                    {languages.get('product.detail.status.buttonDone')}
                </button>
            </div>
        </div>
    );
}
