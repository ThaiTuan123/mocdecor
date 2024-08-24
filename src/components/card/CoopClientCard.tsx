import Image from 'next/image';
import React from 'react';
import images from "@/configs/images";

const CoopClientCard = () => {
    return (
        <div className=" w-[232.77px] bg-white shadow-lg rounded py-4 px-14">
            <div className="flex justify-center">
                <Image
                    src={images.hieuServiceHome}
                    alt="Mekong Capital"
                    width={232.77} // Adjust the width and height as per your needs
                    height={142.9}
                    className='object-contain'
                />
            </div>
        </div>
    );
};

export default CoopClientCard;
