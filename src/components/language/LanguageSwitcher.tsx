'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState<string>('vi');

  // Lấy locale hiện tại từ URL hoặc mặc định là 'vi'
  useEffect(() => {
    const currentLocale = window.location.pathname.split('/')[1] || 'vi';
    setLocale(currentLocale);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'vi' : 'en';
    setLocale(newLocale);

    // Thay đổi URL theo ngôn ngữ mới
    const currentPath = window.location.pathname.split('/').slice(2).join('/');
    const newPath = `/${newLocale}/${currentPath}`;
    router.push(newPath);
  };

  return (
    <div className="fixed bottom-4 left-4">
      <button
        onClick={toggleLanguage}
        className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition duration-300 ${
          locale === 'en' ? 'bg-green-600' : 'bg-blue-600'
        } hover:opacity-90`}
      >
        {locale?.toUpperCase()}
      </button>
    </div>
  );
}
