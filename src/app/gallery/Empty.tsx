import images from "@/configs/images";
import languages from "@/configs/languages";
import Image from "next/image";

export default function Empty() {
    return (
        <div className="flex h-[525px]">
            <div className="flex flex-1 bg-image-left-error bg-cover pr-5 justify-end items-center">
                <div className="flex flex-col w-2/3 gap-6">
                    <h2 className="text-primary text-4lg">{languages.get("galley.empty.title")}</h2>
                    <span className="text-karaka text-2lg">{languages.get("galley.empty.desc")}</span>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <Image src={images.emptyGallery} alt="" width={399} height={399}/>
            </div>
        </div>
    )
}