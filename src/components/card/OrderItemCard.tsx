import React from 'react';
import imagesIcons from '@/configs/images';
import Image from 'next/image';

interface OrderItemCardProps {
  imageSrc: string;
  title: string;
  selectedCount: number;
  totalCount: number;
  status: string; // Define possible statuses
  onClick: () => void; // Add onClick prop
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  imageSrc,
  title,
  selectedCount,
  totalCount,
  status,
  onClick,
}) => {
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
          className="ml-2 inline-block h-4 w-4"
        />
      );
      break;
    default:
      bgColorClass = 'bg-white';
  }

  return (
    <div
      className={`flex items-start border-b border-t border-stroke px-6 py-4 ${bgColorClass} hover:cursor-pointer hover:bg-gray-200`}
      onClick={onClick}
    >
      <Image
        src={imageSrc}
        width={150}
        height={150}
        alt="Product Image"
        className="size-24 rounded object-cover"
      />
      <div className="ml-3 flex h-24 w-full flex-col justify-between">
        <p className="font-raleway text-sm font-semibold">{title}</p>
        <div className="flex items-center">
          <p className="text-xs text-gray-600">
            Ảnh đã chọn:{' '}
            <strong className="text-black">
              {selectedCount}/{totalCount}
            </strong>
          </p>
          {errorIconElement}
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
