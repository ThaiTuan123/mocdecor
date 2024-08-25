"use client"

import TextInput from "@/components/inputs/TextInput"
import CustomButton from "@/components/button/CustomButton"
import languages from "@/configs/languages"
import SelectCustom from "@/components/select/Select"
import { useEffect, useState } from "react"
import {
  fetchCities,
  fetchDistricts,
  fetchWards,
} from "@/services/fetchCountries"
import Image from "next/image"
import images from "@/configs/images"
import { Radio, RadioChangeEvent } from "antd"
import { formatVietnameseCurrency } from "@/utils"
import { radioData } from "./constants"

const product = [
  {
    title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
    desc: "Xanh dương, set nguyên liệu, tự trang trí",
    price: 175000,
    quantity: 1,
  },
  {
    title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
    desc: "Xanh dương, set nguyên liệu, tự trang trí",
    price: 175000,
    quantity: 1,
  },
  {
    title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
    desc: "Xanh dương, set nguyên liệu, tự trang trí",
    price: 175000,
    quantity: 1,
  },
  {
    title: "Khung Handmade 3D, Set Nguyên liệu, Trang trí...",
    desc: "Xanh dương, set nguyên liệu, tự trang trí",
    price: 175000,
    quantity: 1,
  },
]

interface formType {
  city: string | null
  district: string | null
  ward: string | null
  paymentType: number
}

