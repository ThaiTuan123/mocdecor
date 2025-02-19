'use client';

import TextInput from '@/components/inputs/TextInput';
import CustomButton from '@/components/button/CustomButton';
import languages from '@/configs/languages';
import SelectCustom from '@/components/select/Select';
import React, { useEffect, useState } from 'react';
import {
  fetchCities,
  fetchDistricts,
  fetchWards,
} from '@/services/fetchCountries';
import Image from 'next/image';
import images from '@/configs/images';
import { formatVietnameseCurrency } from '@/utils';
import { LayoutOpacity } from '@/components';
import { redirect } from 'next/navigation';

// Import Recoil and cartState atom
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '@/recoil/atoms/cartAtom';
import PaymentSuccessPopup from '@/components/popup/PaymentSuccessPopup';
import usePopupSuccess from '@/recoil/hooks/usePopupSuccess';
import { CartItem } from '@/types/cartType';
import { submitPayment } from '@/services/api';
import { getOrCreateBrowserId } from '@/utils/browserId';

interface formType {
  city: string | null;
  district: string | null;
  ward: string | null;
  address: string;
  name: string;
  phone: string;
  note: string;
  paymentType: number;
}

export default function Payment() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [formValue, setFormValue] = useState<formType>({
    city: null,
    district: null,
    ward: null,
    address: '',
    name: '',
    phone: '',
    note: '',
    paymentType: 1,
  });
  const [visibleCity, setVisibleCity] = useState(false);
  const [visibleDistrict, setVisibleDistrict] = useState(false);
  const [visibleWard, setVisibleWard] = useState(false);
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const priceFee = 30000;
  const [browserId, setBrowserId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState('');
  const [formError, setFormError] = useState({
    city: '',
    district: '',
    ward: '',
    address: '',
    name: '',
    phone: '',
  });
  const [cartGlobal, setCartGlobal] = useRecoilState(cartState);

  const cart = useRecoilValue(cartState); // <--- Changed here

  useEffect(() => {
    getDataCities();
    const id = getOrCreateBrowserId();
    setBrowserId(id);
  }, []);

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    const body = {
      paymentMethod: formValue.paymentType,
      recipientAddress: {
        address: formValue.address,
        city: formValue.city,
        district: formValue.district,
        ward: formValue.ward,
        name: formValue.name,
        phoneNumber: formValue.phone,
        note: formValue.note,
      },
    };
    if (browserId) {
      submitPayment(browserId, body).then(data => {
        setOrderId(data.orderId);
      });
    }
  };

  useEffect(() => {
    if (orderId) {
      setIsShowModalSuccess(true);
    }
  }, [orderId]);

  // Use the custom hook
  const timeRemaining = usePopupSuccess(isShowModalSuccess, () => {
    setIsShowModalSuccess(false);
  });

  useEffect(() => {
    if (timeRemaining === 0 && !isShowModalSuccess) {
      setCartGlobal([]);
      redirect(`/gallery/${orderId}`);
    }
  }, [timeRemaining, isShowModalSuccess]);

  const getDataCities = async () => {
    const resCountries = await fetchCities();
    if (resCountries) {
      setCities(resCountries);
    }
  };

  const getTotalPrice = () => {
    const price = cart.reduce(
      (result, item) => result + Number(item.retail_price) * item.quantity,
      0
    );
    return String(price);
  };

  const renderHero = () => {
    const renderHeroText = () => (
      <div className="flex flex-row gap-1">
        <span className="text-black-50">
          {languages.get('payment.hero.intro.text')}
        </span>
        <span>/</span>
        <span>{languages.get('payment.hero.payment.text')}</span>
      </div>
    );

    const renderHeroHeading = () => (
      <h1 className="text-center text-2xl font-bold uppercase md:text-6lg">
        {languages.get('payment.title')}
      </h1>
    );

    const renderHeroDescription = () => (
      <span className="font-playfairRegular text-center text-sm md:text-2lg">
        {languages.get('payment.desc')}
      </span>
    );

    return (
      <div className="flex min-h-44 justify-center bg-hero-payment bg-cover bg-no-repeat py-8 text-white md:min-h-80 md:py-16">
        <div className="flex w-full flex-col items-center gap-2 px-10 md:w-1/2 md:px-0">
          {renderHeroText()}
          {renderHeroHeading()}
          {renderHeroDescription()}
        </div>
      </div>
    );
  };

  const renderContainerPayment = () => {
    return (
      <div className="flex flex-col 2xl:container lg:flex-row 2xl:mx-auto">
        {renderInfoPayment()}
        <div className="border"></div>
        {renderInfoOrder()}
      </div>
    );
  };

  const handleChangeCity = async (value: string) => {
    setFormValue(prev => ({
      ...prev,
      city: value,
      district: null,
      ward: null,
    }));
    const resDistricts = await fetchDistricts(value);
    setDistricts(resDistricts);
  };

  const handleChangeDistrict = async (value: string) => {
    setFormValue(prev => ({
      ...prev,
      district: value,
      ward: null,
    }));
    const resWards = await fetchWards(value);
    setWards(resWards);
  };

  const handleChangeWard = (value: string) => {
    setFormValue(prev => ({
      ...prev,
      ward: value,
    }));
  };

  // const renderInfoTypePayment = () => {
  //   return (
  //     <div className="flex flex-col gap-6 lg:flex-row">
  //       {radioData.map((item, index) => (
  //         <PaymentOption
  //           key={index}
  //           item={item}
  //           isChecked={formValue.paymentType === item.value}
  //           onChange={() =>
  //             setFormValue(prev => ({ ...prev, paymentType: item.value }))
  //           }
  //         />
  //       ))}
  //     </div>
  //   );
  // };

  const validateForm = () => {
    const errors = { ...formError };

    if (!formValue.city) {
      errors.city = 'Chọn thành phố là bắt buộc';
    } else {
      errors.city = '';
    }

    if (!formValue.district) {
      errors.district = 'Chọn quận/huyện là bắt buộc';
    } else {
      errors.district = '';
    }

    if (!formValue.ward) {
      errors.ward = 'Chọn phường/xã là bắt buộc';
    } else {
      errors.ward = '';
    }

    if (!formValue.address) {
      errors.address = 'Địa chỉ là bắt buộc';
    } else {
      errors.address = '';
    }

    if (!formValue.name) {
      errors.name = 'Tên là bắt buộc';
    } else {
      errors.name = '';
    }

    if (!formValue.phone) {
      errors.phone = 'Số điện thoại là bắt buộc';
    } else {
      errors.phone = '';
    }

    setFormError(errors);
    return !Object.values(errors).some(error => error);
  };

  const renderInfoPayment = () => {
    const renderInputRow = (inputs: JSX.Element[]) => (
      <div className="flex flex-col gap-6 lg:flex-row">{inputs}</div>
    );

    return (
      <div className="flex flex-1 flex-col px-6 pb-8 pt-4 lg:pb-16 lg:pl-36 lg:pr-6 lg:pt-12">
        <p className="text-2lg font-semibold text-primary">
          {languages.get('payment.info.title')}
        </p>
        <form className="mt-4 space-y-6 lg:mt-8">
          {renderInputRow([
            <TextInput
              key="name"
              label={languages.get('payment.info.input.name.label')}
              placeholder={languages.get('payment.info.input.name.placeholder')}
              type="text"
              value={formValue.name}
              onChange={e =>
                setFormValue(prev => ({ ...prev, name: e.target.value }))
              }
              error={formError.name}
            />,
            <TextInput
              key="phone"
              label={languages.get('payment.info.input.phone.label')}
              placeholder={languages.get(
                'payment.info.input.phone.placeholder'
              )}
              type="text"
              value={formValue.phone}
              onChange={e => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Chỉ chấp nhận số
                  setFormValue(prev => ({ ...prev, phone: value }));
                }
              }}
              error={formError.phone}
            />,
          ])}

          {renderInputRow([
            // <TextInput
            //   key="email"
            //   label={languages.get('payment.info.input.email.label')}
            //   placeholder={languages.get(
            //     'payment.info.input.email.placeholder'
            //   )}
            //   type="email"
            //   onBlur={e => {
            //     const value = e.target.value;
            //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            //       alert('Vui lòng nhập địa chỉ email!!!');
            //     }
            //   }}
            // />,
            <SelectCustom
              key="city"
              label={languages.get('payment.info.input.city.label')}
              placeholder={languages.get('payment.info.input.city.placeholder')}
              handleChange={handleChangeCity}
              option={cities}
              value={formValue.city}
              disable={false}
              visible={visibleCity}
              setVisible={setVisibleCity}
              error={formError.city}
            />,
          ])}

          {renderInputRow([
            <SelectCustom
              key="district"
              label={languages.get('payment.info.input.district.label')}
              placeholder={languages.get(
                'payment.info.input.district.placeholder'
              )}
              handleChange={handleChangeDistrict}
              option={districts}
              value={formValue.district}
              disable={!formValue.city}
              visible={visibleDistrict}
              setVisible={setVisibleDistrict}
              error={formError.district}
            />,
            <SelectCustom
              key="ward"
              label={languages.get('payment.info.input.ward.label')}
              placeholder={languages.get('payment.info.input.ward.placeholder')}
              handleChange={handleChangeWard}
              option={wards}
              value={formValue.ward}
              disable={!formValue.district}
              visible={visibleWard}
              setVisible={setVisibleWard}
              error={formError.ward}
            />,
          ])}

          <TextInput
            label={languages.get('payment.info.input.address.label')}
            placeholder={languages.get(
              'payment.info.input.address.placeholder'
            )}
            required
            value={formValue.address}
            onChange={e =>
              setFormValue(prev => ({ ...prev, address: e.target.value }))
            }
            error={formError.address}
          />

          {/*<p className="text-2lg font-semibold text-primary">*/}
          {/*  {languages.get('payment.type.title')}*/}
          {/*</p>*/}

          {/*{renderInfoTypePayment()}*/}

          {/*TODO thanh toán chuyển qua màn hình update ảnh */}
          <CustomButton
            className="hidden w-full bg-primary py-3 font-semibold text-white hover:bg-white hover:text-primary lg:block"
            text={languages.get('payment.info.form.button')}
            onClick={handleSubmit}
          />
        </form>
      </div>
    );
  };

  const renderContainerProduct = () => {
    return (
      <div className="mt-0 flex flex-col lg:mt-8">
        {cart.map((item: CartItem, index: number) => (
          <div key={index}>
            <div className="flex items-center gap-4 py-5 pr-5">
              <div className="px-0 lg:p-3">
                <Image
                  src={item.image}
                  alt={item.productName || 'product image'}
                  width={70}
                  height={70}
                />
              </div>
              <div className="flex flex-col gap-3">
                <p>
                  {item.productName.length > 45
                    ? `${item.productName.slice(0, 45)}...`
                    : item.productName}
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-2lg text-caption">
                    {formatVietnameseCurrency(
                      String(item.retail_price * item.quantity)
                    )}
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
        <span
          className={`text-sm ${isTotal ? 'text-lg font-bold text-black lg:text-2lg' : 'text-karaka'}`}
        >
          {label}
        </span>
        <span
          className={`text-lg ${isTotal ? 'font-bold lg:text-2lg' : 'font-semibold'} text-black`}
        >
          {formatVietnameseCurrency(value)}
        </span>
      </div>
    );

    return (
      <div className="flex-1 px-6 py-9 md:py-12 lg:pl-8 lg:pr-36">
        <p className="text-2lg font-semibold text-primary">
          {languages.get('payment.order.title')}
        </p>
        {renderContainerProduct()}
        <div className="mt-5 flex flex-col gap-4 rounded bg-pampas px-6 py-4 lg:mt-0">
          {renderPriceRow(
            languages.get('payment.order.price'),
            getTotalPrice()
          )}
          {renderPriceRow(
            languages.get('payment.order.ship.fee'),
            String(priceFee)
          )}
          {renderPriceRow(
            languages.get('payment.order.total'),
            String(Number(getTotalPrice()) + priceFee),
            true
          )}
        </div>
        <CustomButton
          className="mt-6 block w-full bg-primary py-3 font-semibold text-white hover:bg-white hover:text-primary lg:hidden"
          text={languages.get('payment.info.form.button')}
          onClick={handleSubmit}
        />
      </div>
    );
  };

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
          orderCode={orderId}
        />
      </LayoutOpacity>
    </div>
  );
}
