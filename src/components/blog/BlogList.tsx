import { Blog } from '@/types/blogTypes';
import React from 'react';
import Image from 'next/image';
import images from '@/configs/images';
import TitleText from '@/components/texts/TitleText';
import languages from '@/configs/languages';
import Heading2 from '@/components/texts/Heading2';
import Heading3 from '@/components/texts/Heading3';
import MotionImageCard from '@/components/card/MotionImageCar';
import SolidButton from '@/components/button/SolidButton';

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  if (!blogs || blogs.length < 3) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">
            Mộc đang điều chỉnh nội dung
          </h2>
          <p className="mt-2 text-gray-600">
            Nội dung mộc đang điều chỉnh bạn vui lòng đợi mộc một vài giây nhé!.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background image section */}
      <div className="relative h-218 md:h-80">
        <Image
          src={images.imageProductStory} // Replace with your actual image path
          alt="Product Story Background"
          fill={true}
          quality={75} // Optimize image quality
          className={'object-cover'}
          priority={true}
        />
        <div className="absolute inset-0 z-10"></div>
        <div className="relative z-20 flex w-full flex-col px-7 pt-16 md:px-0">
          <TitleText
            firstText={languages.get('home.title.firstText.story')}
            secondText={languages.get('home.title.secondText.story')}
          />
          <Heading2
            className="mb-6 md:mb-8"
            text={languages.get('home.title.header2.story')}
          />
        </div>
      </div>

      {/* Content section */}
      <div
        id="content"
        className="absolute inset-0 z-30 mx-auto mt-44 md:mt-52 lg:max-w-7xl"
      >
        <div className="flex w-full md:h-[600]">
          {/* Left side background image */}
          <div className="relative hidden w-full items-end justify-between rounded px-8 py-8 md:flex md:w-3/5">
            <Image
              src={blogs[2].eyecatch.url} // Gắn ảnh từ blog đầu tiên
              alt={blogs[2].title} // Alt từ blog đầu tiên
              fill={true}
              className="rounded object-cover" // Optional styling
              quality={75}
              priority
            />
            <div className="z-10 flex w-full justify-between">
              {/* Content over the image */}
              <Heading3
                className="text-white xl:w-[326px]"
                size={'text-2xl'}
                text={blogs[2].title}
              />
              <SolidButton
                text={languages.get('button.readMore')}
                href={`/blog/${blogs[2].id}`}
              />
            </div>
          </div>
          {/* Right side motion cards */}
          <div className="flex w-full flex-col px-6 md:w-2/5 md:px-0 md:pl-4">
            <MotionImageCard
              src={blogs[2].eyecatch.url}
              alt={blogs[2].title}
              text={languages.get('home.title.p.itemStory1')}
              className={'visible md:hidden'}
              href={`/blog/${blogs[2].id}`}
            />
            <MotionImageCard
              src={blogs[0].eyecatch.url}
              alt={blogs[0].title}
              text={blogs[0].title}
              href={`/blog/${blogs[0].id}`}
            />
            <MotionImageCard
              src={blogs[1].eyecatch.url}
              alt={blogs[1].title}
              text={blogs[1].title}
              href={`/blog/${blogs[1].id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
