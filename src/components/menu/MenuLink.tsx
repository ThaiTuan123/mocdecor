import Link from 'next/link';

interface MenuLinkProps {
    href: string;
    label: string;
    isActive?: boolean;
}

const MenuLink = ({href, label, isActive = false}: MenuLinkProps) => (
    <Link href={href} legacyBehavior>
        <a
            className={`relative text-doveGray font-medium md:hover:text-karaka ${isActive ? 'text-hotCinnamon md:after:content-[""] md:after:absolute md:after:w-full md:after:h-0.5 md:after:bg-hotCinnamon md:after:left-0 md:after:-bottom-6' : 'md:hover:after:content-[""] md:hover:after:absolute md:hover:after:w-full md:hover:after:h-0.5 md:hover:after:bg-hotCinnamon md:hover:after:left-0 md:hover:after:-bottom-6'}`}
        >
            {label}
        </a>
    </Link>
);

export default MenuLink;
