import React, { useEffect, useState, useCallback } from 'react';
import useTopPosProductCategory from '@/recoil/hooks/useTopProductCategories';
import { fetchProducts } from '@/services/fetchProducts';
import { Product } from '@/types/product';

type TabActiveType = {
  category: string;
  subCategory: string;
};

type SectionProps = {
  section: TabActiveType;
  index: number;
  onChangeTab: (index: number, value: string) => void;
  products: Product[] | null;
  subCategories: { slug: string; text: string }[];
};

const Section = React.memo(
  ({ section, index, onChangeTab, products, subCategories }: SectionProps) => {
    console.log(`Render Section ${index}`);
    return (
      <div>
        {/* TODO style hero */}
        <div className="">{section.category}</div>
        {/* TODO style tab */}
        <div className="flex gap-3">
          {subCategories.map((tab, idx) => (
            <div
              className=""
              key={idx}
              onClick={() => onChangeTab(index, tab.slug)}
            >
              {tab.text}
            </div>
          ))}
        </div>
        <div>
          {/* TODO style list product */}
          {products &&
            products.map((product, idx) => (
              <div key={idx}>{product.display_id}</div>
            ))}
        </div>
      </div>
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
  const [tabActive, setTabActive] = useState<TabActiveType[]>([]);
  const [products, setProducts] = useState<(Product[] | null)[]>([]);

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
        fetchProductForTab(index);
      }
    });
  }, [tabActive, products]);

  return (
    <div>
      {tabActive.map((section, index) => (
        <Section
          key={index}
          section={section}
          index={index}
          onChangeTab={onChangeTab}
          products={products[index]}
          subCategories={
            topPosProductCategory.category[index]?.subCategories || []
          }
        />
      ))}
    </div>
  );
};

export default ProductSection;
