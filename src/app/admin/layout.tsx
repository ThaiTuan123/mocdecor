'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import images from '@/configs/images';
import {
  FaBox,
  FaList,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/login');
  };

  const menuItems = [
    {
      href: '/admin/products',
      icon: FaBox,
      label: 'Sản phẩm',
    },
    {
      href: '/admin/categories',
      icon: FaList,
      label: 'Danh mục',
    },
    {
      href: '/admin/settings',
      icon: FaCog,
      label: 'Cài đặt',
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:static lg:inset-0 lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
          <Image
            src={images.logo}
            alt="MOC Decor Logo"
            width={100}
            height={50}
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-primary hover:text-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-3" size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-red-500 hover:text-white"
            >
              <FaSignOutAlt className="mr-3" size={20} />
              Đăng xuất
            </button>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <FaBars size={20} />
          </button>

          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Quản trị hệ thống
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Xin chào, Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
