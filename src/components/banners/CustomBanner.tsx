import React from "react";

interface CustomBannerProps {
    backgroundImage: string;
    breadcrumb: string[];
    title: string;
    description: string;
}

const CustomBanner: React.FC<CustomBannerProps> = ({backgroundImage, breadcrumb, title, description}) => {
    return (
        <div className={`bg-cover bg-center h-80 ${backgroundImage}`}>
            <div className="container mx-auto h-full flex items-center justify-center flex-col">
                <div className='flex'>
                    {breadcrumb.map((crumb, index) => (
                        <p key={index}
                           className={index === breadcrumb.length - 1 ? "text-white" : "text-black-50 px-1"}>
                            {crumb}{index !== breadcrumb.length - 1 && " / "}
                        </p>
                    ))}
                </div>
                <h1 className="text-6xl font-bold text-white font-playfairBold py-2">{title}</h1>
                <p className="text-xl text-center text-white px-80 font-raleway">{description}</p>
            </div>
        </div>
    );
}

export default CustomBanner;