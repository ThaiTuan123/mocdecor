//src/app/gallery/@FoundGallery/pages.tsx
'use client';
import React from 'react';
import GalleryCategory from '@/app/gallery/@FoundGallery/@GalleryCategory';
import GalleryItem from '@/app/gallery/@FoundGallery/@GalleryItem';

export default function FoundGallery() {
  return (
    <div className="flex flex-col lg:flex-row lg:px-20 lg:py-9 2xl:px-36">
      {/* Left Section - Gallery Category */}
      <GalleryCategory />

      {/* Right Section - Gallery Item */}
      <GalleryItem />
    </div>
  );
}
