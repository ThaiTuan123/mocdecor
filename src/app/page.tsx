import languages from "@/configs/languages";
import colors from "@/configs/colors";
import {Product} from "@/components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
    console.log(`bg-${colors.Home.navbar_bg} w-100 h-100`)
    return (
        <>
            <Header/>
            <div className={`bg-${colors.Home.navbar_bg}`}>{languages.get('header')}</div>
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
            <Footer/>
        </>
    );
}
