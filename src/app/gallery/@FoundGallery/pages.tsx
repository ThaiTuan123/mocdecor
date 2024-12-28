import GalleryCategory from '@/app/gallery/@FoundGallery/@GalleryCategory';
import GalleryItem from '@/app/gallery/@FoundGallery/@GalleryItem';
import { useEffect, useRef, useState } from 'react';
import data from '../mock.json';

export default function FoundGallery() {
  const isFirstLoad = useRef(true);
  const [dataGallery, setDataGallery] = useState([]);
  const [uploadState, setUploadState] = useState<any>([]);
  const [selectedUpload, setSelectedUpload] = useState('');

  useEffect(() => {
    const initState = data.flatMap(item =>
      Array.from({ length: item.quantity }, (_, index) => ({
        id: `${item.id}-${index + 1}`,
        input: [],
        name: item.variation_info.name,
        image: item.images[0],
        type: item.variation_info.fields[0].value,
        color: item.variation_info.fields[1].value,
        size: item.variation_info.fields[2].value,
        countSelected: 0,
      }))
    );
    setUploadState(initState);
  }, []);

  useEffect(() => {
    if (uploadState.length && isFirstLoad.current) {
      setSelectedUpload(uploadState[0].id);
      isFirstLoad.current = false;
    }
  }, [uploadState]);

  return (
    <div className="flex flex-col lg:flex-row lg:px-20 lg:py-9 2xl:px-36">
      {/* Left Section - Gallery Category */}
      <GalleryCategory
        uploadState={uploadState}
        setUploadState={setUploadState}
        setSelectedUpload={setSelectedUpload}
      />

      {/* Right Section - Gallery Item */}
      <GalleryItem
        uploadState={uploadState}
        setUploadState={setUploadState}
        setSelectedUpload={setSelectedUpload}
        selectedUpload={selectedUpload}
      />
    </div>
  );
}