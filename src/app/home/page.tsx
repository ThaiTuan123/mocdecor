"use client";

import React, {useEffect, useRef, useState} from "react";
import Carousel from "@/components/carousel/Carousel";
import Image from 'next/image';
import categories, {cardServiceData, socialLinks} from "@/app/home/constant";
import images from "@/configs/images";
import {motion} from 'framer-motion';
import ProductCard from "@/components/product/ProductCard";
import {Product} from "@/types/product";
import {fetchProducts} from "@/services/fetchProducts";
import OutlineButton from "@/components/button/OutlineButton";
import BackgroundSection from "@/components/banners/BackgroundSection";
import ProductCardWhite from "@/components/product/ProductCardWhite";
import SolidButton from "@/components/button/SolidButton";
import Tab from "@/components/tab/Tab";
import IconSocialLink from "@/components/icons/IconSocialLink";
import RightArrowButton from "@/components/button/RightArrowButton";
import DiscoverButton from "@/components/button/DiscoverButton";
import ScrollAnimation from "@/components/animations/ScrollAnimation";
import TitleText from "@/components/texts/TitleText";
import MotionImageCard from "@/components/card/MotionImageCar";
import SeparatorAbout from "@/components/shape/SeparatorAbout";
import Heading2 from "@/components/texts/Heading2";
import CustomerCard from "@/components/card/CustomerCard";
import TextContent from "@/components/texts/TextContent";
import Line from "@/components/shape/Lines";
import ServiceCard from "@/components/card/ServiceCard";
import CoopClientCard from "@/components/card/CoopClientCard";
import languages from "@/configs/languages";
import {ARROW_RIGHT, REPEAT_INTERVAL, SCROLL_AMOUNT} from "@/utils/constants";

const CategorySection = () => (
    <section id='category' className="py-8 text-center md:container md:mx-auto">
        <h2 className="text-4xl font-raleway font-normal mb-8 text-brown-500 text-opacity-50">
            {languages.get('home.subTitle.category')}
        </h2>
        <h2 className="text-7xl font-playfairBold font-bold mb-8 uppercase text-brown-500 text-opacity-70">
            {languages.get('home.title.category')}
        </h2>
        <div className="flex flex-col md:flex-row justify-between">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="relative mb-6 md:mb-0 group cursor-pointer"
                    onClick={category.onClick}
                >
                    <Image
                        src={category.src}
                        alt={category.alt}
                        width={400}
                        height={300}
                        className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto rounded-lg"
                    />
                    <div className='absolute flex flex-col justify-center items-center bottom-4 left-0 w-full'>
                        <h3 className="text-3xl font-bold mb-4 text-center text-white uppercase font-playfairBold">
                            {category.title}
                        </h3>
                        <div
                            className="hidden group-hover:flex flex-col bg-white w-14 items-center rounded transition duration-700 ease-in-out">
                            <span className="text-primary text-2xl">{ARROW_RIGHT}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const HeaderSectionAbout = () => (
    <div className="text-left">
        <TitleText
            firstText={languages.get('home.title.firstText.about')}
            secondText={languages.get('home.title.secondText.about')}
            justifyCenter={false}  // Optional, defaults to true
        />
        <Heading2
            align='left'
            marginBottom='mb-6'
            text={languages.get('home.title.header2.about')}
        />
    </div>
);

const TextContentAbout = () => (
    <TextContent
        text={languages.get('home.title.textContent.about')}
        marginBottom={"mb-4"}
    />
);

const SocialLinksAbout = () => (
    <div className="flex items-center mt-4">
        <h4 className="text-1.25lg font-normal font-raleway text-caption mr-5">HIỂU HƠN VỀ MỘC:</h4>
        <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
                <IconSocialLink key={index} src={link.src} alt={link.alt}/>
            ))}
        </div>
    </div>
);

