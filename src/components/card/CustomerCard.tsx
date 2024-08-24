import React from 'react';
import Image from 'next/image';
import images from "@/configs/images";
import languages from "@/configs/languages";

interface CardCustomerProps {
    imageCustomerUrl?: string;
    textDescription?: string;
    nameCustomer?: string;
}

const CustomerCard: React.FC<CardCustomerProps> = ({imageCustomerUrl, textDescription, nameCustomer}) => {
    return (
        <div>
            <div className={`bg-cover bg-no-repeat bg-center w-412 h-327 ${imageCustomerUrl}`}>
                <div className="flex flex-col justify-end items-start h-full px-6 pb-7">
                    <div>
                        <Image
                            src={images.icons.homeQuoteCustomer}
                            alt='quote'
                            width={51.88}
                            height={46.69}
                            className="opacity-20"
                        />
                    </div>
                    <div className="text-white text-start font-raleway font-medium pt-5">
                        <p className="text-lg break-words">{textDescription}</p> {/* Added break-words */}
                    </div>
                </div>
            </div>

            <div className='pt-6'>
                <p className="text-xl font-raleway font-semibold uppercase">{nameCustomer}</p>
                <p className="text-lg text-gray-100 font-raleway mt-2">{languages.get('home.title.p.roleCustomer')}</p>
            </div>
        </div>
    );
};

export default CustomerCard;
