import images from '@/configs/images';

const menuLinks = [
  { href: '/', labelKey: 'about' },
  { href: '#', labelKey: 'products' },
  { href: '/contact', labelKey: 'contact' },
  { href: '/policy', labelKey: 'policy' },
  { href: '/blog', labelKey: 'blog' },
  { href: '/gallery/1234', labelKey: 'gallery' },
];

const icons = [{ src: images.icons.cart, alt: 'Shopping Cart', value: 'cart' }];

export { menuLinks, icons };
