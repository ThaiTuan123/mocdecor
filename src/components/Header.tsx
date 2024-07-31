'use client'; // Add this directive at the top

import Link from 'next/link';
import { useState } from 'react';
import MenuLink from './menu/MenuLink';
import Icon from './icons/Icon';
import languages from '@/configs/languages';
import images from '@/configs/images';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-white py-3 shadow-md font-raleway">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center md:hidden">
                    <button onClick={toggleMenu} className="text-black">
                        <Icon src={menuOpen ? images.icons.menuClose : images.icons.menuOpen} alt="Menu Toggle"/>
                    </button>
                </div>
                <Link href="/" legacyBehavior>
                    <a className="text-2xl font-bold flex items-center md:order-2 order-1 mx-auto md:mx-0">
                        <img src={images.logo} alt="MOC DECOR" className="h-12 w-auto"/>
                    </a>
                </Link>
                <div className="hidden md:flex md:order-1 space-x-28 items-center">
                    <MenuLink href="/about" label={languages.get('about')}/>
                    <MenuLink href="/products" label={languages.get('products')}/>
                    <MenuLink href="/contact" label={languages.get('contact')}/>
                </div>
                <div className="hidden md:flex md:order-3 space-x-28 items-center">
                    <MenuLink href="/policy" label={languages.get('policy')}/>
                    <MenuLink href="/gallery" label={languages.get('gallery')}/>
                </div>
                <div className="hidden md:flex md:order-4 space-x-4">
                    <Icon src={images.icons.search} alt="Search"/>
                    <Icon src={images.icons.cart} alt="Shopping Cart"/>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden flex flex-col items-center bg-white shadow-md py-4 space-y-4">
                    <MenuLink href="/about" label={languages.get('about')}/>
                    <MenuLink href="/products" label={languages.get('products')}/>
                    <MenuLink href="/contact" label={languages.get('contact')}/>
                    <MenuLink href="/policy" label={languages.get('policy')}/>
                    <MenuLink href="/gallery" label={languages.get('gallery')}/>
                    <div className="flex space-x-4">
                        <Icon src={images.icons.search} alt="Search"/>
                        <Icon src={images.icons.cart} alt="Shopping Cart"/>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
