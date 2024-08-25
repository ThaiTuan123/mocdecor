// components/SocialLink.tsx
import Image from 'next/image';
import React from "react";

interface SocialLinkProps {
    src: string;
    alt: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({src, alt}) => (
    <Image
        src={src}
        alt={alt}
        width={32}
        height={32}
        className="hover:scale-110 cursor-pointer"
    />
);

export default SocialLink;
