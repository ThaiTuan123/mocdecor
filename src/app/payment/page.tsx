"use client"

import TextInput from "@/components/inputs/TextInput"
import CustomButton from "@/components/button/CustomButton"
import languages from "@/configs/languages"
import SelectCustom from "@/components/select/Select"
import React, {FormEvent, useEffect, useState} from "react"
import {fetchCities, fetchDistricts, fetchWards,} from "@/services/fetchCountries"
import Image from "next/image"
import images from "@/configs/images"
import {formatVietnameseCurrency} from "@/utils"
import {radioData} from "./constants"
import {LayoutOpacity} from "@/components"
import {redirect} from "next/navigation"
import PaymentOption from "@/components/options/PaymentOption";

// Import Recoil and cartState atom
import {useRecoilValue} from "recoil";
import {cartState} from "@/recoil/atoms/cartAtom";
import PaymentSuccessPopup from "@/components/popup/PaymentSuccessPopup";
import usePopupSuccess from "@/recoil/hooks/usePopupSuccess";
import { CartItem } from "@/types/cartType"

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
    const [isShowModalSuccess, setIsShowModalSuccess] = useState(false)
    const [countdown, setCountdown] = useState(5)
    const priceFee = 30000

    const cart = useRecoilValue(cartState); // <--- Changed here

    useEffect(() => {
        getDataCities()
    }, [])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setIsShowModalSuccess(true); // Show the popup when the form is submitted
    };

    // Use the custom hook
    const timeRemaining = usePopupSuccess(isShowModalSuccess, () => {
        setIsShowModalSuccess(false);
    });

    useEffect(() => {
        if (timeRemaining === 0 && !isShowModalSuccess) {
            // Redirect to the desired page
            redirect("/gallery");
        }
    }, [timeRemaining, isShowModalSuccess]);

    const getDataCities = async () => {
        const resCountries = await fetchCities()
        if (resCountries) {
            setCities(resCountries)
        }
    }

    const getTotalPrice = () => {
        const price = cart.reduce((result, item) => result + Number(item.originalPrice) * item.quantity, 0)
        return String(price)
    }

    const renderHero = () => {
        const renderHeroText = () => (
            <div className="flex flex-row gap-1">
            <span className="text-black-50">
                {languages.get("payment.hero.intro.text")}
            </span>
                <span>/</span>
                <span>{languages.get("payment.hero.payment.text")}</span>
            </div>
        );

        const renderHeroHeading = () => (
            <h1 className="uppercase font-playfairBold text-2xl md:text-6lg text-center">
                {languages.get("payment.title")}
            </h1>
        );

        const renderHeroDescription = () => (
            <span className="font-playfairRegular text-sm md:text-2lg text-center">
            {languages.get("payment.desc")}
        </span>
        );

        return (
            <div
                className="min-h-44 md:min-h-80 bg-hero-payment bg-no-repeat bg-cover flex justify-center py-8 md:py-16 text-white">
                <div className="w-full md:w-1/2 flex flex-col items-center gap-2 px-10 md:px-0">
                    {renderHeroText()}
                    {renderHeroHeading()}
                    {renderHeroDescription()}
                </div>
            </div>
        );
    };

    const renderContainerPayment = () => {
        return (
            <div className="flex flex-col lg:flex-row 2xl:mx-auto 2xl:container">
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

    const renderInfoTypePayment = () => {
        return (
            <div className="flex flex-col lg:flex-row gap-6">
                {radioData.map((item, index) => (
                    <PaymentOption
                        key={index}
                        item={item}
                        isChecked={formValue.paymentType === item.value}
                        onChange={() => setFormValue((prev) => ({...prev, paymentType: item.value}))}
                    />
                ))}
            </div>
        );
    };

    const renderInfoPayment = () => {
        const renderInputRow = (inputs: JSX.Element[]) => (
            <div className="flex flex-col lg:flex-row gap-6">
                {inputs}
            </div>
        );

        return (
            <div className="flex-1 flex flex-col pt-4 lg:pt-12 pb-8 lg:pb-16 px-6 lg:pl-36 lg:pr-6">
                <h2 className="text-2lg text-primary">
                    {languages.get("payment.info.title")}
                </h2>
                <form className="space-y-6 mt-4 lg:mt-8" onSubmit={handleSubmit}>
                    {renderInputRow([
                        <TextInput
                            key="name"
                            label={languages.get("payment.info.input.name.label")}
                            placeholder={languages.get("payment.info.input.name.placeholder")}
                            type="text"
                        />,
                        <TextInput
                            key="phone"
                            label={languages.get("payment.info.input.phone.label")}
                            placeholder={languages.get("payment.info.input.phone.placeholder")}
                            type="text"
                        />
                    ])}

                    {renderInputRow([
                        <TextInput
                            key="email"
                            label={languages.get("payment.info.input.email.label")}
                            placeholder={languages.get("payment.info.input.email.placeholder")}
                            type="email"
                        />,
                        <SelectCustom
                            key="city"
                            label={languages.get("payment.info.input.city.label")}
                            placeholder={languages.get("payment.info.input.city.placeholder")}
                            handleChange={handleChangeCity}
                            option={cities}
                            value={formValue.city}
                            disable={false}
                        />
                    ])}

                    {renderInputRow([
                        <SelectCustom
                            key="district"
                            label={languages.get("payment.info.input.district.label")}
                            placeholder={languages.get("payment.info.input.district.placeholder")}
                            handleChange={handleChangeDistrict}
                            option={districts}
                            value={formValue.district}
                            disable={!formValue.city}
                        />,
                        <SelectCustom
                            key="ward"
                            label={languages.get("payment.info.input.ward.label")}
                            placeholder={languages.get("payment.info.input.ward.placeholder")}
                            handleChange={handleChangeWard}
                            option={wards}
                            value={formValue.ward}
                            disable={!formValue.district}
                        />
                    ])}

                    <TextInput
                        label={languages.get("payment.info.input.address.label")}
                        placeholder={languages.get("payment.info.input.address.placeholder")}
                        type="tel"
                        required
                    />

                    <h2 className="text-2lg text-primary">
                        {languages.get("payment.type.title")}
                    </h2>

                    {renderInfoTypePayment()}

                    <CustomButton
                        className="hidden lg:block w-full py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
                        text={languages.get("payment.info.form.button")}
                        onClick={() => setIsShowModalSuccess(true)}
                    />
                </form>
            </div>
        );
    };

    const renderContainerProduct = () => {
        return (
            <div className="flex flex-col mt-0 lg:mt-8">
                {cart.map((item: CartItem, index: number) => (
                    <div key={index}>
                        <div className="flex items-center gap-4 py-5 pr-5">
                            <div className="px-0 lg:p-3">
                                <Image
                                    src={item.skuImage}
                                    alt={item.productName || "product image"}
                                    width={70}
                                    height={70}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3>
                                    {item.productName.length > 45 ? `${item.productName.slice(0, 45)}...` : item.productName}
                                </h3>
                                <span className="text-sm text-doveGray">{"description"}</span>
                                <div className="flex gap-1 items-end">
                                <span className="text-2lg text-caption">
                                    {formatVietnameseCurrency(String(item.originalPrice * item.quantity))}
                                </span>
                                    <span className="text-1.25sm text-doveGray">
                                    x{item.quantity}
                                </span>
                                </div>
                            </div>
                        </div>
                        {index !== cart.length - 1 && <div className="border"></div>}
                    </div>
                ))}
            </div>
        );
    };

    const renderInfoOrder = () => {
        const renderPriceRow = (label: string, value: string, isTotal = false) => (
            <div className="flex justify-between">
            <span className={`text-sm ${isTotal ? 'text-lg lg:text-2lg font-bold text-black' : 'text-karaka'}`}>
                {label}
            </span>
                <span className={`text-lg ${isTotal ? 'lg:text-2lg font-bold' : 'font-semibold'} text-black`}>

                {formatVietnameseCurrency(value)}
            </span>
            </div>
        );

        return (
            <div className="flex-1 py-9 md:py-12 px-6 lg:pl-8 lg:pr-36">
                <h2 className="text-2lg text-primary">
                    {languages.get("payment.order.title")}
                </h2>
                {renderContainerProduct()}
                <div className="flex flex-col gap-4 bg-pampas px-6 py-4 mt-5 lg:mt-0 rounded">
                    {renderPriceRow(languages.get("payment.order.price"), getTotalPrice())}
                    {renderPriceRow(languages.get("payment.order.ship.fee"), String(priceFee))}
                    {renderPriceRow(languages.get("payment.order.total"), String(Number(getTotalPrice()) + priceFee), true)}
                </div>
                <CustomButton
                    className="block lg:hidden w-full mt-6 py-3 font-semibold bg-primary text-white hover:bg-white hover:text-primary"
                    text={languages.get("payment.info.form.button")}
                    // show PaymentSuccessPopup when onClick
                    onClick={() => setIsShowModalSuccess(true)}
                />
            </div>
        );
    }

    return (
        <div className="">
            {renderHero()}
            {renderContainerPayment()}
            <LayoutOpacity isVisible={isShowModalSuccess}>
                <PaymentSuccessPopup
                    isVisible={isShowModalSuccess}
                    onClose={() => setIsShowModalSuccess(false)}
                    title="Payment Successful"
                    description="Your payment has been processed successfully."
                    imageSrc={images.paymentSuccess}
                    orderCode="ORD123456" // Example order code
                />
            </LayoutOpacity>
        </div>
    )
}
