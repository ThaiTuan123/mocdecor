'use client';

import React from 'react';
import Icon from '@/components/icons/Icon';
import Line from '@/components/shape/Lines';
import CustomButton from '@/components/button/CustomButton';
import TextInput from '@/components/inputs/TextInput';
import TextareaInput from '@/components/inputs/TextareaInput';

import languages from '@/configs/languages';
import { contactItems, socialIcons } from '@/app/contact/constant';
import { ContactItemType, IconType } from '@/app/contact/types';
import { useContactForm } from '@/recoil/hooks/useContactForm';
import { GoogleMapsEmbed } from '@/utils/helpers/googleMapsEmbedHelper';
import images from '@/configs/images';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative flex h-252 justify-center py-8 text-white transition-all duration-500 md:h-80 md:py-12">
      {/* Optimized Background Image */}
      <Image
        src={images.contactHeroBackground}
        alt="Contact Hero Background"
        fill={true}
        className={'object-cover'}
        quality={80}
        priority
      />

      {/* Content */}
      <div className="relative z-10 flex w-3/5 flex-col items-center justify-center gap-2 md:w-1/2">
        <div className="flex flex-row gap-1 text-smLh">
          <span className="text-black-50">{languages.get('about')}</span>
          <span>/</span>
          <span>{languages.get('contact')}</span>
        </div>
        <h1 className="font-playfairBold text-center text-2.25lg uppercase md:text-3xl lg:text-6lg">
          {languages.get('contact.title.banner')}
        </h1>
        <span className="font-playfairRegular text-center text-sm sm:text-lg md:text-2lg">
          {languages.get('contact.subTitle.banner')}
        </span>
      </div>
    </div>
  );
};

const SocialIcons = ({ icons }: { icons: IconType[] }) => (
  <div className="flex justify-around space-x-6 pl-4 pt-1">
    {icons.map((icon) => (
      <div key={icon.key} className="group">
        <a href={icon.link} target="_blank" rel="noopener noreferrer">
          <Icon src={icon.src} alt={icon.alt} size="small" />
        </a>
      </div>
    ))}
  </div>
);

const ContactItemList = ({ items }: { items: ContactItemType[] }) => (
  <ul className="mb-4 mt-8 space-y-5 rounded-lg bg-pampas px-4 py-6 lg:px-8">
    {items.map((item) => (
      <li
        key={item.key}
        className="flex items-center text-sm text-karaka lg:text-lg"
      >
        <Image
          src={item.icon}
          alt={item.alt}
          className="mr-4 items-start"
          width={24}
          height={24}
        />
        {languages.get(item.key)}
      </li>
    ))}
  </ul>
);

const ContactDetails = () => (
  <div className="px-0 md:text-start lg:px-16">
    <h3 className="font-playfairBold mb-4 text-center text-2xl font-bold text-primary md:text-start md:text-4xl">
      {languages.get('contact.subtitle.findUs')}
    </h3>
    <p className="mb-5 text-center text-sm font-normal text-karaka md:mb-8 md:text-start md:text-lg">
      {languages.get('contact.subTitle.description')}
    </p>
    <Line />
    <ContactItemList items={contactItems} />
    <div className="mt-4 flex">
      <p className="font-raleway mb-2 text-xl text-caption">
        {languages.get('connectWithMoc')}
      </p>
      <SocialIcons icons={socialIcons} />
    </div>
    <div className="mt-4">
      <GoogleMapsEmbed />
    </div>
  </div>
);

const ContactForm = () => {
  const { formData, loading, error, success, handleChange, handleSubmit } =
    useContactForm();

  return (
    <div className="w-full rounded-lg bg-white p-6 outline outline-1 outline-stroke md:p-8 lg:max-w-lg">
      <h1 className="font-playfairBold mb-6 text-center text-2.25lg font-bold text-primary md:text-start md:text-4xl">
        {languages.get('contact.title.name')}
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <TextInput
          label={languages.get('contact.title.username') || ''}
          placeholder={languages.get('contact.placeholder.username') || ''}
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required={true}
        />
        <TextInput
          label={languages.get('contact.title.email') || ''}
          placeholder={languages.get('contact.placeholder.email') || ''}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required={true}
        />
        <TextInput
          label={languages.get('contact.title.phone') || ''}
          placeholder={languages.get('contact.placeholder.phone') || ''}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required={true}
        />
        <TextareaInput
          label={languages.get('contact.title.message') || ''}
          placeholder={languages.get('contact.placeholder.message') || ''}
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        <CustomButton
          type="submit"
          className="w-full bg-primary py-3 font-semibold text-white hover:bg-white hover:text-primary"
          text={
            loading
              ? languages.get('loading.response.title')
              : languages.get('contact.button.send')
          }
          disabled={loading}
        />
        {success && (
          <p className="text-green-600">
            {languages.get('success.response.title')}
          </p>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

const ContactBody = () => (
  <div className="container mx-auto max-w-screen-xl px-6 py-8 lg:px-4 lg:py-20">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ContactDetails />
      <ContactForm />
    </div>
  </div>
);

export default function Contact() {
  return (
    <>
      <HeroSection />
      <ContactBody />
    </>
  );
}
