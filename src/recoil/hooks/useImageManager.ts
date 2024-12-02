import {useState} from 'react';

const useImageManager = (initialImages: string[]) => {
    const [images, setImages] = useState<string[]>(initialImages);

    const removeImage = (index: number) => {
        setImages((prevImages: string[]) => prevImages.filter((_, i) => i !== index));
    };

    const handleAddImage = (imageUrl: string) => {
        setImages((prevImages: string[]) => [...prevImages, imageUrl]);
    };

    const updateImages = (newImages: string[]) => {
        setImages(newImages);
    };

    return {images, removeImage, handleAddImage, updateImages};
};

export default useImageManager;