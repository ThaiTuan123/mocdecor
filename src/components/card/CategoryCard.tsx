import React, {useState} from "react";
import Image from "next/image";
import {ARROW_RIGHT} from "@/utils/constants";
import {CategoryCardProps} from "@/types/categoryCardProps";

const CategoryCard: React.FC<CategoryCardProps> = ({category}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative mb-6 md:mb-0 group cursor-pointer"
            onClick={category.onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={category.src}
                alt={category.alt}
                width={400}
                height={300}
                className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto rounded"
            />
            <div className="absolute flex flex-col justify-center items-center bottom-4 left-0 w-full">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white uppercase font-playfairBold">
                    {category.title}
                </h3>
                <div
                    className={`flex flex-col bg-white w-14 items-center rounded transition duration-700 ease-in-out ${
                        isHovered ? "flex" : "hidden"
                    } ${!isHovered && 'md:hidden'}`}
                >
                    <span className="text-primary text-2xl">{ARROW_RIGHT}</span>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;