import React from 'react';
import LabelValue from "@/components/texts/LabelValue";
import LabelValueProductDetail from "@/components/texts/LabelValueProductDetail";
import languages from "@/configs/languages";
import {getStatusElement} from "@/utils/helpers/statusHelpers";
import OrderItemCard from "@/components/card/OrderItemCard";
import useImageManager from "@/recoil/hooks/useImageManager";
import RemoveImageButton from "@/components/button/RemoveImageButton";
import AddImageButton from "@/components/button/AddImageButton";
import {initialImages} from "@/app/gallery/initialImages";

export default function FoundGallery() {
    // Use the custom hook
    const {images, removeImage, handleAddImage} = useImageManager(initialImages);

    // New function to handle adding an image from a button click
    const handleAddImageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // You can replace the URL with any logic for adding images (e.g., file upload)
        handleAddImage("https://images.unsplash.com/photo-1606787366850-de6330128bfc");
    };

    return (
        <div className="flex flex-col lg:flex-row  px-6 lg:py-9 lg:px-20 2xl:px-36 ">
            {/* Left Section - Thông tin đơn hàng */}
            <div className="w-full lg:w-1/3 border border-stroke bg-white rounded ">
                <div className='pt-5 px-7'>
                    <h2 className=" text-xl font-semibold mb-4 text-primary">{languages.get('product.detail.title')}</h2>
                    <div className="mb-4 flex flex-col gap-y-4">
                        <LabelValue label={languages.get('product.detail.orderId')} value="4353434535362"/>
                        <LabelValue label={languages.get('product.detail.orderDate')} value="12/07/2024"/>
                        <LabelValue
                            label={languages.get('product.detail.status')}
                            value={getStatusElement(languages.get('product.detail.status.confirmed'))}
                            isStatus={true}
                        />
                    </div>
                </div>

                {/* Order List */}
                <div className="lg:max-h-540 overflow-y-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <OrderItemCard
                            key={index}
                            imageSrc="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
                            title="Khung Handmade 3D, Set Nguyên liệu Trang trí sẵn size 22x27, 27x27, 27x37..."
                            selectedCount={10}
                            totalCount={40}
                            status={index % 3 === 0 ? 'click' : index % 3 === 1 ? 'error' : 'default'}
                        />
                    ))}
                </div>
            </div>

            {/* Right Section - Chi tiết sản phẩm */}
            <div className="w-full lg:w-2/3 border bg-white border-stroke rounded ml-0 lg:ml-4">
                <div className='py-5 px-6 lg:px-7 border-b border-stroke'>
                    <h2 className="text-xl font-semibold mb-4 text-primary">{languages.get('product.detail.title')}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className='flex flex-col justify-between lg:gap-4'>
                            <LabelValueProductDetail label={languages.get('product.detail.status.classify')}
                                                     value="Set nguyên liệu tự trang trí"/>
                            <LabelValueProductDetail label={languages.get('product.detail.status.color')}
                                                     value="Xanh dương"/>
                            <LabelValueProductDetail label={languages.get('product.detail.status.size')}
                                                     value="22x22cm (15x15cm khung)"/>
                        </div>
                        <div className='ml-0 lg:ml-16'>
                            <LabelValueProductDetail label={languages.get('product.detail.status.quantity')}
                                                     value="10"/>
                        </div>
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="px-6 lg:px-8 py-8 lg:max-h-540 overflow-y-auto">
                    <h3 className="text-sm font-medium mb-4">{languages.get('product.detail.status.upload')}</h3>
                    <div className="grid grid-cols-3 gap-4 bg-gray-200 px-3 py-4 lg:p-5">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image}
                                    alt={`Uploaded image ${index}`}
                                    className="w-full h-100 lg:h-150 object-cover rounded"
                                />
                                <RemoveImageButton onClick={() => removeImage(index)}/>
                            </div>
                        ))}
                        {/* Add Image Button */}
                        <div
                            className="relative w-full h-100 lg:h-150 flex items-center justify-center border-2 border-dashed border-gray-400 rounded">
                            <AddImageButton onClick={handleAddImageClick}/>
                        </div>
                    </div>

                    <p className="text-lg text-gray-100 mt-2">
                        <strong
                            className="text-black">{languages.get('product.detail.status.note')}</strong> {languages.get('product.detail.status.noteDetail')}
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
        </div>
    );
}
