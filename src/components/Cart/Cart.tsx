import languages from '@/configs/languages';
import React, { useEffect } from 'react';
import CustomButton from '../button/CustomButton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import images from '@/configs/images';
import { formatVietnameseCurrency } from '@/utils';
import LayoutOpacity from '../layoutOpacity';
import useCart from '@/recoil/hooks/useCart';
import CancelButton from '../button/CancelButton';
import { useRecoilState } from 'recoil';
import { cartState } from '@/recoil/atoms/cartAtom';
import { CartItem } from '@/types/cartType';
import { addCart, removeCart, updateCart } from '@/services/api';

interface cartProps {
  totalCart: number;
  setIsShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCart: boolean;
  browserId: string;
  isCartMobile: boolean;
  isShowCartMobile: boolean;
}

const Cart = ({
  setIsShowCart,
  setCartOpen,
  isShowCart,
  browserId,
  isCartMobile,
  totalCart,
  isShowCartMobile,
}: cartProps) => {
  const router = useRouter();
  const { cart, loading } = useCart(browserId);
  const [cartGlobal, setCartGlobal] = useRecoilState(cartState);

  useEffect(() => {
    if (cart && cart.length > 0) setCartGlobal(cart);
  }, [browserId, cart]);

  const getTotalPrice = () => {
    if (cartGlobal && cartGlobal.length > 0) {
      const price = cartGlobal.reduce((total, item) => {
        return total + item.quantity * item.retail_price;
      }, 0);
      return String(price);
    }
    return '0';
  };

  const handleDeleteCart = (item: CartItem) => {
    const newCart = cart.filter((it: CartItem) => it.id != item.id);
    setCartGlobal(newCart);
    if (browserId && cartGlobal) {
      const body = {
        product: {
          id: item.id,
          quantity: 0,
        },
      };

      updateCart(browserId, body);
    }
  };

  const setQuantity = (
    quantity: number,
    id: string,
    mainId: string,
    operation?: string
  ) => {
    setCartGlobal(prevCart =>
      prevCart.map(item =>
        item.id === id && item.mainId === mainId
          ? {
              ...item,
              quantity:
                operation === '+'
                  ? quantity + 1
                  : operation === '-'
                    ? quantity - 1
                    : quantity,
            }
          : item
      )
    );
    if (browserId && cartGlobal) {
      let body;
      if (operation === '+') {
        body = {
          product: {
            id: id,
            quantity: 0,
          },
        };
        addCart(browserId, body);
      } else if (operation === '-') {
        body = {
          product: {
            id: id,
            quantity: 0,
          },
        };
        removeCart(browserId, body);
      }
    }
  };

  const renderCartEmpty = () => {
    const onClickButton = () => {
      setIsShowCart(false);
      setCartOpen(false);
    };

    return (
      <div className="flex w-full flex-col items-center px-6 pt-44 md:px-8">
        <p className="text-center text-lg font-bold text-primary md:text-2lg">
          {languages.get('cart.empty.title')}
        </p>
        <span className="mb-9 mt-2 block text-center text-sm text-doveGray md:text-lg">
          {languages.get('cart.empty.desc')}
        </span>
        <div className="flex w-full flex-col gap-6">
          <CustomButton
            href={'/products/khung-anh/all'}
            onClick={() => onClickButton()}
            text={languages.get('cart.empty.button.frame')}
            className="w-full bg-primary py-3 font-semibold text-white hover:bg-white hover:text-primary"
          />
          <CustomButton
            href={'/products/anh-in/all'}
            onClick={() => onClickButton()}
            text={languages.get('cart.empty.button.print')}
            className="w-full bg-primary py-3 font-semibold text-white hover:bg-white hover:text-primary"
          />
          <CustomButton
            href={'/products/album-anh/all'}
            onClick={() => onClickButton()}
            text={languages.get('cart.empty.button.album')}
            className="w-full bg-primary py-3 font-semibold text-white hover:bg-white hover:text-primary"
          />
        </div>
      </div>
    );
  };

  const renderCartHaveProduct = () => {
    const handleGotoPayment = () => {
      setIsShowCart(false);
      setCartOpen(false);
      router.push('/payment');
    };

    return (
      <div className="h-full w-full">
        <div className="h-4/6 overflow-y-scroll md:h-2/3">
          {cartGlobal.map((item: CartItem, index: number) => (
            <>
              <div
                className="flex w-full items-center gap-4 overflow-hidden px-6 py-5 md:px-7"
                key={index}
              >
                <div className="p-3">
                  <Image src={item.image} alt="" width={70} height={70} />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <p className="inline-block w-1 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.productName}
                    </p>
                    <Image
                      src={images.icons.ic_trash}
                      width={24}
                      height={24}
                      alt=""
                      className="cursor-pointer"
                      onClick={() => handleDeleteCart(item)}
                    />
                  </div>
                  {/*TODO get value from ProductPopup */}
                  <span className="text-sm text-doveGray">
                    {' '}
                    {item.skuName}{' '}
                  </span>
                  <div className="flex items-end justify-between pt-1">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          setQuantity(item.quantity, item.id, item.mainId, '-')
                        }
                        className={`rounded-l border px-2 py-1 md:px-4 md:py-2 ${
                          item.quantity === 1
                            ? 'cursor-not-allowed bg-gray-50 text-stroke'
                            : 'bg-white text-black hover:scale-100'
                        }`}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <input
                        value={item.quantity}
                        onChange={e => {
                          const value = parseInt(e.target.value, 10);
                          if (!isNaN(value) && value >= 1 && value <= 999) {
                            setQuantity(value, item.id, item.mainId);
                          }
                        }}
                        className="w-6 py-1 text-center font-raleway md:w-12 md:py-2"
                      />
                      <button
                        onClick={() =>
                          setQuantity(item.quantity, item.id, item.mainId, '+')
                        }
                        className="rounded-r border bg-white px-2 py-1 text-black hover:scale-100 md:px-4 md:py-2"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-2lg text-caption">
                      {formatVietnameseCurrency(
                        String(item.retail_price * item.quantity)
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border"></div>
            </>
          ))}
        </div>
        <div className="h-1/4 border-t px-6 pt-4 md:h-1/3 md:px-8 md:pt-6">
          <div className="mb-4 flex justify-between">
            <p className="text-2lg text-doveGray">
              {languages.get('cart.total')}
            </p>
            <span className="text-2.25lg text-caption">
              {formatVietnameseCurrency(getTotalPrice())}
            </span>
          </div>
          <CustomButton
            onClick={() => handleGotoPayment()}
            text={languages.get('cart.payment')}
            className="w-full bg-primary py-3 font-semibold text-white hover:bg-white hover:text-primary"
          />
        </div>
      </div>
    );
  };

  const renderCartMobile = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 top-0 flex flex-col items-start space-y-4 bg-white shadow-md md:hidden">
        <div className="flex w-full items-center justify-between border-b px-6 py-6">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-2.25lg text-primary">
              {languages.get('cart.title')}
            </h2>
            <span className="text-sm">({totalCart})</span>
          </div>
          <img
            src={images.icons.menuClose}
            className="h-6 w-6"
            onClick={() => setCartOpen(false)}
          />
        </div>
        {totalCart > 0 ? renderCartHaveProduct() : renderCartEmpty()}
      </div>
    );
  };

  const renderCart = () => {
    return (
      <LayoutOpacity
        isVisible={isShowCart}
        onClick={() => setIsShowCart(false)}
      >
        <div className="absolute right-0 hidden h-full w-2/5 animate-leftToRight bg-white md:block md:w-3/5 lg:w-2/5">
          <div className="flex justify-between border-b px-11 py-7">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-4">
                <h2 className="text-4lg font-bold text-primary">
                  {languages.get('cart.title')}
                </h2>
                <span className="text-2lg">({totalCart})</span>
              </div>
              {/* {browserId ? (
                <p className="text-gray-100">
                  {languages.get('header.id.customer')}
                  {browserId}
                </p>
              ) : (
                <p className="text-gray-100">
                  {languages.get('header.loading')}
                </p>
              )} */}
            </div>
            <CancelButton
              onClick={() => setIsShowCart(false)}
              absolute={false}
            />
          </div>
          {totalCart > 0 ? renderCartHaveProduct() : renderCartEmpty()}
        </div>
      </LayoutOpacity>
    );
  };

  return isCartMobile ? isShowCartMobile && renderCartMobile() : renderCart();
};

export default Cart;
