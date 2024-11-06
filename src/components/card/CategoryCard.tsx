import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ARROW_RIGHT} from "@/utils/constants";
import {CategoryType} from "@/types/categoryType";
import images from "@/configs/images";
import {motion} from 'framer-motion';

interface CategoryCardProps {
    category: CategoryType;
    index: number;
}

const hoverAnimation = {
    initial: {opacity: 0, scale: 0.8},
    animate: {opacity: 1, scale: 1},
    exit: {opacity: 0, scale: 0.8},
    transition: {duration: 0.3, ease: "easeInOut"}
};

const CategoryCard: React.FC<CategoryCardProps> = ({category, index}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative mb-6 md:mb-0 group cursor-pointer px-6 md:px-0"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative">
                <Image
                    src={category.image && category.image !== '' ? category.image : images.image404}
                    alt={category.name}
                    width={474}
                    height={382}
                    className="mx-auto rounded h-150 md:h-252 lg:h-379 object-cover lg:object-fill"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(82,59,24,0.9)] rounded"></div>
            </div>
            {/* Category name for desktop */}
            <div
                className="hidden absolute md:flex flex-row md:flex-col justify-between md:justify-center items-start md:items-center bottom-4 left-8 md:left-0 w-full"
            >
                <h3 className="text-2xl md:text-5lg font-bold my-4 text-center text-white uppercase font-playfairBold">
                    {category.name}
                </h3>
                <Link href={`/products/${category.enName}/${category.slug}`}>
                    <motion.div
                        className="hidden md:flex flex-col bg-white w-14 items-center rounded"
                        initial={hoverAnimation.initial}
                        animate={hovered ? hoverAnimation.animate : hoverAnimation.exit}
                        transition={hoverAnimation.transition}
                    >
                        <span className="text-primary text-2xl">{ARROW_RIGHT}</span>
                    </motion.div>
                </Link>
            </div>
            {/* Category name for mobile */}
            <div
                className="absolute flex md:hidden flex-row justify-between items-start bottom-4 left-0 mx-auto w-full">
                <h3 className="ml-8 text-2xl font-bold my-4 text-center text-white uppercase font-playfairBold">
                    {category.name}
                </h3>
                <Link href={`/products/${category.enName}/${category.slug}`}>
                    <div
                        className="mr-8 mt-4 flex flex-col items-center bg-white w-14 content-center rounded transition duration-700 ease-in-out">
                        <span className="text-primary text-2xl">{ARROW_RIGHT}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CategoryCard;