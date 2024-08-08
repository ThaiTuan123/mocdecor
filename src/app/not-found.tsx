import images from "@/configs/images";
import Image from 'next/image';
import languages from "@/configs/languages";

export default function NotFound() {
    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="text-start flex-1">
                    {/*TODO Change background color without using bg-amber-200 and response mobile*/}
                    <div className='content-center px-40 py-72 bg-image-left-error bg-contain bg-fixed bg-no-repeat'>
                        <h1 className="text-4xl font-bold mb-4 text-primary font-playfairBold">{languages.get('404.error.Title')}</h1>
                        <p className="text-lg mb-8">{languages.get('404.error.Message')}</p>
                    </div>
                </div>
                <div className="flex justify-center flex-1 animate-upDown">
                    <Image src={images.image404} alt="Broken" width={500} height={400}/>
                </div>
            </div>
        </div>
    );
}
