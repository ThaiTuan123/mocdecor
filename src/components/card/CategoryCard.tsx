import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARROW_RIGHT } from '@/utils/constants';
import { CategoryType } from '@/types/categoryType';
import images from '@/configs/images';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  category: CategoryType;
  index: number;
}

const hoverAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [hovered, setHovered] = useState(false);

  const checkImage = (url: string) => {
    if (url.startsWith('https://')) {
      return true;
    }
    return false;
  };

  return (
    <div
      className="group relative mb-6 cursor-pointer px-6 md:mb-0 md:px-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <Image
          src={checkImage(category.image) ? category.image : images.image404}
          alt={category.name}
          width={421}
          height={379}
          className="mx-auto h-150 rounded object-cover md:h-252 lg:h-379 lg:object-fill"
          priority={true}
        />
        <div className="absolute inset-0 rounded bg-gradient-to-b from-transparent to-[rgba(82,59,24,0.9)]"></div>
      </div>
      {/* Category name for desktop */}
      <div className="absolute bottom-4 left-8 hidden w-full flex-row items-start justify-between md:left-0 md:flex md:flex-col md:items-center md:justify-center">
        <h3 className="font-playfairBold my-4 text-center text-2xl font-bold uppercase text-white md:text-5lg">
          {category.name}
        </h3>
        <Link href={`/products/${category.slug}/${category.slug}`}>
          <motion.div
            className="hidden w-14 flex-col items-center rounded bg-white md:flex"
            initial={hoverAnimation.initial}
            animate={hovered ? hoverAnimation.animate : hoverAnimation.exit}
            transition={hoverAnimation.transition}
          >
            <span className="text-2xl text-primary">{ARROW_RIGHT}</span>
          </motion.div>
        </Link>
      </div>
      {/* Category name for mobile */}
      <div className="absolute bottom-4 left-0 mx-auto flex w-full flex-row items-start justify-between md:hidden">
        <h3 className="font-playfairBold my-4 ml-8 text-center text-2xl font-bold uppercase text-white">
          {category.name}
        </h3>
        <Link href={`/products/${category.slug}/${category.slug}`}>
          <div className="mr-8 mt-4 flex w-14 flex-col content-center items-center rounded bg-white transition duration-700 ease-in-out">
            <span className="text-2xl text-primary">{ARROW_RIGHT}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
