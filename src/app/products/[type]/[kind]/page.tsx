"use client"

import languages from "@/configs/languages"
import { filterData, FilterKeys, filterType } from "./constant"
import Image from "next/image"
import images from "@/configs/images"
import { formatVietnameseCurrency } from "@/utils"
import { useEffect, useState } from "react"
import { Checkbox, Collapse, Radio, RadioChangeEvent } from "antd"
import { usePathname } from "next/navigation"
import "./style.css"
import CustomButton from "../../../../components/button/CustomButton"
import ProductPopup from "@/components/popup/ProductPopup"
import useListProducts from "@/recoil/hooks/useListProducts"
import useCategoryDetail from "@/recoil/hooks/useCategoryDetail"

interface filtersCheckboxType {
  range: string[]
  major: string[]
}

const { Panel } = Collapse

export default function Products() {
  const starArray = new Array(5).fill(0)
  const paginationArray = new Array(3).fill(0).map((_, i) => i + 1)
  const [paginationActive, setPaginationActive] = useState(1)
  const [filterTags, setFilterTags] = useState<filtersCheckboxType>({
    range: [],
    major: [],
  })
  const [filterRadio, setFilterRadio] = useState("")
  const [hoverFilter, setHoverFilter] = useState("")
  const pathname = usePathname()
  const { cateDetail } = useCategoryDetail(pathname.split("/")[2])
  const [openFilter, setOpenFilter] = useState(false)
  const [collapseActive, setCollapseActive] = useState<string | string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const { listProduct = [] } = useListProducts(pathname.split("/")[2])
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (listProduct) {
      setProducts(listProduct.products)
    }
  }, [listProduct])

  useEffect(() => {
    if (cateDetail?.subCategories) {
      const updatedMenu = cateDetail.subCategories.map((item) => ({
        value: item.slug || "",
        label: item.text || "",
      }))
      filterData[1].menu = updatedMenu
    }
  }, [JSON.stringify(cateDetail?.subCategories)])

  const renderHero = () => {
    return (
      <div className="min-h-44 md:min-h-80 bg-hero-payment bg-no-repeat bg-cover flex justify-center py-8 md:py-16 text-white">
        <div className="w-full md:w-1/2 flex flex-col items-center gap-2 px-10 md:px-0">
          <div className="flex flex-row gap-1">
            <span className="text-black-50">
              {languages.get("product.hero.intro")}
            </span>
            <span>/</span>
            <span>{languages.get("product.hero.product")}</span>
          </div>
          <h1 className="uppercase font-playfairBold text-2xl md:text-6lg text-center">
            {cateDetail?.name?.toUpperCase()}
          </h1>
          <span className="font-playfairRegular text-sm md:text-2lg text-center">
            {languages.get("product.hero.desc")}
          </span>
        </div>
      </div>
    )
  }

  const renderFilter = () => {
    return (
      <div className="hidden md:flex justify-between py-8 border-b px-36 lg:px-36 md:px-10">
        <div className="flex gap-20">
          {filterData.slice(0, 2).map((item, index) => (
            <div
              className="flex gap-2 items-center cursor-pointer relative"
              key={index}
              onMouseEnter={() => setHoverFilter(item.title)}
              onMouseLeave={() => setHoverFilter("")}
            >
              <span className="text-doveGray text-lg">{item.title}</span>
              <Image src={images.icons.ic_down} height={24} width={24} alt="" />
              {hoverFilter === item.title &&
                renderSubFilter(item as filterType, "checkbox")}
            </div>
          ))}
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer relative"
          onMouseEnter={() => setHoverFilter(filterData[2].title)}
          onMouseLeave={() => setHoverFilter("")}
        >
          <span className="text-doveGray text-lg">{filterData[2].title}</span>
          <Image src={images.icons.ic_down} height={10} width={13} alt="" />
          {hoverFilter === filterData[2].title &&
            renderSubFilter(filterData[2] as filterType, "radio")}
        </div>
      </div>
    )
  }

  const onChangeCollapse = (key: string | string[]) => {
    setCollapseActive(key)
  }

  const renderFilterMobile = () => {
    const submitFilter = () => {
      setOpenFilter(false)
    }

    const clearFilter = () => {
      setFilterTags({
        range: [],
        major: [],
      })
      setOpenFilter(false)
    }

    const renderHeaderCollapse = (title: string) => {
      return (
        <div className="flex w-full items-center">
          <span className="font-raleway text-karaka text-sm">{title}</span>
        </div>
      )
    }

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
              onChange={(list) => onChangeCheckbox(list, item.value)}
              value={filterTags[item.value]}
              options={item.menu}
              className="flex flex-col gap-4 text-doveGray text-lg"
            ></Checkbox.Group>
          )}
        </>
      )
    }

    const handleScroll = (e: any) => {
      e.stopPropagation()
      e.preventDefault()
    }

    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 md:hidden flex flex-col items-start bg-white z-50">
        <div className="flex justify-between w-full items-center px-6 py-3">
          <img src={images.logo} className="w-16 h-11" />
          <img
            src={images.icons.menuClose}
            className="w-6 h-6"
            onClick={() => setOpenFilter(false)}
          />
        </div>

        <div className="w-full h-full overflow-y-auto pb-44"  onScroll={handleScroll}>

        <Collapse
            onChange={onChangeCollapse}
            className="flex flex-col justify-between items-center rounded-none border-t-0 border-l-0 border-r-0 border-b bg-white w-full"
          >
            <Panel
                key={0}
                className="w-full"
                showArrow={false}
                header={renderHeaderCollapse(filterData[3].title)}
                extra={
                  <img
                    src={
                      collapseActive.includes("0")
                        ? images.icons.ic_down
                        : images.icons.ic_dropdown_right
                    }
                    className="w-6 h-6 transition-transform duration-300"
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
                    className="w-6 h-6 transition-transform duration-300"
                  />
                }
              >
                {renderDescCollapse(item as filterType)}
              </Panel>
            ))}
          </Collapse>
        </div>

        
        <div className="absolute flex flex-col gap-4 left-0 right-0 bottom-0 py-7 px-6 border-t bg-white">
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
    )
  }

  const onChangeRadio = (event: RadioChangeEvent) => {
    setFilterRadio(event.target.value)
  }

  const onChangeCheckbox = (list: string[], value: FilterKeys) => {
    setFilterTags((prev) => ({ ...prev, [value]: list }))
  }

  const onRemoveTag = (tag: string) => {
    let value = ""
    filterData.forEach((filterCategory) => {
      filterCategory.menu.forEach((item) => {
        if (item.value === tag) {
          value = filterCategory.value
        }
      })
    })
    const filterCategoryValue = value as FilterKeys
    const newTags = filterTags[filterCategoryValue].filter(
      (item) => item !== tag
    )
    setFilterTags((prev) => ({ ...prev, [value]: newTags }))
  }

  const onChangePagination = (page: number) => {
    setPaginationActive(page)
  }

  const getPriceProduct = (product: any) => {
    let price = 0
    if (product.sku && product.sku.length > 0) {
      price = product.sku.reduce(
        (min: number, item: any) =>
          Number(item.price) < min ? item.price : min,
        product.sku[0].price
      )
    }
    return String(price)
  }

  const renderSubFilter = (item: filterType, typeInput: string) => {
    return (
      <div
        className={`w-64 absolute p-6 border bg-white top-14 ${
          typeInput === "checkbox" ? "left-0" : "right-0"
        } gap-4 shadow-lg`}
      >
        <div className="bg-transparent w-full absolute h-10 top-u-40 left-0 right-0"></div>
        {typeInput === "checkbox" ? (
          <Checkbox.Group
            onChange={(list) => onChangeCheckbox(list, item.value)}
            value={filterTags[item.value]}
            options={item.menu}
            className="flex flex-col gap-4 text-doveGray text-lg"
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
    )
  }

  const renderProduct = () => {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-6 gap-2 mt-8 min-h-52">
        {products?.length > 0 &&
          products.map((item: any, index: number) => (
            <div
              className="flex flex-col border md:rounded-lg rounded hover:ring-caption cursor-pointer ring-stroke ring-1"
              key={index}
              onClick={() => setSelectedProduct(item)}
            >
              <Image
                className="w-full h-28 md:h-64 object-contain"
                src={item.images[0]}
                alt=""
                width={300}
                height={300}
              />
              <div className="flex flex-col gap-2 p-4">
                <p className="text-karaka md:text-2lg text-lg font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
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
    )
  }

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
    )
  }

  const renderFilterTag = () => {
    const mergeFilters = (range: string[], major: string[]) => {
      return [...range, ...major]
    }

    const mergeArr = mergeFilters(
      filterTags.range,
      filterTags.major
    )

    const labelTag = (tag: string) => {
      let label

      filterData.forEach((filterCategory) => {
        filterCategory.menu.forEach((item) => {
          if (item.value === tag) {
            label = item.label
          }
        })
      })

      return label
    }
    return (
      <div className="flex flex-wrap mt-6 gap-5">
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
    )
  }

  const renderPagination = () => {
    return (
      <div className="flex md:gap-4 gap-7 items-center justify-center mt-5">
        <span className="font-raleway text-lg text-doveGray">
          {languages.get("product.pagination.text")}
        </span>
        <div className="border w-12 border-doveGray"></div>
        {paginationArray.map((item, index) => (
          <span
            onClick={() => onChangePagination(item)}
            key={index}
            className={`${
              paginationActive === item
                ? "font-bold text-karaka"
                : "text-doveGray"
            } block text-lg font-raleway cursor-pointer relative`}
          >
            {item}
            {paginationActive === item && (
              <div className="absolute border w-full border-primary"></div>
            )}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div>
      {renderHero()}
      {renderFilter()}
      <div className="md:hidden flex justify-end pr-6 py-6 border-b">
        <div
          className="md:hidden flex justify-center h-10 w-36 bg-pampas items-center gap-2 rounded"
          onClick={() => setOpenFilter(true)}
        >
          <span className="text-xs font-raleway text-karaka">
            {languages.get('product.filter.mobile.button')}
          </span>
          <img
            src={images.icons.ic_filter}
            alt="icon-filter"
            className="w-6 h-6"
          />
        </div>
      </div>
      <div className="px-6 lg:px-36 md:px-10 pb-12">
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
  )
}
