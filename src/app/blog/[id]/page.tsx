// blog/[id]/page.tsx

import { fetchBlogs } from '@/services/api';
import { Blog } from '@/types/blogTypes';
import BlogDetail from '@/components/blog/BlogDetail';

interface BlogPageProps {
  params: { id: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const data = await fetchBlogs();
  const blog = data.contents.find((item: Blog) => item.id === params.id);

  if (!blog) {
    return { notFound: true };
  }

  return <BlogDetail blog={blog} />;
}
