import { atom } from 'recoil';
import { Blog } from '@/types/blogTypes';

export const blogsState = atom<Blog[]>({
  key: 'blogsState',
  default: [],
});