const ImageContentAbout = () => (
    <motion.div
        className="mt-4 rounded-lg cursor-grab"
        whileHover={{
            scale: 1.05,
            rotateX: 15,
            rotateY: -15,
        }}
        transition={{type: 'spring', stiffness: 300, damping: 20}}
    >
        <Image
            src={images.homeAbout2}
            alt="Mộc Decor"
            width={564}
            height={312}
            className="rounded-lg"
        />
    </motion.div>
);

const AboutSection = () => (
    <section id="about" className="py-8 text-center md:container md:mx-auto flex mb-4">
        <div id="contentLeft" className="w-1/2">
            <Image
                src={images.homeAbout1}
                alt="Mộc Decor"
                width={1024}
                height={768}
                className="w-full max-w-lg mx-auto h-auto rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-3 hover:translate-z-4 cursor-grab"
            />
        </div>

        <div id="contentRight" className="w-1/2 flex flex-col items-start">
            <HeaderSectionAbout/>
            <TextContentAbout/>
            <SeparatorAbout/>
            <SocialLinksAbout/>
            <ImageContentAbout/>
        </div>
    </section>
);

const TabPrint = () => {

    const tabsPrint = [
        {label: 'Ảnh in 6x9', value: '6x9'},
        {label: 'Ảnh in 9x12', value: '9x12'},
        {label: 'Ảnh Photostrip', value: 'Photostrip'},
        {label: 'Ảnh in Instagram', value: 'Instagram'},
    ];

    const renderPrintContent = (activeTab: string) => {
        switch (activeTab) {
            case '6x9':
                return <div><ProductGrid/></div>;
            case '9x12':
                return <div>Content for Ảnh in 9x12</div>;
            case 'Photostrip':
                return <div>Content for Ảnh Photostrip</div>;
            case 'Instagram':
                return <div>Content for Ảnh in Instagram</div>;
            default:
                return null;
        }
    };

    return (
        <Tab
            tabs={tabsPrint}
            defaultActiveTab="6x9"
            renderContent={renderPrintContent}
        />
    );
};

const TabFrame = () => {
    const tabsFrame = [
        {label: 'Khung dẹp', value: 'Khung dẹp'},
        {label: 'Khung nổi', value: 'Khung nổi'},
        {label: 'Khung 3D', value: 'Khung 3D'},
        {label: 'Khung nhựa', value: 'Khung nhựa'},
        {label: 'Khung gỗ', value: 'Khung gỗ'},
        {label: 'Khung mica', value: 'Khung mica'},
        {label: 'Khung trong suốt', value: 'Khung trong suốt'},
    ];

    const renderFrameContent = (activeTab: string) => {
        switch (activeTab) {
            case 'Khung dẹp':
                return <div><ProductGridFrame/></div>;
            case 'Khung nổi':
                return <div>Content for Khung nổi</div>;
            case 'Khung 3D':
                return <div>Content for Khung 3D</div>;
            case 'Khung nhựa':
                return <div>Content for Khung nhựa</div>;
            case 'Khung gỗ':
                return <div>Content for Khung gỗ</div>;
            case 'Khung mica':
                return <div>Content for Khung mica</div>;
            case 'Khung trong suốt':
                return <div>Content for Khung trong suốt</div>;
            default:
                return null;
        }
    };

    return (
        <Tab
            tabs={tabsFrame}
            defaultActiveTab="Khung dẹp"
            renderContent={renderFrameContent}
            background={"bg-image-gradient-frame bg-cover"}
            textColor="text-white"
            borderActive='border-white'
            hoverButton='hover:text-white'
            hoverBorder='hover:border-white'
            textColorInactive='text-black-50'
        />
    );
};

const ProductGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const productsData = await fetchProducts();
            setProducts(productsData);
        };
        loadProducts();
    }, []);

    return (
        <div>
            <div className="grid grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}

            </div>
            <div className="flex justify-center my-10">
                <OutlineButton text={languages.get('button.viewMore')} href="/your-target-page"/>
            </div>
        </div>
    );
};

