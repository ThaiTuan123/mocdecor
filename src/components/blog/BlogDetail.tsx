import { Blog } from '@/types/blogTypes';
import React from 'react';
import parse from 'html-react-parser';

interface BlogDetailProps {
  blog: Blog;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white px-4 py-6 sm:px-6 lg:px-8">
      {/* Hình ảnh bài viết */}
      <img
        src={blog.eyecatch.url}
        alt={blog.title}
        className="mb-6 h-auto w-full rounded-lg border border-gray-200 object-cover"
      />

      {/* Tiêu đề bài viết */}
      <h1 className="mb-4 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
        {blog.title}
      </h1>

      {/* Thông tin chi tiết */}
      <div className="mb-6 text-sm text-gray-500 sm:text-base">
        <span>
          Ngày đăng bài:{' '}
          {new Date(blog.publishedAt).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </span>{' '}
        {blog.category && (
          <span className="ml-4 inline-block rounded-full bg-primary px-2 py-1 text-xs font-medium text-white sm:text-sm">
            {blog.category.name}
          </span>
        )}
      </div>

      {/* Nội dung bài viết */}
      <div className="prose prose-sm sm:prose lg:prose-lg">
        {parse(blog.content)}
      </div>
    </div>
  );
};

export default BlogDetail;
