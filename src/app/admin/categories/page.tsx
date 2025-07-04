'use client';

import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEye } from 'react-icons/fa';

const CategoriesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data
  const categories = [
    {
      id: 1,
      name: 'Vòng tay',
      slug: 'vong-tay',
      description: 'Các sản phẩm vòng tay handmade từ gỗ',
      productCount: 15,
      status: 'active',
      image: '/assets/imgs/pictures/category-1.jpg',
    },
    {
      id: 2,
      name: 'Lịch gỗ',
      slug: 'lich-go',
      description: 'Lịch để bàn bằng gỗ cao cấp',
      productCount: 8,
      status: 'active',
      image: '/assets/imgs/pictures/category-2.jpg',
    },
    {
      id: 3,
      name: 'Sổ tay',
      slug: 'so-tay',
      description: 'Sổ tay gỗ với thiết kế độc đáo',
      productCount: 12,
      status: 'active',
      image: '/assets/imgs/pictures/category-3.jpg',
    },
    {
      id: 4,
      name: 'Bút gỗ',
      slug: 'but-go',
      description: 'Bút viết bằng gỗ có thể khắc tên',
      productCount: 25,
      status: 'active',
      image: '/assets/imgs/pictures/category-4.jpg',
    },
  ];

  const filteredCategories = categories.filter(
    category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
        <p className="text-gray-600">
          Danh sách và quản lý tất cả danh mục sản phẩm
        </p>
      </div>

      {/* Header Actions */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative">
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90"
          >
            <FaPlus size={16} />
            Thêm danh mục
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map(category => (
          <div
            key={category.id}
            className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg"
          >
            <div className="aspect-h-9 aspect-w-16">
              <img
                src={category.image}
                alt={category.name}
                className="h-48 w-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    category.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {category.status === 'active'
                    ? 'Hoạt động'
                    : 'Ngừng hoạt động'}
                </span>
              </div>

              <p className="mb-3 text-sm text-gray-600">
                {category.description}
              </p>

              <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                <span>Slug: {category.slug}</span>
                <span>{category.productCount} sản phẩm</span>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex flex-1 items-center justify-center gap-1 rounded bg-blue-50 px-3 py-2 text-sm text-blue-600 hover:bg-blue-100">
                  <FaEye size={14} />
                  Xem
                </button>
                <button className="flex flex-1 items-center justify-center gap-1 rounded bg-green-50 px-3 py-2 text-sm text-green-600 hover:bg-green-100">
                  <FaEdit size={14} />
                  Sửa
                </button>
                <button className="flex flex-1 items-center justify-center gap-1 rounded bg-red-50 px-3 py-2 text-sm text-red-600 hover:bg-red-100">
                  <FaTrash size={14} />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="rounded-lg bg-white shadow">
          <div className="py-12 text-center">
            <div className="text-gray-500">
              <FaSearch size={48} className="mx-auto mb-4 opacity-50" />
              <p>Không tìm thấy danh mục nào</p>
            </div>
          </div>
        </div>
      )}

      {/* Categories Table Alternative View */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách chi tiết
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Số sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredCategories.map(category => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={category.image}
                          alt={category.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {category.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {category.slug}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {category.productCount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        category.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {category.status === 'active'
                        ? 'Hoạt động'
                        : 'Ngừng hoạt động'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Chỉnh sửa"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Xóa"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement;
