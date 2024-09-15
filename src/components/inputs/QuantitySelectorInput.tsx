import React from "react";

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    minQuantity?: number;
    maxQuantity?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
                                                               quantity,
                                                               setQuantity,
                                                               minQuantity = 1,
                                                               maxQuantity = 999,
                                                           }) => {
    const incrementQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity < maxQuantity ? prevQuantity + 1 : maxQuantity));
    };

    const decrementQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > minQuantity ? prevQuantity - 1 : minQuantity));
    };

    return (
        <div className="flex items-center">
            <button
                onClick={decrementQuantity}
                className={`px-2 py-1 md:px-4 md:py-2 border rounded-l ${
                    quantity === minQuantity
                        ? "bg-gray-50 text-stroke cursor-not-allowed"
                        : "bg-white text-black hover:scale-100"
                }`}
                disabled={quantity === minQuantity}
            >
                -
            </button>
            <input
                value={quantity}
                onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value) && value >= minQuantity && value <= maxQuantity) {
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
    );
};

export default QuantitySelector;
