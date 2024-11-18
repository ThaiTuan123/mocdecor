export type filterType = {
  title: string
  value: FilterKeys
  menu: {
    label: string
    value: string
  }[]
}

export type FilterKeys = "range" | "major"

export const filterData = [
  {
    title: "Khoảng giá",
    value: "range",
    menu: [
      {
        label: "0 Đ - 100.000 Đ",
        value: "0-100k",
      },
      {
        label: "100.000 Đ - 500.000 Đ",
        value: "100k-500k",
      },
      {
        label: "500.000 Đ - 1000.000 Đ",
        value: "500k-1m",
      },
    ],
  },
  {
    title: "Ngành hàng",
    value: "major",
    menu: [
      {
        label: "Khung dẹp",
        value: "flat-frame",
      },
      {
        label: "Khung nổi",
        value: "floating-frame",
      },
      {
        label: "Khung 3D",
        value: "3d-frame",
      },
      {
        label: "Khung nhựa",
        value: "plastic-frame",
      },
      {
        label: "Khung gỗ",
        value: "wooden-frame",
      },
      {
        label: "Khung mica",
        value: "mica-frame",
      },
      {
        label: "Khung trong suốt",
        value: "transparent-frame",
      },
    ],
  },
  {
    title: "Sắp xếp theo",
    value: "soft",
    menu: [
      {
        label: "Bán chạy",
        value: "best-seller",
      },
      {
        label: "Từ thấp đến cao",
        value: "low-to-high",
      },
      {
        label: "Từ cao đến thấp",
        value: "high-to-low",
      },
    ],
  },
]
