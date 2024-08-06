import languages from "@/configs/languages";
import colors from "@/configs/colors";

export default function Home() {
    return (
        <>
            <div className={`bg-${colors.Home.navbar_bg}`}>{languages.get('header')}</div>
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
