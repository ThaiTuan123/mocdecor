import Tab from '@/components/tab/Tab';
import React from 'react';
import ProductGrid from '@/components/gridView/ProductGrid';
import { CategoryType } from '@/types/categoryType';

const CategoryProductTab = ({
  category,
  index,
}: {
  category: CategoryType;
  index: number;
}) => {
  const subCategory =
    category.subCategories?.map(subCategory => ({
      label: subCategory.text ?? '',
      value: subCategory.text ?? '',
    })) || [];

  const defaultActiveTab = category?.subCategories?.[0]?.text ?? '';

  const renderContent = (activeTab: string) => {
    const tabContent = category.subCategories?.find(
      subCategory => subCategory.text === activeTab
    );

    if (!tabContent) return null;

    return (
      <div>
        <ProductGrid category={category.slug} subCategory={tabContent.slug} />
      </div>
    );
  };

  return index % 2 === 0 ? (
    <Tab
      tabs={subCategory}
      defaultActiveTab={defaultActiveTab}
      renderContent={renderContent}
    />
  ) : (
    <Tab
      tabs={subCategory}
      defaultActiveTab={defaultActiveTab}
      renderContent={renderContent}
      background={'bg-image-gradient-frame bg-cover 2xl:mx-auto 2xl:container'}
      textColor="text-white"
      borderActive="border-white"
      hoverButton="hover:text-white"
      hoverBorder="hover:border-white"
      textColorInactive="text-black-50"
    />
  );
};

export default CategoryProductTab;
