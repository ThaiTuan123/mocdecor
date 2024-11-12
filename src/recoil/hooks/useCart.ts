import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import { fetchCart} from "@/services/api";
import { cartState } from '../atoms/cartAtom';

const useCart = (browserId: string) : { cart: any; loading: boolean } => {
    const [cart, setCart] = useRecoilState(cartState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getListProduct = async () => {
            setLoading(true);
            try {
                const data = await fetchCart(browserId);
                setCart(data.products);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        getListProduct();
    }, [setCart]);

    return {cart, loading};
};

export default useCart;