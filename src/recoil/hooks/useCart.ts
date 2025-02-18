// useCart.ts

import { useEffect, useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { fetchCart } from '@/services/api';
import { cartState } from '../atoms/cartAtom';

const useCart = (browserId: string | null) => {
  const [cart, setCart] = useRecoilState(cartState);
  const [loading, setLoading] = useState<boolean>(true);

  const loadCart = useCallback(async () => {
    if (!browserId) return;
    setLoading(true);
    try {
      const carts = await fetchCart(browserId);
      if (carts && Array.isArray(carts)) {
        setCart(carts);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  }, [browserId, setCart]);


  useEffect(() => {
    if (browserId) {
      loadCart(); 
    }
  }, [browserId, loadCart]);

  return {
    cart,
    loading,
    refetchCart: loadCart,
  };
};

export default useCart;
