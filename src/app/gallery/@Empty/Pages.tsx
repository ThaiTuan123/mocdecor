import images from '@/configs/images';
import languages from '@/configs/languages';
import Image from 'next/image';

export default function Empty() {
  // Extract constants for image dimensions and text
  const galleryTitle = languages.get('galley.empty.title');
  const galleryDescription = languages.get('galley.empty.desc');

  const imageConfig = {
    desktop: {
      src: images.emptyGallery,
      width: 399,
      height: 399,
    },
    mobile: {
      src: images.emptyGallery,
      width: 161,
      height: 161,
    },
  };

  return (
    <div className="flex h-80 flex-col justify-between px-8 py-8 md:h-525 md:flex-row md:px-0 md:py-0">
      <div className="order-2 flex flex-none items-center justify-end bg-white bg-cover pr-0 md:order-none md:flex-1 md:bg-image-left-error md:pr-5">
        <div className="flex w-full flex-col items-center gap-2 md:w-2/3 md:items-start md:gap-6">
          <p className="text-2lg font-semibold text-primary md:text-4lg">
            {galleryTitle}
          </p>
          <span className="text-center text-sm text-karaka md:text-left md:text-2lg">
            {galleryDescription}
          </span>
        </div>
      </div>
      <div className="order-1 flex flex-none items-center justify-center md:order-none md:flex-1">
        {/* Desktop Image */}
        <Image
          src={imageConfig.desktop.src}
          alt="Empty Gallery"
          width={imageConfig.desktop.width}
          height={imageConfig.desktop.height}
          className="hidden animate-moveUpDown md:block"
        />
        {/* Mobile Image */}
        <Image
          src={imageConfig.mobile.src}
          alt="Empty Gallery"
          width={imageConfig.mobile.width}
          height={imageConfig.mobile.height}
          className="block md:hidden"
        />
      </div>
    </div>
  );
}
