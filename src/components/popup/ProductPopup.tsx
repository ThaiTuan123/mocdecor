//ProductPopup.tsx

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CURRENCY_SYMBOL } from '@/configs/constants/constants';
import languages from '@/configs/languages';
import CancelButton from '@/components/button/CancelButton';
import QuantitySelector from '@/components/inputs/QuantitySelectorInput';
import ProductCarousel from '@/components/carousel/ProductCarousel';
import { INTERACTIVE_ELEMENTS, TITLE_MAX_LENGTH } from '@/utils/constants';
import { updateCart } from '@/services/api';
import { getOrCreateBrowserId } from '@/utils/browserId';
import { useRecoilState } from 'recoil';
import { cartState } from '@/recoil/atoms/cartAtom';
import { CartItem } from '@/types/cartType';
import { formatCurrency } from '@/utils/formatCurrency';
import { AiOutlineCheck, AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  errorState,
  loadingState,
  successState,
} from '@/recoil/atoms/cartStatusAtom';
import ToastMessage from '@/components/toast/ToastMessage';
import '../styles.css';

interface ProductPopupProps {
  product: any;
  onClose: () => void;
}

interface skuObjectType {
  attributeName: string;
  attributeValue: string[];
}

const ProductPopup: React.FC<ProductPopupProps> = ({ product, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);
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
  const [loading, setLoading] = useRecoilState(loadingState);
  const [success, setSuccess] = useRecoilState(successState);
  const [error, setError] = useRecoilState(errorState);
  const [showToast, setShowToast] = useState(false);
  const [showToastError, setShowToastError] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (!popupRef.current) {
      return;
    }

    const target = event.target as Node;
    const rect = popupRef.current.getBoundingClientRect();

    // Check if the click coordinates are visually within the popup's bounds.
    const isClickVisuallyInsidePopup =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (isClickVisuallyInsidePopup) {
      // If the click is visually inside the popup (e.g., on an internal scrollbar),
      // do nothing. This should prevent closing even if .contains() reports false
      // for certain scrollbar targets.
      return;
    }

    // If we reach here, the click is visually OUTSIDE the popup.
    // Now, close it unless the target is an interactive element.
    // It's good practice to ensure tagName is compared in a consistent case (e.g., uppercase).
    if (
      target instanceof HTMLElement &&
      !INTERACTIVE_ELEMENTS.includes(target.tagName.toUpperCase())
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    const introduceImages: string[] =
      product?.imagesIntroduction && product.imagesIntroduction.length > 0
        ? JSON.parse(product.imagesIntroduction)
        : uniqueImages;
    // const mergedImages = [...introduceImages, ...uniqueImages];
    if (introduceImages.length > 0) {
      setImagesSku(introduceImages);
      setSelectedImage(introduceImages?.[0]);
    } else {
      setImagesSku(uniqueImages);
      setSelectedImage(uniqueImages?.[0]);
    }

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
      return formatCurrency(skuSelected.retail_price ?? 0);
    }
    return `${parseFloat(product.retail_price.split('-')[0]) === parseFloat(product.retail_price.split('-')[1]) ? formatCurrency(parseFloat(product.retail_price.split('-')[0])) : `${formatCurrency(parseFloat(product.retail_price.split('-')[0]))} - ${formatCurrency(parseFloat(product.retail_price.split('-')[1]))}`}`;
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
    const isSelectFirstAttribute =
      selectedSize &&
      Object.keys(selectedSize).length > 0 &&
      Object.values(selectedSize)?.[0] !== '';

    if (isSelectFirstAttribute) {
      const skuSelectedObj = product.product.sku.find((sku: any) => {
        return sku.fields.some((field: any) => {
          return (
            selectedSize.hasOwnProperty(field.name) &&
            selectedSize[field.name] === field.value
          );
        });
      });
      if (skuSelectedObj) {
        setSelectedImage(skuSelectedObj.images?.[0]);
      }
    }

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

      if (skuSelectedObj) {
        setSelectedImage(skuSelectedObj.images[0]);
      }

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

  const renderButtonContent = () => {
    if (loading) {
      return (
        <AiOutlineLoading3Quarters className="animate-spin content-center text-lg" />
      );
    }

    if (success) {
      return (
        <div className="flex h-6 w-6 items-center justify-center">
          <svg
            className="animate-tick-appear h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth="2"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    }

    return languages.get('popup.button.addCard');
  };

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

    const extractNumber = (str: string): number | null => {
      const match = str.match(/\d+$/); // Tìm số ở cuối chuỗi
      return match ? parseInt(match[0], 10) : null;
    };

    const customSortAttributeValues = (values: string[]): string[] => {
      const allMatchPattern = values.every(val =>
        /^[^\d]+\s*\d+$/.test(val.trim())
      );

      if (allMatchPattern) {
        return [...values].sort((a, b) => {
          const numA = extractNumber(a.trim());
          const numB = extractNumber(b.trim());
          if (numA !== null && numB !== null) {
            return numA - numB;
          }
          // Fallback to string comparison if numbers can't be extracted (should not happen if allMatchPattern is true)
          return a.localeCompare(b);
        });
      }
      // If not all values match the pattern, sort alphabetically or keep original
      return [...values].sort((a, b) => a.localeCompare(b));
    };

    const formattedOutputObj = Object.entries(attributesMap).map(
      ([key, valuesObj]) => {
        const rawAttributeValues = valuesObj.map(({ value }) => value);
        const sortedAttributeValues =
          customSortAttributeValues(rawAttributeValues);
        return {
          attributeName: key,
          attributeValue: sortedAttributeValues,
        };
      }
    );

    const initStateSelectedSku = formattedOutputObj.reduce((acc: any, attr) => {
      acc[attr.attributeName] = '';
      return acc;
    }, {});

    setSelectedSize(initStateSelectedSku);
    setFormattedOutput(formattedOutputObj);
    console.log('Formatted Output:', formattedOutputObj);
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
              <div
                className="flex flex-col md:flex-row md:gap-6"
                key={attributeName}
              >
                <div className="flex w-full content-center md:w-18">
                  <p className="content-center text-sm font-medium md:text-lg">
                    {attributeName}
                  </p>
                </div>
                <div className="mt-2 flex max-h-40 w-full flex-wrap gap-2 overflow-y-auto md:max-h-48 md:w-[350px] md:max-w-96">
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

  // const onAddToCart = () => {
  //   if (browserId && product) {
  //     const body = {
  //       product: {
  //         id: skuSelected.id,
  //         quantity: quantity,
  //       },
  //     };
  //     updateCart(browserId, body);
  //   }

  const onAddToCart = async () => {
    if (!skuSelected) {
      setShowToastError(true);
      setTimeout(() => setShowToastError(false), 3000);
      return;
    }
    if (browserId && product) {
      const body = {
        product: {
          id: skuSelected.id,
          quantity: quantity,
        },
      };

      await handleUpdateCart(browserId, body);
    }

    const cartUpdateObj = {
      mainId: product.id,
      quantity: quantity,
      id: skuSelected.id,
      retail_price: skuSelected.retail_price,
      productName: product.product.name,
      sellerSku: 'TTT-19x24-Xanh Dương',
      image: skuSelected.images[0],
      skuName: skuSelected?.fields
        .map((field: any) => `${field.name}: ${field.value}`)
        .join('; '),
    };

    setCartGlobal(prev => {
      if (!prev || prev.length === 0) {
        return [...prev, cartUpdateObj];
      }

      const existingItemIndex = prev.findIndex(
        item =>
          item.id === cartUpdateObj.id && item.mainId === cartUpdateObj.mainId
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity:
            updatedCart[existingItemIndex].quantity + cartUpdateObj.quantity,
        };
        return updatedCart;
      } else {
        return [...prev, cartUpdateObj];
      }
    });

    // Nếu thành công, hiển thị Toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUpdateCart = async (browserId: string, body: any) => {
    try {
      setLoading(true); // Bắt đầu trạng thái loading
      setError(null); // Reset trạng thái lỗi
      setSuccess(false); // Reset trạng thái thành công

      await updateCart(browserId, body); // Gọi API

      // Nếu thành công
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose(); // Tự động đóng popup sau 1 giây
      }, 1000);
    } catch (error) {
      console.error('Error updating cart:', error); // Log lỗi để debug
      setError('Failed to update cart. Please try again.'); // Thông báo lỗi
    } finally {
      setLoading(false); // Đặt lại trạng thái loading
    }
  };

  const renderAccordionSection = (title: string, content: any) => (
    <div className="border-b border-gray-200">
      <button
        onClick={() => toggleAccordion(title)}
        className="font-raleway flex w-full justify-between py-4 text-left text-lg text-black hover:text-gray-100"
      >
        <span>{title}</span>
        <span>{activeAccordion === title ? '−' : '+'}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          activeAccordion === title
            ? 'max-h-[300px] overflow-y-auto opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-2 pb-6 text-gray-600">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );

  const renderProductDetails = () => (
    <div className="ml-0 flex flex-1 flex-col lg:ml-5 lg:w-full">
      {' '}
      {/* Ensure this container can grow */}
      <div>
        <h2 className="font-playfairBold text-2xl font-bold text-primary md:pt-0 md:text-4xl lg:min-h-20 lg:pt-6">
          {product.product.name.length > TITLE_MAX_LENGTH
            ? `${product.product.name.substring(0, TITLE_MAX_LENGTH)}...`
            : product.product.name}
        </h2>
        <p className="font-raleway mt-3 hidden text-xl text-orange-600 md:flex md:text-2xl">
          {getTotalPrice()} {CURRENCY_SYMBOL}
        </p>
        <div className="mt-4 flex flex-col gap-3 rounded bg-brown-50 px-4 py-3 md:gap-4 md:py-3 lg:px-4 lg:py-4">
          {/*TODO this display only mobile*/}
          <div className="sticky top-0 z-10 flex w-full flex-row gap-3 bg-bright-main md:hidden">
            <Image
              src={selectedImage}
              alt={product.product.name}
              width={300}
              height={300}
              className={`h-20 w-20 cursor-zoom-in object-fill`}
              onLoad={handleImageLoad}
              onClick={toggleFullScreen}
            />
            <div className="my-3">
              <p className="font-raleway text-xl text-orange-600 md:text-2xl">
                {getTotalPrice()} {CURRENCY_SYMBOL}
              </p>
              <p className="font-raleway text-smLh accent-gray-300">
                {Object.values(selectedSize).join(' - ') || 'Chọn loại hàng'}
              </p>
            </div>
          </div>
          {renderSizeButtons()}
          <div className="center flex flex-col gap-4 md:flex-row md:gap-6">
            <div className="flex w-full content-center md:w-18">
              <p className="font-raleway w-18 content-center text-sm font-medium md:w-20 md:text-lg">
                {languages.get('popup.text.quantity')}
              </p>
            </div>

            <div className="w-[220px]">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>
        </div>
      </div>
      {/* Accordion Container: remove 'order-2', adjust padding for sticky buttons */}
      <div className="mt-4 flex-1">
        {' '}
        {/* Use flex-1 to take available space, add padding for buttons */}
        {product?.note &&
          (() => {
            try {
              const parsedNote = JSON.parse(product.note);
              if (parsedNote && Object.keys(parsedNote).length > 0) {
                return renderAccordionSection(
                  languages.get('popup.text.orderNotes'),
                  parsedNote
                );
              }
            } catch (e) {
              console.error('Error parsing orderNotes JSON:', e);
              if (product.note.trim() !== '') {
                return renderAccordionSection(
                  languages.get('popup.text.orderNotes'),
                  product.note
                );
              }
            }
            return null;
          })()}
        {product?.ingredients &&
          (() => {
            try {
              const parsedIngredients = JSON.parse(product.ingredients);
              if (
                parsedIngredients &&
                Object.keys(parsedIngredients).length > 0
              ) {
                return renderAccordionSection(
                  languages.get('popup.text.setOfIngredients'),
                  parsedIngredients
                );
              }
            } catch (e) {
              console.error('Error parsing ingredients JSON:', e);
              if (product.ingredients.trim() !== '') {
                return renderAccordionSection(
                  languages.get('popup.text.setOfIngredients'),
                  product.ingredients
                );
              }
            }
            return null;
          })()}
        {product?.delivery &&
          (() => {
            try {
              const parsedDelivery = JSON.parse(product.delivery);
              if (parsedDelivery && Object.keys(parsedDelivery).length > 0) {
                return renderAccordionSection(
                  languages.get('popup.text.shipping'),
                  parsedDelivery
                );
              }
            } catch (e) {
              console.error('Error parsing delivery JSON:', e);
              if (product.delivery.trim() !== '') {
                return renderAccordionSection(
                  languages.get('popup.text.shipping'),
                  product.delivery
                );
              }
            }
            return null;
          })()}
        {product?.product?.note_product &&
          (() => {
            const noteProduct = product.product.note_product.trim();
            if (noteProduct !== '') {
              return renderAccordionSection(
                languages.get('popup.text.productInfo'),
                noteProduct
              );
            }
            return null;
          })()}
      </div>
      {/* Button Container: remove 'order-1', ensure it's sticky to the bottom of renderProductDetails */}
      <div className="sticky bottom-0 z-19 flex w-full items-center gap-3 bg-white p-4 shadow-lg md:gap-5">
        <button
          onClick={onClose}
          className="hidden w-1/2 transform rounded border border-brown-700 bg-white px-4 py-4 text-sm text-brown-700 transition-all duration-300 hover:scale-105 md:text-lg lg:block"
        >
          {languages.get('popup.button.return')}
        </button>
        <button
          onClick={onAddToCart}
          className={`flex w-full transform items-center justify-center rounded bg-brown-700 px-2 py-4 text-sm text-white transition-all duration-300 hover:rounded hover:bg-brown-800 md:text-lg md:hover:scale-105 lg:w-1/2 ${
            error ? 'bg-red-500' : ''
          }`}
        >
          {renderButtonContent()}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        {renderFullScreenImage()}
        <div
          ref={popupRef}
          className="relative flex h-auto max-h-[90vh] w-375 flex-col rounded-lg bg-white p-4 py-6 md:w-580 lg:w-1024 lg:p-6" // Adjusted max-h and padding
        >
          <div className="absolute right-2 top-2 z-40">
            {' '}
            {/* Increased z-index */}
            <CancelButton onClick={onClose} />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden md:pt-6">
            {' '}
            {/* Added flex-1 and overflow-hidden */}
            <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row">
              {' '}
              {/* Main scrollable area */}
              <div className="w-full lg:w-auto">
                {' '}
                {/* Image side */}
                <Image
                  src={selectedImage}
                  alt={product.product.name}
                  width={300}
                  height={300}
                  className={`h-327 w-full cursor-zoom-in object-fill lg:h-[450px] lg:w-[450px] ${
                    imageLoading ? 'blur-md' : 'blur-0'
                  }`}
                  onLoad={handleImageLoad}
                  onClick={toggleFullScreen}
                />
                <div className="h-[100px] w-full overflow-hidden pt-2 lg:h-[150px] lg:w-[450px] lg:pt-6">
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
      </div>
      {showToast && (
        <ToastMessage
          message="Thành công thêm giỏ hàng !"
          onClose={() => setShowToast(false)}
        />
      )}
      {showToastError && (
        <ToastMessage
          isError
          message="Hãy chọn loại hàng!!!"
          onClose={() => setShowToastError(false)}
        />
      )}
    </>
  );
};

export default ProductPopup;
