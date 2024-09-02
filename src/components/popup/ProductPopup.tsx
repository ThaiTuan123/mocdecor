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

    const renderSizeButtons = () => (
        <div className="flex gap-4 mt-2">
            {["19x24 cm", "24x34 cm"].map((size) => (
                <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-4 py-2 rounded transition-transform duration-300 ${
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

    const renderQuantityControls = () => (
        <div className="flex items-center mt-2">
            <button
                onClick={decrementQuantity}
                className={`px-4 py-2 border rounded-l transition-transform duration-300 ${
                    quantity === 1
                        ? "bg-gray-50 text-stroke cursor-not-allowed scale-100"
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
                className="w-12 text-center py-2 font-raleway"
            />
            <button
                onClick={incrementQuantity}
                className="px-4 py-2 border rounded-r text-black bg-white transition-transform duration-300 hover:scale-100"
            >
                +
            </button>
        </div>
    );

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

    const renderProductDetails = () => (
        <div className="ml-4 flex flex-col justify-between flex-grow">
            <div>
                <h2 className="text-4xl font-playfairBold font-bold text-primary">{product.title}</h2>
                <p className="mt-3 text-2xl font-raleway text-orange-600">
                    {product.price} {CURRENCY_SYMBOL}
                </p>
                <div className="flex flex-col mt-4 gap-4 bg-brown-50 py-4 px-6 rounded">
                    <div className="flex flex-row gap-10">
                        <h3 className="text-lg font-raleway font-medium">{languages.get("popup.text.size")}</h3>
                        {renderSizeButtons()}
                    </div>
                    <div className="flex flex-row center gap-10">
                        <h3 className="text-lg font-raleway font-medium">{languages.get("popup.text.quantity")}</h3>
                        {renderQuantityControls()}
                    </div>
                </div>
                <p className="mt-2 text-lg text-gray-700 font-raleway">{product.description}</p>
            </div>
            <div className="flex gap-5 mt-4">
                <button
                    onClick={onClose}
                    className="text-lg px-4 py-4 w-1/2 border border-brown-700 text-brown-700 bg-white rounded transform hover:scale-105 transition-all duration-300"
                >
                    {languages.get("popup.button.return")}
                </button>
                <button
                    onClick={onAddToCart}
                    className="text-lg px-2 py-4 w-1/2 bg-brown-700 text-white rounded hover:bg-brown-800 transform hover:scale-105 transition-all duration-300"
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
            <motion.div
                className="bg-white p-6 rounded-lg w-767 relative flex flex-col"
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -50}}
                transition={{duration: 0.3}}
            >
                {renderFullScreenImage()}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-600 text-2xl hover:text-red-500 z-10"
                >
                    ×
                </button>
                <div className="flex">
                    <div className="flex-shrink-0 relative" onClick={toggleFullScreen}>
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={300}
                            height={300}
                            className={`object-cover cursor-zoom-in ${imageLoading ? "blur-md" : "blur-0"}`}
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
