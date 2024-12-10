'use client'; // Add this directive at the top

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MenuLink from '../menu/MenuLink';
import Icon from '../icons/Icon';
import languages from '@/configs/languages';
import images from '@/configs/images';
import '../styles.css';
import { icons, menuLinks } from './constant';
import Image from 'next/image';
import { getOrCreateBrowserId } from '@/utils/browserId';
import { useRecoilState } from 'recoil';
import { cartState } from '@/recoil/atoms/cartAtom';
import { FaChevronLeft } from 'react-icons/fa';
import Cart from '../Cart/Cart';
import useMenu from '@/recoil/hooks/useMenu';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [hoveredLabelKey, setHoveredLabelKey] = useState<string>('');
  const [isShowCart, setIsShowCart] = useState(false);
  const [browserId, setBrowserId] = useState<string | null>(null);
  const { menu } = useMenu();
  const [cartGlobal, setCartGlobal] = useRecoilState(cartState);
  const [subNavMobile, setSubNavMobile] = useState(false);

  useEffect(() => {
    const id = getOrCreateBrowserId();
    setBrowserId(id);
    console.log('Current Browser ID:', id);
  }, []);

  const getCountCart = () => {
    if (cartGlobal) {
      const count = cartGlobal.reduce(
        (result: number, item: any) => result + item.quantity,
        0
      );
      return count;
    }
    return 0;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSubNavMobile(false);
  };

  const handleClickIcon = (value: string) => {
    if (value === 'cart') {
      setIsShowCart(true);
    }
  };

  const renderSubNav = (labelKey: string) => {
    return (
      <div
        className={`duration-600 fixed bottom-0 left-0 right-0 top-72px h-451 w-full bg-pampas pl-36 pt-9 transition-opacity ease-linear ${
          hoveredLabelKey === 'products' && labelKey == 'products'
            ? 'visible opacity-100'
            : 'invisible opacity-0'
        }`}
        onMouseEnter={() => setHoveredLabelKey('products')}
        onMouseLeave={() => setHoveredLabelKey('')}
      >
        <div className="flex flex-row gap-6">
          {menu?.types?.map((item, index) => (
            <div key={index} className="flex min-w-44 flex-col">
              <span className="text-1.25lg text-gray-100">
                {languages.get('navbar.sub.view.title')}
              </span>
              <h2 className="mb-8 mt-1 text-2.25lg text-primary">
                {item.name.toUpperCase()}
              </h2>
              <div className="flex cursor-pointer flex-col gap-4">
                {item.subCategories?.length > 0 &&
                  item.subCategories.slice(0, 7).map((subItem, subIndex) => {
                    return (
                      // TODO add line when hover
                      <Link
                        key={subIndex}
                        className={`relative text-lg text-doveGray md:hover:text-karaka`}
                        href={`/products/${item.slug}/${subItem.slug}`}
                        onClick={() => setHoveredLabelKey('')}
                      >
                        {subItem.text}
                      </Link>
                    );
                  })}
              </div>
              {item.subCategories?.length > 7 && (
                <>
                  <div
                    className="absolute bottom-4 mt-4 flex cursor-pointer items-center gap-3"
                    onClick={() => router.push('/products/anh-in/anh-bo-goc')}
                  >
                    <span className="text-lg text-karaka">
                      {languages.get('navbar.sub.view.read.more')}
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
                </>
              )}
            </div>
          ))}
          {menu?.types?.length === 3 && (
            <div key="4" className="flex min-w-44 flex-col">
              <span className="text-1.25lg text-gray-100">
                {languages.get('navbar.sub.view.title')}
              </span>
              <h2 className="mb-8 mt-1 text-2.25lg text-primary">
                {languages.get('navbar.sub.view.otherProductTypes')}
              </h2>
              <div className="flex cursor-pointer flex-col gap-4">
                {menu?.otherType?.slice(0, 7).map((subItem, subIndex) => {
                  return (
                    // TODO add line when hover
                    <Link
                      key={subIndex}
                      className={`relative text-lg text-doveGray md:hover:text-karaka`}
                      href={`/products/${subItem.parentSlug}/${subItem.slug}`}
                      onClick={() => {
                        setMenuOpen(false);
                        setSubNavMobile(false);
                      }}
                    >
                      {subItem.text}
                    </Link>
                  );
                })}
              </div>
              {menu?.otherType?.length > 7 && (
                <>
                  <div
                    className="absolute bottom-4 mt-4 flex cursor-pointer items-center gap-3"
                    onClick={() => router.push('/products/khac/den-dom-dom')}
                  >
                    <span className="text-lg text-karaka">
                      {languages.get('navbar.sub.view.read.more')}
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
                </>
              )}
            </div>
          )}
        </div>
        <div
          className="absolute bottom-4 mt-4 flex cursor-pointer items-center gap-3"
          onClick={() => router.push('/products/album-anh/album-photobooth')}
        >
          <span className="text-lg text-karaka">
            {languages.get('navbar.sub.view.read.more')}
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
    );
  };

  const handleScroll = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const renderSubNavMobile = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 top-72px z-50 flex flex-col border-t bg-white pt-4">
        <div
          className="mb-8 flex items-center gap-2 px-6"
          onClick={() => {
            setSubNavMobile(false);
            setMenuOpen(true);
          }}
        >
          <FaChevronLeft className="h-4 w-4" />
          <span className="font-raleway text-sm text-karaka">
            {languages.get('navbar.sub.mobile.back')}
          </span>
        </div>
        <div
          className="flex flex-col overflow-y-auto no-scrollbar"
          onScroll={handleScroll}
        >
          <div className="mb-6 flex flex-col gap-6 px-6">
            {menu?.types?.length > 0 &&
              menu?.types?.map((item, index) => (
                <div key={index} className="flex min-w-44 flex-col">
                  <span className="mb-2 text-sm text-notRating">
                    {languages.get('navbar.sub.view.title')}
                  </span>
                  <h2 className="mb-8 mt-1 border-b pb-4 text-lg uppercase text-primary">
                    {item.name.toUpperCase()}
                  </h2>
                  <div className="flex cursor-pointer flex-col gap-4">
                    {item.subCategories.map((subItem, subIndex) => {
                      return (
                        // TODO add line when hover
                        <Link
                          key={subIndex}
                          className={`relative text-sm text-doveGray md:hover:text-karaka`}
                          href={`/products/${item.slug}/${subItem.slug}`}
                          onClick={() => {
                            setMenuOpen(false);
                            setSubNavMobile(false);
                          }}
                        >
                          {subItem.text}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            {menu?.types?.length === 3 && (
              <div key="4" className="flex min-w-44 flex-col">
                <span className="mb-2 text-sm text-notRating">
                  {languages.get('navbar.sub.view.title')}
                </span>
                <h2 className="mb-8 mt-1 border-b pb-4 text-lg uppercase text-primary">
                  {languages.get('navbar.sub.view.otherProductTypes')}
                </h2>
                <div className="flex cursor-pointer flex-col gap-4">
                  {menu?.otherType?.map((subItem, subIndex) => {
                    return (
                      // TODO add line when hover
                      <Link
                        key={subIndex}
                        className={`relative text-sm text-doveGray md:hover:text-karaka`}
                        href={`/products/${subItem.parentSlug}/${subItem.slug}`}
                        onClick={() => {
                          setMenuOpen(false);
                          setSubNavMobile(false);
                        }}
                      >
                        {subItem.text}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <img src={images.heroSubNav} alt="" className="rotate-90" />
        </div>
      </div>
    );
  };

  const handleClickMenuMobile = (labelKey: string) => {
    if (labelKey !== 'products') {
      setMenuOpen(false);
    } else {
      setSubNavMobile(true);
    }
  };

  return (
    <>
      <header className="font-raleway fixed left-0 right-0 top-0 z-40 bg-white py-3 shadow-md">
        <div className="relative flex h-12 items-center justify-between px-6 lg:container lg:mx-auto 2xl:px-16">
          <Link href="/" legacyBehavior>
            <a
              className="flex items-center text-2xl font-bold md:order-2 md:mx-0"
              onClick={() => {
                setMenuOpen(false);
                setSubNavMobile(false);
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
          <div className="ml-auto flex items-center gap-3 md:hidden">
            <button
              onClick={() => {
                setCartOpen(true);
                setMenuOpen(false);
                setSubNavMobile(false);
              }}
              className="relative text-black"
            >
              <Icon src={images.icons.cart} alt="Cart Toggle" />
              <div className="absolute right-[-2px] top-[-2px] flex h-[14px] w-[14px] items-center justify-center rounded-2xl bg-primary">
                <span className="translate-y-[1px] text-center text-0.8x text-white">
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
          <div className="hidden items-center space-x-0 md:order-1 md:flex md:space-x-6 lg:space-x-20">
            {menuLinks.slice(0, 3).map(({ href, labelKey }) => (
              <div
                onMouseEnter={() => setHoveredLabelKey(labelKey)}
                onMouseLeave={() => setHoveredLabelKey('')}
              >
                <MenuLink
                  key={href}
                  href={href}
                  label={languages.get(labelKey)}
                />
                {hoveredLabelKey == 'products' && labelKey == 'products' && (
                  <div className="absolute h-10 w-40 bg-transparent"></div>
                )}
                {renderSubNav(labelKey)}
              </div>
            ))}
          </div>
          <div className="hidden items-center space-x-0 md:order-3 md:flex md:space-x-6 lg:space-x-20">
            {menuLinks.slice(3).map(({ href, labelKey }) => (
              <MenuLink
                key={href}
                href={href}
                label={languages.get(labelKey)}
              />
            ))}
          </div>
          <div className="hidden space-x-4 md:order-4 md:flex">
            {icons.map(({ src, alt, value }) => (
              <div className="relative">
                <Icon
                  key={alt}
                  src={src}
                  alt={alt}
                  onClick={() => handleClickIcon(value)}
                />
                <div className="absolute right-[-2px] top-[-2px] flex h-[14px] w-[14px] items-center justify-center rounded-2xl bg-primary">
                  <span className="translate-y-[1px] text-center text-0.8x text-white">
                    {getCountCart()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {menuOpen && (
          // TODO mobile menu
          <div className="flex h-896 flex-col items-start space-y-4 bg-white px-6 py-4 shadow-md md:hidden">
            {menuLinks.map(({ href, labelKey }) => (
              <div
                key={href}
                className="w-full"
                onClick={() => handleClickMenuMobile(labelKey)}
              >
                <MenuLink href={href} label={languages.get(labelKey)} />
                <div className="mt-2 h-px w-full bg-gray-300" />
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
  );
};

export default Header;
