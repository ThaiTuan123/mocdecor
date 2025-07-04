import Link from 'next/link';

interface MenuLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
}

const MenuLink = ({ href, label, isActive = false }: MenuLinkProps) => (
  <Link href={href} legacyBehavior>
    <a
      className={`relative font-medium text-doveGray md:hover:text-karaka ${isActive ? 'text-hotCinnamon md:after:absolute md:after:-bottom-6 md:after:left-0 md:after:h-0.5 md:after:w-full md:after:bg-hotCinnamon md:after:content-[""]' : 'md:after:absolute md:after:-bottom-6 md:after:left-0 md:after:h-0.5 md:after:w-0 md:after:bg-hotCinnamon md:after:duration-500 md:after:content-[""] md:hover:after:w-full'}`}
      style={{ left: '-1.375rem' }}
    >
      {label}
    </a>
  </Link>
);

export default MenuLink;
