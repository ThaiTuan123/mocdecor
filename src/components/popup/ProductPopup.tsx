//ProductPopup.tsx

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CURRENCY_SYMBOL } from '@/configs/constants/constants';
import languages from '@/configs/languages';
import CancelButton from '@/components/button/CancelButton';
import QuantitySelector from '@/components/inputs/QuantitySelectorInput';
import ProductCarousel from '@/components/carousel/ProductCarousel';
import { TITLE_MAX_LENGTH } from '@/utils/constants';
import { updateCart } from '@/services/api';
import { getOrCreateBrowserId } from '@/utils/browserId';
import { useRecoilState } from 'recoil';
import { cartState } from '@/recoil/atoms/cartAtom';
import { CartItem } from '@/types/cartType';
import { formatCurrency } from '@/utils/formatCurrency';

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
  const [selectedImage, setSelectedImage] = useState<string>('');
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
    setSelectedImage(uniqueImages?.[0]);
    processDataSku();
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // TODO: Use effect to update price when the sku change
  const getTotalPrice = () => {
    if (skuSelected) {
      return formatCurrency(skuSelected.retail_price);
    }

    return formatCurrency(product.retail_price);
  };

  const handleSizeChange = (
    attributeName: string,
    attributeValue: string,
    isOneSku: boolean
  ) => {
    setSelectedSize(prev => ({
      ...prev,
      [attributeName]: attributeValue,
    }));
  };

  useEffect(() => {
    const isSelectAllAttribute = Object.values(selectedSize).every(
      value => value !== ''
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
        className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-90"
        onClick={toggleFullScreen}
      >
        <Image
          src={selectedImage}
          alt={product.product.name}
          fill={true}
          className="cursor-zoom-out object-contain"
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
        if (!attributesMap[name].some(attr => attr.value === value)) {
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
      acc[attr.attributeName] = '';
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
                <p className="w-16 content-center text-sm font-medium md:w-20 md:text-lg">
                  {attributeName}
                </p>
                <div className="mt-2 flex max-h-40 max-w-52 flex-wrap gap-2 overflow-y-auto md:max-h-48 md:max-w-96">
                  {attributeValue.map((value: any) => (
                    <button
                      key={value}
                      className={`rounded px-3 py-2 text-sm transition-transform duration-300 md:px-4 ${
                        selectedSize[attributeName] == value
                          ? 'scale-100 bg-primary text-white'
                          : 'bg-white text-black hover:scale-100 hover:bg-gray-200'
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
      sellerSku: 'TTT-19x24-Xanh Dương',
      skuImage: skuSelected.fields[0]?.image,
      skuName: skuSelected.fields[0]?.name,
    };
    setCartGlobal(prev => {
      const existingItem = prev.findIndex(
        item =>
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
        className="font-raleway flex w-full justify-between py-4 text-left text-lg text-black hover:text-gray-100"
      >
        <span>{title}</span>
        <span>{activeAccordion === title ? '−' : '+'}</span>
      </button>
      {activeAccordion === title && (
        <div className="py-2 text-gray-600">{content}</div>
      )}
    </div>
  );

  const renderProductDetails = () => (
    <div className="ml-0 flex flex-grow flex-col lg:ml-5 lg:w-full">
      <div>
        <h2 className="font-playfairBold text-2xl font-bold text-primary md:pt-0 md:text-4xl lg:min-h-20 lg:pt-6">
          {product.product.name.length > TITLE_MAX_LENGTH
            ? `${product.product.name.substring(0, TITLE_MAX_LENGTH)}...`
            : product.product.name}
        </h2>
        <p className="font-raleway mt-3 text-xl text-orange-600 md:text-2xl">
          {getTotalPrice()} {CURRENCY_SYMBOL}
        </p>
        <div className="mt-4 flex flex-col gap-3 rounded bg-brown-50 px-4 py-2 md:gap-4 md:py-3 lg:px-4 lg:py-4">
          {renderSizeButtons()}

          <div className="center flex flex-row gap-4 md:gap-6">
            <p className="font-raleway w-18 content-center text-sm font-medium md:w-20 md:text-lg">
              {languages.get('popup.text.quantity')}
            </p>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>
        </div>
      </div>

      <div className="order-2 mt-4 lg:order-none">
        {renderAccordionSection(
          languages.get('popup.text.orderNotes'),
          languages.get('popup.description.noOrderNotes')
        )}
        {renderAccordionSection(
          languages.get('popup.text.setOfIngredients'),
          languages.get('popup.description.noSetOfIngredients')
        )}
        {renderAccordionSection(
          languages.get('popup.text.shipping'),
          languages.get('popup.description.shipping')
        )}
        {renderAccordionSection(
          languages.get('popup.text.productInfo'),
          product.description ||
            languages.get('popup.description.noProductInfo')
        )}
      </div>

      <div className="order-1 mt-4 flex gap-3 p-0 md:gap-5 lg:order-none lg:pb-1 lg:pt-16">
        <button
          onClick={onClose}
          className="hidden w-1/2 transform rounded border border-brown-700 bg-white px-4 py-4 text-sm text-brown-700 transition-all duration-300 hover:scale-105 md:text-lg lg:block"
        >
          {languages.get('popup.button.return')}
        </button>
        <button
          disabled={!skuSelected}
          onClick={() => onAddToCart()}
          className="w-full transform rounded bg-brown-700 px-2 py-4 text-sm text-white transition-all duration-300 hover:scale-105 hover:bg-brown-800 md:text-lg lg:w-1/2"
        >
          {languages.get('popup.button.addCard')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {renderFullScreenImage()}
      <div className="relative mx-6 flex w-375 flex-col rounded-lg bg-white p-4 py-12 md:w-580 lg:w-1024 lg:p-6">
        <CancelButton onClick={onClose} />
        <div className="flex max-h-[710px] flex-col overflow-y-auto p-0 lg:flex-row lg:p-3">
          <div className="relative flex w-full flex-col justify-between lg:w-412">
            <Image
              //src={product.image}
              src={selectedImage}
              alt={product.product.name}
              width={300}
              height={300}
              className={`h-327 w-full cursor-zoom-in object-fill lg:h-[550px] lg:w-412 ${
                imageLoading ? 'blur-md' : 'blur-0'
              }`}
              onLoad={handleImageLoad}
              onClick={toggleFullScreen}
            />
            <div className="h-32 w-full overflow-hidden pt-4 lg:w-412 lg:pt-6">
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
