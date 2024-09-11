import images from "@/configs/images"

const subNavData = [
  {
    title: "KHUNG ẢNH",
    menu: [
      {
        title: "Khung dẹp",
        href: "frame/flat-frame",
      },
      {
        title: "Khung nổi",
        href: "frame/floating-frame",
      },
      {
        title: "Khung 3D",
        href: "frame/3d-frame",
      },
      {
        title: "Khung nhựa",
        href: "frame/plastic-frame",
      },
      {
        title: "Khung gỗ",
        href: "frame/wooden-frame",
      },
      {
        title: "Khung mica",
        href: "frame/mica-frame",
      },
      {
        title: "Khung trong suốt",
        href: "frame/transparent-frame",
      },
    ],
  },
  {
    title: "ALBUM ẢNH",
    menu: [
      {
        title: "Album",
        href: "album",
      },
      {
        title: "Album",
        href: "album",
      },
      {
        title: "Album",
        href: "album",
      },
    ],
  },
  {
    title: "ẢNH IN",
    menu: [
      {
        title: "Ảnh in 6x9",
        href: "print/print-6x9",
      },
      {
        title: "Ảnh in 9x12",
        href: "print/print-9x12",
      },
      {
        title: "Photostrip",
        href: "print/photo-strip",
      },
      {
        title: "Photoboth",
        href: "print/photo-both",
      },
      {
        title: "Ảnh Instagram",
        href: "print/instagram-photo",
      },
    ],
  },
  {
    title: "SẢN PHẨM KHÁC",
    menu: [
      {
        title: "Sổ tay",
        href: "other/notebook",
      },
      {
        title: "Lịch gỗ",
        href: "other/wooden-calendar",
      },
      {
        title: "Bút gỗ",
        href: "other/wooden-pen",
      },
      {
        title: "Lịch gỗ",
        href: "other/wooden-calendar",
      },
    ],
  },
]

const menuLinks = [
  { href: "/", labelKey: "about" },
  { href: "#", labelKey: "products" },
  { href: "/contact", labelKey: "contact" },
  { href: "/policy", labelKey: "policy" },
  { href: "/gallery", labelKey: "gallery" },
]

const icons = [{ src: images.icons.cart, alt: "Shopping Cart", value: "cart" }]

export { subNavData, menuLinks, icons }
