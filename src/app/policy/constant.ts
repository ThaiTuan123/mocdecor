import languages from '@/configs/languages';

const emojiSvg =
  '<img src="/assets/imgs/icons/emoji.svg" alt="emoji" style="display: inline; width: 1em; height: 1em; vertical-align: -0.1em;" />';
const phoneSvg =
  '<img src="/assets/imgs/icons/call.svg" alt="phone" style="display: inline; width: 1em; height: 1em; vertical-align: -0.1em;" />';

const collapseData = [
  {
    header: languages.get('policy.collapse.title1'),
    desc: [
      {
        title: 'I. Mua hàng qua Shopee, Tiktok',
        desc: `${emojiSvg} Khi quý khách đặt hàng qua Shopee hoặc Tiktok, các sàn thương mại điện tử sẽ cung cấp đơn vị vận chuyển và số đơn hàng, quý khách chỉ cần gửi shop số đơn hàng và trao đổi các yêu cầu quý khách cần, shop sẽ lên đơn cho quý khách.`,
      },
      {
        title: 'II. Mua hàng qua Fanpage',
        desc:
          `${emojiSvg} Phí giao hàng: Đơn hàng từ 200.000đ được miễn phí giao hàng toàn quốc.\n` +
          '- Đà Nẵng - Quảng Nam: 20.000đ\n' +
          '- Khu vực miền Trung: 20.000đ\n' +
          '- Khu vực miền Nam và miền Bắc: 20.000đ\n\n' +
          `${emojiSvg} Thời gian nhận hàng: 3-5 ngày sau khi đặt hàng (nếu quá trình vận chuyển không gặp sự cố).\n\n` +
          `${emojiSvg} Đối với sản phẩm có thiết kế theo yêu cầu riêng, thời gian nhận hàng cộng thêm 1-2 ngày hoặc sẽ tính từ thời điểm quý khách chốt thiết kế phác thảo.\n\n` +
          `${emojiSvg} Nếu quý khách cần gấp, shop sẽ tính thêm phí phát sinh. Hãy liên hệ trực tiếp qua Fanpage hoặc hotline:\n` +
          '- 037 866 3309\n' +
          '- 0965 920 507\n',
      },
    ],
  },
  {
    header: languages.get('policy.collapse.title2'),
    desc: [
      {
        title: 'I. Mua hàng qua Shopee, Tiktok',
        desc: `${emojiSvg} Quý khách có thể lựa chọn phương thức thanh toán: thanh toán trực tuyến hoặc trả tiền mặt khi nhận hàng.`,
      },
      {
        title: 'II. Mua hàng qua Fanpage',
        desc:
          `${emojiSvg} Đối với sản phẩm thiết kế theo yêu cầu, quý khách vui lòng cọc trước 50% giá trị sản phẩm. Phần còn lại sẽ thanh toán khi nhận hàng cho người vận chuyển. \n\n` +
          `${emojiSvg} Đối với mẫu sản phẩm có sẵn, quý khách không cần thanh toán trước, chỉ cần thanh toán khi nhận hàng. \n \n` +
          `${emojiSvg} Hình thức chuyển khoản: \n\n` +
          'Vietcombank: 1013282511 (Nguyễn Văn Hiếu) \n\n' +
          `${emojiSvg} Shop sẽ gọi xác nhận trong vòng 24h sau khi nhận được tiền chuyển khoản. Hàng sẽ được giao trong vòng 3-5 ngày (tùy địa điểm).`,
      },
    ],
  },
  {
    header: languages.get('policy.collapse.title3'),
    desc: [
      {
        title: 'I. Mua hàng qua sàn thương mại điện tử',
        desc: `${emojiSvg} Sau khi lựa chọn mẫu mã và đặt hàng, shop sẽ nhắn tin xác nhận thông tin và cung cấp số điện thoại để quý khách gửi hình.`,
      },
      {
        title: 'II. Mua hàng qua Fanpage',
        desc:
          `${emojiSvg} Quý khách sẽ nhắn tin trực tiếp cho shop, sau đó shop sẽ tư vấn mẫu và hướng dẫn đặt hàng.\n` +
          `\n${emojiSvg} Liên hệ trực tiếp qua Hotline:` +
          `\n${phoneSvg} 037 866 3309` +
          `\n${phoneSvg} 0965 920 507`,
      },
    ],
  },
  {
    header: languages.get('policy.collapse.title4'),
    desc: [
      {
        title: 'I. Những trường hợp không được bảo hành',
        desc:
          `${emojiSvg} Bề mặt gỗ, nhựa bị vật nhọn cào xước, hư hại bởi tác động vật lý bên ngoài.` +
          `\n${emojiSvg} Sản phẩm bị dính nước, hoặc ẩm mốc (đối với những sản phẩm NSX khuyến cáo tránh xa nước, ẩm mốc).` +
          `\n${emojiSvg} Tự gây nên tình trạng hư hỏng, trầy xước sản phẩm.` +
          `\n${emojiSvg} Sản phẩm đã hết thời hạn bảo hành.`,
      },
      {
        title: 'II. Những trường hợp được bảo hành',
        desc:
          `${emojiSvg} Sản phẩm bị lỗi do nhà sản xuất: cong vênh, hở keo, thiếu phụ kiện, ẩm mốc.` +
          `\n${emojiSvg} Khung (gỗ, nhựa) bị hở hoặc cong vênh.` +
          `\n${emojiSvg} Ảnh in, khắc, bị phai màu, nhòe.` +
          `\n${emojiSvg} Đèn không phát sáng.`,
      },
      {
        title: 'III. Thủ tục bảo hành',
        desc:
          `${emojiSvg} Bước 1: Nhắn tin Facebook, Instagram thông qua hình ảnh để xác định lỗi sản phẩm có thuộc diện bảo hành hay không.` +
          '\nLink inbox: m.me/mocdecor99' +
          `\n${emojiSvg} Bước 2: Nếu được bảo hành, nhân viên sẽ hướng dẫn thủ tục bảo hành:` +
          `\n${emojiSvg} Tại cửa hàng: Xử lý trao đổi nhanh chóng.` +
          `\n${emojiSvg} Online: Gửi hàng và kèm thông tin (lỗi sản phẩm, tên, SĐT). Khi nhận được hàng, shop sẽ gọi xác nhận và báo thời gian trả lại sản phẩm sau bảo hành.` +
          `\n${emojiSvg} Địa chỉ nhận sản phẩm bảo hành:` +
          `\n${emojiSvg} 28 tháng 3, Thị trấn Nam Phước, huyện Duy Xuyên, tỉnh Quảng Nam` +
          `\n${emojiSvg} Bước 3: Sau khi bảo hành xong, shop sẽ liên hệ để quý khách nhận sản phẩm hoặc ship tận nơi.`,
      },
      {
        title: 'IV. Chi phí bảo hành',
        desc:
          `${emojiSvg} Nếu sản phẩm trong thời hạn bảo hành, MOC DECOR chịu hoàn toàn chi phí phát sinh.` +
          `\n${emojiSvg} Nếu sản phẩm đã hết hạn bảo hành, MOC DECOR vẫn hỗ trợ sửa chữa miễn phí, quý khách chỉ cần thanh toán phí vận chuyển (nếu có).`,
      },
    ],
  },
];

export { collapseData };
