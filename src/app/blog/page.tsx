// app/blog/page.tsx

import { fetchBlogs } from '@/services/api';
import Link from 'next/link';
import Image from 'next/image';
import images from '@/configs/images';
import languages from '@/configs/languages';
import React from 'react';
import { CategoryColors } from '@/configs/colors/categoryColors';

export default async function BlogPage() {
  const data = await fetchBlogs();

  if (!data || !data.contents.length) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-2xl font-bold">Không có bài viết nào</h1>
      </div>
    );
  }

  return (
    <section>
      {/* Banner blog */}
      <div className="relative flex h-252 justify-center py-8 text-white transition-all duration-500 md:h-80 md:py-12">
        {/* Optimized Background Image */}
        <Image
          src={images.contactHeroBackground}
          alt="Contact Hero Background"
          fill={true}
          className={'object-cover'}
          quality={80}
          priority
        />

        {/* Content */}
        <div className="relative z-10 flex w-3/5 flex-col items-center justify-center gap-2 md:w-1/2">
          <div className="flex flex-row gap-1 text-smLh">
            <span className="text-black-50">{languages.get('about')}</span>
            <span>/</span>
            <span>Danh Sách Bài Viết</span>
          </div>
          <h1 className="font-playfairBold text-center text-2.25lg uppercase md:text-3xl lg:text-6lg">
            Danh Sách Bài Viết
          </h1>
          <span className="font-playfairRegular text-center text-sm sm:text-lg md:text-2lg">
            Các bài viết tiêu biểu của mộc
          </span>
        </div>
      </div>

      {/* List blog */}
      <div className="my-8 flex flex-col px-6 2xl:container md:my-20 md:px-6 lg:px-36 2xl:mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.contents.map((blog: any) => {
            const categoryColor =
              CategoryColors[blog.category.name.toLowerCase()] ||
              CategoryColors.default;
            return (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <div className="cursor-pointer rounded-lg border p-4 transition-shadow lg:h-[340px]">
                  <Image
                    width={blog.eyecatch.width}
                    height={blog.eyecatch.height}
                    src={blog.eyecatch.url}
                    alt={blog.title}
                    className="mb-4 h-48 w-full rounded-lg object-cover"
                  />
                  <p className="text-lg font-semibold text-gray-900">
                    {blog.title}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {new Date(blog.publishedAt).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                  {blog.category && (
                    <span
                      className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium text-white ${categoryColor}`}
                    >
                      {blog.category.name}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
