// src/hooks/useCategories.ts
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FetchMenuResponse } from "@/types/menuType";
import { menuState } from "../atoms/menuAtom";
import { fetchMenu } from "@/services/api";

const useMenu = (): { menu: FetchMenuResponse; loading: boolean } => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMenu = async () => {
      setLoading(true);
      try {
        const data = await fetchMenu();
        setMenu(data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      } finally {
        setLoading(false);
      }
    };

    getMenu();
  }, [setMenu]);

  return { menu, loading };
};

export default useMenu;
