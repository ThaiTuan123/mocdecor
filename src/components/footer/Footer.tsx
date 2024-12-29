import React from 'react';
import images from '@/configs/images';
import languages from '@/configs/languages';
import Image from 'next/image';

import IconWithText from '@/components/icons/IconWithText';
import Icon from '@/components/icons/Icon';
import Line from '@/components/shape/Lines';
import {
  footerIcons,
  footerLinks,
  socialIcons,
} from '@/components/footer/constant';
import Link from 'next/link';
import useMenu from '@/recoil/hooks/useMenu';

const FooterTop = () => (
  <div className="bg-punga px-6 py-8 text-white md:py-1 2xl:px-96">
    <div className="container mx-auto flex h-52 items-center md:h-24">
      <div className="grid w-full grid-cols-2 justify-between gap-4 md:grid-cols-4">
        {footerIcons.map(icon => (
          <IconWithText
            key={icon.key}
            src={icon.src}
            alt={icon.alt}
            size="large"
            text={languages.get(icon.key)}
          />
        ))}
      </div>
    </div>
  </div>
);

interface FooterContactInfoProps {
  className?: string;
}

const FooterContactInfo = ({ className }: FooterContactInfoProps) => {
  const contactInfoTitle = languages.get('contactInfo');
  const addressLabel = `${languages.get('txtAddress')} ${languages.get('address')}`;
  const phoneLabel = `${languages.get('txtPhone')} ${languages.get('phone')}`;
  const emailLabel = `${languages.get('txtEmail')} ${languages.get('email')}`;

  return (
    <div className={`w-1/3 px-6 py-6 md:px-2 ${className}`}>
      <h3 className="font-playfairBold text-2xl font-bold">
        {contactInfoTitle}
      </h3>
      <p className="text-l font-raleway pt-4 font-normal">{addressLabel}</p>
      <p className="text-l font-raleway font-normal">{phoneLabel}</p>
      <p className="text-l font-raleway font-normal">{emailLabel}</p>
    </div>
  );
};

interface FooterLogoProps {
  className?: string;
}

const FooterLogo = ({ className }: FooterLogoProps) => (
  <div
    className={`relative flex w-1/3 items-center justify-center ${className}`}
  >
    {/* Background image */}
    <Image
      src={images.imageFooterBackground}
      alt="Footer Background"
      fill={true}
      quality={75} // Optimize image quality
      className="z-0 object-cover" // Ensure the background stays behind the logo
      loading="lazy"
    />

    {/* Logo */}
    <div className="relative z-10 flex items-center justify-center">
      <Image
        src={images.logoWhite}
        alt="Moc Decor Logo"
        width={144} // Replace with the actual width of your logo
        height={144} // Replace with the actual height of your logo
        className="mx-auto mb-2 h-64 w-64 md:h-36 md:w-36"
      />
    </div>
  </div>
);

interface FooterLinksProps {
  className?: string;
}

const FooterLinks = ({ className }: FooterLinksProps) => {
  const { menu } = useMenu();

  return (
    <div
      className={`container mx-auto ml-0 flex w-1/3 flex-col justify-between px-6 py-0 md:px-2 md:py-6 lg:px-16 ${className}`}
    >
      <h3 className="font-playfairBold text-2xl font-bold">
        {languages.get('whatMocHas')}
      </h3>

      <div className="flex flex-row space-x-4 md:flex-col md:space-x-0 xl:flex-row xl:space-x-4">
        {menu?.otherType?.slice(0, 2).map((subItem, subIndex) => (
          <Link
            key={subIndex}
            className="text-l font-raleway pt-2 font-normal hover:text-gray-300"
            href={`/products/${subItem.parentSlug}/${subItem.slug}`}
          >
            {subItem.text}
          </Link>
        ))}
      </div>

      <div className="flex flex-row space-x-4 md:flex-col md:space-x-0 xl:flex-row xl:space-x-4">
        {footerLinks.map((link, index) => (
          <Link key={index} href={link.href}>
            <p className="text-l font-raleway pt-2 font-normal hover:text-gray-300">
              {link.text}
            </p>
          </Link>
        ))}
      </div>

      <h3 className="font-raleway mt-4 pt-0 text-lg font-bold md:pt-7">
        {languages.get('connectWithMoc')}
      </h3>
      <div className="mb-8 mt-2 flex space-x-4 md:mb-0">
        {socialIcons.map(icon => (
          <Icon key={icon.key} src={icon.src} alt={icon.alt} size="small" />
        ))}
      </div>
    </div>
  );
};

const FooterMiddle = () => (
  <div className="bg-primary text-white 2xl:px-96">
    <div className="container mx-auto flex flex-col justify-between md:flex-row md:px-6">
      <FooterContactInfo className="order-2 w-full flex-1 md:order-none md:w-1/3" />
      <FooterLogo className="order-1 w-full flex-1 md:order-none md:w-1/3" />
      <FooterLinks className="order-3 w-full flex-1 md:order-none md:w-1/3" />
    </div>
  </div>
);

const FooterBottom = () => (
  <>
    <Line />
    <div className="bg-primary text-white 2xl:px-96">
      <div className="container mx-auto flex justify-between px-6 lg:px-0">
        <FooterPolicies />
        <FooterRights />
      </div>
    </div>
  </>
);

const FooterPolicies = () => (
  <div className="flex w-1/2 items-center py-6 md:p-2">
    <div className="flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0 lg:space-x-32">
      <Link href="/policy">
        <p className="text-l font-raleway font-normal">
          {languages.get('policy')}
        </p>
      </Link>
      {/* TODO: HIẾU Enable this line when terms are finalized */}
      {/* <p className="text-l font-normal font-raleway">{languages.get('terms')}</p> */}
    </div>
  </div>
);

const FooterRights = () => (
  <div className="mx-0 w-1/2 py-6 text-start md:text-end lg:mx-32">
    <p className="text-l font-raleway font-normal">
      {languages.get('allRightsReserved')}
    </p>
  </div>
);

const Footer = () => (
  <footer>
    <FooterTop />
    <FooterMiddle />
    <FooterBottom />
  </footer>
);

export default Footer;
