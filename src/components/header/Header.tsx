"use client" // Add this directive at the top

import Link from "next/link"
import React, { useEffect, useState } from "react"
import MenuLink from "../menu/MenuLink"
import Icon from "../icons/Icon"
import languages from "@/configs/languages"
import images from "@/configs/images"
import "../styles.css"
import { icons, menuLinks, subNavData } from "./constant"
import LayoutOpacity from "../layoutOpacity"
import CustomButton from "../button/CustomButton"
import Image from "next/image"
import { formatVietnameseCurrency } from "@/utils"
import CancelButton from "@/components/button/CancelButton"
import { getOrCreateBrowserId } from "@/utils/browserId"
import QuantitySelector from "@/components/inputs/QuantitySelectorInput"
import useListCategory from "@/recoil/hooks/useListCategory"
import { useRecoilState } from "recoil"
import { cartState } from "@/recoil/atoms/cartAtom"
import { useRouter } from "next/navigation"
import { FaChevronLeft } from "react-icons/fa"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [hoveredLabelKey, setHoveredLabelKey] = useState<string>("")
  const [isShowCart, setIsShowCart] = useState(false)
  const [browserId, setBrowserId] = useState<string | null>(null)
  const { listCategory } = useListCategory()
  const [cart, setCart] = useRecoilState(cartState)
  const [subNavMobile, setSubNavMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const id = getOrCreateBrowserId()
    setBrowserId(id)
    console.log("Current Browser ID:", id)
  }, [])

  useEffect(() => {
    if (listCategory) {
      console.log(listCategory)
    }
  }, [listCategory])

  const getCountCart = () => {
    const count = cart.reduce((result, item) => result + item.quantity, 0)
    return count
  }

  const setQuantity = (quantity: number, id: string, operation?: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: operation === "+" ? quantity + 1 : (operation === "-" ? quantity - 1 : quantity),
            }
          : item
      )
    )
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    setSubNavMobile(false)
  }

  const handleClickIcon = (value: string) => {
    if (value === "cart") {
      setIsShowCart(true)
    }
  }

  const handleDeleteCart = (item: any) => {
    console.log(item.id)
    const newCart = cart.filter((it) => it.id != item.id)
    setCart(newCart)
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
            href={'/products/Khung%20anh/khung-dep'}
            onClick={() => setIsShowCart(false)}
            text={languages.get("cart.empty.button.frame")}
            className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
          />
          <CustomButton
            href={'/products/ANH%20IN/anh-in-6-9'}
            onClick={() => setIsShowCart(false)}
            text={languages.get("cart.empty.button.print")}
            className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
          />
          <CustomButton
            href={'/products/ALBUM%20ANH/anh-in-6x9'}
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
          {cart.map((item, index) => (
            <>
              <div
                className="flex items-center gap-4 py-5 md:px-7 px-6 w-full overflow-hidden"
                key={index}
              >
                <div className="p-3">
                  <Image
                    src={images.paymentType2}
                    alt=""
                    width={70}
                    height={70}
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="inline-block overflow-hidden text-ellipsis whitespace-nowrap flex-1 w-1">
                      {item.title}
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
                  <span className="text-sm text-doveGray">{item.desc}</span>
                  <div className="flex justify-between items-end">
                  <div className="flex items-center">
                      <button
                        onClick={() => setQuantity(item.quantity, item.id, '-')}
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
                          if (
                            !isNaN(value) &&
                            value >= 1 &&
                            value <= 999
                          ) {
                            setQuantity(value, item.id)
                          }
                        }}
                        className="w-6 md:w-12 text-center py-1 md:py-2 font-raleway"
                      />
                      <button
                        onClick={() => setQuantity(item.quantity, item.id, '+')}
                        className="px-2 py-1 md:px-4 md:py-2 border rounded-r text-black bg-white hover:scale-100"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-2lg text-caption">
                      {formatVietnameseCurrency(item.price)}
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
              {formatVietnameseCurrency(175000)}
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

  const renderSubNav = (labelKey: string) => {
    return (
      <div
        className={`fixed top-72px left-0 right-0 bottom-0 w-full h-451 bg-pampas pl-36 pt-9 transition-opacity duration-600 ease-linear ${
          hoveredLabelKey === "products" && labelKey == "products"
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onMouseEnter={() => setHoveredLabelKey("products")}
        onMouseLeave={() => setHoveredLabelKey("")}
      >
        <div className="flex flex-row gap-6">
          {listCategory.length > 0 &&
            listCategory.map((item, index) => (
              <div key={index} className="flex flex-col min-w-44">
                <span className="text-gray-100 text-1.25lg">
                  {languages.get("navbar.sub.view.title")}
                </span>
                <h2 className="text-2.25lg text-primary mb-8 mt-1">
                  {item.name}
                </h2>
                <div className="flex flex-col gap-4 cursor-pointer">
                  {item.types.map((subItem, subIndex) => {
                    return (
                      // TODO add line when hover
                      <Link
                        key={subIndex}
                        className={`relative text-doveGray text-lg md:hover:text-karaka`}
                        href={`/products/${item.enName}/${subItem.slug}`}
                        onClick={() => setHoveredLabelKey("")}
                      >
                        {subItem.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
        </div>
        <div className="flex gap-3 items-center mt-4 cursor-pointer">
          <span className="text-karaka text-lg">
            {languages.get("navbar.sub.view.read.more")}
          </span>
          <img
            src={images.icons.ic_arrow_right}
            alt=""
            className="w-4 object-contain"
          />
        </div>
        <img
          src={images.heroSubNav}
          alt=""
          className="absolute right-0 top-0 h-451"
        />
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

  const handleScroll = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const renderSubNavMobile = () => {
    return (
      <div className="fixed top-72px left-0 bottom-0 right-0 bg-white flex flex-col z-50 border-t pt-4">
        <div
          className="flex items-center mb-8 gap-2 px-6"
          onClick={() => {
            setSubNavMobile(false)
            setMenuOpen(true)
          }}
        >
          <FaChevronLeft className="w-4 h-4" />
          <span className="text-sm text-karaka font-raleway">
            {languages.get("navbar.sub.mobile.back")}
          </span>
        </div>
        <div
          className="flex flex-col overflow-y-auto no-scrollbar"
          onScroll={handleScroll}
        >
          <div className="flex flex-col gap-6 px-6 mb-6">
            {listCategory.length > 0 &&
              listCategory.map((item, index) => (
                <div key={index} className="flex flex-col min-w-44">
                  <span className="text-notRating text-sm mb-2">
                    {languages.get("navbar.sub.view.title")}
                  </span>
                  <h2 className="text-lg text-primary mb-8 mt-1 uppercase pb-4 border-b">
                    {item.name}
                  </h2>
                  <div className="flex flex-col gap-4 cursor-pointer">
                    {item.types.map((subItem, subIndex) => {
                      return (
                        // TODO add line when hover
                        <Link
                          key={subIndex}
                          className={`relative text-doveGray text-sm md:hover:text-karaka`}
                          href={`/products/${item.enName}/${subItem.slug}`}
                          onClick={() => {
                            setMenuOpen(false)
                            setSubNavMobile(false)
                          }}
                        >
                          {subItem.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
          </div>
          <img src={images.heroSubNav} alt="" className="rotate-90" />
        </div>
      </div>
    )
  }

  const handleClickMenuMobile = (labelKey: string) => {
    if (labelKey !== "products") {
      setMenuOpen(false)
    } else {
      setSubNavMobile(true)
    }
  }

  return (
    <>
      <header className="bg-white py-3 shadow-md font-raleway fixed left-0 right-0 top-0 z-40">
        <div className=" lg:container lg:mx-auto flex justify-between items-center px-6 2xl:px-16 relative h-12">
          <Link href="/" legacyBehavior>
            <a
              className="text-2xl font-bold flex items-center md:order-2 md:mx-0"
              onClick={() => {
                setMenuOpen(false)
                setSubNavMobile(false)
              }}
            >
              <img
                src={images.logo}
                alt="MOC DECOR"
                className="h-12 w-auto md:hover:scale-110"
              />
            </a>
          </Link>
          <div className="flex items-center md:hidden gap-3 ml-auto">
            <button
              onClick={() => {
                setCartOpen(true)
                setMenuOpen(false)
                setSubNavMobile(false)
              }}
              className="text-black relative"
            >
              <Icon src={images.icons.cart} alt="Cart Toggle" />
              <div className="absolute top-[-2px] right-[-2px] w-[14px] h-[14px] rounded-2xl bg-primary flex items-center justify-center">
                <span className="text-white text-0.8x text-center translate-y-[1px]">
                  {getCountCart()}
                </span>
              </div>
            </button>
            <button onClick={toggleMenu} className="text-black">
              <Icon
                src={menuOpen ? images.icons.menuClose : images.icons.menuOpen}
                alt="Menu Toggle"
              />
            </button>
          </div>
          <div className="hidden md:flex md:order-1 space-x-0  md:space-x-6 lg:space-x-20 items-center ">
            {menuLinks.slice(0, 3).map(({ href, labelKey }) => (
              <div
                onMouseEnter={() => setHoveredLabelKey(labelKey)}
                onMouseLeave={() => setHoveredLabelKey("")}
              >
                <MenuLink
                  key={href}
                  href={href}
                  label={languages.get(labelKey)}
                />
                {hoveredLabelKey == "products" && labelKey == "products" && (
                  <div className="w-40 h-10 bg-transparent absolute "></div>
                )}
                {renderSubNav(labelKey)}
              </div>
            ))}
          </div>
          <div className="hidden md:flex md:order-3 space-x-0 md:space-x-6 lg:space-x-20 items-center">
            {menuLinks.slice(3).map(({ href, labelKey }) => (
              <MenuLink
                key={href}
                href={href}
                label={languages.get(labelKey)}
              />
            ))}
          </div>
          <div className="hidden md:flex md:order-4 space-x-4">
            {icons.map(({ src, alt, value }) => (
              <div className="relative">
                <Icon
                  key={alt}
                  src={src}
                  alt={alt}
                  onClick={() => handleClickIcon(value)}
                />
                <div className="absolute top-[-2px] right-[-2px] w-[14px] h-[14px] rounded-2xl bg-primary flex items-center justify-center">
                  <span className="text-white text-0.8x text-center translate-y-[1px]">
                    {getCountCart()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {menuOpen && (
          // TODO mobile menu
          <div className="md:hidden flex flex-col items-start px-6 bg-white shadow-md py-4 space-y-4 h-896">
            {menuLinks.map(({ href, labelKey }) => (
              <div
                key={href}
                className="w-full"
                onClick={() => handleClickMenuMobile(labelKey)}
              >
                <MenuLink href={href} label={languages.get(labelKey)} />
                <div className="w-full h-px bg-gray-300 mt-2" />
              </div>
            ))}
          </div>
        )}
        {cartOpen && renderCartMobile()}
        {renderCart()}
      </header>
      {subNavMobile && renderSubNavMobile()}
    </>
  )
}

export default Header
