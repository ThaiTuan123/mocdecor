'use client';

import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEye } from 'react-icons/fa';

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const products = [
    {
      id: 1,
      name: 'Vòng tay gỗ cao cấp',
      category: 'Vòng tay',
      price: '250,000',
      stock: 15,
      status: 'active',
      image: '/assets/imgs/pictures/product-1.jpg',
    },
    {
      id: 2,
      name: 'Lịch gỗ để bàn',
      category: 'Lịch gỗ',
      price: '180,000',
      stock: 8,
      status: 'active',
      image: '/assets/imgs/pictures/product-2.jpg',
    },
    {
      id: 3,
      name: 'Sổ tay gỗ handmade',
      category: 'Sổ tay',
      price: '320,000',
      stock: 0,
      status: 'inactive',
      image: '/assets/imgs/pictures/product-3.jpg',
    },
    {
      id: 4,
      name: 'Bút gỗ khắc tên',
      category: 'Bút gỗ',
      price: '150,000',
      stock: 25,
      status: 'active',
      image: '/assets/imgs/pictures/product-4.jpg',
    },
  ];

  const categories = ['all', 'Vòng tay', 'Lịch gỗ', 'Sổ tay', 'Bút gỗ'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <p className="text-gray-600">Danh sách và quản lý tất cả sản phẩm</p>
      </div>

      {/* Header Actions */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <FaSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90">
            <FaPlus size={16} />
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Kho
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
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: #{product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {product.price}đ
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    <span
                      className={`${product.stock === 0 ? 'text-red-600' : 'text-gray-900'}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status === 'active' ? 'Hoạt động' : 'Ngừng bán'}
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

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-gray-500">
              <FaSearch size={48} className="mx-auto mb-4 opacity-50" />
              <p>Không tìm thấy sản phẩm nào</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between rounded-lg bg-white px-6 py-3 shadow">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến{' '}
          <span className="font-medium">{filteredProducts.length}</span> trong
          tổng số <span className="font-medium">{products.length}</span> sản
          phẩm
        </div>
        <div className="flex gap-2">
          <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
            Trước
          </button>
          <button className="rounded bg-primary px-3 py-1 text-sm text-white">
            1
          </button>
          <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;