export default function Payment() {
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [formValue, setFormValue] = useState<formType>({
    city: null,
    district: null,
    ward: null,
    paymentType: 1,
  })

  useEffect(() => {
    getDataCities()
  }, [])

  const getDataCities = async () => {
    const resCountries = await fetchCities()
    if (resCountries) {
      setCities(resCountries)
    }
  }

  const renderHero = () => {
    return (
      <div className="min-h-80 bg-image-hero-policy bg-no-repeat bg-cover flex justify-center pt-16 pb-16 text-white">
        <div className="w-1/2 flex flex-col items-center gap-2">
          <div className="flex flex-row gap-1">
            <span className="text-black-50">
              {languages.get("payment.hero.intro.text")}
            </span>
            <span>/</span>
            <span>{languages.get("payment.hero.payment.text")}</span>
          </div>
          <h1 className="uppercase font-playfairBold text-6lg text-center">
            {languages.get("payment.title")}
          </h1>
          <span className="font-playfairRegular text-2lg text-center">
            {languages.get("payment.desc")}
          </span>
        </div>
      </div>
    )
  }

  const renderContainerPayment = () => {
    return (
      <div className="flex flex-row">
        {renderInfoPayment()}
        <div className="border"></div>
        {renderInfoOrder()}
      </div>
    )
  }

  const handleChangeCity = async (value: string) => {
    setFormValue((prev) => ({
      ...prev,
      city: value,
      district: null,
      ward: null,
    }))
    const resDistricts = await fetchDistricts(value)
    setDistricts(resDistricts)
  }

  const handleChangeDistrict = async (value: string) => {
    setFormValue((prev) => ({
      ...prev,
      district: value,
      ward: null,
    }))
    const resWards = await fetchWards(value)
    setWards(resWards)
  }

  const handleChangeWard = (value: string) => {
    setFormValue((prev) => ({
      ...prev,
      ward: value,
    }))
  }

  const handleChangeTypePayment = (value: number) => {
    setFormValue((prev) => ({
      ...prev,
      paymentType: value,
    }))
  }

  const renderInfoTypePayment = () => {
    return (
      <Radio.Group
        onChange={(e: RadioChangeEvent) =>
          handleChangeTypePayment(e.target.value)
        }
        value={formValue.paymentType}
        className="flex gap-6"
      >
        {radioData.map((item, index) => (
          <div
            className="flex flex-col gap-2 flex-1 pt-4 pb-5 px-4 border rounded cursor-pointer"
            key={index}
            onClick={() =>
              setFormValue((prev) => ({ ...prev, paymentType: item.value }))
            }
          >
            <Radio
              value={item.value}
              style={{
                fontSize: 18,
                fontWeight: formValue.paymentType == item.value ? 600 : 400,
              }}
            >
              {item.title}
            </Radio>
            <div className="flex justify-center w-full">
              <Image src={item.image} alt="" width={138} height={128} />
            </div>
          </div>
        ))}
      </Radio.Group>
    )
  }

  const renderInfoPayment = () => {
    return (
      <div className="flex-1 flex flex-col pt-12 pb-16 pl-36 pr-6">
        <h2 className="text-2lg text-primary">
          {languages.get("payment.info.title")}
        </h2>
        <form className="space-y-6 mt-8">
          <div className="flex gap-6">
            <TextInput
              label={languages.get("payment.info.input.name.label")}
              placeholder={languages.get("payment.info.input.name.placeholder")}
              type="text"
            />
            <TextInput
              label={languages.get("payment.info.input.phone.label")}
              placeholder={languages.get(
                "payment.info.input.phone.placeholder"
              )}
              type="text"
            />
          </div>
          <div className="flex gap-6">
            <TextInput
              label={languages.get("payment.info.input.email.label")}
              placeholder={languages.get(
                "payment.info.input.email.placeholder"
              )}
              type="email"
            />
            <SelectCustom
              label={languages.get("payment.info.input.city.label")}
              placeholder={languages.get("payment.info.input.city.placeholder")}
              handleChange={handleChangeCity}
              option={cities}
              value={formValue.city}
              disable={false}
            />
          </div>
          <div className="flex gap-6">
            <SelectCustom
              label={languages.get("payment.info.input.district.label")}
              placeholder={languages.get(
                "payment.info.input.district.placeholder"
              )}
              handleChange={handleChangeDistrict}
              option={districts}
              value={formValue.district}
              disable={formValue.city ? false : true}
            />
            <SelectCustom
              label={languages.get("payment.info.input.ward.label")}
              placeholder={languages.get("payment.info.input.ward.placeholder")}
              handleChange={handleChangeWard}
              option={wards}
              value={formValue.ward}
              disable={formValue.district ? false : true}
            />
          </div>
          <TextInput
            label={languages.get("payment.info.input.address.label")}
            placeholder={languages.get(
              "payment.info.input.address.placeholder"
            )}
            type="tel"
          />
          <CustomButton
            type="submit"
            className="w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
          >
            {languages.get("payment.info.form.button")}
          </CustomButton>
          <h2 className="text-2lg text-primary">
            {languages.get("payment.type.title")}
          </h2>
          {renderInfoTypePayment()}
        </form>
      </div>
    )
  }

  const renderContainerProduct = () => {
    return (
      <div className="flex flex-col mt-8">
        {product.map((item: any, index) => (
          <>
            <div className="flex items-center gap-4 py-5 pr-5" key={index}>
              <div className="p-3">
                <Image
                  src={images.paymentType2}
                  alt=""
                  width={70}
                  height={70}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h3>{item.title}</h3>
                <span className="text-sm text-doveGray">{item.desc}</span>
                <div className="flex gap-1 items-end">
                  <span className="text-2lg text-caption">
                    {formatVietnameseCurrency(item.price)}
                  </span>
                  <span className="text-1.25sm text-doveGray">
                    x{item.quantity}
                  </span>
                </div>
              </div>
            </div>
            <div className="border"></div>
          </>
        ))}
      </div>
    )
  }

  const renderInfoOrder = () => {
    return (
      <div className="flex-1 py-12 pl-8 pr-36 bg-#FBFBFB">
        <h2 className="text-2lg text-primary">
          {languages.get("payment.order.title")}
        </h2>
        {renderContainerProduct()}
        <div className="flex flex-col gap-4 bg-pampas px-6 py-4 rounded">
          <div className="flex justify-between">
            <span className="text-1.25sm text-karaka">
              {languages.get("payment.order.price")}
            </span>
            <span className="text-lg text-black font-semibold">
              {formatVietnameseCurrency(175000)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-1.25sm text-karaka">
              {languages.get("payment.order.ship.fee")}
            </span>
            <span className="text-lg text-black font-semibold">
              {formatVietnameseCurrency(30000)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-2lg text-black font-bold">
              {languages.get("payment.order.total")}
            </span>
            <span className="text-2lg text-black font-bold">
              {formatVietnameseCurrency(205000)}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      {renderHero()}
      {renderContainerPayment()}
    </div>
  )
}
