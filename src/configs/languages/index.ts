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
            'connectWithMoc': 'Kết nối với Mộc'
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
