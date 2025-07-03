import React from 'react';
import imagesIcons from '@/configs/images';
import Image from 'next/image';

interface OrderItemCardProps {
  imageSrc: string;
  title: string;
  detail: string;
  selectedCount: number;
  totalCount: number;
  status: string; // Define possible statuses
  onClick: () => void; // Add onClick prop
  isMobile?: boolean;
  isExpanded?: boolean;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  imageSrc,
  title,
  detail,
  selectedCount,
  totalCount,
  status,
  onClick,
  isMobile = false,
  isExpanded = false,
}) => {
  let bgColorClass = '';
  let errorIconElement = null;

  switch (status) {
    case 'active':
      bgColorClass = 'bg-blue-100'; // Thêm màu nền cho trạng thái active
      break;
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
        <div className="flex flex-col gap-2">
          <p className="font-raleway text-sm font-semibold">{title}</p>
          <p className="font-raleway text-sm">{detail}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600">
            Ảnh đã chọn:{' '}
            <strong className="text-black">
              {selectedCount}/{totalCount}
            </strong>
          </p>
          <div className="flex items-center">
            {errorIconElement}
            {isMobile && (
              <div className="ml-2">
                {isExpanded ? (
                  <svg
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
