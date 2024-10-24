import React from 'react';
import imagesIcons from "@/configs/images";

interface OrderItemCardProps {
    imageSrc: string;
    title: string;
    selectedCount: number;
    totalCount: number;
    status: 'default' | 'click' | 'error'; // Define possible statuses
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({imageSrc, title, selectedCount, totalCount, status}) => {
    let bgColorClass = '';
    let errorIconElement = null;

    switch (status) {
        case 'click':
            bgColorClass = 'bg-brown-50';
            break;
        case 'error':
            bgColorClass = 'bg-red-100';
            errorIconElement = (
                <img
                    src={imagesIcons.svg.icAlertLine}
                    alt="Error"
                    className="inline-block w-4 h-4 ml-2"
                />
            );
            break;
        default:
            bgColorClass = 'bg-white';
    }

    return (
        <div className={`flex items-start px-6 py-4 border-t border-b border-stroke ${bgColorClass} hover:bg-gray-200`}>
            <img
                src={imageSrc}
                alt="Product Image"
                className="size-24 object-cover rounded"
            />
            <div className="ml-3 h-24 w-full flex flex-col justify-between">
                <p className="font-raleway text-sm font-semibold">{title}</p>
                <div className="flex items-center">
                    <p className="text-xs text-gray-600">
                        Ảnh đã chọn: <strong className='text-black'>{selectedCount}/{totalCount}</strong>
                    </p>
                    {errorIconElement}
                </div>
            </div>
        </div>
    );
};

export default OrderItemCard;