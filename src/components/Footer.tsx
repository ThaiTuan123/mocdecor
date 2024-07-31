import React from 'react';
import images from "@/configs/images";
import IconWithText from "@/components/icons/IconWithText";
import languages from '@/configs/languages';
import Icon from "@/components/icons/Icon";
import Line from "@/components/shape/Lines";

const Footer = () => {
    return (
        <footer>
            <div className="text-white py-1 bg-punga">
                <div className="mx-auto flex justify-around bg-punga h-24">
                    <IconWithText src={images.icons.delivery} alt="Delivery Icon" size="large"
                                  text={languages.get('delivery')}/>
                    <IconWithText src={images.icons.quality} alt="Quality Icon" size="large"
                                  text={languages.get('quality')}/>
                    <IconWithText src={images.icons.complete} alt="Complete Icon" size="large"
                                  text={languages.get('complete')}/>
                    <IconWithText src={images.icons.consultant} alt="Consultant Icon" size="large"
                                  text={languages.get('consultant')}/>
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
                        <img src={images.logoWhite} alt="Moc Decor Logo" className="mx-auto mb-2 w-32 h-32"/>
                    </div>
                    <div className="w-1/3 text-right py-6">
                        <h3 className="text-lg font-bold">{languages.get('whatMocHas')}</h3>
                        <p className='pt-4 text-l font-normal font-raleway'>{languages.get('flowerFrame')}</p>
                        <p className='text-l font-normal font-raleway'>{languages.get('handmadeFrame')}</p>
                        <h3 className="text-lg font-bold mt-4 pt-7">{languages.get('connectWithMoc')}</h3>
                        <div className="flex justify-end space-x-4 mt-2">
                            <Icon src={images.icons.facebookLight} alt="Facebook" size={"small"}/>
                            <Icon src={images.icons.instagramLight} alt="Instagram" size={"small"}/>
                            <Icon src={images.icons.tiktokLight} alt="Linkedin" size={"small"}/>
                        </div>
                    </div>
                </div>
            </div>
            <Line/>
            <div className="bg-brown-800 text-white bg-pungaPrimary">
                <div className="bg-brown-800 text-white bg-pungaPrimary">
                    <div className="container mx-auto flex justify-between">
                        <div className="w-1/2 py-6 p-2">
                            <div className="flex space-x-32">
                                <p className="text-l font-normal font-raleway">{languages.get('policy')}</p>
                                <p className="text-l font-normal font-raleway">{languages.get('terms')}</p>
                            </div>
                        </div>
                        <div className="w-1/2 text-center mx-10 py-6">
                            <p className='text-l font-normal font-raleway'>{languages.get('allRightsReserved')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
