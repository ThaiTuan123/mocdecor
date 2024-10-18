import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Product} from "@/types/product";
import {CURRENCY_SYMBOL} from "@/configs/constants/constants";
import languages from "@/configs/languages";
import CancelButton from "@/components/button/CancelButton";
import QuantitySelector from "@/components/inputs/QuantitySelectorInput";
import ProductCarousel from "@/components/carousel/ProductCarousel";

interface ProductPopupProps {
    product: Product;
    onClose: () => void;
    onAddToCart: () => void;
}

const ProductPopup: React.FC<ProductPopupProps> = ({product, onClose, onAddToCart}) => {
    const [selectedSize, setSelectedSize] = useState<string>("19x24 cm");
    const [quantity, setQuantity] = useState<number>(1);
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>(product.image);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleSizeChange = (size: string) => setSelectedSize(size);

    const handleImageLoad = () => setImageLoading(false);

    const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

    const toggleAccordion = (section: string) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    const renderFullScreenImage = () => (
        isFullScreen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20"
                onClick={toggleFullScreen}
            >
                <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="contain"
                    className="cursor-zoom-out"
                    onLoadingComplete={handleImageLoad}
                />
            </div>
        )
    );

    const renderSizeButtons = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {["19x24 cm", "24x34 cm", "30x40 cm", "20x40 cm"].map((size) => (
                <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-4 py-2 rounded transition-transform duration-300 text-sm ${
                        selectedSize === size
                            ? "bg-primary text-white scale-100"
                            : "bg-white text-black hover:scale-100 hover:bg-gray-200"
                    }`}
                >
                    {size === "19x24 cm"
                        ? languages.get("popup.button.size19")
                        : languages.get("popup.button.size24")}
                </button>
            ))}
        </div>
    );

    const renderAccordionSection = (title: string, content: string) => (
        <div className="border-b border-gray-200">
            <button
                onClick={() => toggleAccordion(title)}
                className="flex justify-between w-full py-4 text-lg font-raleway text-left text-black"
            >
                <span>{title}</span>
                <span>{activeAccordion === title ? "−" : "+"}</span>
            </button>
            {activeAccordion === title && (
                <div className="py-2 text-gray-600">
                    {content}
                </div>
            )}
        </div>
    );

    const renderProductDetails = () => (
        <div className="ml-0 lg:ml-5 flex flex-col justify-between flex-grow">
            <div>
                <h2 className="text-2xl md:text-4xl font-playfairBold font-bold text-primary pt-6 md:pt-0">{product.title}</h2>
                <p className="mt-3 text-xl md:text-2xl font-raleway text-orange-600">
                    {product.price} {CURRENCY_SYMBOL}
                </p>
                <div className="flex flex-col mt-4 gap-3 md:gap-4 bg-brown-50 py-2 lg:py-4 px-4 lg:px-4 rounded">
                    <div className="flex flex-row gap-6">
                        <h3 className="text-sm md:text-lg font-raleway font-medium content-center">{languages.get("popup.text.size")}</h3>
                        {renderSizeButtons()}
                    </div>
                    <div className="flex flex-row center gap-6">
                        <h3 className="text-sm md:text-lg font-raleway font-medium content-center">{languages.get("popup.text.quantity")}</h3>
                        <QuantitySelector
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />
                    </div>
                </div>
            </div>

            <div className="order-2 lg:order-none mt-4">
                {renderAccordionSection(languages.get('popup.text.orderNotes'), languages.get('popup.description.noOrderNotes'))}
                {renderAccordionSection(languages.get('popup.text.setOfIngredients'), languages.get('popup.description.noSetOfIngredients'))}
                {renderAccordionSection(languages.get('popup.text.shipping'), languages.get('popup.description.shipping'))}
                {renderAccordionSection(languages.get('popup.text.productInfo'), product.description || languages.get('popup.description.noProductInfo'))}
            </div>

            <div className="order-1 lg:order-none flex gap-3 md:gap-5 p-0 mt-4">
                <button
                    onClick={onClose}
                    className="hidden lg:block text-sm md:text-lg px-4 py-4 w-1/2 border border-brown-700 text-brown-700 bg-white rounded transform hover:scale-105 transition-all duration-300"
                >
                    {languages.get("popup.button.return")}
                </button>
                <button
                    onClick={onAddToCart}
                    className="text-sm md:text-lg px-2 py-4 w-full lg:w-1/2 bg-brown-700 text-white rounded hover:bg-brown-800 transform hover:scale-105 transition-all duration-300"
                >
                    {languages.get("popup.button.addCard")}
                </button>
            </div>

        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {renderFullScreenImage()}
            <div className="bg-white p-4 lg:p-6 rounded-lg w-full mx-6 py-12 lg:w-920 relative flex flex-col">
                <CancelButton onClick={onClose}/>
                <div className="flex flex-col md:flex-row max-h-[710px] overflow-y-auto">
                    <div className="flex flex-col justify-between relative">
                        <Image
                            //src={product.image}
                            src={selectedImage}
                            alt={product.title}
                            width={300}
                            height={300}
                            className={`w-full h-327 lg:h-451 object-fill cursor-zoom-in ${imageLoading ? "blur-md" : "blur-0"}`}
                            onLoadingComplete={handleImageLoad}
                            onClick={toggleFullScreen}
                        />
                        <div className='h-32 w-full overflow-hidden pt-4 lg:pt-0'>
                            <ProductCarousel images={product.images} onImageSelect={setSelectedImage}/>
                        </div>
                    </div>
                    {renderProductDetails()}
                </div>
            </div>
        </div>
    );
};

export default ProductPopup;