const ProductGridFrame: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const loadProducts = async () => {
            const productsData = await fetchProducts();
            setProducts(productsData);
        };
        loadProducts();
    }, []);
    return (
        <div>
            <div className="grid grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCardWhite key={product.id} {...product} />
                ))}

            </div>
            <div className="flex justify-center my-10">
                <SolidButton text={languages.get('button.viewMore')} href="/your-target-page"/>
            </div>
        </div>
    );
};

const sectionsData = [
    {
        title: "ẢNH IN",
        subTitle: `Hãy để những khoảnh khắc, những kỉ niệm được sắp<br/>xếp theo phong cách của riêng bạn.`,
        backgroundClass: "bg-image-home-background-print",
        tabComponent: <TabPrint/>
    },
    {
        title: "KHUNG ẢNH",
        subTitle: `Một khung ảnh được thiết kế riêng theo yêu cầu, liệu có đủ<br/>thể hiện tình cảm của bạn? Hãy cùng Mộc khám phá nhé.`,
        backgroundClass: "bg-image-home-background-frame",
        tabComponent: <TabFrame/>
    },
    {
        title: "ALBUM ẢNH",
        subTitle: `Hãy để những khoảnh khắc, những kỉ niệm được sắp<br/>xếp theo phong cách của riêng bạn.`,
        backgroundClass: "bg-image-home-background-album",
        tabComponent: <TabPrint/>
    }
];


