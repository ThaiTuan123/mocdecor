import React, {useState} from "react";
import Image from "next/image";
import {ARROW_RIGHT} from "@/utils/constants";
import {CategoryCardProps} from "@/types/categoryCardProps";
import MobileArrowButton from "@/components/button/MobileArrowButton";

const CategoryCard: React.FC<CategoryCardProps> = ({category}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleArrowClick = () => {
        // Call category.onClick or any other functionality you need
        category.onClick();
    };

    return (
        <div
            className="relative mb-6 md:mb-0 group cursor-pointer px-6 md:px-0"
            onClick={category.onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={category.src}
                alt={category.alt}
                width={474}
                height={382}
                className="mx-auto rounded h-160 md:h-379 "
            />
            <div
                className="absolute flex flex-row md:flex-col justify-around md:justify-center items-center bottom-4 left-0 w-full">
                <h3 className="text-2xl md:text-5lg font-bold my-4 text-center text-white uppercase font-playfairBold">
                    {category.title}
                </h3>

                {/* Show on mobile */}
                <MobileArrowButton onClick={handleArrowClick}/>

                {/* Show on desktop */}
                <div
                    className={`hidden md:flex flex-col bg-white w-14 items-center rounded transition duration-700 ease-in-out ${
                        isHovered ? "flex" : "hidden"
                    }`}
                    onClick={handleArrowClick} // Add onClick for desktop
                >
                    {isHovered && <span className="text-primary text-2xl">{ARROW_RIGHT}</span>}
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;