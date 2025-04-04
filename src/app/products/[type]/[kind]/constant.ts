export type filterType = {
  title: string;
  value: FilterKeys;
  menu: {
    label: string;
    value: string;
  }[];
};

export type FilterKeys = 'major';

export const filterData = [
  {
    title: 'Khoảng giá',
    value: 'range',
    menu: [
      {
        label: '0 Đ - 100.000 Đ',
        value: 1,
      },
      {
        label: '100.000 Đ - 500.000 Đ',
        value: 2,
      },
      {
        label: 'Trên 500.000 Đ',
        value: 3,
      },
    ],
  },
  {
    title: 'Ngành hàng',
    value: 'major',
    menu: [
      {
        label: 'Khung dẹp',
        value: 'flat-frame',
      },
      {
        label: 'Khung nổi',
        value: 'floating-frame',
      },
      {
        label: 'Khung 3D',
        value: '3d-frame',
      },
      {
        label: 'Khung nhựa',
        value: 'plastic-frame',
      },
      {
        label: 'Khung gỗ',
        value: 'wooden-frame',
      },
      {
        label: 'Khung mica',
        value: 'mica-frame',
      },
      {
        label: 'Khung trong suốt',
        value: 'transparent-frame',
      },
    ],
  },
  {
    title: 'Sắp xếp theo',
    value: 'sort',
    menu: [
      {
        label: 'Bán chạy',
        value: 1,
      },
      {
        label: 'Từ thấp đến cao',
        value: 2,
      },
      {
        label: 'Từ cao đến thấp',
        value: 3,
      },
    ],
  },
];
