"use client"

import images from "@/configs/images"
import languages from "@/configs/languages"
import {Collapse} from "antd"
import {useState} from "react"
import {collapseData} from "./constant"

const { Panel } = Collapse

export default function Home() {
  const [collapseActive, setCollapseActive] = useState<string | string[]>([])

  const renderHero = () => {
    return (
      <div className="min-h-[307px] bg-image-hero-policy bg-no-repeat bg-cover flex justify-center pt-[63px] pb-[62px] text-white">
        <div className="w-1/2 flex flex-col items-center gap-[8px]">
          <div className="flex flex-row gap-1">
            <span className='text-black-50'>{languages.get("policy.hero.intro.text")}</span>
            <span>/</span>
            <span>{languages.get("policy.hero.policy.text")}</span>
          </div>
          <h1 className="uppercase font-playfairBold leading-[90px] text-[60px] text-center">
            {languages.get("policy.title")}
          </h1>
          <span className="font-playfairRegular leading-[30px] text-[20px] text-center">
            {languages.get("policy.desc")}
          </span>
        </div>
      </div>
    )
  }

  const renderFooterPolicy = () => {
    return (
      <div className="bg-image-footer-policy bg-no-repeat bg-cover flex items-center flex-col pb-[57px] pt-[98px] text-white">
        <h2 className="font-playfairBold text-[40px] leading-[53.32px] mb-[25px]">
          {languages.get("policy.footer.title")}
        </h2>
        <div className="w-[209px] h-[48px] flex items-center justify-center border-primary border-solid border-[2px] cursor-pointer mb-[30px] bg-white rounded">
          <span className="font-raleway text-primary font-bold text-lg">{languages.get("policy.footer.button.text")}</span>
        </div>
        <div className="flex items-center gap-[14px] mb-[23px]">
          <div className="h-[1px] w-[43px] bg-white"></div>
          <span>{languages.get("policy.footer.or.text")}</span>
          <div className="h-[1px] w-[43px] bg-white"></div>
        </div>
        <div className="flex items-center gap-[21px] ">
          <div className="w-[42px] h-[42px] bg-white flex items-center justify-center rounded">
            <img src={images.icons.instagramColor} alt="" />
          </div>
          <div className="w-[42px] h-[42px] bg-white flex items-center justify-center rounded">
            <img src={images.icons.tiktokColor} alt="" />
          </div>
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
        <div className="flex gap-[75px]">
          <span className="font-raleway text-[20px] leading-[30px] text-doveGray">
            0{index + 1}
          </span>
          <span className="font-raleway text-[20px] leading-[30px] text-karaka">
            {title}
          </span>
        </div>
      )
    }

    const renderDescCollapse = (item: { title: string; desc: string }[]) => {
      return (
        <div className="flex flex-col gap-[28px]">
          {item.map((item, index) => (
            <div className="flex flex-col gap-[17px]" key={index}>
              <h3 className="text-karaka text-[18px] leading-[25.16px] font-raleway">
                {item.title}
              </h3>
              <span className="whitespace-pre-line text-karaka text-[18px] leading-[25.16px] font-raleway">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      )
    }

    return (
      <Collapse
        onChange={onChangeCollapse}
        className="border-t-[1px] border-b-[1px] border-solid border-stroke"
        bordered={false}
      >
        {collapseData.map((item, index) => (
          <Panel
            className='hover:bg-pampas'
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
                className="w-[18px] h-[18px] transition-transform duration-300 hover:scale-150 "
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
      {renderFooterPolicy()}
    </>
  )
}
