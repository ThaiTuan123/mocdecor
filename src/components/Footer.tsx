import React from 'react';
import images from "@/configs/images";
import IconWithText from "@/components/icons/IconWithText";
import languages from '@/configs/languages';
import Icon from "@/components/icons/Icon";
import Line from "@/components/shape/Lines";

const footerIcons = [
    {src: images.icons.delivery, alt: 'Delivery Icon', key: 'delivery'},
    {src: images.icons.quality, alt: 'Quality Icon', key: 'quality'},
    {src: images.icons.complete, alt: 'Complete Icon', key: 'complete'},
    {src: images.icons.consultant, alt: 'Consultant Icon', key: 'consultant'},
];

const socialIcons = [
    {src: images.icons.facebookLight, alt: 'Facebook', key: 'facebook'},
    {src: images.icons.instagramLight, alt: 'Instagram', key: 'instagram'},
    {src: images.icons.tiktokLight, alt: 'Linkedin', key: 'linkedin'},
];

const Footer = () => {
    return (
        <footer>
            <div className="text-white py-1 bg-punga">
                <div className="mx-auto flex justify-around bg-punga h-24">
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
            <div className="bg-brown-800 text-white bg-pungaPrimary">
                <div className="container mx-auto flex justify-between">
                    <div className="w-1/3 py-6 p-2">
                        <h3 className="text-2xl font-playfairBold font-bold">{languages.get('contactInfo')}</h3>
                        <p className="text-l font-normal font-raleway pt-4">{languages.get('address')}</p>
                        <p className="text-l font-normal font-raleway">{languages.get('phone')}</p>
                        <p className="text-l font-normal font-raleway">{languages.get('email')}</p>
                    </div>
                    <div className="w-1/3 text-center bg-image-footer mx-10 py-6">
                        <img src={images.logoWhite} alt="Moc Decor Logo" className="mx-auto mb-2 w-36 h-36"/>
                    </div>
                    <div className="w-1/3 py-6 ml-32">
                        <h3 className="text-lg font-bold">{languages.get('whatMocHas')}</h3>
                        <p className='pt-4 text-l font-normal font-raleway'>{languages.get('flowerFrame')}</p>
                        <p className='text-l font-normal font-raleway'>{languages.get('handmadeFrame')}</p>
                        <h3 className="text-lg font-bold mt-4 pt-7">{languages.get('connectWithMoc')}</h3>
                        <div className="flex space-x-4 mt-2">
                            {socialIcons.map(icon => (
                                <Icon
                                    key={icon.key}
                                    src={icon.src}
                                    alt={icon.alt}
                                    size={"small"}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Line/>
            <div className="bg-brown-800 text-white bg-pungaPrimary">
                <div className="container mx-auto flex justify-between">
                    <div className="w-1/2 py-6 p-2">
                        <div className="flex space-x-32">
                            <p className="text-l font-normal font-raleway">{languages.get('policy')}</p>
                            <p className="text-l font-normal font-raleway">{languages.get('terms')}</p>
                        </div>
                    </div>
                    <div className="w-1/2 text-end mx-32 py-6">
                        <p className='text-l font-normal font-raleway'>{languages.get('allRightsReserved')}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
