import React, {useEffect, useState} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {Product} from "@/types/product";
import {CURRENCY_SYMBOL} from "@/configs/constants/constants";
import languages from "@/configs/languages";

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
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null); // State for accordion

    useEffect(() => {
        document.body.style.overflow = "hidden"; // Disable scrolling on mount
        return () => {
            document.body.style.overflow = ""; // Re-enable scrolling on unmount
        };
    }, []);

    const handleSizeChange = (size: string) => setSelectedSize(size);

    const incrementQuantity = () =>
        setQuantity((prevQuantity) => (prevQuantity < 999 ? prevQuantity + 1 : 999));

    const decrementQuantity = () =>
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {["19x24 cm", "24x34 cm", "30x40 cm", "20x40 cm"].map((size) => (
                <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-2 py-1 md:px-4 md:py-2 rounded transition-transform duration-300 ${
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
        <motion.div
            className="border-b border-gray-200"
            whileHover={{scale: 1.01}}
            transition={{duration: 0.3}}
        >
            <button
                onClick={() => toggleAccordion(title)}
                className="flex justify-between w-full py-4 text-lg font-raleway text-left text-black"
            >
                <span>{title}</span>
                <span>{activeAccordion === title ? "−" : "+"}</span>
            </button>
            {activeAccordion === title && (
                <motion.div
                    className="py-2 text-gray-600"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.3}}
                >
                    {content}
                </motion.div>
            )}
        </motion.div>
    );

    const renderProductDetails = () => (
        <div className="ml-0 md:ml-4 flex flex-col justify-between flex-grow">
            <div>
                <h2 className=" text-2xl md:text-4xl font-playfairBold font-bold text-primary pt-6 md:pt-0">{product.title}</h2>
                <p className="mt-3 text-xl md:text-2xl font-raleway text-orange-600">
                    {product.price} {CURRENCY_SYMBOL}
                </p>
                <div className="flex flex-col mt-4 gap-1 md:gap-4 bg-brown-50 py-4 px-6 rounded">
                    <div className="flex flex-row gap-6 md:gap-10">
                        <h3 className="text-sm md:text-lg font-raleway font-medium content-center">{languages.get("popup.text.size")}</h3>
                        {renderSizeButtons()}
                    </div>
                    <div className="flex flex-row center gap-8 md:gap-10">
                        <h3 className="text-sm md:text-lg font-raleway font-medium content-center">{languages.get("popup.text.quantity")}</h3>
                        <div className="flex items-center mt-2">
                            <button
                                onClick={decrementQuantity}
                                className={`px-2 py-1 md:px-4 md:py-2 border rounded-l ${
                                    quantity === 1
                                        ? "bg-gray-50 text-stroke cursor-not-allowed"
                                        : "bg-white text-black hover:scale-100"
                                }`}
                                disabled={quantity === 1}
                            >
                                -
                            </button>
                            <input
                                value={quantity}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    if (!isNaN(value) && value >= 1 && value <= 999) {
                                        setQuantity(value);
                                    }
                                }}
                                className="w-12 text-center py-1 md:py-2 font-raleway"
                            />
                            <button
                                onClick={incrementQuantity}
                                className="px-2 py-1 md:px-4 md:py-2 border rounded-r text-black bg-white hover:scale-100"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* TODO API Accordion Section */}
                <div className="mt-4 px-1 md:px-4">
                    {renderAccordionSection(languages.get('popup.text.orderNotes'), languages.get('popup.description.noOrderNotes'))}
                    {renderAccordionSection(languages.get('popup.text.setOfIngredients'), languages.get('popup.description.noSetOfIngredients'))}
                    {renderAccordionSection(languages.get('popup.text.shipping'), languages.get('popup.description.shipping'))}
                    {renderAccordionSection(languages.get('popup.text.productInfo'), product.description || languages.get('popup.description.noProductInfo'))}
                </div>
            </div>

            <div className="flex gap-3 md:gap-5 p-2 mt-4">
                <button
                    onClick={onClose}
                    className="text-sm md:text-lg px-4 py-4 w-1/2 border border-brown-700 text-brown-700 bg-white rounded transform hover:scale-105 transition-all duration-300"
                >
                    {languages.get("popup.button.return")}
                </button>
                <button
                    onClick={onAddToCart}
                    className="text-sm md:text-lg px-2 py-4 w-1/2 bg-brown-700 text-white rounded hover:bg-brown-800 transform hover:scale-105 transition-all duration-300"
                >
                    {languages.get("popup.button.addCard")}
                </button>
            </div>
        </div>
    );

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.8}}
            transition={{duration: 0.3}}
        >
            {renderFullScreenImage()}
            <motion.div
                className="bg-white p-2 md:p-6 rounded-lg w-96 md:w-920 relative flex flex-col"
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -50}}
                transition={{duration: 0.3}}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black hover:text-red-500 z-10  flex items-center justify-center "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 28 28"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="flex flex-col md:flex-row max-h-[710px] overflow-y-auto">
                    <div className="flex-shrink-0 relative" onClick={toggleFullScreen}>
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={300}
                            height={300}
                            className={`w-full object-cover cursor-zoom-in ${imageLoading ? "blur-md" : "blur-0"}`}
                            onLoadingComplete={handleImageLoad}
                        />
                    </div>
                    {renderProductDetails()}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductPopup;
