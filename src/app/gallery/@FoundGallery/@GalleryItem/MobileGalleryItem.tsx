'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import languages from '@/configs/languages';
import AddImageButton from '@/components/button/AddImageButton';
import RemoveImageButton from '@/components/button/RemoveImageButton';

interface PreviewImage {
  id: string;
  file: File | null;
  url: string;
  status: string;
  remoteUrl: string | null;
}

interface SelectedItem {
  id?: string;
  input: PreviewImage[];
  countSelected: number;
  imageLimit: number;
  quantity: number;
  allow_merge_image: boolean;
  variationId: string;
}

interface MobileGalleryItemProps {
  selectedItem: SelectedItem;
  isAllowSubmit: boolean;
  onUpload: (files: File[], itemId: string) => void;
  onRemove: (imageId: string, itemId: string) => void;
  previewImages: PreviewImage[];
  maxUploadLimit: number;
}

const BASE_CDN_URL =
  process.env.NEXT_PUBLIC_CDN_URL || 'https://cdn.example.com';

export default function MobileGalleryItem({
  selectedItem,
  isAllowSubmit,
  onUpload,
  onRemove,
  previewImages,
  maxUploadLimit,
}: MobileGalleryItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE_MB = 60;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter(file => {
      const fileType = file.type.toLowerCase();
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(fileType)) {
        toast.error(
          `File ${file.name} không phải là ảnh hợp lệ. Chỉ chấp nhận các định dạng jpg, jpeg, png.`
        );
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File ${file.name} vượt quá giới hạn 60MB.`);
        return false;
      }
      return true;
    });

    const totalSelectedImages = previewImages.length + validFiles.length;
    if (totalSelectedImages > maxUploadLimit) {
      toast.error(`Bạn chỉ được chọn tối đa ${maxUploadLimit} ảnh.`);
      return;
    }

    if (validFiles.length > 0) {
      onUpload(validFiles, selectedItem.id || '');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="animate-slideDown mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Upload ảnh cho sản phẩm
        </h3>
        <p className="text-sm text-gray-600">
          {previewImages.length}/{maxUploadLimit} ảnh đã chọn
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {previewImages.map(image => (
          <div key={image.id} className="relative">
            <Image
              width={150}
              height={150}
              src={image.url}
              alt={`Preview ${image.id}`}
              className="h-24 w-full rounded-lg object-cover shadow-sm sm:h-32"
            />
            {image.status === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-60">
                <div className="flex flex-col items-center">
                  <span
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary"
                    aria-label="Loading"
                  ></span>
                  <span className="mt-1 text-xs text-white">Đang tải...</span>
                </div>
              </div>
            )}
            {image.status === 'error' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-red-600 bg-opacity-90">
                <span
                  className="inline-block text-2xl text-white"
                  aria-label="Error"
                >
                  ⚠️
                </span>
                <span className="mt-1 text-xs text-white">Lỗi</span>
              </div>
            )}
            {image.status === 'done' && (
              <div className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                <span className="text-xs text-white">✓</span>
              </div>
            )}
            {isAllowSubmit && (
              <RemoveImageButton
                onClick={() => onRemove(image.id, selectedItem.id || '')}
              />
            )}
          </div>
        ))}
        {previewImages.length < maxUploadLimit && (
          <div className="relative flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary sm:h-32">
            <AddImageButton
              onClick={() => fileInputRef.current?.click()}
              imageLimit={maxUploadLimit}
            />
          </div>
        )}
      </div>

      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleFileChange}
      />

      <div className="mt-4 rounded-lg bg-gray-50 p-3">
        <p className="text-sm text-gray-600">
          <strong className="text-gray-800">
            {languages.get('product.detail.status.note')}
          </strong>{' '}
          {languages.get('product.detail.status.noteDetail')}
        </p>
      </div>
    </div>
  );
}