const OtherProductsSection: React.FC = () => {
    const handleClick = () => {
        alert('Discover button clicked!');
    };

    return (
        <section className="bg-white pb-8 px-4">
            <div className="container mx-auto flex flex-col items-center">
                <div className="flex items-center mb-2">
                    <TitleText
                        firstText="Những"
                        secondText="Dòng sản phẩm khác"
                    />
                </div>
                <Heading2 text='Bạn có thể sẽ thích của nhà Mộc'/>
                <div className="grid gap-6 max-w-7xl w-full ">
                    <div className="flex col-span-2 h-80">
                        {/* Sổ tay */}
                        <div
                            className="bg-image-notebook-home bg-cover text-white px-10 py-8 rounded-lg relative flex flex-col justify-center items-start w-7/12">
                            <h3 className="text-6lg font-bold font-playfairBold uppercase">Sổ <br/> Tay</h3>
                            <DiscoverButton onClick={handleClick}>
                                Khám Phá Ngay
                            </DiscoverButton>
                        </div>

                        {/* Vòng Tay */}
                        <div
                            className="bg-image-bracelet-home bg-cover text-white p-4 rounded-lg flex justify-between items-end w-5/12 ml-4 h-80">
                            <h3 className="text-4xl font-bold uppercase font-playfairBold ">Vòng Tay</h3>
                            <RightArrowButton onClick={handleClick}/>
                        </div>
                    </div>
                    <div className="flex col-span-2 h-80">
                        {/* Lịch gỗ */}
                        <div
                            className="bg-image-calendar-home bg-cover text-white px-10 py-8 rounded-lg relative flex flex-col justify-end w-5/12">
                            <div className="flex items-center justify-between w-full">
                                <h3 className="text-4xl font-bold uppercase font-playfairBold">Lịch gỗ</h3>
                                <RightArrowButton onClick={handleClick}/>
                            </div>
                        </div>
                        {/* Vòng Tay */}
                        <div
                            className="bg-image-wooden-pen-home bg-cover text-white p-4 rounded-lg flex flex-col justify-center items-start w-7/12 ml-4 h-80">
                            <h3 className="text-6lg font-bold font-playfairBold uppercase">Bút <br/> Gỗ</h3>
                            <DiscoverButton onClick={handleClick}>
                                Khám Phá Ngay
                            </DiscoverButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StorySection: React.FC = () => {

    const handleClick = () => {
        alert('Discover button clicked!');
    };

    return (
        <section className='h-946'>
            <div className='relative'>
                <div className='bg-image-product-story md:h-80 relative z-10'>
                    <div className='w-full flex flex-col pt-16'>
                        <TitleText
                            firstText="Câu chuyện "
                            secondText="Nhà Mộc"
                        />
                        <Heading2 text='Hành trình lưu giữ những <br/> kỉ niệm tại Mộc Decor'/>
                    </div>
                </div>

                <div
                    id='content'
                    className='absolute max-w-6xl mx-auto inset-0 z-20 mt-52'
                >
                    <div className='flex h-[600] '>
                        {/* Main Image Section */}
                        <div
                            className="w-3/5 bg-image-story-home-1 bg-cover flex items-end justify-between px-8 py-8 rounded">
                            <h3 className="text-2xl  font-bold font-playfairBold uppercase text-white text-left">
                                CÁCH CHÚNG TÔI TẠO <br/> NÊN NHỮNG BỘ KHUNG <br/> ẢNH THẬT ĐẸP ?
                            </h3>
                            <SolidButton text="Đọc thêm" href="/your-target-page"/>
                        </div>
                        <div className='w-2/5 flex flex-col gap-4 pl-4'>
                            <MotionImageCard
                                src={images.homeStory2}
                                alt="Other Image 1"
                                text="Lễ tốt nghiệp sắp đến rồi, gửi ngay món quà này đến đứa bạn thân thôi"
                            />
                            <MotionImageCard
                                src={images.homeStory3}
                                alt="Other Image 2"
                                text="Bạn đã có kế hoạch gì cho việc kỉ niệm những ngày đặc biệt chưa?"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const GiftSection: React.FC = () => {
    const handleClick = () => {
        alert('Discover button clicked!');
    };
    return (
        <section
            className={`bg-image-gift-home bg-cover bg-center max-h-96 h-96 flex`}>
            <div className='max-w-6xl ml-20'>
                <div className='flex flex-row items-center'>
                    <Image src={images.logoMocHome} alt="Logo" width={290} height={290}/>
                    <div className="h-24 w-1 bg-white mx-4"></div>
                    <div id='title'>
                        <div className="flex-n1 flex flex-col items-start">
                            <h2 className="text-4xl font-extrabold text-white mb-4 font-raleway">TẶNG BẠN</h2>
                            <h2 className="text-4xl font-extrabold text-white font-raleway">QUÀ KHỦNG</h2>
                        </div>
                    </div>
                </div>
                <DiscoverButton className='ml-8' onClick={handleClick}>
                    Khám Phá Ngay
                </DiscoverButton>
            </div>
        </section>
    );
}

const FeedbackScrollableSection: React.FC<{ scrollInterval: number }> = ({scrollInterval = REPEAT_INTERVAL}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const maxScrollLeft = container.scrollWidth - container.clientWidth;

                container.scrollBy({
                    left: container.scrollLeft + 300 > maxScrollLeft ? -maxScrollLeft : 300,
                    behavior: 'smooth',
                });
            }
        }, scrollInterval); // Dynamic interval based on prop

        return () => clearInterval(intervalId);
    }, [scrollInterval]);

    return (
        <div className="overflow-x-auto scroll-smooth pb-10" ref={scrollRef}>
            <div className="inline-flex space-x-4">
                <CustomerCard
                    imageCustomerUrl='bg-image-customer-1'
                    textDescription="Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!"
                    nameCustomer="BÙI LÊ THÙY VY"
                />
                <CustomerCard
                    imageCustomerUrl='bg-image-customer-2'
                    textDescription="Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!"
                    nameCustomer="BÙI LÊ THÙY VY"
                />
                <CustomerCard
                    imageCustomerUrl='bg-image-customer-3'
                    textDescription="Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!"
                    nameCustomer="BÙI LÊ THÙY VY"
                />
                <CustomerCard
                    imageCustomerUrl='bg-image-customer-1'
                    textDescription="Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!"
                    nameCustomer="BÙI LÊ THÙY VY"
                />
                <CustomerCard
                    imageCustomerUrl='bg-image-customer-2'
                    textDescription="Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!"
                    nameCustomer="BÙI LÊ THÙY VY"
                />
                <CustomerCard
                    imageCustomerUrl='bg-image-customer-3'
                    textDescription="Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!"
                    nameCustomer="BÙI LÊ THÙY VY"
                />
                <CustomerCard
                    imageCustomerUrl='bg-image-customer-1'
                    textDescription="Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!"
                    nameCustomer="BÙI LÊ THÙY VY"
                />
                <CustomerCard
                    imageCustomerUrl='bg-image-customer-2'
                    textDescription="Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!"
                    nameCustomer="BÙI LÊ THÙY VY"
                />
                <CustomerCard
                    imageCustomerUrl='bg-image-customer-3'
                    textDescription="Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!"
                    nameCustomer="BÙI LÊ THÙY VY"
                />
                {/* Repeat or add more cards as needed */}
            </div>
        </div>
    );
};

