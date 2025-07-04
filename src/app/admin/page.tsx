'use client';

import React from 'react';
import {
  FaBox,
  FaList,
  FaCog,
  FaChartBar,
  FaUsers,
  FaShoppingCart,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Tổng sản phẩm',
      value: '248',
      icon: FaBox,
      color: 'bg-blue-500',
    },
    {
      title: 'Danh mục',
      value: '12',
      icon: FaList,
      color: 'bg-green-500',
    },
    {
      title: 'Đơn hàng hôm nay',
      value: '45',
      icon: FaShoppingCart,
      color: 'bg-yellow-500',
    },
    {
      title: 'Khách hàng',
      value: '1,234',
      icon: FaUsers,
      color: 'bg-purple-500',
    },
  ];

  const recentOrders = [
    {
      id: '#001',
      customer: 'Nguyễn Văn A',
      total: '2,500,000',
      status: 'Đang xử lý',
    },
    {
      id: '#002',
      customer: 'Trần Thị B',
      total: '1,800,000',
      status: 'Hoàn thành',
    },
    {
      id: '#003',
      customer: 'Lê Văn C',
      total: '3,200,000',
      status: 'Đang giao',
    },
    {
      id: '#004',
      customer: 'Phạm Thị D',
      total: '950,000',
      status: 'Hoàn thành',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Tổng quan hệ thống quản trị</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Đơn hàng gần đây
            </h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500">
                    <th className="pb-3">Mã đơn</th>
                    <th className="pb-3">Khách hàng</th>
                    <th className="pb-3">Tổng tiền</th>
                    <th className="pb-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.total}đ</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            order.status === 'Hoàn thành'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'Đang giao'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Thao tác nhanh
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <button className="w-full rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-primary hover:bg-primary hover:bg-opacity-5">
                <div className="flex items-center">
                  <FaBox className="mr-3 text-primary" size={20} />
                  <span className="font-medium">Thêm sản phẩm mới</span>
                </div>
              </button>

              <button className="w-full rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-primary hover:bg-primary hover:bg-opacity-5">
                <div className="flex items-center">
                  <FaList className="mr-3 text-primary" size={20} />
                  <span className="font-medium">Quản lý danh mục</span>
                </div>
              </button>

              <button className="w-full rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-primary hover:bg-primary hover:bg-opacity-5">
                <div className="flex items-center">
                  <FaChartBar className="mr-3 text-primary" size={20} />
                  <span className="font-medium">Xem báo cáo</span>
                </div>
              </button>

              <button className="w-full rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-primary hover:bg-primary hover:bg-opacity-5">
                <div className="flex items-center">
                  <FaCog className="mr-3 text-primary" size={20} />
                  <span className="font-medium">Cài đặt hệ thống</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
