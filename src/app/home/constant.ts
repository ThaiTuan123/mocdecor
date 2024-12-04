// home/categoryData.js

import images from "@/configs/images";
import {CustomerCardData} from "@/types/customerCardData";
import languages from "@/configs/languages";

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
        alt: languages.get('home.title.background.frame'), // Use localization for alt text if needed
        title: languages.get('home.title.background.frame'),
        onClick: handleClickPictureFrame
    },
    {
        id: 'album',
        src: images.homeCategory2,
        alt: languages.get('home.title.background.album'), // Use localization for alt text if needed
        title: languages.get('home.title.background.album'),
        onClick: handleClickAlbum
    },
    {
        id: 'print',
        src: images.homeCategory3,
        alt: languages.get('home.title.background.print'), // Use localization for alt text if needed
        title: languages.get('home.title.background.print'),
        onClick: handleClickPrint
    }
];

export default categories;

// Social Links
export const socialLinks = [
    {
        src: images.icons.homeTiktok,
        alt: "Mộc Decor",
        link: "https://www.tiktok.com/@_mocdecor99_?lang=vi-VN",
    },
    {
        src: images.icons.homeInstagram,
        alt: "Mộc Decor",
        link: "https://www.instagram.com/mocdecor99/",
    },
];


export const cardServiceData = [
    {
        icon: images.icons.delivery,
        title: languages.get('home.delivery'),
        description: languages.get('home.delivery.description'),
    },
    {
        icon: images.icons.quality,
        title: languages.get('home.quality'),
        description: languages.get('home.quality.description'),
    },
    {
        icon: images.icons.complete,
        title: languages.get('home.complete'),
        description: languages.get('home.complete.description'),
    },
    {
        icon: images.icons.consultant,
        title: languages.get('home.consultant'),
        description: languages.get('home.consultant.description'),
    },
];


export const customerData: CustomerCardData[] = [
    {
        imageCustomerUrl: images.customer1,
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: images.customer2,
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: images.customer3,
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: images.customer1,
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: images.customer2,
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: images.customer3,
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: images.customer1,
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: images.customer2,
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },
    {
        imageCustomerUrl: images.customer3,
        textDescription: "Ảnh in xinh lắm luôn í, vừa sắc nét vừa có giá thành rất sinh viên luôn. Highly recommend nhà Mộc nha!",
        nameCustomer: "BÙI LÊ THÙY VY",
    },

];

export const clientData = [
    {src: images.client1, alt: 'Client 1'},
    {src: images.client2, alt: 'Client 2'},
    {src: images.client3, alt: 'Client 3'},
    {src: images.client4, alt: 'Client 4'},
    {src: images.client5, alt: 'Client 5'},
    {src: images.client6, alt: 'Client 6'},
    {src: images.client7, alt: 'Client 7'},
    {src: images.client8, alt: 'Client 8'},
    {src: images.client9, alt: 'Client 9'},
    {src: images.client10, alt: 'Client 10'},
    {src: images.client11, alt: 'Client 11'},
    {src: images.client12, alt: 'Client 12'},
    {src: images.client13, alt: 'Client 13'},
    {src: images.client14, alt: 'Client 14'},
    {src: images.client15, alt: 'Client 15'},
    {src: images.client1, alt: 'Client 1'},
    {src: images.client2, alt: 'Client 2'},
    {src: images.client3, alt: 'Client 3'},
    {src: images.client4, alt: 'Client 4'},
    {src: images.client5, alt: 'Client 5'},
    {src: images.client6, alt: 'Client 6'},
    {src: images.client7, alt: 'Client 7'},
    {src: images.client8, alt: 'Client 8'},
    {src: images.client9, alt: 'Client 9'},
    {src: images.client10, alt: 'Client 10'},
    {src: images.client11, alt: 'Client 11'},
    {src: images.client12, alt: 'Client 12'},
    {src: images.client13, alt: 'Client 13'},
    {src: images.client14, alt: 'Client 14'},
    {src: images.client15, alt: 'Client 15'},
    {src: images.client1, alt: 'Client 1'},
    {src: images.client2, alt: 'Client 2'},
    {src: images.client3, alt: 'Client 3'},
    {src: images.client4, alt: 'Client 4'},
    {src: images.client5, alt: 'Client 5'},
    {src: images.client6, alt: 'Client 6'},
    {src: images.client7, alt: 'Client 7'},
    {src: images.client8, alt: 'Client 8'},
    {src: images.client9, alt: 'Client 9'},
    {src: images.client10, alt: 'Client 10'},
    {src: images.client11, alt: 'Client 11'},
    {src: images.client12, alt: 'Client 12'},
    {src: images.client13, alt: 'Client 13'},
    {src: images.client14, alt: 'Client 14'},
    {src: images.client15, alt: 'Client 15'},
];