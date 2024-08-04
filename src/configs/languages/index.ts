class Languages {
    strings: any = {
        vn: {
            'header': 'hello',
            'about': 'Giới thiệu',
            'products': 'Dòng sản phẩm',
            'contact': 'Liên hệ',
            'policy': 'Chính sách',
            'terms': 'Điều khoản',
            'allRightsReserved': 'All right reserved MOC Decor, LLC2024',
            'gallery': 'Tải ảnh',
            'delivery': 'GIAO HÀNG TOÀN QUỐC',
            'quality': 'CHẤT LƯỢNG ĐẢM BẢO',
            'complete': 'HOÀN THIỆN CHỈNH CHU',
            'consultant': 'HỖ TRỢ TƯ VẤN',
            'contactInfo': 'Thông tin liên hệ',
            'address': 'Địa chỉ: 59 Hùng Vương, Thị Trấn Nam Phước, Duy Xuyên, Quảng Nam',
            'phone': 'Điện thoại: 037 866 3309 / 0965 920 507',
            'email': 'Email: mocdecor99@gmail.com',
            'newsletterText': 'Nhận thông tin mới nhất từ Mộc',
            'emailPlaceholder': 'Nhập địa chỉ email',
            'whatMocHas': 'Mộc có gì',
            'flowerFrame': 'Khung hoa',
            'handmadeFrame': 'Khung handmade 3D',
            'connectWithMoc': 'Kết nối với Mộc',
            'title': 'MocDecor',
            'description': 'Đến với Mộc, đến với những món quà độc đáo',

            // 404 page
            '404.error.Title': 'UI!!! Đã có lỗi gì đó...',
            '404.error.Message': 'Trang bạn đang tìm kiếm bị lỗi và hiện không thể truy cập, team Mộc đang cố gắng khắc phục sự cố này. Trong lúc chờ, bạn có thể trở lại trang chủ để khám phá những nội dung thú vị khác từ Mộc nha.',
            '404.button.returnHome': 'Trở về trang chủ',

            // policy page
            "policy.hero.intro.text": "Giới thiệu",
            "policy.hero.policy.text": "Chính sách",
            "policy.title": "chính sách nhà mộc",
            "policy.desc": "Khám phá các chính sách mua hàng, bảo hành và đổi trả của Mộc Decor để yên tâm khi chọn mua sản phẩm khung ảnh thủ công chất lượng",
            "policy.collapse.title1": "HÌNH THỨC VÀ CHÍNH SÁCH VẬN CHUYỂN",
            "policy.collapse.title2": "HÌNH THỨC THANH TOÁN",
            "policy.collapse.title3": "HƯỚNG DẪN MUA HÀNG",
            "policy.collapse.title4": "CHÍNH SÁCH BẢO HÀNH",
            "policy.footer.title": "KHÁM PHÁ GIAN HÀNG NHÀ MỘC",
            "policy.footer.button.text": "KHÁM PHÁ NGAY",
            "policy.footer.or.text": "Hoặc truy cập"
        }
    }

    replaceAll(str: string, find: string, replace: string) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    get(key: string, params: any = {}): string {
        let lang = 'vn'; // Default language set to Vietnamese
        if (this.strings[lang]) {
            let temp = this.strings[lang][key];
            if (temp == null || temp == '') {
                temp = key;
            } else {
                for (const prop in params) {
                    temp = this.replaceAll(temp, `{${prop}}`, params[prop] ? params[prop] : '');
                }
            }
            if (temp == null) {
                temp = '';
            }
            return temp.trim();
        } else {
            return key;
        }
    }
}

export default new Languages();
