"use client";

import images from "@/configs/images";
import Image from 'next/image';
import languages from "@/configs/languages";
import React from "react";

export default function NotFound() {
    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center justify-center">
                <div className="text-center lg:text-start flex-none	lg:flex-1 order-3 lg:order-1 ">
                    <div
                        className=' px-6 md:px-20 md:py-12 py-6 lg:py-72 lg:bg-image-left-error md:bg-contain md:bg-fixed md:bg-no-repeat'>
                        <h1 className=" text-2xl md:text-4xl font-bold mb-4 text-primary font-playfairBold">{languages.get('404.error.Title')}</h1>
                        <p className="text-sm md:text-lg mb-2 md:mb-5 lg:mb-6">{languages.get('404.error.Message1')}</p>
                        <p className="text-sm md:text-lg mb-4 md:mb-5 lg:mb-6">{languages.get('404.error.Message2')}</p>

                        <button onClick={() => window.location.href = '/'}
                                className="text-white px-24 md:px-16 lg:px-20 py-4 rounded uppercase bg-primary hover:scale-105 duration-150
                                transform font-raleway">
                            {languages.get('404.button.returnHome')}
                        </button>

                    </div>
                </div>
                <div
                    className="flex justify-center flex-none lg:flex-1 animate-upDown order-1 lg:order-3 mt-10 lg:mt-0">
                    <Image src={images.image404} alt="Broken" width={500} height={400}
                           className='w-272 md:w-327 lg:w-500'/>
                </div>
            </div>
        </div>
    );
}
