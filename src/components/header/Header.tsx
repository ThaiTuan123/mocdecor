"use client" // Add this directive at the top

import Link from "next/link"
import { useState } from "react"
import MenuLink from "../menu/MenuLink"
import Icon from "../icons/Icon"
import languages from "@/configs/languages"
import images from "@/configs/images"
import "../styles.css"
import { icons, menuLinks, subNavData } from "./constant"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLabelKey, setHoveredLabelKey] = useState<string>("")

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="bg-white py-3 shadow-md font-raleway fixed left-0 right-0 top-0 z-40">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="text-black">
            <Icon
              src={menuOpen ? images.icons.menuClose : images.icons.menuOpen}
              alt="Menu Toggle"
            />
          </button>
        </div>
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold flex items-center md:order-2 order-1 mx-auto md:mx-0 ">
            <img src={images.logo} alt="MOC DECOR" className="h-12 w-auto" />
          </a>
        </Link>
        <div className="hidden md:flex md:order-1 space-x-28 items-center">
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
              <div
                className={`bg-layout fixed top-72px left-0 right-0 bottom-0 transition-opacity duration-600 ease-linear ${
                  (hoveredLabelKey === "products" && labelKey == "products")
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                onMouseEnter={() => setHoveredLabelKey("products")}
                onMouseLeave={() => setHoveredLabelKey("")}
              >
                <div className="w-full h-451 bg-pampas flex flex-row pl-36 pt-9 gap-6">
                  {subNavData.map((item, index) => (
                    <div key={index} className="flex flex-col min-w-44">
                      <span className="text-gray-100 text-1.25lg">
                        {languages.get("navbar.sub.view.title")}
                      </span>
                      <h2 className="text-2.25lg text-primary mb-8 mt-1">
                        {item.title}
                      </h2>
                      <div className="flex flex-col gap-4 cursor-pointer">
                        {item.menu.map((subItem, subIndex) => {
                          return (
                            // TODO add line when hover
                            <div
                              key={subIndex}
                              className={`relative text-doveGray text-lg md:hover:text-karaka`}
                            >
                              {subItem}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                  <img
                    src={images.heroSubNav}
                    alt=""
                    className="absolute right-0 top-0 h-451"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex md:order-3 space-x-28 items-center">
          {menuLinks.slice(3).map(({ href, labelKey }) => (
            <MenuLink key={href} href={href} label={languages.get(labelKey)} />
          ))}
        </div>
        <div className="hidden md:flex md:order-4 space-x-4">
          {icons.map(({ src, alt }) => (
            <Icon key={alt} src={src} alt={alt} />
          ))}
        </div>
      </div>
      {menuOpen && (
        // TODO mobile menu
        <div className="md:hidden flex flex-col items-center bg-white shadow-md py-4 space-y-4">
          {menuLinks.map(({ href, labelKey }) => (
            <MenuLink key={href} href={href} label={languages.get(labelKey)} />
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
