'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import images from '@/configs/images';
import imagesIcons from '@/configs/images';

interface FloatingButtonConfig {
  onClick: () => void;
  imageSrc: string;
  altText: string;
}

const floatingButtonConfigs: FloatingButtonConfig[] = [
  {
    onClick: () =>
      window.open('https://www.messenger.com/t/mocdecor99', '_blank'),
    imageSrc: imagesIcons.svg.icMessage,
    altText: 'Call',
  },
  {
    onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    imageSrc: images.icons.ic_toTop,
    altText: 'Back to Top',
  },
];

const FloatingButtons: React.FC = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButtons(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 flex flex-col gap-4 overflow-hidden transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0'} z-50`}
    >
      {floatingButtonConfigs.map((buttonConfig, index) => (
        <FloatingButton
          key={index}
          onClick={buttonConfig.onClick}
          imageSrc={buttonConfig.imageSrc}
          altText={buttonConfig.altText}
        />
      ))}
      {/*TODO using the same LanguageSwitcher component*/}
      {/*<LanguageSwitcher />*/}
    </div>
  );
};

interface FloatingButtonProps {
  onClick: () => void;
  imageSrc: string;
  altText: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  imageSrc,
  altText,
}) => (
  <button
    onClick={onClick}
    className="rounded-full bg-caption p-2 text-white shadow-lg hover:bg-captionHover focus:outline-none md:p-3"
    aria-label={altText}
  >
    <Image
      className="h-6 w-6 md:h-8 md:w-8"
      src={imageSrc}
      alt={altText}
      width={30}
      height={30}
    />
  </button>
);

export default FloatingButtons;
