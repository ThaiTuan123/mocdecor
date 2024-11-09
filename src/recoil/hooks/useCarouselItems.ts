// src/hooks/useCarouselItems.ts
import {atom, selector} from 'recoil';
import {CarouselItem} from "@/components/carousel/types";
import {fetchBannerItems} from "@/services/api";

export const carouselItemsState = atom<CarouselItem[]>({
    key: 'carouselItemsState',
    default: selector({
        key: 'carouselItemsSelector',
        get: async () => {
            try {
                const data = await fetchBannerItems();
                return data.map((item: any) => ({
                    id: item._id,
                    title: item.name,
                    imageUrl: item.image,
                }));
            } catch (error) {
                console.error('Error fetching banner data:', error);
                return [];
            }
        },
    }),
});
