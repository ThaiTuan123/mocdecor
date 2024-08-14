import images from "@/configs/images";
import languages from "@/configs/languages";
import Empty from "./Empty";
import NotFoundGallery from "./NotFound";

export default function Home() {

    const renderHero = () => {
        return (
          <div className="min-h-80 bg-image-hero-gallery bg-no-repeat bg-cover flex justify-center pt-16 pb-16 text-white">
            <div className="w-2/3 flex flex-col items-center gap-2">
              <div className="flex flex-row gap-1">
                <span className="text-black-50">
                  {languages.get("gallery.hero.intro.text")}
                </span>
                <span>/</span>
                <span>{languages.get("gallery.hero.upload.text")}</span>
              </div>
              <h1 className="uppercase font-playfairBold text-6lg text-center">
                {languages.get("galley.hero.title")}
              </h1>
              <div className="w-full h-16 bg-white rounded flex items-center px-4 my-4">
                <img src={images.icons.search} className="mr-2 size-5" />
                <input type="text" placeholder={languages.get("galley.hero.input.place.holder")} className="flex-1 outline-none h-full text-karaka" />
                <div className="w-44 h-12 bg-primary flex justify-center items-center rounded">{languages.get("galley.hero.button.text")}</div>
              </div>
              <span className="font-raleway text-2lg text-center w-1/2">
                {languages.get("galley.hero.desc")}
              </span>
            </div>
          </div>
        )
      }

      const renderFooter = () => {
        return (
          <div className="bg-image-footer-policy bg-no-repeat bg-cover flex items-center flex-col pb-14 pt-24 text-white">
            <h2 className="font-playfairBold text-4lg mb-6">
              {languages.get("policy.footer.title")}
            </h2>
            <div className="w-52 h-12 flex items-center justify-center border-primary border-solid border-2 cursor-pointer mb-8 bg-white rounded">
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

    return (
        <div>
            {renderHero()}
            <Empty />
            {/* <NotFoundGallery /> */}
            {renderFooter()}
        </div>
    );
}