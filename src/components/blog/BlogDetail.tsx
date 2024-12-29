'use client';

import { Blog } from '@/types/blogTypes';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBlogs } from '@/services/api';

interface BlogDetailProps {
  blog: Blog;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const data = await fetchBlogs();
        const filteredBlogs = data.contents.filter(
          (item: Blog) =>
            item.id !== blog.id && item.category?.id === blog.category?.id
        );
        setRelatedBlogs(filteredBlogs.slice(0, 3));
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
    };

    fetchRelatedBlogs();
  }, [blog]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white px-4 py-6 sm:px-6 lg:px-8">
      <Image
        src={blog.eyecatch.url}
        alt={blog.title}
        width={blog.eyecatch.width}
        height={blog.eyecatch.height}
        className="mb-6 h-auto w-full rounded-lg border border-gray-200 object-cover"
      />

      <h1 className="mb-4 font-sans text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
        {blog.title}
      </h1>

      <div className="mb-6 text-sm text-gray-500 sm:text-base">
        <span>Ngày đăng bài: {formatDate(blog.publishedAt)}</span>
        {blog.category && (
          <span className="ml-4 inline-block rounded-full bg-primary px-2 py-1 text-xs font-medium text-white sm:text-sm">
            {blog.category.name}
          </span>
        )}
      </div>

      <div className="prose prose-sm sm:prose lg:prose-lg">
        {parse(blog.content)}
      </div>

      {relatedBlogs.length > 0 && (
        <div className="mt-12">
          <p className="mb-4 text-xl font-bold text-gray-900">
            Bài viết liên quan
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {relatedBlogs.map(({ id, eyecatch, title, publishedAt }) => (
              <Link key={id} href={`/blog/${id}`}>
                <div className="cursor-pointer rounded-lg border p-4 transition-shadow">
                  <Image
                    src={eyecatch.url}
                    alt={title}
                    width={eyecatch.width}
                    height={eyecatch.height}
                    className="mb-4 h-48 w-full rounded-lg object-cover"
                  />
                  <p className="text-lg font-semibold text-gray-900">{title}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    {formatDate(publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
