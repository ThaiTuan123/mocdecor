'use client'; // This makes the component a client component

import React from 'react';
import Image from 'next/image';
import { FaCopy } from 'react-icons/fa'; // Import the copy icon from react-icons
import usePopupSuccess from '@/recoil/hooks/usePopupSuccess';

interface PaymentSuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageSrc: string;
  orderCode: string; // Add a new prop for the order code
}

const PaymentSuccessPopup: React.FC<PaymentSuccessPopupProps> = ({
  isVisible,
  onClose,
  title,
  description,
  imageSrc,
  orderCode, // Destructure the new prop
}) => {
  const timeRemaining = usePopupSuccess(isVisible, onClose); // Use the custom hook

  // Function to handle copy action
  const handleCopy = () => {
    navigator.clipboard.writeText(orderCode); // Copy order code to clipboard
    alert('Mã đơn hàng đã được sao chép!'); // Optional: Display a confirmation message
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 rounded-lg bg-white p-6 shadow-lg">
        <Image
          src={imageSrc}
          width={184}
          height={184}
          alt={title}
          className="mx-auto"
        />
        <h3 className="my-4 text-center text-2xl text-primary">
          TIẾN TRÌNH THANH TOÁN HOÀN TẤT!
        </h3>
        <p className="text-center text-lg text-gray-700">
          Cảm ơn bạn đã tin tưởng đặt hàng tại Mộc Decor. Bạn sẽ được chuyển đến
          trang Tải Ảnh trong{' '}
          <span className="text-loading-text"> {timeRemaining} </span> giây.
        </p>
        <div className="mt-4 flex items-center justify-center">
          <p className="mr-2 text-lg text-gray-700">
            Mã đơn hàng: <span className="font-bold">{orderCode}</span>
          </p>
          <button onClick={handleCopy} aria-label="Copy order code">
            <FaCopy className="cursor-pointer text-gray-600 hover:text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPopup;
