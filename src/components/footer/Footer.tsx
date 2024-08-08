import React from 'react';
import images from "@/configs/images";
import languages from '@/configs/languages';

import IconWithText from "@/components/icons/IconWithText";
import Icon from "@/components/icons/Icon";
import Line from "@/components/shape/Lines";
import {footerIcons, socialIcons} from "@/components/footer/constant";

const FooterTop = () => (
    <div className="text-white py-1 bg-punga">
        <div className="container mx-auto flex justify-between h-24">
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
);

const FooterMiddle = () => (
    <div className="bg-primary text-white">
        <div className="container mx-auto flex justify-between">
            <FooterContactInfo/>
            <FooterLogo/>
            <FooterLinks/>
        </div>
    </div>
);

const FooterContactInfo = () => {
    const contactInfoTitle = languages.get('contactInfo');
    const addressLabel = `${languages.get('txtAddress')} ${languages.get('address')}`;
    const phoneLabel = `${languages.get('txtPhone')} ${languages.get('phone')}`;
    const emailLabel = `${languages.get('txtEmail')} ${languages.get('email')}`;

    return (
        <div className="w-1/3 py-6 p-2">
            <h3 className="text-2xl font-playfairBold font-bold">{contactInfoTitle}</h3>
            <p className="text-l font-normal font-raleway pt-4">{addressLabel}</p>
            <p className="text-l font-normal font-raleway">{phoneLabel}</p>
            <p className="text-l font-normal font-raleway">{emailLabel}</p>
        </div>
    );
};

const FooterLogo = () => (
    <div className="w-1/3 text-center bg-image-footer bg-no-repeat bg-cover mx-10 py-6">
        <img src={images.logoWhite} alt="Moc Decor Logo" className="mx-auto mb-2 w-36 h-36"/>
    </div>
);

const FooterLinks = () => (
    <div className="w-1/3 py-6 ml-32">
        <h3 className="text-lg font-bold">{languages.get('whatMocHas')}</h3>
        <p className="pt-4 text-l font-normal font-raleway">{languages.get('flowerFrame')}</p>
        <p className="text-l font-normal font-raleway">{languages.get('handmadeFrame')}</p>
        <h3 className="text-lg font-bold mt-4 pt-7">{languages.get('connectWithMoc')}</h3>
        <div className="flex space-x-4 mt-2">
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

const FooterBottom = () => (
    <>
        <Line/>
        <div className="bg-primary text-white">
            <div className="container mx-auto flex justify-between">
                <FooterPolicies/>
                <FooterRights/>
            </div>
        </div>
    </>
);

const FooterPolicies = () => (
    <div className="w-1/2 py-6 p-2">
        <div className="flex space-x-32">
            <p className="text-l font-normal font-raleway">{languages.get('policy')}</p>
            <p className="text-l font-normal font-raleway">{languages.get('terms')}</p>
        </div>
    </div>
);

const FooterRights = () => (
    <div className="w-1/2 text-end mx-32 py-6">
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
