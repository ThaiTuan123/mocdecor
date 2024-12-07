import images from "@/configs/images";
import languages from "@/configs/languages";
import Image from "next/image";

export default function Empty() {
    // Extract constants for image dimensions and text
    const galleryTitle = languages.get("galley.empty.title");
    const galleryDescription = languages.get("galley.empty.desc");

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
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-80 md:h-525 justify-between py-8 md:py-0 px-8 md:px-0">
            <div
                className="order-2 md:order-none flex flex-none md:flex-1 bg-white md:bg-image-left-error bg-cover pr-0 md:pr-5 justify-end items-center">
                <div className="flex flex-col w-full md:w-2/3 gap-2 md:gap-6 items-center md:items-start">
                    <p className="text-primary font-semibold text-2lg md:text-4lg">{galleryTitle}</p>
                    <span className="text-karaka text-sm md:text-2lg text-center md:text-left">{galleryDescription}</span>
                </div>
            </div>
            <div className="order-1 md:order-none flex flex-none md:flex-1 items-center justify-center">
                {/* Desktop Image */}
                <Image
                    src={imageConfig.desktop.src}
                    alt="Empty Gallery"
                    width={imageConfig.desktop.width}
                    height={imageConfig.desktop.height}
                    className="hidden md:block animate-moveUpDown"
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