export interface Blog {
  id: string;
  title: string;
  content: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  category?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
  };
}
