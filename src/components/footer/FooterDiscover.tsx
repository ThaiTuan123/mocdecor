import languages from "@/configs/languages";
import images from "@/configs/images";

const FooterDiscover = () => {
    return (
        <div className="px-6 md:px-0 bg-image-footer-policy bg-no-repeat bg-cover flex items-center flex-col pb-14 pt-24 text-white">
            <h2 className="font-playfairBold text-2xl md:text-4lg mb-6 text-center px-6 md:px-0">
                {languages.get("policy.footer.title")}
            </h2>
            <div
                className="w-52 h-12 flex items-center justify-center border-primary border-solid border-2 cursor-pointer mb-6 md:mb-8 bg-white rounded">
          <span className="font-raleway text-primary font-bold text-lg">
            {languages.get("policy.footer.button.text")}
          </span>
            </div>
            <div className="flex items-center gap-3.5 mb-6">
                <div className="h-px w-11 bg-white"></div>
                <span>{languages.get("policy.footer.or.text")}</span>
                <div className="h-px w-11 bg-white"></div>
            </div>
            <div className="flex items-center gap-5 ">
                <div className="w-11 h-11 bg-white flex items-center justify-center rounded">
                    <img src={images.icons.instagramColor} alt="" />
                </div>
                <div className="w-11 h-11 bg-white flex items-center justify-center rounded">
                    <img src={images.icons.tiktokColor} alt="" />
                </div>
            </div>
        </div>
    )
}

export default FooterDiscover;