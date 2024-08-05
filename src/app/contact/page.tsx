import Header from "@/components/Header";
import Footer from "@/components/Footer";
import languages from '@/configs/languages';
import images from "@/configs/images";
import Icon from "@/components/icons/Icon";
import React from "react";
import Line from "@/components/shape/Lines";
import CustomBanner from "@/components/banner/CustomBanner";
import CommonButton from "@/components/button/CustomButton";

const socialIcons = [
    {
        src: images.icons.facebookDark, alt: 'Facebook', key: 'facebook',
        tooltip: languages.get('contact.tooltip.facebook'),
    },
    {
        src: images.icons.instagramDark,
        alt: 'Instagram',
        key: 'instagram',
        tooltip: languages.get('contact.tooltip.instagram'),
    },
    {
        src: images.icons.tiktokDark,
        alt: 'Tiktok',
        key: 'tiktok',
        tooltip: languages.get('contact.tooltip.tiktok'),
    },
];

const contactItems = [
    {
        icon: images.icons.contactLocation,
        alt: "Map Marker",
        key: "address",
    },
    {
        icon: images.icons.contactPhone,
        alt: "Phone",
        key: "phone",
    },
    {
        icon: images.icons.contactMail,
        alt: "Email",
        key: "email",
    },
];

export default function Contact() {
    return (
        <div>
            <Header/>
            <CustomBanner
                backgroundImage="bg-image-contact"
                breadcrumb={["Giới thiệu", "Liên hệ"]}
                title={languages.get('contact.title.banner')}
                description={languages.get('contact.subTitle.banner')}
            />
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className='px-16'>
                        <h3 className="text-4xl font-playfairBold text-primary mb-4">{languages.get('contact.subtitle.findUs')}</h3>
                        <p className="mb-8 text-karaka font-normal">{languages.get('contact.subTitle.description')}</p>
                        <Line></Line>
                        <ul className="mb-4 mt-8 bg-pampas rounded-lg px-8 py-6 space-y-5">
                            {contactItems.map((item, index) => (
                                <li key={index} className="flex items-center text-karaka">
                                    <img src={item.icon} alt={item.alt} className="mr-4" width={24} height={24}/>
                                    {languages.get(item.key)}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex">
                            <h5 className="text-xl font-raleway text-caption mb-2 ">{languages.get('connectWithMoc')}</h5>
                            <div className="flex justify-around space-x-6 pt-1 pl-4">
                                {socialIcons.map(icon => (
                                    <div key={icon.key} className="relative group">
                                        <Icon
                                            src={icon.src}
                                            alt={icon.alt}
                                            size={"small"}
                                        />
                                        <div
                                            className="absolute bottom-full m-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2">
                                            {icon.tooltip}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <img className='transition-transform duration-300 transform hover:scale-110 peer'
                                 src={images.contactMap} alt="Map"/>
                        </div>
                    </div>
                    <div
                        className="bg-white p-8 rounded-lg max-w-lg outline outline-1 outline-gray-300">
                        <h1 className="text-4xl font-playfairBold text-primary mb-6">{languages.get('contact.title.name')}</h1>
                        <form className="space-y-6">
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700">{languages.get('contact.title.username')}</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                                    placeholder={languages.get('contact.placeholder.username')}
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700">{languages.get('contact.title.email')}</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                                    placeholder={languages.get('contact.placeholder.email')}
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700">{languages.get('contact.title.phone')}</label>
                                <input
                                    type="tel"
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                                    placeholder={languages.get('contact.placeholder.phone')}
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700">{languages.get('contact.title.message')}</label>
                                <textarea
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                                    placeholder={languages.get('contact.placeholder.message')}
                                ></textarea>
                            </div>
                            <CommonButton
                                type="submit"
                                className="w-full py-3 font-semibold bg-brown-500 text-white hover:bg-brown-600 hover:text-primary">
                                {languages.get('contact.button.send')}
                            </CommonButton>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}