const FeedbackSection: React.FC = () => {
    return (
        <section className='pb-20'>
            <div id='content' className='flex flex-col pt-28'>
                <div className='flex flex-col items-center pb-16'>
                    <TitleText
                        firstText="Cảm nhận "
                        secondText="Nhà Mộc"
                    />
                    <Heading2 text="Khách hàng nghĩ gì về <br/> Mộc Decor?"/>
                </div>

                <div className='flex flex-col'>
                    <FeedbackScrollableSection scrollInterval={3000}/>
                </div>
            </div>
        </section>
    );
}

const ServiceSection: React.FC = () => {
    return (
        <section className='bg-image-service-home bg-cover h-full bg-no-repeat max-w-full'>
            {/* Main content */}
            <div className='pt-28 px-36 pb-20 flex flex-col'>
                <div className='gap-y-12 flex flex-col'>
                    {/* Content for Hiếu */}
                    <div className='flex flex-row gap-16 justify-center items-center'>
                        <div className='flex-col flex justify-start items-start w-3/5'>
                            <TitleText
                                firstText="Cảm nhận "
                                secondText="Nhà Mộc"
                                textColor='text-white'
                                bgColor='bg-white'
                            />
                            <Heading2
                                className='mt-8'
                                text="Nhà Mộc cam kết mang đến trải <br/> nghiệm tốt nhất cho khách hàng"
                                textColor={"text-white"}
                                align={"left"}
                            />
                            <TextContent
                                textColor={'text-white'}
                                text={'Mộc Decor mang đến những dịch vụ khung ảnh thủ công đầy cảm hứng và tinh tế. Chúng tôi thiết kế khung ảnh theo yêu cầu, tạo ra những tác phẩm độc đáo phản ánh phong cách riêng của từng khách hàng. <br/> Ngoài ra, Mộc Decor còn tư vấn trang trí, giúp bạn tạo nên không gian sống ấm cúng và nghệ thuật.'}
                            />
                            <h4 className='text-white font-semibold font-raleway'> HIẾU NGUYỄN - Mộc Founder </h4>
                        </div>
                        <div className='w-2/5 items-center justify-center flex'>
                            <Image
                                src={images.hieuServiceHome}
                                alt='HIẾU NGUYỄN - Mộc Founder'
                                width={463}
                                height={833}
                                className="transform transition-transform duration-1000 ease-in-out hover:scale-110 overflow-hidden"
                            />
                        </div>
                    </div>
                    <Line height={"h-px"}/>
                    {/* Content for Phú */}
                    <div className='flex flex-row gap-16 justify-center items-start'>
                        <div className='w-2/5 items-center justify-center flex'>
                            <Image
                                src={images.phuServiceHome}
                                alt='PHƯỚC PHÚ - Mộc Founder'
                                width={463}
                                height={833}
                                className="transform transition-transform duration-1000 ease-in-out hover:scale-110 overflow-hidden"
                            />
                        </div>
                        <div className='flex-col flex justify-start items-start w-3/5'>
                            <Heading2
                                text="Nhà Mộc cam kết mang đến trải <br/> nghiệm tốt nhất cho khách hàng"
                                textColor={"text-white"}
                                align={"left"}
                            />
                            <TextContent
                                textColor={'text-white'}
                                text={'Hiểu được mong muốn lưu giữ kỉ niệm và tình yêu thương vào những món đồ handmade, Mộc Decor luôn cố gắng tỉ mỉ và đặt trọn trái tim của mình vào từng sản phẩm, để khách hàng có thể hài lòng nhất. <br/> “Yêu thương đong đầy, nghĩa tình trao tận tay” luôn là phương châm hoạt động của nhà Mộc.'}
                            />
                            <h4 className='text-white font-semibold font-raleway'> PHƯỚC PHÚ - Mộc Founder </h4>
                        </div>
                    </div>
                </div>
            </div>
            {/* Services offered */}
            <div className='flex flex-row justify-between h-60 opacity-80'>
                {cardServiceData.map((card, index) => (
                    <ServiceCard key={index} icon={card.icon} title={card.title} description={card.description}/>
                ))}
            </div>
        </section>
    );
}

