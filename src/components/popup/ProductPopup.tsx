//ProductPopup.tsx

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { CURRENCY_SYMBOL } from "@/configs/constants/constants";
import languages from "@/configs/languages";
import CancelButton from "@/components/button/CancelButton";
import QuantitySelector from "@/components/inputs/QuantitySelectorInput";
import ProductCarousel from "@/components/carousel/ProductCarousel";
import { TITLE_MAX_LENGTH } from "@/utils/constants";
import { updateCart } from "@/services/api";
import { getOrCreateBrowserId } from "@/utils/browserId";
import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/atoms/cartAtom";
import { CartItem } from "@/types/cartType";

interface ProductPopupProps {
  product: any;
  onClose: () => void;
}

interface skuObjectType {
  attributeName: string;
  attributeValue: string[];
}

const ProductPopup: React.FC<ProductPopupProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  const [formattedOutput, setFormattedOutput] = useState<skuObjectType[]>();
  const [quantity, setQuantity] = useState<number>(1);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [imagesSku, setImagesSku] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [browserId, setBrowserId] = useState<string | null>(null);
  const [skuSelected, setSkuSelected] = useState<any>(null);
  const [cartGlobal, setCartGlobal] = useRecoilState<CartItem[]>(cartState);
  useEffect(() => {
    const id = getOrCreateBrowserId();
    setBrowserId(id);
    const listImagesSku = product.product.sku.reduce(
      (acc: string[], sku: any) => {
        return [...acc, ...sku.images];
      },
      []
    );

    const uniqueImages: string[] = Array.from(new Set(listImagesSku));
    setImagesSku(uniqueImages);
    processDataSku();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // TODO: Use effect to update price when the sku change
  const getTotalPrice = () => {
    if (skuSelected) {
      return skuSelected.retail_price;
    }

    return product.retail_price;
  };

  const handleSizeChange = (
    attributeName: string,
    attributeValue: string,
    isOneSku: boolean
  ) => {
    setSelectedSize((prev) => ({
      ...prev,
      [attributeName]: attributeValue,
    }));
  };

  useEffect(() => {
    const isSelectAllAttribute = Object.values(selectedSize).every(
      (value) => value !== ""
    );

    if (isSelectAllAttribute) {
      const skuSelectedObj = product.product.sku.find((sku: any) => {
        return sku.fields.every((field: any) => {
          return (
            selectedSize.hasOwnProperty(field.name) &&
            selectedSize[field.name] === field.value
          );
        });
      });

      setSkuSelected(skuSelectedObj || null); // Gán null nếu không tìm thấy
      getTotalPrice();
    }
  }, [selectedSize]);

  const handleImageLoad = () => setImageLoading(false);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const renderFullScreenImage = () =>
    isFullScreen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20"
        onClick={toggleFullScreen}
      >
        <Image
          src={selectedImage}
          alt={product.product.name}
          layout="fill"
          objectFit="contain"
          className="cursor-zoom-out"
          onLoad={handleImageLoad}
        />
      </div>
    );

  const processDataSku = () => {
    const attributesMap: Record<string, { value: string }[]> = {};

    product.product.sku.forEach(({ fields }: any) => {
      fields.forEach(({ name, value }: any) => {
        if (!attributesMap[name]) {
          attributesMap[name] = [];
        }
        if (!attributesMap[name].some((attr) => attr.value === value)) {
          attributesMap[name].push({ value });
        }
      });
    });

    const formattedOutputObj = Object.entries(attributesMap).map(
      ([key, values]) => ({
        attributeName: key,
        attributeValue: values.map(({ value }) => value),
      })
    );

    const initStateSelectedSku = formattedOutputObj.reduce((acc: any, attr) => {
      acc[attr.attributeName] = "";
      return acc;
    }, {});

    setSelectedSize(initStateSelectedSku);
    setFormattedOutput(formattedOutputObj);
  };

  const renderSizeButtons = () => {
    return (
        <div className="flex flex-col gap-4 md:gap-6">
          {formattedOutput &&
              formattedOutput.map(
                  ({
                     attributeName,
                     attributeValue,
                   }: {
                    attributeName: string;
                    attributeValue: string[];
                  }) => (
                      <div className="flex flex-row gap-4 md:gap-6" key={attributeName}>
                        <p className="w-16 md:w-20 text-sm md:text-lg font-medium content-center">
                          {attributeName}
                        </p>
                        <div className="max-w-52 md:max-w-96 flex flex-wrap gap-2 mt-2 max-h-40 md:max-h-48 overflow-y-auto">
                          {attributeValue.map((value: any) => (
                              <button
                                  key={value}
                                  className={` px-3 md:px-4 py-2 rounded transition-transform duration-300 text-sm ${
                                      selectedSize[attributeName] == value
                                          ? "bg-primary text-white scale-100"
                                          : "bg-white text-black hover:scale-100 hover:bg-gray-200"
                                  }`}
                                  onClick={() =>
                                      handleSizeChange(attributeName, value, false)
                                  }
                              >
                                {value}
                              </button>
                          ))}
                        </div>
                      </div>
                  )
              )}
        </div>
    );
  };

  const onAddToCart = () => {
    if (browserId && product) {
      const body = {
        product: {
          mainId: product.mainId,
          skuId: skuSelected.skuId,
          quantity: quantity,
        },
      };
      updateCart(browserId, body);
    }

    const cartUpdateObj = {
      mainId: product.mainId,
      quantity: quantity,
      skuId: skuSelected.skuId,
      originalPrice: skuSelected.price,
      productName: product.product.name,
      sellerSku: "TTT-19x24-Xanh Dương",
      skuImage: skuSelected.fields[0]?.image,
      skuName: skuSelected.fields[0]?.name,
    };
    setCartGlobal((prev) => {
      const existingItem = prev.findIndex(
        (item) =>
          item.skuId == cartUpdateObj.skuId &&
          item.mainId == cartUpdateObj.mainId
      );

      if (existingItem !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingItem] = {
          ...updatedCart[existingItem],
          quantity: updatedCart[existingItem].quantity + cartUpdateObj.quantity,
        };
        return updatedCart;
      } else {
        return [...prev, cartUpdateObj];
      }
    });
    onClose();
  };

  const renderAccordionSection = (title: string, content: string) => (
    <div className="border-b border-gray-200">
      <button
        onClick={() => toggleAccordion(title)}
        className="flex justify-between w-full py-4 text-lg font-raleway text-left text-black hover:text-gray-100"
      >
        <span>{title}</span>
        <span>{activeAccordion === title ? "−" : "+"}</span>
      </button>
      {activeAccordion === title && (
        <div className="py-2 text-gray-600">{content}</div>
      )}
    </div>
  );

  const renderProductDetails = () => (
    <div className="ml-0 lg:ml-5 flex flex-col flex-grow lg:w-full">
      <div>
        <h2 className="text-2xl md:text-4xl font-playfairBold font-bold text-primary lg:pt-6 md:pt-0 lg:min-h-20">
          {product.product.name.length > TITLE_MAX_LENGTH
            ? `${product.product.name.substring(0, TITLE_MAX_LENGTH)}...`
            : product.product.name}
        </h2>
        <p className="mt-3 text-xl md:text-2xl font-raleway text-orange-600">
          {getTotalPrice()} {CURRENCY_SYMBOL}
        </p>
        <div className="flex flex-col mt-4 gap-3 md:gap-4 bg-brown-50 py-2 md:py-3 lg:py-4 px-4 lg:px-4 rounded">
          {renderSizeButtons()}

          <div className="flex flex-row center gap-4 md:gap-6">
            <p className="w-18 md:w-20 text-sm md:text-lg font-raleway font-medium content-center">
              {languages.get("popup.text.quantity")}
            </p>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>
        </div>
      </div>

      <div className="order-2 lg:order-none mt-4">
        {renderAccordionSection(
          languages.get("popup.text.orderNotes"),
          languages.get("popup.description.noOrderNotes")
        )}
        {renderAccordionSection(
          languages.get("popup.text.setOfIngredients"),
          languages.get("popup.description.noSetOfIngredients")
        )}
        {renderAccordionSection(
          languages.get("popup.text.shipping"),
          languages.get("popup.description.shipping")
        )}
        {renderAccordionSection(
          languages.get("popup.text.productInfo"),
          product.description ||
            languages.get("popup.description.noProductInfo")
        )}
      </div>

      <div className="order-1 lg:order-none flex gap-3 md:gap-5 p-0 mt-4 lg:pt-16">
        <button
          onClick={onClose}
          className="hidden lg:block text-sm md:text-lg px-4 py-4 w-1/2 border border-brown-700 text-brown-700 bg-white rounded transform hover:scale-105 transition-all duration-300"
        >
          {languages.get("popup.button.return")}
        </button>
        <button
          disabled={!skuSelected}
          onClick={() => onAddToCart()}
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
      <div className="w-375 md:w-580 lg:w-1024 bg-white rounded-lg p-4 lg:p-6 mx-6 py-12 relative flex flex-col">
        <CancelButton onClick={onClose} />
        <div className="flex flex-col lg:flex-row max-h-[710px] overflow-y-auto p-0 lg:p-3">
          <div className="flex flex-col justify-between relative w-full lg:w-412">
            <Image
              //src={product.image}
              src={imagesSku?.[0]}
              alt={product.product.name}
              width={300}
              height={300}
              className={`w-full lg:w-412 h-327 lg:h-[550px] object-fill cursor-zoom-in ${
                imageLoading ? "blur-md" : "blur-0"
              }`}
              onLoad={handleImageLoad}
              onClick={toggleFullScreen}
            />
            <div className="h-32 w-full lg:w-412 overflow-hidden pt-4 lg:pt-6">
              <ProductCarousel
                images={imagesSku}
                onImageSelect={setSelectedImage}
                onImageHover={setSelectedImage}
              />
            </div>
          </div>
          {renderProductDetails()}
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
