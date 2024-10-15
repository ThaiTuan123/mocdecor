"use client" // Add this directive at the top

import Link from "next/link"
import React, {useEffect, useState} from "react"
import MenuLink from "../menu/MenuLink"
import Icon from "../icons/Icon"
import languages from "@/configs/languages"
import images from "@/configs/images"
import "../styles.css"
import { icons, menuLinks, subNavData } from "./constant"
import LayoutOpacity from "../layoutOpacity"
import CustomButton from "../button/CustomButton"
import Image from "next/image"
import {formatVietnameseCurrency} from "@/utils"
import CancelButton from "@/components/button/CancelButton"
import {getOrCreateBrowserId} from "@/utils/browserId"
import QuantitySelector from "@/components/inputs/QuantitySelectorInput"
import useListCategory from "@/recoil/hooks/useListCategory"

const product = [
    {
        title:
            "Khung Handmade 3D, Set Nguyên liệu, Trang tríKhung Handmade 3D, Set Nguyên liệu, Trang tríKhung Handmade 3D, Set Nguyên liệu, Trang trí",
        desc: "Xanh dương, set nguyên liệu, tự trang trí",
        price: 175000,
        quantity: 1,
    },
    {
        title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
        desc: "Xanh dương, set nguyên liệu, tự trang trí",
        price: 175000,
        quantity: 1,
    },
    {
        title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
        desc: "Xanh dương, set nguyên liệu, tự trang trí",
        price: 175000,
        quantity: 1,
    },
    {
        title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
        desc: "Xanh dương, set nguyên liệu, tự trang trí",
        price: 175000,
        quantity: 1,
    },
    {
        title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
        desc: "Xanh dương, set nguyên liệu, tự trang trí",
        price: 175000,
        quantity: 1,
    },
    {
        title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
        desc: "Xanh dương, set nguyên liệu, tự trang trí",
        price: 175000,
        quantity: 1,
    },
    {
        title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
        desc: "Xanh dương, set nguyên liệu, tự trang trí",
        price: 175000,
        quantity: 1,
    },
    {
        title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
        desc: "Xanh dương, set nguyên liệu, tự trang trí",
        price: 175000,
        quantity: 1,
    },
]

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [hoveredLabelKey, setHoveredLabelKey] = useState<string>("")
    const [isShowCart, setIsShowCart] = useState(false)
    const [browserId, setBrowserId] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(1)
    const {listCategory} = useListCategory()

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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const handleClickIcon = (value: string) => {
        if (value === "cart") {
            setIsShowCart(true)
        }
    }

    const renderCartEmpty = () => {
        return (
            <div className="w-full flex flex-col items-center px-8 pt-44">
                <h3 className="text-2lg text-primary">
                    {languages.get("cart.empty.title")}
                </h3>
                <span className="block mt-2 mb-9 text-doveGray text-lg">
          {languages.get("cart.empty.desc")}
        </span>
                <div className="flex flex-col gap-6 w-full">
                    <CustomButton
                        text={languages.get("cart.empty.button.frame")}
                        className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
                    />
                    <CustomButton
                        text={languages.get("cart.empty.button.print")}
                        className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
                    />
                    <CustomButton
                        text={languages.get("cart.empty.button.album")}
                        className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
                    />
                </div>
            </div>
        )
    }

    const renderCartHaveProduct = () => {
        return (
            <div className="h-full">
                <div className="overflow-y-scroll h-2/3">
                    {product.map((item, index) => (
                        <>
                            <div
                                className="flex items-center gap-4 py-5 px-7 w-full overflow-hidden"
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
                                        />
                                    </div>
                                    <span className="text-sm text-doveGray">{item.desc}</span>
                                    <div className="flex justify-between items-end">
                                        <QuantitySelector
                                            quantity={quantity}
                                            setQuantity={setQuantity}
                                        />
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
                <div className="border-t pt-6 px-8">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-doveGray text-2lg">
                            {languages.get("cart.total")}
                        </h3>
                        <span className="text-2.25lg text-caption">
              {formatVietnameseCurrency(175000)}
            </span>
                    </div>
                    <CustomButton
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

  return (
    <header className="bg-white py-3 shadow-md font-raleway fixed left-0 right-0 top-0 z-40">
      <div className="md:container md:mx-auto flex justify-between items-center px-6 2xl:px-16">
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="text-black">
            <Icon
              src={menuOpen ? images.icons.menuClose : images.icons.menuOpen}
              alt="Menu Toggle"
            />
          </button>
        </div>
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold flex items-center md:order-2 order-1 mx-auto md:mx-0">
            <img
              src={images.logo}
              alt="MOC DECOR"
              className="h-12 w-auto hover:scale-110"
            />
          </a>
        </Link>
        <div className="hidden md:flex md:order-1 space-x-0 md:space-x-20  items-center">
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
        <div className="hidden md:flex md:order-3 space-x-0 md:space-x-20 items-center">
          {menuLinks.slice(3).map(({ href, labelKey }) => (
            <MenuLink key={href} href={href} label={languages.get(labelKey)} />
          ))}
        </div>
        <div className="hidden md:flex md:order-4 space-x-4">
          {icons.map(({ src, alt, value }) => (
            <Icon
              key={alt}
              src={src}
              alt={alt}
              onClick={() => handleClickIcon(value)}
            />
          ))}
        </div>
      </div>
      {menuOpen && (
        // TODO mobile menu
        <div className="md:hidden flex flex-col items-start px-6 bg-white shadow-md py-4 space-y-4">
          {menuLinks.map(({ href, labelKey }) => (
            <MenuLink key={href} href={href} label={languages.get(labelKey)} />
          ))}
        </div>
      )}
      <LayoutOpacity
        isVisible={isShowCart}
        onClick={() => setIsShowCart(false)}
      >
        <div className="w-2/5 bg-white h-full absolute right-0 animate-leftToRight">
          <div className="py-7 px-11 flex justify-between border-b">
            <div className="flex flex-col ">
              <div className="flex flex-row gap-4 items-center">
                <h2 className="text-4lg text-primary">
                  {languages.get("cart.title")}
                </h2>
                <span className="text-2lg">({0})</span>
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
            {menuOpen && (
              // TODO mobile menu
              <div className="md:hidden flex flex-col items-start px-6 bg-white shadow-md py-4 space-y-4">
                {menuLinks.map(({ href, labelKey }) => (
                  <MenuLink
                    key={href}
                    href={href}
                    label={languages.get(labelKey)}
                  />
                ))}
              </div>
            )}
            <LayoutOpacity
              isVisible={isShowCart}
              onClick={() => setIsShowCart(false)}
            >
              <div className="w-2/5 bg-white h-full absolute right-0 animate-leftToRight">
                <div className="py-7 px-11 flex justify-between border-b">
                  <div className="flex flex-col ">
                    <div className="flex flex-row gap-4 items-center">
                      <h2 className="text-4lg text-primary">
                        {languages.get("cart.title")}
                      </h2>
                      <span className="text-2lg">({0})</span>
                    </div>
                    {browserId ? (
                      <p className="text-gray-100">
                        Mã khách hàng: {browserId}
                      </p>
                    ) : (
                      <p className="text-gray-100">Đang tải...</p>
                    )}
                  </div>
                  <CancelButton
                    onClick={() => setIsShowCart(false)}
                    absolute={false}
                  />
                </div>
                {product.length > 0
                  ? renderCartHaveProduct()
                  : renderCartEmpty()}
              </div>
            </LayoutOpacity>
          </div>
        </div>
      </LayoutOpacity>
    </header>
  )
}

export default Header
