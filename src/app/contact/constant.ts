// src/configs/constant.js

import languages from '@/configs/languages';
import images from "@/configs/images";

export const socialIcons = [
    {
        src: images.icons.facebookDark,
        alt: 'Facebook',
        key: 'facebook',
        tooltip: languages.get('contact.tooltip.facebook'),
        link: 'https://www.facebook.com/profile.php?id=100090974733002',
    },
    {
        src: images.icons.instagramDark,
        alt: 'Instagram',
        key: 'instagram',
        tooltip: languages.get('contact.tooltip.instagram'),
        link: 'https://www.instagram.com/mocdecor99/',
    },
    {
        src: images.icons.tiktokDark,
        alt: 'Tiktok',
        key: 'tiktok',
        tooltip: languages.get('contact.tooltip.tiktok'),
        link: 'https://www.tiktok.com/@_mocdecor99_?lang=vi-VN',
    },
];

export const contactItems = [
    {
        icon: images.icons.contactLocation,
        alt: "Map Marker",
        key: "address",
    },
    {
        icon: images.icons.contactPhone,
        alt: "Phone",
        key: "phone",
    },
    {
        icon: images.icons.contactMail,
        alt: "Email",
        key: "email",
    },
];
