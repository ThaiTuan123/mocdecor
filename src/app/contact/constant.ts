// src/configs/constant.js

import languages from '@/configs/languages';
import images from "@/configs/images";

export const socialIcons = [
    {
        src: images.icons.facebookDark,
        alt: 'Facebook',
        key: 'facebook',
        tooltip: languages.get('contact.tooltip.facebook'),
    },
    {
        src: images.icons.instagramDark,
        alt: 'Instagram',
        key: 'instagram',
        tooltip: languages.get('contact.tooltip.instagram'),
    },
    {
        src: images.icons.tiktokDark,
        alt: 'Tiktok',
        key: 'tiktok',
        tooltip: languages.get('contact.tooltip.tiktok'),
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
