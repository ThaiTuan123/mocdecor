import languages from "@/configs/languages"
import React, { useEffect } from "react"
import CustomButton from "../button/CustomButton"
import { useRouter } from "next/navigation"
import Image from "next/image"
import images from "@/configs/images"
import { formatVietnameseCurrency } from "@/utils"
import LayoutOpacity from "../layoutOpacity"
import useCart from "@/recoil/hooks/useCart"
import CancelButton from "../button/CancelButton"
import { useRecoilState } from "recoil"
import { cartState } from "@/recoil/atoms/cartAtom"
import { CartItem } from "@/types/cartType"
import { updateCart } from "@/services/api"

interface cartProps {
  setIsShowCart: React.Dispatch<React.SetStateAction<boolean>>
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>
  isShowCart: boolean
  browserId: string
  isCartMobile: boolean
}

const Cart = ({
  setIsShowCart,
  setCartOpen,
  isShowCart,
  browserId,
  isCartMobile,
}: cartProps) => {
  const router = useRouter()
  const { cart, loading } = useCart(browserId)
  const [cartGlobal, setCartGlobal] = useRecoilState(cartState)

  useEffect(() => {
      setCartGlobal(cart)
  }, [cart])

  const getCountCart = () => {
    if(cartGlobal) {
      const count = cartGlobal.reduce((result: number, item: any) => result + item.quantity, 0)
      return count
    }
    return 0
  }

  const getTotalPrice = () => {
    if(cartGlobal) {
      const price = cartGlobal.reduce((total, item) => {
        return total + item.quantity * item.originalPrice
      }, 0)
      return String(price)
    }
    return "0"
  }

  const handleDeleteCart = (item: any) => {
    console.log(item.id)
    const newCart = cart.filter((it: any) => it.id != item.id)
    setCartGlobal(newCart)
  }

    const setQuantity = (quantity: number, skuId: string, mainId: string, operation?: string) => {
        setCartGlobal((prevCart) =>
        prevCart.map((item) =>
            (item.skuId === skuId && item.mainId === mainId)
            ? {
                ...item,
                quantity:
                    operation === "+"
                    ? quantity + 1
                    : operation === "-"
                    ? quantity - 1
                    : quantity,
                }
            : item
        )
        )
        if (browserId && cartGlobal) {
          let body
          if(operation === '+' || operation === '-') {
            body = {
              product: {
                mainId: mainId,
                skuId: skuId,
              },
              action: operation === '+' ? "add" : "remove",
            }
          } else {
            body = {
              product: {
                mainId: mainId,
                skuId: skuId,
                quantity: quantity
              },
              action: "add",
            }
          }
          
          updateCart(browserId, body)
        }
    }

  const renderCartEmpty = () => {
    return (
      <div className="w-full flex flex-col items-center md:px-8 px-6 pt-44">
        <h3 className="md:text-2lg text-lg font-bold text-primary text-center">
          {languages.get("cart.empty.title")}
        </h3>
        <span className="block mt-2 mb-9 text-doveGray md:text-lg text-sm text-center">
          {languages.get("cart.empty.desc")}
        </span>
        <div className="flex flex-col gap-6 w-full">
          <CustomButton
            href={"/products/khung-anh/khung-dep"}
            onClick={() => setIsShowCart(false)}
            text={languages.get("cart.empty.button.frame")}
            className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
          />
          <CustomButton
            href={"/products/anh-in/anh-in-6-9"}
            onClick={() => setIsShowCart(false)}
            text={languages.get("cart.empty.button.print")}
            className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
          />
          <CustomButton
            href={"/products/album-anh/anh-in-6x9"}
            onClick={() => setIsShowCart(false)}
            text={languages.get("cart.empty.button.album")}
            className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
          />
        </div>
      </div>
    )
  }

  const renderCartHaveProduct = () => {
    const handleGotoPayment = () => {
      setIsShowCart(false)
      setCartOpen(false)
      router.push("/payment")
    }

    return (
      <div className="h-full w-full">
        <div className="overflow-y-scroll h-4/6 md:h-2/3">
          {cartGlobal.map((item:CartItem, index: number) => (
            <>
              <div
                className="flex items-center gap-4 py-5 md:px-7 px-6 w-full overflow-hidden"
                key={index}
              >
                <div className="p-3">
                  <Image
                    src={item.skuImage}
                    alt=""
                    width={70}
                    height={70}
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="inline-block overflow-hidden text-ellipsis whitespace-nowrap flex-1 w-1">
                      {item.productName}
                    </h3>
                    <Image
                      src={images.icons.ic_trash}
                      width={24}
                      height={24}
                      alt=""
                      className="cursor-pointer"
                      onClick={() => handleDeleteCart(item)}
                    />
                  </div>
                  <span className="text-sm text-doveGray">description</span>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center">
                      <button
                        onClick={() => setQuantity(item.quantity, item.skuId, item.mainId, "-")}
                        className={`px-2 py-1 md:px-4 md:py-2 border rounded-l ${
                          item.quantity === 1
                            ? "bg-gray-50 text-stroke cursor-not-allowed"
                            : "bg-white text-black hover:scale-100"
                        }`}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <input
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10)
                          if (!isNaN(value) && value >= 1 && value <= 999) {
                            setQuantity(value, item.skuId, item.mainId)
                          }
                        }}
                        className="w-6 md:w-12 text-center py-1 md:py-2 font-raleway"
                      />
                      <button
                        onClick={() => setQuantity(item.quantity, item.skuId, item.mainId, "+")}
                        className="px-2 py-1 md:px-4 md:py-2 border rounded-r text-black bg-white hover:scale-100"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-2lg text-caption">
                      {formatVietnameseCurrency(item.originalPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border"></div>
            </>
          ))}
        </div>
        <div className="border-t pt-4 md:pt-6 md:px-8 px-6 md:h-1/3 h-1/4">
          <div className="flex justify-between mb-4">
            <h3 className="text-doveGray text-2lg">
              {languages.get("cart.total")}
            </h3>
            <span className="text-2.25lg text-caption">
              {formatVietnameseCurrency(getTotalPrice())}
            </span>
          </div>
          <CustomButton
            onClick={() => handleGotoPayment()}
            text={languages.get("cart.payment")}
            className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
          />
        </div>
      </div>
    )
  }

  const renderCartMobile = () => {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 md:hidden flex flex-col items-start bg-white shadow-md space-y-4">
        <div className="flex justify-between w-full items-center border-b px-6 py-6">
          <div className="flex flex-row gap-2 items-center">
            <h2 className="text-2.25lg text-primary">
              {languages.get("cart.title")}
            </h2>
            <span className="text-sm">({getCountCart()})</span>
          </div>
          <img
            src={images.icons.menuClose}
            className="w-6 h-6"
            onClick={() => setCartOpen(false)}
          />
        </div>
        {getCountCart() > 0 ? renderCartHaveProduct() : renderCartEmpty()}
      </div>
    )
  }

  const renderCart = () => {
    return (
      <LayoutOpacity
        isVisible={isShowCart}
        onClick={() => setIsShowCart(false)}
      >
        <div className="w-2/5 bg-white h-full absolute right-0 animate-leftToRight hidden md:block">
          <div className="py-7 px-11 flex justify-between border-b">
            <div className="flex flex-col ">
              <div className="flex flex-row gap-4 items-center">
                <h2 className="text-4lg text-primary">
                  {languages.get("cart.title")}
                </h2>
                <span className="text-2lg">({getCountCart()})</span>
              </div>
              {browserId ? (
                <p className="text-gray-100">
                  {languages.get("header.id.customer")}
                  {browserId}
                </p>
              ) : (
                <p className="text-gray-100">
                  {languages.get("header.loading")}
                </p>
              )}
            </div>
            <CancelButton
              onClick={() => setIsShowCart(false)}
              absolute={false}
            />
          </div>
          {getCountCart() > 0 ? renderCartHaveProduct() : renderCartEmpty()}
        </div>
      </LayoutOpacity>
    )
  }

  return isCartMobile ? renderCartMobile() : renderCart()
}

export default Cart
