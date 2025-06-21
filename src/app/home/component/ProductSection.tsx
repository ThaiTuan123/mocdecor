import React, { useCallback, useEffect, useState } from 'react';
import useTopPosProductCategory from '@/recoil/hooks/useTopProductCategories';
import { fetchProducts } from '@/services/fetchProducts';
import { Product } from '@/types/product';
import Image from 'next/image';
import TextContent from '@/components/texts/TextContent';
import ProductCard from '@/components/product/ProductCard';
import { useRecoilState } from 'recoil';
import { selectedProductState } from '@/recoil/atoms/productAtom';
import ProductPopup from '@/components/popup/ProductPopup';
import OutlineButton from '@/components/button/OutlineButton';
import languages from '@/configs/languages';
import { productsState } from '@/recoil/atoms/productsStateAtom';
import { TabActiveType } from '@/types/TabActiveType';

type CategoryType = {
  title: string;
  subTitle: string;
  banner: string;
};

type SectionProps = {
  section: TabActiveType;
  index: number;
  onChangeTab: (index: number, value: string) => void;
  products: Product[] | null;
  subCategories: { slug: string; text: string }[];
  bannerCategory?: CategoryType;
  isSpecialTab?: boolean; // Added to determine special styling dynamically
  background?: string;
  textColor?: string;
  textHover?: string;
  textColorInactive?: string;
  borderActive?: string;
  borderHover?: string;
  hoverButton?: string;
  hoverBorder?: string;
};

const Section = React.memo(
  ({
    section,
    index,
    onChangeTab,
    products,
    subCategories,
    bannerCategory,
    isSpecialTab = false,
    background = 'bg-white',
    textColor = 'text-brown-900',
    textColorInactive = 'text-gray-500',
    borderActive = 'border-brown-900',
    hoverButton = 'hover:text-brown-900',
    hoverBorder = 'hover:border-brown-900',
  }: SectionProps) => {
    const [selectedProduct, setSelectedProduct] =
      useRecoilState<Product | null>(selectedProductState);

    const showViewMoreButton = Array.isArray(products) && products.length > 7;

    const handleProductClick = (product: Product) => {
      setSelectedProduct(product);
    };

    const handleClosePopup = () => {
      setSelectedProduct(null);
    };

    return (
      <section>
        {/* Hero Section */}
        <div className="relative flex h-252 items-center justify-start 2xl:container md:h-327 lg:h-430 lg:max-h-430 2xl:mx-auto">
          <div className="absolute inset-0">
            <Image
              src={bannerCategory?.banner || '/default-banner.jpg'}
              alt="Background"
              fill={true}
              className="object-cover"
              quality={75}
              priority
            />
          </div>

          <div className="relative z-10 w-4/5 content-center px-6 md:w-3/5 lg:w-2/5 lg:pl-36">
            <h2 className="uppercase text-primary">{bannerCategory?.title}</h2>
            <TextContent
              className="my-2"
              text={bannerCategory?.subTitle || ''}
            />
          </div>
        </div>

        <div
          className={`${isSpecialTab ? 'bg-image-gradient-frame bg-cover' : background}`}
        >
          {/* Tab Style */}
          <div>
            <div className="overflow-x-auto">
              <div className="ml-0 flex overflow-x-scroll whitespace-nowrap border-b border-stroke px-6 pt-3 no-scrollbar 2xl:container md:pt-7 lg:ml-6 lg:px-28 2xl:mx-auto">
                <div>
                  {subCategories.map((tab, idx) => (
                    <button
                      className={`px-5 pb-16px-plus-2px pt-3 transition-colors duration-300 ease-in-out focus:outline-none md:px-6 lg:px-8 ${
                        section.subCategory === tab.slug
                          ? `border-b-2 ${
                              isSpecialTab
                                ? 'border-white text-white'
                                : `${borderActive} ${textColor}`
                            }`
                          : `${
                              isSpecialTab ? 'text-white' : textColorInactive
                            } ${hoverButton} hover:border-b-2 hover:text-primary ${
                              isSpecialTab ? 'hover:border-white' : hoverBorder
                            }`
                      } ${index < subCategories.length - 1 ? 'mr-6' : ''}`}
                      key={idx}
                      onClick={() => onChangeTab(index, tab.slug)}
                    >
                      {tab.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>{' '}
          <div className="px-6 py-7 2xl:container md:px-6 md:py-14 lg:px-20 lg:py-16 xl:px-36 2xl:mx-auto 3xl:px-80">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product, idx) => {
                  console.log(
                    'Rendering ProductCard for product:',
                    product,
                    'at index:',
                    idx
                  );
                  return (
                    <ProductCard
                      key={`${product.product_id}-${index}`}
                      {...product}
                      onClick={() => handleProductClick(product)}
                    />
                  );
                })
              ) : (
                <div className="col-span-2 md:col-span-3 lg:col-span-4">
                  <p
                    className={`text-smLh lg:text-xl ${isSpecialTab ? 'text-white' : ''}`}
                  >
                    {languages.get('home.update.productSystem')}
                  </p>
                </div>
              )}
            </div>

            {showViewMoreButton && (
              <div className="my-6 flex justify-center md:my-10">
                <OutlineButton
                  text={languages.get('button.viewMore')}
                  href={`/products/${section.category}/${section.subCategory}`}
                />
              </div>
            )}
            {selectedProduct && (
              <ProductPopup
                product={selectedProduct}
                onClose={handleClosePopup}
              />
            )}
          </div>
        </div>
      </section>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.section === nextProps.section &&
      prevProps.products === nextProps.products &&
      prevProps.subCategories === nextProps.subCategories
    );
  }
);

