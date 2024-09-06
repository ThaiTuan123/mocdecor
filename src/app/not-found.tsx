import images from "@/configs/images";
import Image from 'next/image';
import languages from "@/configs/languages";
import CommonButton from "@/components/button/CustomButton";
import React from "react";

export default function NotFound() {
    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="text-center md:text-start flex-1 order-3 md:order-1 ">
                    {/*TODO Change background color without using bg-amber-200 and response mobile*/}
                    <div
                        className='md:content-center px-6 md:px-40 py-6 md:py-72 md:bg-image-left-error md:bg-contain md:bg-fixed md:bg-no-repeat'>
                        <h1 className="text-4xl font-bold mb-4 text-primary font-playfairBold">{languages.get('404.error.Title')}</h1>
                        <p className="text-lg mb-8">{languages.get('404.error.Message')}</p>
                        <CommonButton text={languages.get('404.button.returnHome')} href="/"/>
                    </div>
                </div>
                <div className="flex justify-center flex-1 animate-upDown order-1 md:order-3">
                    <Image src={images.image404} alt="Broken" width={500} height={400} className='w-272 md:w-500'/>
                </div>
            </div>
        </div>
    );
}
