import images from "@/configs/images";
import languages from "@/configs/languages";
import Image from "next/image";

export default function NotFoundGallery() {
    return (
        <div className="flex h-525">
            <div className="flex flex-1 bg-image-left-error bg-cover pr-5 justify-end items-center">
                <div className="flex flex-col w-4/5 gap-6">
                    <h2 className="text-primary text-4lg">{languages.get("galley.not.found.title")}</h2>
                    <span className="text-karaka text-2lg">{languages.get("galley.not.found.desc")}</span>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <Image src={images.notFoundGallery} alt="" width={564} height={376}/>
            </div>
        </div>
    )
}