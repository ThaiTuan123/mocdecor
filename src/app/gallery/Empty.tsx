import images from "@/configs/images";
import languages from "@/configs/languages";
import Image from "next/image";

export default function Empty() {
    return (
        <div className="flex flex-col md:flex-row h-80 md:h-525 justify-between py-8 md:py-0 px-6 md:px-0">
            <div
                className="order-2 md:order-none flex flex-none md:flex-1 bg-white md:bg-image-left-error bg-cover pr-0 md:pr-5 justify-end items-center">
                <div className="flex flex-col w-full md:w-2/3 gap-2 md:gap-6 items-center md:items-start">
                    <h2 className="text-primary text-2lg md:text-4lg">{languages.get("galley.empty.title")}</h2>
                    <span className="text-karaka text-sm md:text-2lg text-center md:text-left">{languages.get("galley.empty.desc")}</span>
                </div>
            </div>
            <div className="order-1 md:order-none flex flex-none md:flex-1 items-center justify-center">
                <Image src={images.emptyGallery} alt="" width={399} height={399} className="hidden md:block"/>
                {/*On Mobile*/}
                <Image src={images.emptyGallery} alt="" width={161} height={161} className="block md:hidden"/></div>
        </div>
    )
}