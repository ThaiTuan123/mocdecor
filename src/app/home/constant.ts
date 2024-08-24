// home/categoryData.js

import images from "@/configs/images";

export const handleClickPictureFrame = () => {
    console.log('Picture Frame clicked!');
};

export const handleClickAlbum = () => {
    console.log('Album clicked!');
};

export const handleClickPrint = () => {
    console.log('Print clicked!');
};

const categories = [
    {
        id: 'picture-frame',
        src: images.homeCategory1,
        alt: "Khung Ảnh",
        title: "ALBUM ẢNH",
        onClick: handleClickPictureFrame
    },
    {
        id: 'album',
        src: images.homeCategory2,
        alt: "Album Ảnh",
        title: "Khung Ảnh",
        onClick: handleClickAlbum
    },
    {
        id: 'print',
        src: images.homeCategory3,
        alt: "Ảnh In",
        title: "ẢNH IN",
        onClick: handleClickPrint
    }
];

export default categories;


// Social Links
export const socialLinks = [
    {
        src: images.icons.homeTiktok,
        alt: "Mộc Decor",
    },
    {
        src: images.icons.homeInstagram,
        alt: "Mộc Decor",
    },
];


export const cardServiceData = [
    {
        icon: images.icons.delivery,
        title: 'GIAO HÀNG TOÀN QUỐC',
        description: 'Phí ship sẽ được hỗ trợ tùy theo đơn hàng',
    },
    {
        icon: images.icons.quality,
        title: 'CHẤT LƯỢNG ĐẢM BẢO',
        description: 'Chất lượng sản phẩm luôn được đảm bảo',
    },
    {
        icon: images.icons.complete,
        title: 'HOÀN THIỆN CHỈNH CHU',
        description: 'Sản phẩm được hoàn thiện chỉnh chu, tỉ mỉ',
    },
    {
        icon: images.icons.consultant,
        title: 'HỖ TRỢ TƯ VẤN',
        description: 'Hotline: 037 866 3309',
    },
];


export const customerCardData = [
    {
        imageCustomerUrl: 'bg-image-customer-1',
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: 'bg-image-customer-2',
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: 'bg-image-customer-3',
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: 'bg-image-customer-1',
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: 'bg-image-customer-2',
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: 'bg-image-customer-3',
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: 'bg-image-customer-1',
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: 'bg-image-customer-2',
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: 'bg-image-customer-3',
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
];