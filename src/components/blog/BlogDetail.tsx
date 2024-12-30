'use client';

import { Blog } from '@/types/blogTypes';
import React from 'react';
import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBlogs } from '@/services/api';
import { useQuery } from '@/recoil/hooks/useQuery';
import { formatDate } from '@/utils/dateTimeFormat';

interface BlogDetailProps {
  blog: Blog;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  const {
    data: relatedBlogs,
    isLoading,
    error,
  } = useQuery<Blog[]>(async () => {
    const data = await fetchBlogs();
    return data.contents
      .filter(
        (item: Blog) =>
          item.id !== blog.id && item.category?.id === blog.category?.id
      )
      .slice(0, 3);
  }, [blog]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl rounded-lg bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-48 w-full rounded-lg bg-gray-200"></div>
          <div className="h-6 w-2/3 rounded bg-gray-200"></div>
          <div className="h-4 w-1/3 rounded bg-gray-200"></div>
          <div className="h-4 w-full rounded bg-gray-200"></div>
          <div className="h-4 w-full rounded bg-gray-200"></div>
          <div className="h-4 w-5/6 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  if (error) return <p>Error loading blogs: {error.message}</p>;

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

      {/*Content blog detail*/}
      <div>{parse(blog.content)}</div>

      {/*Bài viết liên quan*/}
      {relatedBlogs && relatedBlogs.length > 0 && (
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
