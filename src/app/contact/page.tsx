import React from "react";
import Icon from "@/components/icons/Icon";
import Line from "@/components/shape/Lines";
import CustomButton from "@/components/button/CustomButton";
import TextInput from "@/components/inputs/TextInput";
import TextareaInput from "@/components/inputs/TextareaInput";

import languages from "@/configs/languages";
import {contactItems, socialIcons} from "@/app/contact/constant";
import images from "@/configs/images";
import {ContactItemType, IconType} from "@/app/contact/types";

const HeroSection = () => (
    <div className="min-h-80 bg-image-hero-contact bg-no-repeat bg-cover flex justify-center pt-16 pb-16 text-white">
        <div className="w-1/2 flex flex-col items-center gap-2">
            <div className="flex flex-row gap-1">
                <span className="text-black-50">
                    {languages.get("about")}
                </span>
                <span>/</span>
                <span>{languages.get("contact")}</span>
            </div>
            <h1 className="uppercase font-playfairBold text-6lg text-center">
                {languages.get("contact.title.banner")}
            </h1>
            <span className="font-playfairRegular text-2lg text-center">
                {languages.get("contact.subTitle.banner")}
            </span>
        </div>
    </div>
);

const SocialIcons = ({icons}: { icons: IconType[] }) => (
    <div className="flex justify-around space-x-6 pt-1 pl-4">
        {icons.map(icon => (
            <div key={icon.key} className="group">
                <Icon src={icon.src} alt={icon.alt} size="small"/>
            </div>
        ))}
    </div>
);

const ContactItemList = ({items}: { items: ContactItemType[] }) => (
    <ul className="mb-4 mt-8 bg-pampas rounded-lg px-8 py-6 space-y-5">
        {items.map(item => (
            <li key={item.key} className="flex items-center text-karaka">
                <img src={item.icon} alt={item.alt} className="mr-4" width={24} height={24}/>
                {languages.get(item.key)}
            </li>
        ))}
    </ul>
);

const ContactDetails = () => (
    <div className="px-16">
        <h3 className="text-4xl font-playfairBold text-primary mb-4">
            {languages.get('contact.subtitle.findUs')}
        </h3>
        <p className="mb-8 text-karaka font-normal">
            {languages.get('contact.subTitle.description')}
        </p>
        <Line/>
        <ContactItemList items={contactItems}/>
        <div className="mt-4 flex">
            <h5 className="text-xl font-raleway text-caption mb-2">
                {languages.get('connectWithMoc')}
            </h5>
            <SocialIcons icons={socialIcons}/>
        </div>
        <div className="mt-4">
            <img className="transition-transform duration-300 hover:scale-110" src={images.contactMap}
                 alt="Map"/>
        </div>
    </div>
);

const ContactForm = () => (
    <div className="bg-white p-8 rounded-lg max-w-lg outline outline-1 outline-stroke">
        <h1 className="text-4xl font-playfairBold text-primary mb-6">{languages.get('contact.title.name')}</h1>
        <form className="space-y-6">
            <TextInput
                label={languages.get('contact.title.username') || ''}
                placeholder={languages.get('contact.placeholder.username') || ''}
                type="text"
            />
            <TextInput
                label={languages.get('contact.title.email') || ''}
                placeholder={languages.get('contact.placeholder.email') || ''}
                type="email"
            />
            <TextInput
                label={languages.get('contact.title.phone') || ''}
                placeholder={languages.get('contact.placeholder.phone') || ''}
                type="tel"
            />
            <TextareaInput
                label={languages.get('contact.title.message') || ''}
                placeholder={languages.get('contact.placeholder.message') || ''}
            />
            <CustomButton
                type="submit"
                className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
            >
                {languages.get('contact.button.send')}
            </CustomButton>
        </form>
    </div>
);

const ContactBody = () => (
    <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactDetails/>
            <ContactForm/>
        </div>
    </div>
);

export default function Contact() {
    return (
        <>
            <HeroSection/>
            <ContactBody/>
        </>
    );
}
