// src/hooks/useCarouselItems.ts
import { useEffect } from "react";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";
import { CarouselItem } from "@/components/carousel/types";
import { fetchBannerItems } from "@/services/api";

export const carouselItemsState = atom<CarouselItem[]>({
  key: "carouselItemsState",
  default: [], // Atom chỉ lưu trữ dữ liệu, không xử lý async
});

// Custom hook để fetch dữ liệu và cập nhật atom
export const useFetchCarouselItems = () => {
  const setCarouselItems = useSetRecoilState(carouselItemsState);
  console.log("useFetchCarouselItems called");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBannerItems();
        const items = data.map((item: any) => ({
          id: item._id,
          title: item.name,
          imageUrl: item.image,
        }));
        setCarouselItems(items); // Cập nhật atom sau khi fetch dữ liệu thành công
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setCarouselItems([]); // Đặt giá trị mặc định trong trường hợp lỗi
      }
    };

    fetchData();
  }, [setCarouselItems]);
};
