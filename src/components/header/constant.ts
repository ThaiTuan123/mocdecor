import images from "@/configs/images"

const subNavData = [
  {
    title: "KHUNG ẢNH",
    menu: [
      "Khung dẹp",
      "Khung nổi",
      "Khung 3D",
      "Khung nhựa",
      "Khung gỗ",
      "Khung mica",
      "Khung trong suốt",
    ],
  },
  {
    title: "ALBUM ẢNH",
    menu: ["Album", "Album", "Album"],
  },
  {
    title: "ẢNH IN",
    menu: [
      "Ảnh in 6x9",
      "Ảnh in 9x12",
      "Photostrip",
      "Photoboth",
      "Ảnh Instagram",
    ],
  },
  {
    title: "SẢN PHẨM KHÁC",
    menu: ["Sổ tay", "Lịch gỗ", "Bút gỗ", "Lịch gỗ"],
  },
]

const menuLinks = [
  { href: "/", labelKey: "about" },
  { href: "#", labelKey: "products" },
  { href: "/contact", labelKey: "contact" },
  { href: "/policy", labelKey: "policy" },
  { href: "/gallery", labelKey: "gallery" },
]

const icons = [
  { src: images.icons.cart, alt: "Shopping Cart", value: "cart" },
]

export {
    subNavData,
    menuLinks,
    icons
}