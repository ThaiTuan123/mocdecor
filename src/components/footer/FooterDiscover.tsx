import languages from "@/configs/languages";
import images from "@/configs/images";
import Link from "next/link";
import Image from "next/image";

const FooterDiscover = () => {
    const footerTitle = languages.get("policy.footer.title");
    const footerButtonText = languages.get("policy.footer.button.text");
    const footerOrText = languages.get("policy.footer.or.text");
    const socialLinks = [
        {
            href: "https://www.instagram.com/mocdecor99/",
            imgSrc: images.icons.instagramColor,
            altText: "Instagram",
        },
        {
            href: "https://www.tiktok.com/@_mocdecor99_?lang=vi-VN",
            imgSrc: images.icons.tiktokColor,
            altText: "TikTok",
        },
    ];

    return (
        <div className="px-6 md:px-0 bg-image-footer-policy bg-no-repeat bg-cover flex items-center flex-col pb-14 pt-24 text-white">
            <h2 className="font-playfairBold text-2xl md:text-4lg mb-6 text-center px-6 md:px-0">
                {footerTitle}
            </h2>
            <Link href={'/products/Khung%20anh/khung-dep'} className="w-52 h-12 flex items-center justify-center border-primary border-solid border-2 cursor-pointer mb-6 md:mb-8 bg-white rounded hover:scale-105">
                <span className="font-raleway text-primary font-bold text-lg">
                    {footerButtonText}
                </span>
            </Link>
            <div className="flex items-center gap-3.5 mb-6">
                <div className="h-px w-11 bg-white"></div>
                <span>{footerOrText}</span>
                <div className="h-px w-11 bg-white"></div>
            </div>
            <div className="flex items-center gap-5">
                {socialLinks.map(({ href, imgSrc, altText }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" key={href}>
                        <div className="w-11 h-11 bg-white flex items-center justify-center rounded hover:scale-105">
                            <Image
                                src={imgSrc}
                                alt={altText}
                                width={44}
                                height={44}
                            />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default FooterDiscover;