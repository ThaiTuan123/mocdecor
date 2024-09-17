import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import images from '@/configs/images';
import {isImageLoadedState} from "@/recoil/atoms/imageLoadAtom";

export function useImageLoad() {
    const [isImageLoaded, setIsImageLoaded] = useRecoilState(isImageLoadedState);

    useEffect(() => {
        const img = new Image();
        img.src = images.backgrounds.heroContact;
        img.onload = () => setIsImageLoaded(true);
    }, [setIsImageLoaded]);

    return isImageLoaded;
}
