import React, { useEffect } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

interface ToastProps {
  message: string;
  duration?: number; // thời gian toast tồn tại (ms)
  onClose: () => void;
  isError?: boolean;
}

const ToastMessage: React.FC<ToastProps> = ({
  message,
  duration = 1000,
  onClose,
  isError,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Tự động tắt toast sau `duration` ms
    }, duration);

    return () => clearTimeout(timer); // Dọn dẹp timeout khi component unmount
  }, [duration, onClose]);

  return (
    <div
      className={`animate-slide-in fixed bottom-5 left-5 z-50 flex transform items-center gap-3 rounded-lg ${isError ? 'bg-red-500' : 'bg-green-500'} p-4 text-white shadow-lg transition-transform`}
    >
      <AiOutlineCheck className="text-2xl" />
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default ToastMessage;
