'use client';

import React, { useState } from 'react';
import { FaSave, FaUser, FaCog, FaBell, FaLock, FaGlobe } from 'react-icons/fa';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'MOC Decor',
    siteDescription: 'Cửa hàng đồ handmade từ gỗ cao cấp',
    adminEmail: 'admin@mocdecor.com',
    adminName: 'Administrator',
    enableNotifications: true,
    enableRegistration: false,
    maintenanceMode: false,
    defaultLanguage: 'vi',
  });

  const tabs = [
    { id: 'general', label: 'Tổng quan', icon: FaCog },
    { id: 'profile', label: 'Hồ sơ', icon: FaUser },
    { id: 'notifications', label: 'Thông báo', icon: FaBell },
    { id: 'security', label: 'Bảo mật', icon: FaLock },
    { id: 'localization', label: 'Ngôn ngữ', icon: FaGlobe },
  ];

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    alert('Cài đặt đã được lưu thành công!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Tên website
        </label>
        <input
          type="text"
          value={settings.siteName}
          onChange={e => handleInputChange('siteName', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Mô tả website
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={e => handleInputChange('siteDescription', e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="maintenanceMode"
          checked={settings.maintenanceMode}
          onChange={e => handleInputChange('maintenanceMode', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label
          htmlFor="maintenanceMode"
          className="ml-2 block text-sm text-gray-900"
        >
          Chế độ bảo trì
        </label>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Tên quản trị viên
        </label>
        <input
          type="text"
          value={settings.adminName}
          onChange={e => handleInputChange('adminName', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email quản trị viên
        </label>
        <input
          type="email"
          value={settings.adminEmail}
          onChange={e => handleInputChange('adminEmail', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Đổi mật khẩu
        </label>
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Mật khẩu hiện tại"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="enableNotifications"
          checked={settings.enableNotifications}
          onChange={e =>
            handleInputChange('enableNotifications', e.target.checked)
          }
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label
          htmlFor="enableNotifications"
          className="ml-2 block text-sm text-gray-900"
        >
          Bật thông báo hệ thống
        </label>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Loại thông báo</h4>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="orderNotif"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              defaultChecked
            />
            <label
              htmlFor="orderNotif"
              className="ml-2 block text-sm text-gray-900"
            >
              Đơn hàng mới
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="productNotif"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              defaultChecked
            />
            <label
              htmlFor="productNotif"
              className="ml-2 block text-sm text-gray-900"
            >
              Sản phẩm hết hàng
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="reviewNotif"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="reviewNotif"
              className="ml-2 block text-sm text-gray-900"
            >
              Đánh giá mới
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="enableRegistration"
          checked={settings.enableRegistration}
          onChange={e =>
            handleInputChange('enableRegistration', e.target.checked)
          }
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label
          htmlFor="enableRegistration"
          className="ml-2 block text-sm text-gray-900"
        >
          Cho phép đăng ký tài khoản mới
        </label>
      </div>

      <div>
        <h4 className="mb-3 font-medium text-gray-900">Phiên đăng nhập</h4>
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-600">Phiên hiện tại</span>
            <span className="text-sm font-medium">Chrome - Windows</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Đăng nhập lúc</span>
            <span className="text-sm">22/06/2025 - 14:30</span>
          </div>
        </div>
      </div>

      <div>
        <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
          Đăng xuất tất cả thiết bị khác
        </button>
      </div>
    </div>
  );

  const renderLocalizationSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Ngôn ngữ mặc định
        </label>
        <select
          value={settings.defaultLanguage}
          onChange={e => handleInputChange('defaultLanguage', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary"
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Múi giờ
        </label>
        <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary">
          <option value="Asia/Ho_Chi_Minh">GMT+7 (Việt Nam)</option>
          <option value="UTC">UTC</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Định dạng tiền tệ
        </label>
        <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-primary">
          <option value="VND">VND (đ)</option>
          <option value="USD">USD ($)</option>
        </select>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'localization':
        return renderLocalizationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
        <p className="text-gray-600">Quản lý cấu hình và tùy chỉnh hệ thống</p>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="border-r border-gray-200 bg-gray-50 lg:col-span-1">
            <nav className="space-y-2 p-4">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center rounded-lg px-3 py-2 text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="mr-3" size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
            </div>

            {renderTabContent()}

            <div className="mt-8 border-t border-gray-200 pt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-white hover:bg-opacity-90"
              >
                <FaSave size={16} />
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
