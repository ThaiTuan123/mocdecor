import Image from 'next/image';
import React from "react";

interface SocialLinkProps {
    src: string;
    alt: string;
    link: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({src, alt, link}) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-110 cursor-pointer"
    >
        <Image
            src={src}
            alt={alt}
            width={32}
            height={32}
        />
    </a>
);

export default SocialLink;
