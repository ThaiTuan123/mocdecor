'use client';

import images from '@/configs/images';
import languages from '@/configs/languages';
import { Collapse } from 'antd';
import { useState } from 'react';
import { collapseData } from './constant';
import FooterDiscover from '@/components/footer/FooterDiscover';
import './style.css';

const { Panel } = Collapse;

export default function Policy() {
  const [collapseActive, setCollapseActive] = useState<string | string[]>([]);

  const renderHero = () => {
    return (
      <div className="flex min-h-44 justify-center bg-image-hero-policy bg-cover bg-no-repeat py-8 text-white md:min-h-80 md:py-16">
        <div className="flex w-full flex-col items-center gap-2 px-10 md:w-1/2 md:px-0">
          <div className="flex flex-row gap-1">
            <span className="text-black-50">
              {languages.get('policy.hero.intro.text')}
            </span>
            <span>/</span>
            <span>{languages.get('policy.hero.policy.text')}</span>
          </div>
          <h1 className="text-center text-2xl font-bold uppercase md:text-6lg">
            {languages.get('policy.title')}
          </h1>
          <p className="text-center text-sm md:text-2lg">
            {languages.get('policy.desc')}
          </p>
        </div>
      </div>
    );
  };

  const onChangeCollapse = (key: string | string[]) => {
    setCollapseActive(key);
  };

  const renderCollapsePolicy = () => {
    const renderHeaderCollapse = (index: number, title: string) => {
      return (
        <div className="flex items-center gap-2 sm:gap-20">
          <span className="font-raleway text-xs text-doveGray sm:text-2lg">
            0{index + 1}
          </span>
          <span className="font-raleway text-sm text-karaka sm:text-2lg">
            {title}
          </span>
        </div>
      );
    };

    const renderDescCollapse = (item: { title: string; desc: string }[]) => {
      const combinedRegex =
        /(\+?\d{1,4}[\s-]?\(?\d{1,3}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9})|((http|https):\/\/[^\s]+)/g;

      const highlightPhoneNumbers = (text: string) => {
        return text.replace(combinedRegex, match => {
          if (
            match.match(
              /^(\+?\d{1,4}[\s-]?\(?\d{1,3}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9})/
            )
          ) {
            return `<a href="tel:${match.replace(/\D/g, '')}" class="text-primary hover:underline hover:text-brown-400">${match}</a>`;
          }
          return `<span class="text-primary">${match}</span>`;
        });
      };

      return (
        <div className="flex flex-col gap-7">
          {item.map((item, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <p className="font-raleway text-xs font-bold text-karaka sm:text-1.25lg">
                {item?.title}
              </p>
              <span
                className="font-raleway whitespace-pre-line text-sm text-karaka sm:text-1.25lg"
                dangerouslySetInnerHTML={{
                  __html: highlightPhoneNumbers(item?.desc),
                }}
              />
            </div>
          ))}
        </div>
      );
    };

    return (
      <Collapse
        onChange={onChangeCollapse}
        className="mb-14 mt-14 border-b border-t border-solid border-stroke"
        bordered={false}
      >
        {collapseData.map((item, index) => (
          <Panel
            className="hover:bg-pampas"
            showArrow={false}
            header={renderHeaderCollapse(index, item.header)}
            key={index}
            extra={
              <img
                alt={item.header}
                src={
                  collapseActive.includes(index.toString())
                    ? images.icons.ic_minus
                    : images.icons.ic_plus
                }
                className="h-4 w-4 transition-transform duration-300 hover:scale-150"
              />
            }
          >
            {renderDescCollapse(item.desc)}
          </Panel>
        ))}
      </Collapse>
    );
  };

  return (
    <>
      {renderHero()}
      {renderCollapsePolicy()}
      {FooterDiscover()}
    </>
  );
}
