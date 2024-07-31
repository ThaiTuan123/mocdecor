'use client'; // Add this directive at the top

import Link from 'next/link';
import {useState} from 'react';
import MenuLink from './menu/MenuLink';
import Icon from './icons/Icon';
import languages from '@/configs/languages';
import images from '@/configs/images';

const menuLinks = [
    {href: '/', labelKey: 'about'},
    {href: '/products', labelKey: 'products'},
    {href: '/contact', labelKey: 'contact'},
    {href: '/policy', labelKey: 'policy'},
    {href: '/gallery', labelKey: 'gallery'},
];

const icons = [
    {src: images.icons.search, alt: 'Search'},
    {src: images.icons.cart, alt: 'Shopping Cart'},
];

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
                    <a className="text-2xl font-bold flex items-center md:order-2 order-1 mx-auto md:mx-0 ">
                        <img src={images.logo} alt="MOC DECOR" className="h-12 w-auto"/>
                    </a>
                </Link>
                <div className="hidden md:flex md:order-1 space-x-28 items-center">
                    {menuLinks.slice(0, 3).map(({href, labelKey}) => (
                        <MenuLink key={href} href={href} label={languages.get(labelKey)}/>
                    ))}
                </div>
                <div className="hidden md:flex md:order-3 space-x-28 items-center">
                    {menuLinks.slice(3).map(({href, labelKey}) => (
                        <MenuLink key={href} href={href} label={languages.get(labelKey)}/>
                    ))}
                </div>
                <div className="hidden md:flex md:order-4 space-x-4">
                    {icons.map(({src, alt}) => (
                        <Icon key={alt} src={src} alt={alt}/>
                    ))}
                </div>
            </div>
            {menuOpen && (
                // TODO mobile menu
                <div className="md:hidden flex flex-col items-center bg-white shadow-md py-4 space-y-4">
                    {menuLinks.map(({href, labelKey}) => (
                        <MenuLink key={href} href={href} label={languages.get(labelKey)}/>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
