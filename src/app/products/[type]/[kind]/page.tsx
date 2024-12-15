'use client';

import languages from '@/configs/languages';
import { filterData, FilterKeys, filterType } from './constant';
import Image from 'next/image';
import images from '@/configs/images';
import { formatVietnameseCurrency } from '@/utils';
import { useEffect, useState } from 'react';
import { Checkbox, Collapse, Radio, RadioChangeEvent } from 'antd';
import { usePathname } from 'next/navigation';
import './style.css';
import CustomButton from '../../../../components/button/CustomButton';
import ProductPopup from '@/components/popup/ProductPopup';
import useListProducts from '@/recoil/hooks/useListProducts';
import useCategoryDetail from '@/recoil/hooks/useCategoryDetail';
import { fetchListProducts } from '@/services/api';

interface filtersCheckboxType {
  range: string[];
  major: string[];
}

const { Panel } = Collapse;

export default function Products() {
  const starArray = new Array(5).fill(0);
  const paginationArray = new Array(3).fill(0).map((_, i) => i + 1);
  const [paginationActive, setPaginationActive] = useState(1);
  const [filterTags, setFilterTags] = useState<filtersCheckboxType>({
    range: [],
    major: [],
  });
  const [filterRadio, setFilterRadio] = useState();
  const [hoverFilter, setHoverFilter] = useState('');
  const pathname = usePathname();
  const categorySlug = pathname.split('/')[2];
  const { cateDetail } = useCategoryDetail(pathname.split('/')[2]);
  const [openFilter, setOpenFilter] = useState(false);
  const [collapseActive, setCollapseActive] = useState<string | string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { listProduct = [] } = useListProducts({ categorySlug: categorySlug });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (listProduct) {
      setProducts(listProduct.products);
    }
  }, [listProduct]);

  useEffect(() => {
    if (
      filterTags.range.length > 0 ||
      filterTags.major.length > 0 ||
      filterRadio
    ) {
      const param = {
        categorySlug: categorySlug,
        priceFrom:
          filterTags.range.length > 0
            ? mergePriceArr(filterTags.range).split('-')[0]
            : 0,
        priceTo:
          filterTags.range.length > 0
            ? mergePriceArr(filterTags.range).split('-')[1]
            : 0,
        typeIds: filterTags.major,
        sortBy: filterRadio,
      };
      fetchListProducts(param).then(data => {
        setProducts(data.products);
      });
    } else {
      setProducts(listProduct.products);
    }
  }, [filterTags, filterRadio]);

  useEffect(() => {
    if (cateDetail?.subCategories) {
      const updatedMenu = cateDetail.subCategories.map(item => ({
        value: item.id || '',
        label: item.text || '',
      }));
      filterData[1].menu = updatedMenu;
    }
  }, [JSON.stringify(cateDetail?.subCategories)]);

  const mergePriceArr = (ranges: string[]) => {
    const convertToNumber = (value: string) => {
      if (value.endsWith('k')) return parseInt(value.replace('k', '')) * 1000;
      if (value.endsWith('m'))
        return parseInt(value.replace('m', '')) * 1000000;
      return parseInt(value);
    };

    const startValues = ranges.map(range =>
      convertToNumber(range.split('-')[0])
    );
    const endValues = ranges.map(range => convertToNumber(range.split('-')[1]));

    const minValue = Math.min(...startValues);
    const maxValue = Math.max(...endValues);

    const mergedRange = `${minValue}-${maxValue}`;

    return mergedRange;
  };

  const renderHero = () => {
    return (
      <div className="flex min-h-44 justify-center bg-hero-payment bg-cover bg-no-repeat py-8 text-white md:min-h-80 md:py-16">
        <div className="flex w-full flex-col items-center gap-2 px-10 md:w-1/2 md:px-0">
          <div className="flex flex-row gap-1">
            <span className="text-black-50">
              {languages.get('product.hero.intro')}
            </span>
            <span>/</span>
            <span>{languages.get('product.hero.product')}</span>
          </div>
          <h1 className="font-playfairBold text-center text-2xl uppercase md:text-6lg">
            {cateDetail?.name?.toUpperCase()}
          </h1>
          <span className="font-playfairRegular text-center text-sm md:text-2lg">
            {languages.get('product.hero.desc')}
          </span>
        </div>
      </div>
    );
  };

  const renderFilter = () => {
    return (
      <div className="hidden justify-between border-b px-36 py-8 md:flex md:px-10 lg:px-36">
        <div className="flex gap-20">
          {filterData.slice(0, 2).map((item, index) => (
            <div
              className="relative flex cursor-pointer items-center gap-2"
              key={index}
              onMouseEnter={() => setHoverFilter(item.title)}
              onMouseLeave={() => setHoverFilter('')}
            >
              <span className="text-lg text-doveGray">{item.title}</span>
              <Image src={images.icons.ic_down} height={24} width={24} alt="" />
              {hoverFilter === item.title &&
                renderSubFilter(item as filterType, 'checkbox')}
            </div>
          ))}
        </div>
        <div
          className="relative flex cursor-pointer items-center gap-2"
          onMouseEnter={() => setHoverFilter(filterData[2].title)}
          onMouseLeave={() => setHoverFilter('')}
        >
          <span className="text-lg text-doveGray">{filterData[2].title}</span>
          <Image src={images.icons.ic_down} height={10} width={13} alt="" />
          {hoverFilter === filterData[2].title &&
            renderSubFilter(filterData[2] as filterType, 'radio')}
        </div>
      </div>
    );
  };

  const onChangeCollapse = (key: string | string[]) => {
    setCollapseActive(key);
  };

  const renderFilterMobile = () => {
    const submitFilter = () => {
      setOpenFilter(false);
    };

    const clearFilter = () => {
      setFilterTags({
        range: [],
        major: [],
      });
      setOpenFilter(false);
    };

    const renderHeaderCollapse = (title: string) => {
      return (
        <div className="flex w-full items-center">
          <span className="font-raleway text-sm text-karaka">{title}</span>
        </div>
      );
    };

    const renderDescCollapse = (item: filterType, radio: boolean = false) => {
      return (
        <>
          {radio ? (
            <Radio.Group
              onChange={onChangeRadio}
              value={filterRadio}
              className="flex flex-col gap-4"
            >
              {item.menu.map((item: any, index: number) => (
                <Radio value={item.value} key={index}>
                  {item.label}
                </Radio>
              ))}
            </Radio.Group>
          ) : (
            <Checkbox.Group
              onChange={list => onChangeCheckbox(list, item.value)}
              value={filterTags[item.value]}
              options={item.menu}
              className="flex flex-col gap-4 text-lg text-doveGray"
            ></Checkbox.Group>
          )}
        </>
      );
    };

    const handleScroll = (e: any) => {
      e.stopPropagation();
      e.preventDefault();
    };

    return (
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-start bg-white md:hidden">
        <div className="flex w-full items-center justify-between px-6 py-3">
          <img src={images.logo} className="h-11 w-16" />
          <img
            src={images.icons.menuClose}
            className="h-6 w-6"
            onClick={() => setOpenFilter(false)}
          />
        </div>

        <div
          className="h-full w-full overflow-y-auto pb-44"
          onScroll={handleScroll}
        >
          <Collapse
            onChange={onChangeCollapse}
            className="flex w-full flex-col items-center justify-between rounded-none border-b border-l-0 border-r-0 border-t-0 bg-white"
          >
            <Panel
              key={0}
              className="w-full"
              showArrow={false}
              header={renderHeaderCollapse(filterData[3].title)}
              extra={
                <img
                  src={
                    collapseActive.includes('0')
                      ? images.icons.ic_down
                      : images.icons.ic_dropdown_right
                  }
                  className="h-6 w-6 transition-transform duration-300"
                />
              }
            >
              {renderDescCollapse(filterData[3] as filterType, true)}
            </Panel>
            {filterData.slice(0, 3).map((item, index) => (
              <Panel
                className="w-full"
                showArrow={false}
                header={renderHeaderCollapse(item.title)}
                key={index + 1}
                extra={
                  <img
                    src={
                      collapseActive.includes((index + 1).toString())
                        ? images.icons.ic_down
                        : images.icons.ic_dropdown_right
                    }
                    className="h-6 w-6 transition-transform duration-300"
                  />
                }
              >
                {renderDescCollapse(item as filterType)}
              </Panel>
            ))}
          </Collapse>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 border-t bg-white px-6 py-7">
          <CustomButton
            text={languages.get('product.filter.mobile.button.accept.text')}
            className="w-full py-3 font-semibold md:hover:bg-white md:hover:text-primary"
            onClick={submitFilter}
          />
          <CustomButton
            text={languages.get('product.filter.mobile.button.clear.text')}
            className="w-full py-3 font-semibold md:hover:bg-white md:hover:text-primary"
            cancelButton
            onClick={clearFilter}
          />
        </div>
      </div>
    );
  };

  const onChangeRadio = (event: RadioChangeEvent) => {
    setFilterRadio(event.target.value);
  };

  const onChangeCheckbox = (list: any[], value: FilterKeys) => {
    setFilterTags(prev => ({ ...prev, [value]: list }));
  };

  const onRemoveTag = (tag: string) => {
    let value = '';
    filterData.forEach(filterCategory => {
      filterCategory.menu.forEach(item => {
        if (item.value === tag) {
          value = filterCategory.value;
        }
      });
    });
    const filterCategoryValue = value as FilterKeys;
    const newTags = filterTags[filterCategoryValue].filter(
      item => item !== tag
    );
    setFilterTags(prev => ({ ...prev, [value]: newTags }));
  };

  const onChangePagination = (page: number) => {
    setPaginationActive(page);
  };

  const getPriceProduct = (product: any) => {
    let price = 0;
    if (product.sku && product.sku.length > 0) {
      price = product.sku.reduce(
        (min: number, item: any) =>
          Number(item.price) < min ? item.price : min,
        product.sku[0].price
      );
    }
    return String(price);
  };

  const renderSubFilter = (item: filterType, typeInput: string) => {
    return (
      <div
        className={`absolute top-14 w-64 border bg-white p-6 ${
          typeInput === 'checkbox' ? 'left-0' : 'right-0'
        } gap-4 shadow-lg`}
      >
        <div className="absolute left-0 right-0 top-u-40 h-10 w-full bg-transparent"></div>
        {typeInput === 'checkbox' ? (
          <Checkbox.Group
            onChange={list => onChangeCheckbox(list, item.value)}
            value={filterTags[item.value]}
            options={item.menu}
            className="flex flex-col gap-4 text-lg text-doveGray"
          ></Checkbox.Group>
        ) : (
          <Radio.Group
            onChange={onChangeRadio}
            value={filterRadio}
            className="flex flex-col gap-4"
          >
            {item.menu.map((item: any, index: number) => (
              <Radio value={item.value} key={index}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        )}
      </div>
    );
  };

  const renderProduct = () => {
    return (
      <div className="mt-8 grid min-h-52 grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {products?.length > 0 &&
          products.map((item: any, index: number) => (
            <div
              className="flex cursor-pointer flex-col rounded border ring-1 ring-stroke hover:ring-caption md:rounded-lg"
              key={index}
              onClick={() => setSelectedProduct(item)}
            >
              <Image
                className="h-28 w-full object-contain md:h-64"
                src={item.images[0]}
                alt=""
                width={300}
                height={300}
              />
              <div className="flex flex-col gap-2 p-4">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-karaka md:text-2lg">
                  {item.product.name}
                </p>
                <div className="flex items-center gap-2">
                  {renderStar(4)}
                  <span className="text-sm text-doveGray">(699)</span>
                </div>
                <span className="text-2lg text-caption">
                  {formatVietnameseCurrency(item.retail_price)}
                </span>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const renderStar = (rate = 4) => {
    return (
      <div className="flex gap-1">
        {starArray.slice(0, rate).map((_, index) => (
          <Image
            width={16}
            height={16}
            alt=""
            src={images.icons.ic_star_active}
            key={index}
          />
        ))}
        {starArray.slice(rate - 1, starArray.length - 1).map((_, index) => (
          <Image
            width={16}
            height={16}
            alt=""
            src={images.icons.ic_star}
            key={index}
          />
        ))}
      </div>
    );
  };

  const renderFilterTag = () => {
    const mergeFilters = (range: string[], major: string[]) => {
      return [...range, ...major];
    };

    const mergeArr = mergeFilters(filterTags.range, filterTags.major);

    const labelTag = (tag: string) => {
      let label;

      filterData.forEach(filterCategory => {
        filterCategory.menu.forEach(item => {
          if (item.value === tag) {
            label = item.label;
          }
        });
      });

      return label;
    };
    return (
      <div className="mt-6 flex flex-wrap gap-5">
        {mergeArr.map((item, index) => (
          <div className="flex items-center gap-2 border p-2" key={index}>
            <span>{labelTag(item)}</span>
            <Image
              width={16}
              height={16}
              alt=""
              src={images.icons.menuClose}
              className="cursor-pointer"
              onClick={() => onRemoveTag(item)}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderPagination = () => {
    return (
      <div className="mt-5 flex items-center justify-center gap-7 md:gap-4">
        <span className="font-raleway text-lg text-doveGray">
          {languages.get('product.pagination.text')}
        </span>
        <div className="w-12 border border-doveGray"></div>
        {paginationArray.map((item, index) => (
          <span
            onClick={() => onChangePagination(item)}
            key={index}
            className={`${
              paginationActive === item
                ? 'font-bold text-karaka'
                : 'text-doveGray'
            } font-raleway relative block cursor-pointer text-lg`}
          >
            {item}
            {paginationActive === item && (
              <div className="absolute w-full border border-primary"></div>
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderHero()}
      {renderFilter()}
      <div className="flex justify-end border-b py-6 pr-6 md:hidden">
        <div
          className="flex h-10 w-36 items-center justify-center gap-2 rounded bg-pampas md:hidden"
          onClick={() => setOpenFilter(true)}
        >
          <span className="font-raleway text-xs text-karaka">
            {languages.get('product.filter.mobile.button')}
          </span>
          <img
            src={images.icons.ic_filter}
            alt="icon-filter"
            className="h-6 w-6"
          />
        </div>
      </div>
      <div className="px-6 pb-12 md:px-10 lg:px-36">
        {renderFilterTag()}
        {renderProduct()}
        {renderPagination()}
      </div>
      {openFilter && renderFilterMobile()}
      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