const ScrollableSection: React.FC<{ scrollInterval: number }> = ({scrollInterval = REPEAT_INTERVAL}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const maxScrollLeft = container.scrollWidth - container.clientWidth;

                container.scrollBy({
                    left: container.scrollLeft + SCROLL_AMOUNT > maxScrollLeft ? -maxScrollLeft : SCROLL_AMOUNT,
                    behavior: 'smooth',
                });
            }
        }, scrollInterval); // Dynamic interval based on prop

        return () => clearInterval(intervalId);
    }, [scrollInterval]);

    return (
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth pb-10" ref={scrollRef}>
            <div className="inline-flex space-x-4">
                {/* Add multiple CoopClientCard instances or any other content here */}
                <CoopClientCard/>
                <CoopClientCard/>
                <CoopClientCard/>
                <CoopClientCard/>
                <CoopClientCard/>
                <CoopClientCard/>
                <CoopClientCard/>
                <CoopClientCard/>
                <CoopClientCard/>
                <CoopClientCard/>
                <CoopClientCard/>
                <CoopClientCard/>
                {/* Repeat or add more cards as needed */}
            </div>
        </div>
    );
};

const CoopClientsSection: React.FC = () => {
    return (
        <section className="bg-gradient-to-b from-white to-just-right to-60% ">
            <div id='content' className='flex flex-col py-28 gap-y-12'>
                <div className='flex flex-col items-center'>
                    <TitleText
                        firstText="Khách hàng"
                        secondText="Nhà Mộc"
                    />
                    <Heading2 text='Thật hân hạnh khi là nơi đặt trọn yêu <br/> thương của những khách hàng này'/>
                </div>

                <div className='gap-y-8 flex flex-col'>
                    {/* Slider to first */}
                    <ScrollableSection scrollInterval={5000}/>

                    {/* Slider to second */}
                    <ScrollableSection scrollInterval={3000}/>
                </div>
            </div>
        </section>
    );
}

const HomePage = () => (
    <>
        <Carousel/>
        <ScrollAnimation>
            <CategorySection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <AboutSection/>
        </ScrollAnimation>

        {sectionsData.map((section, index) => (
            <ScrollAnimation key={index}>
                <BackgroundSection
                    title={section.title}
                    subTitle={section.subTitle}
                    backgroundClass={section.backgroundClass}
                />
                {section.tabComponent}
            </ScrollAnimation>
        ))}

        <ScrollAnimation>
            <OtherProductsSection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <StorySection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <GiftSection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <FeedbackSection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <ServiceSection/>
        </ScrollAnimation>

        <ScrollAnimation>
            <CoopClientsSection/>
        </ScrollAnimation>
    </>
);

export default HomePage;
