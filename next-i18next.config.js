/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['vi', 'en'], // Các ngôn ngữ được hỗ trợ
    defaultLocale: 'vi', // Ngôn ngữ mặc định
    localeDetection: true, // Tự động phát hiện ngôn ngữ
  },
};

module.exports = nextConfig;
