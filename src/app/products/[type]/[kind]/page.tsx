"use client"

import languages from "@/configs/languages"
import { filterData, FilterKeys, filterType } from "./constant"
import Image from "next/image"
import images from "@/configs/images"
import { formatVietnameseCurrency } from "@/utils"
import { useEffect, useState } from "react"
import { Checkbox, Radio, RadioChangeEvent } from "antd"
import { usePathname } from "next/navigation"
import './style.css'

const productData = [
  {
    title: "Set Light Blue Pastel",
    image: images.client5,
    rate: 4,
    rateTotal: 699,
    price: 175000,
  },
  {
    title: "Set Light Blue Pastel",
    image: images.client5,
    rate: 4,
    rateTotal: 699,
    price: 175000,
  },
  {
    title: "Set Light Blue Pastel",
    image: images.client5,
    rate: 4,
    rateTotal: 699,
    price: 175000,
  },
  {
    title: "Set Light Blue Pastel",
    image: images.client5,
    rate: 4,
    rateTotal: 699,
    price: 175000,
  },
  {
    title: "Set Light Blue Pastel",
    image: images.client5,
    rate: 4,
    rateTotal: 699,
    price: 175000,
  },
]

interface filtersCheckboxType {
  range: string[],
  size: string[],
  major: string[]
}

export default function Products() {
  const starArray = new Array(5).fill(0)
  const paginationArray = new Array(3).fill(0).map((_, i) => i + 1)
  const [paginationActive, setPaginationActive] = useState(1)
  const [filterTags, setFilterTags] = useState<filtersCheckboxType>({
    range: [],
    size: [],
    major: [],
  })
  const [filterRadio, setFilterRadio] = useState("")
  const [hoverFilter, setHoverFilter] = useState("")
  const pathname = usePathname()

  const title = () => {
    const value = pathname.split("/")[2]
    let title = ""
    switch (value) {
      case "Khung%20anh":
        title = languages.get("product.hero.title.frame")
        break
      case "ANH%20IN":
        title = languages.get("product.hero.title.print")
        break
      case "ALBUM%20ANH":
        title = languages.get("product.hero.title.album")
        break
      // case "other":
      //   title = languages.get("product.hero.title.other")
      //   break
      default:
        title = languages.get("product.hero.title.frame")
        break
    }
    return title
  }

  const renderHero = () => {
    return (
      <div className="min-h-80 bg-hero-payment bg-no-repeat bg-cover flex justify-center pt-16 pb-16 text-white">
        <div className="w-1/2 flex flex-col items-center gap-2">
          <div className="flex flex-row gap-1">
            <span className="text-black-50">
              {languages.get('product.hero.intro')}
            </span>
            <span>/</span>
            <span>{languages.get('product.hero.product')}</span>
          </div>
          <h1 className="uppercase font-playfairBold text-6lg text-center">
            {title()}
          </h1>
          <span className="font-playfairRegular text-2lg text-center">
            {languages.get('product.hero.desc')}
          </span>
        </div>
      </div>
    )
  }

  const renderFilter = () => {
    return (
      <div className="flex justify-between py-8 border-b px-36">
        <div className="flex gap-20">
          {filterData.slice(0, 3).map((item, index) => (
            <div
              className="flex gap-2 items-center cursor-pointer relative"
              key={index}
              onMouseEnter={() => setHoverFilter(item.title)}
              onMouseLeave={() => setHoverFilter("")}
            >
              <span className="text-doveGray text-lg">{item.title}</span>
              <Image src={images.icons.ic_down} height={24} width={24} alt="" />
              {hoverFilter === item.title && renderSubFilter(item as filterType, "checkbox")}
            </div>
          ))}
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer relative"
          onMouseEnter={() => setHoverFilter(filterData[3].title)}
          onMouseLeave={() => setHoverFilter("")}
        >
          <span className="text-doveGray text-lg">{filterData[3].title}</span>
          <Image src={images.icons.ic_down} height={10} width={13} alt="" />
          {hoverFilter === filterData[3].title &&
            renderSubFilter(filterData[3] as filterType, "radio")}
        </div>
      </div>
    )
  }

  const onChangeRadio = (event: RadioChangeEvent) => {
    setFilterRadio(event.target.value)
  }

  const onChangeCheckbox = (list: string[], value: FilterKeys) => {
    setFilterTags(prev => ({...prev, [value]: list }))
  }

  const onRemoveTag = (tag: string) => {
    let value = ''
    filterData.forEach((filterCategory) => {
      filterCategory.menu.forEach((item) => {
        if (item.value === tag) {
          value = filterCategory.value
        }
      })
    })
    const filterCategoryValue = value as FilterKeys
    const newTags = filterTags[filterCategoryValue].filter((item) => item !== tag)
    setFilterTags(prev => ({...prev, [value]: newTags }))
  }

  const onChangePagination = (page: number) => {
    setPaginationActive(page)
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
      <div className="grid grid-cols-4 gap-6 mt-8">
        {productData.map((item, index) => (
          <div className="flex flex-col border rounded-lg" key={index}>
            <img
              className="w-full h-64 object-contain"
              src={item.image}
              alt=""
            />
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-karaka text-2lg">{item.title}</h3>
              <div className="flex items-center gap-2">
                {renderStar(item.rate)}
                <span>({item.rateTotal})</span>
              </div>
              <span className="text-2lg text-caption">
                {formatVietnameseCurrency(item.price)}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderStar = (rate: number) => {
    return (
      <div className="flex gap-1">
        {starArray.slice(0, rate - 1).map((_, index) => (
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
    const mergeFilters = (range: string[], size: string[], major: string[]) => {
      return [
        ...range,
        ...size,
        ...major
      ];
    };

    const mergeArr = mergeFilters(filterTags.range, filterTags.size, filterTags.major)

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
      <div className="flex gap-4 items-center justify-center mt-5">
        <span className="font-raleway text-lg text-doveGray">{languages.get("product.pagination.text")}</span>
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
      <div className="px-36 pb-12">
        {renderFilterTag()}
        {renderProduct()}
        {renderPagination()}
      </div>
    </div>
  )
}
