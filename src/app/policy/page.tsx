"use client"

import images from "@/configs/images"
import languages from "@/configs/languages"
import { Collapse } from "antd"
import { useState } from "react"

const { Panel } = Collapse

const collapseItems = [
    {
        "header": languages.get("policy.collapse.title1"),
        "desc": "abcabc"
    },
    {
        "header": languages.get("policy.collapse.title1"),
        "desc": "abcabc"
    },
    {
        "header": languages.get("policy.collapse.title1"),
        "desc": "abcabc"
    },
    {
        "header": languages.get("policy.collapse.title1"),
        "desc": "abcabc"
    },
]

export default function Home() {

    const [collapseActive, setCollapseActive] = useState<string | string[]>([]);
  
    const renderHero = () => {
    return (
      <div className="min-h-[307px] bg-hero-policy bg-no-repeat bg-cover flex justify-center pt-[63px] pb-[62px]">
        <div className="w-1/2 flex flex-col items-center gap-[8px]">
          <div className="flex flex-row gap-1">
            <span>{languages.get("policy.hero.intro.text")}</span>
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

  const onChangeCollapse = (key: string | string[]) => {
    setCollapseActive(key)
  };

  const renderCollapsePolicy = () => {

    return (
      <Collapse onChange={onChangeCollapse}>
        {collapseItems.map((item, index) => (
            <Panel
            showArrow={false}
            header={item.header}
            key={index}
            extra={<img src={collapseActive.includes(index.toString()) ? images.icons.ic_minus : images.icons.ic_plus} className="w-[18px] h-[18px]"/>}
          >
            <p>{item.desc}</p>
          </Panel>
        ))}
      </Collapse>
    )
  }

  return (
    <>
      {renderHero()}
      {renderCollapsePolicy()}
    </>
  )
}