const ProductSection = () => {
  const { topPosProductCategory } = useTopPosProductCategory();
  const [products, setProducts] = useRecoilState(productsState);
  const [tabActive, setTabActive] = useState<TabActiveType[]>([]);

  useEffect(() => {
    if (topPosProductCategory.category?.length > 0) {
      const newTabActive = topPosProductCategory.category.map(it => ({
        category: it.slug,
        subCategory: it.subCategories[0]?.slug || '',
      }));
      setTabActive(newTabActive);
      setProducts(new Array(topPosProductCategory.category.length).fill(null));
    }
  }, [topPosProductCategory]);

  const onChangeTab = useCallback((index: number, value: string) => {
    setTabActive(prev => {
      const newTabActive = [...prev];
      newTabActive[index] = { ...newTabActive[index], subCategory: value };
      return newTabActive;
    });

    setProducts(prev => {
      const newProducts = [...prev];
      newProducts[index] = null;
      return newProducts;
    });
  }, []);

  const fetchProductForTab = async (index: number) => {
    const { category, subCategory } = tabActive[index];
    try {
      const response = await fetchProducts({ category, subCategory });
      console.log(`Fetched products for tab ${index}:`, response);
      setProducts(prev => {
        const newProducts = [...prev];
        newProducts[index] = response;
        return newProducts;
      });
    } catch (error) {
      console.error(`Error fetching products for tab ${index}:`, error);
    }
  };

  useEffect(() => {
    tabActive.forEach((_, index) => {
      if (products[index] === null) {
        fetchProductForTab(index).then(r => console.log(r));
      }
    });
  }, [tabActive, products]);

  return (
    <div>
      {tabActive.map((section, index) => {
        const category = topPosProductCategory.category[index];
        const bannerCategory: CategoryType = {
          title: category?.name || '',
          subTitle: category?.description || '',
          banner: category?.banner || '',
        };

        const isSpecialTab = index === 1; // đây là giá trị ảnh khung
        console.log('products at tab: ', index);
        console.log(products[index]);
        return (
          <Section
            key={index}
            section={section}
            index={index}
            onChangeTab={onChangeTab}
            products={products[index]}
            subCategories={category?.subCategories || []}
            bannerCategory={bannerCategory}
            isSpecialTab={isSpecialTab}
          />
        );
      })}
    </div>
  );
};

export default ProductSection;
