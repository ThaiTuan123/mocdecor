// components/SuccessPopup.tsx
import React from 'react';

interface SuccessPopupProps {
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-500 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <p className="mb-4 text-xl font-semibold">
          Sản phẩm đã được thêm vào Giỏ hàng
        </p>
        <div className="text-sm text-gray-600">
          <p>
            Đã thêm thành công. Bạn có thể tiếp tục mua sắm hoặc xem giỏ hàng.
          </p>
        </div>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="rounded-full bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
