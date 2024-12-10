import React from 'react';
import Image from 'next/image';
import TextContent from '@/components/texts/TextContent';

interface BackgroundSectionProps {
  title: string;
  subTitle: string;
  backgroundDesktop: string; // Path to the desktop image
  backgroundMobile: string; // Path to the mobile image
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({
  title,
  subTitle,
  backgroundDesktop,
  backgroundMobile,
}) => (
  <section className="relative flex h-252 items-center justify-start 2xl:container md:h-327 lg:h-430 lg:max-h-430 2xl:mx-auto">
    {/* Background Image for Mobile */}
    <div className="absolute inset-0 md:hidden">
      <Image
        src={backgroundMobile}
        alt="Background"
        fill={true}
        className="object-fill"
        quality={75}
        priority // Ensure faster loading for above-the-fold content
      />
    </div>

    {/* Background Image for Desktop */}
    <div className="absolute inset-0 hidden md:block">
      <Image
        src={backgroundDesktop}
        alt="Background"
        fill={true}
        className="object-cover"
        quality={75}
        priority // Ensure faster loading for above-the-fold content
      />
    </div>

    {/* Content */}
    <div className="relative z-10 w-4/5 content-center px-6 md:w-3/5 lg:w-2/5 lg:pl-36">
      <h1 className="font-playfairBold text-4xl font-bold uppercase text-primary md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <TextContent className="my-2" text={subTitle} />
    </div>
  </section>
);

export default BackgroundSection;
