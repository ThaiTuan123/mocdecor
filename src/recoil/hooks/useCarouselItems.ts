import { atom, useSetRecoilState, useRecoilState } from "recoil";
import { CarouselItem } from "@/components/carousel/types";
import { fetchBannerItems } from "@/services/api";
import {useEffect} from "react";

export const carouselItemsState = atom<CarouselItem[]>({
  key: "carouselItemsState",
  default: [],
});

export const isLoadingState = atom<boolean>({
  key: "isLoadingState",
  default: false,
});

export const useFetchCarouselItems = () => {
  const setCarouselItems = useSetRecoilState(carouselItemsState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBannerItems();
        const items = data.map((item: any) => ({
          id: item._id,
          title: item.name,
          imageUrl: item.image,
        }));
        setCarouselItems(items);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setCarouselItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setCarouselItems, setIsLoading]);
};
