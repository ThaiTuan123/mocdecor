import images from '@/configs/images';

export const footerIcons = [
  { src: images.icons.delivery, alt: 'Delivery Icon', key: 'delivery' },
  { src: images.icons.quality, alt: 'Quality Icon', key: 'quality' },
  { src: images.icons.complete, alt: 'Complete Icon', key: 'complete' },
  { src: images.icons.consultant, alt: 'Consultant Icon', key: 'consultant' },
];

export const socialIcons = [
  {
    src: images.icons.facebookLight,
    alt: 'Facebook',
    key: 'facebook',
    href: 'https://www.facebook.com/mocdecor99',
  },
  {
    src: images.icons.instagramLight,
    alt: 'Instagram',
    key: 'instagram',
    href: 'https://www.instagram.com/mocdecor99/',
  },
  {
    src: images.icons.tiktokLight,
    alt: 'Tiktok',
    key: 'tiktok',
    href: 'https://www.tiktok.com/@_mocdecor99_',
  },
];

export const footerLinks = [
  { href: '/products/album-anh/album-anh', text: 'Album ảnh' },
  { href: '/products/anh-in/anh-in', text: 'Ảnh in' },
  { href: '/products/khung-anh/khung-anh', text: 'Khung ảnh' },
];

export const socialLinksDiscover = [
  {
    href: 'https://www.instagram.com/mocdecor99/',
    imgSrc: images.icons.instagramColor,
    altText: 'Instagram',
  },
  {
    href: 'https://www.tiktok.com/@_mocdecor99_?lang=vi-VN',
    imgSrc: images.icons.tiktokColor,
    altText: 'TikTok',
  },
];
