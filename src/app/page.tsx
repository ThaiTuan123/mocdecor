import languages from "@/configs/languages";
import colors from "@/configs/colors";
import {Product} from "@/components";

export default function Home() {
    console.log(`bg-${colors.Home.navbar_bg} w-100 h-100`)
    return (
        <>
            <div className={`bg-${colors.Home.navbar_bg} w-100 h-100`}>{languages.get('header')}</div>
            <Product/>
            <div className="font-raleway">
                This text uses the Raleway font.
            </div>
            <div className="font-playfairRegular">
                This text uses the Playfair Display Regular font.
            </div>
            <div className="font-playfairMedium">
                This text uses the Playfair Display Medium font.
            </div>
            <div className="font-playfairBold">
                MỘC DECOR - Nơi lưu giữ yêu thương và kỉ niệm
            </div>
        </>
    );
}
