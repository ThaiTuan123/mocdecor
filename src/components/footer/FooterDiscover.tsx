import languages from '@/configs/languages';
import images from '@/configs/images';
import Link from 'next/link';
import Image from 'next/image';

const FooterDiscover = () => {
  const footerTitle = languages.get('policy.footer.title');
  const footerButtonText = languages.get('policy.footer.button.text');
  const footerOrText = languages.get('policy.footer.or.text');
  const socialLinks = [
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

  return (
    <div className="flex flex-col items-center bg-image-footer-policy bg-cover bg-no-repeat px-6 pb-14 pt-24 text-white md:px-0">
      <h2 className="mb-6 px-6 text-center text-2xl font-bold md:px-0 md:text-4lg">
        {footerTitle}
      </h2>
      <Link
        href={'/products/Khung%20anh/khung-dep'}
        className="mb-6 flex h-12 w-52 cursor-pointer items-center justify-center rounded border-2 border-solid border-primary bg-white hover:scale-105 md:mb-8"
      >
        <span className="font-raleway text-lg font-bold text-primary">
          {footerButtonText}
        </span>
      </Link>
      <div className="mb-6 flex items-center gap-3.5">
        <div className="h-px w-11 bg-white"></div>
        <span>{footerOrText}</span>
        <div className="h-px w-11 bg-white"></div>
      </div>
      <div className="flex items-center gap-5">
        {socialLinks.map(({ href, imgSrc, altText }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" key={href}>
            <div className="flex h-11 w-11 items-center justify-center rounded bg-white hover:scale-105">
              <Image src={imgSrc} alt={altText} width={44} height={44} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterDiscover;
