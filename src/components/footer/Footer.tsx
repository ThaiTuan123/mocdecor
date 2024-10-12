import React from 'react';
import images from "@/configs/images";
import languages from '@/configs/languages';
import Image from 'next/image';

import IconWithText from "@/components/icons/IconWithText";
import Icon from "@/components/icons/Icon";
import Line from "@/components/shape/Lines";
import {footerIcons, socialIcons} from "@/components/footer/constant";

const FooterTop = () => (
    <div className="text-white md:py-1 bg-punga py-8 px-6 2xl:px-96	">
        <div className="container mx-auto h-52 md:h-24 flex items-center ">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-between w-full ">
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

const FooterContactInfo = ({className}: FooterContactInfoProps) => {
    const contactInfoTitle = languages.get('contactInfo');
    const addressLabel = `${languages.get('txtAddress')} ${languages.get('address')}`;
    const phoneLabel = `${languages.get('txtPhone')} ${languages.get('phone')}`;
    const emailLabel = `${languages.get('txtEmail')} ${languages.get('email')}`;

    return (
        <div className={`w-1/3 py-6 md:px-2 px-6 ${className}`}>
            <h3 className="text-2xl font-playfairBold font-bold">{contactInfoTitle}</h3>
            <p className="text-l font-normal font-raleway pt-4">{addressLabel}</p>
            <p className="text-l font-normal font-raleway">{phoneLabel}</p>
            <p className="text-l font-normal font-raleway">{emailLabel}</p>
        </div>
    );
};

interface FooterLogoProps {
    className?: string;
}

const FooterLogo = ({className}: FooterLogoProps) => (
    <div className={`w-1/3 flex items-center justify-center bg-image-footer bg-no-repeat bg-cover ${className}`}>
        <Image
            src={images.logoWhite}
            alt="Moc Decor Logo"
            width={144} // Replace with the actual width of your image
            height={144} // Replace with the actual height of your image
            className="mx-auto mb-2 md:w-36 md:h-36 w-64 h-64"
        />
    </div>
);


interface FooterLinksProps {
    className?: string;
}

const FooterLinks = ({className}: FooterLinksProps) => (
    <div className={`w-1/3 py-0 md:py-6 ml-0 px-6 md:px-16 ${className}`}>
        <h3 className="text-2xl font-playfairBold font-bold">{languages.get('whatMocHas')}</h3>
        <p className="pt-4 text-l font-normal font-raleway">{languages.get('flowerFrame')}</p>
        <p className="text-l font-normal font-raleway">{languages.get('handmadeFrame')}</p>
        <h3 className="text-lg font-bold mt-4 pt-0 md:pt-7">{languages.get('connectWithMoc')}</h3>
        <div className="flex space-x-4 mt-2 mb-8 md:mb-0 ">
            {socialIcons.map(icon => (
                <Icon
                    key={icon.key}
                    src={icon.src}
                    alt={icon.alt}
                    size="small"
                />
            ))}
        </div>
    </div>
);


const FooterMiddle = () => (
    <div className="bg-primary text-white 2xl:px-96">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
            <FooterContactInfo className="order-2 w-full md:order-none md:w-1/3"/>
            <FooterLogo className="order-1 w-full md:order-none md:w-1/3"/>
            <FooterLinks className="order-3 w-full md:order-none md:w-1/3"/>
        </div>
    </div>
);

const FooterBottom = () => (
    <>
        <Line/>
        <div className="bg-primary text-white 2xl:px-96">
            <div className="container mx-auto flex justify-between">
                <FooterPolicies/>
                <FooterRights/>
            </div>
        </div>
    </>
);

const FooterPolicies = () => (
    <div className="w-1/2 py-6 md:p-2 flex items-center">
        <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-32">
            <p className="text-l font-normal font-raleway">{languages.get('policy')}</p>
            <p className="text-l font-normal font-raleway">{languages.get('terms')}</p>
        </div>
    </div>
);

const FooterRights = () => (
    <div className="w-1/2 text-start md:text-end mx-0 md:mx-32 py-6">
        <p className="text-l font-normal font-raleway">{languages.get('allRightsReserved')}</p>
    </div>
);

const Footer = () => (
    <footer>
        <FooterTop/>
        <FooterMiddle/>
        <FooterBottom/>
    </footer>
);

export default Footer;
