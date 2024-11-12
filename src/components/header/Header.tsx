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
import { FaChevronLeft } from "react-icons/fa"
import Cart from "../Cart/Cart"


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [hoveredLabelKey, setHoveredLabelKey] = useState<string>("")
  const [isShowCart, setIsShowCart] = useState(false)
  const [browserId, setBrowserId] = useState<string | null>(null)
  const { listCategory } = useListCategory()
  const [cartGlobal, setCartGlobal] = useRecoilState(cartState)
  const [subNavMobile, setSubNavMobile] = useState(false)

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
    if(cartGlobal) {
      const count = cartGlobal.reduce((result: number, item: any) => result + item.quantity, 0)
      return count
    }
    return 0
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
                        href={`/products/${item.slug}/${subItem.slug}`}
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
                          href={`/products/${item.slug}/${subItem.slug}`}
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
              <Image
                src={images.logo}
                width={80}
                height={48}
                alt="MOC DECOR LOGO"
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
        {cartOpen && browserId && (
          <Cart
            setIsShowCart={setIsShowCart}
            setCartOpen={setCartOpen}
            isShowCart={isShowCart}
            browserId={browserId}
            isCartMobile={true}
          />
        )}
        {browserId && (
          <Cart
            setIsShowCart={setIsShowCart}
            setCartOpen={setCartOpen}
            isShowCart={isShowCart}
            browserId={browserId}
            isCartMobile={false}
          />
        )}
      </header>
      {subNavMobile && renderSubNavMobile()}
    </>
  )
}

export default Header
