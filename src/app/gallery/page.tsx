import images from "@/configs/images";
import languages from "@/configs/languages";
import Empty from "./Empty";
import NotFoundGallery from "./NotFound";
import FooterDiscover from "@/components/footer/FooterDiscover";

export default function Home() {

    const renderHero = () => {
        return (
          <div className="px-6 md:px-0 min-h-44 md:min-h-80 bg-image-hero-gallery bg-no-repeat bg-cover flex justify-center py-7 md:py-16 text-white">
            <div className="w-full md:w-2/3 flex flex-col items-center gap-2">
              <div className="flex flex-row gap-1">
                <span className="text-black-50">
                  {languages.get("gallery.hero.intro.text")}
                </span>
                <span>/</span>
                <span>{languages.get("gallery.hero.upload.text")}</span>
              </div>
              <h1 className="uppercase font-playfairBold text-2xl md:text-6lg text-center">
                {languages.get("galley.hero.title")}
              </h1>
              <div className="w-full order-2 h-16 bg-white rounded flex items-center px-4 my-4">
                <img src={images.icons.search} className="mr-2 size-5" />
                  <input
                      type="text"
                      placeholder={languages.get("galley.hero.input.place.holder")}
                      className="flex-1 outline-none h-full text-karaka"
                      data-placeholder-mobile={languages.get("galley.hero.input.place.holder.mobile")}
                  />
                  <div className="hidden w-44 h-12 bg-primary md:flex justify-center items-center rounded">{languages.get("galley.hero.button.text")}</div>
              </div>
              <span className="order-1 font-raleway text-lg md:text-2lg text-center w-full md:-1/2">
                {languages.get("galley.hero.desc")}
              </span>
            </div>
          </div>
        )
      }

    return (
        <div>
            {renderHero()}
            <Empty />
            {/* <NotFoundGallery /> */}
            {FooterDiscover()}
        </div>
    );
}