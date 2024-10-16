"use client"

import images from "@/configs/images"
import languages from "@/configs/languages"
import {Collapse} from "antd"
import {useState} from "react"
import {collapseData} from "./constant"
import FooterDiscover from "@/components/footer/FooterDiscover";

const { Panel } = Collapse

export default function Policy() {
  const [collapseActive, setCollapseActive] = useState<string | string[]>([])

  const renderHero = () => {
    return (
        <div
            className="min-h-44 md:min-h-80 bg-image-hero-policy bg-no-repeat bg-cover flex justify-center py-8 md:py-16 text-white">
          <div className="w-full md:w-1/2 flex flex-col items-center gap-2 px-10 md:px-0">
            <div className="flex flex-row gap-1">
            <span className="text-black-50">
              {languages.get("policy.hero.intro.text")}
            </span>
            <span>/</span>
            <span>{languages.get("policy.hero.policy.text")}</span>
          </div>
              <h1 className="uppercase font-playfairBold text-2xl md:text-6lg text-center">
                  {languages.get("policy.title")}
              </h1>
              <span className="font-playfairRegular text-sm md:text-2lg text-center">
            {languages.get("policy.desc")}
          </span>
        </div>
      </div>
    )
  }

  const onChangeCollapse = (key: string | string[]) => {
    setCollapseActive(key)
  }

  const renderCollapsePolicy = () => {
    const renderHeaderCollapse = (index: number, title: string) => {
      return (
        <div className="flex sm:gap-20 gap-2 items-center">
          <span className="font-raleway sm:text-2lg text-doveGray text-xs">
            0{index + 1}
          </span>
          <span className="font-raleway sm:text-2lg text-karaka text-sm">{title}</span>
        </div>
      )
    }

    const renderDescCollapse = (item: { title: string; desc: string }[]) => {
      const combinedRegex =
        /(\+?\d{1,4}[\s-]?\(?\d{1,3}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9})|((http|https):\/\/[^\s]+)/g

      const highlightPhoneNumbers = (text: string) => {
        return text.replace(
          combinedRegex,
          '<span class="text-primary">$&</span>'
        )
      }

      return (
        <div className="flex flex-col gap-7">
          {item.map((item, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <h3 className="text-karaka sm:text-1.25lg text-xs font-raleway font-bold">
                {item?.title}
              </h3>
              <span
                className="whitespace-pre-line text-karaka sm:text-1.25lg text-sm font-raleway"
                dangerouslySetInnerHTML={{
                  __html: highlightPhoneNumbers(item?.desc),
                }}
              />
            </div>
          ))}
        </div>
      )
    }

    return (
      <Collapse
        onChange={onChangeCollapse}
        className="border-t border-b border-solid border-stroke mb-14 mt-14"
        bordered={false}
      >
        {collapseData.map((item, index) => (
          <Panel
            className="hover:bg-pampas"
            showArrow={false}
            header={renderHeaderCollapse(index, item.header)}
            key={index}
            extra={
              <img
                src={
                  collapseActive.includes(index.toString())
                    ? images.icons.ic_minus
                    : images.icons.ic_plus
                }
                className="w-4 h-4 transition-transform duration-300 hover:scale-150 "
              />
            }
          >
            {renderDescCollapse(item.desc)}
          </Panel>
        ))}
      </Collapse>
    )
  }

  return (
    <>
      {renderHero()}
      {renderCollapsePolicy()}
      {FooterDiscover()}
    </>
  )
}
