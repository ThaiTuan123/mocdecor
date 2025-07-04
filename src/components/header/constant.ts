import images from '@/configs/images';

const menuLinks = [
  { href: '/', labelKey: 'about' },
  { href: '#', labelKey: 'products' },
  { href: '/contact', labelKey: 'contact' },
  { href: '/policy', labelKey: 'policy' },
  { href: '/blog', labelKey: 'blog' },
  { href: '/gallery', labelKey: 'gallery' },
];

const icons = [
  {
    src: images.icons.ic_order_history,
    alt: 'Order History',
    value: 'history',
  },
  { src: images.icons.cart, alt: 'Shopping Cart', value: 'cart' },
];

export { menuLinks, icons };
