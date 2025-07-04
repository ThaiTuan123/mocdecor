'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import images from '@/configs/images';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - replace with real API call
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      // Store auth token in localStorage
      localStorage.setItem('admin_token', 'mock_admin_token');
      router.push('/admin');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-pampas">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Image
            src={images.logo}
            alt="MOC Decor Logo"
            width={120}
            height={60}
            className="mx-auto"
          />
          <h1 className="mt-4 text-2xl font-bold text-primary">
            Đăng nhập Admin
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary px-4 py-2 text-white transition duration-200 hover:bg-opacity-90 disabled:opacity-50"
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            <strong>Demo credentials:</strong>
            <br />
            Username: admin
            <br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
