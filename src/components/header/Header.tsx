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
  const [totalCart, setTotalCart] = useState<number>(0);
  const [hoveredLabelKey, setHoveredLabelKey] = useState<string>('');
  const [isShowCart, setIsShowCart] = useState(false);
  const [browserId, setBrowserId] = useState<string | null>(null);
  const { menu } = useMenu();
  const [cartGlobal, setCartGlobal] = useRecoilState(cartState);
  const [subNavMobile, setSubNavMobile] = useState(false);

  useEffect(() => {
    const id = getOrCreateBrowserId();
    setBrowserId(id);
    // console.log('Current Browser ID:', id);
  }, []);

  useEffect(() => {
    if (cartGlobal && cartGlobal.length > 0) {
      setTotalCart(cartGlobal.length);
    } else {
      setTotalCart(0);
    }
  }, [cartGlobal]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSubNavMobile(false);
  };

  const handleClickIcon = (value: string) => {
    if (value === 'cart') {
      setIsShowCart(true);
    } else if (value === 'history') {
      router.push('/orders');
    }
  };

  const renderSubNav = (labelKey: string) => {
    return (
      <div
        className={`duration-600 fixed bottom-0 left-0 right-0 top-72px h-451 w-full bg-pampas pt-9 transition-opacity ease-linear md:pl-9 lg:pl-36 ${
          hoveredLabelKey === 'products' && labelKey == 'products'
            ? 'visible opacity-100'
            : 'invisible opacity-0'
        }`}
        onMouseEnter={() => setHoveredLabelKey('products')}
        onMouseLeave={() => setHoveredLabelKey('')}
      >
        <div className="flex flex-row md:gap-2 lg:gap-6">
          {menu?.types?.map((item, index) => (
            <div key={index} className="flex min-w-44 flex-col">
              <span className="text-1.25lg text-gray-100">
                {languages.get('navbar.sub.view.title')}
              </span>
              <h2 className="z-50 mb-8 mt-1 text-2.25lg text-primary">
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
                    onClick={() => {
                      setHoveredLabelKey('');
                      router.push('/products/anh-in/all');
                    }}
                  >
                    <span className="text-lg text-karaka">
                      {languages.get('navbar.sub.view.read.more')}
                    </span>
                    <Image
                      src={images.icons.ic_arrow_right}
                      width={16}
                      height={16}
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
              <h2 className="z-50 mb-8 mt-1 text-2.25lg text-primary">
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
                        setHoveredLabelKey('');
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
                    onClick={() => {
                      setHoveredLabelKey('');
                      router.push('/products/khac/all');
                    }}
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
                </>
              )}
            </div>
          )}
        </div>
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
      <header className="fixed left-0 right-0 top-0 z-40 bg-white py-3 font-raleway shadow-md">
        <div className="relative flex h-12 items-center justify-between px-6 lg:container md:px-12 lg:mx-auto xl:px-16 2xl:px-16">
          <Link
            href="/"
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
              className="h-12 w-auto object-contain md:hover:scale-110"
              priority={true}
            />
          </Link>
          <div className="ml-auto flex items-center gap-2 md:hidden">
            <button
              onClick={() => {
                router.push('/orders');
                setMenuOpen(false);
                setSubNavMobile(false);
              }}
              className="relative p-1 text-black"
              title="Lịch sử đơn hàng"
            >
              <Icon
                src={images.icons.ic_order_history}
                alt="Order History"
                className="history-icon-size"
              />
            </button>
            <button
              onClick={() => {
                setCartOpen(true);
                setMenuOpen(false);
                setSubNavMobile(false);
              }}
              className="relative p-1 text-black"
              title="Giỏ hàng"
            >
              <div className="cart-icon-shake">
                <Icon
                  src={images.icons.cart}
                  alt="Cart Toggle"
                  className="cart-icon-size"
                />
              </div>
              <div className="absolute right-[-2px] top-[-2px] flex h-[14px] w-[14px] items-center justify-center rounded-2xl bg-primary">
                <span className="translate-y-[1px] text-center text-0.8x text-white">
                  {totalCart}
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
          {/*Menu left*/}
          <div className="hidden items-center space-x-0 md:order-1 md:flex md:space-x-6 lg:space-x-20">
            {menuLinks.slice(0, 3).map(({ href, labelKey }) => (
              <div
                key={href}
                onClick={() =>
                  setHoveredLabelKey(hoveredLabelKey ? '' : labelKey)
                }
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
          {/*Menu right*/}
          <div className="hidden items-center space-x-0 md:order-3 md:flex md:space-x-6 lg:space-x-20">
            {menuLinks.slice(3).map(({ href, labelKey }) => (
              <MenuLink
                key={href}
                href={href}
                label={languages.get(labelKey)}
              />
            ))}
          </div>
          {/*Giỏ hàng & Lịch sử*/}
          <div className="absolute right-0 top-2.5 hidden space-x-2 md:right-3 md:order-4 md:flex" style={{ right: '-1.375rem' }}>
            {icons.map(({ src, alt, value }) => (
              <div
                className="relative"
                key={`${alt}huhu`}
                title={value === 'history' ? 'Lịch sử đơn hàng' : 'Giỏ hàng'}
                style={value === 'history' ? { top: '-0.175rem' } : {}}
              >
                <div
                  className={`${value === 'cart' ? 'cart-icon-shake' : ''} ${value === 'history' ? 'p-1' : ''}`}
                >
                  <Icon
                    src={src}
                    alt={alt}
                    onClick={() => handleClickIcon(value)}
                    className={`${value === 'cart' ? 'cart-icon-size' : value === 'history' ? 'history-icon-size' : 'h-5 w-5'} ${value === 'history' ? 'transition-transform hover:scale-110' : ''}`}
                  />
                </div>
                {value === 'cart' && (
                  <div className="absolute right-[-2px] top-[-2px] flex h-[14px] w-[14px] items-center justify-center rounded-2xl bg-primary">
                    <span className="translate-y-[1px] text-center text-0.8x text-white">
                      {totalCart}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {menuOpen && (
          // TODO mobile menu
          <div className="flex h-896 flex-col items-start bg-white px-6 py-4 shadow-md md:hidden">
            {menuLinks.map(({ href, labelKey }) => (
              <div
                key={href}
                className="w-full pt-4"
                onClick={() => handleClickMenuMobile(labelKey)}
              >
                <MenuLink href={href} label={languages.get(labelKey)} />
                <div className="mt-2 h-px w-full bg-gray-300" />
              </div>
            ))}
          </div>
        )}
        {browserId && (
          <Cart
            totalCart={totalCart}
            setIsShowCart={setIsShowCart}
            setCartOpen={setCartOpen}
            isShowCart={isShowCart}
            isShowCartMobile={cartOpen}
            browserId={browserId}
            isCartMobile={true}
          />
        )}
        {browserId && (
          <Cart
            totalCart={totalCart}
            setIsShowCart={setIsShowCart}
            setCartOpen={setCartOpen}
            isShowCart={isShowCart}
            isShowCartMobile={cartOpen}
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
